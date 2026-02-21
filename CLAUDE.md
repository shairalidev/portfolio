# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start local dev server (Vite)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint with zero-warnings policy (--max-warnings 0)
```

No test framework is configured.

## Architecture

**Stack:** React 18 + Vite 4.4, JavaScript/JSX (no TypeScript), Bootstrap 5 + SCSS, React Router v6.

**Entry flow:** `main.jsx` → `App.jsx` (BrowserRouter + HelmetProvider) → `Layout.jsx` (Header, Footer, Preloader, CustomCursor) → `Home.jsx` → section components.

**Single-page app:** One route renders `Home.jsx`, which imports all section data from `src/HomePageData.json` and passes it as props to each section component. This JSON file is the single source of truth for all content.

**Styling:** Global SCSS at `src/sass/style.scss`; Bootstrap grid; component-scoped `.scss` files alongside components. Theme variables (colors, spacing) defined in `src/sass/default/_variable.scss`. Primary accent: `#fec544` (golden yellow); dark backgrounds: `#151b29`, `#070d1b`.

**Animations:** AOS for scroll-triggered fade effects; GSAP for advanced animations; custom parallax in Hero; 1-second preloader on page load.

**SEO:** Managed via `react-helmet-async` in `Home.jsx` — includes JSON-LD structured data (Person, WebSite, ItemList schemas), Open Graph/Twitter cards, and canonical URL (`https://shairali.com/`).

## Key Files

| File | Purpose |
|---|---|
| `src/HomePageData.json` | All content data (hero, about, skills, portfolio, resume, etc.) |
| `src/pages/Home.jsx` | Main page — data distribution hub and SEO helmet |
| `src/App.jsx` | Router and provider setup |
| `src/components/Layout/` | Persistent shell (header, footer, preloader, cursor) |
| `src/sass/default/_variable.scss` | Design tokens (colors, fonts) |
| `index.html` | HTML template with base meta tags |

## Conventions

- Content changes go in `src/HomePageData.json`, not in component files.
- Component props use PropTypes for validation.
- `st-*` CSS class prefix convention for custom utility classes.
- ESLint must pass with zero warnings before commits (`npm run lint`).
