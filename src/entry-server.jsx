import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import './lib/icons';
import { AppRoutes } from './App';

/**
 * Renders one route to HTML at build time (see scripts/prerender.mjs).
 * Waits for lazy pages so the full page content and its <head> tags are captured.
 */
export const render = (url) =>
  new Promise((resolve, reject) => {
    const helmetContext = {};
    let html = '';
    const stream = new PassThrough();
    stream.on('data', (chunk) => {
      html += chunk;
    });
    stream.on('end', () => resolve({ html, helmet: helmetContext.helmet }));

    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady: () => pipe(stream),
        onShellError: reject,
        onError: reject,
      }
    );
  });
