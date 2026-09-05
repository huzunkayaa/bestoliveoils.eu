# Content schema (file-based, option 1)

Content lives in the repo as JSON/Markdown; Claude Code adds or edits files and commits. The site reads these at build time.

```
content/
  oils/<slug>.json
  producers/<slug>.json
  articles/<slug>.md        (frontmatter + body)
  regions.json
  cultivars.json
public/images/oils/<slug>.jpg, producers/<slug>.jpg, articles/<slug>.jpg
```

## oils/<slug>.json

```json
{
  "slug": "finca-la-torre-picual",
  "name": "Finca La Torre Picual",
  "producer": "finca-la-torre",
  "region": "andalusia",
  "country": "Spain",
  "cultivars": ["Picual"],
  "intensity": "robust",
  "harvest": "October 2025, early",
  "bottleSize": "500 ml",
  "organic": true,
  "protectedOrigin": "DOP Antequera",
  "description": "An early-harvest Picual with the grassy, tomato-leaf character…",
  "analysis": { "polyphenols": 612, "acidity": 0.14, "extraction": "Cold, two-phase, within 4h" },
  "awards": ["Gold · NYIOOC 2026", "Best in class · Flos Olei"],
  "pairings": ["Grilled red meat", "Gazpacho", "Bitter greens"],
  "expert": {
    "score": 4.8,
    "tastedBy": "Marta Ruiz",
    "date": "2026-03-12",
    "profile": { "fruity": 8.2, "bitter": 6.8, "pungent": 7.6 },
    "notes": "Green tomato, artichoke and cut grass on the nose…",
    "review": "This is the oil we reach for when…",
    "editorsPick": true
  },
  "shopUrl": "https://olijfoliemarkt.nl/finca-la-torre-picual-500ml",
  "price": "€18.50",
  "image": "/images/oils/finca-la-torre-picual.jpg",
  "status": "published"
}
```

Required: slug, name, producer, region, country, cultivars, intensity (delicate|medium|robust), description, status. `shopUrl` empty/absent → no badge, no buy button.

## producers/<slug>.json

```json
{
  "slug": "finca-la-torre",
  "name": "Finca La Torre",
  "region": "andalusia",
  "country": "Spain",
  "town": "Antequera",
  "founded": 1904,
  "website": "https://…",
  "location": { "lat": 37.02, "lng": -4.56 },
  "organic": true,
  "intro": "A 200-hectare estate in the hills above Antequera…",
  "body": "The groves sit between 450 and 600 m…",
  "shopUrl": "",
  "image": "/images/producers/finca-la-torre.jpg",
  "status": "published"
}
```

## articles/<slug>.md

```md
---
title: How to taste olive oil like our panel does
standfirst: Warm the glass, cover it, sip loudly.
category: Tasting
author: Marta Ruiz
date: 2026-05-12
readingTime: 6
relatedOils: [finca-la-torre-picual]
image: /images/articles/how-to-taste.jpg
status: published
---
## 1. Warm the glass
…
```

Inline oil card in an article: `<OilCard slug="finca-la-torre-picual" />` (renders name, rating, Where to buy).

## Reader reviews (not files)

User-submitted; stored in Supabase table `reviews`:
`id, oil_slug, user_name, rating (1-5), title, body, usage, status (pending|approved|rejected), created_at`. Public site shows only `approved`. Reader average = mean of approved ratings.

## regions.json / cultivars.json

Simple lists: `[{ "slug": "andalusia", "name": "Andalusia", "country": "Spain" }]`, `[{ "slug": "picual", "name": "Picual" }]`.
