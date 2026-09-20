/**
 * End-to-end behaviour checks with Playwright against the built site:
 * root redirect, cookie consent (nothing optional before consent, accept /
 * reject / configure, revoke from the footer), language banner, language
 * switcher, header (mega menu, mobile menu, keyboard), contact form (validation,
 * honeypot, success, server errors), HR health check, bad-hire calculator,
 * FAQ search, 404 in the right language, hreflang, reduced motion.
 * Output: docs/qa/e2e.md. Exit code 1 when a check fails.
 *
 *   node scripts/qa-e2e.mjs [--base=http://host:port]
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { ROOT, chromiumPath, resolveBase, ensureDir, settleBanners, nowStamp } from './lib/qa-utils.mjs';

const { base, close } = await resolveBase();
const browser = await chromium.launch({ executablePath: chromiumPath() });
const results = [];
const desktop = { viewport: { width: 1440, height: 900 } };
const phone = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

/** --only=<substring> runs a single check, which helps when debugging one of them. */
const onlyArg = process.argv.find((a) => a.startsWith('--only='))?.slice(7);

async function test(name, opts, fn) {
  if (onlyArg && !name.toLowerCase().includes(onlyArg.toLowerCase())) return;
  const ctx = await browser.newContext({ deviceScaleFactor: 1, ...opts });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const t0 = Date.now();
  try {
    await fn(page, ctx);
    if (errors.length) throw new Error(`page errors: ${errors.join(' | ')}`);
    results.push({ name, ok: true, ms: Date.now() - t0 });
    console.log(`  ✓ ${name}`);
  } catch (e) {
    results.push({ name, ok: false, ms: Date.now() - t0, error: String(e.message || e).split('\n')[0].slice(0, 300) });
    console.log(`  ✗ ${name}\n      ${String(e.message || e).split('\n')[0].slice(0, 300)}`);
  } finally {
    await ctx.close();
  }
}
const expect = (cond, msg) => { if (!cond) throw new Error(msg); };
const cookies = async (ctx) => (await ctx.cookies()).map((c) => c.name);
const consentCookie = async (ctx) => { const c = (await ctx.cookies()).find((c) => c.name === 'nlhr_consent'); return c ? JSON.parse(decodeURIComponent(c.value)) : null; };

console.log(`Base ${base}\n`);

await test('root / redirects to /en/', desktop, async (page) => {
  const res = await page.goto(base + '/', { waitUntil: 'load' });
  expect(res && new URL(page.url()).pathname === '/en/', `landed on ${page.url()}`);
});

await test('cookie dialog: no optional storage before consent, Accept stores analytics=true', desktop, async (page, ctx) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  expect((await cookies(ctx)).length === 0, `cookies set before consent: ${await cookies(ctx)}`);
  const scripts = await page.evaluate(() => Array.from(document.scripts).map((s) => s.src).filter((s) => s && !s.startsWith(location.origin)));
  expect(scripts.length === 0, `third-party scripts before consent: ${scripts}`);
  const dialog = page.locator('[data-consent]');
  await dialog.waitFor({ state: 'visible' });
  await page.click('[data-consent-action="accept"]');
  await page.waitForTimeout(300);
  const c = await consentCookie(ctx);
  expect(c && c.necessary === true && c.analytics === true, `consent cookie ${JSON.stringify(c)}`);
  await page.reload({ waitUntil: 'networkidle' });
  expect(!(await dialog.isVisible()), 'dialog shown again after consent');
});

await test('cookie dialog: Reject stores analytics=false and marketing=false', desktop, async (page, ctx) => {
  await page.goto(base + '/de/', { waitUntil: 'networkidle' });
  await page.click('[data-consent-action="reject"]');
  await page.waitForTimeout(300);
  const c = await consentCookie(ctx);
  expect(c && c.analytics === false && c.marketing === false, `consent cookie ${JSON.stringify(c)}`);
});

