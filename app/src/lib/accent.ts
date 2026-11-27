import type { Accent } from '@/types/product';

/** CSS custom properties for a product or division accent: --accent (rules, dots) and --accent-text (words). */
export const accentStyle = (a: Accent) => `--accent: var(--color-${a}); --accent-text: var(--color-${a}-text);`;
