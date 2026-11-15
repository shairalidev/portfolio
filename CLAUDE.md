# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server (Vite)
npm run build     # Production build: client bundle + SSR bundle + prerender every route to static HTML
npm run preview   # Preview production build locally
npm run lint      # ESLint with zero-warnings policy (--max-warnings 0)

# Re-record a project's homepage video + screenshots (uses local Edge/Chrome, no ffmpeg needed)
node scripts/capture-site.mjs <url> <outDir> <name> [--seconds 12] [--wait 2500] [--warm] [--no-video]
```

No test framework is configured. Deployed on Cloudflare Pages via `.github/workflows/deploy.yml` (push to `main` = production deploy).

**Prerendering:** `src/entry-server.jsx` + `scripts/prerender.mjs` render every route at build time (`/about` → `dist/about.html`, `/work/<slug>` → `dist/work/<slug>.html`, unknown → `dist/404.html` with a real 404). `main.jsx` hydrates. New routes or projects must be added to the route list in `scripts/prerender.mjs` (projects are picked up automatically from `projects.json`). Code that runs during render must be SSR-safe (touch `window`/`document` only inside effects). `public/_redirects` maps legacy `/project/:slug` URLs.

## Architecture

**Stack:** React 18 + Vite 4, JavaScript/JSX, SCSS (no Bootstrap), React Router v6, react-helmet-async, three.js via @react-three/fiber (lazy-loaded), Lenis smooth scroll, Iconify icons.

**Routes** (`src/App.jsx`, all inside `components/layout/Layout.jsx`): `/` Home · `/work` · `/work/:slug` case study · `/about` · `/services` · `/contact` · `*` 404. Old `/project/:slug` links redirect to `/work/:slug`. All pages except Home are lazy-loaded.

**Content lives in `src/data/*.json`** (never hard-code content in components):
| File | Contents |
|---|---|
| `profile.json` | Name, intro, bio, stats, contact (email, WhatsApp number), socials |
| `projects.json` | Case studies: summary, challenge/solution, metrics, highlights, journey steps, architecture layers, engineering notes, stack, gallery, video |
| `services.json` | Services, process steps, FAQ |
| `experience.json` | Experience + education timeline |
| `skills.json` | Grouped tech stack (Iconify icon names) |
| `testimonials.json` | Client reviews |

`src/lib/content.js` exposes helpers (`getProject`, `whatsappUrl`, `absoluteUrl`, `personJsonLd`).

**Components:** `layout/` (Header, Footer, WhatsAppButton, Layout) · `ui/` (Button, Reveal, TiltCard, BrowserFrame, Seo, SectionHeader, PageHeader, CtaBand) · `home/` (Hero + lazy `Hero3D` WebGL scene) · `sections/` (Stats, ServicesGrid, ProcessSteps, TechStack/TechMarquee, Testimonials, Faq) · `work/` (ProjectCard, ProjectVideo, Gallery, Lightbox, JourneySlider, ArchitectureDiagram) · `forms/ContactForm` (EmailJS via `VITE_EMAILJS_*` env vars).

**Styling:** `src/styles/main.scss` → `_tokens` (CSS custom properties: colours, radii, spacing), `_base`, `_components`, `_home`, `_case`, `_pages`; breakpoints/mixins in `_mixins`. Brand accent `--accent: #fec544`; per-project brand colour is `--project` (set inline from `projects.json` `accent`). Dark theme only.

**3D & motion:** `Hero3D` only loads on desktop with WebGL and no reduced-motion; otherwise the CSS-3D `HeroStack` fallback renders. `Reveal` handles scroll-in animations via IntersectionObserver. Everything respects `prefers-reduced-motion`.

**SEO:** each page renders `<Seo>` (title, description, canonical, OG/Twitter, JSON-LD). Update `public/sitemap.xml` when adding pages or projects.

## Assets

- Project images: `public/images/projects/<slug>/` as WebP (`thumb`, `hero`, `mobile`, feature shots). Raw source screenshots live in `design-assets/screenshots/` (not deployed).
- Homepage videos: `public/videos/<slug>.mp4` + `<slug>-poster.webp`. Every project has a `video` slot in `projects.json`; if the file is missing the hero image is shown instead (Rivelya's slot is currently empty — just drop `rivelya.mp4` in).
- Share images: `public/images/og/<slug>.jpg` (1200×630) per project, referenced by `ogImage`.
- Icons are bundled offline in `src/lib/icons.json` (registered in `src/lib/icons.js`). When using a new Iconify icon, add it there or it will be fetched from the Iconify API at runtime.
- Fonts are self-hosted (`@fontsource-variable/inter`, `@fontsource-variable/space-grotesk`); `vite.config.js` preloads the latin files.
- Never ship screenshots that show personal data (emails, client names, request IDs): blur them first.

## Conventions

- Component props use PropTypes.
- Folder names are lowercase (the build runs on case-sensitive Linux).
- ESLint must pass with zero warnings before commits (`npm run lint`).
