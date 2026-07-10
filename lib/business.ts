// Source of truth for the establishment's NAP (Name/Address/Phone) and Google identifiers.
// Keep this in sync with the Google Business Profile to preserve local SEO consistency.

export const SITE_URL = 'https://olivium-lounge.fr'; // TODO: replace with the real domain

export const business = {
  name: "L'Olivium Lounge",
  legalName: "L'Olivium",
  telephone: '+33616461770',
  telephoneDisplay: '+33 6 16 46 17 70',
  priceRange: '20€-30€',
  streetAddress: '7 Avenue du Belvédère',
  addressLocality: 'Le Pré-Saint-Gervais',
  postalCode: '93310',
  addressCountry: 'FR',
  latitude: 48.8800315,
  longitude: 2.4108981,
  ratingValue: 4.8,
  reviewCount: 18,
  googleMapsUrl: 'https://www.google.com/maps?cid=9699727340294397041',
  // TODO: replace with the official short link from Google Business Profile
  // ("Demander des avis" button) once available — it deep-links straight to
  // the review form instead of the place page. The ftid= deep-link trick was
  // dropped because Google intermittently rejects it with a 400 error.
  googleWriteReviewUrl: 'https://www.google.com/maps?cid=9699727340294397041',
  openingHours: { opens: '11:00', closes: '02:00' },
  sameAs: ['https://instagram.com', 'https://facebook.com'], // TODO: replace with real profile URLs
} as const;
