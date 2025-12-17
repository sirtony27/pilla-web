'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { CartDrawer } from '@/components/Cart/CartDrawer';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items, toggleCart } = useCartStore();
    const openSearch = useUIStore((state) => state.openSearch);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <CartDrawer />

            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative w-32 h-10">
                        <Image
                            src="/white-logo.avif"
                            alt="Pilla Performance Eyewear"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-base font-semibold text-neutral-200">
                        <Link href="/" className="hover:text-white transition-colors">INICIO</Link>
                        <Link href="/catalog" className="hover:text-white transition-colors">CATÁLOGO</Link>
                        <Link href="/technology" className="hover:text-white transition-colors">TECNOLOGÍA</Link>
                        <Link href="/athletes" className="hover:text-white transition-colors">ATLETAS</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={openSearch}
                            className="hover:text-white text-neutral-400 transition-colors"
                        >
                            <Search size={20} />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="relative hover:text-white text-neutral-400 transition-colors"
                        >
                            <ShoppingBag size={20} />
                            {mounted && items.length > 0 && (
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-600 text-[10px] flex items-center justify-center rounded-full text-white font-bold animate-in zoom-in">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <button
                            className="md:hidden hover:text-white text-neutral-400 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-neutral-950 border-b border-white/10">
                        <nav className="flex flex-col p-6 gap-4 text-sm font-medium text-neutral-300">
                            <Link href="/" onClick={() => setIsMenuOpen(false)}>INICIO</Link>
                            <Link href="/catalog" onClick={() => setIsMenuOpen(false)}>CATÁLOGO</Link>
                            <Link href="/technology" onClick={() => setIsMenuOpen(false)}>TECNOLOGÍA</Link>
                            <Link href="/athletes" onClick={() => setIsMenuOpen(false)}>ATLETAS</Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};
