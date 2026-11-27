import { divisions, garudaProducts, productUrl, bySlug, demoUrl } from './products';
import type { Accent } from '@/types/product';

export interface NavLink {
  label: string;
  href: string;
  note?: string;
  accent?: Accent;
}
export interface NavGroup {
  heading: string;
  links: NavLink[];
}
export interface NavItem {
  label: string;
  href?: string;
  groups?: NavGroup[];
  mega?: boolean;
  /** Group indexes per desktop column, so the mega-menu stays balanced. */ columns?: number[][];
}

const link = (slug: string, note?: string): NavLink => {
  const p = bySlug(slug);
  return { label: p.name, href: productUrl(slug), note: note ?? p.line, accent: p.accent };
};

/** Mirrors the live navigation after PR 4: three flagships, then GARUDA as its own tab. */
export const nav: NavItem[] = [
  {
    label: 'Access Genie',
    groups: [
      {
        heading: 'Access Genie platform',
        links: [
          link('access-genie', 'AI video and operational intelligence'),
          {
            label: 'Traffic AI Analytics',
            href: demoUrl('/demos/traffic-analytics/'),
            note: 'Live demo · 40 cameras',
            accent: 'watch',
          },
        ],
      },
      { heading: 'Enterprise & industry', links: [link('access-genie-retail'), link('blugo')] },
    ],
  },
  {
    label: 'Blura SAGA',
    groups: [{ heading: 'Digital intelligence', links: [link('blura-saga')] }],
  },
  { label: 'EduGenie', href: productUrl('edugenie') },
  {
    label: 'GARUDA',
    mega: true,
    columns: [[0], [1, 3], [2], [4]],
    groups: [
      {
        heading: "Blue Cloud's Policing Operational Ecosystem",
        links: [
          link('garuda', 'One front door, thirteen products'),
          {
            label: 'GARUDA interactive demo',
            href: demoUrl('/demos/garuda/'),
            note: 'Architecture walkthrough with simulated screens',
            accent: 'garuda',
          },
        ],
      },
      ...divisions.map((d) => ({
        heading: d.name,
        links: garudaProducts(d.key).map((p) =>
          link(
            p.slug,
            d.key === 'watch' && p.slug === 'blura-saga'
              ? 'Social media & web intelligence'
              : undefined,
          ),
        ),
      })),
    ],
  },
  { label: 'Workflows', href: '/#scenarios' },
  { label: 'Technology', href: '/#technology' },
];

/** The live footer columns, in the live order. */
export const footerGroups: NavGroup[] = [
  {
    heading: "GARUDA – Blue Cloud's Policing Operational Ecosystem",
    links: [
      { label: "GARUDA – Blue Cloud's Policing Operational Ecosystem", href: productUrl('garuda') },
      ...[
        'geo-intelligence',
        'drug-offender-portal',
        'women-safety-portal',
        'bluflow',
        'digital-forensics',
        'trap-case-management',
        'ai-copwriter',
        'fir-automation',
        'memo-generator',
        'smartcop',
        'grievance-management',
        'bluvaani',
      ].map((s) => ({ label: bySlug(s).name, href: productUrl(s) })),
    ],
  },
  {
    heading: 'Access Genie · Enterprise',
    links: [
      { label: 'Platform overview', href: productUrl('access-genie') },
      { label: 'Retail & jewellery', href: productUrl('access-genie-retail') },
      { label: 'BluGo logistics', href: productUrl('blugo') },
      { label: 'Six more industries', href: '/#access-genie-more' },
    ],
  },
  {
    heading: 'Blura SAGA & EduGenie',
    links: [
      { label: 'Blura SAGA', href: productUrl('blura-saga') },
      { label: 'EduGenie', href: productUrl('edugenie') },
    ],
  },
  {
    heading: 'Portfolio',
    links: [
      { label: 'What we solve', href: '/#overview' },
      { label: 'The three platforms', href: '/#directory' },
      { label: 'Connected workflows', href: '/#scenarios' },
      { label: 'Technology', href: '/#technology' },
      { label: 'Proof and company', href: '/#value' },
      { label: 'Request a demonstration', href: '/#contact' },
    ],
  },
];
