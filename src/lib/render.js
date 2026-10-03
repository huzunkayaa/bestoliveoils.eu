/* ══════════════════════════════════════════════════════════════════════════
   HTML fragment builders, shared by every page template.

   These run at build time in Node — nothing here ships to the browser, so the
   markup a crawler sees is the markup a reader sees.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const { facetsFor } = require('./facets');
const LAB = require('./lab');

const esc = (value) =>
  String(value == null ? '' : value).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ── URLs ─────────────────────────────────────────────────────────────────
   One place that decides what a page is called. Trailing-slash directory URLs
   so every host serves them as index.html without rewrite rules. */
const url = {
  home: () => '/',
  library: () => '/oils/',
  producers: () => '/producers/',
  cultivars: () => '/cultivars/',
  learn: () => '/learn/',
  oil: (slug) => `/oils/${slug}/`,
  cultivar: (slug) => `/cultivars/${slug}/`,
  cultivarCompare: () => '/cultivars/compare/',
  producer: (slug) => `/producers/${slug}/`,
  guide: (slug) => `/learn/${slug}/`,
  ranking: (slug) => `/rankings/${slug}/`,
  howWeRate: () => '/how-we-rate/',
  contact: () => '/contact/',
};

const absolute = (site, path) => site.url.replace(/\/$/, '') + path;

/* ── ratings ──────────────────────────────────────────────────────────────
   The ★ row is decorative; the readable rating rides alongside it in text a
   screen reader (and a crawler) can use. */
function starRow(n, modifier) {
  const filled = Math.max(0, Math.min(5, n | 0));
  return `<span class="stars ${modifier || ''}" aria-hidden="true">${
    '★'.repeat(filled)}${'☆'.repeat(5 - filled)}</span>`;
}

const ratingLabel = (score, count) =>
  !count
    ? `Rated ${score} out of 5`
    : `Rated ${score} out of 5 from ${count} reviews`;

const srOnly = (text) => `<span class="visually-hidden">${esc(text)}</span>`;

/* ── images ───────────────────────────────────────────────────────────────
   width/height are always emitted so the box is reserved before the file
   arrives — the cheapest CLS fix there is. `priority` marks the LCP image:
   eager + high fetchpriority, and build.js preloads it in the head. */
function media(image, placeholder, classes, extra, opts = {}) {
  const fit = image && image.fit === 'contain' ? ' media--contain' : '';
  let inner;
  if (image && image.src) {
    const loading = opts.priority ? 'eager' : 'lazy';
    const priority = opts.priority ? ' fetchpriority="high"' : '';
    inner = `<img src="/${esc(image.src)}" alt="${esc(image.alt || '')}"` +
      ` width="${image.w || 1040}" height="${image.h || 1040}"` +
      ` loading="${loading}" decoding="async"${priority}>`;
  } else {
    inner = `<span class="media__placeholder">${esc(placeholder || 'Photo')}</span>`;
  }
  return `<div class="media${fit} ${classes || ''}">${inner}${extra || ''}</div>`;
}

const shopBadge = (site, oil, classes) =>
  site.showShopBadges && oil.inShop
    ? `<span class="tag tag-accent-2 ${classes || ''}">In our shop</span>`
    : '';

/* ── icons ────────────────────────────────────────────────────────────── */
const ICON = {
  search: '<svg class="searchbar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
  arrow: '<svg class="article-row__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
  external: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
  caret: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg>',
  check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>',
  heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
};

const searchBar = (size, placeholder) =>
  `<form class="searchbar searchbar--${size}" role="search" action="${url.library()}">` +
  `<div class="searchbar__field">${ICON.search}` +
  `<input class="input" type="search" name="q" placeholder="${esc(placeholder)}"` +
  ` aria-label="Search the olive oil library"></div>` +
  '<button class="btn btn-primary" type="submit">Search</button></form>';

/* ── counts ───────────────────────────────────────────────────────────────
   Copy writes {oils} / {producers} / {regions} / {cultivars} and the build
   fills them from the records. A number typed into a string is a number that
   will be wrong later — these two page descriptions claimed 312 oils for as
   long as the library held 55. */
const fillCounts = (text, counts) =>
  String(text).replace(/\{(oils|producers|regions|cultivarPages|cultivars)\}/g,
    (whole, key) => (counts[key] == null ? whole : String(counts[key])));

/* ── chrome ───────────────────────────────────────────────────────────────
   The partner strip states the commercial relationship on every page. It is
   the disclosure the "In our shop" badge relies on, so it belongs above the
   nav rather than buried in the footer.

   v2 also draws a language switcher (EN/NL/DE/FR/IT) and a B2B link up here.
   Neither is built — there are no translations and no trade page — and five
   dead language links are worse than none, so the strip carries what is real. */
