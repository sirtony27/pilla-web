'use client';

import React, { useState } from 'react';
import { lenses } from '@/data/lenses';
import { LensSimulator } from '@/components/POV/LensSimulator';
import Image from 'next/image';
import { AddToCartButton } from '@/components/Cart/AddToCartButton';
import { motion } from 'framer-motion';

export default function LensLabPage() {
    // Default to a popular lens
    const [selectedLensId, setSelectedLensId] = useState("64CM");

    const activeLens = lenses.find(l => l.id === selectedLensId) || lenses[0];

    return (
        <main className="bg-black min-h-screen pt-16 flex flex-col h-[100dvh] overflow-hidden">

            {/* Header / Control Bar */}
            <div className="absolute top-20 left-0 right-0 z-20 px-6 flex justify-between items-start pointer-events-none">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Lens Lab</h1>
                    <p className="text-neutral-300 drop-shadow-md">Simulador de Alto Rendimiento</p>
                </div>
            </div>

            {/* Main Simulator Area */}
            <div className="flex-1 relative bg-neutral-900 w-full h-full">
                <LensSimulator lens={activeLens} />

                {/* Info Overlay (Desktop/Tablet) */}
                <div className="absolute top-20 right-6 z-20 w-80 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white hidden md:block">
                    <h2 className="text-2xl font-bold mb-1">{activeLens.lensCode}</h2>
                    <p className="text-sm text-neutral-400 mb-4">{activeLens.modelName}</p>

                    <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Transmisión</span>
                            <span className="font-bold">{activeLens.transmission}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-400">Luz</span>
                            <span className="font-bold">{activeLens.transmission > 50 ? 'Baja' : activeLens.transmission > 20 ? 'Media' : 'Alta'}</span>
                        </div>
                    </div>

                    <AddToCartButton
                        sku={activeLens.id}
                        item={{
                            lensId: activeLens.id,
                            lensCode: activeLens.lensCode,
                            modelName: activeLens.modelName,
                            price: 249,
                            image: activeLens.imgUrl
                        }}
                    />
                </div>
            </div>

            {/* Bottom Dock (The "Lab" Selector) */}
            <div className="h-48 bg-neutral-950 border-t border-neutral-800 z-30 flex flex-col">
                <div className="flex items-center justify-between px-6 py-2 border-b border-white/5 md:hidden">
                    <span className="font-bold text-white">{activeLens.lensCode}</span>
                    <span className="text-xs text-neutral-400">{activeLens.transmission}% VLT</span>
                </div>

                <div className="flex-1 overflow-x-auto pb-4 pt-4 px-6 flex items-center gap-4 no-scrollbar">
                    {lenses.map((lens) => {
                        const isSelected = lens.id === selectedLensId;
                        return (
                            <button
                                key={lens.id}
                                onClick={() => setSelectedLensId(lens.id)}
                                className={`group relative flex-shrink-0 w-32 flex flex-col items-center gap-3 transition-all duration-300 ${isSelected ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                            >
                                <div className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-colors ${isSelected ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'border-transparent group-hover:border-white/20'}`}>
                                    {/* Color Preview */}
                                    <div
                                        className="absolute inset-0 w-full h-full opacity-80"
                                        style={{ backgroundColor: lens.simulationProfile.hexOverlay }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs font-bold text-white drop-shadow-md">{lens.transmission}%</span>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold tracking-wider ${isSelected ? 'text-white' : 'text-neutral-500'}`}>
                                    {lens.lensCode}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Mobile Add Button (Only visible on small screens in the dock area) */}
                <div className="md:hidden px-4 pb-4">
                    <AddToCartButton
                        sku={activeLens.id}
                        item={{
                            lensId: activeLens.id,
                            lensCode: activeLens.lensCode,
                            modelName: activeLens.modelName,
                            price: 249,
                            image: activeLens.imgUrl
                        }}
                    />
                </div>
            </div>

        </main>
    );
}