await test('cookie dialog: Configure -> save keeps the chosen categories', desktop, async (page, ctx) => {
  await page.goto(base + '/bg/', { waitUntil: 'networkidle' });
  await page.click('[data-consent-action="settings"]');
  await page.locator('[data-consent-view="settings"]').waitFor({ state: 'visible' });
  // The switches are visually hidden inputs inside a styled label, hence force.
  const toggles = page.locator('[data-consent-cat]');
  const n = await toggles.count();
  let toggled = null;
  for (let i = 0; i < n; i++) {
    const t = toggles.nth(i);
    if (await t.isEnabled()) { await t.check({ force: true }); toggled = await t.getAttribute('data-consent-cat'); break; }
  }
  await page.click('[data-consent-action="save"]');
  await page.waitForTimeout(300);
  const c = await consentCookie(ctx);
  expect(c && c.necessary === true, `consent cookie ${JSON.stringify(c)}`);
  if (toggled) expect(c[toggled] === true, `${toggled} choice not saved: ${JSON.stringify(c)}`);
  else expect(c.analytics === false && c.marketing === false, 'no optional category available, expected all false');
});

await test('footer "Cookie settings" reopens the dialog after consent', desktop, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  expect(!(await page.locator('[data-consent]').isVisible()), 'dialog visible although consent exists');
  await page.locator('[data-consent-open]').first().click();
  await page.locator('[data-consent]').waitFor({ state: 'visible' });
});

await test('language banner suggests German to a German browser on the English page and never redirects', { ...desktop, locale: 'de-DE' }, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  expect(new URL(page.url()).pathname === '/en/', 'was redirected away from /en/');
  await page.click('[data-consent-action="accept"]');
  const banner = page.locator('[data-lang-banner]');
  await banner.waitFor({ state: 'visible', timeout: 5000 });
  const href = await page.locator('[data-lb-switch]').getAttribute('href');
  expect(href === '/de/', `switch link is ${href}`);
  await page.click('[data-lb-dismiss]');
  await page.waitForTimeout(200);
  expect(!(await banner.isVisible()), 'banner still visible after dismiss');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  expect(!(await banner.isVisible()), 'banner shown again after being dismissed');
});

await test('language banner stays hidden for an English browser on the English page', { ...desktop, locale: 'en-US' }, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await page.click('[data-consent-action="accept"]');
  await page.waitForTimeout(1000);
  expect(!(await page.locator('[data-lang-banner]').isVisible()), 'banner shown to a matching browser language');
});

await test('language switcher opens the same page in DE and BG (translated slugs)', desktop, async (page) => {
  await page.goto(base + '/en/services/high-velocity-hiring/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('[data-lang-switcher] button').first().click();
  await page.locator('[data-lang-link="de"]').first().click();
  await page.waitForLoadState('networkidle');
  expect(new URL(page.url()).pathname === '/de/leistungen/high-velocity-hiring/', `DE url ${page.url()}`);
  await page.locator('[data-lang-switcher] button').first().click();
  await page.locator('[data-lang-link="bg"]').first().click();
  await page.waitForLoadState('networkidle');
  expect(new URL(page.url()).pathname === '/bg/uslugi/high-velocity-naemane/', `BG url ${page.url()}`);
  expect((await page.getAttribute('html', 'lang')) === 'bg', 'html lang is not bg');
});

await test('hreflang: EN page lists en/de/bg + x-default and the DE page links back', desktop, async (page) => {
  await page.goto(base + '/en/about/', { waitUntil: 'load' });
  const links = await page.$$eval('link[rel="alternate"][hreflang]', (els) => els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')]));
  const map = Object.fromEntries(links);
  expect(map.en?.endsWith('/en/about/') && map.de?.endsWith('/de/ueber-uns/') && map.bg?.endsWith('/bg/za-nas/') && map['x-default']?.endsWith('/en/about/'), JSON.stringify(map));
  await page.goto(base + '/de/ueber-uns/', { waitUntil: 'load' });
  const back = Object.fromEntries(await page.$$eval('link[rel="alternate"][hreflang]', (els) => els.map((e) => [e.getAttribute('hreflang'), e.getAttribute('href')])));
  expect(back.en === map.en && back.de === map.de && back.bg === map.bg, 'DE alternates differ from EN alternates');
  const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
  expect(canonical?.endsWith('/de/ueber-uns/'), `canonical ${canonical}`);
});

await test('header: mega menu opens on hover and on keyboard, closes with Escape', desktop, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const trigger = page.locator('[data-mega-trigger]').first();
  await trigger.hover();
  await page.waitForTimeout(500);
  expect((await trigger.getAttribute('aria-expanded')) === 'true', 'not expanded on hover');
  await page.mouse.move(10, 600);
  await page.waitForTimeout(700);
  await trigger.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  expect((await trigger.getAttribute('aria-expanded')) === 'true', 'not expanded on Enter');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  expect((await trigger.getAttribute('aria-expanded')) === 'false', 'still expanded after Escape');
});

await test('header: mobile menu opens, links are focusable, closes with Escape', phone, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const burger = page.locator('[data-burger]');
  await burger.click();
  await page.waitForTimeout(600);
  expect((await burger.getAttribute('aria-expanded')) === 'true', 'burger not expanded');
  const menu = page.locator('[data-mobile-menu]');
  expect(await menu.isVisible(), 'mobile menu not visible');
  const linkCount = await menu.locator('a:visible').count();
  expect(linkCount >= 6, `only ${linkCount} visible links in the mobile menu`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  expect((await burger.getAttribute('aria-expanded')) === 'false', 'menu still open after Escape');
});

await test('header stays visible while scrolling down', desktop, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const header = page.locator('[data-header]');
  const top = async () => header.evaluate((el) => el.getBoundingClientRect().top);
  expect(Math.round(await top()) === 0, `header starts at ${await top()}`);
  await page.mouse.move(700, 450);
  for (let i = 0; i < 8; i++) { await page.mouse.wheel(0, 700); await page.waitForTimeout(90); }
  await page.waitForTimeout(900);
  expect(await page.evaluate(() => window.scrollY) > 1000, 'page did not scroll');
  expect(Math.round(await top()) === 0, `header moved to ${await top()} after scrolling`);
  expect(await header.isVisible(), 'header hidden after scrolling');
});

