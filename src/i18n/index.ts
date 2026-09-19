import * as en from './en';
import * as de from './de';
import * as bg from './bg';
import { defaultLocale, isLocale, type Locale } from './config';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  // Each de/bg namespace is typed against its English counterpart, so the
  // casts below are safe; the runtime check in scripts/check-i18n.mjs
  // guarantees key parity as well.
  de: de as unknown as Dictionary,
  bg: bg as unknown as Dictionary,
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
