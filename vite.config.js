import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Adds <link rel="preload"> for the latin variable-font files so headings never flash a fallback font. */
const preloadFonts = () => ({
  name: 'preload-fonts',
  enforce: 'post',
  transformIndexHtml(html, ctx) {
    if (!ctx.bundle) return html
    return Object.keys(ctx.bundle)
      .filter((file) => /(inter)-latin-wght-normal-[\w-]+\.woff2$/.test(file))
      .map((file) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head',
      }))
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ ssrBuild }) => ({
  plugins: [react(), preloadFonts()],
  // CommonJS packages without proper ESM named exports must be bundled into the prerender (SSR) build.
  ssr: { noExternal: ['react-helmet-async'] },
  build: {
    // three.js lives in its own lazy chunk (desktop hero only), so its size is expected.
    chunkSizeWarningLimit: 900,
    rollupOptions: ssrBuild
      ? {}
      : {
          output: {
            // Framework code changes rarely: keep it in its own long-cached chunk.
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            },
          },
        },
  },
}))
