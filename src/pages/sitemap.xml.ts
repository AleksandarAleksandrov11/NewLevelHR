/**
 * Multilingual sitemap: every indexable page in every language with reciprocal
 * xhtml:link alternates (plus x-default = English).
 */
import type { APIRoute } from 'astro';
import { site } from '@/config/site';
import { locales, localeMeta, type Locale } from '@/i18n/config';
import { pageKeys, localizePath, absoluteUrl, type PageKey } from '@/i18n/routes';

const EXCLUDED: PageKey[] = ['notFound'];

interface UrlEntry {
  loc: string;
  lastmod?: string;
  alternates: Array<{ hreflang: string; href: string }>;
  changefreq?: string;
  priority?: string;
}

const priorities: Partial<Record<PageKey, string>> = {
  home: '1.0',
  services: '0.9',
  serviceFractional: '0.9',
  serviceHiring: '0.9',
  serviceBridge: '0.9',
  serviceCoaching: '0.9',
  contact: '0.9',
  problems: '0.8',
  about: '0.8',
  howWeWork: '0.8',
  faq: '0.7',
  legalNotice: '0.2',
  terms: '0.2',
  privacy: '0.2',
  cookies: '0.2',
};

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function alternatesFor(paths: Partial<Record<Locale, string>>) {
  const alts: Array<{ hreflang: string; href: string }> = [];
  for (const l of locales) {
    const p = paths[l];
    if (p) alts.push({ hreflang: localeMeta[l].hreflang, href: absoluteUrl(site.url, p) });
  }
  const xDefault = paths.en ?? Object.values(paths)[0];
  if (xDefault) alts.push({ hreflang: 'x-default', href: absoluteUrl(site.url, xDefault) });
  return alts;
}

export const GET: APIRoute = () => {
  const entries: UrlEntry[] = [];

  for (const key of pageKeys) {
    if (EXCLUDED.includes(key)) continue;
    const paths = Object.fromEntries(locales.map((l) => [l, localizePath(key, l)])) as Record<Locale, string>;
    const alternates = alternatesFor(paths);
    for (const l of locales) {
      entries.push({ loc: absoluteUrl(site.url, paths[l]), alternates, priority: priorities[key], changefreq: 'monthly' });
    }
  }

  const body = entries
    .map((e) => {
      const alts = e.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${escapeXml(a.href)}" />`).join('\n');
      return [
        '  <url>',
        `    <loc>${escapeXml(e.loc)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : '',
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : '',
        e.priority ? `    <priority>${e.priority}</priority>` : '',
        alts,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
