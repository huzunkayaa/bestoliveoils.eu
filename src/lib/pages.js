/* ══════════════════════════════════════════════════════════════════════════
   Page templates — one function per screen, each returning a full document.

   The five original screens map to the artboards in the v1 handoff:
     home → 00, library → 01, oil → 02, producer → 03, guide → 04.
   `cultivar` is the one page type v2 adds (its screen 03), and the hubs
   (producers, cultivars, learn) exist because the routes need a parent.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const R = require('./render');
const S = require('./seo');
const { facetLists } = require('./facets');
const { cultivarList, comparison, pagedSlugs } = require('./cultivars');
const LAB = require('./lab');
const LEARN = require('./learn');
const AWARDS = require('./awards');
const { facetsFor } = require('./facets');
const { esc, url, media, starRow, srOnly, ratingLabel, shopBadge, ICON } = R;

const shell = ({ site, headHtml, nav, bodyClass, main }) =>
  `<!DOCTYPE html>
<html lang="${esc(site.locale)}">
<head>
${headHtml}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<div class="page">
${nav}
<main class="page-body ${bodyClass}" id="main">
${main}
${R.footer(site)}
</main>
</div>
<script src="/assets/js/app.js" defer></script>
</body>
</html>
`;

/* ══ 00 · homepage ══════════════════════════════════════════════════════ */

/* Counts every page's copy can interpolate, derived from the records. */
function counts(D) {
  const lists = facetLists(D.oils);
  return {
    oils: D.oils.length,
    producers: D.producers.length,
    regions: lists.regions.length,
    // Varieties the library's oils actually carry — what this count has always
    // meant, and what the library page's copy is describing.
    cultivars: cultivarList(D).filter((c) => c.count > 0).length,
    // Varieties with a reference page, whether or not we hold an oil of one.
    cultivarPages: cultivarList(D).filter((c) => c.hasPage).length,
  };
}

/* The taxonomy behind the nav's "Olive oils" panel. Built from the data, so
   every link lands on a view that has something in it. */
function megaGroups(D) {
  const lists = facetLists(D.oils);
  const cults = cultivarList(D);
  const rated = D.oils.filter((o) => o.score).length;

  return [
    {
      title: 'By cultivar',
      links: cults.slice(0, 5).map((c) => ({
        label: c.name,
        href: c.hasPage ? url.cultivar(c.slug) : `${url.library()}?cultivar=${encodeURIComponent(c.slug)}`,
        count: c.count,
      })).concat([{ label: `All ${cults.length} cultivars →`, href: url.cultivars() }]),
    },
    {
      title: 'By region',
      links: lists.regions.slice(0, 5).map((r) => ({
        label: r.label, href: `${url.library()}?region=${encodeURIComponent(r.key)}`, count: r.count,
      })).concat([{ label: 'All regions →', href: url.library() }]),
    },
    {
      title: 'By intensity',
      links: lists.intensities.map((i) => ({
        label: i.label, href: `${url.library()}?intensity=${encodeURIComponent(i.key)}`, count: i.count,
      })),
    },
    {
      title: 'By what we know',
      links: [
        /* Each row's count has to be what its link actually returns. There is
           no "competition ranked" filter, so there is no row for it — a count
           of 39 above a view showing all 55 is worse than a missing option. */
        { label: 'Scored by our panel', href: `${url.library()}?min=1`, count: rated },
        { label: 'Organic', href: `${url.library()}?flag=organic`, count: lists.organic },
        { label: 'In our shop', href: `${url.library()}?flag=in-shop`, count: lists.inShop },
        { label: 'Producers & mills →', href: url.producers() },
      ],
    },
  ];
}

