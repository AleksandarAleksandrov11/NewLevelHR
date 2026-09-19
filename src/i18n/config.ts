export const locales = ['en', 'de', 'bg'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<
  Locale,
  {
    /** Native name shown in the language switcher */
    name: string;
    short: string;
    htmlLang: string;
    /** BCP-47 tag used for Intl formatting */
    intl: string;
    ogLocale: string;
    /** Locale used by hreflang */
    hreflang: string;
  }
> = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', intl: 'en-GB', ogLocale: 'en_US', hreflang: 'en' },
  de: { name: 'Deutsch', short: 'DE', htmlLang: 'de', intl: 'de-DE', ogLocale: 'de_DE', hreflang: 'de' },
  bg: { name: 'Български', short: 'BG', htmlLang: 'bg', intl: 'bg-BG', ogLocale: 'bg_BG', hreflang: 'bg' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function formatDate(date: Date, lang: Locale, opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  return new Intl.DateTimeFormat(localeMeta[lang].intl, opts).format(date);
}

export function formatNumber(n: number, lang: Locale, opts: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat(localeMeta[lang].intl, opts).format(n);
}