const partnerStrip = (site) =>
  '<div class="partner-strip">' +
    `<span>Official supply &amp; retail partner: <a href="${esc(site.shopUrl)}" target="_blank" rel="noopener"><strong>${
      esc(site.shopName)}</strong></a></span>` +
    '<span class="partner-strip__note">Ratings are independent of what is stocked</span>' +
  '</div>';

/* The taxonomy panel behind "Olive oils". Every entry is a filtered library
   view or a page that exists — the design's polyphenol, certification, sensory
   and pairing axes are not built, so they are not offered. app.js opens it;
   with no JavaScript it stays closed and the nav item is still a link to the
   library, which is where the panel would have taken you. */
function megaMenu(site, groups) {
  const col = (g) =>
    '<div class="mega__col">' +
      `<span class="card-kicker">${esc(g.title)}</span>` +
      g.links.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}${
        l.count == null ? '' : `<span class="mega__count">${esc(l.count)}</span>`}</a>`).join('') +
    '</div>';
  return '<div class="mega" id="mega-oils" hidden>' +
    `<div class="mega__inner">${groups.map(col).join('')}</div></div>`;
}

function nav(site, current, mega) {
  const links = site.nav.map((item) => {
    const here = item.key === current ? ' aria-current="page"' : '';
    // The one item that owns the panel is a link first and a toggle second:
    // the label still navigates, the caret is a separate control.
    return mega && item.key === 'library'
      ? `<span class="nav-item nav-item--mega"><a href="${esc(item.href)}"${here}>${esc(item.label)}</a>` +
        '<button class="nav-caret" type="button" aria-expanded="false" aria-controls="mega-oils">' +
        `<span class="visually-hidden">Browse by category</span>${ICON.caret}</button></span>`
      : `<a href="${esc(item.href)}"${here}>${esc(item.label)}</a>`;
  }).join('');
  return '<div class="nav-wrap">' + partnerStrip(site) +
    '<nav class="nav" aria-label="Main">' +
      `<a class="nav-brand nav-brand--link" href="${url.home()}">${esc(site.brand)}</a>` +
      links +
      `<a class="btn btn-primary nav-cta" href="${esc(site.shopUrl)}" target="_blank" rel="noopener">Buy at ${
        esc(site.shopName)} ${ICON.external}</a>` +
    '</nav>' + (mega ? megaMenu(site, mega) : '') + '</div>';
}

const footer = (site) =>
  '<footer class="site-footer">' +
    `<div class="site-footer__brand"><span class="nav-brand">${esc(site.brand)}</span>` +
      `<span>${esc(site.tagline)}</span></div>` +
    '<nav class="site-footer__links" aria-label="Footer">' +
      site.footerLinks.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('') +
    '</nav></footer>';

/* Descriptive anchors, and the trail a crawler follows back up the tree. */
const breadcrumb = (trail) =>
  '<nav class="breadcrumb" aria-label="Breadcrumb">' +
  trail.map((step, i) => {
    const last = i === trail.length - 1;
    const label = esc(step.label);
    return (last ? `<span aria-current="page">${label}</span>`
                 : `<a href="${esc(step.href)}">${label}</a><span aria-hidden="true">/</span>`);
  }).join('') + '</nav>';

/* ── oil card ─────────────────────────────────────────────────────────── */

/* An oil can be in the library without a panel score: a catalogue entry we
   have researched but not tasted. Those carry a `listing` credential (a
   competition placing) instead of stars, and never borrow the look of a
   score we have not given. */
const listingChip = (oil) =>
  oil.listing
    ? `<span class="listing-chip" title="${esc(`Placed #${oil.listing.rank} in ${oil.listing.source}. A competition ranking, not our panel score — we have not tasted this oil yet.`)}">#${
        esc(oil.listing.rank)} ${esc(oil.listing.sourceShort)}</span>`
    : '<span class="listing-chip listing-chip--empty">Not yet rated</span>';


/* The filter values ride on the element itself, so app.js filters the DOM it
   already has — no second copy of the data, no extra request. The card and the
   v2 row share this, because a row that filtered differently from a card would
   be a bug nobody would see until the counts disagreed. */
function facetData(oil) {
  const f = facetsFor(oil);
  return ` data-region="${esc(f.region)}"` +
    ` data-cultivar="${esc(f.cultivars.join(' '))}"` +
    ` data-intensity="${esc(f.intensity)}"` +
    ` data-score="${esc(f.score)}"` +
    ` data-reviews="${esc(oil.reviews || 0)}"` +
    ` data-in-shop="${f.inShop ? '1' : '0'}"` +
    ` data-organic="${f.organic ? '1' : '0'}"` +
    ` data-name="${esc(oil.name.toLowerCase())}"` +
    ` data-text="${esc(f.text)}"`;
}

function oilCard(site, oil, compact) {
  const rated = Boolean(oil.score);
  const meta = compact
    ? '<div class="oil-card__rating oil-card__rating--tight">' +
        (rated
          ? starRow(oil.stars) + `<span class="score">${esc(oil.score)}</span>` +
            srOnly(ratingLabel(oil.score))
          : listingChip(oil)) +
      '</div>'
    : `<span class="oil-card__sub">${esc(oil.producer)} · ${esc(oil.cultivar)}</span>` +
      '<div class="oil-card__meta"><div class="oil-card__rating">' +
        (rated
          ? starRow(oil.stars) +
            `<span class="score">${esc(oil.score)}</span>` +
            `<span class="review-count">${oil.reviews ? `${esc(oil.reviews)} reviews` : 'Panel score'}</span>` +
            srOnly(ratingLabel(oil.score, oil.reviews))
          : listingChip(oil)) +
      '</div>' +
      `<span class="tag tag-neutral">${esc(oil.intensity)}</span></div>`;

  return `<a class="card elev-sm oil-card" href="${url.oil(oil.slug)}"${facetData(oil)}>` +
    media(oil.image, 'Bottle photo',
          'oil-card__media' + (compact ? ' oil-card__media--sm' : ''),
          shopBadge(site, oil, 'oil-card__badge')) +
    '<div class="oil-card__body">' +
      `<span class="card-kicker">${esc(oil.region)}</span>` +
      `<span class="card-title oil-card__title${compact ? ' oil-card__title--sm' : ''}">${
        esc(oil.name)}</span>` +
      meta +
    '</div></a>';
}


/* ── v2 · sensory radar ───────────────────────────────────────────────────
   The triangle from screen 02, drawn from the oil's own three axis scores.
   The shape is the reading, so the same numbers ride alongside as text for
   anyone the SVG does not reach. */
function sensoryRadar(axes) {
  const { R, point, ring } = LAB.radarGeometry;
  const vertex = (a) => point(a.angle, (a.pct / 100) * R);
  const shape = axes.map((a) => vertex(a).map((n) => n.toFixed(1)).join(',')).join(' ');
  const label = axes.map((a) => `${a.label} ${a.score}`).join(', ');

  const grid = [R, R * 0.75, R * 0.5, R * 0.25]
    .map((r, i) => `<polygon points="${ring(r)}" fill="none" stroke="var(--color-neutral-300)"` +
      ` stroke-width="${i === 0 ? 1.5 : 1}"></polygon>`).join('');

  const spokes = axes.map((a) => {
    const [x, y] = point(a.angle, R);
    return `<line x1="140" y1="140" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"` +
      ' stroke="var(--color-neutral-300)" stroke-width="1"></line>';
  }).join('');

  const dots = axes.map((a) => {
    const [x, y] = vertex(a);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="var(--color-accent)"></circle>`;
  }).join('');

  const labels = axes.map((a) => {
    const [x, y] = point(a.angle, R + 28);
    return `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle"` +
      ` class="radar__label">${esc(a.label)} ${esc(a.score)}</text>`;
  }).join('');

  return '<figure class="radar">' +
    `<svg viewBox="0 0 280 250" width="280" height="250" role="img" aria-label="${
      esc(`Sensory profile on the IOC 0–10 scale: ${label}`)}">` +
    `<g transform="translate(0,10)">${grid}${spokes}` +
    `<polygon points="${shape}" fill="var(--color-accent)" fill-opacity="0.24"` +
    ' stroke="var(--color-accent)" stroke-width="2.75" stroke-linejoin="round"></polygon>' +
    `${dots}${labels}</g></svg>` +
    '<figcaption class="radar__caption">Median of the panel, IOC scale 0–10</figcaption>' +
    '</figure>';
}

