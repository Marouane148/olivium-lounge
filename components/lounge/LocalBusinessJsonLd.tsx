import { business, SITE_URL } from '@/lib/business';
import { servesCuisine } from '@/lib/menu';

export default function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    legalName: business.legalName,
    url: `${SITE_URL}/`,
    telephone: business.telephone,
    priceRange: business.priceRange,
    logo: `${SITE_URL}/brand/logo-512.png`,
    image: `${SITE_URL}/og-image.jpg`,
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
    hasMap: business.googleMapsPlaceUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: business.openingHours.opens,
        closes: business.openingHours.closes,
      },
    ],
    servesCuisine,
    hasMenu: `${SITE_URL}/menu`,
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
