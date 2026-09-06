/* ══════════════════════════════════════════════════════════════════════════
   HTML fragment builders, shared by every page template.

   These run at build time in Node — nothing here ships to the browser, so the
   markup a crawler sees is the markup a reader sees.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

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
  learn: () => '/learn/',
  oil: (slug) => `/oils/${slug}/`,
  producer: (slug) => `/producers/${slug}/`,
  guide: (slug) => `/learn/${slug}/`,
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
  count == null
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
  heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>',
};

const searchBar = (size, placeholder) =>
  `<form class="searchbar searchbar--${size}" role="search" action="${url.library()}">` +
  `<div class="searchbar__field">${ICON.search}` +
  `<input class="input" type="search" name="q" placeholder="${esc(placeholder)}"` +
  ` aria-label="Search the olive oil library"></div>` +
  '<button class="btn btn-primary" type="submit">Search</button></form>';

/* ── chrome ───────────────────────────────────────────────────────────── */

function nav(site, current) {
  const links = site.nav.map((item) =>
    `<a href="${esc(item.href)}"${item.key === current ? ' aria-current="page"' : ''}>${
      esc(item.label)}</a>`).join('');
  return '<nav class="nav" aria-label="Main">' +
    `<a class="nav-brand nav-brand--link" href="${url.home()}">${esc(site.brand)}</a>` +
    links +
    '<a href="#" class="btn btn-secondary">Sign in</a></nav>';
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

function oilCard(site, oil, compact) {
  const meta = compact
    ? '<div class="oil-card__rating oil-card__rating--tight">' +
        starRow(oil.stars) +
        `<span class="score">${esc(oil.score)}</span>` +
        srOnly(ratingLabel(oil.score)) +
      '</div>'
    : `<span class="oil-card__sub">${esc(oil.producer)} · ${esc(oil.cultivar)}</span>` +
      '<div class="oil-card__meta"><div class="oil-card__rating">' +
        starRow(oil.stars) +
        `<span class="score">${esc(oil.score)}</span>` +
        `<span class="review-count">${esc(oil.reviews)} reviews</span>` +
        srOnly(ratingLabel(oil.score, oil.reviews)) +
      '</div>' +
      `<span class="tag tag-neutral">${esc(oil.intensity)}</span></div>`;

  return `<a class="card elev-sm oil-card" href="${url.oil(oil.slug)}">` +
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

module.exports = {
  esc, url, absolute, starRow, ratingLabel, srOnly, media, shopBadge,
  ICON, searchBar, nav, footer, breadcrumb, oilCard,
};
