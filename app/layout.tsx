import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "L'Olivium Lounge | Chicha Premium • Paris",
  description:
    "L'Olivium Lounge — Un espace raffiné mêlant chichas premium, cocktails et ambiance lounge luxe à Le Pré-Saint-Gervais.",
  keywords: ['chicha', 'lounge', 'Paris', 'premium', 'cocktails', 'réservation'],
  openGraph: {
    title: "L'Olivium Lounge",
    description: "Chicha • Ambiance • Cocktails • Luxe",
    images: [{ url: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
