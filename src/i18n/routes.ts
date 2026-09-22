import { locales, type Locale } from './config';

/**
 * Page registry: every static page of the site with its translated slug per
 * language. Slugs are relative to the language prefix and have no leading or
 * trailing slash. The home page uses an empty slug.
 *
 * Bulgarian slugs are transliterated to Latin so they stay short and shareable.
 */
export const pageKeys = [
  'home',
  'services',
  'serviceFractional',
  'serviceHiring',
  'serviceBridge',
  'serviceCoaching',
  'problems',
  'about',
  'howWeWork',
  'faq',
  'healthCheck',
  'badHireCost',
  'blog',
  'contact',
  'legalNotice',
  'terms',
  'privacy',
  'cookies',
  'notFound',
] as const;
export type PageKey = (typeof pageKeys)[number];

export const routes: Record<PageKey, Record<Locale, string>> = {
  home: { en: '', de: '', bg: '' },
  services: { en: 'services', de: 'leistungen', bg: 'uslugi' },
  serviceFractional: {
    en: 'services/fractional-hr-partnership',
    de: 'leistungen/fraktionale-hr-partnerschaft',
    bg: 'uslugi/fraktsionno-hr-partniorstvo',
  },
  serviceHiring: {
    en: 'services/high-velocity-hiring',
    de: 'leistungen/high-velocity-hiring',
    bg: 'uslugi/high-velocity-naemane',
  },
  serviceBridge: {
    en: 'services/90-day-success-bridge',
    de: 'leistungen/90-tage-erfolgsbruecke',
    bg: 'uslugi/90-dneven-most-za-uspeh',
  },
  serviceCoaching: {
    en: 'services/manager-coaching',
    de: 'leistungen/manager-coaching',
    bg: 'uslugi/kouching-za-menidzhari',
  },
  problems: { en: 'what-we-fix', de: 'was-wir-loesen', bg: 'kakvo-reshavame' },
  about: { en: 'about', de: 'ueber-uns', bg: 'za-nas' },
  howWeWork: { en: 'how-we-work', de: 'so-arbeiten-wir', bg: 'kak-rabotim' },
  faq: { en: 'faq', de: 'faq', bg: 'faq' },
  healthCheck: { en: 'hr-health-check', de: 'hr-check', bg: 'hr-proverka' },
  badHireCost: { en: 'cost-of-a-bad-hire', de: 'kosten-einer-fehlbesetzung', bg: 'tsena-na-greshno-naznachenie' },
  blog: { en: 'blog', de: 'blog', bg: 'blog' },
  contact: { en: 'contact', de: 'kontakt', bg: 'kontakti' },
  legalNotice: { en: 'legal-notice', de: 'impressum', bg: 'pravna-informatsia' },
  terms: { en: 'terms', de: 'agb', bg: 'obshti-usloviya' },
  privacy: { en: 'privacy-policy', de: 'datenschutz', bg: 'poveritelnost' },
  cookies: { en: 'cookie-policy', de: 'cookie-richtlinie', bg: 'politika-za-biskvitki' },
  notFound: { en: '404', de: '404', bg: '404' },
};

export const serviceKeys = ['serviceFractional', 'serviceHiring', 'serviceBridge', 'serviceCoaching'] as const satisfies readonly PageKey[];
export type ServiceKey = (typeof serviceKeys)[number];

/** Absolute site path (with language prefix and trailing slash). */
export function localizePath(key: PageKey, lang: Locale, hash?: string): string {
  const slug = routes[key][lang];
  const base = slug ? `/${lang}/${slug}/` : `/${lang}/`;
  return hash ? `${base}#${hash}` : base;
}


/** Path of the same page in another language. */
export function alternatePaths(key: PageKey): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, localizePath(key, l)])) as Record<Locale, string>;
}


/** Resolve a (lang, slug) pair back to a page key, if it is a static page. */
export function pageKeyFromSlug(lang: Locale, slug: string): PageKey | undefined {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return pageKeys.find((k) => routes[k][lang] === clean);
}

/** Absolute URL helper */
export function absoluteUrl(siteUrl: string, path: string): string {
  return `${siteUrl.replace(/\/$/, '')}${path}`;
}

/** Absolute path of a blog post (language prefix + blog slug + post slug). */
export function blogPostPath(lang: Locale, slug: string): string {
  return `/${lang}/${routes.blog[lang]}/${slug}/`;
}
