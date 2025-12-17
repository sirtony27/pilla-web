'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveHorizontal, Sun, Cloud, Mountain } from 'lucide-react';
import { Lens } from '@/types';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import { LensShaderMaterial } from './LensShaderMaterial';
import { TextureLoader } from 'three';

// Register Shader Material
extend({ LensShaderMaterial });

// Add Type Definition for R3F
declare module '@react-three/fiber' {
    interface ThreeElements {
        lensShaderMaterial: any;
    }
    // Ideally we would type this fully but 'any' allows quick iteration. 
    // We are adding new props uResolution and uImageRes dynamically.
}

interface LensSimulatorProps {
    lens: Lens;
    backgroundUrl?: string;
    className?: string;
}

const SCENES = [
    { id: 'forest', label: 'Bosque', icon: Mountain, url: '/scenes/forest.png' },
    { id: 'sky', label: 'Cielo Abierto', icon: Sun, url: '/scenes/sky.png' },
    { id: 'cloudy', label: 'Nublado', icon: Cloud, url: '/scenes/cloudy.png' },
];

// Inner Scene Component responsible for Three.js logic
const SimulationScene = ({
    sceneUrl,
    lens,
    comparePosition
}: {
    sceneUrl: string,
    lens: Lens,
    comparePosition: number
}) => {
    // Load Texture
    const texture = useLoader(TextureLoader, sceneUrl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    // Access Three.js state for viewport dimensions
    const { viewport } = useThree();

    // Shader Material Ref to update uniforms
    const materialRef = useRef<any>(null);

    // Update Uniforms on Loop/Prop Change
    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.uSplit = comparePosition / 100;

            // Physics Props
            const shaderConfig = lens.shaderConfig || {
                targetHue: 0.1, targetTolerance: 0.1, targetBoost: 1.0,
                suppressHue: 0.3, suppressTolerance: 0.1, suppressFactor: 1.0
            };

            materialRef.current.uTargetHue = shaderConfig.targetHue;
            materialRef.current.uTargetTol = shaderConfig.targetTolerance;
            materialRef.current.uTargetBoost = shaderConfig.targetBoost;
            materialRef.current.uSuppressHue = shaderConfig.suppressHue;
            materialRef.current.uSuppressTol = shaderConfig.suppressTolerance;
            materialRef.current.uSuppressFactor = shaderConfig.suppressFactor;

            // Convert Hex Tint to Color
            materialRef.current.uTint = new THREE.Color(lens.simulationProfile.hexOverlay);

            // Resolution & Aspect Ratio Fix
            if (texture.image) {
                materialRef.current.uResolution = new THREE.Vector2(viewport.width, viewport.height);
                materialRef.current.uImageRes = new THREE.Vector2(texture.image.width, texture.image.height);
            }
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} /> {/* 1x1 Plane, scaled to fill viewport */}
            <lensShaderMaterial
                ref={materialRef}
                uTexture={texture}
                transparent={true}
            />
        </mesh>
    );
};


export const LensSimulator = ({
    lens,
    className = ""
}: LensSimulatorProps) => {
    // Local state for the slider
    const [comparePosition, setComparePosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Internal Scene State
    const [activeScene, setActiveScene] = useState(SCENES[0]);

    // Handle Dragging
    const handleDrag = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let percentage = ((clientX - rect.left) / rect.width) * 100;

        // Clamp
        percentage = Math.max(0, Math.min(100, percentage));

        setComparePosition(percentage);
    };

    // Global event listeners for drag
    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging) {
                let clientX;
                if ('touches' in e) {
                    clientX = e.touches[0].clientX;
                } else {
                    clientX = (e as MouseEvent).clientX;
                }
                handleDrag(clientX);
            }
        };
        const handleUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging]);

    return (
        <div className={`relative w-full h-full group ${className}`}>
            {/* 1. WebGL Canvas Layer */}
            <div
                ref={containerRef}
                className="absolute inset-0 z-0 h-full w-full bg-black cursor-col-resize"
                onMouseDown={(e) => {
                    setIsDragging(true);
                    handleDrag(e.clientX);
                }}
                onTouchStart={(e) => {
                    setIsDragging(true);
                    handleDrag(e.touches[0].clientX);
                }}
                onClick={(e) => {
                    handleDrag(e.clientX);
                }}
            >
                <Canvas gl={{ preserveDrawingBuffer: true, antialias: true }} camera={{ position: [0, 0, 1], fov: 75 }}>
                    <React.Suspense fallback={null}>
                        <SimulationScene
                            sceneUrl={activeScene.url}
                            lens={lens}
                            comparePosition={comparePosition}
                        />
                    </React.Suspense>
                </Canvas>
            </div>

            {/* 2. UI Overlays (Pointer Events None where needed) */}

            {/* Naked Eye Label */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none">
                <span className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    SIN FILTRO
                </span>
            </div>

            {/* Lens Label */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={lens.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-6 right-6 pointer-events-none z-20"
                >
                    <span
                        className="bg-white/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                    >
                        CON LENTE {lens.lensCode}
                    </span>
                </motion.div>
            </AnimatePresence>

            {/* 3. Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-col-resize z-20 flex items-center justify-center hover:bg-white transition-colors shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                style={{ left: `${comparePosition}%` }}
            >
                <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-black">
                    <MoveHorizontal size={14} />
                </div>
            </div>

            {/* Scene Selector UI (Floating at Bottom Center) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 p-1 bg-black/60 backdrop-blur rounded-full border border-white/10 shadow-xl">
                {SCENES.map((scene) => {
                    const isActive = activeScene.id === scene.id;
                    const Icon = scene.icon;
                    return (
                        <button
                            key={scene.id}
                            onClick={(e) => {
                                e.stopPropagation(); // Avoid interacting with Canvas behind
                                setActiveScene(scene);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${isActive
                                ? 'bg-white text-black shadow-lg scale-105'
                                : 'text-neutral-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Icon size={14} />
                            <span className="hidden sm:inline">{scene.label}</span>
                        </button>
                    );
                })}
            </div>

        </div>
    );
};
