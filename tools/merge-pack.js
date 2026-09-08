#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Merge a content pack into src/data/site.js.

     node tools/merge-pack.js <pack.records.js> [--null-image=slug,slug]

   A pack is a module exporting `{ producers: [...], oils: [...], guides: [...] }`
   with records in the shape of site.js. Each record replaces the one with the
   same slug, or is appended.

   Records are spliced in as SOURCE TEXT, so site.js keeps its comments and
   formatting. The apply-pack.js that ships inside the packs re-serialises the
   whole file through JSON and drops every comment; the pack READMEs ask for the
   comments to be kept, so this exists instead.

   --null-image sets `image: null` on the named oils, for when the pack points at
   photos that could not be fetched. `npm run check` fails on a missing file, so
   this is the honest way to ship the page with a placeholder.

   Two traps this handles, both of which produced silently wrong merges the
   first time round:
     · Slug lookups are scoped to the TOP-LEVEL `oils:` / `producers:` array. A
       producer record contains its own one-line `oils` table with the same
       slugs, and an unscoped search matches those instead — in the pack as well
       as in site.js, because packs list `producers` before `oils`.
     · Every extracted block is parsed before it is written, and the comment
       count is compared before and after.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const fs = require('fs');
const path = require('path');

const SITE = path.join(__dirname, '..', 'src', 'data', 'site.js');

/* Byte range of a top-level array's contents. Anchored on two-space indentation
   so it cannot match a nested `oils: [` inside a producer record. */
function arrayRange(text, key) {
  const at = text.indexOf(`\n  ${key}: [`);
  if (at === -1) throw new Error(`cannot find top-level array "${key}"`);
  const open = text.indexOf('[', at);
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) return { open, close: i }; }
  }
  throw new Error(`unterminated array "${key}"`);
}

/* The object literal holding `slug: '<slug>'`, searched only inside `range`. */
function findBlock(text, slug, range) {
  const at = text.indexOf(`slug: '${slug}',`, range.open);
  if (at === -1 || at > range.close) return null;

  const brace = text.lastIndexOf('{', at);
  let start = brace;
  const lineStart = text.lastIndexOf('\n', brace) + 1;
  if (text.slice(lineStart, brace).trim() === '') start = lineStart;

  let depth = 0;
  let i = brace;
  for (; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  while (text[i] === ',') i++;
  if (text[i] === '\n') i++;
  return { start, end: i, text: text.slice(start, i) };
}

function assertParses(block, label) {
  try { new Function('return ' + block.replace(/,\s*$/, '')); }
  catch (e) { throw new Error(`block ${label} does not parse: ${e.message}`); }
}

function main() {
  const args = process.argv.slice(2);
  const packArg = args.find((a) => !a.startsWith('--'));
  if (!packArg) {
    console.error('usage: node tools/merge-pack.js <pack.records.js> [--null-image=slug,slug]');
    process.exit(2);
  }
  const nullImages = new Set(
    (args.find((a) => a.startsWith('--null-image=')) || '').replace('--null-image=', '')
      .split(',').filter(Boolean));

  const packPath = path.resolve(packArg);
  const packText = fs.readFileSync(packPath, 'utf8');
  const pack = require(packPath);
  const before = fs.readFileSync(SITE, 'utf8');
  let site = before;
  const log = [];

  const upsert = (slug, key) => {
    const src = findBlock(packText, slug, arrayRange(packText, key));
    if (!src) throw new Error(`pack has no top-level ${key} record for "${slug}"`);
    assertParses(src.text, `pack:${slug}`);

    let block = src.text;
    if (nullImages.has(slug)) {
      const nulled = block.replace(/^(\s*)image: \{[^\n]*\},$/m, '$1image: null,');
      if (nulled === block) throw new Error(`could not null the image on "${slug}"`);
      assertParses(nulled, `pack:${slug} (image nulled)`);
      block = nulled;
    }

    const range = arrayRange(site, key);
    const existing = findBlock(site, slug, range);
    if (existing) {
      site = site.slice(0, existing.start) + block + site.slice(existing.end);
      log.push(`  replaced  ${key}/${slug}`);
    } else {
      const lineStart = site.lastIndexOf('\n', range.close) + 1;
      site = site.slice(0, lineStart) + block + site.slice(lineStart);
      log.push(`  appended  ${key}/${slug}`);
    }
  };

  for (const p of pack.producers || []) upsert(p.slug, 'producers');
  for (const o of pack.oils || []) upsert(o.slug, 'oils');
  for (const g of pack.guides || []) upsert(g.slug, 'guides');

  const countComments = (s) => (s.match(/^\s*(\/\*|\/\/|\*)/gm) || []).length;
  const commentsBefore = countComments(before);
  const commentsAfter = countComments(site);
  if (commentsAfter < commentsBefore) {
    throw new Error(`comments were lost: ${commentsBefore} → ${commentsAfter}`);
  }

  fs.writeFileSync(SITE, site);
  console.log(log.join('\n'));
  console.log(`\ncomment lines: ${commentsBefore} → ${commentsAfter}`);
  console.log('Now run: npm run check');
}

main();
