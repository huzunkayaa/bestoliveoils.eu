/* ══════════════════════════════════════════════════════════════════════════
   Award records, derived from the oils.

   v2 draws a producer's award history as a timeline across the bottom of
   screen 04. No producer record carries one, and typing one out by hand would
   be a second copy of something the oils already state — so the timeline is
   built from `detail.awards`, which is what each oil page already shows.

   The strings are written for a reader ("Gold · NYIOOC 2026"), so the year is
   read back out of them. An award with no year in its string stays on the oil
   page and out of the timeline: a timeline is an argument about when, and a
   row with no date cannot make it.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const YEAR = /\b(19|20)\d{2}\b/;

/** "Gold · NYIOOC 2026" → { year: 2026, label: 'Gold · NYIOOC' } */
function parseAward(text) {
  const raw = String(text).trim();
  const match = raw.match(YEAR);
  if (!match) return { year: null, label: raw };
  const label = raw
    .replace(match[0], '')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[·,\s]+$/, '')
    .trim();
  return { year: Number(match[0]), label: label || raw };
}

/**
 * A producer's dated awards, newest year first, each year carrying the awards
 * won that year and the oil that won them.
 *
 * `undated` is the count left out, so the page can say so rather than quietly
 * showing fewer awards than the oils below it do.
 */
function awardTimeline(D, producer) {
  const years = new Map();
  let undated = 0;

  for (const oil of D.oils) {
    if (oil.producerSlug !== producer.slug) continue;
    for (const text of (oil.detail && oil.detail.awards) || []) {
      const { year, label } = parseAward(text);
      if (year == null) { undated++; continue; }
      const entry = years.get(year) || { year, awards: [] };
      // The same award can ride on several of a producer's oils; keep each
      // oil's claim separate, because that is what the oil pages say.
      entry.awards.push({ label, oil: oil.name, slug: oil.slug });
      years.set(year, entry);
    }
  }

  const timeline = [...years.values()]
    .map((y) => ({ ...y, awards: y.awards.sort((a, b) => a.label.localeCompare(b.label)) }))
    .sort((a, b) => b.year - a.year);

  return { timeline, undated, total: timeline.reduce((n, y) => n + y.awards.length, 0) };
}

module.exports = { parseAward, awardTimeline };
