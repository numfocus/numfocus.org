import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // `loader` can accept an array of multiple patterns as well as string patterns
  // Load all markdown files in the space-probes directory, except for those that start with "voyager-"
  loader: glob({
    pattern: ['*/*.yaml'],
    base: 'src/data/projects',
  }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['sponsored', 'affiliated']),
    support_year_start: z.number(),
    logo: z.string(),
    short_description: z.string(),
    features: z.array(z.string()),
    industries: z.array(z.string()),
    languages: z.array(z.string()),
    website_link: z.string().url(),
  }),
});

export const collections = { projects };
