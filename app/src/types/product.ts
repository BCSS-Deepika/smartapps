export type Family = 'access-genie' | 'blura-saga' | 'edugenie' | 'garuda';
export type Division = 'watch' | 'invest' | 'draft' | 'field';
export type Accent =
  | 'ag' | 'saga' | 'edu' | 'garuda' | 'smartcop' | 'bluvaani' | 'bluflow' | 'blugo'
  | 'watch' | 'invest' | 'draft' | 'field';

export interface ProductSummary {
  slug: string;
  name: string;
  /** Short line used in menus and cards, copied from the live site. */
  line: string;
  family: Family;
  /** GARUDA division, for the 13 policing products. */
  division?: Division;
  flagship?: boolean;
  accent: Accent;
  logo?: string;
  /** Legacy URL on the current site, for redirects. */
  legacy: string;
  demo?: string;
  /** True once the product has its new page (Gate 4). Until then links go to the live page. */
  migrated?: boolean;
}

export type Maturity = 'established' | 'integration' | 'proposed';

export interface ModuleDetail { label: string; text: string }
export interface ModuleItem {
  /** Stable anchor, e.g. "m-frs". Never changes, so old deep links keep working. */
  id: string;
  name: string;
  tag?: string;
  group: string;
  summary: string;
  details?: ModuleDetail[];
}
