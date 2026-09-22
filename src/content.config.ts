import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { locales } from './i18n/config';

/**
 * Blog posts, one folder per language: src/content/blog/<lang>/<slug>.md
 * The id is "<lang>/<slug>", so the language is part of the entry itself and
 * nothing has to be repeated in the frontmatter.
 *
 * Set `translationKey` to the same value in two languages to link them with
 * hreflang; leave it out and the post stands on its own.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*/**/*.md' }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(260),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    translationKey: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
export const contentLocales = locales;
