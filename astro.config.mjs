// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [
          tailwindcss()
      ],
  },

  adapter: netlify(),
  integrations: [icon()],
});