'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, Sun, CheckCircle } from 'lucide-react';

export default function TechnologyPage() {
    return (
        <main className="bg-black min-h-screen text-white overflow-hidden">

            {/* SECTION 1: ZEISS HERO */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/technology/zeiss-macro.png"
                        alt="Lente Zeiss Macro"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
                </div>

                <div className="relative z-10 max-w-4xl px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
                    >
                        Poder Alemán. <br /> Diseño Italiano.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        No usamos policarbonato genérico. Usamos lentes ópticos certificados por <span className="text-white font-bold">ZEISS</span>.
                        Cada lente Pilla pasa por inspecciones rigurosas para asegurar <strong className="text-white">cero distorsión visual</strong>.
                        Si no tiene la "Z" grabada, no es Pilla.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="/catalog" className="inline-block px-8 py-3 border border-white text-white font-bold tracking-widest hover:bg-white hover:text-black transition-colors rounded-full">
                            VER COLECCIÓN
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: CHROMASHIFT */}
            <section className="relative py-20 px-6 bg-black">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                            Manipulamos la Luz, no solo la atenuamos.
                        </h2>
                        <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
                            La tecnología <strong className="text-white">Chromashift™</strong> no es un tinte común. Modifica la curva espectral de la luz para "engañar" al ojo.
                        </p>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            Suprimimos los fondos (verdes y marrones) y disparamos la saturación de los objetivos (naranjas y rosas).
                            El resultado: <strong className="text-white">El plato brilla como si tuviera luz propia.</strong>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] md:h-[600px] w-full order-1 lg:order-2 rounded-3xl overflow-hidden border border-white/10"
                    >
                        <Image
                            src="/technology/spectrum.png"
                            alt="Chromashift Spectrum"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: TECH BENTO GRID */}
            <TechGridSection />

            {/* SECTION 4: OUTLAW GEOMETRY */}
            <section className="relative py-32 px-6 bg-neutral-950">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] md:h-[600px] w-full"
                    >
                        <Image
                            src="/technology/outlaw-profile.png"
                            alt="Geometría Outlaw"
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Geometría Outlaw.</h2>
                        <h3 className="text-xl text-neutral-500 font-mono uppercase tracking-widest mb-8">Sin Marcos. Sin Obstáculos.</h3>

                        <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                            El diseño de la serie Outlaw elimina la barra frontal para que nada se interponga entre tu ojo y el objetivo.
                            Ofrece una <strong className="text-white">visión panorámica perfecta</strong>, vital para deportes de tiro donde la visión periférica es la diferencia entre ganar o perder.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5">
                                <strong className="block text-white text-2xl mb-2">28g</strong>
                                <span className="text-neutral-400 text-sm">Peso Frontal Percibido</span>
                            </div>
                            <div className="bg-neutral-900 p-6 rounded-2xl border border-white/5">
                                <strong className="block text-white text-2xl mb-2">180°</strong>
                                <span className="text-neutral-400 text-sm">Campo de Visión</span>
                            </div>
                        </div>

                        <a href="#" className="text-indigo-400 font-bold tracking-widest text-sm hover:text-white transition-colors border-b border-indigo-400/50 hover:border-white pb-1">
                            VER ESPECIFICACIONES &rarr;
                        </a>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

// Bento Grid Component
const TechGridSection = () => {
    return (
        <section className="py-24 px-6 bg-black">
            <div className="max-w-[1400px] mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    Especificaciones de Élite
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">

                    {/* Card 1: Vision Panoramica (Large) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm"
                    >
                        <Image
                            src="/technology/curve-macro.png"
                            alt="Visión Panorámica"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-3xl font-bold text-white mb-2">Visión Panorámica</h3>
                            <p className="text-neutral-300 max-w-md">Sin montura. Sin puntos ciegos. Claridad total de borde a borde.</p>
                        </div>
                    </motion.div>

                    {/* Card 2: Hydrophobic (Square) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="relative p-8 flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md group hover:bg-neutral-800/40 transition-colors"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                            <Droplets size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Hidrofóbico</h3>
                            <p className="text-sm text-neutral-400">Repele agua, aceite, polvo y huellas dactilares al instante.</p>
                        </div>
                    </motion.div>

                    {/* Card 3: Zeiss (Wide) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 relative p-8 flex flex-col justify-end rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 to-black overflow-hidden group"
                    >
                        {/* Abstract background accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-indigo-400 font-mono text-xs uppercase tracking-widest">
                                    <CheckCircle size={14} /> Certificado Oficial
                                </div>
                                <h3 className="text-2xl font-bold text-white">Claridad Óptica ZEISS</h3>
                                <p className="text-neutral-400 mt-2 max-w-lg">
                                    Cada lente es inspeccionado a mano bajo estándares de laboratorio para garantizar cero aberraciones.
                                </p>
                            </div>
                            {/* Small abstract Z or logo representation could go here */}
                            <div className="hidden md:block text-6xl font-serif font-bold text-white/5 select-none">Z</div>
                        </div>
                    </motion.div>

                    {/* Card 4: UV Data (Small) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                        className="relative p-8 flex flex-col justify-center items-center text-center rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-md"
                    >
                        <Sun className="text-orange-400 mb-4" size={32} />
                        <span className="text-5xl font-bold text-white tracking-tighter mb-2">100%</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">Protección UV</span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