/* ── v2 · laboratory figures ──────────────────────────────────────────────
   A reading gets a meter only when the record publishes a measured number;
   a specification or a bound prints as text. Whoever produced the figure is
   named on the card, because most of them are not ours. */
function labPanel(lab) {
  const card = (r) => {
    const f = r.figure;
    const value = f.measured && f.value != null
      ? `<span class="lab-card__value">${esc(f.value)}</span><span class="lab-card__unit">${esc(r.unit)}</span>`
      : `<span class="lab-card__value lab-card__value--text">${esc(f.display)}</span>`;
    const meter = r.pct
      ? `<div class="meter meter--${esc(r.tone)}"><span style="width:${esc(r.pct)}"></span></div>`
      : '<p class="lab-card__nomeasure">No measured figure published</p>';
    return '<div class="card lab-card">' +
      `<span class="card-kicker">${esc(r.label)}</span>` +
      `<div class="lab-card__row">${value}</div>${meter}` +
      `<span class="lab-card__note">${esc(r.note)}</span>` +
      (f.source ? `<span class="lab-card__source">Source: ${esc(f.source)}</span>` : '') +
      '</div>';
  };

  const claim = lab.claim
    ? '<div class="claim">' +
      '<div class="claim__seal" aria-hidden="true">EU<br>432/<br>2012</div>' +
      '<div class="claim__body">' +
      '<h3 class="claim__title">Qualifies for the EU antioxidant health claim</h3>' +
      `<p>At ${esc(lab.claim.value)} mg/kg this oil is above the ${esc(LAB.CLAIM_THRESHOLD)} mg/kg` +
      ' threshold Regulation 432/2012 sets for hydroxytyrosol and its derivatives' +
      (lab.claim.source ? `, as reported by the ${esc(lab.claim.source)}` : '') +
      '.</p></div></div>'
    : '';

  return '<section class="lab">' +
    '<div class="lab__head"><h2>Laboratory figures</h2>' +
    '<p class="lab__sub">What has been measured on this oil, and who measured it</p></div>' +
    `<div class="lab__cards">${lab.readings.map(card).join('')}</div>${claim}</section>`;
}


