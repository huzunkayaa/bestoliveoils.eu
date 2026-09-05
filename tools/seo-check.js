#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Checks docs/ against the SEO rules the build is supposed to hold to.
   No browser, no network, no dependencies — run it after every build.

   It catches the regressions that are invisible when the page looks fine:
   a title that drifts past the truncation point, two pages claiming the same
   description, a canonical pointing somewhere the file is not, a heading level
   skipped, invalid JSON-LD, an internal link to a page that no longer exists,
   an image without dimensions, a sitemap out of step with what was built.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');

const D = require('../src/data/site');
const DIST = path.join(__dirname, '..', 'docs');
const ORIGIN = D.site.url.replace(/\/$/, '');
let problems = 0;
const fail = (m) => { problems++; console.log('  ✗ ' + m); };

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIST).sort();
const routes = new Set(files.map(f =>
  '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/')));

const titles = new Map();
const descs = new Map();

for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/index\.html$/, '');
  const html = fs.readFileSync(file, 'utf8');
  console.log('\n' + rel);

  const unesc = (v) => v == null ? v : v.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const title = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1]);
  const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const noindex = /name="robots"[^>]*noindex/.test(html);

  if (!title) fail('no <title>');
  else {
    console.log(`  title (${title.length}) ${title}`);
    if (title.length > 62) fail(`title ${title.length} chars — will truncate`);
    if (titles.has(title)) fail(`duplicate title, also on ${titles.get(title)}`);
    titles.set(title, rel);
  }

  if (!desc && !noindex) fail('no meta description');
  else if (!desc) console.log('  no description (noindex page)');
  else if (desc) {
    console.log(`  desc  (${desc.length})`);
    // Length and uniqueness only matter where the page can appear in results.
    if (!noindex) {
      if (desc.length < 110 || desc.length > 165) fail(`description ${desc.length} chars — aim 120-160`);
      if (descs.has(desc)) fail(`duplicate description, also on ${descs.get(desc)}`);
      descs.set(desc, rel);
    }
  }

  if (noindex) { console.log('  noindex (intentional)'); continue; }

  // canonical must be self-referential and match where the file actually is
  const expected = ORIGIN + rel;
  if (canon !== expected) fail(`canonical is ${canon}, page is at ${expected}`);

  // exactly one h1
  const h1s = html.match(/<h1[^>]*>/g) || [];
  if (h1s.length !== 1) fail(`${h1s.length} <h1> elements`);

  // heading levels must not skip
  const levels = [...html.matchAll(/<h([1-6])[^>]*>/g)].map(m => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail(`heading jumps h${levels[i - 1]} → h${levels[i]}`); break;
    }
  }

  // og essentials
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    if (!html.includes(`property="${prop}"`)) fail(`missing ${prop}`);
  }

  // JSON-LD must parse
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail('no structured data');
  const types = [];
  for (const [, raw] of blocks) {
    try {
      const data = JSON.parse(raw.replace(/\\u003c/g, '<'));
      types.push(data['@type']);
    } catch (e) { fail('invalid JSON-LD: ' + e.message); }
  }
  console.log('  schema: ' + types.join(', '));

  // content must be in the HTML, not injected later
  const bodyText = html.replace(/<script[\s\S]*?<\/script>/g, '')
                       .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`  rendered text: ${bodyText.split(' ').length} words`);
  if (bodyText.split(' ').length < 80) fail('almost no text in the HTML');

  // every internal link must resolve to a page we actually built
  const hrefs = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/assets/')) {
      if (!fs.existsSync(path.join(DIST, href))) fail(`asset 404: ${href}`);
    } else if (!routes.has(href)) {
      fail(`internal link 404: ${href}`);
    }
  }

  // images need dimensions (CLS) and alt text
  for (const [, tag] of html.matchAll(/<img ([^>]*)>/g)) {
    if (!/width="/.test(tag) || !/height="/.test(tag)) fail('img without width/height');
    if (!/alt="[^"]+"/.test(tag)) fail('img without alt text');
  }
}

// sitemap must list exactly the indexable pages
const sm = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`\nsitemap: ${locs.length} URLs`);
const indexable = [...routes].filter(r => {
  const f = path.join(DIST, r, 'index.html');
  return fs.existsSync(f) && !/name="robots"[^>]*noindex/.test(fs.readFileSync(f, 'utf8'));
});
for (const r of indexable) if (!locs.includes(ORIGIN + r)) fail(`sitemap missing ${r}`);
for (const l of locs) if (!indexable.includes(l.replace(ORIGIN, ''))) fail(`sitemap lists unbuilt ${l}`);

const robots = fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: ' + ORIGIN + '/sitemap.xml')) fail('robots.txt does not point at the sitemap');

console.log(problems ? `\n${problems} problem(s)` : '\nAll SEO checks pass');
process.exit(problems ? 1 : 0);
