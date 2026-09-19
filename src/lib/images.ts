import type { ImageMetadata } from 'astro';

/**
 * All photos in src/assets/images (and subfolders) keyed by their path without
 * extension, e.g. "one-on-one" or "blog/onboarding-bingo". Components look
 * images up by name and fall back gracefully if a file is missing, so pages
 * never fail to build because of a photo.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(modules)) {
  const key = path.replace('/src/assets/images/', '').replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  byName.set(key, mod.default);
}

export function getPhoto(name: string): ImageMetadata | undefined {
  return byName.get(name);
}

export function hasPhoto(name: string): boolean {
  return byName.has(name);
}

export const photoNames = Array.from(byName.keys());
