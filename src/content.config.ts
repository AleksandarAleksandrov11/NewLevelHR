import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts live in src/content/blog/<lang>/<slug>.md
 * The same slug across language folders links the translations together.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['culture', 'recruiting', 'leadership', 'compliance', 'onboarding']),
      tags: z.array(z.string()).default([]),
      /** Name of a photo in src/assets/images (without extension), e.g. "blog/onboarding-bingo" */
      cover: z.string().optional(),
      coverAlt: z.string().optional(),
      coverCredit: z.string().optional(),
      draft: z.boolean().default(false),
      author: z.string().default('Mariyana Velkova'),
      /** Optional override of the reading time (minutes). */
      readingTime: z.number().optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { blog };
