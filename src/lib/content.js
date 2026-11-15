import profile from '../data/profile.json';
import projects from '../data/projects.json';
import { faq } from '../data/services.json';
import credentials from '../data/credentials.json';

export const SITE_URL = profile.siteUrl;

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/contact', label: 'Contact' },
];

export const faqJsonLd = (items = faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
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
  alternateName: profile.alternateNames,
  givenName: 'Shair',
  familyName: 'Ali',
  url: `${SITE_URL}/`,
  mainEntityOfPage: `${SITE_URL}/`,
  image: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#portrait`,
    url: absoluteUrl(profile.portraitJpg),
    contentUrl: absoluteUrl(profile.portraitJpg),
    width: 720,
    height: 720,
    caption: profile.portraitAlt,
    creditText: profile.name,
    creator: { '@type': 'Person', name: profile.name },
    copyrightNotice: `© ${profile.name}`,
    acquireLicensePage: `${SITE_URL}/contact`,
  },
  jobTitle: profile.role,
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack Developer',
    occupationLocation: { '@type': 'Country', name: 'Pakistan' },
    skills: 'React, Next.js, Node.js, MongoDB, PostgreSQL, Stripe, WebRTC, OpenAI, n8n, AWS, DigitalOcean, Nginx, CI/CD',
  },
  worksFor: { '@type': 'Organization', name: 'Self-employed (freelance)' },
  nationality: { '@type': 'Country', name: 'Pakistan' },
  email: `mailto:${profile.email}`,
  description: profile.intro,
  // Google's AI Overview has mixed me up with other people named Shair Ali; spell out who this is.
  disambiguatingDescription:
    'Shair Ali (devshair on Fiverr, shairalidev on GitHub), a self-employed freelance full-stack and AI developer from Pakistan and Riphah International University graduate.',
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
    url: absoluteUrl('/achievements'),
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
    'AI agents',
    'AI app rescue (Lovable, Bolt, Cursor)',
    'n8n automation',
    'WhatsApp AI assistants',
    'AWS',
    'DevOps',
  ],
});

export { profile, projects, credentials };