function home(D) {
  const site = D.site;
  const h = D.home;
  const n = counts(D);
  const fill = (t) => R.fillCounts(t, n);
  const meta = D.pages.home;

  const heroImg = h.hero.src;

  const cults = cultivarList(D).slice(0, 4);

  /* Ranked oils first — the ones the panel actually scored. An oil with no
     score is not silently mixed in behind them as though it placed lower. */
  const featured = bestFirst(D.oils).slice(0, 4);

  const main =
    `<section class="hero">
      <div class="hero__copy">
        <span class="tag tag-accent-2">${esc(fill(h.eyebrow))}</span>
        <h1>${esc(h.heading)}</h1>
        <p class="hero__lede">${esc(h.lede)}</p>
        ${R.searchBar('lg', h.searchPlaceholder)}
        <div class="hero__popular">Trending: ${
          h.popular.map((p) => `<a href="${esc(p.href)}">${esc(p.label)}</a>`).join('')}</div>
      </div>
      ${media(h.hero, 'Hero photo · grove or bottles', 'hero__media', '', { priority: true })}
    </section>

    <section class="section method">
      <div class="section-head"><div class="section-head__text">
        <h2>${esc(h.method.heading)}</h2>
        <span class="section-head__sub">${esc(h.method.sub)}</span>
      </div></div>
      <div class="method__grid">${h.method.steps.map((s) =>
        '<div class="card method__step">' +
          `<span class="method__n" aria-hidden="true">${esc(s.n)}</span>` +
          `<span class="card-title method__title">${esc(s.title)}</span>` +
          `<p class="method__body">${esc(s.body)}</p>` +
        '</div>').join('')}</div>
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <h2>Highest scoring in the library</h2>
          <span class="section-head__sub">Ranked by panel score. Oils we have not tasted are not ranked here.</span>
        </div>
        <a href="${url.library()}">Browse all ${n.oils} oils →</a>
      </div>
      <div class="oil-grid-4">${featured.map((o) => R.oilCard(site, o, true)).join('')}</div>
    </section>

    <section class="phenol">
      <div class="phenol__copy">
        <span class="card-kicker phenol__kicker">${esc(h.phenol.kicker)}</span>
        <h2>${esc(h.phenol.heading)}</h2>
        ${h.phenol.body.map((p) => `<p>${esc(p)}</p>`).join('')}
        <div class="phenol__actions">${h.phenol.actions.map((a) =>
          `<a class="btn ${a.primary ? 'btn-primary' : 'btn-secondary'}" href="${
            esc(a.href)}">${esc(a.label)}</a>`).join('')}</div>
      </div>
      <div class="phenol__bands">${h.phenol.bands.map((b) =>
        '<div class="phenol__band">' +
          `<div class="phenol__band-head"><span>${esc(b.label)}</span><span class="phenol__range">${
            esc(b.range)}</span></div>` +
          `<div class="profile-bar"><div class="profile-bar__fill phenol__fill--${esc(b.tone)}" style="width:${
            esc(b.pct)}"></div></div>` +
          `<span class="phenol__note">${esc(b.note)}</span>` +
        '</div>').join('')}</div>
    </section>

    <div class="home-columns">
      <section class="section">
        <div class="section-head"><div class="section-head__text">
          <h2>Cultivars</h2>
          <span class="section-head__sub">The varieties behind the library, counted from the oils</span>
        </div>
        <a href="${url.cultivars()}">All ${n.cultivars} →</a></div>
        <div class="cultivar-list">${cults.map((c) => {
          const href = c.hasPage
            ? url.cultivar(c.slug)
            : `${url.library()}?cultivar=${encodeURIComponent(c.slug)}`;
          return `<a class="card cultivar-row" href="${href}">` +
            '<div class="cultivar-row__text">' +
              `<span class="card-title cultivar-row__name">${esc(c.name)}</span>` +
              `<span class="cultivar-row__where">${esc(
                c.regions.slice(0, 2).map((r) => r.name).join(' · '))}</span>` +
            '</div>' +
            `<span class="cultivar-row__count">${c.count} <span>${
              c.count === 1 ? 'oil' : 'oils'}</span></span>` +
            (c.hasPage ? ICON.arrow : '') + '</a>';
        }).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-head__text">
          <h2>Harvest &amp; terroir</h2>
          <span class="section-head__sub">Short guides from the tasting panel</span>
        </div></div>
        <div class="article-list">${D.articles.map((a) => {
          const inner =
            media(a.image, 'Photo', 'article-row__media') +
            '<div class="article-row__text">' +
              `<span class="card-kicker">${esc(a.kicker)}</span>` +
              `<span class="card-title article-row__title">${esc(a.title)}</span>` +
              `<span class="article-row__meta">${esc(a.meta)}${
                a.href ? '' : ' · coming soon'}</span>` +
            '</div>' + (a.href ? ICON.arrow : '');
          // No link until the guide exists — better than pointing at a 404.
          return a.href
            ? `<a class="card article-row" href="${esc(a.href)}">${inner}</a>`
            : `<div class="card article-row article-row--pending">${inner}</div>`;
        }).join('')}</div>
      </section>
    </div>

    <section class="shop-band">
      <div class="shop-band__copy">
        <span class="card-kicker shop-band__kicker">${esc(h.shopBand.kicker)}</span>
        <h2>${esc(h.shopBand.heading)}</h2>
        <p>${esc(h.shopBand.body)}</p>
        <a class="btn btn-primary" href="${esc(site.shopUrl)}" target="_blank" rel="noopener">Visit ${
          esc(site.shopName)} ${ICON.external}</a>
      </div>
      ${media(h.shopBand.image, 'Shop / bottles photo', 'shop-band__media washed')}
    </section>`;

  return shell({
    site,
    bodyClass: 'page-body--home',
    nav: R.nav(site, '', megaGroups(D)),
    main,
    headHtml: S.head({
      site,
      title: fill(meta.title),
      ogTitle: h.heading,
      description: fill(meta.description),
      path: url.home(),
      image: heroImg,
      preload: heroImg,
      schema: [S.organization(site), S.website(site)],
    }),
  });
}

/* ══ 01 · library ═══════════════════════════════════════════════════════ */

function library(D) {
  const site = D.site;
  const meta = D.pages.library;
  const lists = facetLists(D.oils);

  /* Every option below is built from the oils that exist and carries its real
     count. Nothing starts selected: the unfiltered library is the canonical
     page, and a pre-filtered default would both hide oils from a first-time
     visitor and disagree with the canonical URL. (The mockup drew the controls
     mid-filter to show what a filtered view looks like.) */
  const checkbox = (name, value, label, count) =>
    `<label class="radio"><input type="checkbox" name="${name}" value="${esc(value)}">` +
    `<span class="dot"></span>${esc(label)}` +
    `<span class="filter-count">${count}</span></label>`;

  const filters =
    `<h2 class="visually-hidden">Filter the library</h2>
     <div class="filter-group"><h3 class="filter-group__title">Country / region</h3>${
       lists.regions.map((r) => checkbox('region', r.key, r.label, r.count)).join('')}</div>
     <div class="filter-group"><h3 class="filter-group__title">Cultivar</h3><div class="filter-tags">${
       lists.cultivars.map((c) =>
         `<button type="button" class="tag tag-neutral filter-tag" data-cultivar="${esc(c.key)}"` +
         ` aria-pressed="false">${esc(c.label)}<span class="filter-count">${c.count}</span></button>`
       ).join('')}</div></div>
     <div class="filter-group"><h3 class="filter-group__title">Intensity</h3><div class="seg">${
       lists.intensities.map((i) =>
         `<label class="seg-opt"><input type="radio" name="intensity" value="${esc(i.key)}">` +
         `${esc(i.label)}</label>`).join('')}</div></div>
     <div class="filter-group"><h3 class="filter-group__title">Minimum rating</h3>
       <div class="filter-rating" role="radiogroup" aria-label="Minimum rating">${
         [1, 2, 3, 4, 5].map((n) =>
           `<button type="button" class="filter-star" data-min-rating="${n}" role="radio"` +
           ` aria-checked="false" aria-label="${n} ${n === 1 ? 'star' : 'stars'} and up">★</button>`
         ).join('')}<span class="filter-rating__label" data-rating-label>Any</span></div></div>
     <div class="filter-group">${
       checkbox('flag', 'in-shop', 'Available in our shop', lists.inShop)}${
       checkbox('flag', 'organic', 'Certified organic', lists.organic)}</div>
     <button type="button" class="btn btn-ghost" data-clear-filters>Clear filters</button>`;

  const main =
    `<div class="library-head">
      <h1>The olive oil library</h1>
      <p>Every oil below has been tasted and scored by our panel. Filter by region,
         cultivar, intensity or rating — or search by name.</p>
    </div>
    ${R.searchBar('md', 'Search oils, producers, cultivars…')}
    <div class="library-layout" data-library>
      <aside class="filters" aria-label="Filter the library">${filters}</aside>
      <div class="results">
        <div class="results__bar">
          <span data-results-summary>${lists.total} oils</span>
          <div class="results__sort"><label for="sort">Sort by</label>
            <select id="sort" class="tag tag-outline results__sort-select" data-sort>
              <option value="score">Expert rating</option>
              <option value="name">Name</option>
              <option value="reviews">Most reviewed</option>
            </select></div>
        </div>
        <div class="results__list" data-oil-grid>${
          D.oils.map((o) => R.oilRow(site, o)).join('')}</div>
        <p class="results__empty" data-results-empty hidden>No oils match these filters.
          <button type="button" class="btn btn-ghost" data-clear-filters>Clear filters</button></p>
      </div>
    </div>`;

  const trail = [{ label: 'Home', href: url.home() }, { label: 'Library' }];

  return shell({
    site,
    bodyClass: 'page-body--library',
    nav: R.nav(site, 'library', megaGroups(D)),
    main,
    headHtml: S.head({
      site,
      title: R.fillCounts(meta.title, counts(D)),
      description: R.fillCounts(meta.description, counts(D)),
      path: url.library(),
      schema: [
        S.collectionPage(site, url.library(), 'The olive oil library', meta.description, D.oils),
        S.breadcrumbList(site, trail),
      ],
    }),
  });
}

/* ══ hub pages ══════════════════════════════════════════════════════════
   Not in the original artboards, but "Producers" and "Learn" in the nav have
   to land somewhere. Without these the nav pointed at one arbitrary record,
   which is a dead end for a reader and a crawler alike. */

function producersIndex(D) {
  const site = D.site;
  const meta = D.pages.producers;
  const trail = [{ label: 'Home', href: url.home() }, { label: 'Producers' }];

  const main = R.breadcrumb(trail) +
    `<div class="library-head"><h1>Producers</h1><p>${esc(meta.intro)}</p>${
      meta.body.map((para) => `<p class="hub-body">${esc(para)}</p>`).join('')}</div>
     <div class="oil-grid-3">${D.producers.map((p) =>
      `<a class="card elev-sm oil-card" href="${url.producer(p.slug)}">` +
      media(p.image, p.imagePlaceholder, 'oil-card__media') +
      '<div class="oil-card__body">' +
        `<span class="card-kicker">${esc(p.tags[0])}</span>` +
        `<span class="card-title oil-card__title">${esc(p.name)}</span>` +
        `<span class="oil-card__sub">${esc(p.stats[0].value)} ${esc(p.stats[0].label)} · ${
          esc(p.stats[1].value)} ${esc(p.stats[1].label)}</span>` +
      '</div></a>').join('')}</div>`;

  return shell({
    site,
    bodyClass: 'page-body--library',
    nav: R.nav(site, 'producers'),
    main,
    headHtml: S.head({
      site,
      title: meta.title,
      description: meta.description,
      path: url.producers(),
      schema: [
        S.itemListPage(site, url.producers(), 'Producers', meta.description,
          D.producers.map((p) => ({ name: p.name, url: url.producer(p.slug) }))),
        S.breadcrumbList(site, trail),
      ],
    }),
  });
}

/* ══ cultivar hub ═══════════════════════════════════════════════════════
   Every variety the oils mention, counted from the oils. A variety with a
   reference page links to it; the rest open the library filtered to that
   variety, which is a real destination rather than a page we have not written. */

function cultivarsIndex(D) {
  const site = D.site;
  const meta = D.pages.cultivars;
  const trail = [{ label: 'Home', href: url.home() }, { label: 'Cultivars' }];
  const list = cultivarList(D);

  const row = (c) => {
    /* Where it grows: the regions the library's own oils come from, or — for a
       variety we have written up but not yet bought — where the record says it
       is grown. The two are different claims, and the second is the record's. */
    const where = c.regions.length
      ? (c.regions.length <= 3
          ? c.regions.map((r) => r.name).join(' · ')
          : `${c.regions.slice(0, 3).map((r) => r.name).join(' · ')} + ${c.regions.length - 3} more`)
      : (c.record ? `${c.record.originRegion || ''}${
          c.record.country ? ` · ${c.record.country}` : ''}`.replace(/^ · /, '') : '');
    const note = c.record && c.record.compare ? c.record.compare.sensory : '';
    const inner =
      '<div class="cultivar-row__text">' +
        `<span class="card-title cultivar-row__name">${esc(c.name)}</span>` +
        `<span class="cultivar-row__where">${esc(where)}</span>` +
        (note ? `<span class="cultivar-row__note">${esc(note)}</span>` : '') +
      '</div>' +
      // A variety with no oils yet says so in words rather than showing a 0.
      (c.count > 0
        ? `<span class="cultivar-row__count">${c.count} <span>${
            c.count === 1 ? 'oil' : 'oils'}</span></span>`
        : '<span class="cultivar-row__count cultivar-row__count--none"><span>Reference</span></span>') +
      (c.hasPage ? ICON.arrow : '');
    return c.hasPage
      ? `<a class="card cultivar-row" href="${url.cultivar(c.slug)}">${inner}</a>`
      : `<a class="card cultivar-row cultivar-row--filter" href="${
          url.library()}?cultivar=${encodeURIComponent(c.slug)}">${inner}</a>`;
  };

  const n = counts(D);
  const fill = (t) => R.fillCounts(t, n);

  const main = R.breadcrumb(trail) +
    `<div class="library-head"><h1>Cultivars</h1><p>${esc(fill(meta.intro))}</p>${
      meta.body.map((para) => `<p class="hub-body">${esc(fill(para))}</p>`).join('')}</div>
     <div class="cultivar-list">${list.map(row).join('')}</div>`;

  return shell({
    site,
    bodyClass: 'page-body--library',
    nav: R.nav(site, 'cultivars'),
    main,
    headHtml: S.head({
      site,
      title: fill(meta.title),
      description: fill(meta.description),
      path: url.cultivars(),
      schema: [
        S.itemListPage(site, url.cultivars(), 'Cultivars', meta.description,
          list.filter((c) => c.hasPage)
            .map((c) => ({ name: c.name, url: url.cultivar(c.slug) }))),
        S.breadcrumbList(site, trail),
      ],
    }),
  });
}

