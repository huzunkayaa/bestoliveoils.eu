# Instructions for Claude Code — bestoliveoils.eu

Read `design/README.md` and `design/_ds/*/styles.css` before touching UI.

## Stack

Static site, generated. **No framework, no dependencies, no build tooling beyond
Node itself.** `build.js` reads `src/` and writes `docs/`; `node build.js` is the
entire toolchain.

```
npm run build     # src/ → docs/
npm run check     # build, then seo-check, learn-test and cultivar-test
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
| Ranking | `/rankings/<slug>/` |
| How we rate · Contact | `/how-we-rate/` · `/contact/` |

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
  A producer's "oils in library" and "available in our shop" stats are
  likewise counted from its `oils[]` rows at build time; the typed value is
  ignored. A producer's `logo: { src, alt, w, h }` is drawn in the ranking table's
  producer column (a 90×28 box on every row, filled when there is one) and
  emitted as `Organization.logo`; it is not shown on the producer's own page.
  Files go in `src/assets/img/producers/`.
- **A ranking page republishes a competition's table, never reorders it.**
  `rankings[]` in site.js holds the rows in the source's own order; a row
  links to the library only through `oilSlug`, and `pages.ranking` throws on
  a slug that does not exist. Catalogue pages' competition credential links
  to the ranking page when one carries that competition's `shortName`.
- **Static pages (How we rate, Contact) are typed blocks** in `pages.howWeRate`
  and `pages.contact`, rendered by the same `guideBlock` as a guide.
- **Every nav and mega-menu row's count must match what its link returns.** The
  taxonomy panel is built from `facets.js`, so an option can only offer a view
  that has something in it. There is no "competition ranked" filter, so there is
  no row for one.
- **A guide's body is typed blocks, never raw HTML.** `p`, `callout`, `pull`,
  `table` (with an optional `barColumn`, scaled against that column's own
  maximum), `oil` (an embedded card that reads live stock like any other) and
  `sources`. Block text is escaped, so a record cannot smuggle markup onto the
  page. `tools/learn-test.js` renders one of each and asserts the output —
  which is how the blocks no published guide uses yet are known to work,
  rather than by writing an article to show them off.
- **A Learn shelf appears when it has something on it.** `learnCategories`
  defines only categories that have a guide or a teased one; the hub's category
  strip waits until two of them carry published writing, and an article's rail
  is dropped when it has neither key figures nor a sibling guide.
- **A band is only ever derived, never decided.** `src/lib/cultivar-index.js`
  computes the polyphenol band from whatever a record publishes: the midpoint of
  a range, a single figure, or a band stated in words. A source that publishes
  numbers while refusing to call them typical ("no stable typical value") has
  not published a band, and neither has prose with no figure in it. The 250
  boundary is the EU 432/2012 claim threshold, which is the only externally
  defined line on that scale. `tools/cultivar-test.js` pins all four shapes.
- **Intensity is not offered.** The Cultivars design filters by Delicate /
  Medium / Robust; no record carries it, classifying forty varieties by
  mouthfeel is a panel's job, and reading it out of the sensory prose would be
  a guess. The field is read if it is ever added and the facet appears then.
- `npm run check` must pass before committing. It builds, runs the SEO checks —
  canonicals, title and description lengths, heading levels, valid JSON-LD,
  internal links, image dimensions, a sitemap matching what was built — and
  then the Learn template tests.

## Not built

Deliberate gaps, listed so nobody assumes they exist:

- **Reader reviews do not submit.** The form is rendered and the star input
  works, but there is no backend. Reader scores in the data are static.
- **No `status: draft|published`.** Every record in `site.js` is published.
- **No admin panel.** `design/Admin Panel.dc.html` (6 screens) is unimplemented.
- **No region pages.** Region links point at `/oils/` with a query.
- **Varieties in the library with no record** — Biancolilla, Cerasuola,
  Cariasina, Crognalegno, San Felice, Dritta, Leccio del Corno, Moresca and the
  "Royal / Hojiblanca" label. They are hub rows that open the filtered library, and need a `lede`
  and a `grove` write-up to earn a page.
- **No photography for any of the 40 cultivars.** Each hero carries a
  *generated* grove landscape (`src/assets/img/cultivars/<slug>.webp`, made
  with Topview from a region-specific prompt) whose `alt` says it is an
  illustration, not a photograph of a specific grove. The "In the grove"
  slots and `map.placeholder` stay labelled placeholders until a real
  photograph exists — never put a generated image where a page implies a
  real place or a real fruit.
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
- **Reader review counts are never shown** — nothing has any, and a "0 reviews"
  next to a score reads as a verdict. The "Most reviewed" sort went with it.
- **Sign in, Helpful and Report do nothing** — all three need a backend.
