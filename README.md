# SMARTAPPS by Blue Cloud Softech Solutions

The SmartApps portfolio site: the three platforms Access Genie, Blura SAGA and EduGenie, and
GARUDA – Blue Cloud's Policing Operational Ecosystem as its own vertical.

The site is built with Astro, React, TypeScript and Tailwind, and lives in `app/`.

- `app/src/pages/index.astro`: the homepage
- `app/src/pages/products/[slug].astro`: one page per product at `/products/<slug>/`, built from
  `app/src/content/products/<slug>.json`. Every module has its own link, e.g. `/products/smartcop/#m-frs`.
- `app/public/demos/<slug>/`: the interactive demos at `/demos/<slug>/`
- `app/src/styles/global.css`: the Deep Ocean design tokens (dark only)
- `docs/migration/`: the audit and module register from the 2.0 rebuild

## Run it

```sh
cd app
npm ci
npm run dev      # http://localhost:4321
npm run build    # type check, then the static site in app/dist
```

## Hosting

Vercel builds `app/` and serves `app/dist` (see `vercel.json`). Old addresses such as
`/products/smartcop.html#m-frs` and `/demos/garuda.html` redirect permanently to their new
addresses, keeping the `#` part.
