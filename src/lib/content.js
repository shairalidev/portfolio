import profile from '../data/profile.json';
import projects from '../data/projects.json';
import { faq } from '../data/services.json';
import credentials from '../data/credentials.json';

export const SITE_URL = profile.siteUrl;

export const NAV_LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const absoluteUrl = (path = '/') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

export const whatsappUrl = (message = profile.whatsappMessage) =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacentProjects = (slug) => {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
};

export const personJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  url: `${SITE_URL}/`,
  image: absoluteUrl(profile.portrait),
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  description: profile.intro,
  knowsLanguage: profile.languages,
  address: { '@type': 'PostalAddress', addressCountry: 'PK' },
  sameAs: profile.socials.map((s) => s.url),
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Riphah International University', url: 'https://www.riphah.edu.pk' },
  award: `${credentials.award.title}, ${credentials.award.event} (${credentials.award.issuer})`,
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: `${credentials.degree.title}, CGPA ${credentials.degree.cgpa}`,
    credentialCategory: 'degree',
    educationalLevel: 'Bachelor',
    recognizedBy: { '@type': 'CollegeOrUniversity', name: 'Riphah International University' },
    url: absoluteUrl('/credentials'),
  },
  knowsAbout: [
    'Full-stack web development',
    'React',
    'Next.js',
    'Node.js',
    'Stripe payments',
    'Real-time applications',
    'WebRTC',
    'AI chatbots',
    'AWS',
    'DevOps',
  ],
});

export { profile, projects, credentials };
