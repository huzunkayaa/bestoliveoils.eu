# Content schema

All content lives in **`src/data/site.js`** — a single plain-JS object read by
`build.js` at build time. Nothing here is served to the browser. Adding a record
is the whole workflow for adding a page.

> An earlier draft of this file described a `content/oils/<slug>.json` layout for
> a Next.js build. That was never built. This document describes what the site
> actually reads. Swapping to per-file content later means changing `build.js`
> only — the page templates take plain objects and don't care where they came
> from.

## `site` — global config

```js
site: {
  brand: 'bestoliveoils.eu',
  url: 'https://bestoliveoils.eu',   // canonicals, og:url, JSON-LD @id, sitemap
  locale: 'en',
  tagline, description, founded,
  shopName: 'olijfoliemarkt.nl',
  shopUrl: 'https://olijfoliemarkt.nl',
  showShopBadges: true,              // master switch: false hides every badge + CTA
  nav: [{ label, href, key }],       // key matches the page's active nav item
  footerLinks: [{ label, href }],
}
```

## `oils[]`

Two shapes. The **short form** is everything the library card and a reduced
detail page need. Adding `detail` promotes it to a full review page.

```js
{
  slug: 'pruneti-frantoio',          // required — becomes /oils/<slug>/
  name: 'Pruneti Frantoio',          // required
  producer: 'Pruneti',               // display name
  producerSlug: 'pruneti',           // links to /producers/<slug>/ only if that record exists
  cultivar: 'Frantoio',
  region: 'Tuscany · Italy',         // display string, shown as the card kicker
  score: '4.1',                      // expert score, printed
  stars: 4,                          // whole stars the ★ row draws (0-5)
  reviews: 28,                       // reader review count
  intensity: 'Medium',               // Delicate | Medium | Robust
  inShop: false,                     // drives the badge and the Where to buy button
  image: null,                       // null → labelled placeholder at the right size
  seo: { title, description },       // required — title ≤62 chars, description 120-160
}
```

Optional on the short form: `readerScore` + `readerStars` (reader rating box),
`price` (display string), `priceAmount` + `priceCurrency` (emits `Offer` schema —
only set these when the price is real).

### `oils[].detail` — the full review page

```js
detail: {
  location: 'Antequera, Andalusia, Spain',
  tags: ['Robust', 'Organic', 'Harvest 2025'],
  panelNote: 'Panel of 5 · tasted March 2026',
  description: '…',                        // the standfirst under the ratings
  profile: [{ label: 'Fruity', desc: 'green tomato, grass', pct: '82%' }],
  tastingNote: '…',
  facts: [['Cultivar', '100% Picual'], ['Polyphenols', '612 mg/kg']],
  awards: ['Gold · NYIOOC 2026'],
  origin: { mapPlaceholder, note, linkLabel, linkHref, image },
  pairings: ['Grilled red meat', 'Gazpacho'],
  expertReview: { initial, name, meta, badge, stars, text },
  reviews: [{ initial, name, meta, stars, helpful, text }],
}
```

An oil **without** `detail` still gets a real page: name, producer, region,
expert score, image and the buy button, with the tasting notes, facts, pairings
and reviews sections left out rather than rendered empty.

## `producers[]`

```js
{
  slug, name, country, countryCode, locality, regionName, founded,
  geo: { lat, lon },                 // emits GeoCoordinates
  website,                           // omit → no Website button
  tags: ['Andalusia, Spain', 'Est. 1904'],   // first one renders as accent
  lede, image, imagePlaceholder,
  stats: [{ value: '3', label: 'oils in library' }],
  oils: [{ name, slug, cultivar, intensity, stars, score, readers, inShop }],
  estate: ['paragraph one', 'paragraph two'],
  map: { placeholder, caption, image },
  seo: { title, description },
}
```

## `guides[]` — the article pages

```js
{
  slug, kicker, title, lede,
  breadcrumb: ['Learn', 'Tasting'],
  author: { initial, name, updated },
  datePublished: '2026-03-02',       // ISO — feeds Article schema
  dateModified: '2026-05-12',
  image, seo: { title, description },
  toc: [{ id, label }],              // id must match a section id
  promo: { kicker, oilSlug, note },  // sidebar card, links to that oil
  sections: [{
    id: 'warm-the-glass',
    heading: '1. Warm the glass',
    blocks: [
      { type: 'p', text: '…' },
      { type: 'callout', kicker: 'Panel note', text: '…' },
    ],
  }],
}
```

## `articles[]` — homepage and hub teasers

Separate from `guides` so a guide can be teased before it is written:

```js
{ slug, kicker, title, meta: '6 min read', href, image }
```

**`href: null` means the guide isn't written yet** — the card renders without a
link instead of pointing at a 404. Give it a URL once the matching `guides`
record exists.

## `regions[]`, `filters`, `pages`, `home`

- `regions[]` — `{ slug, name, count, image }`, the homepage circles.
- `filters` — the library sidebar's rendered state (which boxes are ticked, the
  cultivar tags, the results summary line). Presentational: the filters are drawn
  from this, they do not actually filter.
- `pages` — `{ title, description }` for the homepage and the three hubs, plus
  `intro`/`body` prose for `/producers/` and `/learn/`.
- `home` — the homepage's own copy: `eyebrow`, `heading`, `lede`, `popular[]`,
  `hero`, `shopBand`.

## Images

```js
image: {
  src: 'assets/img/andalusia.webp',  // relative to src/, served from /assets/…
  alt: 'Olive groves above Antequera',
  w: 1200, h: 1200,                  // required — reserves the box, prevents layout shift
  fit: 'contain',                    // optional; for cut-out product shots on white
}
```

`image: null` renders a labelled placeholder at the same size and shape. Files go
in `src/assets/img/`.

## Rules the build enforces

`npm run check` fails on any of these, so they are not conventions to remember —
they are checked:

- `seo.title` ≤ 62 characters, unique across the site.
- `seo.description` 120–160 characters, unique across the site.
- Every internal link resolves to a page that was actually built.
- Every image has `w`/`h` and non-empty `alt`.
- The sitemap lists exactly the indexable pages that exist.
