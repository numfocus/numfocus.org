// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import markdownIntegration from '@astropub/md';

import netlify from '@astrojs/netlify';

import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'numfocus-dev.netlify.app',
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify(),
  integrations: [icon(), react(), markdownIntegration()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
});
