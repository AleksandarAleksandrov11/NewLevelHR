/**
 * Static QA of the build output in dist/:
 *   - every internal link, image and font resolves to a file
 *   - every #anchor exists on its target page
 *   - <html lang>, <title>, meta description and canonical are correct per page
 *   - hreflang alternates are reciprocal and include x-default
 *   - sitemap.xml lists every indexable page and only existing ones
 *   - Open Graph images exist
 *   - no leftover "{placeholder}", "undefined" or "[object Object]" in visible text
 * Exits with code 1 when anything fails. Run after `npm run build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { DIST, distPages } from './lib/qa-utils.mjs';

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const pages = distPages();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return m ? (m[2] ?? m[3] ?? m[4]) : undefined;
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

/** Does a site path (or file path) exist in dist? */
function existsInDist(p) {
  const clean = p.split('?')[0];
  const candidates = [path.join(DIST, clean), path.join(DIST, clean, 'index.html')];
  if (clean.endsWith('/')) candidates.push(path.join(DIST, clean.slice(0, -1) + '.html'));
  return candidates.some((c) => fs.existsSync(c) && (fs.statSync(c).isFile()));
}
const pageFile = (p) => (p.endsWith('/') ? path.join(DIST, p, 'index.html') : path.join(DIST, p));

