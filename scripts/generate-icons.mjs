/**
 * Generates favicons, PWA icons and the web manifest from a single SVG mark.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const out = path.resolve('public');
await fs.mkdir(path.join(out, 'icons'), { recursive: true });

const mark = (bg, radius, pad) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff6b35"/><stop offset="0.55" stop-color="#f7931e"/><stop offset="1" stop-color="#ffb347"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="${radius}" fill="${bg}"/>
  <g transform="translate(${pad} ${pad}) scale(${(64 - 2 * pad) / 32})">
    <rect x="3" y="20" width="8" height="9" rx="2" fill="#ffb347"/>
    <rect x="12" y="13" width="8" height="16" rx="2" fill="#f7931e"/>
    <rect x="21" y="4" width="8" height="25" rx="2" fill="#ff6b35"/>
  </g>
</svg>`;

const svgStandard = mark('#14141c', 14, 12);
const svgMaskable = mark('#14141c', 0, 16);
await fs.writeFile(path.join(out, 'favicon.svg'), svgStandard.trim() + '\n');

const png = async (svg, size, file) => sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(out, file));
await png(svgStandard, 16, 'favicon-16.png');
await png(svgStandard, 32, 'favicon-32.png');
await png(svgStandard, 180, 'apple-touch-icon.png');
await png(svgStandard, 192, 'icons/icon-192.png');
await png(svgStandard, 512, 'icons/icon-512.png');
await png(svgMaskable, 512, 'icons/icon-maskable-512.png');

// favicon.ico container with PNG entries (16 + 32)
const entries = [];
for (const size of [16, 32]) {
  const buf = await sharp(Buffer.from(svgStandard)).resize(size, size).png().toBuffer();
  entries.push({ size, buf });
}
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = 6 + 16 * entries.length;
const dir = [];
for (const e of entries) {
  const d = Buffer.alloc(16);
  d.writeUInt8(e.size === 256 ? 0 : e.size, 0); d.writeUInt8(e.size === 256 ? 0 : e.size, 1);
  d.writeUInt8(0, 2); d.writeUInt8(0, 3); d.writeUInt16LE(1, 4); d.writeUInt16LE(32, 6);
  d.writeUInt32LE(e.buf.length, 8); d.writeUInt32LE(offset, 12);
  offset += e.buf.length; dir.push(d);
}
await fs.writeFile(path.join(out, 'favicon.ico'), Buffer.concat([header, ...dir, ...entries.map((e) => e.buf)]));

const manifest = {
  name: 'NewLevelHR',
  short_name: 'NewLevelHR',
  description: 'Real HR support without the full-time hire. Compliance, hiring, employee issues, done right.',
  start_url: '/en/',
  scope: '/',
  display: 'minimal-ui',
  background_color: '#fbf8f4',
  theme_color: '#fbf8f4',
  lang: 'en',
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
await fs.writeFile(path.join(out, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log('icons generated');
