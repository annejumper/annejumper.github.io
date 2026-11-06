// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// On GitHub Pages these are set automatically by .github/workflows/deploy.yml.
// SITE  = https://<username>.github.io      BASE = /<repo-name>  (or "/" for a <username>.github.io repo)
const site = process.env.SITE || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  image: {
    // Responsive images: Astro generates multiple widths + modern formats at build time.
    layout: 'constrained',
  },
});
