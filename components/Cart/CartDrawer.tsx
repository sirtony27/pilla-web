'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export const CartDrawer = () => {
    const { items, isOpen, closeCart, removeItem } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "5492915764359"; // Updated Numberr

        let message = `Hola, me interesa encargar el siguiente pedido:\n\n`;
        items.forEach((item, index) => {
            message += `${index + 1}. *${item.modelName}* - ${item.lensCode} ($${item.price})\n`;
        });
        message += `\n*TOTAL ESTIMADO: $${totalPrice}*\n\n`;
        message += `Quedo a la espera de la confirmación de stock y envío. Gracias.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-neutral-900 border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <ShoppingBag className="text-indigo-500" />
                                Tu Pedido
                            </h2>
                            <button onClick={closeCart} className="text-neutral-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-4">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p>Tu carrito está vacío.</p>
                                    <button onClick={closeCart} className="text-indigo-400 font-bold hover:text-indigo-300">
                                        Ver Catálogo
                                    </button>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    // Using index as key fallback if duplicate IDs exist, but ideally specialized ID
                                    <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 bg-neutral-950 rounded-xl border border-white/5">
                                        <div className="relative w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image src={item.image} alt={item.lensCode} fill className="object-contain p-2" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-white">{item.lensCode}</h3>
                                                <p className="text-xs text-neutral-400">{item.modelName}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-mono text-neutral-200">${item.price}</span>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500/50 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-neutral-900">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-neutral-400 uppercase text-xs tracking-widest">Total Estimado</span>
                                    <span className="text-2xl font-bold text-white">${totalPrice}</span>
                                </div>
                                <button
                                    onClick={handleWhatsAppCheckout}
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                >
                                    <MessageCircle size={20} />
                                    SOLICITAR VÍA WHATSAPP
                                </button>
                                <p className="text-center text-xs text-neutral-500 mt-4">
                                    Serás redirigido a WhatsApp para finalizar la coordinación con un vendedor.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
