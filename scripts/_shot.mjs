import { chromium } from 'playwright';
import fs from 'node:fs';
const [,, url, out, widthArg, opts = ''] = process.argv;
const width = parseInt(widthArg || '1440', 10);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1, hasTouch: width < 700, isMobile: width < 700, reducedMotion: opts.includes('reduce') ? 'reduce' : 'no-preference' });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
await page.goto(url, { waitUntil: 'networkidle' });
if (opts.includes('seen')) { await page.evaluate(() => { localStorage.setItem('nlhr_seen', '1'); }); await page.reload({ waitUntil: 'networkidle' }); }
await page.waitForTimeout(1500);
if (opts.includes('menu')) { await page.click('[data-burger]'); await page.waitForTimeout(900); }
if (opts.includes('mega')) { await page.hover('[data-mega-trigger]'); await page.waitForTimeout(600); }
if (opts.includes('settings')) { await page.click('[data-consent-action="settings"]'); await page.waitForTimeout(500); }
if (opts.includes('accept')) { await page.click('[data-consent-action="accept"]'); await page.waitForTimeout(400); }
if (opts.includes('scroll')) { await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } }); await page.waitForTimeout(800); if (!opts.includes('stay')) await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(600); }
await page.screenshot({ path: out, fullPage: !opts.includes('viewport') });
const hasHScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
console.log(JSON.stringify({ url, width, errors, hasHScroll, title: await page.title() }));
await browser.close();
