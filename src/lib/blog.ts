/**
 * Blog helpers: entries are stored as "<lang>/<slug>" ids, so the language and
 * the slug come straight from the collection id.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale } from '@/i18n/config';

export type Post = CollectionEntry<'blog'>;

const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export function splitId(id: string): { lang: Locale; slug: string } | null {
  const [lang, ...rest] = id.split('/');
  const slug = rest.join('/');
  if (!lang || !slug || !isLocale(lang)) return null;
  return { lang, slug };
}

export function postLang(post: Post): Locale {
  return splitId(post.id)?.lang ?? 'en';
}

export function postSlug(post: Post): string {
  return splitId(post.id)?.slug ?? post.id;
}

/** Published posts of one language, newest first. Drafts only show in `astro dev`. */
export async function getPosts(lang: Locale): Promise<Post[]> {
  const all = await getCollection('blog', ({ data, id }) => {
    const parts = splitId(id);
    if (!parts || parts.lang !== lang) return false;
    return import.meta.env.DEV || !data.draft;
  });
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Every published post in every language, for the sitemap and the routes. */
export async function getAllPosts(): Promise<Post[]> {
  const all = await getCollection('blog', ({ data, id }) => {
    if (!splitId(id)) return false;
    return import.meta.env.DEV || !data.draft;
  });
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Unique tags of a language's posts, in the order they first appear. */
export function collectTags(posts: Post[]): string[] {
  const seen = new Set<string>();
  for (const p of posts) for (const t of p.data.tags) seen.add(t);
  return [...seen];
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}
