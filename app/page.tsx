'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Wind } from "lucide-react";
import { lenses } from "@/data/lenses";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  // Best Sellers: 64CM, 58ED, 19CIN
  const bestSellers = lenses.filter(l => ["64CM", "58ED", "19CIN"].includes(l.id));

  return (
    <main className="flex-1 bg-black text-white selection:bg-white selection:text-black">

      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/scenes/home-v2.png"
            alt="Cielo Abierto"
            fill
            priority
            className="object-cover"
            quality={100}
          />
          {/* Cinema Overlay: Gradient from bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] px-6 mt-20 md:mt-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
              LA CIENCIA<br />DE LA VISIÓN.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-neutral-300 font-light max-w-2xl mb-10 leading-relaxed">
              Dominá la luz. Elevá tu rendimiento. <br className="hidden md:block" />
              Lentes de precisión óptica para tiradores que no aceptan compromisos.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                VER CATÁLOGO
              </Link>
              <Link
                href="/lens-lab"
                className="group px-8 py-4 rounded-full font-bold text-sm tracking-widest border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
              >
                IR AL LENS LAB
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. BEST SELLERS */}
      <section className="py-32 bg-black relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Favoritos de los Profesionales</h2>
            <Link href="/catalog" className="text-sm font-bold border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors hidden md:block">
              VER TODO
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((lens, i) => (
              <motion.div
                key={lens.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <Link href={`/product/${lens.id}`}>
                  <div className="aspect-[4/5] bg-neutral-900/50 rounded-2xl overflow-hidden relative mb-6">
                    <div className="absolute inset-0 bg-neutral-800/20 group-hover:bg-neutral-800/0 transition-colors" />
                    <Image
                      src={lens.imgUrl}
                      alt={lens.lensCode}
                      fill
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{lens.lensCode}</h3>
                      <p className="text-sm text-neutral-400">{lens.modelName}</p>
                    </div>
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">
                      {lens.transmission}% VLT
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY BENTO GRID */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl"
          >
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">Tecnología de Punta</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Ingeniería Óptica sin Rivales.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Card: Chromashift */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative bg-neutral-900 rounded-3xl overflow-hidden group border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20 pointer-events-none">
                <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">Chromashift™</h3>
                <p className="text-neutral-200 max-w-md drop-shadow-md">
                  Manipulación espectral avanzada. Neutraliza el fondo y potencia el objetivo para una adquisición visual instantánea.
                </p>
              </div>
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

              {/* Floating Lens Image */}
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-transparent absolute inset-0 mix-blend-screen" />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/lenses/19cin.png"
                    alt="Chromashift"
                    fill
                    className="object-contain p-4 md:p-12 scale-125"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2: Ballistic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between group border border-white/5 hover:border-white/20 transition-colors"
            >
              <Shield className="text-white w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold mb-2">Certificación Zeiss</h3>
                <p className="text-sm text-neutral-400">Policarbonato balístico indestructible. Protección total.</p>
              </div>
            </motion.div>

            {/* Card 3: Anti-Fog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between group border border-white/5 hover:border-white/20 transition-colors"
            >
              <Wind className="text-white w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold mb-2">Cero Niebla</h3>
                <p className="text-sm text-neutral-400">Ventilación aerodinámica diseñada para mantener la visión clara.</p>
              </div>
            </motion.div>

            {/* Card 4: Light Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between group border border-white/5 hover:border-white/20 transition-colors bg-gradient-to-br from-neutral-900 to-neutral-800"
            >
              <Zap className="text-yellow-400 w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold mb-2">Gestión de Luz</h3>
                <p className="text-sm text-neutral-400">Transmisión de luz de 10% a 98%.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
