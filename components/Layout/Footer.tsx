import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 text-neutral-400 py-12">
            <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <div className="relative w-32 h-10 mb-4">
                        <Image
                            src="/white-logo.avif"
                            alt="Pilla Performance Eyewear"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                    <p className="text-sm leading-relaxed mb-4">
                        Lentes de Alto Rendimiento para Tiro Deportivo.
                        Ver Mejor. Rendir Mejor.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white transition-colors"><Instagram size={20} /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Facebook size={20} /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                        <Link href="#" className="hover:text-white transition-colors"><Youtube size={20} /></Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Tienda</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/catalog" className="hover:text-white transition-colors">Todos los Lentes</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Marcos</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Accesorios</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Tarjetas de Regalo</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Soporte</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-white transition-colors">Contactanos</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Garantía</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</Link></li>
                        <li><Link href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Novedades</h4>
                    <p className="text-sm mb-4">Suscribite para recibir noticias y ofertas.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="bg-neutral-900 border border-neutral-800 rounded-l px-4 py-2 text-sm w-full focus:outline-none focus:border-indigo-500"
                        />
                        <button className="bg-white text-black px-4 py-2 text-sm font-bold rounded-r hover:bg-neutral-200 transition-colors">
                            UNIRME
                        </button>
                    </form>
                </div>

            </div>
            <div className="max-w-[1400px] mx-auto px-6 mt-12 pt-8 border-t border-neutral-900 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center">
                <p>© {new Date().getFullYear()} Pilla Performance Eyewear. Todos los derechos reservados.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
                    <Link href="#" className="hover:text-white transition-colors">Términos</Link>
                </div>
            </div>
        </footer>
    );
};
