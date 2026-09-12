#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Asserts the cultivar index's derivations against the real records:

     node tools/cultivar-test.js

   The polyphenol band is the delicate one. It is computed from whatever the
   record publishes, and the records publish four different shapes: a range, a
   single approximate figure, a band stated in words with no range, and numbers
   the source itself refuses to call typical. Getting the last two wrong would
   put a confident band on a page whose own text says there is none.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const D = require('../src/data/site');
const CI = require('../src/lib/cultivar-index');
const { cultivarList } = require('../src/lib/cultivars');

let fail = 0;
const check = (label, cond) => {
  if (cond) console.log('  ✓ ' + label);
  else { fail++; console.log('  ✗ ' + label); }
};
const rec = (slug) => D.cultivars.find((c) => c.slug === slug);
const band = (slug) => CI.phenolBand(rec(slug));

console.log('— polyphenol band —');
check('a range bands on its midpoint (picual 300–700 → High)', band('picual') === 'High');
check('a single figure bands (cobrancosa ~803 → Very high)', band('cobrancosa') === 'Very high');
check('below the EU claim threshold is Low (verdeal 108–202)', band('verdeal-transmontana') === 'Low');
check('a band stated in words survives having no range (taggiasca → Low)', band('taggiasca') === 'Low');
check('"no stable typical value" is not a band (ayvalik → null)', band('ayvalik') === null);
check('prose with no figure is not a band (kalamon → null)', band('kalamon') === null);
check('"Not published" is not a band (picudo → null)', band('picudo') === null);

console.log('\n— synonyms and lookup —');
const rows = CI.indexRows(D, cultivarList(D));
check('every record is indexed', rows.length === D.cultivars.length);
check('all 40 carry at least one synonym', rows.every((r) => r.synonyms.length > 0));
const kalamata = CI.search(rows, 'kalamata');
check('"kalamata" resolves to Kalamon', kalamata.length > 0 && kalamata[0].row.slug === 'kalamon');
check('and reports which name it matched', kalamata[0].via === 'Kalamata');
const edremit = CI.search(rows, 'edremit');
check('"edremit" resolves to Ayvalık', edremit.length > 0 && edremit[0].row.slug === 'ayvalik');
check('an exact name outranks a synonym', CI.search(rows, 'picual')[0].row.slug === 'picual');
check('an unknown name returns nothing', CI.search(rows, 'zzzz').length === 0);

console.log('\n— the mix-up callout —');
const kalamonRow = rows.find((r) => r.slug === 'kalamon');
check('Kalamon carries one', Boolean(kalamonRow.confusion));
check('and it names Koroneiki', /koroneiki/i.test(kalamonRow.confusion.text));
check('a record without one gets null', rows.find((r) => r.slug === 'memecik').confusion === null);

console.log('\n— facets —');
const facets = CI.buildFacets(rows);
const keys = facets.map((f) => f.key);
check('country, polyphenols and purpose are offered', keys.includes('country') &&
  keys.includes('phenolBand') && keys.includes('purpose'));
check('intensity is not offered while no record carries it',
  rows.every((r) => !r.intensity) ? !keys.includes('intensity') : keys.includes('intensity'));
check('every option counts what it would return', facets.every((f) =>
  f.values.every((v) => v.count === CI.filterRows(rows, { [f.key]: [v.value] }).length)));
const greece = CI.filterRows(rows, { country: ['Greece'] });
check('a country filter narrows the set', greece.length > 0 && greece.length < rows.length);
check('two facets intersect', CI.filterRows(rows, { country: ['Greece'], purpose: ['Oil'] })
  .every((r) => r.country === 'Greece' && r.purpose === 'Oil'));

console.log('\n— unpublished never reads as a value —');
check('isUnpublished catches the record spellings',
  CI.isUnpublished('Not published') && CI.isUnpublished('Not published for the oil') &&
  CI.isUnpublished('') && !CI.isUnpublished('Low'));
check('pairings drop an unpublished string',
  rows.every((r) => r.pairings.every((p) => !/not published/i.test(p))));
check('synonyms drop an unpublished string',
  rows.every((r) => r.synonyms.every((sy) => !/not published/i.test(sy))));

console.log(fail ? `\n${fail} failure(s)` : '\nAll cultivar tests pass');
process.exit(fail ? 1 : 0);
