// Regenerates public/sitemap.xml (pages + images + PDFs) from src/data/*.json.
// Usage: node scripts/generate-sitemap.mjs [YYYY-MM-DD]   (defaults to today)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => JSON.parse(readFileSync(join(root, 'src/data', file), 'utf8'));
const BASE = 'https://shairali.com';
const lastmod = process.argv[2] || new Date().toISOString().slice(0, 10);

const profile = read('profile.json');
const projects = read('projects.json');
const credentials = read('credentials.json');
const servicePages = read('service-pages.json');

const missing = [];
const image = (src) => {
  if (!existsSync(join(root, 'public', src))) {
    missing.push(src);
    return '';
  }
  return `    <image:image><image:loc>${BASE}${src}</image:loc></image:image>\n`;
};
const url = (loc, images = []) =>
  `  <url>\n    <loc>${BASE}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n${[...new Set(images.filter(Boolean))].map(image).join('')}  </url>\n`;

const projectImages = (p) => [
  p.hero,
  p.cover,
  p.mobile,
  ...(p.highlights || []).map((h) => h.image),
  ...(p.gallery || []).map((g) => (typeof g === 'string' ? g : g.src)),
  ...(p.journey || []).map((j) => j.image),
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
xml += url('/', [profile.portraitJpg, profile.portrait, profile.ogImage, ...projects.map((p) => p.cover)]);
xml += url('/about', [profile.portraitJpg, credentials.award.imageSmall]);
xml += url('/achievements', [
  credentials.award.imageJpg,
  credentials.award.image,
  credentials.degree.image.replace('.webp', '.jpg'),
  credentials.degree.image,
  ...credentials.references.map((r) => r.preview),
  ...credentials.documents.map((d) => d.preview),
]);
xml += url('/work', projects.map((p) => p.cover));
projects.forEach((p) => {
  xml += url(`/work/${p.slug}`, projectImages(p));
});
xml += url('/services');
servicePages.forEach((s) => {
  xml += url(`/services/${s.slug}`, s.proof.map((pr) => projects.find((p) => p.slug === pr.slug)?.cover));
});
xml += url('/contact');
[...credentials.documents.map((d) => d.url), ...credentials.references.map((r) => r.doc)].forEach((doc) => {
  xml += url(doc);
});
xml += '</urlset>\n';

writeFileSync(join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap: ${(xml.match(/<url>/g) || []).length} urls, ${(xml.match(/<image:image>/g) || []).length} images`);
if (missing.length) console.warn('missing images (skipped):', missing);
