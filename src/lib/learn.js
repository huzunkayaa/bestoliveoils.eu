/* ══════════════════════════════════════════════════════════════════════════
   Learn — guides, joined to the categories they sit in.

   Same split as the cultivars: `guides` is the writing, `learnCategories` is
   the shelf it goes on, and neither invents the other. A category exists
   because someone defined it; it appears on the hub because a published guide
   is in it.

   The v2 hub draws a six-card category grid, an editor's feature and a rail of
   most-read links. Only the first two are built. "Most read" needs analytics
   we do not collect, and a card that ranks four guides when three exist is a
   chart of nothing.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

/** The published guides, newest first. */
const published = (D) =>
  [...(D.guides || [])].sort((a, b) =>
    String(b.datePublished || '').localeCompare(String(a.datePublished || '')));

const categoryOf = (D, slug) =>
  (D.learnCategories || []).find((c) => c.slug === slug) || null;

const categoryName = (D, slug) => {
  const c = categoryOf(D, slug);
  return c ? c.name : '';
};

/** Categories that actually hold a published guide, with their counts. */
function categoriesWithContent(D) {
  const guides = published(D);
  return (D.learnCategories || [])
    .map((c) => ({
      ...c,
      guides: guides.filter((g) => g.category === c.slug),
    }))
    .filter((c) => c.guides.length > 0)
    .map((c) => ({ ...c, count: c.guides.length }));
}

/** The piece the hub leads with: the most recently published guide. */
const featuredGuide = (D) => published(D)[0] || null;

/** Other guides on the same shelf — the article page's "More in …" rail. */
const relatedGuides = (D, guide, limit = 3) =>
  published(D)
    .filter((g) => g.slug !== guide.slug && g.category === guide.category)
    .slice(0, limit);

/**
 * The hub's list below the feature: every published guide except the one
 * already featured, followed by the pieces that are written up as coming.
 * A planned row is never a link — `articles` carries `href: null` until the
 * guide exists, and the row says "coming soon" rather than 404ing.
 */
function hubRows(D) {
  const featured = featuredGuide(D);
  const written = new Set((D.guides || []).map((g) => g.slug));
  return (D.articles || []).filter((a) => {
    if (featured && a.slug === featured.slug) return false;
    // A teaser whose guide exists is a real row; one whose guide does not is
    // the "coming soon" placeholder.
    return true;
  }).map((a) => ({ ...a, exists: written.has(a.slug) }));
}

module.exports = {
  published, categoryOf, categoryName, categoriesWithContent,
  featuredGuide, relatedGuides, hubRows,
};
