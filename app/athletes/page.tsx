'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { athletes } from '@/data/athletes';

export default function AthletesPage() {
    return (
        <main className="bg-neutral-950 min-h-screen text-white pt-24 pb-24">

            {/* Header */}
            <section className="px-6 mb-20">
                <div className="max-w-[1400px] mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        FAMILIA PILLA
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-400 max-w-2xl mx-auto"
                    >
                        Los mejores tiradores del mundo confían su visión a Pilla.
                        Más medallas olímpicas y campeonatos mundiales que cualquier otra marca.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="px-6">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {athletes.map((athlete, i) => (
                        <motion.div
                            key={athlete.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col h-auto rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-white/30 transition-colors"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={athlete.image}
                                    alt={athlete.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Content - Separated for Readability */}
                            <div className="p-6 flex-1 flex flex-col bg-neutral-900 relative z-20">
                                <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                    {athlete.name}
                                </h2>
                                <p className="text-neutral-400 font-medium text-sm mb-4 border-b border-white/10 pb-4">
                                    {athlete.title}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2 text-xs">
                                    {athlete.achievements.map((tag) => (
                                        <span key={tag} className="text-neutral-500 bg-black/50 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </main>
    );
}
