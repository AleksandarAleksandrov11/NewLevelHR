/**
 * Full-page screenshots of every page in every language at 390 px and 1440 px,
 * plus UI states (cookie dialog, language banner, mobile menu, mega menu, 404),
 * and a horizontal-overflow check at 360/390/768/1024/1280/1440/1920 px.
 * Output: docs/qa-screenshots/<lang>/<page>@<width>.jpg (JPEG keeps the folder small) and docs/qa-screenshots/README.md
 *
 *   node scripts/qa-screenshots.mjs [--base=http://host:port] [--only=<regex>] [--no-widths]
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT, chromiumPath, resolveBase, sitePages, langOf, slugOf, ensureDir, settleBanners, scrollThrough, hasFlag, nowStamp } from './lib/qa-utils.mjs';

const OUT = path.join(ROOT, 'docs', 'qa-screenshots');
const SHOT_WIDTHS = [390, 1440];
const CHECK_WIDTHS = [360, 390, 768, 1024, 1280, 1440, 1920];
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const filter = only ? new RegExp(only) : null;

const { base, close } = await resolveBase();
const launch = () => chromium.launch({ executablePath: chromiumPath() });
let browser = await launch();
/** A hung renderer (WebGL in software) would otherwise time out every following page: start a fresh browser. */
async function relaunch() {
  try { await browser.close(); } catch { /* already gone */ }
  browser = await launch();
}
const rows = [];
const overflow = [];
const failures = [];
let consoleErrors = 0;

const viewport = (w) => ({ width: w, height: w < 700 ? 844 : w < 1100 ? 1024 : 900 });
const mobile = (w) => w < 700;

async function withPage(width, fn, ctxOpts = {}) {
  const ctx = await browser.newContext({ viewport: viewport(width), deviceScaleFactor: 1, isMobile: mobile(width), hasTouch: mobile(width), ...ctxOpts });
  const page = await ctx.newPage();
  page.setDefaultNavigationTimeout(45000);
  page.setDefaultTimeout(45000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  try { return await fn(page, errors); } finally { await ctx.close().catch(() => {}); }
}

/** Runs a capture step; on failure restarts the browser and retries once. */
async function attempt(label, fn) {
  for (let i = 0; i < 2; i++) {
    try { await fn(); return true; } catch (e) {
      const msg = String(e.message || e).split('\n')[0];
      console.log(`  ${i === 0 ? '↻' : '✗'} ${label}: ${msg}`);
      if (i === 0) await relaunch(); else failures.push({ path: label, error: msg });
    }
  }
  return false;
}

async function open(page, sitePath, { consent = 'accept' } = {}) {
  await page.goto(base + sitePath, { waitUntil: 'networkidle' });
  await settleBanners(page, { consent });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
}

async function hasHorizontalScroll(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const over = doc.scrollWidth > doc.clientWidth + 1;
    if (!over) return { over: false };
    // Name the widest offending element to make the report actionable.
    let worst = null;
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.right > doc.clientWidth + 1 && r.width > 0 && (!worst || r.right > worst.right)) worst = { right: r.right, tag: el.tagName.toLowerCase(), cls: String(el.className || '').slice(0, 60) };
    }
    return { over: true, scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, worst };
  });
}

const pages = sitePages().filter((p) => !filter || filter.test(p));
console.log(`Base ${base}. ${pages.length} pages, screenshots at ${SHOT_WIDTHS.join('/')} px, overflow checks at ${CHECK_WIDTHS.join('/')} px.`);

