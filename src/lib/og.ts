/**
 * Open Graph image renderer (1200x630). Runs at build time only: satori turns a
 * small JSX-like element tree into SVG, resvg rasterises it to PNG. Fonts are the
 * same Manrope subsets the site ships (Latin + Cyrillic), read from @fontsource.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori, { type Font } from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { site } from '@/config/site';
import { localeMeta, type Locale } from '@/i18n/config';

const require = createRequire(import.meta.url);

export interface OgInput {
  lang: Locale;
  title: string;
  subtitle?: string;
  /** Small uppercase label above the title (category, section) */
  eyebrow?: string;
  /** Footer line on the right (author, date) */
  meta?: string;
  /** Visual variant: light ivory (pages) or dark ink (articles) */
  theme?: 'light' | 'dark';
}

const colors = {
  ivory: '#fbf8f4',
  sand: '#f4eee6',
  ink: '#14141c',
  slate: '#5b5b6c',
  mist: '#8a8a99',
  accent: '#ff6b35',
  accent2: '#f7931e',
  accent3: '#ffb347',
  accentInk: '#c2410c',
  teal: '#1f6f78',
};

const FONT_STACK = 'Manrope, Manrope Cyrillic, Manrope Ext';

let fontsPromise: Promise<Font[]> | undefined;
async function loadFonts(): Promise<Font[]> {
  if (!fontsPromise) {
    fontsPromise = (async () => {
      // satori picks one font per family name, so every unicode subset gets its own
      // family and the root element lists them all as fallbacks (see FONT_STACK).
      const files: Array<[string, number, string]> = [
        ['Manrope', 800, 'manrope-latin-800-normal.woff'],
        ['Manrope Cyrillic', 800, 'manrope-cyrillic-800-normal.woff'],
        ['Manrope Ext', 800, 'manrope-latin-ext-800-normal.woff'],
        ['Manrope', 500, 'manrope-latin-500-normal.woff'],
        ['Manrope Cyrillic', 500, 'manrope-cyrillic-500-normal.woff'],
        ['Manrope Ext', 500, 'manrope-latin-ext-500-normal.woff'],
      ];
      const fonts: Font[] = [];
      for (const [name, weight, file] of files) {
        try {
          const path = require.resolve(`@fontsource/manrope/files/${file}`);
          fonts.push({ name, data: await readFile(path), weight: weight as Font['weight'], style: 'normal' });
        } catch {
          // A missing subset only affects the glyphs it covers; the build must not fail.
        }
      }
      if (!fonts.length) throw new Error('OG fonts not found: is @fontsource/manrope installed?');
      return fonts;
    })();
  }
  return fontsPromise;
}

/** Title size that keeps long headlines inside the canvas. */
function titleSize(title: string): number {
  const n = title.length;
  if (n <= 28) return 78;
  if (n <= 45) return 66;
  if (n <= 70) return 54;
  if (n <= 95) return 46;
  return 40;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

/** Minimal element helper so the file stays plain TypeScript (no JSX runtime needed). */
type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, props: Record<string, unknown>, ...children: unknown[]): Node => {
  const kids = children.filter((c) => c !== null && c !== undefined && c !== false);
  // satori treats an empty array as an element child, so leave `children` out for leaf nodes.
  return { type, props: kids.length ? { ...props, children: kids.length === 1 ? kids[0] : kids } : { ...props } };
};

function wordmark(dark: boolean): Node {
  const fg = dark ? '#ffffff' : colors.ink;
  const steps = [
    { x: 3, y: 20, w: 8, h: 9, fill: colors.accent3 },
    { x: 12, y: 13, w: 8, h: 16, fill: colors.accent2 },
    { x: 21, y: 4, w: 8, h: 25, fill: colors.accent },
  ];
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 14 } },
    h(
      'svg',
      { width: 44, height: 44, viewBox: '0 0 32 32' },
      ...steps.map((s) => h('rect', { x: s.x, y: s.y, width: s.w, height: s.h, rx: 2, fill: s.fill })),
    ),
    h(
      'div',
      { style: { display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1.5, color: fg } },
      h('span', {}, 'NewLevel'),
      h('span', { style: { color: colors.accent } }, 'HR'),
    ),
  );
}

export async function renderOg(input: OgInput): Promise<Buffer> {
  const { lang, theme = 'light' } = input;
  const dark = theme === 'dark';
  const title = truncate(input.title, 120);
  const subtitle = input.subtitle ? truncate(input.subtitle, 150) : '';
  const bg = dark ? colors.ink : colors.ivory;
  const fg = dark ? '#ffffff' : colors.ink;
  const muted = dark ? 'rgba(255,255,255,0.72)' : colors.slate;
  const line = dark ? 'rgba(255,255,255,0.14)' : 'rgba(20,20,28,0.1)';
  const host = site.url.replace(/^https?:\/\//, '');

  const tree = h(
    'div',
    {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px 52px',
        background: bg,
        color: fg,
        fontFamily: FONT_STACK,
        position: 'relative',
        overflow: 'hidden',
      },
    },
    // Decorative accent shapes
    h('div', {
      style: {
        position: 'absolute',
        top: -260,
        right: -220,
        width: 720,
        height: 720,
        borderRadius: 360,
        background: `radial-gradient(circle at 40% 40%, ${colors.accent3} 0%, ${colors.accent} 45%, ${dark ? colors.ink : colors.ivory} 72%)`,
        opacity: dark ? 0.55 : 0.5,
      },
    }),
    h('div', {
      style: {
        position: 'absolute',
        bottom: -320,
        left: -180,
        width: 560,
        height: 560,
        borderRadius: 280,
        background: `radial-gradient(circle, ${colors.teal} 0%, ${dark ? colors.ink : colors.ivory} 70%)`,
        opacity: dark ? 0.45 : 0.18,
      },
    }),
    h('div', {
      style: {
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 118,
        height: 1,
        background: line,
      },
    }),
    // Header row
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
      wordmark(dark),
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 18px',
            borderRadius: 999,
            border: `2px solid ${line}`,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 2,
            color: muted,
          },
        },
        localeMeta[lang].short,
      ),
    ),
    // Body
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1000 } },
      input.eyebrow
        ? h(
            'div',
            {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: dark ? colors.accent3 : colors.accentInk,
              },
            },
            h('div', { style: { width: 34, height: 3, background: colors.accent, borderRadius: 2 } }),
            input.eyebrow,
          )
        : null,
      h('div', { style: { display: 'flex', fontSize: titleSize(title), fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 } }, title),
      subtitle ? h('div', { style: { display: 'flex', fontSize: 28, fontWeight: 500, lineHeight: 1.4, color: muted, maxWidth: 900 } }, subtitle) : null,
    ),
    // Footer row
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, fontWeight: 500, color: muted } },
      h('div', { style: { display: 'flex' } }, host),
      h('div', { style: { display: 'flex' } }, input.meta ?? ''),
    ),
  );

  const fonts = await loadFonts();
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return Buffer.from(png);
}
