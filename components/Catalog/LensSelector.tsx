'use client';

import React from 'react';
import { useLensStore } from '@/store/useLensStore';
import { lenses } from '@/data/lenses';
import { Layers, Eye, Sun, Droplets, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const LensSelector = () => {
    const { selectedLens, selectLens, isCompareMode, setCompareMode } = useLensStore();

    return (
        <div className="flex flex-col h-full bg-neutral-900 border-l border-neutral-800 text-white w-full lg:w-96 shadow-2xl z-30 overflow-y-auto">

            {/* Header */}
            <div className="p-6 border-b border-neutral-800">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Lens Tech</h2>
                <p className="text-sm text-neutral-400">Select a lens to simulate its effects on the scene.</p>
            </div>

            {/* Controls */}
            <div className="p-6 border-b border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-neutral-300">Compare Mode</span>
                    <button
                        onClick={() => setCompareMode(!isCompareMode)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${isCompareMode ? 'bg-indigo-600' : 'bg-neutral-700'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${isCompareMode ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            {/* Lens List */}
            <div className="flex-1 p-6 space-y-4">
                <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-4">Available Lenses</h3>

                <div className="grid gap-3">
                    {lenses.map((lens) => (
                        <button
                            key={lens.id}
                            onClick={() => selectLens(lens)}
                            className={`group relative flex items-start gap-4 p-4 rounded-xl text-left transition-all border ${selectedLens?.id === lens.id
                                    ? 'bg-neutral-800 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                    : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800/50 hover:border-neutral-700'
                                }`}
                        >
                            {/* Color Indicator */}
                            <div
                                className="w-12 h-12 rounded-full flex-shrink-0 shadow-inner border border-white/10"
                                style={{ backgroundColor: lens.simulationProfile.hexOverlay }}
                            />

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-lg">{lens.lensCode}</span>
                                    <span className="text-xs font-mono bg-neutral-950 px-2 py-1 rounded text-neutral-400">
                                        {lens.transmission}% VLT
                                    </span>
                                </div>
                                <div className="text-sm text-neutral-400 leading-relaxed font-light">
                                    {lens.modelName}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Active Lens Detail Footer */}
            {selectedLens && (
                <div className="p-6 bg-neutral-950 border-t border-neutral-800">
                    <div className="flex items-start gap-3 mb-4">
                        <Info size={18} className="text-indigo-400 mt-1 shrink-0" />
                        <p className="text-sm text-neutral-300 leading-relaxed">
                            {selectedLens.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500">
                        <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded">
                            <Sun size={14} />
                            <span>Contrast: x{selectedLens.simulationProfile.contrast}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-neutral-900 p-2 rounded">
                            <Droplets size={14} />
                            <span>Sat: x{selectedLens.simulationProfile.saturation}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
