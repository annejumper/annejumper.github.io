import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

/** Prefix a site-relative path with the deploy base (needed on GitHub Pages project sites). */
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
};

export type Project = CollectionEntry<'projects'>;

export async function getProjects() {
  const all = await getCollection('projects', (p) => !p.data.hidden);
  // Featured projects first (in their featured order), then everything else newest first.
  const rank = (p: Project) => (p.data.featured > 0 ? p.data.featured : 1000);
  return all.sort((a, b) => rank(a) - rank(b) || b.data.sortDate.localeCompare(a.data.sortDate) || a.data.title.localeCompare(b.data.title));
}

export const projectHref = (p: Project) => url(`projects/${p.id}/`);
export const isResearch = (p: Project) => p.data.categories.includes(site.researchCategory);

export const fileUrl = (p: Project, file: string) =>
  url(`files/${p.id}/${file.replace(/^\.?\//, '').replace(/^media\/videos\//, 'videos/')}`);

export function youtubeId(v?: string | null) {
  if (!v) return '';
  const m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : /^[\w-]{11}$/.test(v.trim()) ? v.trim() : '';
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