/* ══ 03 · cultivar reference ════════════════════════════════════════════ */

/* Which oils lead the grid. Scored oils first, best first; then the catalogue
   entries by their competition placing. The two are never mixed into one
   ranking — a rank in someone else's competition is not our score, and
   sorting them together would imply it is. */
const bestFirst = (oils) => {
  const rank = (o) => (o.listing ? Number(o.listing.rank) : Infinity);
  return [...oils].sort((a, b) =>
    Number(Boolean(b.score)) - Number(Boolean(a.score)) ||
    (a.score && b.score ? Number(b.score) - Number(a.score) : 0) ||
    rank(a) - rank(b) ||
    a.name.localeCompare(b.name));
};

function cultivar(D, c) {
  const site = D.site;
  const rec = c.record;
  const path = url.cultivar(c.slug);
  const filtered = `${url.library()}?cultivar=${encodeURIComponent(c.slug)}`;
  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Cultivars', href: url.cultivars() },
    { label: c.name },
  ];

  /* Two stats come from the record — things true of the variety whether or not
     we stock it — and the library count is injected as a third only when there
     is something to count. The design drew an average panel score as well; it
     is not offered, because for most of these varieties we have tasted nothing
     and an average of nothing is a lie. */
  const stats = [
    ...(rec.stats || []),
    ...(c.count > 0
      ? [{ value: c.count, label: `${c.count === 1 ? 'oil' : 'oils'} in the library` }]
      : []),
  ];

  const table = comparison(D, c.slug);

  /* The design's aroma wheel, without its numbers.
     It drew "Green tomato 9.1", which implies a panel scored this variety on a
     scale. IOC-method medians do not exist for most of these forty, so the
     record carries documented descriptors and a note saying where they came
     from. Descriptors are ordered, so they are numbered by rank — which is a
     claim we can stand behind — and never by intensity. */
  const aroma = rec.aroma && rec.aroma.length
    ? '<div class="card cultivar-card cultivar-aroma">' +
        '<span class="card-kicker">Aroma descriptors</span>' +
        '<ol class="cultivar-aroma__list">' +
        rec.aroma.map((a) => `<li>${esc(a)}</li>`).join('') +
        '</ol>' +
        (rec.aromaNote ? `<p class="cultivar-aroma__note">${esc(rec.aromaNote)}</p>` : '') +
      '</div>'
    : '';

  /* Where the record's figures came from. This site's whole claim is that a
     number can be traced, so the trail is on the page, not in a commit. */
  const sources = rec.sources && rec.sources.length
    ? '<div class="card cultivar-card cultivar-sources">' +
        '<span class="card-kicker">Sources</span><ul>' +
        rec.sources.map((src) => '<li>' + (src.url
          ? `<a href="${esc(src.url)}" target="_blank" rel="noopener">${esc(src.label)}</a>`
          : esc(src.label)) + '</li>').join('') +
      '</ul></div>'
    : '';

  const mapCard = rec.map
    ? '<div class="cultivar-map">' +
        media(null, rec.map.placeholder, 'cultivar-map__media media--circle') +
        (rec.map.caption ? `<span class="cultivar-map__caption">${esc(rec.map.caption)}</span>` : '') +
      '</div>'
    : '';

  const main = R.breadcrumb(trail) +
    `<section class="cultivar-hero">
      <div class="cultivar-hero__copy">
        <div class="cultivar-hero__tags">${(rec.tags || []).map((t, i) =>
          `<span class="tag ${i === 0 ? 'tag-accent-2' : 'tag-neutral'}">${esc(t)}</span>`).join('')}</div>
        <h1>${esc(c.name)}</h1>
        <p class="cultivar-hero__lede">${esc(rec.lede)}</p>
        <div class="producer-stats">${stats.map((s) =>
          `<div class="producer-stat"><span class="producer-stat__value">${esc(s.value)}</span>` +
          `<span class="producer-stat__label">${esc(s.label)}</span></div>`).join('')}</div>
        <div class="cultivar-hero__actions">
          ${c.count > 0
            ? `<a class="btn btn-primary" href="${esc(filtered)}">Browse ${c.count} ${
                esc(c.name)} ${c.count === 1 ? 'oil' : 'oils'}</a>`
            : ''}
          <a class="btn ${c.count > 0 ? 'btn-secondary' : 'btn-primary'}" href="#compare">Compare cultivars</a>
        </div>
      </div>
      ${media(rec.image, rec.imagePlaceholder, 'cultivar-hero__media washed', '', { priority: true })}
    </section>

    <div class="cultivar-columns">
      <div class="cultivar-main">
        <section class="section">
          <h2>In the grove</h2>
          ${rec.grove.map((para) => `<p class="cultivar-prose">${esc(para)}</p>`).join('')}
        </section>

        <section class="section" id="compare">
          <h2>Compared with the other reference cultivars</h2>
          <div class="table-scroll"><table class="table">
            <thead><tr>
              <th scope="col">Cultivar</th><th scope="col">Origin</th>
              <th scope="col">Typical polyphenols</th><th scope="col">Sensory profile</th>
              <th scope="col">Best pairing</th>
            </tr></thead>
            <tbody>${table.map((t) => {
              const name = t.current
                ? `<span class="cultivar-current">${esc(t.name)}</span>`
                : esc(t.name);
              return `<tr${t.current ? ' class="is-current"' : ''}>` +
                `<th scope="row">${name}</th>` +
                `<td>${esc(t.origin)}</td><td>${esc(t.phenolRange)}</td>` +
                `<td>${esc(t.sensory)}</td><td>${esc(t.pairing)}</td></tr>`;
            }).join('')}</tbody>
          </table></div>
          <p class="cultivar-caveat">Polyphenol figures are the ranges published for each variety, not
            measurements of any bottle in the library. A single oil's figure depends on when it was
            picked and how it was milled, and is shown on that oil's own page where the producer
            states one.</p>
        </section>

        ${c.count > 0 ? `<section class="section">
          <div class="section-head">
            <div class="section-head__text"><h2>${esc(c.name)} oils in the library</h2>
              <span class="section-head__sub">From ${c.producers.length} ${
                c.producers.length === 1 ? 'producer' : 'producers'} in ${c.regions.length} ${
                c.regions.length === 1 ? 'region' : 'regions'}</span></div>
            <a href="${esc(filtered)}">All ${c.count} →</a>
          </div>
          <div class="oil-grid-3">${
            bestFirst(c.oils).slice(0, 6).map((o) => R.oilCard(site, o, true)).join('')}</div>
        </section>` : ''}
      </div>

      <aside class="cultivar-side">
        <div class="card cultivar-card">
          <span class="card-kicker">Reference card</span>
          <table class="table facts-table"><tbody>${
            (rec.reference || []).map(([label, value]) =>
              `<tr><th scope="row">${esc(label)}</th><td>${esc(value)}</td></tr>`).join('')}${
            c.count > 0
              ? `<tr><th scope="row">In the library</th><td>${c.count} ${
                  c.count === 1 ? 'oil' : 'oils'}</td></tr>`
              : ''}
          </tbody></table>
        </div>
        ${aroma}
        ${c.regions.length ? `<div class="card cultivar-card">
          <span class="card-kicker">Where it grows here</span>
          <ul class="cultivar-regions">${c.regions.map((r) =>
            `<li><a href="${url.library()}?region=${encodeURIComponent(r.slug)}">${
              esc(r.name)}</a><span>${esc(r.country)}</span></li>`).join('')}</ul>
        </div>` : ''}
        ${mapCard}
        ${sources}
      </aside>
    </div>`;

  return shell({
    site,
    bodyClass: 'page-body--cultivar',
    nav: R.nav(site, 'cultivars'),
    main,
    headHtml: S.head({
      site,
      title: rec.seo.title,
      ogTitle: c.name,
      description: rec.seo.description,
      path,
      image: rec.image ? rec.image.src : null,
      schema: [
        S.itemListPage(site, path, `${c.name} olive oils`, rec.seo.description,
          c.oils.map((o) => ({ name: o.name, url: url.oil(o.slug) }))),
        S.breadcrumbList(site, trail),
      ],
    }),
  });
}

