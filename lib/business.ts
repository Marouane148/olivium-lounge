// Source of truth for the establishment's NAP (Name/Address/Phone) and Google identifiers.
// Keep this in sync with the Google Business Profile to preserve local SEO consistency.

export const SITE_URL = 'https://www.olivium-lounge.fr';

export const business = {
  name: "L'Olivium Lounge",
  legalName: "L'Olivium",
  telephone: '+33616461770',
  telephoneDisplay: '+33 6 16 46 17 70',
  priceRange: '20-30 €',
  streetAddress: '7 Avenue du Belvédère',
  addressLocality: 'Le Pré-Saint-Gervais',
  postalCode: '93310',
  addressCountry: 'FR',
  latitude: 48.8800315,
  longitude: 2.4108981,
  ratingValue: 4.8,
  googleMapsUrl: 'https://www.google.com/maps?cid=9699727340294397041',
  googleMapsPlaceUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJsVR1IgVt5kcRcVxk6J9anIY',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJsVR1IgVt5kcRcVxk6J9anIY',
  openingHours: { opens: '11:00', closes: '02:00' },
  sameAs: ['https://www.tiktok.com/@lolivium_lounge'],
} as const;
