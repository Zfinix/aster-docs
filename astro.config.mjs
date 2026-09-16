import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://docs.withaster.dev',
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'vesper', wrap: true },
  },
});
