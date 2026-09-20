import type { APIRoute } from 'astro';
import { site } from '@/config/site';

export const GET: APIRoute = () => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /contact.php',
    'Disallow: /*/404/',
    '',
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
