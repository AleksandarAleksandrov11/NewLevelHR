import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from '@/i18n/config';

export type BlogEntry = CollectionEntry<'blog'>;

export function entryLang(entry: BlogEntry): Locale {
  return entry.id.split('/')[0] as Locale;
}
export function entrySlug(entry: BlogEntry): string {
  return entry.id.split('/').slice(1).join('/');
}

export async function getPosts(lang: Locale, { includeDrafts = false } = {}): Promise<BlogEntry[]> {
  const all = await getCollection('blog', (e) => entryLang(e) === lang && (includeDrafts || !e.data.draft));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Languages in which a given post slug exists (published only). */
export async function postLanguages(slug: string): Promise<Locale[]> {
  const all = await getCollection('blog', (e) => entrySlug(e) === slug && !e.data.draft);
  return locales.filter((l) => all.some((e) => entryLang(e) === l));
}

const WORDS_PER_MINUTE = 200;
export function readingTime(body: string | undefined, override?: number): number {
  if (override) return override;
  const words = (body ?? '').replace(/[#>*_`\-\[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
