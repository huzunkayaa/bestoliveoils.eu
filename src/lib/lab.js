/* ══════════════════════════════════════════════════════════════════════════
   Per-oil laboratory figures and the v2 sensory radar.

   v2's oil page draws a lab panel and a three-axis radar. Both are derived
   from what a record already publishes — the `facts` rows and `detail.profile`
   — rather than from a second copy of the same numbers typed into new fields.

   The care here is all about provenance. Most polyphenol figures in the
   library come from the producer's own lab report, not from a test we
   commissioned, and several records publish a specification ("≥ 500 mg/kg")
   or nothing at all. A panel headed "Independent laboratory verification"
   over a producer's own number would be a lie, so:

     - only a definite measured number gets a meter and a reading,
     - a bound or a specification stays as plain text, never a bar,
     - every figure carries the source the fact row gave it,
     - the EU 432/2012 callout appears only for a measured figure, and names
       who measured it.

   A row like "Not published by the producer; a retailer states 422 mg/kg" is
   deliberately left out of the panel. The reader still sees it verbatim in the
   facts table below — it just does not get a meter, because a meter reads as a
   measurement and that row is hearsay about one.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

/** EU 432/2012 allows the antioxidant claim from 250 mg/kg of hydroxytyrosol
    and its derivatives. */
const CLAIM_THRESHOLD = 250;
/** Ceilings that scale the meters: the legal limits for extra virgin. */
const ACIDITY_LIMIT = 0.8;
/** Top of the polyphenol scale — above the highest figure in the library, so
    a bar is readable rather than pinned. */
const PHENOL_SCALE = 900;

/**
 * Split a fact value into a number and its attribution.
 *
 * "612 mg/kg"                                → measured, no source
 * "470 mg/kg (producer lab report, 2025/26)" → measured, sourced
 * "500+ mg/kg (...)" / "≤ 0.25% (...)"       → a bound, not a measurement
 * "Not published"                            → nothing to show
 */
function parseFigure(raw) {
  if (raw == null) return null;
  const text = String(raw).trim();
  if (!text || /^not published/i.test(text)) return null;

  const sourceMatch = text.match(/\(([^)]+)\)\s*$/);
  const source = sourceMatch ? sourceMatch[1] : null;
  const head = (sourceMatch ? text.slice(0, sourceMatch.index) : text).trim();

  // A bound or a specification is a claim about a range, not a reading.
  const bounded = /^[≥≤<>]/.test(head) || /\+\s*(mg\/kg|%)?$/.test(head) ||
    /specification/i.test(text);

  const num = head.match(/(\d+(?:\.\d+)?)/);
  if (!num) return { display: head, source, measured: false, value: null };

  return {
    value: Number(num[1]),
    display: head,
    source,
    measured: !bounded,
  };
}

const factValue = (facts, pattern) => {
  const row = (facts || []).find(([k]) => pattern.test(k));
  return row ? row[1] : null;
};

const clampPct = (value, max) =>
  `${Math.max(0, Math.min(100, (value / max) * 100)).toFixed(0)}%`;

/**
 * The lab panel's contents for one oil, or null when the record publishes no
 * figure worth a panel.
 */
function labFor(oil) {
  const facts = oil.detail && oil.detail.facts;
  if (!facts) return null;

  const phenols = parseFigure(factValue(facts, /polyphenol/i));
  const acidity = parseFigure(factValue(facts, /acidity/i));
  // No record in the library publishes a peroxide value, so v2's third card
  // has nothing to render. It appears the day a record carries one.
  const peroxide = parseFigure(factValue(facts, /peroxide/i));

  const readings = [];

  if (phenols) {
    readings.push({
      key: 'polyphenols',
      label: 'Total polyphenols',
      figure: phenols,
      unit: 'mg/kg',
      pct: phenols.measured && phenols.value != null
        ? clampPct(phenols.value, PHENOL_SCALE) : null,
      tone: 'accent',
      note: `The EU 432/2012 antioxidant claim starts at ${CLAIM_THRESHOLD} mg/kg`,
    });
  }
  if (acidity) {
    readings.push({
      key: 'acidity',
      label: 'Free acidity',
      figure: acidity,
      unit: '%',
      pct: acidity.measured && acidity.value != null
        ? clampPct(acidity.value, ACIDITY_LIMIT) : null,
      tone: 'accent-2',
      note: 'Extra virgin is capped at 0.80% — lower means fresher fruit',
    });
  }
  if (peroxide) {
    readings.push({
      key: 'peroxide',
      label: 'Peroxide value',
      figure: peroxide,
      unit: 'meq O₂/kg',
      pct: peroxide.measured && peroxide.value != null
        ? clampPct(peroxide.value, 20) : null,
      tone: 'accent-2',
      note: 'Extra virgin is capped at 20 — it measures oxidation',
    });
  }

  if (!readings.length) return null;

  // The claim is only ours to state when there is a measured figure behind it.
  const claim = phenols && phenols.measured && phenols.value >= CLAIM_THRESHOLD
    ? { value: phenols.value, source: phenols.source }
    : null;

  return { readings, claim };
}

/* ── sensory radar ────────────────────────────────────────────────────────
   v2 replaces v1's three bars with a triangle. Fruity sits at the top, then
   bitter and pungent at 120° intervals, and each vertex is pushed out by that
   axis's own score — so the shape is the reading, not decoration. */

const CX = 140;
const CY = 140;
const R = 100;
const AXES = [
  { match: /fruit/i, label: 'Fruity', angle: -90 },
  { match: /bitter/i, label: 'Bitter', angle: 30 },
  { match: /pungen/i, label: 'Pungent', angle: 150 },
];

const point = (angle, radius) => {
  const rad = (angle * Math.PI) / 180;
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
};

const ring = (radius) =>
  AXES.map(({ angle }) => point(angle, radius).map((n) => n.toFixed(1)).join(',')).join(' ');

/**
 * Turn `detail.profile` into the three axes the radar needs.
 *
 * Returns null unless all three are present — a two-sided triangle is not a
 * reading, and half a radar is worse than the bars it replaced.
 */
function radarAxes(profile) {
  if (!Array.isArray(profile)) return null;
  const axes = AXES.map((axis) => {
    const row = profile.find((p) => axis.match.test(p.label));
    if (!row) return null;
    const pct = parseFloat(String(row.pct));
    if (!Number.isFinite(pct)) return null;
    return { label: axis.label, angle: axis.angle, pct, score: (pct / 10).toFixed(1), desc: row.desc };
  });
  return axes.every(Boolean) ? axes : null;
}

module.exports = {
  CLAIM_THRESHOLD, ACIDITY_LIMIT, PHENOL_SCALE,
  parseFigure, labFor, radarAxes,
  radarGeometry: { CX, CY, R, point, ring },
};
