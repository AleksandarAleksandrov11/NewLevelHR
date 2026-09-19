import * as en from './en';
import * as de from './de';
import * as bg from './bg';
import { defaultLocale, isLocale, type Locale } from './config';

export type Dictionary = typeof en;

type Plain = Record<string, unknown>;
const isPlain = (v: unknown): v is Plain => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Deep-merges a locale dictionary over the English reference so that a key
 * missing in a translation never renders as `undefined`. Completeness is still
 * enforced by TypeScript (each namespace is typed against English) and by
 * scripts/check-i18n.mjs, which fails the build on any missing key.
 */
function withFallback<T>(base: T, over: unknown): T {
  if (!isPlain(base) || !isPlain(over)) return (over === undefined ? base : (over as T));
  const out: Plain = { ...base };
  for (const k of Object.keys(base)) out[k] = withFallback((base as Plain)[k], over[k]);
  for (const k of Object.keys(over)) if (!(k in base)) out[k] = over[k];
  return out as T;
}

const dictionaries: Record<Locale, Dictionary> = {
  en,
  de: withFallback(en, de),
  bg: withFallback(en, bg),
};

export function getDict(lang: Locale): Dictionary {
  return dictionaries[lang] ?? dictionaries[defaultLocale];
}

/** Replace `{name}` placeholders. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (k in vars ? String(vars[k]) : `{${k}}`));
}

/** Read the language from an Astro route param safely. */
export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export { locales, defaultLocale, localeMeta, isLocale, formatDate, formatNumber } from './config';
export type { Locale } from './config';
export * from './routes';
