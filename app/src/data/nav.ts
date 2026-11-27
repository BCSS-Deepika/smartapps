import { products, divisions, garudaProducts, productUrl, bySlug } from './products';
import type { Accent } from '@/types/product';

export interface NavLink { label: string; href: string; note?: string; accent?: Accent }
export interface NavGroup { heading: string; links: NavLink[] }
export interface NavItem { label: string; href?: string; groups?: NavGroup[]; mega?: boolean; /** Group indexes per desktop column, so the mega-menu stays balanced. */ columns?: number[][] }

const link = (slug: string, note?: string): NavLink => {
  const p = bySlug(slug);
  return { label: p.name, href: productUrl(slug), note: note ?? p.line, accent: p.accent };
};

/** Mirrors the live navigation after PR 4: three flagships, then GARUDA as its own tab. */
export const nav: NavItem[] = [
  {
    label: 'Access Genie',
    groups: [
      { heading: 'Access Genie platform', links: [link('access-genie', 'AI video and operational intelligence'), { label: 'Traffic AI Analytics', href: '/demos/traffic-analytics/', note: 'Live demo · 40 cameras', accent: 'watch' }] },
      { heading: 'Enterprise & industry', links: [link('access-genie-retail'), link('blugo')] },
    ],
  },
  { label: 'Blura SAGA', groups: [{ heading: 'Digital intelligence', links: [link('blura-saga')] }] },
  { label: 'EduGenie', href: productUrl('edugenie') },
  {
    label: 'GARUDA',
    mega: true,
    columns: [[0], [1, 3], [2], [4]],
    groups: [
      { heading: "Blue Cloud's Policing Operational Ecosystem", links: [link('garuda', 'One front door, thirteen products'), { label: 'GARUDA interactive demo', href: '/demos/garuda/', note: 'Architecture walkthrough with simulated screens', accent: 'garuda' }] },
      ...divisions.map((d) => ({
        heading: d.name,
        links: garudaProducts(d.key).map((p) => link(p.slug, d.key === 'watch' && p.slug === 'blura-saga' ? 'Social media & web intelligence' : undefined)),
      })),
    ],
  },
  { label: 'Workflows', href: '/#scenarios' },
  { label: 'Technology', href: '/#technology' },
];

export const footerGroups: NavGroup[] = [
  { heading: 'Flagship platforms', links: products.filter((p) => p.flagship).map((p) => link(p.slug)) },
  { heading: 'GARUDA', links: [link('garuda'), ...products.filter((p) => p.family === 'garuda' && p.slug !== 'garuda' && !p.flagship).map((p) => link(p.slug))] },
  { heading: 'Access Genie · Enterprise', links: [link('access-genie-retail'), link('blugo')] },
];
