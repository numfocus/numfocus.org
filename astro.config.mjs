// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import markdownIntegration from '@astropub/md';

import netlify from '@astrojs/netlify';

import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://numfocus-dev.netlify.app',
  trailingSlash: 'always',

  adapter: netlify(),
  image: {
    domains: ['cms.numfocus.draftlab.dev'],
  },
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    react(),
    markdownIntegration(),
  ],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
    // syntaxHighlight: 'shiki'
    // syntaxHighlight: 'prism'
  },
});
