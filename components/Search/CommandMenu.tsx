'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';
import { lenses } from '@/data/lenses';
import { athletes } from '@/data/athletes';
import { Search, Calculator, User, Glasses } from 'lucide-react';

export const CommandMenu = () => {
    const router = useRouter();
    const { isSearchOpen, closeSearch, openSearch } = useUIStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape') {
                closeSearch();
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [openSearch, closeSearch]);

    const runCommand = (command: () => void) => {
        closeSearch();
        command();
    }

    if (!mounted) return null;
    if (!isSearchOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4 animate-in fade-in duration-200"
            onClick={() => closeSearch()}
        >
            <div
                className="bg-neutral-900 border border-white/10 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <Command
                    label="Global Command Menu"
                    className="w-full"
                >
                    <div className="flex items-center border-b border-white/10 px-4">
                        <Search className="w-5 h-5 text-neutral-500 mr-3" />
                        <Command.Input
                            placeholder="Buscar lentes, atletas o páginas..."
                            className="w-full bg-transparent border-none py-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-0 text-lg"
                            autoFocus
                        />
                    </div>

                    <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-py-2">
                        <Command.Empty className="py-6 text-center text-neutral-500">
                            No se encontraron resultados.
                        </Command.Empty>

                        <Command.Group heading="Navegación Rápida" className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2 px-2 mt-2">
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/catalog'))}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10"
                            >
                                <Glasses className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-medium">Catálogo Completo</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/lens-lab'))}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10"
                            >
                                <Calculator className="w-4 h-4 text-green-400" />
                                <span className="text-sm font-medium">Lens Lab (Simulador)</span>
                            </Command.Item>
                            <Command.Item
                                onSelect={() => runCommand(() => router.push('/athletes'))}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10"
                            >
                                <User className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm font-medium">Atletas Pilla</span>
                            </Command.Item>
                        </Command.Group>

                        <Command.Group heading="Lentes" className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2 px-2 mt-4">
                            {lenses.map((lens) => (
                                <Command.Item
                                    key={lens.id}
                                    onSelect={() => runCommand(() => router.push(`/product/${lens.id}`))}
                                    className="flex items-center justify-between px-3 py-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full border border-white/20"
                                            style={{ backgroundColor: lens.simulationProfile.hexOverlay }}
                                        ></div>
                                        <span className="text-sm font-medium">{lens.lensCode} - {lens.family}</span>
                                    </div>
                                    <span className="text-xs text-neutral-500">{lens.transmission}% VLT</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Group heading="Atletas" className="text-neutral-500 text-xs font-semibold uppercase tracking-wider mb-2 px-2 mt-4">
                            {athletes.map((athlete) => (
                                <Command.Item
                                    key={athlete.id}
                                    onSelect={() => runCommand(() => router.push('/athletes'))}
                                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white/10 cursor-pointer transition-colors aria-selected:bg-white/10"
                                >
                                    <User className="w-4 h-4 text-neutral-400" />
                                    <span className="text-sm font-medium">{athlete.name}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                    </Command.List>
                </Command>
            </div>
        </div>
    )
}
