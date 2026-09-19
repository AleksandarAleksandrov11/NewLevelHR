/**
 * Open Graph images for published blog posts, e.g. /og/de/blog/onboarding-bingo-buzzwords.png.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { locales, formatDate, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n';
import { entryLang, entrySlug } from '@/lib/blog';
import { renderOg } from '@/lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', (e) => !e.data.draft);
  return posts.map((post) => ({ params: { lang: entryLang(post), slug: entrySlug(post) }, props: { id: post.id } }));
};

export const GET: APIRoute = async ({ params, props }) => {
  const lang = params.lang as Locale;
  const entry = await getEntry('blog', (props as { id: string }).id);
  if (!locales.includes(lang) || !entry) return new Response('Not found', { status: 404 });
  const b = getDict(lang).blog;
  const category = b.categories[entry.data.category as keyof typeof b.categories] ?? entry.data.category;
  const png = await renderOg({
    lang,
    theme: 'dark',
    eyebrow: category,
    title: entry.data.title,
    subtitle: entry.data.description,
    meta: `${entry.data.author} · ${formatDate(entry.data.date, lang)}`,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
