import { lenses } from '@/data/lenses';
import { LensSimulator } from '@/components/POV/LensSimulator';
import { notFound } from 'next/navigation';
import { Shield, Sun, Eye, Activity } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/Cart/AddToCartButton';

interface ProductPageProps {
    params: {
        id: string;
    };
}

export async function generateStaticParams() {
    return lenses.map((lens) => ({
        id: lens.id,
    }));
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const lens = lenses.find((l) => l.id === id);

    if (!lens) {
        notFound();
    }

    return (
        <main className="bg-neutral-950 min-h-screen">

            {/* 1. Simulator Hero Section */}
            <section className="relative w-full h-[60vh] lg:h-[70vh] bg-black border-b border-neutral-800">
                <LensSimulator lens={lens} />

                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 pointer-events-none">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl mb-2">
                        {lens.lensCode}
                    </h1>
                    <p className="text-xl text-white/80 font-medium drop-shadow-md">
                        Serie {lens.modelName}
                    </p>
                </div>
            </section>

            {/* 2. Product Details */}
            <section className="max-w-[1200px] mx-auto px-6 py-16 grid lg:grid-cols-3 gap-16">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Tecnología del Lente</h2>
                        <p className="text-lg text-neutral-300 leading-relaxed">
                            {lens.description}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                            <Sun className="text-indigo-500 mb-4" size={32} />
                            <h3 className="font-bold text-white mb-2">Condición de Luz</h3>
                            <p className="text-neutral-400 text-sm">
                                Optimizado para entornos de {lens.transmission > 60 ? "Baja Luz" : lens.transmission > 30 ? "Luz Media" : "Pleno Sol"} con un {lens.transmission}% de Transmisión de Luz.
                            </p>
                        </div>
                        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
                            <Eye className="text-indigo-500 mb-4" size={32} />
                            <h3 className="font-bold text-white mb-2">Ciencia Visual</h3>
                            <p className="text-neutral-400 text-sm">
                                Mejora del objetivo mediante tecnología {lens.family}. Realza espectros {lens.colorCategory} para máxima registración.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sticky Sidebar / Buy Box */}
                <div className="relative">
                    <div className="sticky top-24 bg-neutral-900/80 backdrop-blur-md border border-white/10 text-white p-8 rounded-2xl shadow-2xl ring-1 ring-white/5">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="block text-sm text-neutral-400 font-bold uppercase tracking-wider mb-1">{lens.family}</span>
                                <h3 className="text-2xl font-bold">{lens.lensCode}</h3>
                            </div>
                            <div className="text-xl font-bold">$249.00</div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm py-2 border-b border-white/10">
                                <span className="text-neutral-400">Transmisión</span>
                                <span className="font-medium text-neutral-200">{lens.transmission}%</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/10">
                                <span className="text-neutral-400">Contraste</span>
                                <span className="font-medium text-neutral-200">Alto Realce (x{lens.simulationProfile.contrast})</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/10">
                                <span className="text-neutral-400">Color Base</span>
                                <span className="font-medium text-neutral-200">{lens.colorCategory}</span>
                            </div>
                        </div>

                        <AddToCartButton
                            sku={lens.id}
                            item={{
                                lensId: lens.id,
                                lensCode: lens.id,
                                modelName: `Serie ${lens.modelName}`, // Or just modelName
                                price: 249, // Pricing logic could be dynamic later
                                image: lens.imgUrl // Using the lens image for cart
                            }}
                        />
                        <p className="text-xs text-center text-neutral-500">
                            Envíos gratis en órdenes superiores a $500. Garantía de por vida.
                        </p>
                    </div>
                </div>

            </section>
        </main>
    );
}
