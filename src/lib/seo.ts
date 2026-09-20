import { site } from '@/config/site';
import { localeMeta, locales, type Locale } from '@/i18n/config';
import { absoluteUrl } from '@/i18n/routes';

export interface SeoInput {
  lang: Locale;
  title: string;
  description: string;
  /** Path of this page (with leading slash and trailing slash) */
  path: string;
  /** Paths of the same page in other languages, keyed by locale */
  alternates?: Partial<Record<Locale, string>>;
  /** Absolute or root-relative OG image */
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
}

export function buildTitle(title: string, suffix: string): string {
  if (!title) return site.name;
  if (title.includes(site.name)) return title;
  return `${title}${suffix}`;
}

export function canonicalFor(path: string): string {
  return absoluteUrl(site.url, path);
}

export function hreflangLinks(alternates: Partial<Record<Locale, string>> | undefined, lang: Locale, path: string) {
  const alts = { ...(alternates ?? {}) };
  if (!alts[lang]) alts[lang] = path;
  const links: Array<{ hreflang: string; href: string }> = [];
  for (const l of locales) {
    const p = alts[l];
    if (p) links.push({ hreflang: localeMeta[l].hreflang, href: absoluteUrl(site.url, p) });
  }
  const xDefault = alts.en ?? path;
  links.push({ hreflang: 'x-default', href: absoluteUrl(site.url, xDefault) });
  return links;
}

/** Default OG image path for a page, generated at build time by /og/[lang]/[key].png */
export function ogImageFor(lang: Locale, key: string): string {
  return absoluteUrl(site.url, `/og/${lang}/${key}.png`);
}