await test('cost calculator: the track fill follows the slider', desktop, async (page) => {
  await page.goto(base + '/en/#bad-hire-calculator', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const range = page.locator('[data-calc-range]').first();
  await range.scrollIntoViewIfNeeded();
  const fill = () => range.evaluate((el) => el.style.getPropertyValue('--p'));
  const before = await fill();
  expect(before.endsWith('%'), `no fill painted on load (${before})`);
  const box = await range.boundingBox();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2, { steps: 12 });
  const during = await fill();
  await page.mouse.up();
  await page.waitForTimeout(200);
  const after = await fill();
  expect(parseFloat(during) > parseFloat(before), `fill did not follow the drag (${before} -> ${during})`);
  expect(parseFloat(after) > parseFloat(before), `fill did not stay (${after})`);
});

await test('skip link and landmarks exist', desktop, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'load' });
  const skip = await page.$('a[href="#main"], a.skip-link');
  expect(skip, 'no skip link');
  expect(await page.$('main#main, main'), 'no <main>');
  expect(await page.$('header'), 'no <header>');
  expect(await page.$('footer'), 'no <footer>');
  expect((await page.$$('h1')).length === 1, 'page must have exactly one h1');
});

await test('contact form: four steps, custom topic dropdown, validation and a mocked send', desktop, async (page) => {
  await page.goto(base + '/en/contact/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const form = page.locator('[data-contact-form]');
  const steps = form.locator('[data-form-step]');
  expect((await steps.count()) === 4, `expected 4 steps, found ${await steps.count()}`);
  expect((await form.locator('[data-form-step]:visible').count()) === 1, 'more than one step visible');

  // Step 1: the native select is replaced by a listbox, and Next is blocked until it is answered.
  await form.locator('[data-step-next]').click();
  await page.waitForTimeout(250);
  expect(await form.locator('[data-error-for="topic"]').textContent(), 'no error on the empty topic');
  const combo = form.locator('.select-btn');
  expect(await combo.count(), 'the topic select was not enhanced');
  await combo.click();
  await form.locator('.select-option').nth(1).click();
  expect(await form.locator('select[name="topic"]').inputValue(), 'the native select did not follow the listbox');
  await form.locator('[data-step-next]').click();
  await page.waitForTimeout(300);

  // Step 2: message, with the minimum length enforced before moving on.
  await form.locator('[name="message"]').fill('too short');
  await form.locator('[data-step-next]').click();
  await page.waitForTimeout(250);
  expect(await form.locator('[data-error-for="message"]').textContent(), 'short message accepted');
  await form.locator('[name="message"]').fill('Hello, this is a test message with enough characters to pass validation.');
  await form.locator('[data-step-next]').click();
  await page.waitForTimeout(300);

  // Step 3: name and optional company.
  await form.locator('[name="name"]').fill('Test Person');
  await form.locator('[name="company"]').fill('Example GmbH');
  await form.locator('[data-step-next]').click();
  await page.waitForTimeout(300);

  // Step 4: email, consent and submit.
  expect(await form.locator('[data-submit]').isVisible(), 'no submit button on the last step');
  expect(!(await form.locator('[data-step-next]').isVisible()), 'Next still shown on the last step');
  const posts = [];
  await page.route('**/api/contact', async (route) => {
    posts.push(route.request().postDataJSON());
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) });
  });
  await form.locator('[name="email"]').fill('test@example.com');
  await form.locator('[name="consent"]').check();
  await page.waitForTimeout(3200); // the anti-bot timer requires a few seconds on the page
  await form.locator('[data-submit]').click();
  await page.locator('[data-form-success]').waitFor({ state: 'visible', timeout: 8000 });
  const sent = posts[0] || {};
  expect(posts.length === 1 && sent.email === 'test@example.com' && sent.name === 'Test Person' && sent.consent === true && sent.lang === 'en' && typeof sent.ts === 'number' && Boolean(sent.topic), `payload ${JSON.stringify(sent)}`);
  expect('website' in sent && !sent.website, 'honeypot field missing or filled');
});

