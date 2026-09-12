/* ══════════════════════════════════════════════════════════════════════════
   The cultivars index — rows, facets and the lookup behind the typeahead.

   Everything here is derived from the `cultivars` records. The design draws
   chips with counts, a synonym search, a polyphenol band and an intensity
   band; only the first three have data behind them, so only those are offered.
   A facet that cannot separate the set is not a filter, it is decoration.

   The rule the whole section runs on: an unpublished value reads "Not
   published" and is never estimated, banded from prose, or left blank so it
   looks like an oversight.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const NOT_PUBLISHED = 'Not published';

const refRow = (record, re) => {
  const row = (record.reference || []).find(([label]) => re.test(label));
  return row ? String(row[1]) : null;
};

const isUnpublished = (value) => !value || /^not published/i.test(String(value).trim());

/* ── synonyms ─────────────────────────────────────────────────────────────
   The "Also called" row, split into the names a reader might actually type.
   This is what makes the index findable: most people arrive holding a label
   that says Kalamata, Edremit or Bianchera, not the cultivar's own name. */
function synonyms(record) {
  const raw = refRow(record, /also called/i);
  if (isUnpublished(raw)) return [];
  return String(raw)
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ── pairings ─────────────────────────────────────────────────────────────
   `compare.pairing` is written as a sentence fragment for the comparison
   table; the cards want it as chips. */
function pairings(record) {
  const raw = record.compare && record.compare.pairing;
  if (isUnpublished(raw)) return [];
  return String(raw).split(/,/).map((s) => s.trim()).filter(Boolean);
}

/* ── polyphenol band ──────────────────────────────────────────────────────
   The design colours a card by band rather than printing a range. The band is
   computed from the midpoint of the range the record publishes — never from
   prose, and never for a record that publishes no figure.

   The 250 boundary is not arbitrary: it is the threshold EU 432/2012 sets for
   the antioxidant claim, which is the only externally defined line on this
   scale. The rest divide the published spread into readable steps.  */
const BANDS = [
  { name: 'Low', max: 250 },
  { name: 'Medium', max: 500 },
  { name: 'High', max: 800 },
  { name: 'Very high', max: Infinity },
];

/* A record can state a band in words instead of a range ("Low (no measured
   range published)"), and it can publish numbers while explicitly refusing to
   call them typical ("Reported 46–235 mg/kg; no stable typical value"). Both
   have to be honoured: the first is a published band and the second is not one,
   whatever arithmetic the numbers would allow. */
const BAND_WORD = /\b(very high|high|medium|low)\b/i;
const DISCLAIMED = /no stable typical value|no measured range published|no agreed|not comparable/i;

function bandWord(text) {
  const match = String(text).match(BAND_WORD);
  if (!match) return null;
  const found = match[1].toLowerCase();
  return (BANDS.find((b) => b.name.toLowerCase() === found) || {}).name || null;
}

function phenolBand(record) {
  const raw = record.compare && record.compare.polyphenols;
  if (isUnpublished(raw)) return null;

  // A source that disclaims a typical value has not published one. Only a band
  // it states in words survives that.
  if (DISCLAIMED.test(String(raw))) return bandWord(raw);

  const numbers = (String(raw).match(/\d+(?:\.\d+)?/g) || []).map(Number);
  if (!numbers.length) return bandWord(raw);

  const midpoint = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  return (BANDS.find((b) => midpoint < b.max) || BANDS[BANDS.length - 1]).name;
}

/* ── the mix-up callout ───────────────────────────────────────────────────
   Five records carry a reference row that exists precisely to stop a
   misidentification — "Kalamata PDO olive oil is made from Koroneiki, not
   Kalamon". The design gives that its own panel, because it is the single most
   useful thing on the page for whoever arrived holding the wrong name. */
const CONFUSION = /^(name warning|not the same as|contested|genetics|hurma)$/i;

function confusion(record) {
  const row = (record.reference || []).find(([label]) => CONFUSION.test(label));
  if (!row || isUnpublished(row[1])) return null;
  return { label: row[0], text: String(row[1]) };
}

/* ── intensity ────────────────────────────────────────────────────────────
   The design filters and chips by Delicate / Medium / Robust. No record
   carries it: classifying forty varieties by mouthfeel is a panel's job, and
   reading it out of the sensory prose would be exactly the kind of guess this
   section exists to avoid. The field is read if it is ever added; until then
   every card says so and the facet does not appear. */
const intensity = (record) => record.intensity || null;

const shelfStability = (record) => {
  const raw = refRow(record, /shelf stability/i);
  return isUnpublished(raw) ? null : raw;
};

/* ── rows ─────────────────────────────────────────────────────────────── */

function indexRows(D, joined) {
  const counts = new Map((joined || []).map((c) => [c.slug, c.count]));
  return (D.cultivars || []).map((record) => ({
    slug: record.slug,
    name: record.name,
    country: record.country,
    region: record.originRegion || '',
    purpose: record.purpose || null,
    intensity: intensity(record),
    phenolBand: phenolBand(record),
    phenolRange: (record.compare && record.compare.polyphenols) || NOT_PUBLISHED,
    shelf: shelfStability(record),
    synonyms: synonyms(record),
    pairings: pairings(record),
    confusion: confusion(record),
    sensory: (record.compare && record.compare.sensory) || NOT_PUBLISHED,
    oils: counts.get(record.slug) || 0,
    record,
  }));
}

/* ── facets ───────────────────────────────────────────────────────────────
   Built from the rows, so a value can only be offered when something carries
   it, and each option shows how many it would leave. A facet whose values
   cannot separate the set — one distinct value, or none — is dropped. */
const FACET_DEFS = [
  { key: 'country', label: 'Country' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'phenolBand', label: 'Polyphenols' },
  { key: 'purpose', label: 'Used for' },
];

const BAND_ORDER = ['Low', 'Medium', 'High', 'Very high', NOT_PUBLISHED];
const PURPOSE_ORDER = ['Oil', 'Dual-purpose', 'Table'];

function orderValues(key, values) {
  if (key === 'phenolBand') {
    return BAND_ORDER.filter((v) => values.includes(v));
  }
  if (key === 'purpose') {
    return PURPOSE_ORDER.filter((v) => values.includes(v))
      .concat(values.filter((v) => !PURPOSE_ORDER.includes(v)));
  }
  const named = values.filter((v) => v !== NOT_PUBLISHED).sort((a, b) => a.localeCompare(b));
  return values.includes(NOT_PUBLISHED) ? named.concat(NOT_PUBLISHED) : named;
}

function buildFacets(rows, active = {}) {
  return FACET_DEFS.map((def) => {
    const valueOf = (row) => row[def.key] || NOT_PUBLISHED;
    const present = [...new Set(rows.map(valueOf))];
    if (present.length < 2) return null;

    // The count each option would return alongside the *other* active facets,
    // so a chip never promises a number the click will not deliver.
    const others = { ...active };
    delete others[def.key];
    const base = filterRows(rows, others);

    return {
      key: def.key,
      label: def.label,
      values: orderValues(def.key, present).map((value) => ({
        value,
        count: base.filter((row) => valueOf(row) === value).length,
        active: (active[def.key] || []).includes(value),
      })),
    };
  }).filter(Boolean);
}

function filterRows(rows, active = {}) {
  return rows.filter((row) =>
    FACET_DEFS.every((def) => {
      const wanted = active[def.key];
      if (!wanted || !wanted.length) return true;
      return wanted.includes(row[def.key] || NOT_PUBLISHED);
    }));
}

/* ── search ───────────────────────────────────────────────────────────────
   Matches the variety's own name and every synonym, accent-folded, so
   "kalamata" finds Kalamon and says why. */
const fold = (s) =>
  String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function search(rows, query) {
  const q = fold(query).trim();
  if (!q) return [];
  return rows
    .map((row) => {
      const name = fold(row.name);
      const synonym = row.synonyms.find((s) => fold(s).includes(q));
      if (name.includes(q)) return { row, via: null, rank: name.startsWith(q) ? 0 : 1 };
      if (synonym) return { row, via: synonym, rank: 2 };
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => a.rank - b.rank || a.row.name.localeCompare(b.row.name));
}

const synonymCount = (rows) => rows.reduce((n, row) => n + row.synonyms.length, 0);

module.exports = {
  NOT_PUBLISHED, BANDS, FACET_DEFS,
  synonyms, pairings, phenolBand, confusion, intensity, shelfStability,
  indexRows, buildFacets, filterRows, search, synonymCount, isUnpublished,
};
