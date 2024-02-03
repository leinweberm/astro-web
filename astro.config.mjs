import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: 'https://rosamery-artist.com',
  integrations: [icon(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});