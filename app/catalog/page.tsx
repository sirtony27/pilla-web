'use client';

import Link from 'next/link';
import Image from 'next/image';
import { lenses } from '@/data/lenses';
import { useState, useMemo } from 'react';
import { Filter, Sun, Cloud, ChevronDown, Eye, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DualRangeSlider } from '@/components/Catalog/DualRangeSlider';

export default function CatalogPage() {
    // FILTERS STATE
    const [activeCategory, setActiveCategory] = useState<string>('Todos');
    const [vltRange, setVltRange] = useState<[number, number]>([0, 100]);
    const [openFamily, setOpenFamily] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categories = ["Todos", "Chromashift", "Post Calibración", "Rojo", "Violeta", "Amarillo"];

    // FILTER LOGIC
    const filteredLenses = useMemo(() => {
        return lenses.filter(l => {
            const matchesCategory = activeCategory === 'Todos' ||
                l.family === activeCategory ||
                l.colorCategory === activeCategory;
            const matchesVlt = l.transmission >= vltRange[0] && l.transmission <= vltRange[1];
            return matchesCategory && matchesVlt;
        });
    }, [activeCategory, vltRange]);

    // Common Filter Content (defined as variable to avoid remounting issues)
    const sidebarContent = (
        <div className="space-y-10">
            {/* VLT Slider */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                    Transmisión de Luz (VLT)
                </h3>
                <div className="px-2 mb-6">
                    <DualRangeSlider min={0} max={100} onChange={setVltRange} />
                </div>
                <div className="flex justify-between text-xs text-neutral-400 font-mono">
                    <div className="flex items-center gap-1"><Cloud size={12} /> {vltRange[0]}%</div>
                    <div className="flex items-center gap-1">{vltRange[1]}% <Sun size={12} /></div>
                </div>
            </div>

            {/* Categories Accordion */}
            <div>
                <button
                    onClick={() => setOpenFamily(!openFamily)}
                    className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 hover:text-white transition-colors"
                >
                    <span>Familia & Color</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${openFamily ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                    {openFamily && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1 pl-2 border-l border-neutral-800">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`block w-full text-left px-4 py-3 text-sm transition-all rounded-r-lg ${activeCategory === cat
                                            ? 'bg-white/10 text-white font-bold border-l-2 border-white -ml-[1px]'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

    return (
        <main className="bg-black min-h-screen pb-24 text-white selection:bg-indigo-500 selection:text-white">

            {/* HERDER */}
            <div className="relative bg-neutral-900/50 border-b border-white/10 py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/background.svg')] opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none" />
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">Catálogo de Precisión</h1>
                    <p className="text-neutral-400 max-w-2xl text-lg font-light leading-relaxed">
                        Explorá nuestra armería óptica. Filtra por tecnología o condición de luz para encontrar tu herramienta perfecta.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative">

                {/* MOBILE FILTER TOGGLE */}
                <div className="lg:hidden w-full mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full bg-neutral-900 border border-white/10 py-4 rounded-xl flex items-center justify-center gap-2 font-bold tracking-widest text-sm hover:bg-neutral-800 transition-colors"
                    >
                        <SlidersHorizontal size={16} /> FILTRAR Y ORDENAR
                    </button>
                </div>

                {/* MOBILE FILTER DRAWER overlay */}
                <AnimatePresence>
                    {showMobileFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setShowMobileFilters(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                            />
                            <motion.div
                                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-neutral-950 border-l border-white/10 z-50 lg:hidden p-6 overflow-y-auto shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold">Filtros</h2>
                                    <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-neutral-900 rounded-full">
                                        <X size={20} />
                                    </button>
                                </div>
                                {sidebarContent}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* DESKTOP SIDEBAR */}
                <aside className="hidden lg:block w-72 flex-shrink-0">
                    {sidebarContent}
                </aside>

                {/* PRODUCT GRID */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredLenses.map((lens) => (
                            <Link
                                key={lens.id}
                                href={`/product/${lens.id}`}
                                className="group relative bg-neutral-900/40 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 block backdrop-blur-sm hover:-translate-y-2"
                                style={{
                                    // Remove static border color, handled dynamically via shadow below
                                }}
                            >
                                {/* Dynamic Hover Shadow & Border (Hidden by default, visible on hover) */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                                    style={{
                                        boxShadow: `0 20px 40px -10px ${lens.simulationProfile.hexOverlay}40`,
                                        border: `1px solid ${lens.simulationProfile.hexOverlay}60`
                                    }}
                                />

                                {/* Active Selection Border Glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: `inset 0 0 20px ${lens.simulationProfile.hexOverlay}20` }}
                                />

                                {/* Card Header (VLT & Badge) */}
                                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
                                    <span className="font-mono text-xs font-bold text-neutral-500 group-hover:text-white transition-colors">
                                        {lens.transmission}% VLT
                                    </span>

                                    {/* Color Indicator Dot */}
                                    <div
                                        className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]"
                                        style={{ backgroundColor: lens.simulationProfile.hexOverlay, color: lens.simulationProfile.hexOverlay }}
                                    />
                                </div>

                                {/* Hero Image Area */}
                                <div className="aspect-[4/3] relative flex items-center justify-center p-8 mt-4">
                                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 ease-out">
                                        <Image
                                            src={lens.imgUrl}
                                            alt={lens.lensCode}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                    </div>

                                    {/* "Try Lens" Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                        <div className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold text-xs tracking-widest border border-white/20 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            <Eye size={14} /> PROBAR LENTE
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6 pt-0 relative z-20">
                                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2 opacity-80">
                                        {lens.family}
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                        {lens.lensCode}
                                    </h2>
                                    <p className="text-sm text-neutral-400 line-clamp-2 font-light leading-relaxed">
                                        {lens.modelName} - {lens.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredLenses.length === 0 && (
                        <div className="py-24 text-center text-neutral-500">
                            <p className="text-lg">No se encontraron lentes con estos filtros.</p>
                            <button
                                onClick={() => { setActiveCategory('Todos'); setVltRange([0, 100]); }}
                                className="mt-4 text-indigo-400 hover:text-white underline decoration-dotted underline-offset-4"
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