// First pass: read every page, collect ids, canonicals, hreflang sets.
const info = new Map();
let origin = '';
for (const p of pages) {
  const html = fs.readFileSync(pageFile(p), 'utf8');
  const ids = new Set([...html.matchAll(/\sid\s*=\s*"([^"]+)"/g)].map((m) => m[1]));
  const head = html.slice(0, html.indexOf('</head>') + 7);
  const canonical = [...head.matchAll(/<link[^>]+>/g)].map((m) => m[0]).find((t) => /rel\s*=\s*"canonical"/i.test(t));
  const canonicalHref = canonical ? attr(canonical, 'href') : undefined;
  const alternates = [...head.matchAll(/<link[^>]+>/g)].map((m) => m[0]).filter((t) => /rel\s*=\s*"alternate"/i.test(t) && /hreflang/i.test(t))
    .map((t) => ({ hreflang: attr(t, 'hreflang'), href: attr(t, 'href') }));
  const lang = (head.match(/<html[^>]*\slang\s*=\s*"([^"]+)"/i) || html.match(/<html[^>]*\slang\s*=\s*"([^"]+)"/i) || [])[1];
  const title = (head.match(/<title>([^<]*)<\/title>/i) || [])[1]?.trim();
  const description = [...head.matchAll(/<meta[^>]+>/g)].map((m) => m[0]).find((t) => /name\s*=\s*"description"/i.test(t));
  const descContent = description ? attr(description, 'content') : undefined;
  const robots = [...head.matchAll(/<meta[^>]+>/g)].map((m) => m[0]).find((t) => /name\s*=\s*"robots"/i.test(t));
  const noindex = robots ? /noindex/i.test(attr(robots, 'content') || '') : false;
  const og = [...head.matchAll(/<meta[^>]+>/g)].map((m) => m[0]).find((t) => /property\s*=\s*"og:image"/i.test(t));
  const ogImage = og ? attr(og, 'content') : undefined;
  if (canonicalHref && !origin) origin = new URL(canonicalHref).origin;
  info.set(p, { html, ids, canonicalHref, alternates, lang, title, description: descContent, noindex, ogImage });
}
if (!origin) { console.error('No canonical found on any page; cannot determine the site origin.'); process.exit(1); }
const toPath = (href) => {
  if (href.startsWith(origin)) return href.slice(origin.length);
  if (href.startsWith('/')) return href;
  return undefined;
};

// Second pass: checks per page.
const seenMeta = new Map();
for (const p of pages) {
  const { html, canonicalHref, alternates, lang, title, description, noindex, ogImage } = info.get(p);
  const isSitePage = /^\/(en|de|bg)\//.test(p);
  const is404 = p === '/404.html' || p.endsWith('/404/');

  // lang, title, description
  if (isSitePage && lang !== p.split('/')[1]) err(p, `<html lang="${lang}"> does not match the URL language`);
  if (!title) err(p, 'missing <title>');
  if (isSitePage && !description) err(p, 'missing meta description');
  if (isSitePage && !is404) {
    const key = `${lang}|${title}|${description}`;
    if (seenMeta.has(key)) warn(p, `title + description identical to ${seenMeta.get(key)}`);
    seenMeta.set(key, p);
  }

  // canonical
  if (isSitePage && !is404) {
    if (!canonicalHref) err(p, 'missing canonical');
    else if (canonicalHref !== origin + p) err(p, `canonical is ${canonicalHref}, expected ${origin + p}`);
  }

  // hreflang reciprocity
  if (isSitePage && !is404 && !noindex) {
    if (!alternates.length) err(p, 'no hreflang alternates');
    const xDefault = alternates.find((a) => a.hreflang === 'x-default');
    if (!xDefault) err(p, 'hreflang x-default missing');
    const self = alternates.find((a) => a.href === origin + p);
    if (!self) err(p, 'hreflang set does not include the page itself');
    const mine = alternates.map((a) => `${a.hreflang}=${a.href}`).sort().join(' ');
    for (const a of alternates) {
      if (a.hreflang === 'x-default') continue;
      const target = toPath(a.href);
      if (!target || !info.has(target)) { err(p, `hreflang ${a.hreflang} points to a missing page ${a.href}`); continue; }
      const theirs = info.get(target).alternates.map((b) => `${b.hreflang}=${b.href}`).sort().join(' ');
      if (theirs !== mine) err(p, `hreflang set not reciprocal with ${target}`);
    }
  }

  // OG image
  if (ogImage) {
    const t = toPath(ogImage);
    if (t && !existsInDist(t)) err(p, `og:image missing in dist: ${t}`);
  }

  // links, images, scripts, styles, fonts
  const tags = [...html.matchAll(/<(a|link|img|source|script|use)\b[^>]*>/gi)].map((m) => m[0]);
  for (const tag of tags) {
    const urls = [];
    const href = attr(tag, 'href');
    const src = attr(tag, 'src');
    const srcset = attr(tag, 'srcset');
    if (href) urls.push(href);
    if (src) urls.push(src);
    if (srcset) for (const part of srcset.split(',')) urls.push(part.trim().split(/\s+/)[0]);
    for (const raw of urls) {
      const u = decode(raw);
      if (!u || u.startsWith('#') || /^(mailto:|tel:|javascript:|data:|blob:)/i.test(u)) {
        if (u && u.startsWith('#') && u.length > 1 && !info.get(p).ids.has(u.slice(1))) err(p, `anchor ${u} not found on this page`);
        continue;
      }
      const sitePath = toPath(u);
      if (sitePath === undefined) continue; // external
      const [pathOnly, hash] = sitePath.split('#');
      if (pathOnly.startsWith('/api/')) continue; // endpoints are not static files
      if (!existsInDist(pathOnly)) { err(p, `broken link ${u}`); continue; }
      if (hash) {
        const target = pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
        const t = info.get(target) ?? info.get(pathOnly);
        if (t && !t.ids.has(hash)) err(p, `anchor #${hash} not found on ${pathOnly}`);
      }
    }
  }

  // leftovers in visible text
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  for (const re of [/\{[a-zA-Z]+\}/, /\bundefined\b/, /\[object Object\]/, /\bNaN\b/]) {
    const m = text.match(re);
    if (m) err(p, `leftover "${m[0]}" in visible text near "${text.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ').trim()}"`);
  }
}

// Sitemap
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) err('sitemap.xml', 'missing');
else {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  const set = new Set(locs);
  for (const loc of locs) {
    const t = toPath(loc);
    if (!t || !existsInDist(t)) err('sitemap.xml', `lists a missing page ${loc}`);
  }
  for (const p of pages) {
    const { noindex } = info.get(p);
    if (!/^\/(en|de|bg)\//.test(p) || p.endsWith('/404/') || noindex) continue;
    if (!set.has(origin + p)) err('sitemap.xml', `does not list ${p}`);
  }
  const dup = locs.filter((l, i) => locs.indexOf(l) !== i);
  if (dup.length) err('sitemap.xml', `duplicate entries: ${dup.join(', ')}`);
  console.log(`sitemap.xml: ${locs.length} URLs`);
}
if (!fs.existsSync(path.join(DIST, 'robots.txt'))) err('robots.txt', 'missing');
if (!fs.existsSync(path.join(DIST, '404.html'))) err('404.html', 'missing');

console.log(`Checked ${pages.length} pages.`);
for (const w of warnings) console.log(`  · ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exitCode = 1;
} else console.log(`Links, anchors, canonicals, hreflang, sitemap and OG images are consistent (${warnings.length} warning(s)).`);