function learnIndex(D) {
  const site = D.site;
  const meta = D.pages.learn;
  const trail = [{ label: 'Home', href: url.home() }, { label: 'Learn' }];

  const cats = LEARN.categoriesWithContent(D);
  const featured = LEARN.featuredGuide(D);
  const rows = LEARN.hubRows(D);

  /* v2 leads the hub with a six-card category grid. One card is not a grid —
     it is the same link twice — so the strip waits until the writing has
     spread across at least two shelves. */
  const categoryStrip = cats.length >= 2
    ? `<section class="section learn-cats">
        <div class="section-head"><div class="section-head__text"><h2>Categories</h2>
          <span class="section-head__sub">${cats.length} ${
            cats.length === 1 ? 'category' : 'categories'} · ${
            D.guides.length} ${D.guides.length === 1 ? 'guide' : 'guides'}</span></div></div>
        <div class="learn-cats__grid">${cats.map((c) =>
          `<div class="card learn-cat"><span class="card-kicker">${esc(c.name)}</span>` +
          `<p>${esc(c.body)}</p>` +
          `<span class="learn-cat__count">${c.count} ${
            c.count === 1 ? 'guide' : 'guides'}</span></div>`).join('')}</div>
      </section>`
    : '';

  /* The editor's feature from v2: the newest guide, given the room to sell
     itself. With one guide it is simply that guide — which is honest, and the
     list below it carries what is still being written. */
  const feature = featured
    ? `<section class="learn-feature">
        <div class="learn-feature__copy">
          <span class="tag tag-accent">${esc(LEARN.categoryName(D, featured.category) || 'Guide')}</span>
          <h2><a href="${url.guide(featured.slug)}">${esc(featured.title)}</a></h2>
          <p class="learn-feature__lede">${esc(featured.lede)}</p>
          <div class="article-byline">
            <div class="article-byline__avatar" aria-hidden="true">${esc(featured.author.initial)}</div>
            <span>${esc(featured.author.name)} · <time datetime="${esc(featured.dateModified)}">${
              esc(featured.author.updated)}</time></span>
          </div>
          <a class="btn btn-primary" href="${url.guide(featured.slug)}">Read the guide</a>
        </div>
        ${media(featured.image, 'Feature photo', 'learn-feature__media washed')}
      </section>`
    : '';

  const list = rows.length
    ? `<section class="section">
        <div class="section-head"><div class="section-head__text"><h2>More guides</h2>
          <span class="section-head__sub">What the panel is writing next</span></div></div>
        <div class="article-list article-list--wide">${rows.map((a) => {
          const inner =
            media(a.image, 'Photo', 'article-row__media') +
            '<div class="article-row__text">' +
              `<span class="card-kicker">${esc(a.kicker)}</span>` +
              `<span class="card-title article-row__title">${esc(a.title)}</span>` +
              `<span class="article-row__meta">${esc(a.meta)}${a.href ? '' : ' · coming soon'}</span>` +
            '</div>' + (a.href ? ICON.arrow : '');
          return a.href
            ? `<a class="card article-row" href="${esc(a.href)}">${inner}</a>`
            : `<div class="card article-row article-row--pending">${inner}</div>`;
        }).join('')}</div>
      </section>`
    : '';

  const main = R.breadcrumb(trail) +
    `<div class="library-head"><h1>Learn</h1><p>${esc(meta.intro)}</p>${
      meta.body.map((para) => `<p class="hub-body">${esc(para)}</p>`).join('')}</div>` +
    categoryStrip + feature + list;

  return shell({
    site,
    bodyClass: 'page-body--library',
    nav: R.nav(site, 'learn'),
    main,
    headHtml: S.head({
      site,
      title: meta.title,
      description: meta.description,
      path: url.learn(),
      schema: [
        S.itemListPage(site, url.learn(), 'Learn', meta.description,
          D.articles.filter((a) => a.href).map((a) => ({ name: a.title, url: a.href }))),
        S.breadcrumbList(site, trail),
      ],
    }),
  });
}

