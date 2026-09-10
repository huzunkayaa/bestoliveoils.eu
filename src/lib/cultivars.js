/* ══════════════════════════════════════════════════════════════════════════
   Cultivars — the varieties, joined to the oils that carry them.

   The list of varieties is derived from the oils (facets.js already splits an
   oil's `cultivar` field into its parts), and the editorial detail comes from
   the `cultivars` records in site.js. Neither half invents the other: a
   variety exists because an oil says so, and it has something to say about
   itself only if someone wrote it down.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const { facetsFor, splitRegion } = require('./facets');

/* A record earns /cultivars/<slug>/ once it has a lede and a grove write-up.
   Below that it is a reference row: real enough for the comparison table and
   the hub, too thin to be a page a search engine should index. */
const hasPage = (record) =>
  Boolean(record && record.lede && record.grove && record.grove.length);

/* Every variety the oils mention, in descending order of how many carry it,
   each joined to its record (if any) and the oils behind it.

   `notCultivars` filters out the values that are not varieties at all. They
   stay in the library's filter — that is what the oil's own label says — but
   they are not offered here as something to read about. */
function cultivarList(D) {
  const records = new Map((D.cultivars || []).map((c) => [c.slug, c]));
  const skip = new Set(D.notCultivars || []);
  const found = new Map();

  for (const oil of D.oils) {
    const f = facetsFor(oil);
    f.cultivars.forEach((slug, i) => {
      if (skip.has(slug)) return;
      const row = found.get(slug) || {
        slug,
        name: f.cultivarNames[i],
        record: records.get(slug) || null,
        oils: [],
        regions: new Map(),
        producers: new Set(),
      };
      row.oils.push(oil);
      row.producers.add(oil.producer);
      const r = splitRegion(oil.region);
      row.regions.set(r.slug, { slug: r.slug, name: r.name, country: r.country });
      found.set(slug, row);
    });
  }

  return [...found.values()]
    .map((row) => ({
      ...row,
      // A record's name is the one we spell consistently; the oils' spelling
      // is the fallback for a variety nobody has written up yet.
      name: row.record ? row.record.name : row.name,
      regions: [...row.regions.values()].sort((a, b) => a.name.localeCompare(b.name)),
      producers: [...row.producers].sort(),
      count: row.oils.length,
      hasPage: hasPage(row.record),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/* The varieties with pages, in the hub's order — what build.js walks. */
const cultivarPages = (D) => cultivarList(D).filter((c) => c.hasPage);

/* The comparison table on a cultivar page: every record that carries the four
   reference columns, with the one being read marked. A record with no page of
   its own still belongs here — that is the whole point of a comparison. */
const comparison = (D, current) =>
  (D.cultivars || [])
    .filter((c) => c.origin && c.phenolRange && c.sensory && c.pairing)
    .map((c) => ({ ...c, current: c.slug === current }));

/* The slugs that have a page, for the callers that only need to ask "is this
   one a link?" — every oil page asks it, so the answer is derived once. */
const pagedCache = new WeakMap();
function pagedSlugs(D) {
  let set = pagedCache.get(D);
  if (!set) {
    set = new Set(cultivarPages(D).map((c) => c.slug));
    pagedCache.set(D, set);
  }
  return set;
}

module.exports = { cultivarList, cultivarPages, pagedSlugs, comparison, hasPage };
