/* ══════════════════════════════════════════════════════════════════════════
   Page templates — one function per screen, each returning a full document.

   The five screens map to the artboards in the Claude Design handoff:
     home → 00, library → 01, oil → 02, producer → 03, guide → 04.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const R = require('./render');
const S = require('./seo');
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

function home(D) {
  const site = D.site;
  const h = D.home;
  const meta = D.pages.home;

  const heroImg = h.hero.src;

  const main =
    `<section class="hero">
      <div class="hero__copy">
        <span class="tag tag-accent-2">${esc(h.eyebrow)}</span>
        <h1>${esc(h.heading)}</h1>
        <p class="hero__lede">${esc(h.lede)}</p>
        ${R.searchBar('lg', h.searchPlaceholder)}
        <div class="hero__popular">Popular: ${
          h.popular.map((p) => `<a href="${esc(p.href)}">${esc(p.label)}</a>`).join('')}</div>
      </div>
      ${media(h.hero, 'Hero photo · grove or bottles', 'hero__media', '', { priority: true })}
    </section>

    <section class="section">
      <div class="section-head">
        <div class="section-head__text">
          <h2>Top rated this month</h2>
          <span class="section-head__sub">Highest expert scores from the latest tasting round</span>
        </div>
        <a href="${url.library()}">Browse the library →</a>
      </div>
      <div class="oil-grid-4">${
        D.oils.slice(0, 4).map((o) => R.oilCard(site, o, true)).join('')}</div>
    </section>

    <div class="home-columns">
      <section class="section">
        <div class="section-head"><div class="section-head__text">
          <h2>Explore by region</h2>
          <span class="section-head__sub">Terroir, cultivars and the producers we trust</span>
        </div></div>
        <div class="region-grid">${D.regions.map((r) =>
          `<a class="region" href="${url.library()}?region=${encodeURIComponent(r.slug)}">` +
          media(r.image, r.name, 'region__media media--circle') +
          `<span class="region__name">${esc(r.name)}</span>` +
          `<span class="region__count">${esc(r.count)} oils</span></a>`).join('')}</div>
      </section>

      <section class="section">
        <div class="section-head"><div class="section-head__text">
          <h2>Learn</h2>
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
    nav: R.nav(site, ''),
    main,
    headHtml: S.head({
      site,
      title: meta.title,
      ogTitle: h.heading,
      description: meta.description,
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
  const f = D.filters;
  const meta = D.pages.library;

  const checkbox = (item) =>
    `<label class="radio"><input type="checkbox"${item.checked ? ' checked' : ''}>` +
    `<span class="dot"></span>${esc(item.label)}</label>`;

  // Headings run h1 → h2 → h3 with nothing skipped; the group labels only
  // *look* like the small caps the design uses (.filter-group__title).
  const filters =
    `<h2 class="visually-hidden">Filter the library</h2>
     <div class="filter-group"><h3 class="filter-group__title">Country / region</h3>${
      f.regions.map(checkbox).join('')}<a href="#" class="filters__more">Show all ${
      esc(f.regionsTotal)}</a></div>
     <div class="filter-group"><h3 class="filter-group__title">Cultivar</h3><div class="filter-tags">${
       f.cultivars.map((c) =>
         `<span class="tag ${c.selected ? 'tag-accent' : 'tag-neutral'}">${esc(c.label)}</span>`
       ).join('')}</div></div>
     <div class="filter-group"><h3 class="filter-group__title">Intensity</h3><div class="seg">${
       f.intensities.map((i) =>
         `<label class="seg-opt"><input type="radio" name="intensity"${
           i.checked ? ' checked' : ''}>${esc(i.label)}</label>`).join('')}</div></div>
     <div class="filter-group"><h3 class="filter-group__title">Minimum rating</h3><div class="filter-rating">${
       '★'.repeat(f.minRating)}<span class="stars__off">${'★'.repeat(5 - f.minRating)}</span>` +
       `<span class="filter-rating__label">${esc(f.minRating)} &amp; up</span></div></div>
     <div class="filter-group">${f.flags.map(checkbox).join('')}</div>
     <a href="${url.library()}" class="btn btn-ghost">Clear filters</a>`;

  const main =
    `<div class="library-head">
      <h1>The olive oil library</h1>
      <p>312 extra virgin oils tasted, scored and described by our panel and by readers like you.</p>
    </div>
    ${R.searchBar('md', 'Search oils, producers, cultivars…')}
    <div class="library-layout">
      <aside class="filters" aria-label="Filter the library">${filters}</aside>
      <div class="results">
        <div class="results__bar">
          <span>${esc(f.summary)}</span>
          <div class="results__sort">Sort by <span class="tag tag-outline">${
            esc(f.sort)} ▾</span></div>
        </div>
        <div class="oil-grid-3">${D.oils.map((o) => R.oilCard(site, o, false)).join('')}</div>
        <div class="results__more">
          <button class="btn btn-secondary" type="button">Show ${
            f.total - D.oils.length} more</button>
        </div>
      </div>
    </div>`;

  const trail = [{ label: 'Home', href: url.home() }, { label: 'Library' }];

  return shell({
    site,
    bodyClass: 'page-body--library',
    nav: R.nav(site, 'library'),
    main,
    headHtml: S.head({
      site,
      title: meta.title,
      description: meta.description,
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

function learnIndex(D) {
  const site = D.site;
  const meta = D.pages.learn;
  const trail = [{ label: 'Home', href: url.home() }, { label: 'Learn' }];

  const main = R.breadcrumb(trail) +
    `<div class="library-head"><h1>Learn</h1><p>${esc(meta.intro)}</p>${
      meta.body.map((para) => `<p class="hub-body">${esc(para)}</p>`).join('')}</div>
     <div class="article-list article-list--wide">${D.articles.map((a) => {
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
    }).join('')}</div>`;

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
  const full = Boolean(o.detail);
  const path = url.oil(o.slug);

  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Library', href: url.library() },
    { label: o.name },
  ];

  // Only link the producer when we have actually built a page for them —
  // a byline pointing at a 404 is worse than plain text.
  const hasProducerPage = D.producers.some((p) => p.slug === o.producerSlug);

  const tags = (d.tags || [o.intensity])
    .map((t) => `<span class="tag tag-neutral">${esc(t)}</span>`).join('');

  const readerBox = o.readerScore
    ? '<div class="rating-box rating-box--reader"><span class="card-kicker">Reader rating</span>' +
      `<div class="rating-box__row"><span class="rating-box__value">${esc(o.readerScore)}</span>` +
      starRow(o.readerStars, 'stars--lg') + srOnly(ratingLabel(o.readerScore, o.reviews)) +
      `</div><span class="rating-box__note">${esc(o.reviews)} reviews · ` +
      '<a href="#write-a-review">write yours</a></span></div>'
    : '<div class="rating-box rating-box--reader"><span class="card-kicker">Reader rating</span>' +
      '<div class="rating-box__row"><span class="rating-box__value">—</span></div>' +
      `<span class="rating-box__note">${esc(o.reviews)} reviews · ` +
      '<a href="#write-a-review">write yours</a></span></div>';

  const hero =
    `<section class="detail-hero">
      ${media(o.image, 'Bottle photo', 'detail-hero__frame', '', { priority: true })}
      <div class="detail-hero__info">
        <div class="detail-hero__tags">${shopBadge(site, o, 'tag-shop')}${tags}</div>
        <div class="detail-hero__title"><h1>${esc(o.name)}</h1>
          <p class="detail-hero__byline">by ${
            hasProducerPage ? `<a href="${url.producer(o.producerSlug)}">${esc(o.producer)}</a>`
                            : esc(o.producer)} · ${esc(d.location || o.region)}</p></div>
        <div class="ratings">
          <div class="card rating-box rating-box--expert">
            <span class="card-kicker">Expert rating</span>
            <div class="rating-box__row"><span class="rating-box__value">${esc(o.score)}</span>${
              starRow(o.stars, 'stars--lg')}${srOnly(ratingLabel(o.score))}</div>
            <span class="rating-box__note">${
              esc(d.panelNote || 'Scored by our tasting panel')}</span>
          </div>
          ${readerBox}
        </div>
        <p class="detail-hero__desc">${esc(d.description ||
          'The panel has scored this oil; the full write-up — tasting notes, the facts and pairings — is being prepared.')}</p>
        <div class="detail-actions">${
          site.showShopBadges && o.inShop
            ? `<a class="btn btn-primary" href="${esc(site.shopUrl)}" target="_blank" rel="noopener">Where to buy · ${
                esc(site.shopName)} ${ICON.external}</a>`
            : ''}
          <button class="btn btn-secondary" type="button">${ICON.heart}Save</button>
          ${o.price ? `<span class="detail-actions__price">${esc(o.price)}</span>` : ''}
        </div>
      </div>
    </section>`;

  const body = full
    ? hero +
      `<section class="detail-facts">
        <div class="detail-col">
          <h2>Tasting notes</h2>
          ${d.profile.map((p) =>
            '<div class="profile-bar"><div class="profile-bar__row">' +
            `<span class="profile-bar__label">${esc(p.label)}</span>` +
            `<span class="profile-bar__desc">${esc(p.desc)}</span></div>` +
            `<div class="profile-bar__track" role="img" aria-label="${esc(p.label)}: ${esc(p.pct)}">` +
            `<div class="profile-bar__fill" style="width:${esc(p.pct)}"></div></div></div>`).join('')}
          <p class="profile-note">${esc(d.tastingNote)}</p>
        </div>
        <div class="detail-col">
          <h2>The facts</h2>
          <table class="table facts-table"><tbody>${d.facts.map(([k, v]) =>
            `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
          <div class="awards"><h3>Awards</h3><div class="awards__list">${
            d.awards.map((a) => `<span class="tag tag-accent">${esc(a)}</span>`).join('')}</div></div>
        </div>
        <div class="detail-col detail-col--map">
          <h2>Where it's from</h2>
          ${media(d.origin.image, d.origin.mapPlaceholder, 'detail-map media--circle')}
          <p class="detail-map__note">${esc(d.origin.note)}</p>
          <a href="${esc(d.origin.linkHref)}" class="detail-map__link">${esc(d.origin.linkLabel)}</a>
        </div>
      </section>

      <section class="pairings">
        <h2>Pairs well with</h2>
        <div class="pairings__list">${
          d.pairings.map((p) => `<span class="tag tag-accent-2">${esc(p)}</span>`).join('')}</div>
      </section>

      <div class="reviews-layout">
        <section class="reviews">
          <div class="reviews__head"><h2>Reviews</h2>
            <span class="reviews__count">1 expert · ${esc(o.reviews)} readers</span></div>
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
          ${d.reviews.map((r) =>
            '<article class="review-item"><div class="review__head">' +
            `<div class="review__avatar" aria-hidden="true">${esc(r.initial)}</div>` +
            `<div class="review__who"><span class="review__name">${esc(r.name)}</span>` +
            `<span class="review__meta">${esc(r.meta)}</span></div>` +
            starRow(r.stars, 'stars--sm review__stars') + srOnly(ratingLabel(r.stars)) +
            `</div><p class="review__text">${esc(r.text)}</p>` +
            `<div class="review__actions"><a href="#">Helpful · ${esc(r.helpful)}</a>` +
            '<a href="#">Report</a></div></article>').join('')}
          <button class="btn btn-secondary" type="button">Read all ${
            esc(o.reviews)} reviews</button>
        </section>
        ${reviewForm()}
      </div>`
    : hero + `<div class="reviews-layout reviews-layout--form-only">${reviewForm()}</div>`;

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
            `<td>${starRow(o.stars)} ${esc(o.score)}${srOnly(ratingLabel(o.score))}</td>` +
            `<td>${esc(o.readers)}</td>` +
            `<td>${stocked
              ? '<span class="tag tag-accent-2 tag-shop">In our shop</span>'
              : '<span class="producer-oils__nostock">Not stocked</span>'}</td>` +
            `<td>${stocked
              ? `<a class="btn btn-primary" href="${esc(site.shopUrl)}" target="_blank" rel="noopener">Buy ${esc(o.name)}<span class="visually-hidden"> at ${esc(site.shopName)}</span></a>`
              : (href ? `<a class="btn btn-ghost" href="${href}">Read review</a>` : '')}</td>` +
          '</tr>';
        }).join('')}</tbody>
      </table></div>
    </section>

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

function guide(D, g) {
  const site = D.site;
  const path = url.guide(g.slug);
  const promoOil = D.oils.find((o) => o.slug === g.promo.oilSlug);
  const trail = [
    { label: 'Home', href: url.home() },
    { label: 'Learn', href: url.learn() },
    { label: g.title },
  ];

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
    <div class="article-layout">
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
        `<h2 id="${esc(s.id)}">${esc(s.heading)}</h2>` + s.blocks.map((b) =>
          b.type === 'callout'
            ? `<aside class="card article-callout"><span class="card-kicker">${
                esc(b.kicker)}</span><p>${esc(b.text)}</p></aside>`
            : `<p>${esc(b.text)}</p>`).join('')).join('')}
      </article>
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

module.exports = { home, library, producersIndex, learnIndex, oil, producer, guide };
