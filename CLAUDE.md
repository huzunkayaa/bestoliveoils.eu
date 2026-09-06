# Instructions for Claude Code — bestoliveoils.eu

Read `design/README.md` and `design/_ds/*/styles.css` before touching UI.

## Stack

Static site, generated. **No framework, no dependencies, no build tooling beyond
Node itself.** `build.js` reads `src/` and writes `docs/`; `node build.js` is the
entire toolchain.

```
npm run build     # src/ → docs/
npm run check     # build, then tools/seo-check.js
npm run serve     # build, then preview at localhost:8000
```

The output folder is `docs/` because GitHub Pages serves `/docs` off the default
branch with no CI. **`docs/` is generated and committed** — rebuild and commit it
whenever `src/` changes, or the published site goes stale.

> This replaces an earlier plan for Next.js + Supabase. That plan was never
> built; the static site was, and it ships today. If reader reviews need to
> actually submit and persist, that is the point to revisit the stack — a static
> site cannot do it. See "Not built" below.

## Routes

Directory URLs with a trailing slash, so any host resolves them without rewrites.

| Screen | URL |
| --- | --- |
| 00 Homepage | `/` |
| 01 Library | `/oils/` |
| 02 Oil detail | `/oils/<slug>/` |
| Producers hub | `/producers/` |
| 03 Producer | `/producers/<slug>/` |
| Guides hub | `/learn/` |
| 04 Article | `/learn/<slug>/` |

`src/lib/render.js` holds the `url` helper — it is the only place a route is
named. Change it there and every link, canonical, breadcrumb and sitemap entry
follows.

## Content

All content is in **`src/data/site.js`** — one file, plain JS object, read at
build time only (nothing ships to the browser). Adding an oil means adding a
record to the `oils` array; `build.js` gives it a URL, a page, a sitemap entry
and its own structured data. See `design/content-schema.md` for every field.

When asked to add an oil, producer or guide: add the record, run `npm run check`,
and commit with `content: add <name>` — including the rebuilt `docs/`.

## Rules

- **Design tokens come from `src/assets/css/tokens.css`** — the design system
  copied verbatim from the handoff. Never invent colours, fonts or radii. Page
  styles go in `site.css`, whose values all come from the mockups' inline styles.
- **Expert rating is shown before reader rating.** Ratings are 0–5 stars.
- **"In our shop" badge and "Where to buy" button appear only when the oil has
  `inShop: true`** and `site.showShopBadges` is on. The button opens
  `site.shopUrl` in a new tab (`target="_blank" rel="noopener"`).
- **Never link to a page that isn't built.** An oil only links to its producer if
  that producer has a record; a guide teased on the homepage is only a link once
  the guide exists (`href: null` until then). `npm run check` fails on a broken
  internal link.
- **Schema must match the page.** No review markup on an oil with no write-up, no
  `Offer` without a real price. We are not the seller — where an offer appears it
  names olijfoliemarkt.nl as the seller.
- **Do not rewrite screens that already exist**; extend them to match the mockups.
- `npm run check` must pass before committing. It enforces canonicals, title and
  description lengths, heading levels, valid JSON-LD, internal links, image
  dimensions, and a sitemap that matches what was built.

## Not built

Deliberate gaps, listed so nobody assumes they exist:

- **Reader reviews do not submit.** The form is rendered and the star input
  works, but there is no backend. Reader scores in the data are static.
- **No `status: draft|published`.** Every record in `site.js` is published.
- **`shopUrl` is site-wide, not per-oil** — every "Where to buy" goes to the
  olijfoliemarkt.nl homepage, not to that oil's product page.
- **No admin panel.** `design/Admin Panel.dc.html` (6 screens) is unimplemented.
- **No region pages.** Region links point at `/oils/` with a query.