await test('contact form: server error and rate limit are shown in the page language', desktop, async (page) => {
  await page.goto(base + '/de/kontakt/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const form = page.locator('[data-contact-form]');
  let n = 0;
  await page.route('**/api/contact', (route) => route.fulfill({ status: n++ === 0 ? 429 : 500, contentType: 'application/json', body: JSON.stringify({ ok: false, error: n === 1 ? 'rate_limit' : 'send' }) }));
  await form.locator('.select-btn').click();
  await form.locator('.select-option').first().click();
  await form.locator('[data-step-next]').click();
  await form.locator('[name="message"]').fill('Guten Tag, dies ist eine Testnachricht mit ausreichend vielen Zeichen.');
  await form.locator('[data-step-next]').click();
  await form.locator('[name="name"]').fill('Test Person');
  await form.locator('[data-step-next]').click();
  await form.locator('[name="email"]').fill('test@example.com');
  await form.locator('[name="consent"]').check();
  await page.waitForTimeout(3200);
  await form.locator('[data-submit]').click();
  const err = page.locator('[data-form-error]');
  await err.waitFor({ state: 'visible', timeout: 8000 });
  const text1 = (await err.textContent()) || '';
  expect(text1.trim().length > 10, 'empty error message');
  await form.locator('[data-submit]').click();
  await page.waitForTimeout(800);
  const text2 = (await err.textContent()) || '';
  expect(text2 !== text1, 'rate-limit and generic error messages are identical');
});

await test('HR health check: answer every question and reach a result with a score', desktop, async (page) => {
  await page.goto(base + '/en/#health-check', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const quiz = page.locator('[data-quiz]');
  await quiz.scrollIntoViewIfNeeded();
  await quiz.locator('[data-quiz-start]').click();
  await page.waitForTimeout(600);
  const steps = await quiz.locator('[data-quiz-step]').count();
  expect(steps >= 5, `only ${steps} questions`);
  for (let i = 0; i < steps; i++) {
    const step = quiz.locator('[data-quiz-step]').nth(i);
    await step.locator('[data-quiz-option]').nth(i % 2 === 0 ? 0 : 1).click();
    await page.waitForTimeout(700);
    const next = quiz.locator('[data-quiz-next]');
    if (await next.isVisible() && await next.isEnabled()) { await next.click(); await page.waitForTimeout(700); }
  }
  await quiz.locator('[data-quiz-panel="result"]').waitFor({ state: 'visible', timeout: 5000 });
  const score = (await quiz.locator('[data-quiz-score]').textContent()) || '';
  expect(/\d/.test(score), `no score shown (${score})`);
  expect(await quiz.locator('[data-quiz-restart]').isVisible(), 'no restart button');
});

await test('bad-hire calculator: total updates when inputs change and reset restores defaults', desktop, async (page) => {
  await page.goto(base + '/en/#bad-hire-calculator', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const calc = page.locator('[data-calculator]');
  await calc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const total = calc.locator('[data-calc-total]');
  const before = (await total.textContent())?.trim();
  const first = calc.locator('[data-calc-input]').first();
  const type = await first.getAttribute('type');
  if (type === 'range') await first.evaluate((el) => { el.value = String(Number(el.max)); el.dispatchEvent(new Event('input', { bubbles: true })); });
  else await first.fill(String(Number((await first.inputValue()) || 0) * 2 + 1000));
  await page.waitForTimeout(600);
  const after = (await total.textContent())?.trim();
  expect(before && after && before !== after, `total did not change (${before} -> ${after})`);
  await calc.locator('[data-calc-reset]').click();
  await page.waitForTimeout(600);
  expect((await total.textContent())?.trim() === before, 'reset did not restore the default total');
});

await test('FAQ search filters questions and shows an empty state', desktop, async (page) => {
  await page.goto(base + '/en/faq/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  const total = await page.locator('[data-faq-item]').count();
  await page.fill('[data-faq-search]', 'payroll');
  await page.waitForTimeout(400);
  const visible = await page.locator('[data-faq-item]:visible').count();
  expect(visible > 0 && visible < total, `${visible} of ${total} visible for "payroll"`);
  await page.fill('[data-faq-search]', 'zzzzqqq');
  await page.waitForTimeout(400);
  expect(await page.locator('[data-faq-empty]').isVisible(), 'empty state not shown');
});

await test('404: unknown URL returns status 404 and continues to the localized 404 page', desktop, async (page) => {
  const res = await page.goto(base + '/bg/nyama-takava-stranitsa/', { waitUntil: 'commit' });
  expect(res?.status() === 404, `status ${res?.status()}`);
  await page.waitForURL('**/bg/404/', { timeout: 8000 });
  await page.waitForLoadState('networkidle');
  expect((await page.getAttribute('html', 'lang')) === 'bg', 'html lang is not bg on the localized 404 page');
  expect(await page.locator('main a[href="/bg/"]').count(), 'no link back to the Bulgarian home page');
  expect(await page.locator('header a[href="/bg/"]').count(), 'header is not Bulgarian');
  // English URLs stay on the root 404 document with the English block visible.
  const en = await page.goto(base + '/en/no-such-page/', { waitUntil: 'networkidle' });
  expect(en?.status() === 404, `EN status ${en?.status()}`);
  expect(new URL(page.url()).pathname === '/en/no-such-page/', `EN 404 navigated away to ${page.url()}`);
  expect(await page.locator('[data-lang-block="en"]').isVisible(), 'English block not visible');
});

await test('reduced motion: no preloader, no smooth-scroll class, content visible immediately', { ...desktop, reducedMotion: 'reduce' }, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'load' });
  const cls = await page.getAttribute('html', 'class');
  expect(!/\bjs-motion\b/.test(cls || ''), `html class "${cls}" still enables motion`);
  const hero = page.locator('h1').first();
  const opacity = await hero.evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity) > 0.9, `h1 opacity ${opacity}`);
});

