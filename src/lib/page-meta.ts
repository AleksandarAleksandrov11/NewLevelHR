/**
 * Title and subtitle of every registry page, used for the generated Open Graph
 * images (src/pages/og/[lang]/[key].png.ts). Only the `common` namespace is read
 * so the images never depend on a page namespace that is still being written.
 */
import { site } from '@/config/site';
import { getDict } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { pageKeys, type PageKey } from '@/i18n/routes';

/** Every registry page plus the fallback image the Seo component points to. */
export type MetaKey = PageKey | 'default';
export const metaKeys = [...pageKeys, 'default'] as const satisfies readonly MetaKey[];

export function isMetaKey(value: unknown): value is MetaKey {
  return typeof value === 'string' && (metaKeys as readonly string[]).includes(value);
}

export interface PageMeta {
  title: string;
  subtitle: string;
}

export function getPageMeta(lang: Locale, key: MetaKey): PageMeta {
  const c = getDict(lang).common;
  const tagline = c.meta.tagline;
  const legal = (title: string): PageMeta => ({ title, subtitle: site.name });

  switch (key) {
    case 'home':
    case 'default':
      return { title: c.meta.defaultTitle, subtitle: tagline };
    case 'services':
      return { title: c.nav.services, subtitle: c.nav.servicesOverviewDesc };
    case 'healthCheck':
      return { title: c.nav.healthCheck, subtitle: tagline };
    case 'badHireCost':
      return { title: c.nav.badHireCost, subtitle: tagline };
    case 'blog':
      return { title: c.nav.blog, subtitle: tagline };
    case 'serviceFractional':
      return { title: c.services.fractional.name, subtitle: c.services.fractional.tagline };
    case 'serviceHiring':
      return { title: c.services.hiring.name, subtitle: c.services.hiring.tagline };
    case 'serviceBridge':
      return { title: c.services.bridge.name, subtitle: c.services.bridge.tagline };
    case 'serviceCoaching':
      return { title: c.services.coaching.name, subtitle: c.services.coaching.tagline };
    case 'problems':
    case 'about':
    case 'howWeWork':
    case 'faq':
    case 'contact':
      return { title: c.nav[key], subtitle: tagline };
    case 'legalNotice':
      return legal(c.footer.legalNotice);
    case 'terms':
      return legal(c.footer.terms);
    case 'privacy':
      return legal(c.footer.privacy);
    case 'cookies':
      return legal(c.footer.cookies);
    case 'notFound':
      return { title: c.notFound.title, subtitle: tagline };
  }
}
