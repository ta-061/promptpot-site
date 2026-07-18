import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One entry per article. English posts carry their body (rendered on-site);
// Japanese posts carry only metadata + an external Qiita URL.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    lang: z.enum(['en', 'ja']),
    // when set, the list links out here instead of to an on-site page
    externalUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