await test('view transitions keep the header working after client-side navigation', desktop, async (page) => {
  await page.goto(base + '/en/', { waitUntil: 'networkidle' });
  await settleBanners(page);
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('header a[href="/en/about/"]').first().click();
  await page.waitForURL('**/en/about/');
  await page.waitForTimeout(800);
  expect((await page.locator('h1').count()) === 1, 'no h1 after navigation');
  const trigger = page.locator('[data-mega-trigger]').first();
  await trigger.hover();
  await page.waitForTimeout(500);
  expect((await trigger.getAttribute('aria-expanded')) === 'true', 'mega menu dead after navigation');
});

await browser.close();
await close();

const failed = results.filter((r) => !r.ok);
ensureDir(path.join(ROOT, 'docs', 'qa'));
const lines = ['# End-to-end checks', '', `Generated ${nowStamp()} with \`npm run qa:e2e\` against \`${base}\`. ${results.length - failed.length}/${results.length} passed.`, '', '| Check | Result | Time |', '| --- | --- | --- |'];
for (const r of results) lines.push(`| ${r.name} | ${r.ok ? '✅ pass' : `❌ fail: ${r.error}`} | ${r.ms} ms |`);
lines.push('');
fs.writeFileSync(path.join(ROOT, 'docs', 'qa', 'e2e.md'), lines.join('\n'));
console.log(`\n${results.length - failed.length}/${results.length} passed. Report: docs/qa/e2e.md`);
if (failed.length) process.exitCode = 1;
