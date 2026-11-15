#!/usr/bin/env node
/**
 * Captures marketing media for a live project:
 *   <name>-desktop.png   1440x900 first-screen screenshot
 *   <name>-mobile.png    390x844 @2x first-screen screenshot
 *   <name>.mp4           1280x800 smooth homepage scroll loop (H.264)
 *   <name>-poster.jpg    first video frame
 *
 * Uses a locally installed Edge/Chrome over the DevTools protocol, and encodes the
 * video inside the browser with WebCodecs + mp4-muxer, so no ffmpeg is needed.
 *
 * Usage: node scripts/capture-site.mjs <url> <outDir> <name> [--seconds 12] [--max-scroll 5200] [--wait 2500] [--warm] [--no-video]
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [url, outDirArg, name, ...rest] = process.argv.slice(2);
if (!url || !outDirArg || !name) {
  console.error('Usage: node scripts/capture-site.mjs <url> <outDir> <name> [--seconds 12] [--max-scroll 5200] [--no-video]');
  process.exit(1);
}
const flag = (k, d) => {
  const i = rest.indexOf(k);
  return i === -1 ? d : Number(rest[i + 1]);
};
const SECONDS = flag('--seconds', 12);
const MAX_SCROLL = flag('--max-scroll', 5200);
const NO_VIDEO = rest.includes('--no-video');
const WAIT = flag('--wait', 2500); // extra settle time after load, for slow single-page apps
const WARM = rest.includes('--warm'); // load once to fill the cache, then capture on a reload
const FPS = 30;
const VIDEO_W = 1280;
const VIDEO_H = 800;
const VIEW_W = 1440;
const VIEW_H = 900;
const outDir = resolve(outDirArg);
mkdirSync(outDir, { recursive: true });

const BROWSERS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browserPath = process.env.BROWSER_PATH || BROWSERS.find((p) => existsSync(p));
if (!browserPath) throw new Error('No Chromium-based browser found. Set BROWSER_PATH.');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 9300 + Math.floor(Math.random() * 500);
const profile = join(tmpdir(), `capture-profile-${PORT}`);

const browser = spawn(browserPath, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--hide-scrollbars',
  '--mute-audio',
  '--no-first-run',
  '--no-default-browser-check',
  `--window-size=${VIEW_W},${VIEW_H}`,
  'about:blank',
], { stdio: 'ignore' });

async function getPageWs() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch { /* browser still starting */ }
    await sleep(500);
  }
  throw new Error('Browser did not start');
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
    } else if (msg.method && listeners.has(msg.method)) {
      listeners.get(msg.method).forEach((fn) => fn(msg.params));
    }
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    id += 1;
    pending.set(id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const once = (method, timeout = 45000) => new Promise((res) => {
    const t = setTimeout(() => res(null), timeout);
    const fn = (p) => { clearTimeout(t); listeners.set(method, (listeners.get(method) || []).filter((f) => f !== fn)); res(p); };
    listeners.set(method, [...(listeners.get(method) || []), fn]);
  });
  return new Promise((res, rej) => {
    ws.onopen = () => res({ send, once, close: () => ws.close() });
    ws.onerror = rej;
  });
}

const evaluate = async (cdp, expression) => {
  const r = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return r.result?.value;
};

// Accepts cookie banners and closes promo popups (× buttons / aria-label "close") so they stay out of the video.
const DISMISS_BANNERS = `(() => {
  const accept = /^(accept|accept all|accetta|accetta tutto|accetto|agree|allow all|ok|got it|i agree|consenti)$/i;
  const close = /^(×|✕|✖|x)$/i;
  [...document.querySelectorAll('button, a, [role=button]')]
    .filter((el) => {
      const text = (el.innerText || '').trim();
      const label = el.getAttribute('aria-label') || '';
      return accept.test(text) || close.test(text) || /^(close|chiudi|dismiss)/i.test(label);
    })
    .forEach((el) => { try { el.click(); } catch (e) {} });
  return true;
})()`;

const nextFrame = 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => r(true))))';

async function navigate(cdp, target, mobile) {
  await cdp.send('Emulation.setDeviceMetricsOverride', mobile
    ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
    : { width: VIEW_W, height: VIEW_H, deviceScaleFactor: 1, mobile: false });
  if (mobile) {
    await cdp.send('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });
  }
  const passes = WARM ? 2 : 1;
  for (let i = 0; i < passes; i += 1) {
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: target });
    await loaded;
    await sleep(WAIT);
  }
  await evaluate(cdp, DISMISS_BANNERS);
  await sleep(1200);
}

async function screenshot(cdp, file, opts = {}) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', ...opts });
  writeFileSync(file, Buffer.from(data, 'base64'));
  console.log('saved', file);
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);