/* ══ 02 · oil detail ════════════════════════════════════════════════════ */

function oil(D, o) {
  const site = D.site;
  const d = o.detail || {};
  const path = url.oil(o.slug);

  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Library', href: url.library() },
    { label: o.name },
  ];

  // Only link the producer when we have actually built a page for them —
  // a byline pointing at a 404 is worse than plain text.
  const hasProducerPage = D.producers.some((p) => p.slug === o.producerSlug);

  /* The cultivar earns a link once its reference page is built. An oil can
     name more than one variety, so each part is decided on its own and the
     ones with nothing written yet stay plain text. */
  const paged = pagedSlugs(D);
  const f = facetsFor(o);
  const cultivarLine = f.cultivarNames.map((name, i) =>
    paged.has(f.cultivars[i])
      ? `<a href="${url.cultivar(f.cultivars[i])}">${esc(name)}</a>`
      : esc(name)).join(' · ');

  const tags = (d.tags || [o.intensity])
    .map((t) => `<span class="tag tag-neutral">${esc(t)}</span>`).join('');

  // An oil with no panel score is a catalogue entry, not a review. It shows
  // the credential it actually has — a competition placing, attributed and
  // linked — and says in plain words that we have not tasted it. Inventing a
  // score to fill the box is the one thing this site must never do.
  const listing = o.listing;
  const expertBox = o.score
    ? '<div class="card rating-box rating-box--expert"><span class="card-kicker">Expert rating</span>' +
      `<div class="rating-box__row"><span class="rating-box__value">${esc(o.score)}</span>${
        starRow(o.stars, 'stars--lg')}${srOnly(ratingLabel(o.score))}</div>` +
      `<span class="rating-box__note">${esc(d.panelNote || 'Scored by our tasting panel')}</span></div>`
    : '<div class="card rating-box rating-box--credential">' +
      `<span class="card-kicker">${esc(listing ? 'Competition ranking' : 'Expert rating')}</span>` +
      '<div class="rating-box__row">' +
      (listing
        ? `<span class="rating-box__value">#${esc(listing.rank)}</span>` +
          `<span class="rating-box__unit">${esc(listing.points)} pts</span>`
        : '<span class="rating-box__value">—</span>') +
      '</div><span class="rating-box__note">' +
      (listing
        ? `${listing.url ? `<a href="${esc(listing.url)}" target="_blank" rel="noopener">${
            esc(listing.source)}</a>` : esc(listing.source)} · our panel has not tasted this oil yet`
        : 'Our panel has not tasted this oil yet') +
      '</span></div>';

  const readerBox = o.readerScore
    ? '<div class="rating-box rating-box--reader"><span class="card-kicker">Reader rating</span>' +
      `<div class="rating-box__row"><span class="rating-box__value">${esc(o.readerScore)}</span>` +
      starRow(o.readerStars, 'stars--lg') + srOnly(ratingLabel(o.readerScore, o.reviews)) +
      `</div><span class="rating-box__note">${esc(o.reviews)} reviews · ` +
      '<a href="#write-a-review">write yours</a></span></div>'
    : '<div class="rating-box rating-box--reader"><span class="card-kicker">Reader rating</span>' +
      '<div class="rating-box__row"><span class="rating-box__value">—</span></div>' +
      `<span class="rating-box__note">${o.reviews ? `${esc(o.reviews)} reviews · ` : 'No reader reviews yet · '}` +
      '<a href="#write-a-review">write yours</a></span></div>';

  /* v2's conversion module. It draws "In stock · 34 bottles", a size switcher
     and a live price; we have none of that — no stock feed, one price string,
     no pack sizes — so the card carries what is true: that our partner lists
     it, what it costs there, and that they are the seller, not us. A bottle
     count nobody is counting would be the easiest lie on the page. */
  const stockedHere = site.showShopBadges && o.inShop;
  const buyBox = stockedHere
    ? `<aside class="buybox card elev-md">
        <span class="buybox__stock"><span class="dot" aria-hidden="true"></span>In our shop</span>
        ${o.price ? `<span class="buybox__price">${esc(o.price)}</span>` : ''}
        <a class="btn btn-primary btn-block" href="${esc(o.shopUrl || site.shopUrl)}" target="_blank" rel="noopener">Where to buy ${
          ICON.external}<span class="visually-hidden"> ${esc(o.name)} at ${esc(site.shopName)}</span></a>
        <ul class="buybox__assurances">
          <li>${ICON.check}Sold by ${esc(site.shopName)}, our retail partner — not by us</li>
          <li>${ICON.check}The score above is independent of what they stock</li>
          ${d.facts && d.facts.some(([k]) => /harvest/i.test(k))
            ? `<li>${ICON.check}Harvest published on this page, from the bottle we tested</li>`
            : ''}
        </ul>
      </aside>`
    : '';

  const hero =
    `<section class="detail-hero${buyBox ? ' detail-hero--buy' : ''}">
      ${media(o.image, 'Bottle photo', 'detail-hero__frame', '', { priority: true })}
      <div class="detail-hero__info">
        <div class="detail-hero__tags">${shopBadge(site, o, 'tag-shop')}${tags}</div>
        <div class="detail-hero__title"><h1>${esc(o.name)}</h1>
          <p class="detail-hero__byline">by ${
            hasProducerPage ? `<a href="${url.producer(o.producerSlug)}">${esc(o.producer)}</a>`
                            : esc(o.producer)} · ${esc(d.location || o.region)}</p>
          <p class="detail-hero__cultivar">${cultivarLine}</p></div>
        <div class="ratings">
          ${expertBox}
          ${readerBox}
        </div>
        <p class="detail-hero__desc">${esc(d.description || (o.score
          ? 'The panel has scored this oil; the full write-up — tasting notes, the facts and pairings — is being prepared.'
          : 'A catalogue entry: what the producer and the competition record say about this oil. Our panel has not tasted it, so there is no score here.'))}</p>
        <div class="detail-actions">
          <button class="btn btn-secondary" type="button">${ICON.heart}Save</button>
          ${!buyBox && o.price ? `<span class="detail-actions__price">${esc(o.price)}</span>` : ''}
        </div>
      </div>
      ${buyBox}
    </section>`;

  // Every block below is optional and rendered only from what we actually have.
  // A catalogue entry typically has facts and an origin note but no tasting
  // profile, no pairings and no panel review — and those sections simply do not
  // appear, rather than appearing empty or invented.
  /* v2 replaces v1's three bars with a radar. The bars carried a short
     descriptor per axis ("green tomato, grass") that the triangle has no room
     for, so those ride underneath it rather than being lost. An oil whose
     profile is missing an axis keeps the bars — half a triangle is not a
     reading. */
  const radar = d.profile ? LAB.radarAxes(d.profile) : null;
  const profileBars = (rows) => rows.map((p) =>
    '<div class="profile-bar"><div class="profile-bar__row">' +
    `<span class="profile-bar__label">${esc(p.label)}</span>` +
    `<span class="profile-bar__desc">${esc(p.desc)}</span></div>` +
    `<div class="profile-bar__track" role="img" aria-label="${esc(p.label)}: ${esc(p.pct)}">` +
    `<div class="profile-bar__fill" style="width:${esc(p.pct)}"></div></div></div>`).join('');

  const tastingCol = d.profile
    ? `<div class="detail-col">
          <h2>Tasting notes</h2>
          ${radar
            ? R.sensoryRadar(radar) +
              '<dl class="radar__axes">' + radar.map((a) =>
                `<div><dt>${esc(a.label)}</dt><dd>${esc(a.desc)}</dd></div>`).join('') + '</dl>'
            : profileBars(d.profile)}
          <p class="profile-note">${esc(d.tastingNote)}</p>
        </div>`
    : '';

  const factsCol = d.facts
    ? `<div class="detail-col">
          <h2>The facts</h2>
          <table class="table facts-table"><tbody>${d.facts.map(([k, v]) =>
            `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
          ${d.awards ? `<div class="awards"><h3>Awards</h3><div class="awards__list">${
            d.awards.map((a) => `<span class="tag tag-accent">${esc(a)}</span>`).join('')}</div></div>` : ''}
        </div>`
    : '';

  const originCol = d.origin
    ? `<div class="detail-col detail-col--map">
          <h2>Where it's from</h2>
          ${media(d.origin.image, d.origin.mapPlaceholder, 'detail-map media--circle')}
          <p class="detail-map__note">${esc(d.origin.note)}</p>
          ${d.origin.linkHref ? `<a href="${esc(d.origin.linkHref)}" class="detail-map__link">${
            esc(d.origin.linkLabel)}</a>` : ''}
        </div>`
    : '';

  const factsSection = (tastingCol || factsCol || originCol)
    ? `<section class="detail-facts">${tastingCol}${factsCol}${originCol}</section>`
    : '';

  const pairingsSection = d.pairings
    ? `<section class="pairings">
        <h2>Pairs well with</h2>
        <div class="pairings__list">${
          d.pairings.map((p) => `<span class="tag tag-accent-2">${esc(p)}</span>`).join('')}</div>
      </section>`
    : '';

  const readerReviews = d.reviews || [];
  const reviewsSection = d.expertReview
    ? `<section class="reviews">
          <div class="reviews__head"><h2>Reviews</h2>
            <span class="reviews__count">1 expert${o.reviews ? ` · ${esc(o.reviews)} readers` : ''}</span></div>
          <article class="card review-expert">
            <div class="review__head">
              <div class="review__avatar review__avatar--expert" aria-hidden="true">${
                esc(d.expertReview.initial)}</div>
              <div class="review__who"><span class="review__name">${esc(d.expertReview.name)}</span>
                <span class="review__meta">${esc(d.expertReview.meta)}</span></div>
              <span class="tag tag-accent review__pick">${esc(d.expertReview.badge)}</span>
              ${starRow(d.expertReview.stars, 'stars--md')}${
                srOnly(ratingLabel(o.score))}
            </div>
            <p class="review__text">${esc(d.expertReview.text)}</p>
          </article>
          ${readerReviews.map((r) =>
            '<article class="review-item"><div class="review__head">' +
            `<div class="review__avatar" aria-hidden="true">${esc(r.initial)}</div>` +
            `<div class="review__who"><span class="review__name">${esc(r.name)}</span>` +
            `<span class="review__meta">${esc(r.meta)}</span></div>` +
            starRow(r.stars, 'stars--sm review__stars') + srOnly(ratingLabel(r.stars)) +
            `</div><p class="review__text">${esc(r.text)}</p>` +
            `<div class="review__actions"><a href="#">Helpful · ${esc(r.helpful)}</a>` +
            '<a href="#">Report</a></div></article>').join('')}
          ${o.reviews > readerReviews.length ? `<button class="btn btn-secondary" type="button">Read all ${
            esc(o.reviews)} reviews</button>` : ''}
        </section>`
    : '';

  const lab = LAB.labFor(o);
  const labSection = lab ? R.labPanel(lab) : '';

  /* v2 puts a row of comparable bottles where an out-of-stock oil's buy module
     would be. Our version of "out of stock" is an oil the partner never
     carried, which is most of the library — so the row appears on every oil we
     cannot sell, and picks the nearest neighbours we can: same cultivar first,
     then the rest of the shop, closest panel score wins. A reader who came for
     a bottle they cannot have leaves with one they can. */
  const alternatives = site.showShopBadges && !o.inShop
    ? D.oils
        .filter((x) => x.inShop && x.slug !== o.slug)
        .map((x) => {
          const sameCultivar = facetsFor(x).cultivars
            .some((c) => facetsFor(o).cultivars.includes(c));
          const gap = Math.abs(Number(x.score || 0) - Number(o.score || 0));
          return { oil: x, rank: (sameCultivar ? 0 : 1) * 10 + gap };
        })
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 3)
        .map((entry) => entry.oil)
    : [];

  const alternativesSection = alternatives.length
    ? `<section class="alternatives">
        <div class="alternatives__head">
          <h2>In our shop instead</h2>
          <p>We do not stock ${esc(o.name)}. These are the closest bottles our retail partner carries.</p>
        </div>
        <div class="alternatives__list">${
          alternatives.map((x) => R.oilCard(site, x, true)).join('')}</div>
      </section>`
    : '';

  const body = hero + factsSection + labSection + pairingsSection + alternativesSection +
    (reviewsSection
      ? `<div class="reviews-layout">${reviewsSection}${reviewForm()}</div>`
      : `<div class="reviews-layout reviews-layout--form-only">${reviewForm()}</div>`);

  const schema = [S.product(site, o, path), S.breadcrumbList(site, trail)];

  return shell({
    site,
    bodyClass: 'page-body--detail',
    nav: R.nav(site, 'library'),
    main: R.breadcrumb(trail) + body,
    headHtml: S.head({
      site,
      title: o.seo.title,
      ogTitle: o.name,
      description: o.seo.description,
      path,
      type: 'product',
      image: o.image ? o.image.src : undefined,
      preload: o.image ? o.image.src : undefined,
      schema,
    }),
  });
}

const reviewForm = () =>
  `<form class="card elev-md review-form" id="write-a-review">
    <div class="review-form__head"><h2>Write a review</h2>
      <span>Tasted this oil? Tell other readers.</span></div>
    <div class="review-form__rating">
      <span id="rating-label">Your rating</span>
      <div class="star-picker" data-star-picker role="radiogroup" aria-labelledby="rating-label">
        <span class="star-picker__label"></span>
      </div>
      <input type="hidden" name="rating" data-star-value>
    </div>
    <div class="field"><label for="review-title">Title</label>
      <input class="input" id="review-title" name="title" placeholder="Sum it up in a line"></div>
    <div class="field"><label for="review-body">Your review</label>
      <textarea class="input" id="review-body" name="body" placeholder="How did it taste? What did you eat it with?"></textarea></div>
    <div class="field"><label>How did you use it?</label>
      <div class="review-form__use">
        <span class="tag tag-accent">Finishing</span>
        <span class="tag tag-neutral">Cooking</span>
        <span class="tag tag-neutral">Dipping</span>
        <span class="tag tag-neutral">Salads</span>
      </div></div>
    <button class="btn btn-primary btn-block" type="submit">Post review</button>
    <span class="review-form__fine">You'll be asked to sign in. Reviews are moderated within a day.</span>
  </form>`;

/* ══ 03 · producer ══════════════════════════════════════════════════════ */

function producer(D, p) {
  const site = D.site;
  const path = url.producer(p.slug);

  /* v2's award timeline. No producer record carries one, so it is read back
     out of their oils' `detail.awards` — the same strings those oil pages
     already show. Awards whose string has no year stay on the oil page and out
     of the timeline, and the caption says how many that is rather than quietly
     showing fewer than the table below. */
  const record = AWARDS.awardTimeline(D, p);
  const awardsSection = record.timeline.length
    ? `<section class="producer-awards">
        <div class="section-head"><div class="section-head__text"><h2>Award record</h2>
          <span class="section-head__sub">${record.total} dated ${
            record.total === 1 ? 'award' : 'awards'} across ${record.timeline.length} ${
            record.timeline.length === 1 ? 'year' : 'years'}, from the oils in the library${
            record.undated ? ` · ${record.undated} more carry no year` : ''}</span></div></div>
        <ol class="timeline">${record.timeline.map((y) =>
          '<li class="timeline__year">' +
            `<span class="timeline__label">${esc(y.year)}</span>` +
            '<span class="timeline__dot" aria-hidden="true"></span>' +
            '<ul class="timeline__awards">' + y.awards.map((a) =>
              `<li><span class="timeline__award">${esc(a.label)}</span>` +
              `<a class="timeline__oil" href="${url.oil(a.slug)}">${esc(a.oil)}</a></li>`).join('') +
            '</ul>' +
          '</li>').join('')}</ol>
      </section>`
    : '';
  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Producers', href: url.producers() },
    { label: p.name },
  ];

  const main = R.breadcrumb(trail) +
    `<section class="producer-hero">
      <div class="producer-hero__copy">
        <div class="producer-hero__tags">${p.tags.map((t, i) =>
          `<span class="tag ${i === 0 ? 'tag-accent-2' : 'tag-neutral'}">${esc(t)}</span>`).join('')}</div>
        <h1>${esc(p.name)}</h1>
        <p class="producer-hero__lede">${esc(p.lede)}</p>
        <div class="producer-stats">${p.stats.map((s) =>
          `<div class="producer-stat"><span class="producer-stat__value">${esc(s.value)}</span>` +
          `<span class="producer-stat__label">${esc(s.label)}</span></div>`).join('')}</div>
        <div class="producer-hero__actions">${
          site.showShopBadges
            ? `<a class="btn btn-primary" href="${esc(site.shopUrl)}" target="_blank" rel="noopener">Shop this producer at ${
                esc(site.shopName)}</a>`
            : ''}${
          p.website
            ? `<a class="btn btn-secondary" href="${esc(p.website)}" target="_blank" rel="noopener">Website</a>`
            : ''}</div>
      </div>
      ${media(p.image, p.imagePlaceholder, 'producer-hero__media washed', '', { priority: true })}
    </section>

    <section class="producer-oils">
      <h2>Their oils</h2>
      <div class="producer-oils__table"><table class="table">
        <thead><tr>
          <th scope="col">Oil</th><th scope="col">Cultivar</th><th scope="col">Intensity</th>
          <th scope="col">Expert</th><th scope="col">Readers</th>
          <th scope="col">Availability</th><th scope="col"><span class="visually-hidden">Actions</span></th>
        </tr></thead>
        <tbody>${p.oils.map((o) => {
          const stocked = site.showShopBadges && o.inShop;
          const href = o.slug && o.slug !== '#' ? url.oil(o.slug) : null;
          return '<tr>' +
            `<td>${href ? `<a href="${href}">${esc(o.name)}</a>` : esc(o.name)}</td>` +
            `<td>${esc(o.cultivar)}</td>` +
            `<td><span class="tag tag-neutral">${esc(o.intensity)}</span></td>` +
            `<td>${o.score ? `${starRow(o.stars)} ${esc(o.score)}${srOnly(ratingLabel(o.score))}` : '<span class="producer-oils__nostock">Not yet rated</span>'}</td>` +
            `<td>${esc(o.readers)}</td>` +
            `<td>${stocked
              ? '<span class="tag tag-accent-2 tag-shop">In our shop</span>'
              : '<span class="producer-oils__nostock">Not stocked</span>'}</td>` +
            `<td>${stocked
              ? `<a class="btn btn-primary" href="${esc(o.shopUrl || site.shopUrl)}" target="_blank" rel="noopener">Where to buy<span class="visually-hidden"> ${esc(o.name)} at ${esc(site.shopName)}</span></a>`
              : (href ? `<a class="btn btn-ghost" href="${href}">Read review</a>` : '')}</td>` +
          '</tr>';
        }).join('')}</tbody>
      </table></div>
    </section>

    ${awardsSection}

    <section class="producer-estate">
      <div class="producer-estate__text"><h2>The estate</h2>${
        p.estate.map((para) => `<p>${esc(para)}</p>`).join('')}</div>
      <div class="producer-estate__map">${
        media(p.map.image, p.map.placeholder, 'detail-map media--circle')}
        <span class="producer-estate__coords">${esc(p.map.caption)}</span></div>
    </section>`;

  return shell({
    site,
    bodyClass: 'page-body--producer',
    nav: R.nav(site, 'producers'),
    main,
    headHtml: S.head({
      site,
      title: p.seo.title,
      ogTitle: p.name,
      description: p.seo.description,
      path,
      type: 'profile',
      schema: [S.producerOrg(site, p, path), S.breadcrumbList(site, trail)],
    }),
  });
}

/* ══ 04 · guide ═════════════════════════════════════════════════════════ */

/* One body block. v2's article adds a pull quote, a data table with inline
   share bars, an embedded oil card and a sourcing note to the paragraphs and
   callouts v1 had. Each is a typed block rather than raw HTML in a string, so
   a guide cannot smuggle markup into the page. */
function guideBlock(D, site, b) {
  switch (b.type) {
    case 'pull':
      return `<blockquote class="article-pull"><p>${esc(b.text)}</p></blockquote>`;

    case 'callout':
      return '<aside class="card article-callout">' +
        `<span class="card-kicker">${esc(b.kicker)}</span><p>${esc(b.text)}</p></aside>`;

    case 'sources':
      return '<aside class="article-sources">' +
        `<span class="card-kicker">${esc(b.kicker || 'How we sourced this')}</span>` +
        (b.text ? `<p>${esc(b.text)}</p>` : '') +
        (b.items && b.items.length
          ? '<ul>' + b.items.map((i) => '<li>' + (i.url
              ? `<a href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.label)}</a>`
              : esc(i.label)) + '</li>').join('') + '</ul>'
          : '') +
        '</aside>';

    case 'table': {
      /* A share column is drawn as a bar against the biggest value in it, so
         the scale comes from the data rather than from a number typed here. */
      const max = b.barColumn == null ? 0 : Math.max(...b.rows
        .map((r) => Number(String(r[b.barColumn]).replace(/[^0-9.]/g, '')))
        .filter((n) => Number.isFinite(n)));
      const cell = (value, i) => {
        if (i !== b.barColumn) return `<td>${esc(value)}</td>`;
        const n = Number(String(value).replace(/[^0-9.]/g, ''));
        const width = Number.isFinite(n) && max > 0 ? `${((n / max) * 100).toFixed(0)}%` : '0%';
        return '<td><div class="article-share">' +
          `<div class="meter"><span style="width:${width}"></span></div>` +
          `<span>${esc(value)}</span></div></td>`;
      };
      return '<div class="table-scroll"><table class="table article-table">' +
        `<thead><tr>${b.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>` +
        `<tbody>${b.rows.map((r) =>
          `<tr>${r.map((v, i) => (i === 0
            ? `<th scope="row">${esc(v)}</th>`
            : cell(v, i))).join('')}</tr>`).join('')}</tbody></table></div>` +
        (b.caption ? `<p class="article-table__caption">${esc(b.caption)}</p>` : '');
    }

    case 'oil': {
      const o = D.oils.find((x) => x.slug === b.slug);
      if (!o) return '';
      const buyable = site.showShopBadges && o.inShop;
      return '<aside class="article-oil">' +
        media(o.image, 'Bottle photo', 'article-oil__media') +
        '<div class="article-oil__text">' +
          `<span class="card-kicker">${esc(b.kicker || 'Mentioned in this guide')}</span>` +
          `<span class="card-title">${esc(o.name)}</span>` +
          `<span class="article-oil__meta">${esc(o.region)} · ${esc(o.cultivar)}${
            o.score ? ` · ${esc(o.score)}/5` : ''}</span>` +
        '</div>' +
        '<div class="article-oil__actions">' +
          (buyable
            ? `<a class="btn btn-primary" href="${esc(o.shopUrl || site.shopUrl)}" target="_blank" rel="noopener">Where to buy</a>`
            : '') +
          `<a class="btn btn-secondary" href="${url.oil(o.slug)}">Full report</a>` +
        '</div></aside>';
    }

    case 'p':
    default:
      return `<p>${esc(b.text)}</p>`;
  }
}

function guide(D, g) {
  const site = D.site;
  const path = url.guide(g.slug);
  const promoOil = g.promo ? D.oils.find((o) => o.slug === g.promo.oilSlug) : null;
  const catName = LEARN.categoryName(D, g.category);
  const related = LEARN.relatedGuides(D, g);
  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Learn', href: url.learn() },
    { label: g.title },
  ];

  /* v2 hangs a rail off the right of the body: key figures, then more from the
     same shelf. Both are omitted when the guide has neither, and the layout
     falls back to the two columns v1 drew. */
  const rail = [
    g.keyFigures && g.keyFigures.length
      ? '<div class="card article-rail__card"><span class="card-kicker">Key figures</span>' +
        g.keyFigures.map((f) =>
          '<div class="article-figure">' +
          `<span class="article-figure__value">${esc(f.value)}</span>` +
          `<span class="article-figure__label">${esc(f.label)}</span></div>`).join('') +
        '</div>'
      : '',
    related.length
      ? `<div class="article-rail__card"><span class="card-kicker">More in ${esc(catName)}</span>` +
        '<ul class="article-rail__list">' + related.map((r) =>
          `<li><a href="${url.guide(r.slug)}">${esc(r.title)}</a></li>`).join('') + '</ul></div>'
      : '',
  ].filter(Boolean).join('');

  const main = R.breadcrumb(trail) +
    `<header class="article-head">
      <span class="tag tag-accent">${esc(g.kicker)}</span>
      <h1>${esc(g.title)}</h1>
      <p class="article-head__lede">${esc(g.lede)}</p>
      <div class="article-byline">
        <div class="article-byline__avatar" aria-hidden="true">${esc(g.author.initial)}</div>
        <span>${esc(g.author.name)} · <time datetime="${esc(g.dateModified)}">${
          esc(g.author.updated)}</time></span>
      </div>
    </header>
    ${media(g.image, 'Tasting glasses photo', 'article-hero washed', '', { priority: true })}
    <div class="article-layout${rail ? ' article-layout--rail' : ''}">
      <aside class="article-toc" aria-label="In this article">
        <h2 class="article-toc__title">In this article</h2>
        ${g.toc.map((t, i) =>
          `<a href="#${esc(t.id)}"${i === 0 ? ' aria-current="true"' : ''}>${esc(t.label)}</a>`).join('')}
        ${promoOil ? `<div class="card article-toc__promo">
          <span class="card-kicker">${esc(g.promo.kicker)}</span>
          <span class="card-title">${esc(promoOil.name)}</span>
          <span>${esc(g.promo.note)}</span>
          <a class="btn btn-primary" href="${url.oil(promoOil.slug)}">Read the ${
            esc(promoOil.name)} review</a>
        </div>` : ''}
      </aside>
      <article class="article-body">${g.sections.map((s) =>
        `<h2 id="${esc(s.id)}">${esc(s.heading)}</h2>` +
        s.blocks.map((b) => guideBlock(D, site, b)).join('')).join('')}
      </article>
      ${rail ? `<aside class="article-rail">${rail}</aside>` : ''}
    </div>`;

  return shell({
    site,
    bodyClass: 'page-body--article',
    nav: R.nav(site, 'learn'),
    main,
    headHtml: S.head({
      site,
      title: g.seo.title,
      ogTitle: g.title,
      description: g.seo.description,
      path,
      type: 'article',
      image: g.image ? g.image.src : undefined,
      preload: g.image ? g.image.src : undefined,
      schema: [S.article(site, g, path), S.breadcrumbList(site, trail)],
    }),
  });
}

module.exports = {
  home, library, producersIndex, cultivarsIndex, learnIndex,
  oil, cultivar, producer, guide,
};
