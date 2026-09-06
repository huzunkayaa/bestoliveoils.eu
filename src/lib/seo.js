/* ══════════════════════════════════════════════════════════════════════════
   Head metadata and structured data.

   Two rules hold everything here together:
     1. Every page declares one canonical URL, and it is the URL the page is
        actually built at — no query strings, no alternates competing.
     2. Schema describes what is genuinely on the page. An oil with no
        write-up gets no review markup; an oil with no price gets no Offer.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const { esc, absolute } = require('./render');

/* JSON-LD is data, not markup: `<` is escaped so a stray character in content
   can never close the script tag early. */
const jsonLd = (data) =>
  '<script type="application/ld+json">' +
  JSON.stringify(data, null, 0).replace(/</g, '\\u003c') +
  '</script>';

/**
 * The full <head>.
 * @param {object} o.site      site config
 * @param {string} o.title     ~50-60 chars
 * @param {string} o.description ~120-160 chars
 * @param {string} o.path      canonical path, e.g. '/oils/pruneti-frantoio/'
 * @param {string} [o.image]   og:image path
 * @param {string} [o.type]    og:type
 * @param {string} [o.preload] LCP image to preload
 * @param {Array}  [o.schema]  JSON-LD objects
 */
function head(o) {
  const canonical = absolute(o.site, o.path);
  const image = absolute(o.site, '/' + (o.image || 'assets/img/dipping-bread.webp'));

  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(o.title)}</title>`,
    `<meta name="description" content="${esc(o.description)}">`,
    `<link rel="canonical" href="${esc(canonical)}">`,

    // Open Graph / Twitter
    `<meta property="og:type" content="${esc(o.type || 'website')}">`,
    `<meta property="og:site_name" content="${esc(o.site.brand)}">`,
    `<meta property="og:locale" content="en_GB">`,
    `<meta property="og:title" content="${esc(o.ogTitle || o.title)}">`,
    `<meta property="og:description" content="${esc(o.description)}">`,
    `<meta property="og:url" content="${esc(canonical)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    '<meta name="twitter:card" content="summary_large_image">',

    // Fonts: preconnect so the handshake overlaps the CSS, and display=swap so
    // text paints immediately in the fallback rather than blocking LCP.
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;600;700&display=swap">',

    o.preload ? `<link rel="preload" as="image" href="/${esc(o.preload)}" fetchpriority="high">` : '',

    // Declared explicitly so browsers stop probing /favicon.ico.
    '<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">',

    '<link rel="stylesheet" href="/assets/css/tokens.css">',
    '<link rel="stylesheet" href="/assets/css/site.css">',
    ...(o.schema || []).map(jsonLd),
  ].filter(Boolean).join('\n');
}

/* ── schema builders ──────────────────────────────────────────────────── */

const organization = (site) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absolute(site, '/#organization'),
  name: site.brand,
  url: absolute(site, '/'),
  description: site.description,
  foundingDate: site.founded,
});

/* The SearchAction is only claimed because /oils/ genuinely accepts ?q=. */
const website = (site) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absolute(site, '/#website'),
  name: site.brand,
  url: absolute(site, '/'),
  publisher: { '@id': absolute(site, '/#organization') },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: absolute(site, '/oils/?q={search_term_string}'),
    },
    'query-input': 'required name=search_term_string',
  },
});

const breadcrumbList = (site, trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((step, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: step.label,
    ...(step.href ? { item: absolute(site, step.href) } : {}),
  })),
});

/**
 * Product schema for an oil.
 * aggregateRating is the reader score (real user ratings, which is what the
 * property means); the panel verdict is the single expert `review`. Neither is
 * emitted unless the page actually shows it, and `offers` only appears when we
 * hold a real price.
 */
function product(site, oil, path) {
  const d = oil.detail;
  const node = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': absolute(site, path) + '#product',
    name: oil.name,
    url: absolute(site, path),
    category: 'Extra virgin olive oil',
    brand: { '@type': 'Brand', name: oil.producer },
  };

  if (oil.image) node.image = absolute(site, '/' + oil.image.src);
  if (d && d.description) node.description = d.description;

  const props = [
    ['Cultivar', oil.cultivar],
    ['Region', oil.region],
    ['Intensity', oil.intensity],
  ];
  if (d && d.facts) {
    d.facts.forEach(([name, value]) => {
      if (!props.some((p) => p[0] === name)) props.push([name, value]);
    });
  }
  node.additionalProperty = props.map(([name, value]) => ({
    '@type': 'PropertyValue', name, value,
  }));

  if (oil.readerScore) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: oil.readerScore,
      reviewCount: oil.reviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (d && d.expertReview) {
    node.review = [{
      '@type': 'Review',
      name: `${oil.name} — expert review`,
      reviewBody: d.expertReview.text,
      datePublished: d.expertReview.datePublished || undefined,
      author: { '@type': 'Person', name: d.expertReview.name.split(' · ')[0] },
      publisher: { '@id': absolute(site, '/#organization') },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: oil.score,
        bestRating: 5,
        worstRating: 1,
      },
    }];
  }

  // We are not the seller — the offer points at the shop that is.
  if (site.showShopBadges && oil.inShop && oil.priceAmount) {
    node.offers = {
      '@type': 'Offer',
      price: oil.priceAmount,
      priceCurrency: oil.priceCurrency || 'EUR',
      availability: 'https://schema.org/InStock',
      url: site.shopUrl,
      seller: { '@type': 'Organization', name: site.shopName, url: site.shopUrl },
    };
  }

  return node;
}

const collectionPage = (site, path, name, description, oils) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': absolute(site, path),
  name,
  description,
  url: absolute(site, path),
  isPartOf: { '@id': absolute(site, '/#website') },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: oils.length,
    itemListElement: oils.map((oil, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(site, `/oils/${oil.slug}/`),
      name: oil.name,
    })),
  },
});

/* A hub page: what it is, and the things it points at, in order. */
const itemListPage = (site, path, name, description, items) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': absolute(site, path),
  name,
  description,
  url: absolute(site, path),
  isPartOf: { '@id': absolute(site, '/#website') },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absolute(site, item.url),
    })),
  },
});

const article = (site, guide, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': absolute(site, path) + '#article',
  headline: guide.title,
  description: guide.lede,
  url: absolute(site, path),
  ...(guide.image ? { image: absolute(site, '/' + guide.image.src) } : {}),
  datePublished: guide.datePublished,
  dateModified: guide.dateModified || guide.datePublished,
  author: { '@type': 'Person', name: guide.author.name },
  publisher: { '@id': absolute(site, '/#organization') },
  isPartOf: { '@id': absolute(site, '/#website') },
});

/* The estate is a real place with real coordinates, so Organization carries
   an address and geo rather than a bare name. */
const producerOrg = (site, p, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absolute(site, path) + '#producer',
  name: p.name,
  description: p.lede,
  url: absolute(site, path),
  ...(p.website ? { sameAs: [p.website] } : {}),
  ...(p.founded ? { foundingDate: p.founded } : {}),
  ...(p.locality ? {
    address: {
      '@type': 'PostalAddress',
      addressLocality: p.locality,
      addressRegion: p.regionName,
      addressCountry: p.countryCode,
    },
  } : {}),
  ...(p.geo ? {
    location: {
      '@type': 'Place',
      name: p.locality,
      geo: { '@type': 'GeoCoordinates', latitude: p.geo.lat, longitude: p.geo.lon },
    },
  } : {}),
});

module.exports = {
  head, jsonLd, organization, website, breadcrumbList,
  product, collectionPage, itemListPage, article, producerOrg,
};
