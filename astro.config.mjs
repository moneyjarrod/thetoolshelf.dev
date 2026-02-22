import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thetoolshelf.dev',
  integrations: [sitemap()],
  output: 'static',
});
