export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.theswaymvar.com';

export const BUSINESS_INFO = {
  name: 'The Swaymvar',
  legalName: 'The Swaymvar',
  description: 'The Swaymvar is a wedding photography and cinematic wedding films studio based in Bikaner, Rajasthan, India, documenting weddings through photography, videography and visual storytelling across Rajasthan and destination wedding locations.',
  slogan: 'Wedding Photography & Cinematic Wedding Films',
  email: 'theswaymvar@gmail.com',
  telephone: '+918049422388',
  founder: 'Riya Maru',
  areaServed: ['Bikaner', 'Rajasthan', 'India', 'Destination Wedding Locations'],
  knowsAbout: [
    'Wedding Photography',
    'Wedding Videography',
    'Cinematic Wedding Films',
    'Candid Wedding Photography',
    'Destination Wedding Photography',
    'Wedding Films'
  ],
  address: {
    '@type': 'PostalAddress',
    'streetAddress': 'Shop - 101, Shanti Nath Empire, GS Road',
    'addressLocality': 'Bikaner',
    'addressRegion': 'Rajasthan',
    'postalCode': '334001',
    'addressCountry': 'IN'
  },
  social: [
    'https://www.instagram.com/theswaymvar/'
  ]
};

export function getSeoMetadata(title: string, description: string, path: string = '') {
  const url = `${SITE_URL}${path}`;
  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];
}
