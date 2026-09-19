/**
 * Shared helpers for the QA scripts (Playwright and Lighthouse).
 */
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(new URL('../..', import.meta.url).pathname);
export const DIST = path.join(ROOT, 'dist');

/** Chromium shipped with the Playwright package (or the one Playwright installed). */
export function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const roots = [process.env.PLAYWRIGHT_BROWSERS_PATH, path.join(process.env.HOME || '', '.cache/ms-playwright')].filter(Boolean);
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const dirs = fs.readdirSync(root).filter((d) => d.startsWith('chromium-')).sort().reverse();
    for (const d of dirs) {
      for (const bin of ['chrome-linux/chrome', 'chrome-linux64/chrome', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-win/chrome.exe']) {
        const p = path.join(root, d, bin);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return undefined;
}

/** `--base=http://host:port` argument or the default preview server. */
export function baseUrl(argv = process.argv) {
  const arg = argv.find((a) => a.startsWith('--base='));
  return (arg ? arg.slice('--base='.length) : process.env.QA_BASE || 'http://localhost:4321').replace(/\/$/, '');
}

export function hasFlag(name, argv = process.argv) {
  return argv.includes(`--${name}`);
}

/** Every HTML page in dist/ as a site path ("/en/services/"). */
export function distPages() {
  const pages = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) {
        let rel = '/' + path.relative(DIST, full).split(path.sep).join('/');
        if (rel.endsWith('/index.html')) rel = rel.slice(0, -'index.html'.length);
        pages.push(rel);
      }
    }
  };
  walk(DIST);
  return pages.sort();
}

/** Pages grouped by language, excluding the root redirect and the 404 pages. */
export function sitePages() {
  return distPages().filter((p) => /^\/(en|de|bg)\//.test(p) && !p.endsWith('/404/'));
}

export function langOf(sitePath) {
  return sitePath.split('/')[1];
}

/** "/en/services/high-velocity-hiring/" -> "services-high-velocity-hiring" */
export function slugOf(sitePath) {
  const rest = sitePath.replace(/^\/(en|de|bg)\//, '').replace(/\/$/, '');
  return rest ? rest.replace(/\//g, '-') : 'home';
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Marks the visitor as returning (no preloader) and consents so banners do not cover content. */
export async function settleBanners(page, { consent = 'accept' } = {}) {
  await page.evaluate(({ consent }) => {
    try { localStorage.setItem('nlhr_seen', '1'); localStorage.setItem('nlhr_lang_banner', 'dismissed'); } catch {}
    if (consent) {
      const c = { v: 1, necessary: true, analytics: consent === 'accept', marketing: consent === 'accept', ts: Date.now() };
      document.cookie = `nlhr_consent=${encodeURIComponent(JSON.stringify(c))}; Max-Age=31536000; Path=/; SameSite=Lax`;
    }
  }, { consent });
}

export async function scrollThrough(page, step = 600) {
  await page.evaluate(async (step) => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  }, step);
}

export function pad(s, n) {
  s = String(s);
  return s.length >= n ? s : s + ' '.repeat(n - s.length);
}

export function nowStamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

/**
 * Small production-like static server for dist/: gzip, immutable caching for
 * hashed assets, / -> /en/ redirect, trailing-slash redirects and 404.html with
 * a real 404 status. Used by the QA scripts when no --base is given.
 */
export async function startStaticServer({ dir = DIST, port = 4173 } = {}) {
  const http = await import('node:http');
  const zlib = await import('node:zlib');
  const types = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.webmanifest': 'application/manifest+json', '.php': 'text/plain; charset=utf-8',
  };
  const compressible = new Set(['.html', '.css', '.js', '.mjs', '.json', '.xml', '.txt', '.svg', '.webmanifest']);
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') { res.writeHead(302, { Location: '/en/' }); res.end(); return; }
    let file = path.join(dir, pathname);
    if (!file.startsWith(dir)) { res.writeHead(403); res.end(); return; }
    let status = 200;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' + url.search }); res.end(); return; }
      file = path.join(file, 'index.html');
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { file = path.join(dir, '404.html'); status = 404; }
    if (!fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(file).toLowerCase();
    const type = types[ext] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' };
    headers['Cache-Control'] = pathname.startsWith('/_astro/') || pathname.startsWith('/fonts/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate';
    let body = fs.readFileSync(file);
    const accept = String(req.headers['accept-encoding'] || '');
    if (compressible.has(ext) && body.length > 512) {
      if (accept.includes('br')) { body = zlib.brotliCompressSync(body); headers['Content-Encoding'] = 'br'; }
      else if (accept.includes('gzip')) { body = zlib.gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
    }
    headers['Content-Length'] = body.length;
    res.writeHead(status, headers);
    if (req.method === 'HEAD') res.end(); else res.end(body);
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(port, '127.0.0.1', resolve); });
  return { url: `http://127.0.0.1:${port}`, close: () => new Promise((r) => server.close(r)) };
}

/** Uses --base if given, otherwise serves dist/ itself. Returns { base, close }. */
export async function resolveBase(argv = process.argv) {
  const arg = argv.find((a) => a.startsWith('--base='));
  if (arg || process.env.QA_BASE) return { base: baseUrl(argv), close: async () => {} };
  if (!fs.existsSync(DIST)) throw new Error('dist/ not found. Run `npm run build` first or pass --base=http://host:port');
  const port = Number(process.env.QA_PORT || 4173);
  const server = await startStaticServer({ port });
  return { base: server.url, close: server.close };
}
