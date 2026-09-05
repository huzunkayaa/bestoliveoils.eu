# Instructions for Claude Code — bestoliveoils.eu

Read `design/README.md`, `design/content-schema.md` and `design/_ds/*/styles.css` before touching UI.

- Stack: Next.js (App Router) + file-based content in `content/`; Supabase only for reader reviews.
- Routes: `/` (00 Homepage), `/oils` (01 Library), `/oils/[slug]` (02), `/producers/[slug]` (03), `/learn/[slug]` (04).
- Design tokens come from `styles.css` — never invent colors or fonts.
- Show "In our shop" + "Where to buy" only when `shopUrl` is set; link opens in a new tab.
- Only `status: published` content renders publicly.
- When asked to add an oil/producer/article: create the file per `content-schema.md`, validate required fields, set `status: draft` unless told to publish, then commit with message `content: add <name>`.
- Do not rewrite screens that already exist; extend them to match the mockups.
