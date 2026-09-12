#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Renders the Learn templates against synthetic records and asserts what came
   out. No browser, no network, no dependencies:

     node tools/learn-test.js

   Why this exists: the article page supports block types no published guide
   uses yet — a pull quote, a data table, an embedded oil card, a sourcing
   note. Shipping a renderer that nothing exercises is shipping a renderer
   nobody has seen work. The alternative was inventing an article to show them
   off, which would put invented writing on a site whose whole claim is that it
   does not do that. So the blocks are proved here instead.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const D = require('../src/data/site');
const pages = require('../src/lib/pages');

let fail = 0;
const check = (label, cond) => {
  if (cond) console.log('  ✓ ' + label);
  else { fail++; console.log('  ✗ ' + label); }
};

/* A guide is cloned from the real one so every required field is present, then
   its body is replaced with one block of each type. */
const base = D.guides[0];
const stockedOil = D.oils.find((o) => o.inShop) || D.oils[0];

const specimen = {
  ...base,
  slug: 'specimen',
  category: base.category,
  toc: [{ id: 'blocks', label: '1. Blocks' }],
  keyFigures: [{ value: '1.38 M t', label: 'Spain, five-year average' }],
  sections: [{
    id: 'blocks',
    heading: '1. Blocks',
    blocks: [
      { type: 'p', text: 'An ordinary paragraph.' },
      { type: 'callout', kicker: 'Panel note', text: 'A callout.' },
      { type: 'pull', text: 'Read the small print, not the flag.' },
      { type: 'oil', slug: stockedOil.slug, kicker: 'Mentioned in this guide' },
      {
        type: 'table',
        columns: ['Country', 'Production', 'Share'],
        rows: [['Spain', '1,380,000 t', '43'], ['Italy', '290,000 t', '9']],
        barColumn: 2,
        caption: 'Five-year averages, International Olive Council.',
      },
      {
        type: 'sources',
        kicker: 'How we sourced this',
        text: 'Where the figures came from.',
        items: [{ label: 'IOC World Catalogue', url: 'https://example.org/ioc' }],
      },
    ],
  }],
};

const withSpecimen = { ...D, guides: [...D.guides, specimen] };
const html = pages.guide(withSpecimen, specimen);

console.log('— article blocks —');
check('paragraph renders', html.includes('An ordinary paragraph.'));
check('callout renders', html.includes('article-callout') && html.includes('Panel note'));
check('pull quote renders', html.includes('article-pull') && html.includes('not the flag'));
check('embedded oil card renders', html.includes('article-oil') && html.includes(stockedOil.name));
check('embedded oil links to its report', html.includes(`/oils/${stockedOil.slug}/`));
check('table renders with a caption', html.includes('article-table') && html.includes('International Olive Council'));
check('share column becomes a bar', html.includes('article-share') && html.includes('<div class="meter">'));
check('largest share is the full bar', html.includes('width:100%'));
check('sources block renders its list', html.includes('article-sources') && html.includes('IOC World Catalogue'));
check('key figures rail renders', html.includes('article-rail') && html.includes('1.38 M t'));

/* Markup safety: a block's text is data, never markup. */
const nasty = {
  ...specimen,
  slug: 'nasty',
  sections: [{ id: 'blocks', heading: '1. Blocks', blocks: [{ type: 'pull', text: '<script>x</script>' }] }],
};
const nastyHtml = pages.guide({ ...D, guides: [...D.guides, nasty] }, nasty);
check('block text is escaped, not injected', !nastyHtml.includes('<script>x</script>'));

console.log('\n— empty states —');
const noRail = { ...specimen, slug: 'norail', keyFigures: undefined };
const noRailHtml = pages.guide({ ...D, guides: [noRail] }, noRail);
check('rail is dropped when there is nothing for it', !noRailHtml.includes('class="article-rail"'));
check('layout falls back to two columns', !noRailHtml.includes('article-layout--rail'));

const relatedHtml = pages.guide(
  { ...D, guides: [specimen, { ...base, slug: 'sibling', title: 'A sibling guide' }] },
  specimen);
check('related guides appear for the same category', relatedHtml.includes('A sibling guide'));

console.log('\n— hub —');
const oneCategory = pages.learnIndex(D);
check('category strip hidden while one shelf has content', !oneCategory.includes('learn-cats__grid'));
check('feature block renders the newest guide', oneCategory.includes('learn-feature') && oneCategory.includes(base.title));

const spread = {
  ...D,
  guides: [base, { ...base, slug: 'kitchen-guide', category: 'kitchen', title: 'A kitchen guide' }],
};
check('category strip appears once two shelves have content',
  pages.learnIndex(spread).includes('learn-cats__grid'));

console.log(fail ? `\n${fail} failure(s)` : '\nAll Learn tests pass');
process.exit(fail ? 1 : 0);
