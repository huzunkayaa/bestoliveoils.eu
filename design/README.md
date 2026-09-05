# Design files — bestoliveoils.eu

Hi-fi mockups for the public site and the admin panel. Open the `.dc.html` files in a browser to view them; they are plain HTML with inline styles and load the design tokens from `_ds/.../styles.css`.

## Files

- `Olive Oil Library.dc.html` — public site, 5 screens (top to bottom):
  - `00 Homepage` — hero + search, "Top rated this month", "Explore by region", "Learn", shop band, footer
  - `01 Library` — search, filter sidebar (region, cultivar, intensity, min rating, in shop, organic), 3-col card grid with "In our shop" badge
  - `02 Oil detail` — bottle photo, tags, expert rating (first) + reader rating, description, **Where to buy button → olijfoliemarkt.nl**, tasting profile bars, facts table, awards, region map, pairings, reviews, inline "Write a review" form
  - `03 Producer` — hero, stats, shop CTA, oils table (with per-row Where to buy), estate text, map
  - `04 Article` — title, standfirst, hero image, sticky TOC with an embedded oil card + Where to buy, article body, panel note callout
- `Admin Panel.dc.html` — admin, 6 screens: `A1 Dashboard`, `A2 Oils list`, `A3 Oil form`, `A4 Producer form`, `A5 Article editor`, `A6 Review queue`. Not in scope for the first build; kept for reference.
- `_ds/organic-*/styles.css` — **the design tokens and component classes**. Use these values verbatim (colors, fonts, radii, shadows, `.btn`, `.tag`, `.card`, `.input`, `.seg`, `.radio`, `.table`, `.nav`).

## Rules for implementing

1. Read `styles.css` first; copy its `:root` variables into the project's global CSS. Fonts: Caprasimo (headings) + Figtree (body) via Google Fonts.
2. Match each screen's structure from the `.dc.html` markup (it is inline-styled HTML; `{{ }}` holes are data, `<sc-for>` is a loop, `<image-slot>` is an image placeholder).
3. "In our shop" badge and "Where to buy" button appear **only when `shopUrl` is set** on an oil. Button opens `shopUrl` in a new tab.
4. Expert rating is shown before reader rating. Ratings are 0–5 stars.
5. Every oil/producer/article has `status: draft | published`; only published items appear on the public site.
6. Do not modify screens that already exist in the codebase unless asked; add the missing ones.
