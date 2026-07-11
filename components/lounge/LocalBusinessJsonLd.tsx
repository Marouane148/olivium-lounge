import { business, SITE_URL } from '@/lib/business';

export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['BarOrPub', 'CafeOrCoffeeShop'],
    '@id': `${SITE_URL}#business`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    telephone: business.telephone,
    priceRange: business.priceRange,
    logo: `${SITE_URL}/brand/logo-512.png`,
    image: [
      `${SITE_URL}/gallery/olivium-1.jpg`,
      `${SITE_URL}/gallery/olivium-2.jpg`,
      `${SITE_URL}/gallery/olivium-6.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.latitude,
      longitude: business.longitude,
    },
    hasMap: business.googleMapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.ratingValue,
      reviewCount: business.reviewCount,
      bestRating: 5,
    },
    servesCuisine: ['Chicha', 'Cocktails', 'Salon de thé'],
    sameAs: business.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
