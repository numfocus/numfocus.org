import markdownIntegration from '@astropub/md';
import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import netlify from '@astrojs/netlify';

import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://numfocus.netlify.app',

  adapter: netlify(),
  image: {
    domains: ['http://3.134.84.33'],
    experimentalLayout: 'constrained'
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
  experimental: {
    fonts: [
      {
        provider: fontProviders.bunny(),
        name: 'PT Sans Caption',
        cssVariable: '--font-pt-sans-caption',
        weights: [400, 700],
      },
      {
        provider: fontProviders.bunny(),
        name: 'Lato',
        cssVariable: '--font-lato',
        weights: [100, 300, 400, 700, 900],
      },
    ],
  },
});
