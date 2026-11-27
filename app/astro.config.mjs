// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Static output. Production host is Vercel (confirmed 2026-11-27); old .html
// URLs will be redirected in vercel.json at cutover, keeping #m- fragments.
export default defineConfig({
  site: 'https://smartapps-six.vercel.app',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
