#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Static site generator for bestoliveoils.eu.

   Reads src/data/site.js, renders every page to real HTML at its real URL,
   and writes docs/ — assets, sitemap and robots.txt included. Zero
   dependencies; `node build.js` is the whole toolchain.

   The output is called docs/ rather than dist/ because GitHub Pages can serve
   a /docs folder off the default branch with no configuration and no CI.

   Why pre-render at all: this is a review library, so the oil pages have to be
   readable by a crawler without running JavaScript. Everything below exists to
   make the markup a crawler sees identical to the markup a reader sees.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');

const D = require('./src/data/site');
const pages = require('./src/lib/pages');
const { url, absolute } = require('./src/lib/render');

const SRC = path.join(__dirname, 'src');
const OUT = path.join(__dirname, 'docs');

/* ── fs helpers ───────────────────────────────────────────────────────── */

function write(relPath, contents) {
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  return relPath;
}

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
}

/* ── build ────────────────────────────────────────────────────────────── */

function build() {
  fs.rmSync(OUT, { recursive: true, force: true });

  const written = [];
  const routes = [];

  // A page's file is <route>index.html, so /oils/x/ resolves without rewrites.
  const page = (route, html, priority, changefreq) => {
    written.push(write(path.join(route.replace(/^\//, ''), 'index.html'), html));
    routes.push({ route, priority, changefreq });
  };

  page(url.home(), pages.home(D), '1.0', 'weekly');
  page(url.library(), pages.library(D), '0.9', 'weekly');
  page(url.producers(), pages.producersIndex(D), '0.6', 'monthly');
  page(url.learn(), pages.learnIndex(D), '0.6', 'monthly');

  for (const oil of D.oils) {
    page(url.oil(oil.slug), pages.oil(D, oil), oil.detail ? '0.8' : '0.5', 'monthly');
  }
  for (const producer of D.producers) {
    page(url.producer(producer.slug), pages.producer(D, producer), '0.7', 'monthly');
  }
  for (const guide of D.guides) {
    page(url.guide(guide.slug), pages.guide(D, guide), '0.7', 'monthly');
  }

  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
  // Some crawlers and older browsers ask for /favicon.ico at the root
  // regardless of what the page declares; serve the SVG there too.
  fs.copyFileSync(path.join(SRC, 'assets', 'favicon.svg'), path.join(OUT, 'favicon.svg'));

  written.push(write('sitemap.xml', sitemap(routes)));
  written.push(write('robots.txt', robots()));
  written.push(write('404.html', notFound()));
  // Stops GitHub Pages running the output through Jekyll, which would drop
  // any file or folder beginning with an underscore.
  written.push(write('.nojekyll', ''));

  return { written, routes };
}

/* ── sitemap ──────────────────────────────────────────────────────────────
   Only pages that are canonical, indexable and actually built go in here — a
   sitemap that lists anything else is a sitemap Search Console complains about. */
function sitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes.map((r) =>
      '  <url>\n' +
      `    <loc>${absolute(D.site, r.route)}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${r.changefreq}</changefreq>\n` +
      `    <priority>${r.priority}</priority>\n` +
      '  </url>').join('\n') +
    '\n</urlset>\n';
}

function robots() {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# Filter permutations are the same set of oils in a different order —',
    '# they carry a canonical back to /oils/, and are kept out of the crawl',
    '# budget entirely. A literal "?" here matches only the query form, so the',
    '# individual /oils/<slug>/ pages stay crawlable.',
    'Disallow: /oils/?',
    '',
    `Sitemap: ${absolute(D.site, '/sitemap.xml')}`,
    '',
  ].join('\n');
}

function notFound() {
  const site = D.site;
  return `<!DOCTYPE html>
<html lang="${site.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found · ${site.brand}</title>
<meta name="description" content="That page is not here. Browse the olive oil library instead.">
<meta name="robots" content="noindex, follow">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/css/tokens.css">
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
<div class="page">
<main class="page-body page-body--detail" id="main">
  <div class="library-head">
    <h1>We can't find that page</h1>
    <p>It may have moved. The library is the best place to pick the thread back up.</p>
  </div>
  <div class="detail-actions">
    <a class="btn btn-primary" href="/oils/">Browse the olive oil library</a>
    <a class="btn btn-secondary" href="/">Go to the homepage</a>
  </div>
</main>
</div>
</body>
</html>
`;
}

/* ── run ──────────────────────────────────────────────────────────────── */

const { written, routes } = build();
console.log(`Built ${routes.length} pages + ${written.length - routes.length} support files → docs/`);
routes.forEach((r) => console.log('  ' + r.route));
