import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each project lives in projects/<slug>/info.md. Content only — layout lives in src/.
const projects = defineCollection({
  loader: glob({
    pattern: '*/info.md',
    base: './projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().default(''),
      categories: z.array(z.string()).default([]),
      tools: z.array(z.string()).default([]),
      course: z.string().default(''),
      date: z.string().default(''), // display text, e.g. "Fall 2025"
      sortDate: z.string().default(''), // "YYYY-MM", used for ordering
      team: z.string().default(''),
      role: z.string().default(''),
      featured: z.number().default(0), // 1 = first on home page; 0 = not featured
      hidden: z.boolean().default(false),
      hero: image(),
      heroAlt: z.string().default(''),
      gallery: z
        .array(z.object({ src: image(), caption: z.string().default(''), group: z.string().default('') }))
        .default([]),
      videos: z
        .array(
          z.object({
            title: z.string().default('Video'),
            youtube: z.string().nullish().default(''), // URL or 11-char ID; takes priority over file
            file: z.string().default(''), // media/videos/x.mp4 (self-hosted)
            poster: image().optional(),
            description: z.string().default(''),
          }),
        )
        .default([]),
      documents: z
        .array(z.object({ title: z.string(), file: z.string(), description: z.string().default('') }))
        .default([]),
      links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
      source: z.string().default(''),
      guessed: z.array(z.string()).default([]),
    }),
});

export const collections = { projects };
