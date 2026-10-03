/* ══════════════════════════════════════════════════════════════════════════
   Facets — the filterable properties of an oil, derived from its record.

   The library filters are built from these at build time (so the option lists
   and their counts describe the oils that actually exist) and re-evaluated in
   the browser by app.js against the same values, emitted as data- attributes
   on each card. One definition, used on both sides, so the two can't drift.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

/* Diacritics off, so "bailen" typed without the accent still finds "Bailén".
   app.js runs the identical transform on the query. */
const fold = (s) =>
  String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const slug = (s) =>
  String(s)
    .replace(/ı/g, 'i').replace(/I/g, 'I')                // Ayvalık → Ayvalik: dotless ı has no NFD decomposition
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // Bailén → Bailen
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* `region` is written for display as "Andalusia · Spain". The first part is the
   region, the second the country. */
function splitRegion(region) {
  const [name, country] = String(region).split('·').map((s) => s.trim());
  return { name, country: country || '', slug: slug(name) };
}

/* Spelling variants that are the same variety. An oil's label is left exactly
   as the producer writes it — six oils say "Picuda" — but the slug behind it
   has to be the one the cultivar record uses, or those oils never reach the
   page written about them and the page reports zero oils. The record's "Also
   called" row is where a reader sees the other name. */
const CULTIVAR_SYNONYMS = {
  picuda: 'picudo',
  picuo: 'picudo',
  marteno: 'picual',
  // Turkish labels: Trilye is the Gemlik olive under its Mudanya name, and
  // "Edremit" is what the Edremit Gulf calls Ayvalık.
  trilye: 'gemlik',
  edremit: 'ayvalik',
  'edremit-yaglik': 'ayvalik',
};

const cultivarSlug = (name) => {
  const s = slug(name);
  return CULTIVAR_SYNONYMS[s] || s;
};

/* `cultivar` may be one name, a "A · B" pair, or "<name> blend". */
function cultivars(oil) {
  return String(oil.cultivar)
    .split('·')
    .map((c) => c.trim().replace(/\s+blend$/i, ''))
    .filter(Boolean);
}

/* No explicit `organic` field exists yet, so it is read off the write-up: the
   tag the detail page shows, or an EU Organic certification in the facts. Give
   a record an `organic: true` field and it wins over both. */
function isOrganic(oil) {
  if (typeof oil.organic === 'boolean') return oil.organic;
  const d = oil.detail;
  if (!d) return false;
  if ((d.tags || []).some((t) => /organic/i.test(t))) return true;
  return (d.facts || []).some(([, value]) => /organic/i.test(String(value)));
}

function facetsFor(oil) {
  const region = splitRegion(oil.region);
  const cvs = cultivars(oil);
  return {
    region: region.slug,
    regionName: region.name,
    country: region.country,
    cultivars: cvs.map(cultivarSlug),
    cultivarNames: cvs,
    intensity: slug(oil.intensity),
    intensityName: oil.intensity,
    score: Number(oil.score) || 0,
    inShop: Boolean(oil.inShop),
    organic: isOrganic(oil),
    // What the search box matches against, accent-folded.
    text: fold([oil.name, oil.producer, oil.cultivar, region.name, region.country].join(' ')),
  };
}

/* Option lists for the sidebar, each with the number of oils behind it. Only
   values that exist are offered — an option that can only ever return nothing
   is worse than no option. */
function facetLists(oils) {
  const all = oils.map(facetsFor);

  const tally = (pick) => {
    const counts = new Map();
    all.forEach((f) => {
      for (const [key, label] of pick(f)) {
        const row = counts.get(key) || { key, label, count: 0 };
        row.count++;
        counts.set(key, row);
      }
    });
    return [...counts.values()];
  };

  const regions = tally((f) => [[f.region, `${f.country} · ${f.regionName}`]])
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  const cultivarList = tally((f) => f.cultivars.map((c, i) => [c, f.cultivarNames[i]]))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

  /* Fixed order — delicate to robust is a scale, not a ranking. Catalogue
     entries whose producer states no intensity land outside that scale, so
     they sort last rather than at the head of it. */
  const ORDER = ['delicate', 'medium', 'robust'];
  const rank = (key) => (ORDER.indexOf(key) === -1 ? ORDER.length : ORDER.indexOf(key));
  const intensities = tally((f) => [[f.intensity, f.intensityName]])
    .sort((a, b) => rank(a.key) - rank(b.key) || a.label.localeCompare(b.label));

  return {
    regions,
    cultivars: cultivarList,
    intensities,
    inShop: all.filter((f) => f.inShop).length,
    organic: all.filter((f) => f.organic).length,
    total: all.length,
  };
}

module.exports = { fold, slug, splitRegion, cultivars, isOrganic, facetsFor, facetLists };
