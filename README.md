# bestoliveoils.eu

Independent olive oil reviews. A static site built from the Claude Design
handoff in `design/` — five screens, no framework, no dependencies.

```
npm run build     # src/ → docs/
npm run serve     # build, then preview at http://localhost:8000
npm run check     # build, then run the SEO checks
```

Node 18 or newer. There is nothing to install.

## Layout

```
src/                    the source
├── data/site.js        ← all content lives here
├── lib/render.js       shared HTML fragments (cards, nav, ratings)
├── lib/pages.js        one function per page type
├── lib/seo.js          head metadata and structured data
└── assets/             css, images, favicon, and the one client-side script

build.js                the whole toolchain: reads src/, writes docs/
tools/seo-check.js      validates the built output
tools/serve.js          local preview with clean URLs and a real 404

docs/                   the built site — committed, deployable as-is
design/                 the Claude Design mockups (unchanged)
chats/                  the design conversation that produced it
```

**`src/data/site.js` is the only file you edit to change content.** Oils,
producers, guides, regions, reviews and filter options are records in there.
Adding oil #7 means adding an object to the `oils` array — no markup, no new
files. `build.js` gives it a URL, a page, an entry in the sitemap and its own
structured data.

`src/assets/css/tokens.css` is the design system exactly as exported from
Claude Design; retuning a colour, font or radius there restyles every page.
Everything page-specific is in `site.css`, and every value in it comes from the
mockup's inline styles, so at 1280px the pages match the artboards.

## Deploying

`docs/` is a complete static site. Copy it anywhere, or:

**GitHub Pages** — Settings → Pages → Deploy from a branch → `main` / `/docs`.
That path is why the output folder is called `docs`; it needs no CI. Add a
`docs/CNAME` file containing `bestoliveoils.eu` to serve it on the real domain.

**Netlify / Cloudflare Pages / S3** — publish directory `docs`, build command
`node build.js` (or none, since the output is committed).

Rebuild and commit `docs/` whenever you change anything in `src/`.

## URLs

| Page | URL |
| --- | --- |
| Homepage | `/` |
| Library, search & filters | `/oils/` |
| Oil review | `/oils/<slug>/` |
| Producers hub | `/producers/` |
| Producer profile | `/producers/<slug>/` |
| Guides hub | `/learn/` |
| Guide | `/learn/<slug>/` |

Directory URLs with a trailing slash, so every host resolves them to
`index.html` without rewrite rules.

## SEO

The site is pre-rendered: the markup a crawler sees is the markup a reader
sees. Nothing on the page depends on JavaScript — `app.js` only adds the star
rating input and the article sidebar's scroll tracking.

What the build guarantees, and what `npm run check` enforces on every build:

- **One canonical per page**, self-referential and matching where the file
  actually is. Filter permutations (`/oils/?region=…`) canonicalise back to
  `/oils/` and are disallowed in `robots.txt` so they never eat crawl budget.
- **Unique titles (≤ 62 chars) and descriptions (120–160)** on every indexable
  page, written as content in `site.js` rather than derived from a template.
- **One `<h1>` per page, no skipped heading levels.** Where the design wants a
  small heading in a place the outline needs an `<h2>`, CSS handles the size —
  the markup keeps the correct level.
- **Structured data that matches the page.** `Organization` + `WebSite` on the
  homepage, `Product` with `aggregateRating` and the expert `Review` on oil
  pages, `CollectionPage`/`ItemList` on hubs, `Article` on guides,
  `BreadcrumbList` everywhere below the root. An oil with no write-up gets no
  review markup, and an oil with no price gets no `Offer` — we are not the
  seller, so where an offer does appear it names olijfoliemarkt.nl as such.
- **No broken internal links.** A producer is only linked from an oil page if
  that producer page was actually built; a guide teased on the homepage is only
  a link once the guide exists.
- **Core Web Vitals groundwork.** Every `<img>` carries intrinsic
  `width`/`height` so nothing shifts as images arrive; the LCP image on each
  page is preloaded with `fetchpriority="high"` and loads eagerly while
  everything below the fold is lazy; fonts preconnect and use `display=swap`.
- **A sitemap that matches reality** — exactly the indexable pages that were
  built, nothing more — and a `robots.txt` that points at it.

### Before launch

Two things need a real domain and can't be done from here:

1. **Verify the site in Google Search Console** and submit
   `https://bestoliveoils.eu/sitemap.xml`.
2. **Serve one hostname.** Redirect `www` → apex (or the reverse) and HTTP →
   HTTPS at the host, so there is one URL per page in Google's index.

Worth doing next, in rough order of value:

- **Region pages.** `/regions/andalusia/` etc. are linked from the homepage but
  currently land on the library. Real pages would rank for "Andalusian olive
  oil" and give the 24 regions somewhere to point.
- **Write the two teased guides** (storage, harvest dates). They are already in
  `articles` with `href: null`; give them `guides` records and they build.
- **A dedicated Open Graph image** per page type. The current ones are the
  square content photos, which social platforms crop to 1.91:1.
- **Fill in the photography.** See below.

## Photography

Five photos came embedded in the mockup's image slots and are in
`src/assets/img/`:

| File | Used for |
| --- | --- |
| `dipping-bread.webp` | homepage hero |
| `oro-bailen-picual.webp` | Finca La Torre Picual (card + review page) |
| `oro-bailen-arbequina.webp` | Laudemio Frescobaldi card |
| `bottles-lineup.webp` | homepage "Where to buy" band |
| `harvest-grove.webp` | guide hero |

They are stock shots that don't match the mockup's invented oil names, so they
sit where they read best rather than by slot id. Every other slot renders a
labelled placeholder at the right size and shape. To fill one, drop a file in
`src/assets/img/` and set `image` on the record:

```js
image: {
  src: 'assets/img/andalusia.webp',
  alt: 'Olive groves in the hills above Antequera',
  w: 1200, h: 1200,          // required — reserves the box, prevents layout shift
  fit: 'contain',            // only for cut-out product shots on white
}
```

## Departures from the mockup

All deliberate, all visible in `docs/`:

- **Footers on every page** — the artboards only drew one, on the homepage.
- **`/producers/` and `/learn/` hub pages** — the nav needed somewhere to land
  that wasn't one arbitrary record.
- **The star rating input works.** It was drawn as static stars; it is now a
  keyboard-reachable radio group writing to a hidden field.
- **The guide sidebar tracks scrolling** instead of hardcoding section 1.
- **Bottle photos are letterboxed, not cropped** — they are square cut-outs on
  white, and cropping them to a card would cut the bottle in half.
- **Oils without a write-up get a reduced page**, not a blank one: everything
  the library knows, with the sections that need the write-up left out.
- **Responsive behaviour below 1280px**, which the desktop artboards did not
  cover. The desktop rendering is unchanged.
- **Accessibility**: skip links, screen-reader text on every star rating, alt
  text on every image, and a heading outline that doesn't skip levels.
