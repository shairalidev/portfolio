# shairali.com

Personal portfolio of **Shair Ali**, full-stack developer. Multi-page React site with a WebGL hero, case studies with homepage video tours, and SEO structured data.

## Stack

React 18 · Vite 4 · React Router 6 · SCSS · three.js / @react-three/fiber · Lenis · Iconify · EmailJS · Cloudflare Pages

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the EmailJS keys for the contact form
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint, zero warnings allowed |

## Editing content

All copy lives in `src/data/`, so no component changes are needed for content updates:

- `profile.json`: intro, bio, stats, email, WhatsApp number, socials
- `projects.json`: case studies (add an object to add a project)
- `services.json`, `experience.json`, `skills.json`, `testimonials.json`

### Adding a project

1. Put WebP images in `public/images/projects/<slug>/` (`thumb.webp`, `hero.webp`, optional `mobile.webp` and feature shots).
2. Add a homepage video (optional). Each project in `projects.json` has a `video` slot pointing at `/videos/<slug>.mp4`; until that file exists the hero screenshot is shown. Record one yourself (1280×800 MP4, ~10–12 s, muted, ideally under 2 MB) or generate it:
   ```bash
   node scripts/capture-site.mjs https://example.com ./tmp-media <slug> --wait 5000
   ```
   Copy `<slug>.mp4` and a WebP of `<slug>-poster.jpg` into `public/videos/`.
3. Add the entry to `src/data/projects.json` (plus a 1200×630 `public/images/og/<slug>.jpg` share image) and a `<url>` to `public/sitemap.xml`. The page is prerendered automatically on the next build.

Raw, unedited screenshots are kept in `design-assets/screenshots/` (not deployed). Blur any personal data before publishing.

## Deployment

`npm run build` produces static HTML for every route (`scripts/prerender.mjs`), so link previews and search engines see real content and each page has its own title and share image.

Every push to `main` runs `.github/workflows/deploy.yml`: build with Node 22, then deploy `dist/` to Cloudflare Pages. Environment variables come from the `BACKEND_ENV` repository secret (see `.env.example`).
