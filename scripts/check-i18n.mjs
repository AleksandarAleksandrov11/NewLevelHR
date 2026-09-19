/**
 * Dictionary parity check. Loads src/i18n/{en,de,bg} through Vite (TypeScript,
 * path aliases) and compares DE and BG against the English reference:
 *   - every key must exist with the same type
 *   - arrays must have the same length (questions, steps, options…)
 *   - `{placeholders}` must match exactly
 *   - a sentence-length string identical to English counts as untranslated
 * Exits with code 1 on any failure. Short identical strings (brand names,
 * "Blog", "FAQ", emails) are listed as warnings only.
 */
import path from 'node:path';
import { createServer } from 'vite';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);
const LOCALES = ['de', 'bg'];
const UNTRANSLATED_MIN_LENGTH = 40;
/** Strings that are legitimately identical in every language. */
const ALLOW_IDENTICAL = /^(https?:\/\/|mailto:|[\w.+-]+@[\w-]+\.[\w.-]+$|NewLevelHR|Mariyana Velkova|Blog|FAQ|OK|Calendly|Cookie|LinkedIn|E-Mail|\d)/i;

const placeholders = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',');
const typeOf = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

function compare(base, other, trail, out) {
  const t = typeOf(base);
  if (t !== typeOf(other)) {
    out.errors.push(`${trail}: expected ${t}, got ${typeOf(other)}`);
    return;
  }
  if (t === 'array') {
    if (base.length !== other.length) out.errors.push(`${trail}: array length ${other.length}, expected ${base.length}`);
    base.forEach((item, i) => { if (i < other.length) compare(item, other[i], `${trail}[${i}]`, out); });
    return;
  }
  if (t === 'object') {
    for (const k of Object.keys(base)) {
      if (!(k in other)) out.errors.push(`${trail}.${k}: missing`);
      else compare(base[k], other[k], `${trail}.${k}`, out);
    }
    for (const k of Object.keys(other)) if (!(k in base)) out.warnings.push(`${trail}.${k}: extra key (not in EN)`);
    return;
  }
  if (t === 'string') {
    if (placeholders(base) !== placeholders(other)) out.errors.push(`${trail}: placeholders differ (EN ${placeholders(base) || '-'} / ${placeholders(other) || '-'})`);
    if (base === other && base.trim() && !ALLOW_IDENTICAL.test(base.trim())) {
      // Judge only the human-readable part: tags, URLs and emails are the same in every language.
      const readable = base.replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.-]+/g, ' ').replace(/\s+/g, ' ').trim();
      if (readable.length >= UNTRANSLATED_MIN_LENGTH) out.errors.push(`${trail}: identical to EN (untranslated?) "${base.slice(0, 60)}"`);
      else out.warnings.push(`${trail}: identical to EN "${base}"`);
    }
  }
}

const server = await createServer({
  root: ROOT,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
  resolve: { alias: { '@': path.join(ROOT, 'src') } },
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const load = async (l) => server.ssrLoadModule(`/src/i18n/${l}/index.ts`);
  const en = await load('en');
  let failed = false;
  for (const l of LOCALES) {
    const dict = await load(l);
    const out = { errors: [], warnings: [] };
    for (const ns of Object.keys(en)) {
      if (!(ns in dict)) { out.errors.push(`${ns}: namespace missing`); continue; }
      compare(en[ns], dict[ns], ns, out);
    }
    const identical = out.warnings.filter((w) => w.includes('identical')).length;
    console.log(`\n[${l}] ${out.errors.length} error(s), ${out.warnings.length} warning(s) (${identical} short identical strings)`);
    for (const e of out.errors) console.log(`  ✗ ${e}`);
    if (process.argv.includes('--verbose')) for (const w of out.warnings) console.log(`  · ${w}`);
    if (out.errors.length) failed = true;
  }
  const count = (o) => Object.values(o).reduce((n, v) => n + (typeof v === 'string' ? 1 : typeof v === 'object' && v ? count(v) : 0), 0);
  console.log(`\nEN reference: ${Object.keys(en).length} namespaces, ${count(en)} strings.`);
  if (failed) { console.error('\ni18n check failed.'); process.exitCode = 1; } else console.log('i18n check passed.');
} finally {
  await server.close();
}