async function recordFrames(cdp) {
  // Pre-scroll once so lazy-loaded media is in place before recording.
  const scrollMax = await evaluate(cdp, 'Math.max(0, document.documentElement.scrollHeight - innerHeight)');
  const distance = Math.min(scrollMax, MAX_SCROLL);
  for (let y = 0; y <= distance; y += 500) {
    await evaluate(cdp, `window.scrollTo(0, ${y})`);
    await sleep(120);
  }
  await evaluate(cdp, 'window.scrollTo(0, 0)');
  await sleep(6000); // let timed promo popups appear so they can be closed before recording
  await evaluate(cdp, DISMISS_BANNERS);
  await sleep(800);

  const total = SECONDS * FPS;
  const hold = FPS; // 1s hold at the start and end
  const frames = [];
  for (let i = 0; i < total; i += 1) {
    const t = Math.min(1, Math.max(0, (i - hold) / (total - hold * 2)));
    const y = Math.round(ease(t) * distance);
    await evaluate(cdp, `window.scrollTo(0, ${y}); ${nextFrame}`);
    const { data } = await cdp.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 90,
      clip: { x: 0, y, width: VIEW_W, height: VIEW_H, scale: VIDEO_W / VIEW_W },
      captureBeyondViewport: false,
    });
    frames.push(Buffer.from(data, 'base64'));
    if (i % 60 === 0) console.log(`frame ${i}/${total}`);
  }
  return frames;
}

const ENCODER_PAGE = `<!doctype html><meta charset="utf-8"><script src="/muxer.js"></script><script>
window.encode = async (count, fps, w, h) => {
  const { Muxer, ArrayBufferTarget } = Mp4Muxer;
  const muxer = new Muxer({ target: new ArrayBufferTarget(), video: { codec: 'avc', width: w, height: h }, fastStart: 'in-memory' });
  const config = { codec: 'avc1.640028', width: w, height: h, bitrate: 1_300_000, framerate: fps, avc: { format: 'avc' } };
  const support = await VideoEncoder.isConfigSupported(config);
  if (!support.supported) return 'unsupported';
  const encoder = new VideoEncoder({ output: (chunk, meta) => muxer.addVideoChunk(chunk, meta), error: (e) => { throw e; } });
  encoder.configure(config);
  for (let i = 0; i < count; i++) {
    const blob = await (await fetch('/frame/' + i)).blob();
    const bitmap = await createImageBitmap(blob);
    const frame = new VideoFrame(bitmap, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
    encoder.encode(frame, { keyFrame: i % (fps * 2) === 0 });
    frame.close(); bitmap.close();
    while (encoder.encodeQueueSize > 8) await new Promise(r => setTimeout(r, 5));
  }
  await encoder.flush();
  muxer.finalize();
  await fetch('/out', { method: 'POST', body: muxer.target.buffer });
  return 'ok';
};
</script>`;

async function encode(cdp, frames, file) {
  const muxerSrc = readFileSync(join(__dirname, '..', 'node_modules', 'mp4-muxer', 'build', 'mp4-muxer.js'));
  let done;
  const finished = new Promise((r) => { done = r; });
  const server = createServer((req, res) => {
    if (req.url === '/') { res.writeHead(200, { 'content-type': 'text/html' }); res.end(ENCODER_PAGE); return; }
    if (req.url === '/muxer.js') { res.writeHead(200, { 'content-type': 'text/javascript' }); res.end(muxerSrc); return; }
    if (req.url.startsWith('/frame/')) {
      const i = Number(req.url.slice(7));
      res.writeHead(200, { 'content-type': 'image/jpeg' });
      res.end(frames[i]);
      return;
    }
    if (req.url === '/out' && req.method === 'POST') {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => { writeFileSync(file, Buffer.concat(chunks)); res.end('ok'); done(); });
      return;
    }
    res.writeHead(404); res.end();
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  const loaded = cdp.once('Page.loadEventFired');
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });
  await loaded;
  const status = await evaluate(cdp, `encode(${frames.length}, ${FPS}, ${VIDEO_W}, ${VIDEO_H})`);
  if (status !== 'ok') throw new Error(`Encoder: ${status}`);
  await finished;
  server.close();
  console.log('saved', file);
}

try {
  const cdp = await connect(await getPageWs());
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');

  await navigate(cdp, url, false);
  await screenshot(cdp, join(outDir, `${name}-desktop.png`));

  if (!NO_VIDEO) {
    const frames = await recordFrames(cdp);
    writeFileSync(join(outDir, `${name}-poster.jpg`), frames[0]);
    await encode(cdp, frames, join(outDir, `${name}.mp4`));
  }

  await cdp.send('Emulation.clearDeviceMetricsOverride');
  await navigate(cdp, url, true);
  await screenshot(cdp, join(outDir, `${name}-mobile.png`));
  cdp.close();
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  browser.kill();
  await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* profile still locked */ }
}
