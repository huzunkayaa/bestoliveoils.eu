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

  const row = (slug, name, record) => {
    const existing = found.get(slug);
    if (existing) return existing;
    const fresh = {
      slug,
      name,
      record: record || null,
      oils: [],
      regions: new Map(),
      producers: new Set(),
    };
    found.set(slug, fresh);
    return fresh;
  };

  for (const oil of D.oils) {
    const f = facetsFor(oil);
    f.cultivars.forEach((slug, i) => {
      if (skip.has(slug)) return;
      const entry = row(slug, f.cultivarNames[i], records.get(slug));
      entry.oils.push(oil);
      entry.producers.add(oil.producer);
      const r = splitRegion(oil.region);
      entry.regions.set(r.slug, { slug: r.slug, name: r.name, country: r.country });
    });
  }

  /* A written-up variety belongs on the hub whether or not the library holds
     an oil of it. Most of the 40 records are varieties we have read about and
     not yet bought — the page is the reference, and the shelf of oils is the
     part that waits. Their count is 0 and every count-shaped thing on the page
     hides itself. */
  for (const record of records.values()) {
    if (skip.has(record.slug)) continue;
    row(record.slug, record.name, record);
  }

  return [...found.values()]
    .map((entry) => ({
      ...entry,
      // A record's name is the one we spell consistently; the oils' spelling
      // is the fallback for a variety nobody has written up yet.
      name: entry.record ? entry.record.name : entry.name,
      regions: [...entry.regions.values()].sort((a, b) => a.name.localeCompare(b.name)),
      producers: [...entry.producers].sort(),
      count: entry.oils.length,
      hasPage: hasPage(entry.record),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/* The varieties with pages, in the hub's order — what build.js walks. */
const cultivarPages = (D) => cultivarList(D).filter((c) => c.hasPage);

/* The comparison table on a cultivar page: every record that carries the four
   reference columns, with the one being read marked. A record with no page of
   its own still belongs here — that is the whole point of a comparison. */
/* The comparison table on a cultivar page. Every record supplies its own row
   through `compare`, so the table assembles itself from whichever varieties
   the page decides to show — and the one being read is marked.

   Forty rows is a wall, not a comparison, so a page shows its own row plus the
   best-known varieties of the same country and the four reference varieties
   the rest of the site already compares against. */
const REFERENCE_SLUGS = ['picual', 'coratina', 'koroneiki', 'arbequina'];

const comparison = (D, current, limit = 8) => {
  const all = (D.cultivars || []).filter((c) => c.compare && c.compare.origin);
  const self = all.find((c) => c.slug === current);
  const picked = new Map();
  const take = (c) => { if (c && !picked.has(c.slug)) picked.set(c.slug, c); };

  take(self);
  // References first, so a page always compares outward to the varieties the
  // rest of the site benchmarks against; then its own country fills the rest.
  REFERENCE_SLUGS.forEach((slug) => take(all.find((c) => c.slug === slug)));
  if (self) all.filter((c) => c.country === self.country).forEach(take);

  return [...picked.values()]
    .slice(0, limit)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      origin: c.compare.origin,
      phenolRange: c.compare.polyphenols,
      sensory: c.compare.sensory,
      pairing: c.compare.pairing,
      current: c.slug === current,
    }));
};

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