/* ── v2 · result row ──────────────────────────────────────────────────────
   Screen 01 replaces the card grid with a row: bottle, then what the oil
   measures, then whether you can buy it. Each part is drawn only from what the
   record has — an oil with no lab figures and no panel profile is a title, a
   producer and a link, which is honest for a catalogue entry.

   It keeps the `oil-card` class and the facet data attributes so the filters,
   the sort and the count treat it exactly as they treated the card. */
function oilRow(site, oil) {
  const lab = LAB.labFor(oil);
  const axes = oil.detail ? LAB.radarAxes(oil.detail.profile) : null;
  const stocked = site.showShopBadges && oil.inShop;

  const figure = (value, label) =>
    `<div class="oil-row__figure"><b>${esc(value)}</b><span>${esc(label)}</span></div>`;

  const figures = [];
  if (lab) {
    for (const r of lab.readings) {
      // Only a measured number earns the display size; a specification is not
      // a figure you can line up against another oil's.
      if (!r.figure.measured || r.figure.value == null) continue;
      if (r.key === 'polyphenols') figures.push(figure(r.figure.value, 'mg/kg polyphenols'));
      if (r.key === 'acidity') figures.push(figure(`${r.figure.value}%`, 'free acidity'));
    }
  }
  if (oil.score) figures.push(figure(oil.score, 'panel score'));

  const bars = axes
    ? '<div class="oil-row__axes">' + axes.map((a) =>
        '<div class="oil-row__axis">' +
        `<span>${esc(a.label)} ${esc(a.score)}</span>` +
        `<div class="meter meter--accent-2"><span style="width:${esc(a.pct)}%"></span></div>` +
        '</div>').join('') + '</div>'
    : '';

  const side = stocked
    ? '<div class="oil-row__side">' +
        '<span class="oil-row__stock"><span class="dot" aria-hidden="true"></span>In our shop</span>' +
        (oil.price ? `<span class="oil-row__price">${esc(oil.price)}</span>` : '') +
        `<a class="btn btn-primary btn-block" href="${esc(oil.shopUrl || site.shopUrl)}" target="_blank" rel="noopener">Where to buy${
          srOnly(` ${oil.name} at ${site.shopName}`)}</a>` +
      '</div>'
    : '<div class="oil-row__side oil-row__side--none">' +
        '<span class="oil-row__stock oil-row__stock--none">Not stocked</span>' +
        '<span class="oil-row__note">Reviewed independently of what our partner carries.</span>' +
      '</div>';

  return `<article class="card elev-sm oil-card oil-row"${facetData(oil)}>` +
    media(oil.image, 'Bottle photo', 'oil-row__media') +
    '<div class="oil-row__main">' +
      `<span class="card-kicker">${esc(oil.region)}</span>` +
      `<a class="card-title oil-row__title" href="${url.oil(oil.slug)}">${esc(oil.name)}</a>` +
      `<span class="oil-row__sub">${esc(oil.producer)} · ${esc(oil.cultivar)}</span>` +
      (oil.score
        ? `<span class="oil-row__stars">${starRow(oil.stars)}${srOnly(ratingLabel(oil.score, oil.reviews))}</span>`
        : `<span class="oil-row__stars">${listingChip(oil)}</span>`) +
      (figures.length ? `<div class="oil-row__figures">${figures.join('')}</div>` : '') +
      bars +
    '</div>' + side + '</article>';
}

module.exports = {
  esc, url, absolute, starRow, ratingLabel, srOnly, media, shopBadge,
  ICON, searchBar, nav, partnerStrip, footer, breadcrumb, oilCard, listingChip,
  fillCounts, sensoryRadar, labPanel, oilRow, facetData,
};
