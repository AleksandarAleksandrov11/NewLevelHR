import { chromium } from 'playwright';
import { chromiumPath, settleBanners, scrollThrough } from './lib/qa-utils.mjs';
const [,, url, out, widthArg, opts = ''] = process.argv;
const width = parseInt(widthArg || '1440', 10);
const browser = await chromium.launch({ executablePath: chromiumPath() });
const ctx = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: width < 700, hasTouch: width < 700 });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(url, { waitUntil: 'networkidle' });
await settleBanners(page);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(700);
if (!opts.includes('top')) { await scrollThrough(page); await page.waitForTimeout(1200); }
await page.screenshot({ path: out, fullPage: !opts.includes('viewport'), type: 'jpeg', quality: 80, animations: 'disabled', timeout: 120000 });
const h = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
console.log(JSON.stringify({ url, width, errors, hScroll: h, height: await page.evaluate(() => document.documentElement.scrollHeight) }));
await browser.close();
