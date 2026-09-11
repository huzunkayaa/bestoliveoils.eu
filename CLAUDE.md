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
| Cultivars hub | `/cultivars/` |
| Cultivar (v2 03) | `/cultivars/<slug>/` |
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

**Content packs** (a module exporting `{ producers, oils, guides }` in site.js's
shape) are merged with `node tools/merge-pack.js <pack.records.js>`. It splices
records in as source text so site.js keeps its comments, scopes slug lookups to
the top-level arrays, and refuses to write if a block fails to parse or a
comment goes missing. Use `--null-image=slug,slug` for records whose photos
could not be fetched — the page then shows the labelled placeholder instead of
referencing a file that does not exist. Do **not** use the `apply-pack.js` that
ships inside the packs: it re-serialises site.js through JSON and drops every
comment.

## Rules

- **Design tokens come from `src/assets/css/tokens.css`** — the design system
  copied verbatim from the handoff. Never invent colours, fonts or radii. Page
  styles go in `site.css`, whose values all come from the mockups' inline styles.
- **Expert rating is shown before reader rating.** Ratings are 0–5 stars.
- **"In our shop" badge and "Where to buy" button appear only when the oil has
  `inShop: true`** and `site.showShopBadges` is on. The button opens the oil's
  own `shopUrl` — falling back to `site.shopUrl` — in a new tab
  (`target="_blank" rel="noopener"`).
- **The library's filters are derived, never hand-written.** `src/lib/facets.js`
  builds the option lists and their counts from the oils, and emits the same
  values as data- attributes for `app.js` to filter on. Add an oil and its
  region, cultivar and intensity appear as options by themselves.
- **Never link to a page that isn't built.** An oil only links to its producer if
  that producer has a record; a guide teased on the homepage is only a link once
  the guide exists (`href: null` until then). `npm run check` fails on a broken
  internal link.
- **A cultivar gets a page only once someone has written one.** A record in
  site.js's `cultivars` array with `lede` + `grove` earns `/cultivars/<slug>/`,
  whether or not the library holds an oil of it — 40 records, 18 varieties
  currently on the shelf. `src/lib/cultivars.js` unions the two: varieties the
  oils name, and varieties someone wrote up. A variety the oils name with no
  record is still a hub row, linking to the filtered library.
- **Three fields the v2 mockup drew are deliberately not built**, and putting
  them back would be a regression:
  - *No numeric aroma wheel.* The mockup shows "Green tomato 9.1". IOC-method
    panel medians do not exist for most of these varieties, so `aroma` is an
    ordered list of documented descriptors and `aromaNote` says where they came
    from. Number them by rank if you must; never by intensity.
  - *No smoke point.* It is a property of a lot, not a variety — two oils off
    one grove can differ by 20 °C. The reference card carries shelf stability.
  - *Two stats, not three.* "N oils in the library" is injected as a third only
    when N > 0, and the shelf of oils, the regions card and the "Browse N oils"
    button all disappear at zero. No average panel score is offered.
- **Cultivar spelling variants live in `facets.js`.** Six oils say "Picuda";
  the record is `picudo`. `CULTIVAR_SYNONYMS` maps the slug so those oils reach
  the page written about them, while the oil's own label stays exactly as the
  producer writes it.
- **Varietal figures are not measurements.** `phenolRange` is the range published
  for the *variety*; the page says so where it prints it, and no oil ever borrows
  it as its own figure. Per-oil lab data and the sensory radar render only from
  that oil's own record: `src/lib/lab.js` reads them back out of its `facts`
  rows and `detail.profile`, so there is one copy of each number.
- **A meter means a measurement.** `lab.js` gives a bar only to a definite
  figure. A bound or a specification ("≥ 500 mg/kg", "≤ 0.25%") prints as text,
  and the EU 432/2012 callout appears only above a measured number. Most
  polyphenol figures in the library are the producer's own, so every lab card
  names its source — the panel is headed "Laboratory figures", never
  "independent verification", because for most oils it is not ours.
- **Schema must match the page.** No review markup on an oil with no write-up, no
  `Offer` without a real price. We are not the seller — where an offer appears it
  names olijfoliemarkt.nl as the seller.
- **Do not rewrite screens that already exist**; extend them to match the mockups.
- **Counts in copy are interpolated, never typed.** Write `{oils}`,
  `{producers}`, `{regions}` or `{cultivars}` and `R.fillCounts` fills them from
  the records at build time. The homepage and library descriptions claimed 312
  oils for as long as the library held 55.
- **Every nav and mega-menu row's count must match what its link returns.** The
  taxonomy panel is built from `facets.js`, so an option can only offer a view
  that has something in it. There is no "competition ranked" filter, so there is
  no row for one.
- `npm run check` must pass before committing. It enforces canonicals, title and
  description lengths, heading levels, valid JSON-LD, internal links, image
  dimensions, and a sitemap that matches what was built.

## Not built

Deliberate gaps, listed so nobody assumes they exist:

- **Reader reviews do not submit.** The form is rendered and the star input
  works, but there is no backend. Reader scores in the data are static.
- **No `status: draft|published`.** Every record in `site.js` is published.
- **No admin panel.** `design/Admin Panel.dc.html` (6 screens) is unimplemented.
- **No region pages.** Region links point at `/oils/` with a query.
- **Six varieties in the library have no record.** Biancolilla, Cerasuola,
  Cariasina, Crognalegno, San Felice and the "Royal / Hojiblanca" label — one
  oil each. They are hub rows that open the filtered library, and need a `lede`
  and a `grove` write-up to earn a page.
- **No grove or map photography for any of the 40.** Each record carries an
  `imagePlaceholder` and a `map.placeholder`, and the labelled block renders
  until a file exists.
- **No EU language switcher and no B2B/Horeca page.** v2's partner strip carries
  EN/NL/DE/FR/IT and a trade link. There are no translations and no trade page,
  so the strip ships with the partner disclosure only.
- **The v2 producer page is unbuilt**, and the oil page is part-way. Built from
  `design/Olive Oil Library v2.dc.html`: the sensory radar, the laboratory
  panel with its EU 432/2012 callout, and the alternatives row (v2 shows it when
  an oil sells out; ours shows it whenever the partner does not carry the oil,
  which is most of the library). Still to come: the live stock-and-price
  conversion module — there is no live stock feed, and prices are a static
  string — the producer terroir grid and award timeline, and the
  faceted-search restyle. The
  footer is also still v1 — v2 draws a five-column one whose Method and Trade
  columns point at pages that do not exist.
- **No "How we rate" or "Contact" page** — both are linked from every footer and
  currently go nowhere.
- **Sign in, Helpful and Report do nothing** — all three need a backend.
