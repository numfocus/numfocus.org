import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import slugify from 'slugify';

const projects = defineCollection({
  // `loader` can accept an array of multiple patterns as well as string patterns
  // Load all markdown files in the space-probes directory, except for those that start with "voyager-"
  loader: glob({
    pattern: ['*/*.yaml'],
    base: 'src/data/projects',
    // generate id from project directory name
    generateId: ({ entry }) =>
      slugify(entry.replace(/\/[^/]+$/, ''), { lower: true }),
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      type: z.enum(['sponsored', 'affiliated']),
      support_year_start: z.number().optional(),
      logo: image(),
      short_description: z.string(),
      technical_details: z.string().optional().nullish(),
      applications: z.string().optional().nullish(),
      features: z.array(z.string().toLowerCase()).optional(),
      industries: z.array(z.string().toLowerCase()).optional(),
      languages: z.array(z.string().toLowerCase()).optional(),
      website_link: z.string().url().optional(),
      contribute_link: z.string().url().optional(),
    }),
});

export const collections = { projects };
