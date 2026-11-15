#!/usr/bin/env node
/**
 * Build-time prerender: renders every route with the SSR bundle (dist-ssr/entry-server.js)
 * and writes static HTML into dist/, so crawlers and link previews (LinkedIn, WhatsApp, X…)
 * see each page's real content and <head> tags. The browser then hydrates it.
 *
 * Output layout matches Cloudflare Pages routing:  /           -> dist/index.html
 *                                                  /work       -> dist/work.html
 *                                                  /work/slug  -> dist/work/slug.html
 *                                                  (unknown)   -> dist/404.html  (real 404 status)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const projects = JSON.parse(readFileSync(join(root, 'src/data/projects.json'), 'utf8'));

const routes = [
  ['/', 'index.html'],
  ['/work', 'work.html'],
  ['/about', 'about.html'],
  ['/services', 'services.html'],
  ['/contact', 'contact.html'],
  ['/credentials', 'credentials.html'],
  ...projects.map((p) => [`/work/${p.slug}`, `work/${p.slug}.html`]),
  ['/__not-found__', '404.html'],
];

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

// Tags the page's <Seo> component owns are marked data-rh in index.html; drop them and use Helmet's.
const template = readFileSync(join(dist, 'index.html'), 'utf8')
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/^\s*<(meta|link)[^>]*data-rh="true"[^>]*>\s*$/gm, '');

for (const [url, file] of routes) {
  const { html, helmet } = await render(url);
  const head = [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
    .map((part) => part.toString())
    .filter(Boolean)
    .join('\n  ');
  const page = template
    .replace('</head>', `  ${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, page);
  console.log(`prerendered ${url.padEnd(36)} -> dist/${file}`);
}

rmSync(ssrDir, { recursive: true, force: true });
