import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import { CommandMenu } from '@/components/Search/CommandMenu';
import "./globals.css";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Pilla Argentina',
    default: 'Pilla Performance Eyewear | Lentes de Tiro Deportivo',
  },
  description: "Dominá la luz con la tecnología óptica de Pilla y ZEISS. Lentes balísticos de alto contraste para tiro al plato, caza y tiro práctico.",
  keywords: ["Pilla", "Gafas de Tiro", "Tiro al Plato", "Zeiss", "Lentes Balísticos", "Tiro Práctico", "IPSC", "Caza"],
  openGraph: {
    title: 'Pilla Performance Eyewear Argentina',
    description: 'La mejor tecnología óptica del mundo para tiradores. Lentes ZEISS VIVX.',
    url: 'https://pilla.com.ar',
    siteName: 'Pilla Argentina',
    images: [
      {
        url: '/og-image.jpg', // We should ensure this exists or use a generic one
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <Toaster position="top-center" richColors theme="dark" />
        <CommandMenu />
        <Header />
        <div className="pt-16 min-h-screen flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
