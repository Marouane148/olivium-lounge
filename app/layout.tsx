import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import LocalBusinessJsonLd from '@/components/lounge/LocalBusinessJsonLd';
import { SITE_URL, business } from '@/lib/business';

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

const title = "L'Olivium Lounge | Bar à Chicha Premium – Le Pré-Saint-Gervais";
const description = `L'Olivium Lounge, bar à chicha, restaurant et salon de thé à ${business.addressLocality} (${business.postalCode}). Chichas premium, cocktails et ambiance lounge. Noté ${business.ratingValue}/5 sur ${business.reviewCount} avis Google. Ouvert tous les jours 11h–2h.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | L'Olivium Lounge",
  },
  description,
  keywords: [
    'bar à chicha',
    'chicha Le Pré-Saint-Gervais',
    'bar à chicha Pantin',
    'bar à chicha Paris 19',
    'narguilé Seine-Saint-Denis',
    'salon de thé chicha',
    'lounge chicha premium',
    'meilleur bar à chicha 93',
    'cocktails lounge',
    'réservation chicha',
  ],
  applicationName: business.name,
  authors: [{ name: business.name }],
  category: 'Bar à chicha',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: business.name,
    title,
    description: `Chicha premium • Cocktails • Ambiance lounge • ${business.addressLocality}`,
    images: [{ url: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: `Chicha premium • Cocktails • Ambiance lounge • ${business.addressLocality}`,
    images: ['https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
