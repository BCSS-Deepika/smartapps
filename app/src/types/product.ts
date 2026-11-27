export type Family = 'access-genie' | 'blura-saga' | 'edugenie' | 'garuda';
export type Division = 'watch' | 'invest' | 'draft' | 'field';
export type Accent =
  | 'ag'
  | 'saga'
  | 'edu'
  | 'garuda'
  | 'smartcop'
  | 'bluvaani'
  | 'bluflow'
  | 'blugo'
  | 'watch'
  | 'invest'
  | 'draft'
  | 'field';

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

export interface ModuleDetail {
  label: string;
  text: string;
}
export interface ModuleItem {
  /** Stable anchor, e.g. "m-frs". Never changes, so old deep links keep working. */
  id: string;
  name: string;
  tag?: string;
  group: string;
  /** May hold inline HTML (b, em, a) copied from the live page. */
  summary: string;
  details?: ModuleDetail[];
  /** The number shown on the live page, e.g. "07". Falls back to the position. */
  n?: string;
  /** Further paragraphs after the summary. */
  more?: string[];
  maturity?: { kind: Maturity; label: string };
  /** A link out, e.g. "Open the GARUDA page →". */
  go?: { label: string; href: string };
}
export interface ModuleGroup {
  name: string;
  sub?: string;
  /** Anchor kept from the live page, e.g. "enterprise". */ id?: string;
}
