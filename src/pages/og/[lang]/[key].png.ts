/**
 * Open Graph images for every registry page in every language, e.g.
 * /og/en/services.png. Rendered at build time by src/lib/og.ts.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, type Locale } from '@/i18n/config';
import { getDict } from '@/i18n';
import { getPageMeta, isMetaKey, metaKeys } from '@/lib/page-meta';
import { renderOg } from '@/lib/og';

export const getStaticPaths: GetStaticPaths = () =>
  locales.flatMap((lang) => metaKeys.map((key) => ({ params: { lang, key } })));

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Locale;
  const key = params.key;
  if (!locales.includes(lang) || !isMetaKey(key)) return new Response('Not found', { status: 404 });
  const meta = getPageMeta(lang, key);
  const c = getDict(lang).common;
  const png = await renderOg({
    lang,
    title: meta.title,
    subtitle: meta.subtitle === meta.title ? '' : meta.subtitle,
    meta: c.meta.tagline === meta.subtitle ? '' : c.meta.tagline,
  });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
