/**
 * Mobile Lighthouse for the key pages in EN, DE and BG.
 * Output: docs/qa/lighthouse.md (+ docs/qa/lighthouse.json). Fails when any
 * category on any page scores below --min (default 90).
 *
 *   node scripts/qa-lighthouse.mjs [--base=http://host:port] [--min=90] [--pages=home,services,...]
 */
import fs from 'node:fs';
import path from 'node:path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { ROOT, chromiumPath, resolveBase, ensureDir, nowStamp } from './lib/qa-utils.mjs';

const MIN = Number(process.argv.find((a) => a.startsWith('--min='))?.slice(6) || 90);
const PAGES = {
  en: { home: '/en/', services: '/en/services/', service: '/en/services/fractional-hr-partnership/', problems: '/en/what-we-fix/', about: '/en/about/', faq: '/en/faq/', contact: '/en/contact/' },
  de: { home: '/de/', services: '/de/leistungen/', service: '/de/leistungen/fraktionale-hr-partnerschaft/', problems: '/de/was-wir-loesen/', about: '/de/ueber-uns/', faq: '/de/faq/', contact: '/de/kontakt/' },
  bg: { home: '/bg/', services: '/bg/uslugi/', service: '/bg/uslugi/fraktsionno-hr-partniorstvo/', problems: '/bg/kakvo-reshavame/', about: '/bg/za-nas/', faq: '/bg/faq/', contact: '/bg/kontakti/' },
};
const onlyPages = process.argv.find((a) => a.startsWith('--pages='))?.slice(8).split(',');

const { base, close } = await resolveBase();
const chrome = await chromeLauncher.launch({ chromePath: chromiumPath(), chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
const results = [];
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
try {
  for (const [lang, pages] of Object.entries(PAGES)) {
    for (const [key, sitePath] of Object.entries(pages)) {
      if (onlyPages && !onlyPages.includes(key)) continue;
      const url = base + sitePath;
      const runner = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: categories, formFactor: 'mobile', screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false } });
      const lhr = runner.lhr;
      const scores = Object.fromEntries(categories.map((c) => [c, Math.round((lhr.categories[c]?.score ?? 0) * 100)]));
      const metrics = {
        fcp: lhr.audits['first-contentful-paint']?.displayValue,
        lcp: lhr.audits['largest-contentful-paint']?.displayValue,
        tbt: lhr.audits['total-blocking-time']?.displayValue,
        cls: lhr.audits['cumulative-layout-shift']?.displayValue,
        si: lhr.audits['speed-index']?.displayValue,
      };
      // Failing / improvable audits (score < 0.9 and weighted, or informative with savings) for the report.
      const issues = [];
      for (const c of categories) {
        for (const ref of lhr.categories[c].auditRefs) {
          const a = lhr.audits[ref.id];
          if (!a || a.score === null || a.score >= 0.9) continue;
          if (ref.weight === 0 && !a.details?.overallSavingsMs) continue;
          issues.push(`${c}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ''}`);
        }
      }
      results.push({ lang, key, path: sitePath, scores, metrics, issues });
      console.log(`  ${lang}/${key.padEnd(8)} perf ${String(scores.performance).padStart(3)}  a11y ${String(scores.accessibility).padStart(3)}  bp ${String(scores['best-practices']).padStart(3)}  seo ${String(scores.seo).padStart(3)}   LCP ${metrics.lcp}  TBT ${metrics.tbt}  CLS ${metrics.cls}`);
    }
  }
} finally {
  await chrome.kill();
  await close();
}

const below = results.filter((r) => Object.values(r.scores).some((s) => s < MIN));
ensureDir(path.join(ROOT, 'docs', 'qa'));
const lines = [
  '# Lighthouse (mobile)',
  '',
  `Generated ${nowStamp()} with \`npm run qa:lighthouse\` against \`${base}\` (Lighthouse ${results.length ? 'mobile preset, simulated throttling' : ''}).`,
  `Target: every category ≥ ${MIN} on every page. Result: **${below.length === 0 ? 'met' : `${below.length} page(s) below target`}**.`,
  '',
  '| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
];
for (const r of results) {
  const s = r.scores;
  const cell = (v) => (v < MIN ? `**${v}**` : String(v));
  lines.push(`| \`${r.path}\` | ${cell(s.performance)} | ${cell(s.accessibility)} | ${cell(s['best-practices'])} | ${cell(s.seo)} | ${r.metrics.fcp} | ${r.metrics.lcp} | ${r.metrics.tbt} | ${r.metrics.cls} |`);
}
const withIssues = results.filter((r) => r.issues.length);
if (withIssues.length) {
  lines.push('', '## Audits scoring below 0.9', '');
  for (const r of withIssues) { lines.push(`* \`${r.path}\``); for (const i of r.issues) lines.push(`  * ${i}`); }
}
lines.push('', 'Scores are from a local static server with compression; production hosting (Vercel or Apache with the provided .htaccess) uses the same caching rules. Numbers vary a few points between runs.', '');
fs.writeFileSync(path.join(ROOT, 'docs', 'qa', 'lighthouse.md'), lines.join('\n'));
fs.writeFileSync(path.join(ROOT, 'docs', 'qa', 'lighthouse.json'), JSON.stringify(results, null, 2));
console.log(`\nReport: docs/qa/lighthouse.md. ${below.length ? `${below.length} page(s) below ${MIN}.` : `All pages ≥ ${MIN}.`}`);
if (below.length) process.exitCode = 1;
