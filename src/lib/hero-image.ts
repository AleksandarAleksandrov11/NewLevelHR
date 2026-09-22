import { getImage } from 'astro:assets';
import { getPhoto } from './images';

/**
 * Geometry of the hero photo in PageHero. The preload link in the document head
 * has to describe exactly the same candidates as the <source> further down, or
 * the browser downloads the picture twice.
 */
export const HERO_WIDTHS = [480, 768, 1024, 1440, 1920];
export const HERO_SIZES = '(min-width: 64rem) 45vw, 100vw';

/** AVIF srcset of a hero photo, for `<link rel="preload" as="image">`. */
export async function heroAvifSrcSet(name?: string): Promise<string | null> {
  const img = name ? getPhoto(name) : undefined;
  if (!img) return null;
  const shot = await getImage({
    src: img,
    widths: HERO_WIDTHS.filter((w) => w <= img.width),
    sizes: HERO_SIZES,
    format: 'avif',
  });
  return shot.srcSet?.attribute || null;
}
