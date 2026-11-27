# SmartApps 2.0

Astro + React + TypeScript + Tailwind CSS rebuild of the SmartApps site, built in parallel with the live pages in the repo root. Dark only (Deep Ocean).

```sh
npm ci
npm run dev       # http://localhost:4321
npm run build     # astro check, then static output in dist/
```

- `src/styles/global.css`: design tokens (colour, type, radius, shadow) as Tailwind theme variables
- `src/components/`: UI components, navigation, footer, product card and the module explorer (React island)
- `src/data/products.ts`, `src/data/nav.ts`: product list and navigation; menu lines are copied from the live site
- `/design-system/`: reference page for every token and component (Gate 2)

URLs: products at `/products/<slug>/`, demos at `/demos/<slug>/`. Module anchors (`#m-…`) are unchanged from the live site. See `../docs/migration/` for the full register and route map.