for (const sitePath of pages) {
  const lang = langOf(sitePath);
  const slug = slugOf(sitePath);
  ensureDir(path.join(OUT, lang));
  for (const width of SHOT_WIDTHS) {
    await attempt(`${sitePath} @${width}`, () => withPage(width, async (page, errors) => {
      await open(page, sitePath);
      await scrollThrough(page);
      await page.waitForTimeout(1400);
      const file = path.join(OUT, lang, `${slug}@${width}.jpg`);
      // Long pages with blurred glows render slowly in software; give the capture time and freeze CSS animations.
      await page.screenshot({ path: file, fullPage: true, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
      const h = await hasHorizontalScroll(page);
      const title = await page.title();
      rows.push({ path: sitePath, width, file: path.relative(OUT, file), overflow: h.over, errors: errors.length, title });
      if (h.over) overflow.push({ path: sitePath, width, ...h });
      if (errors.length) { consoleErrors += errors.length; console.log(`  ! ${sitePath} @${width}: ${errors.join(' | ').slice(0, 300)}`); }
    }));
  }
  if (!hasFlag('no-widths')) {
    // One page load, then resize through the remaining breakpoints.
    const extra = CHECK_WIDTHS.filter((w) => !SHOT_WIDTHS.includes(w));
    await attempt(`${sitePath} (overflow ${extra.join('/')})`, () => withPage(extra[extra.length - 1], async (page) => {
      await open(page, sitePath);
      for (const width of extra) {
        await page.setViewportSize(viewport(width));
        await page.waitForTimeout(250);
        await page.evaluate(() => window.scrollTo(0, 0));
        await scrollThrough(page, 1400, { returnToTop: false });
        const h = await hasHorizontalScroll(page);
        if (h.over) overflow.push({ path: sitePath, width, ...h });
      }
    }));
  }
  process.stdout.write(`  ✓ ${sitePath}\n`);
}

// UI states on the home page of each language.
for (const lang of ['en', 'de', 'bg']) {
  if (filter && !filter.test(`/${lang}/`)) continue;
  const home = `/${lang}/`;
  const dir = path.join(OUT, lang);
  ensureDir(dir);
  // Cookie dialog before any choice (fresh visitor).
  for (const width of SHOT_WIDTHS) {
    await attempt(`${home} state`, () => withPage(width, async (page) => {
      await page.goto(base + home, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1800);
      const file = path.join(dir, `state-cookie-dialog@${width}.jpg`);
      await page.screenshot({ path: file, fullPage: false, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
      rows.push({ path: `${home} (cookie dialog)`, width, file: path.relative(OUT, file), overflow: false, errors: 0, title: 'state' });
    }));
  }
  // Cookie settings view.
  await attempt(`${home} state`, () => withPage(1440, async (page) => {
    await page.goto(base + home, { waitUntil: 'networkidle' });
    await page.evaluate(() => { try { localStorage.setItem('nlhr_seen', '1'); } catch {} });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.click('[data-consent-action="settings"]');
    await page.waitForTimeout(500);
    const file = path.join(dir, 'state-cookie-settings@1440.jpg');
    await page.screenshot({ path: file, fullPage: false, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
    rows.push({ path: `${home} (cookie settings)`, width: 1440, file: path.relative(OUT, file), overflow: false, errors: 0, title: 'state' });
  }));
  // Language banner: a German browser on a non-German page (and an English one on the German page).
  const browserLocale = lang === 'de' ? 'en-GB' : 'de-DE';
  await attempt(`${home} state`, () => withPage(1440, async (page) => {
    await page.goto(base + home, { waitUntil: 'networkidle' });
    await settleBanners(page, { consent: 'accept' });
    await page.evaluate(() => { try { localStorage.removeItem('nlhr_lang_banner'); } catch {} });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const file = path.join(dir, 'state-language-banner@1440.jpg');
    await page.screenshot({ path: file, fullPage: false, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
    rows.push({ path: `${home} (language banner, browser ${browserLocale})`, width: 1440, file: path.relative(OUT, file), overflow: false, errors: 0, title: 'state' });
  }, { locale: browserLocale }));
  // Mobile menu open.
  await attempt(`${home} state`, () => withPage(390, async (page) => {
    await open(page, home);
    await page.click('[data-burger]');
    await page.waitForTimeout(900);
    const file = path.join(dir, 'state-mobile-menu@390.jpg');
    await page.screenshot({ path: file, fullPage: false, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
    rows.push({ path: `${home} (mobile menu)`, width: 390, file: path.relative(OUT, file), overflow: false, errors: 0, title: 'state' });
  }));
  // Mega menu open.
  await attempt(`${home} state`, () => withPage(1440, async (page) => {
    await open(page, home);
    await page.hover('[data-mega-trigger]');
    await page.waitForTimeout(700);
    const file = path.join(dir, 'state-mega-menu@1440.jpg');
    await page.screenshot({ path: file, fullPage: false, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
    rows.push({ path: `${home} (mega menu)`, width: 1440, file: path.relative(OUT, file), overflow: false, errors: 0, title: 'state' });
  }));
  // 404 for an unknown URL under the language prefix.
  for (const width of SHOT_WIDTHS) {
    await attempt(`${home} state`, () => withPage(width, async (page) => {
      const res = await page.goto(`${base}/${lang}/this-page-does-not-exist/`, { waitUntil: 'commit' });
      await page.waitForLoadState('networkidle');
      if (lang !== 'en') await page.waitForURL(`**/${lang}/404/`, { timeout: 8000 }).catch(() => {});
      await settleBanners(page);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(600);
      await scrollThrough(page);
      await page.waitForTimeout(600);
      const file = path.join(dir, `state-404@${width}.jpg`);
      await page.screenshot({ path: file, fullPage: true, timeout: 120000, animations: 'disabled', type: 'jpeg', quality: 82 });
      rows.push({ path: `/${lang}/this-page-does-not-exist/ (status ${res?.status()})`, width, file: path.relative(OUT, file), overflow: false, errors: 0, title: await page.title() });
    }));
  }
}

await browser.close();
await close();

// Report
const lines = [
  '# QA screenshots',
  '',
  `Generated ${nowStamp()} from \`${base}\` with \`npm run qa:screenshots\`.`,
  '',
  `* ${pages.length} pages × ${SHOT_WIDTHS.join(' / ')} px full-page screenshots, plus UI states per language.`,
  `* Horizontal-overflow check at ${CHECK_WIDTHS.join(' / ')} px: **${overflow.length === 0 ? 'no page scrolls horizontally' : overflow.length + ' finding(s), see below'}**.`,
  `* Console errors while capturing: **${consoleErrors}**.`,
  `* Captures that failed: **${failures.length}**.`,
  '',
  'Pages are scrolled with wheel events before capture so scroll reveals have run. On desktop the home page shows the',
  'empty scroll space of the pinned 90-day timeline below the timeline itself; that is the pin spacer of the scroll story,',
  'not a blank section. The Three.js hero loads on first interaction or after 6.5 s, so the hero shows its static state.',
  '',
];
if (failures.length) {
  lines.push('## Failed captures', '');
  for (const f of failures) lines.push(`* ${f.path} @${f.width}px: ${f.error}`);
  lines.push('');
}
if (overflow.length) {
  lines.push('## Horizontal overflow', '', '| Page | Width | scrollWidth | Widest element |', '| --- | --- | --- | --- |');
  for (const o of overflow) lines.push(`| ${o.path} | ${o.width} | ${o.scrollWidth} / ${o.clientWidth} | \`${o.worst?.tag}.${o.worst?.cls}\` |`);
  lines.push('');
}
lines.push('## Files', '', '| Page | Width | Overflow | JS errors | File |', '| --- | --- | --- | --- | --- |');
for (const r of rows) lines.push(`| ${r.path} | ${r.width} | ${r.overflow ? '**yes**' : 'no'} | ${r.errors} | [${r.file}](./${r.file}) |`);
lines.push('');
fs.writeFileSync(path.join(OUT, 'README.md'), lines.join('\n'));
console.log(`\n${rows.length} screenshots in docs/qa-screenshots/. Overflow findings: ${overflow.length}. Console errors: ${consoleErrors}.`);
if (overflow.length) { for (const o of overflow) console.log(`  ✗ overflow ${o.path} @${o.width}px: ${o.scrollWidth}>${o.clientWidth} (${o.worst?.tag}.${o.worst?.cls})`); process.exitCode = 1; }
if (failures.length) process.exitCode = 1;
