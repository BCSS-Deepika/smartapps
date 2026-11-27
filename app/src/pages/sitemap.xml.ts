/* sitemap.xml, built at build time: the homepage, every product page and every demo.
   The design-system page is internal and left out (it is also marked noindex). */
import type { APIRoute } from 'astro';
import { products, productUrl } from '@/data/products';
import { demos } from '@/data/home';

export const GET: APIRoute = ({ site }) => {
  const paths = ['/', ...products.map((p) => productUrl(p.slug)), ...demos.map((d) => d.path)];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${new URL(p, site)}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
