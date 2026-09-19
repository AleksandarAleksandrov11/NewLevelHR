// Ad-hoc: full Lighthouse audit details for one URL (LCP element, request chains, opportunities).
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromiumPath, resolveBase } from './lib/qa-utils.mjs';
const target = process.argv[2] || '/en/';
const { base, close } = await resolveBase();
const chrome = await chromeLauncher.launch({ chromePath: chromiumPath(), chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'] });
const r = await lighthouse(base + target, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility'] });
const a = r.lhr.audits;
console.log('perf', Math.round(r.lhr.categories.performance.score * 100), 'a11y', Math.round(r.lhr.categories.accessibility.score * 100));
for (const id of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'server-response-time']) console.log(id, a[id]?.displayValue);
const lcpEl = a['largest-contentful-paint-element'];
console.log('LCP element audit:', JSON.stringify(lcpEl?.details ?? null).slice(0, 900));
const lcpIns = a['lcp-breakdown-insight'] || a['lcp-discovery-insight'];
if (lcpIns) console.log('LCP insight:', JSON.stringify(lcpIns.details).slice(0, 600));
for (const id of ['render-blocking-resources', 'render-blocking-insight', 'font-display', 'unused-javascript', 'unused-css-rules', 'unminified-javascript', 'lcp-lazy-loaded', 'prioritize-lcp-image', 'network-dependency-tree-insight', 'critical-request-chains', 'uses-text-compression', 'total-byte-weight', 'bootup-time', 'mainthread-work-breakdown', 'dom-size', 'third-party-summary', 'legacy-javascript', 'duplicated-javascript', 'uses-long-cache-ttl', 'max-potential-fid', 'interactive']) {
  const x = a[id]; if (!x) continue;
  if (x.score !== null && x.score >= 0.9 && !x.details?.overallSavingsMs) continue;
  console.log(`- ${id}: score ${x.score} ${x.displayValue || ''}`);
  const items = x.details?.items || [];
  for (const it of items.slice(0, 6)) console.log('    ', JSON.stringify(it).slice(0, 220));
}
console.log('--- accessibility audits < 1:');
for (const ref of r.lhr.categories.accessibility.auditRefs) { const x = a[ref.id]; if (x && x.score !== null && x.score < 1) { console.log(`- ${ref.id}: ${x.title}`); for (const it of (x.details?.items || []).slice(0, 5)) console.log('    ', it.node?.snippet?.slice(0, 200), '|', it.node?.explanation?.slice(0, 200)); } }
await chrome.kill(); await close();
