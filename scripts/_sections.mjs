// Viewport screenshots of each section: node scripts/_sections.mjs <url> <outdir> <width> id1,id2,...
import { chromium } from 'playwright';
import fs from 'node:fs';
const [,, url, out, widthArg, idsArg] = process.argv;
const width = parseInt(widthArg || '1440', 10);
const ids = (idsArg || '').split(',').filter(Boolean);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1, hasTouch: width < 700, isMobile: width < 700 });
await ctx.addCookies([{ name: 'nlhr_consent', value: encodeURIComponent(JSON.stringify({ v: 1, necessary: true, analytics: false, marketing: false, ts: 1 })), url }]);
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => { try { localStorage.setItem('nlhr_seen', '1'); } catch {} });
await page.waitForTimeout(800);
for (const id of ids) {
  const [sel, offsetStr] = id.split('@');
  const ok = await page.evaluate(({ sel, offset }) => { const el = document.getElementById(sel); if (!el) return false; const y = el.getBoundingClientRect().top + window.scrollY + (offset || 0); window.scrollTo({ top: y, behavior: 'instant' }); return true; }, { sel, offset: parseInt(offsetStr || '0', 10) });
  if (!ok) { console.log('missing', sel); continue; }
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${out}/${sel}${offsetStr ? '-' + offsetStr : ''}-${width}.png` });
}
console.log(JSON.stringify({ errors }));
await browser.close();
