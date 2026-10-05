/* ══════════════════════════════════════════════════════════════════════════
   Content for bestoliveoils.eu.

   This is the whole data layer. Adding an oil, a region, a guide or a review
   means adding a record here — never touching markup. render.js turns these
   into DOM; the .html files hold only the page frame and one-off prose.

   It is read at build time by build.js, which renders every page to static
   HTML — nothing here is shipped to the browser. Swapping this file for a CMS
   or database query means changing build.js only.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── competition listings ─────────────────────────────────────────────────
   An oil can be in the library without a panel score — a catalogue entry we
   have researched but not tasted. Those carry a `listing` instead of a
   rating: the placing we can actually cite, named, numbered and linked to
   its source. `listing(rank, points)` keeps the source in one place rather
   than repeating the URL on every record. */
const WBOO = {
  source: "World's Best Olive Oils 2025/26",
  sourceShort: 'WBOO 2025/26',
  url: 'https://www.wboo.org/worlds-best-olive-oils.html',
};

const listing = (rank, points) => ({ ...WBOO, rank, points });

module.exports = {

  site: {
    brand: 'bestoliveoils.eu',
    // Absolute origin, used for canonicals, og:url, JSON-LD @id and the sitemap.
    // Change it here and every absolute URL in the build follows.
    url: 'https://bestoliveoils.eu',
    locale: 'en',
    tagline: 'Independent olive oil reviews since 2024',
    founded: '2024',
    description: 'Independent extra virgin olive oil reviews. Every oil is tasted and scored by our panel, with reader reviews alongside.',
    shopName: 'olijfoliemarkt.nl',
    shopUrl: 'https://olijfoliemarkt.nl',
    // Master switch for the "In our shop" badges, carried over from the
    // mockup's showShopBadges prop. Set false to hide every badge and CTA.
    showShopBadges: true,
    stats: { oils: 312, regions: 24 },
    nav: [
      { label: 'Library',   href: '/oils/',  key: 'library' },
      { label: 'Producers', href: '/producers/', key: 'producers' },
      { label: 'Cultivars', href: '/cultivars/', key: 'cultivars' },
      { label: 'Regions',   href: '/regions/',   key: 'regions' },
      { label: 'Learn',     href: '/learn/',     key: 'learn' },
      { label: 'Rankings',  href: '/rankings/',  key: 'rankings' },
    ],
    footerLinks: [
      { label: 'Library',     href: '/oils/' },
      { label: 'Producers',   href: '/producers/' },
      { label: 'Cultivars',   href: '/cultivars/' },
      { label: 'Regions',     href: '/regions/' },
      { label: 'Learn',       href: '/learn/' },
      { label: 'Rankings',    href: '/rankings/' },
      { label: 'How we rate', href: '/how-we-rate/' },
      { label: 'Trade',       href: '/trade/' },
      { label: 'Contact',     href: '/contact/' },
    ],
  },

  /* ── page metadata for the two pages that aren't driven by one record ──
     Titles aim for 50-60 characters, descriptions for 120-160, so neither is
     truncated in results. */
  pages: {
    /* {oils}, {producers}, {regions} and {cultivars} are filled in from the
       records at build time — a hard-coded count goes stale the next time
       content lands, and these two said 312 when the library held 55. */
    home: {
      title: 'European Olive Oil Reference | bestoliveoils.eu',
      description: 'An independent library of {oils} European extra virgin olive oils from {producers} mills: cultivar, region, harvest and competition record, with every source named.',
    },
    library: {
      title: 'The Olive Oil Library — {oils} Oils | bestoliveoils.eu',
      description: 'Browse {oils} extra virgin olive oils by region, cultivar, intensity and rating. Filter by what you want, and see plainly which oils our panel has tasted.',
    },
    producers: {
      title: 'Olive Oil Producers & Estates | bestoliveoils.eu',
      description: 'The mills and estates behind the oils we rate: how they farm, when they harvest, and every one of their oils with our panel score alongside.',
      intro: 'The estates and mills behind the oils in the library — how they farm, when they harvest, and how their oils scored.',
      body: [
        'A producer earns a page here once one of their oils is in the library — because our panel tasted it, or because it placed in a competition we follow. The page covers the groves and the mill, the cultivars they grow, when they pick, and every oil of theirs in the library, with the panel score where we have one and the competition placing where we do not.',
        'We do not charge producers to be listed and we do not accept submissions in exchange for coverage. Oils reach the panel because we bought them or because a reader asked us to look. Where an oil is also stocked by our retail partner, the listing says so plainly — the score is set before that is ever considered.',
      ],
    },
    learn: {
      title: 'Olive Oil Guides from Our Tasting Panel | bestoliveoils.eu',
      description: 'How to taste olive oil, how to store it, and how to read a label. Short, practical guides written by the panel that scores the library.',
      intro: 'Short, practical guides from the panel that tastes and scores every oil in the library.',
      body: [
        'These are the working notes behind the scores: how we taste, what the three positives actually are, why colour tells you nothing, and how to keep a good oil from going flat before you finish the bottle.',
        'Each guide is written by a member of the tasting panel and revised as the method changes. Where a guide names an oil, it links to that oil\'s entry in the library so you can taste along with it.',
      ],
    },
    howWeRate: {
      title: 'How We Rate Olive Oil | bestoliveoils.eu',
      description: 'What a score on bestoliveoils.eu means, what a competition chip means, who pays for what, and how our retail partner relationship is handled.',
      heading: 'How we rate',
      lede: 'What a score on this site means, what it does not mean, and who is paying for what.',
      sections: [
        {
          id: 'two-kinds-of-entry',
          heading: 'Two kinds of entry',
          blocks: [
            { type: 'p', text: 'The library holds {oils} oils. Some carry a star score out of five; the rest carry a competition placing, such as a rank in the World\'s Best Olive Oils list. The difference matters. A star score means our panel tasted the oil and scored it. A competition chip means somebody else\'s panel did, and we are reporting their result with a link to it. We never turn a competition placing into a star score of our own.' },
            { type: 'callout', kicker: 'Plain rule', text: 'If an oil has stars, we tasted it. If it has a chip, we have not — yet.' },
          ],
        },
        {
          id: 'the-panel-and-the-method',
          heading: 'The panel and the method',
          blocks: [
            { type: 'p', text: 'We taste the way competition panels do: a tablespoon in a covered glass warmed in the hand, nosed, then stripped across the palate with air drawn in. We score the three positive attributes — fruitiness, bitterness and pungency — and their balance, and we note defects by name. The method is written up in full in our tasting guide, so you can run the same test at your own table.' },
            { type: 'p', text: 'Our scores are currently marked provisional on every page that carries one. They come from a small panel tasting known oils, not from a blind flight of the whole library. The full blind round for the 2025/26 harvest is scheduled, and scores will be re-issued from it; until then the word "provisional" stays on the page.' },
          ],
        },
        {
          id: 'what-the-figures-are',
          heading: 'Where the figures come from',
          blocks: [
            { type: 'p', text: 'Polyphenol and acidity figures on an oil\'s page are labelled with their source — nearly always the producer\'s own laboratory report for that harvest. We have not commissioned independent analysis, so the page says "laboratory figures", never "independently verified". Where a producer publishes a bound rather than a figure ("≥ 500 mg/kg"), it is printed as text, not drawn as a bar, because a bar implies a measurement. Where nothing has been published, the page says "Not published" instead of guessing.' },
            { type: 'p', text: 'A cultivar page prints the polyphenol range published for the variety, and says so. No oil ever borrows that range as its own figure.' },
          ],
        },
        {
          id: 'money',
          heading: 'Who pays for what',
          blocks: [
            { type: 'p', text: 'No producer pays to be listed, and we do not accept oils in exchange for coverage. An oil is here because we bought it, or because it placed in a competition we follow.' },
            { type: 'p', text: 'This site is run by the people behind olijfoliemarkt.nl, an olive oil shop in the Netherlands. Where an oil in the library is sold there, its page says so and links to it, and the strip at the top of every page states the relationship. The score is set before the shop is considered, and oils the shop does not carry are scored in the same way as oils it does — most of the library is not for sale there at all.' },
          ],
        },
        {
          id: 'reader-reviews',
          heading: 'Reader reviews',
          blocks: [
            { type: 'p', text: 'Reader ratings are shown separately from panel scores and are never blended into them. The site does not yet accept reader submissions; the form on each page is there so that when it does, nothing about the layout has to change.' },
          ],
        },
        {
          id: 'corrections',
          heading: 'Corrections',
          blocks: [
            { type: 'p', text: 'If a figure, an award or a producer detail is wrong, tell us and we will correct it and note the correction on the page. Producers are welcome to send us their current lab report for a harvest; we will cite it as theirs.' },
          ],
        },
      ],
    },
    trade: {
      title: 'Wholesale Olive Oil from Spain, Italy, Greece & Türkiye',
      description: 'Wholesale and export extra virgin olive oil for shops, restaurants and importers: Oro Bailén, Guglielmi, Le Ferre, Cretan Heritage, Hermus, from one Dutch supplier.',
      heading: 'Trade & partnerships',
      lede: 'Premium extra virgin olive oil from Spain, Italy, Greece and Türkiye for shops, restaurants and importers — {shopOils} oils from small and mid-sized estates, supplied from the Netherlands by our retail partner olijfoliemarkt.nl.',
      sections: [
        {
          id: 'what-we-supply',
          heading: 'What we supply',
          blocks: [
            { type: 'p', text: 'Spanish olive oil from Jaén — Oro Bailén and Nobleza del Sur, Picual, Arbequina and Hojiblanca, early harvest. Italian olive oil from Puglia, Lazio, Abruzzo, Umbria and Sicily — Olio Guglielmi, Le Ferre, Quattrociocchi, Marina Palusci, Frantoi Cutrera and our own Umbrian label Etruna. Greek olive oil from Crete and the Peloponnese — Cretan Heritage and Corinto, Koroneiki, Tsounati and Manaki. Turkish olive oil from the Aegean — Hermus, Memecik, Ayvalık and Arbequina. Bottles of 250 ml and 500 ml, 3 L and 5 L tins, gift sets in season.' },
            { type: 'p', text: 'Every oil comes with what you see on this site: harvest year, variety, the producer’s laboratory figures where they publish them, and a page you can hand to your customers.' },
          ],
        },
        {
          id: 'shops-and-delis',
          heading: 'Shops and delicatessens',
          blocks: [
            { type: 'p', text: 'Wholesale olive oil in consumer packaging for delicatessens, farm shops, wine shops and concept stores in the Netherlands, Belgium and the rest of the EU. Order by the case; a two-shelf starter assortment is a normal first order. Delivery within days.' },
          ],
        },
        {
          id: 'restaurants',
          heading: 'Restaurants and kitchens',
          blocks: [
            { type: 'p', text: 'Olive oil for horeca: a 5-litre tin of a producer’s everyday extra virgin for the kitchen — Casa del Agua from Oro Bailén, One Root from Cretan Heritage, Corinto — on a standing order, plus two or three bottles for the table and the till. We bring samples and taste with the team.' },
          ],
        },
        {
          id: 'importers',
          heading: 'Importers and export',
          blocks: [
            { type: 'p', text: 'Export of premium European olive oil by the box, the pallet or the container: a dozen producers from four countries on one invoice, with the documentation your market needs. We have shipped to South Korea and are set up for Asia, the Gulf and North America.' },
          ],
        },
        {
          id: 'producers',
          heading: 'Producers',
          blocks: [
            { type: 'p', text: 'Listing in the library is free and cannot be bought — an oil gets a page because our panel tasted it or it placed in a competition we follow. Stocking is a separate conversation with the retailer, which buys direct from estates and prefers producers who publish harvest dates and laboratory figures.' },
          ],
        },
        {
          id: 'get-in-touch',
          heading: 'Get in touch',
          blocks: [
            { type: 'p', text: 'Prices, minimums and terms by email: info@olijfoliemarkt.nl with “trade” in the subject line. Tell us what kind of business you are and roughly what volume, or ask us to suggest a first assortment.' },
            { type: 'callout', kicker: 'The line we keep', text: 'A score on this site is never changed by whether an oil is stocked. Trade terms live on the shop’s side of that line.' },
          ],
        },
      ],
    },
    contact: {
      title: 'Contact | bestoliveoils.eu',
      description: 'How to reach the people behind bestoliveoils.eu: corrections, lab reports from producers, and questions about the library.',
      heading: 'Contact',
      lede: 'One address for everything. We read it ourselves.',
      sections: [
        {
          id: 'write-to-us',
          heading: 'Write to us',
          blocks: [
            { type: 'p', text: 'info@olijfoliemarkt.nl — the mailbox of our retail partner, which is also us. Put "bestoliveoils" in the subject line and it reaches the right person.' },
          ],
        },
        {
          id: 'producers',
          heading: 'Producers',
          blocks: [
            { type: 'p', text: 'If your oil is in the library and something on its page is wrong, send the correction and we will fix it. If you have a current laboratory report for the harvest on sale, send it and we will cite the figures as yours. If your oil is not in the library, we do not take submissions, but we do follow the major competitions and buy what interests us.' },
          ],
        },
        {
          id: 'readers',
          heading: 'Readers',
          blocks: [
            { type: 'p', text: 'Found an oil you think the panel should taste? Tell us which and where you bought it. Questions about buying any of the oils stocked by our partner go to the shop itself.' },
          ],
        },
        {
          id: 'who-we-are',
          heading: 'Who we are',
          blocks: [
            { type: 'p', text: 'bestoliveoils.eu is written and maintained by the team behind olijfoliemarkt.nl in Amstelveen, the Netherlands. How the shop and the library relate is set out on the How we rate page.' },
          ],
        },
      ],
    },
    regions: {
      title: 'Olive Oil Regions — {regions} Growing Areas | bestoliveoils.eu',
      description: 'The {regions} olive-growing regions behind the {oils} oils in the library, from Jaén to the Edremit Gulf: how many oils and producers each holds and which varieties they grow.',
      heading: 'Olive oil regions',
      intro: '{regions} growing regions across {countries} countries, counted from the {oils} oils in the library. Each card opens the library filtered to that region.',
      note: 'A region is counted the way its producers write it on the label — Puglia, not Italy; the Edremit Gulf as North Aegean.',
      body: [
        'Olive oil is an agricultural product before it is a brand, and the region tells you more than the bottle does: the varieties that grow there, when the harvest falls, how the oil is expected to taste. Andalusia means Picual and Hojiblanca in volume; Puglia means Coratina’s bitterness; the Turkish Aegean means Ayvalık and Memecik picked green in September.',
        'There are no region pages yet. The counts here are the library’s own — how many oils and producers we hold from each area — never an estimate of what is planted or pressed there.',
      ],
    },
    rankings: {
      title: 'Olive Oil Competitions & Rankings We Follow | bestoliveoils.eu',
      description: 'The {competitions} olive oil competitions and guides we follow — NYIOOC, Flos Olei, EVOOLEUM, Olive Japan and more — with award scales, seasons and the tables we republish.',
      heading: 'Competitions and rankings',
      intro: 'The {competitions} competitions and guides we follow. Where we have republished a full results table it is linked here; the rest are described and counted, never summarised from memory.',
      note: 'A ranking page republishes a competition’s table in the competition’s own order. None of these is our score.',
      body: [
        'Competitions are the one external signal on an oil that is not the producer’s own claim, which is why oil pages carry them and why the library links to a full table where we have one. They are also not all the same thing: a medal competition may award hundreds of golds in a year, a points guide scores every entry, and a meta-ranking like WBOO totals results across several contests. The card says which kind each one is.',
        'What we republish: the full table, as published, with a link to our own page for every oil we cover. What we do not do: reorder it, cherry-pick it, or treat a medal as a tasting note.',
      ],
    },
    cultivars: {
      title: 'Olive Cultivars of Europe & Türkiye | bestoliveoils.eu',
      description: 'Reference pages for {cultivarPages} olive varieties across Europe and Türkiye: origin, oleic acid, harvest window and what each one tastes like, every figure sourced.',
      intro: 'Reference pages for {cultivarPages} varieties, and the {cultivars} of them the library currently holds an oil of.',
      body: [
        'A cultivar is the variety of olive the oil is pressed from, and it does more to shape how an oil tastes than any other single factor. A Picual and an Arbequina grown in the same grove, picked on the same day and milled in the same machine will not taste alike.',
        'Two different things are counted below. A number is how many oils in the library carry that variety — never an estimate of how much is planted. A variety marked "Reference" is one we have written up but hold no oil of yet; its page is the reference, and the shelf is what waits. Varieties with no page open the library filtered to them.',
      ],
    },
  },

  /* ── cultivars ──────────────────────────────────────────────────────────
     Reference records for the olive varieties. These are NOT the source of
     the library's cultivar filter — that is derived from the oils by
     facets.js, and always will be. What lives here is editorial: the varietal
     facts a filter cannot know.

     Two levels, and the difference decides whether a page is built:
       · a reference row (name + origin + phenolRange + sensory + pairing)
         appears in the comparison table and on the hub;
       · add `lede` and `grove` and the record earns /cultivars/<slug>/.
     A variety with neither is still counted on the hub from the oils; it
     just has nothing of its own to say yet.

     `phenolRange` is the range typically published for the VARIETY. It is not
     a measurement of any bottle in the library — the pages say so where they
     print it, and no oil borrows it as its own figure. */
  /* ── cultivars ──────────────────────────────────────────────────────────
     40 varieties covering the great majority of European and Turkish
     commercial plantings. Each record is editorial: the oils decide which
     varieties the library *has* (facets.js derives that from their `cultivar`
     field), and a record decides what there is to read about one.

     Three fields the v2 mockup drew are deliberately not here, because they
     cannot be filled honestly:

       - No numeric aroma wheel. The mockup shows "Green tomato 9.1"; IOC-method
         panel medians simply do not exist for most of these varieties, so
         `aroma` is a list of documented descriptors and `aromaNote` says where
         they came from.
       - No smoke point. It is a property of a lot — acidity, filtration — not
         of a variety; two oils off the same grove can differ by 20 °C. The
         reference card carries shelf stability instead.
       - Two stats, not three. "N oils in the library" is computed at build
         time and injected only when N > 0; an average panel score is not
         offered at all.

     Every record carries its own `sources`. Figures are not always comparable
     between varieties — different phenol calibrations, different Rancimat
     temperatures — and where that matters the record says so rather than
     inviting a ranking. */
  cultivars: [
    {
      "slug": "picual",
      "name": "Picual",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Jaén, Andalusia",
      "purpose": "Oil",
      "tags": [
        "Spain · Jaén",
        "Monovarietal",
        "Very high phenolic"
      ],
      "lede": "The most planted olive variety on earth and the backbone of Andalusian oil. Naturally rich in oleic acid and polyphenols, which makes it both the most stable extra virgin on the shelf and one of the most assertive on the palate.",
      "image": { "src": "assets/img/cultivars/picual.webp", "alt": "Olive grove in Jaén, Andalusia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Picual olives / grove photo",
      "stats": [
        {
          "value": "300–700",
          "label": "mg/kg typical polyphenols"
        },
        {
          "value": "78–81%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Picual takes its name from the small point at the tip of the fruit. It tolerates cold, salt and waterlogged ground, which is why it dominates Jaén — a single province holding more olive trees than any country outside Spain. Spain’s official 2024 survey puts it at 1,132,856 hectares, 42.4% of the country’s commercial olive area. It is also its own worst enemy agronomically: very susceptible to Verticillium wilt and peacock spot, and poor at handling drought.",
        "The trade-off is real. Yield is high and ripening late, so growers who want the green, high-polyphenol style must pick well before the fruit turns. Most Picual is not picked that way. A variety capable of the most stable oil in the world routinely ends up as anonymous bulk oil because the fruit was left on the tree for weight."
      ],
      "reference": [
        [
          "Also called",
          "Marteño, Lopereño, Nevadillo Blanco"
        ],
        [
          "Main regions",
          "Jaén, Córdoba, Granada"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "78–81%"
        ],
        [
          "Harvest",
          "Early ripening · Nov–Dec"
        ],
        [
          "Shelf stability",
          "Very high — over 55 h Rancimat"
        ],
        [
          "Watch out for",
          "Verticillium wilt, peacock spot, drought"
        ]
      ],
      "aroma": [
        "Green tomato",
        "Cut grass",
        "Green almond",
        "Artichoke",
        "Fig leaf"
      ],
      "aromaNote": "Descriptors as published in variety catalogues and DOP specifications. Our panel has not scored this cultivar, so there are no intensity numbers here.",
      "compare": {
        "origin": "Jaén, Spain",
        "polyphenols": "300–700 mg/kg",
        "sensory": "Intensely green, clean bitterness, late-building pungency",
        "pairing": "Tomato salad, grilled vegetables, bread and salt"
      },
      "map": {
        "placeholder": "Map · Jaén, Andalusia",
        "caption": "Jaén, Andalusia · 37.8° N, 3.8° W"
      },
      "seo": {
        "title": "Picual — Spain’s Most Planted Olive | bestoliveoils.eu",
        "description": "Picual covers 42% of Spain’s olive area and gives the most oxidatively stable oil in commerce. Polyphenols, oleic acid, harvest window and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/spain/picual"
        },
        {
          "label": "ESYRCE 2024, Spanish Ministry of Agriculture",
          "url": "https://www.mapa.gob.es/dam/mapa/contenido/estadisticas/temas/estadisticas-agrarias/2.agricultura/1.-encuesta-sobre-superficies-y-rendimientos-de-cultivos--esyrce/informes-sectoriales/olivar2024.pdf"
        },
        {
          "label": "Monovarietal oils from Extremadura, Int. J. Mol. Sci. 17(11):1960",
          "url": "https://www.mdpi.com/1422-0067/17/11/1960"
        }
      ]
    },
    {
      "slug": "arbequina",
      "name": "Arbequina",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Les Garrigues, Lleida, Catalonia",
      "purpose": "Oil",
      "tags": [
        "Spain · Catalonia",
        "Monovarietal",
        "Low phenolic"
      ],
      "lede": "The variety that made modern hedgerow olive growing possible. Weak-growing, easy to root, quick to bear and self-fertile — and now planted on three continents, though it gives the least stable and lowest-phenol oil of the major Spanish cultivars.",
      "image": { "src": "assets/img/cultivars/arbequina.webp", "alt": "Olive grove in Les Garrigues, Lleida, Catalonia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Arbequina olives / grove photo",
      "stats": [
        {
          "value": "200–230",
          "label": "mg/kg typical polyphenols"
        },
        {
          "value": "70–75%",
          "label": "oleic acid in Spain"
        }
      ],
      "grove": [
        "Named for the village of Arbeca in Les Garrigues, Arbequina covers 236,692 hectares in Spain and dominates new plantings almost everywhere else: roughly half of Chile’s production area, a main cultivar in Argentina and Australia, and the default in California. Its agronomy explains that entirely — weak vigour, high rooting capacity, early bearing and self-compatibility are exactly what a super-high-density hedgerow needs. A fourteen-year Córdoba trial recorded 2.3 tonnes of oil per hectare per year with the steadiest yields of any cultivar tested.",
        "What travels less well is the oil. Arbequina is environmentally plastic in the wrong direction: oleic acid falls roughly 0.7% for every degree of warming during oil accumulation, and in northwestern Argentina it has been measured at 51.8% against 70–75% in Catalonia. Phenols are low wherever it grows, and it is the one major Spanish variety whose oil is genuinely fragile — measured at 29.8 hours Rancimat against Picual’s 55-plus."
      ],
      "reference": [
        [
          "Also called",
          "Arbequí, Blancal"
        ],
        [
          "Main regions",
          "Catalonia, Aragón, Andalusia"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "70–75% in Spain, far lower in warm climates"
        ],
        [
          "Harvest",
          "From the first half of November"
        ],
        [
          "Shelf stability",
          "Low — 29.8 h Rancimat"
        ],
        [
          "Why it spread",
          "Weak vigour, roots easily, bears early, self-fertile"
        ]
      ],
      "aroma": [
        "Green apple",
        "Sweet almond",
        "Artichoke",
        "Fresh herbs",
        "Banana"
      ],
      "aromaNote": "Descriptors as published by the DOP Siurana regulatory council and variety catalogues. Our panel has not scored this cultivar, so there are no intensity numbers here.",
      "compare": {
        "origin": "Lleida, Spain",
        "polyphenols": "200–230 mg/kg",
        "sensory": "Soft, sweet entry, barely bitter, light pungency",
        "pairing": "Fish, salads, baking, mayonnaise"
      },
      "map": {
        "placeholder": "Map · Les Garrigues, Lleida",
        "caption": "Les Garrigues, Lleida, Catalonia · 41.5° N, 0.9° E"
      },
      "seo": {
        "title": "Arbequina — The Hedgerow Olive | bestoliveoils.eu",
        "description": "Arbequina made super-high-density olive growing work, and it pays for that in stability. Polyphenols, oleic acid, why warm climates change its oil."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/spain/arbequina"
        },
        {
          "label": "Cultivar and tree density in super-high-density orchards, Front. Plant Sci. 7:1226",
          "url": "https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01226/full"
        },
        {
          "label": "Olive cultivation in the southern hemisphere, Front. Plant Sci. 8:1830",
          "url": "https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2017.01830/full"
        }
      ]
    },
    {
      "slug": "hojiblanca",
      "name": "Hojiblanca",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Lucena, Córdoba, Andalusia",
      "purpose": "Dual-purpose",
      "tags": [
        "Spain · Córdoba",
        "Dual-purpose",
        "High phenolic"
      ],
      "lede": "Spain’s second variety by area and the only one that is genuinely dual-purpose at commercial scale. Its firm, large fruit is the basis of the Spanish black table olive industry; its early-harvest oil is the classic green-almond and bitter-herb Andalusian profile.",
      "image": { "src": "assets/img/cultivars/hojiblanca.webp", "alt": "Olive grove in Lucena, Córdoba, Andalusia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Hojiblanca olives / grove photo",
      "stats": [
        {
          "value": "280–820",
          "label": "mg/kg, falling through the season"
        },
        {
          "value": "70–79%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Hojiblanca — \"white leaf\", for the pale underside — covers 362,232 hectares, concentrated in Córdoba, Málaga and Seville. It handles chalky soils, drought and winter cold better than Picual, and it yields well, though in alternating years. The catch is the fruit: it clings so hard to the branch that mechanical shaking struggles, which is one reason growers accept its lower oil content. The other reason is that the fruit has a second market.",
        "Harvest date matters here more than in almost any other variety. A three-year ripening study tracked total phenols falling from 819 ppm early in the season to 282 ppm late, from the same groves. Early-harvest Hojiblanca can carry three times the phenolic load of late-harvest fruit, which is why the DOP Estepa specification sets a floor of 405 ppm rather than trusting the variety alone."
      ],
      "reference": [
        [
          "Also called",
          "Casta de Lucena, Lucentino"
        ],
        [
          "Main regions",
          "Córdoba, Málaga, Seville, Granada"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and black table olives"
        ],
        [
          "Oleic acid",
          "70–79%"
        ],
        [
          "Harvest",
          "Late ripening · through to mid-January"
        ],
        [
          "Shelf stability",
          "High — Rancimat mean 73 h, falling with ripeness"
        ],
        [
          "Panel thresholds",
          "DOP Estepa: fruity ≥4.5, bitter 3–6, pungent 3–6"
        ]
      ],
      "aroma": [
        "Green olive",
        "Green almond",
        "Tomato plant",
        "Artichoke",
        "Green banana"
      ],
      "aromaNote": "The numeric thresholds above are DOP Estepa certification minima on the IOC 0–10 scale, not a measured varietal median. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Córdoba, Spain",
        "polyphenols": "280–820 mg/kg",
        "sensory": "Green-fruity, firm bitterness, peppery finish when picked early",
        "pairing": "Roast vegetables, pulses, aged cheese"
      },
      "map": {
        "placeholder": "Map · Lucena, Córdoba",
        "caption": "Lucena, Córdoba, Andalusia · 37.4° N, 4.5° W"
      },
      "seo": {
        "title": "Hojiblanca — Oil and Table Olive | bestoliveoils.eu",
        "description": "Spain’s second variety by area, and the one behind its black table olives. Why harvest date triples its polyphenol content, plus oleic acid and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/spain/hojiblanca"
        },
        {
          "label": "DOP Estepa product specification",
          "url": "https://www.juntadeandalucia.es/export/drupaljda/PliegoEstepamodificado.pdf"
        },
        {
          "label": "Fruit ripening and natural antioxidants in Hojiblanca oils, Gutiérrez et al.",
          "url": "https://www.academia.edu/4422569/Influence_of_fruit_ripening_process_on_the_natural_antioxidant_content_of_Hojiblanca_virgin_olive_oils"
        }
      ]
    },
    {
      "slug": "cornicabra",
      "name": "Cornicabra",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Toledo, Castilla-La Mancha",
      "purpose": "Oil",
      "tags": [
        "Spain · Castilla-La Mancha",
        "Monovarietal",
        "Very high phenolic"
      ],
      "lede": "The variety of the central Spanish plateau, and the highest-phenol of the big four Spanish cultivars in the one study that measured them side by side. It has stayed home: adapted to cold, dry, poor soils, it has essentially no commercial presence outside Spain.",
      "image": { "src": "assets/img/cultivars/cornicabra.webp", "alt": "Olive grove in Toledo, Castilla-La Mancha — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Cornicabra olives / grove photo",
      "stats": [
        {
          "value": "~630",
          "label": "mg/kg total phenols, measured"
        },
        {
          "value": "~79%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Cornicabra — \"goat horn\", for the curved fruit — covers 225,799 hectares across Toledo, Ciudad Real, Madrid and Extremadura. It is built for the meseta: excellent adaptation to poor soils and to dry, cold environments, where Picual would struggle. Flowering is late and ovary abortion high, but fruit set is adequate even under self-pollination.",
        "In a single Extremadura experiment that measured eight monovarietals under the same conditions, Cornicabra came out at 633 mg/kg total phenols against Picual’s 381 and Arbequina’s 200 — while still carrying near-Picual oleic acid at 78.7%. That combination is unusually good for shelf life. Its one practical handicap is that the fruit resists detachment so strongly that mechanical harvesting remains genuinely difficult."
      ],
      "reference": [
        [
          "Also called",
          "Cornezuelo, Ornal, Cornicabra Negra"
        ],
        [
          "Main regions",
          "Toledo, Ciudad Real, Madrid, Badajoz, Cáceres"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~79%"
        ],
        [
          "Harvest",
          "Late flowering and late ripening"
        ],
        [
          "Shelf stability",
          "Very high — over 55 h Rancimat"
        ],
        [
          "Watch out for",
          "Fruit clings hard; mechanical harvest is difficult"
        ]
      ],
      "aroma": [
        "Green apple",
        "Kiwi",
        "Avocado",
        "Fresh herbs",
        "Green almond"
      ],
      "aromaNote": "The DOP Montes de Toledo specification states only \"medium to intense\" for fruity, bitter and pungent, with no medians. The descriptors above are the regulatory council’s own. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Toledo, Spain",
        "polyphenols": "~630 mg/kg",
        "sensory": "Intensely fruity, elegant moderate bitterness, measured pungency",
        "pairing": "Game, stews, hard cheese, toast"
      },
      "map": {
        "placeholder": "Map · Montes de Toledo",
        "caption": "Montes de Toledo, Castilla-La Mancha · 39.6° N, 4.2° W"
      },
      "seo": {
        "title": "Cornicabra — Spain’s Meseta Olive | bestoliveoils.eu",
        "description": "The highest-phenol of Spain’s big four in a like-for-like study: 633 mg/kg with 79% oleic acid. Where it grows, why it never left, and how it tastes."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/spain/cornicabra"
        },
        {
          "label": "DOP Aceite Montes de Toledo specification",
          "url": "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-agroalimentarios/aceite_montes_toledo_2015_09_24.pdf"
        },
        {
          "label": "Monovarietal oils from Extremadura, Int. J. Mol. Sci. 17(11):1960",
          "url": "https://www.mdpi.com/1422-0067/17/11/1960"
        }
      ]
    },
    {
      "slug": "picudo",
      "name": "Picudo",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Córdoba, Andalusia",
      "purpose": "Dual-purpose",
      "tags": [
        "Spain · Córdoba",
        "Dual-purpose",
        "Low bitterness"
      ],
      "lede": "The soft, aromatic counterweight in the great Córdoba blends. Picudo is what gives DOP Priego de Córdoba and DOP Baena their sweet entry — and its pollen quality makes it a standard pollinator in mixed Andalusian orchards.",
      "image": { "src": "assets/img/cultivars/picudo.webp", "alt": "Olive grove in Córdoba, Andalusia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Picudo olives / grove photo",
      "stats": [
        {
          "value": "Not published",
          "label": "typical polyphenols"
        },
        {
          "value": "Low",
          "label": "oxidative stability"
        }
      ],
      "grove": [
        "Picudo is the characteristic variety of the Subbética — the Priego de Córdoba and Baena country — and is also grown in Jaén, Granada and Málaga. Official Spanish figures put it at 21,023 hectares, though nursery sources give a considerably higher number across those four provinces; the discrepancy is unresolved. It ripens late and holds onto its fruit, which complicates mechanical harvest.",
        "Two things make it valuable. Its oil is aromatic and notably low in bitterness, which is why it is almost always blended with the firmer Hojiblanca and Picual rather than bottled alone. And its pollen has high germinative capacity, so it earns its place in an orchard twice over. The published data stops there: no institutional source gives a polyphenol range or an oleic acid figure for Picudo, and we will not borrow one from marketing copy."
      ],
      "reference": [
        [
          "Also called",
          "Picuda, Picuo"
        ],
        [
          "Main regions",
          "Córdoba, Jaén, Granada, Málaga"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and table"
        ],
        [
          "Oleic acid",
          "Not published"
        ],
        [
          "Harvest",
          "Late ripening, strong fruit retention"
        ],
        [
          "Shelf stability",
          "Low (nursery-level assessment; no Rancimat figure published)"
        ],
        [
          "Role in the orchard",
          "Valued as a pollinator — pollen of high germinability"
        ]
      ],
      "aroma": [
        "Fruity",
        "Aromatic",
        "Sweet entry",
        "Almond"
      ],
      "aromaNote": "From the DOP Priego de Córdoba specification, which requires Picuda oils to be \"fruity, aromatic, pleasant, with a sweet entry\". That is a regulatory descriptor, not a panel result.",
      "compare": {
        "origin": "Córdoba, Spain",
        "polyphenols": "Not published",
        "sensory": "Aromatic and sweet, very little bitterness",
        "pairing": "Desserts, fresh cheese, delicate fish"
      },
      "map": {
        "placeholder": "Map · Subbética, Córdoba",
        "caption": "Subbética, Córdoba, Andalusia · 37.4° N, 4.2° W"
      },
      "seo": {
        "title": "Picudo — The Soft Side of Córdoba | bestoliveoils.eu",
        "description": "The low-bitterness Andalusian variety behind the sweet entry in Priego de Córdoba and Baena blends, and a standard pollinator in mixed orchards."
      },
      "sources": [
        {
          "label": "DOP Priego de Córdoba specification",
          "url": "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-agroalimentarios/priego_cordoba_2022_12_01.pdf"
        },
        {
          "label": "ESYRCE 2024, Spanish Ministry of Agriculture",
          "url": "https://www.mapa.gob.es/dam/mapa/contenido/estadisticas/temas/estadisticas-agrarias/2.agricultura/1.-encuesta-sobre-superficies-y-rendimientos-de-cultivos--esyrce/informes-sectoriales/olivar2024.pdf"
        }
      ]
    },
    {
      "slug": "manzanilla-de-sevilla",
      "name": "Manzanilla de Sevilla",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Guadalquivir valley, Seville",
      "purpose": "Table",
      "tags": [
        "Spain · Seville",
        "Table olive",
        "Oil is secondary"
      ],
      "lede": "The most widely planted table olive in the world, and the fruit behind Sevillian-style green olives. Thin skin, firm and non-fibrous flesh, and a stone that releases cleanly — bred by centuries of selection for the brine barrel, not the mill.",
      "image": { "src": "assets/img/cultivars/manzanilla-de-sevilla.webp", "alt": "Olive grove in Guadalquivir valley, Seville — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Manzanilla olives / grove photo",
      "stats": [
        {
          "value": "Table first",
          "label": "oil is a secondary product"
        },
        {
          "value": "~62,000",
          "label": "hectares in Spain"
        }
      ],
      "grove": [
        "Manzanilla is grown across the Guadalquivir valley — Seville, Badajoz and Huelva — and, unusually for a Spanish variety, well beyond: Portugal, the United States, Israel, Argentina and Australia. It ripens early and is picked green, at the straw-yellow stage before colour change, then lye-treated and fermented in brine.",
        "Its IGP dossier makes an unusual admission: the variety loses its qualities when grown outside the delimited area, and cites failed Californian plantings as evidence. It needs a mild climate and loose alluvial ground, and it is very sensitive to Verticillium wilt. The oil it does make is described by the IOC as of high quality and stability, but no polyphenol or oleic figure is published — because almost nobody presses it."
      ],
      "reference": [
        [
          "Also called",
          "Manzanilla Sevillana, Manzanilla Fina, Manzanilla Común"
        ],
        [
          "Main regions",
          "Seville, Badajoz, Huelva; also Portugal, USA, Israel, Argentina"
        ],
        [
          "Purpose",
          "Table olive; oil secondary"
        ],
        [
          "Oleic acid",
          "Not published"
        ],
        [
          "Harvest",
          "Early, picked green before colour change"
        ],
        [
          "Oil stability",
          "Described as high by the IOC; no figure published"
        ],
        [
          "Watch out for",
          "Very sensitive to Verticillium wilt and to winter cold"
        ]
      ],
      "aroma": [
        "Fine and delicate",
        "Lactic notes from fermentation",
        "Balanced salt and acidity"
      ],
      "aromaNote": "These describe the cured table olive, from the IGP specification. Published sensory descriptors for Manzanilla oil: none found.",
      "compare": {
        "origin": "Seville, Spain",
        "polyphenols": "Not published",
        "sensory": "Grown for the table; oil rarely bottled monovarietal",
        "pairing": "The olive itself — vermouth, tapas"
      },
      "map": {
        "placeholder": "Map · Guadalquivir valley",
        "caption": "Guadalquivir valley, Seville · 37.4° N, 6.0° W"
      },
      "seo": {
        "title": "Manzanilla de Sevilla — The Table Olive | bestoliveoils.eu",
        "description": "The world’s most widely planted table olive, and why the IGP itself admits the variety loses its qualities when grown outside the Guadalquivir."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/spain/manzanilla-de-sevilla"
        },
        {
          "label": "IGP Aceituna Manzanilla de Sevilla specification",
          "url": "https://www.juntadeandalucia.es/export/drupaljda/PLIEGO_IGP_ACEITUNA_MANZANILLA_SEVILLANA.pdf"
        }
      ]
    },
    {
      "slug": "empeltre",
      "name": "Empeltre",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Bajo Aragón, Ebro valley",
      "purpose": "Dual-purpose",
      "tags": [
        "Spain · Aragón",
        "Dual-purpose",
        "Sweet, no bitterness"
      ],
      "lede": "The olive of the Ebro valley, and the one whose name is an agronomic fact: empeltre means \"grafted\" in Aragonese, because the variety will not root from cuttings in any practical way. Its oil is yellow, smooth and almost without bitterness.",
      "image": { "src": "assets/img/cultivars/empeltre.webp", "alt": "Olive grove in Bajo Aragón, Ebro valley — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Empeltre olives / grove photo",
      "stats": [
        {
          "value": "~18%",
          "label": "oil content of the fruit"
        },
        {
          "value": "Sweet",
          "label": "style — no bitterness"
        }
      ],
      "grove": [
        "Empeltre runs along the Ebro basin — Teruel, Zaragoza, Huesca, La Rioja, Navarra, southern Catalonia and Castellón — and out to the Balearics, where it is called Mallorquina. It is also grown in Mendoza and Córdoba in Argentina. It is the principal variety of DOP Aceite del Bajo Aragón, and it is used both for oil and for naturally processed black table olives.",
        "Two things are worth knowing. First, propagation: rooting capacity is so low that the variety is grafted rather than struck, which is where the name comes from and why it has never spread the way Arbequina has. Second, an authenticity quirk — an Aragonese clonal selection produces Δ7-stigmastenol at up to 0.76%, which can push a genuine extra virgin past the EU sterol limits. It is a documented analytical trap, not an adulteration."
      ],
      "reference": [
        [
          "Also called",
          "Aragonesa, Injerto, Terra Alta, Mallorquina"
        ],
        [
          "Main regions",
          "Bajo Aragón, La Rioja, Navarra, Terra Alta, Balearics"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and black table olives"
        ],
        [
          "Oil yield",
          "~18.3% of fruit weight"
        ],
        [
          "Harvest",
          "October to mid-December in Aragón"
        ],
        [
          "Propagation",
          "Grafted — rooting from cuttings is very poor"
        ],
        [
          "Analytical note",
          "Δ7-stigmastenol can exceed EU sterol limits in genuine oil"
        ]
      ],
      "aroma": [
        "Sweet",
        "Aromatic",
        "Ripe fruit",
        "No bitterness"
      ],
      "aromaNote": "General catalogue description. No published panel medians exist for monovarietal Empeltre.",
      "compare": {
        "origin": "Aragón, Spain",
        "polyphenols": "Not published",
        "sensory": "Yellow and smooth, sweet and aromatic, no bitterness",
        "pairing": "Cured fish, tomato bread, mild cheese"
      },
      "map": {
        "placeholder": "Map · Bajo Aragón",
        "caption": "Bajo Aragón, Ebro valley · 41.0° N, 0.2° W"
      },
      "seo": {
        "title": "Empeltre — The Grafted Olive of the Ebro | bestoliveoils.eu",
        "description": "Its name means \"grafted\", because it will not root from cuttings. The sweet, bitterness-free oil of Bajo Aragón — and its documented sterol quirk."
      },
      "sources": [
        {
          "label": "Empeltre clonal selection and sterols, Foods 11(17):2587",
          "url": "https://www.mdpi.com/2304-8158/11/17/2587"
        },
        {
          "label": "ESYRCE 2024, Spanish Ministry of Agriculture",
          "url": "https://www.mapa.gob.es/dam/mapa/contenido/estadisticas/temas/estadisticas-agrarias/2.agricultura/1.-encuesta-sobre-superficies-y-rendimientos-de-cultivos--esyrce/informes-sectoriales/olivar2024.pdf"
        }
      ]
    },
    {
      "slug": "royal-de-cazorla",
      "name": "Royal de Cazorla",
      "country": "Spain",
      "countryCode": "ES",
      "originRegion": "Sierra de Cazorla, Jaén",
      "purpose": "Oil",
      "tags": [
        "Spain · Jaén",
        "Rare",
        "Aromatic, low bitterness"
      ],
      "lede": "A mountain variety that survives as a six per cent minority inside a Picual monoculture, kept alive by its aroma rather than its yield. Royal gives less oil than Picual and measures higher in volatile compounds than any of the major Spanish cultivars.",
      "image": { "src": "assets/img/cultivars/royal-de-cazorla.webp", "alt": "Olive grove in Sierra de Cazorla, Jaén — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Royal olives / grove photo",
      "stats": [
        {
          "value": "~6%",
          "label": "of the Cazorla grove area"
        },
        {
          "value": "~75%",
          "label": "oleic acid (single study)"
        }
      ],
      "grove": [
        "Royal grows in the Sierra de Cazorla and the natural park of Sierras de Cazorla, Segura y Las Villas — some 70,000 hectares of mountain country where Picual takes 94% of the ground and Royal about 6%. Five cooperatives certify roughly 400,000 kilos of Royal oil a year. The tree flowers earlier than its neighbours but ripens later, is vigorous and consistently productive, and has notably brittle wood.",
        "One peer-reviewed study measured mill-extracted Royal at 74.9% oleic acid and 156 mg/kg total phenols under specified processing conditions, with volatile compounds at 18.98 mg/kg — higher than Picual, Arbequina, Koroneiki or Arbosana in the same work, dominated by C6 aldehydes. That is the trade in one line: less oil, less bitterness, more aroma."
      ],
      "reference": [
        [
          "Also called",
          "Royal (do not confuse with Royal de Calatayud)"
        ],
        [
          "Main regions",
          "Sierra de Cazorla, Jaén"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~74.9% (single published study)"
        ],
        [
          "Harvest",
          "Flowers early, ripens late"
        ],
        [
          "Shelf stability",
          "Not published"
        ],
        [
          "Watch out for",
          "Brittle wood; lower extraction efficiency than Picual"
        ]
      ],
      "aroma": [
        "Fresh green grass",
        "Apple",
        "Almond",
        "Fig"
      ],
      "aromaNote": "Descriptors from the Slow Food Ark of Taste entry and a peer-reviewed volatile study, which describes the oil as very fruity with very low bitterness. No panel medians published.",
      "compare": {
        "origin": "Jaén, Spain",
        "polyphenols": "~156 mg/kg (single study)",
        "sensory": "Very fruity and aromatic, lightly bitter, gently spicy",
        "pairing": "Raw over salads, fresh cheese, ripe tomato"
      },
      "map": {
        "placeholder": "Map · Sierra de Cazorla",
        "caption": "Sierra de Cazorla, Jaén · 37.9° N, 3.0° W"
      },
      "seo": {
        "title": "Royal de Cazorla — A Mountain Rarity | bestoliveoils.eu",
        "description": "Six per cent of a Picual monoculture, kept alive by aroma rather than yield. The Jaén mountain variety with the highest measured volatile content."
      },
      "sources": [
        {
          "label": "Royal cultivar oil, Foods 13(16):2588",
          "url": "https://www.mdpi.com/2304-8158/13/16/2588"
        },
        {
          "label": "Slow Food Ark of Taste — Royal extra virgin olive oil",
          "url": "https://www.fondazioneslowfood.com/en/ark-of-taste-slow-food/royal-extra-virgin-olive-oil/"
        }
      ]
    },
    {
      "slug": "coratina",
      "name": "Coratina",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Corato, Bari, Puglia",
      "purpose": "Oil",
      "tags": [
        "Italy · Puglia",
        "Monovarietal",
        "Very high phenolic"
      ],
      "lede": "The reference high-phenol Italian variety, and the one whose phenol load has been shown to translate directly into shelf life. In a same-site, same-mill comparison of eleven cultivars, Coratina measured 29.5 hours of oxidative stability against Leccino’s 17.5.",
      "image": { "src": "assets/img/cultivars/coratina.webp", "alt": "Olive grove in Corato, Bari, Puglia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Coratina olives / grove photo",
      "stats": [
        {
          "value": "330–410",
          "label": "mg/kg measured at bottling"
        },
        {
          "value": "~77%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Coratina occupies some 70,000 hectares in Puglia, 60,000 of them in the province of Bari around the town of Corato that gave it its name. The IOC suggests it descends from Frantoio and Lezze. It has weak to medium vigour, enters production early, tolerates cold, and detaches easily enough for mechanical harvesting — but it is highly susceptible to olive fruit fly and only weakly self-fertile.",
        "The remarkable finding about Coratina is longevity. A peer-reviewed study followed monovarietal Coratina kept in tins, in the dark, at ambient temperature, and found it still met the legal extra virgin limits after six years, with K270 the first parameter to fail. The other side of the same coin is bitterness: the variety produces so much of it that harvest date, not processing, is the lever growers use to keep it drinkable."
      ],
      "reference": [
        [
          "Also called",
          "Cima di Corato, Coratese, Racemo di Corato"
        ],
        [
          "Main regions",
          "Bari and Foggia, Puglia"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~77–78%"
        ],
        [
          "Harvest",
          "Late veraison, late oil accumulation"
        ],
        [
          "Shelf stability",
          "29.5 h Rancimat at 110 °C — highest of eleven cultivars tested"
        ],
        [
          "Watch out for",
          "Very susceptible to olive fruit fly; low self-fertility"
        ]
      ],
      "aroma": [
        "Green olive",
        "Cut grass",
        "Green almond",
        "Artichoke",
        "Herbaceous"
      ],
      "aromaNote": "Published panel work places Coratina in the high-bitterness, high-pungency group but reports statistical groupings rather than 0–10 medians. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Puglia, Italy",
        "polyphenols": "330–410 mg/kg",
        "sensory": "Powerfully green and herbaceous, strong bitterness and pungency",
        "pairing": "Bean soups, grilled meat, bitter greens"
      },
      "map": {
        "placeholder": "Map · Corato, Puglia",
        "caption": "Corato, Bari, Puglia · 41.2° N, 16.4° E"
      },
      "seo": {
        "title": "Coratina — Italy’s High-Phenol Olive | bestoliveoils.eu",
        "description": "The Puglian variety documented to stay within extra virgin limits for six years in the tin. Polyphenols, oleic acid, oxidative stability and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/italy/coratina"
        },
        {
          "label": "Eleven monovarietal EVOOs grown and processed alike, Foods 9(7):904",
          "url": "https://www.mdpi.com/2304-8158/9/7/904"
        },
        {
          "label": "Long-term durability of Coratina monovarietal EVOO, OCL 2022",
          "url": "https://www.ocl-journal.org/articles/ocl/full_html/2022/01/ocl220002/ocl220002.html"
        }
      ]
    },
    {
      "slug": "frantoio",
      "name": "Frantoio",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Tuscany",
      "purpose": "Oil",
      "tags": [
        "Italy · Tuscany",
        "Monovarietal",
        "The standard pollinator"
      ],
      "lede": "The genetic backbone of Italian oil growing. The same genotype circulates as Frantoio in Tuscany, Correggiolo in Romagna, Razza in the Veneto and Casaliva on Lake Garda — and at roughly 28% self-fertility it is the default pollinator for everything that cannot pollinate itself.",
      "image": { "src": "assets/img/cultivars/frantoio.webp", "alt": "Olive grove in Tuscany — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Frantoio olives / grove photo",
      "stats": [
        {
          "value": "~230",
          "label": "mg/kg in a like-for-like trial"
        },
        {
          "value": "~76%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Frantoio is grown across Tuscany, Umbria, Liguria and Puglia under a dozen regional names, and has been exported to essentially every new olive-growing country — Australia and the United States know it as Oblonga. It is strongly vigorous with a spreading habit, high and constant productivity, and fruit that detaches readily. It is cold-sensitive and highly susceptible to peacock spot, olive knot and fly, but partially resistant to Verticillium.",
        "Its real significance is reproductive. At around 28% self-fertility and only 3% ovary abortion, it is the most reliable pollen source among the classic Italian cultivars, which is why it turns up as a minority planting in orchards whose main variety is self-sterile. The IOC also suggests it is one parent of Coratina."
      ],
      "reference": [
        [
          "Also called",
          "Correggiolo, Razza, Razzo, Oblonga, Frantoiano"
        ],
        [
          "Main regions",
          "Tuscany, Umbria, Liguria, Puglia; worldwide"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~75–78%"
        ],
        [
          "Harvest",
          "Medium-late veraison"
        ],
        [
          "Self-fertility",
          "~28% — the highest among the classic Italian cultivars"
        ],
        [
          "Watch out for",
          "Cold-sensitive; susceptible to peacock spot, knot and fly"
        ]
      ],
      "aroma": [
        "Cut grass",
        "Green almond",
        "Artichoke",
        "Herbaceous"
      ],
      "aromaNote": "Descriptors as published in variety catalogues and reference literature, which describe a strong, aromatic, grassy fruitiness with marked pungency when picked green. No panel medians published.",
      "compare": {
        "origin": "Tuscany, Italy",
        "polyphenols": "~230 mg/kg",
        "sensory": "Aromatic and grassy, bright green, firmly pungent when early",
        "pairing": "Ribollita, grilled bread, white beans"
      },
      "map": {
        "placeholder": "Map · Tuscany",
        "caption": "Tuscany, Italy · 43.4° N, 11.2° E"
      },
      "seo": {
        "title": "Frantoio — Italy’s Reference Olive | bestoliveoils.eu",
        "description": "One genotype under many names — Correggiolo, Razza, Casaliva — and the pollinator that makes self-sterile Italian orchards work. Chemistry and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/italy/frantoio"
        },
        {
          "label": "Genetic resources of Olea europaea in the Garda Trentino, Genes 11(10):1171",
          "url": "https://www.mdpi.com/2073-4425/11/10/1171"
        },
        {
          "label": "Eleven monovarietal EVOOs grown and processed alike, Foods 9(7):904",
          "url": "https://www.mdpi.com/2304-8158/9/7/904"
        }
      ]
    },
    {
      "slug": "leccino",
      "name": "Leccino",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Tuscany",
      "purpose": "Oil",
      "tags": [
        "Italy · Tuscany",
        "Monovarietal",
        "Low phenolic"
      ],
      "lede": "The mild, early-ripening blending partner of Tuscan oil — deliberately low in phenols — and, right now, the most agronomically important olive in Italy, because it is one of only two cultivars approved for replanting the Xylella-devastated groves of Salento.",
      "image": { "src": "assets/img/cultivars/leccino.webp", "alt": "Olive grove in Tuscany — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Leccino olives / grove photo",
      "stats": [
        {
          "value": "~150",
          "label": "mg/kg in a like-for-like trial"
        },
        {
          "value": "17.5 h",
          "label": "Rancimat — lowest of eleven cultivars"
        }
      ],
      "grove": [
        "Leccino is widespread in Tuscany and has spread to Umbria, Puglia and new olive countries. It is strongly vigorous with a dense spreading canopy, comes into production early, and yields high and constant crops. It is totally self-sterile — Frantoio and Pendolino are the conventional pollinators — yet its own abundant, viable flowering makes it an excellent pollen donor in return.",
        "Then there is Xylella fastidiosa. Screening under high inoculum pressure found Leccino showed the lowest bacterial colonisation and the lowest level of symptoms of the cultivars tested, and it is one of only two varieties permitted for olive reconversion in infected areas. That is resistance, not immunity: the same work notes Leccino still supports colonisation and can show symptoms."
      ],
      "reference": [
        [
          "Also called",
          "Leccio, Silvestrone, Premice, Toscano"
        ],
        [
          "Main regions",
          "Tuscany, Umbria, Puglia"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~76–77%"
        ],
        [
          "Harvest",
          "Early ripening, staggered oil accumulation"
        ],
        [
          "Shelf stability",
          "Low — 17.5 h Rancimat at 110 °C"
        ],
        [
          "Xylella fastidiosa",
          "Lowest colonisation of cultivars screened; one of two approved for replanting"
        ]
      ],
      "aroma": [
        "Mild fruitiness",
        "Soft herbs",
        "Light spice"
      ],
      "aromaNote": "The IOC describes Leccino as a medium-quality oil, and published panel work groups it low on fruitiness, bitterness and pungency. No medians published. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Tuscany, Italy",
        "polyphenols": "~150 mg/kg",
        "sensory": "Mild and soft, light spice, low bitterness",
        "pairing": "Fish, delicate vegetables, blending with Frantoio"
      },
      "map": {
        "placeholder": "Map · Tuscany",
        "caption": "Tuscany, Italy · 43.4° N, 11.2° E"
      },
      "seo": {
        "title": "Leccino — Mild, and Xylella-Tolerant | bestoliveoils.eu",
        "description": "The deliberately gentle Tuscan blending variety, and one of only two cultivars approved for replanting Puglia’s Xylella-hit groves. Chemistry and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/italy/leccino"
        },
        {
          "label": "Olive genotypes potentially resistant to Xylella fastidiosa, Front. Plant Sci. 2021",
          "url": "https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2021.723879/full"
        },
        {
          "label": "Eleven monovarietal EVOOs grown and processed alike, Foods 9(7):904",
          "url": "https://www.mdpi.com/2304-8158/9/7/904"
        }
      ]
    },
    {
      "slug": "moraiolo",
      "name": "Moraiolo",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Tuscany and Umbria",
      "purpose": "Oil",
      "tags": [
        "Italy · Umbria",
        "Monovarietal",
        "High phenolic"
      ],
      "lede": "The hillside variety of central Italy: low-growing, upright, drought-tolerant and distinctly cold-sensitive — a combination that keeps it in the Umbrian and Tuscan hills and out of the flat coastal plantings. Its oil sits at the opposite end of the intensity scale from Leccino.",
      "image": { "src": "assets/img/cultivars/moraiolo.webp", "alt": "Olive grove in Tuscany and Umbria — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Moraiolo olives / grove photo",
      "stats": [
        {
          "value": "~270",
          "label": "mg/kg in a like-for-like trial"
        },
        {
          "value": "~75%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Umbria’s regional register counts 2,373,500 Moraiolo trees — 42% of the region’s olives — and at least 90% of the historic groves in the Assisi to Spoleto belt. Oil content runs 14.9 to 21.7% on fresh fruit. The tree has low vigour and an upright habit, tolerates drought well and olive fly reasonably, but is highly sensitive to cold and highly susceptible to peacock spot, olive knot and Verticillium.",
        "It is self-sterile and pollinated by Maremmano, Mignolo, Pendolino or Morchiaio. Harvest runs mid-October to mid-December, with slow, concurrent ripening — and phenols decline only slightly as it ripens, which is unusual and gives growers a wider window than Hojiblanca or Chalkidiki allow."
      ],
      "reference": [
        [
          "Also called",
          "Assisano, Morello, Morellino, Fosco"
        ],
        [
          "Main regions",
          "Umbria, Tuscany, Marche"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "~75%"
        ],
        [
          "Harvest",
          "Mid-October to mid-December"
        ],
        [
          "Tolerances",
          "Drought tolerant, highly cold-sensitive"
        ],
        [
          "Watch out for",
          "Peacock spot, olive knot, Verticillium"
        ]
      ],
      "aroma": [
        "Green olive",
        "Artichoke",
        "Bitter herbs",
        "Almond"
      ],
      "aromaNote": "Published panel work groups Moraiolo high on fruitiness, bitterness and pungency but reports statistical groupings rather than medians. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Umbria, Italy",
        "polyphenols": "~270 mg/kg",
        "sensory": "Intense and structured, pronounced bitterness and pungency",
        "pairing": "Legume soups, grilled meat, bruschetta"
      },
      "map": {
        "placeholder": "Map · Colli Martani, Umbria",
        "caption": "Umbria, Italy · 43.0° N, 12.5° E"
      },
      "seo": {
        "title": "Moraiolo — The Umbrian Hill Olive | bestoliveoils.eu",
        "description": "42% of Umbria’s olive trees. Low vigour, upright, drought-tolerant and cold-sensitive — the agronomy that keeps it on the hillsides. Chemistry and taste."
      },
      "sources": [
        {
          "label": "Regione Umbria regional variety register — Moraiolo",
          "url": "https://biodiversita.umbria.parco3a.org/wp-content/uploads/2020/04/Scheda_Iscrizione_Registro_-Regionale_Olivo_Moraiolo.pdf"
        },
        {
          "label": "Eleven monovarietal EVOOs grown and processed alike, Foods 9(7):904",
          "url": "https://www.mdpi.com/2304-8158/9/7/904"
        }
      ]
    },
    {
      "slug": "taggiasca",
      "name": "Taggiasca",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Taggia, Imperia, Liguria",
      "purpose": "Dual-purpose",
      "tags": [
        "Italy · Liguria",
        "Dual-purpose",
        "Delicate by regulation"
      ],
      "lede": "The rare cultivar whose protected designation requires its oil to be gentle. The Riviera dei Fiori DOP caps bitterness at \"barely perceptible\" and fruitiness at light-to-medium — the inverse of how almost every other quality specification is written.",
      "image": { "src": "assets/img/cultivars/taggiasca.webp", "alt": "Olive grove in Taggia, Imperia, Liguria — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Taggiasca olives / grove photo",
      "stats": [
        {
          "value": "~24–27%",
          "label": "oil content of the fruit"
        },
        {
          "value": "≥90%",
          "label": "required in Riviera dei Fiori DOP"
        }
      ],
      "grove": [
        "Taggiasca is the olive of western Liguria — Imperia province and parts of Savona — and it is grown for both oil and table use, as brined olives and as paste. The tree reaches 15 or 16 metres with a heavily ramified, pendulous canopy, is only partially self-fertile, roots poorly, and is described as markedly sensitive to both cold and drought. It is also very susceptible to the main pests and diseases.",
        "Its ripening is late and conspicuously non-simultaneous, extending into January, which is why Ligurian harvesting has traditionally been done with nets over weeks rather than in a single pass. Between the tree’s size, its weeping habit and the staggered ripening, it is one of the least mechanisable major Italian cultivars — and one of the most expensive to pick."
      ],
      "reference": [
        [
          "Also called",
          "Gentile, Giuggiolina"
        ],
        [
          "Main regions",
          "Imperia and Savona, Liguria"
        ],
        [
          "Purpose",
          "Dual-purpose — oil, brined olives, paste"
        ],
        [
          "Oil yield",
          "~24–27% of fruit weight"
        ],
        [
          "Harvest",
          "Late and staggered, extending into January"
        ],
        [
          "DOP sensory limits",
          "Light to medium fruity; bitterness barely perceptible"
        ],
        [
          "Watch out for",
          "Sensitive to cold and drought; hard to mechanise"
        ]
      ],
      "aroma": [
        "Pine nut",
        "Sweet almond",
        "Raw artichoke",
        "Light fruit"
      ],
      "aromaNote": "The Riviera dei Fiori DOP specification is itself a published sensory definition: fruity of light or medium intensity, decidedly sweet, with at most a light pungency and barely perceptible bitterness.",
      "compare": {
        "origin": "Liguria, Italy",
        "polyphenols": "Low (no measured range published)",
        "sensory": "Delicate and sweet, almond and pine nut, almost no bitterness",
        "pairing": "Pesto, fish, shellfish, steamed vegetables"
      },
      "map": {
        "placeholder": "Map · Riviera di Ponente",
        "caption": "Taggia, Imperia, Liguria · 43.9° N, 7.9° E"
      },
      "seo": {
        "title": "Taggiasca — Liguria’s Delicate Olive | bestoliveoils.eu",
        "description": "The DOP that legally requires low intensity: bitterness barely perceptible, fruitiness light to medium. Why Taggiasca is the hardest classic olive to pick."
      },
      "sources": [
        {
          "label": "Consorzio di Tutela Olio DOP Riviera Ligure — cultivars",
          "url": "https://www.oliorivieraligure.it/en/le-cultivar/"
        },
        {
          "label": "Riviera Ligure DOP specification parameters",
          "url": "https://www.agraria.org/prodottitipici/oliorivieraligure.htm"
        },
        {
          "label": "Regione Liguria — Agriligurianet, Olivo",
          "url": "https://www.agriligurianet.it/en/vetrina/prodotti-e-produzioni/olio-e-olive/prodotti-tipiciolio/item/201-olivo.html"
        }
      ]
    },
    {
      "slug": "casaliva",
      "name": "Casaliva",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Lake Garda — Trentino, Brescia, Verona",
      "purpose": "Oil",
      "tags": [
        "Italy · Lake Garda",
        "Monovarietal",
        "Northern limit"
      ],
      "lede": "The northernmost commercially significant Italian oil variety, grown at the thermal limit of olive cultivation. Genetic fingerprinting shows it is the Garda name for the Frantoio genotype — and its oils are measurably lower in phenols than the same genotype grown further south.",
      "image": { "src": "assets/img/cultivars/casaliva.webp", "alt": "Olive grove in Lake Garda — Trentino, Brescia, Verona — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Casaliva olives / grove photo",
      "stats": [
        {
          "value": "110–200",
          "label": "mg/kg in a Garda survey"
        },
        {
          "value": "~19.5%",
          "label": "oil content of the fruit"
        }
      ],
      "grove": [
        "Casaliva is the dominant variety of the Garda DOP, grown around the lake across Trentino, Brescia and Verona, and recorded under the names Casaliva, Drizzar, Casalì and Nostran since the beginning of the nineteenth century. The tree is vigorous, first upright then weeping — explicitly compared to Frantoio in the catalogues — productive and constant, sensitive to low temperatures and susceptible to peacock spot and olive knot.",
        "SSR genotyping of ancient Garda trees concluded that Casaliva and Razza are synonyms of Frantoio, an old genotype carrying wide intra-varietal variability. That is the honest framing: a locally selected population maintained for two centuries, genetically Frantoio at the marker level, legally and commercially a distinct Garda cultivar. Its phenol figures — 111 to 197 mg/kg in a multi-year Brescia survey — are a clean demonstration that cultivar alone does not set phenol content. The environment does much of the work."
      ],
      "reference": [
        [
          "Also called",
          "Drizzar, Zentil, Casalì, Nostran"
        ],
        [
          "Main regions",
          "Lake Garda — Trentino, Brescia, Verona"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Genetics",
          "A synonym of Frantoio at SSR marker level"
        ],
        [
          "Harvest",
          "Late maturation; picked early in practice, for frost risk"
        ],
        [
          "Shelf stability",
          "Not published"
        ],
        [
          "Watch out for",
          "Cold-sensitive at the northern limit of the crop"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "No catalogue descriptor from a primary source could be verified for Casaliva. Descriptions circulate, but we are not repeating them without a source.",
      "compare": {
        "origin": "Lake Garda, Italy",
        "polyphenols": "110–200 mg/kg",
        "sensory": "Not published from a primary source",
        "pairing": "Lake fish, risotto, delicate preparations"
      },
      "map": {
        "placeholder": "Map · Lake Garda",
        "caption": "Lake Garda, northern Italy · 45.6° N, 10.6° E"
      },
      "seo": {
        "title": "Casaliva — Olive Oil at the Northern Limit | bestoliveoils.eu",
        "description": "The Garda variety that is genetically Frantoio, and whose low phenol figures show how much of a cultivar’s chemistry is really set by climate."
      },
      "sources": [
        {
          "label": "Genetic resources of Olea europaea in the Garda Trentino, Genes 11(10):1171",
          "url": "https://www.mdpi.com/2073-4425/11/10/1171"
        },
        {
          "label": "Ripening stage and quality indices of Garda monovarietal oils, L’Informatore Agrario",
          "url": "https://air.unimi.it/retrieve/handle/2434/213243/258101/Stadio%20di%20maturazione%20e%20indici%20qualitativi%20e%20compositivi%20di%20oli%20monovarietali%20(Iinformatore%20Agrario%2014-2003).pdf"
        }
      ]
    },
    {
      "slug": "nocellara-del-belice",
      "name": "Nocellara del Belice",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Valle del Belìce, Sicily",
      "purpose": "Dual-purpose",
      "tags": [
        "Italy · Sicily",
        "Dual-purpose",
        "DOP in two categories"
      ],
      "lede": "The variety sold worldwide as the Castelvetrano table olive — and the reason those olives are green rather than black is simply that the fruit stays green at full ripeness. It is one of very few olives that is a first-rank table variety and a serious oil variety at the same time.",
      "image": { "src": "assets/img/cultivars/nocellara-del-belice.webp", "alt": "Olive grove in Valle del Belìce, Sicily — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Nocellara del Belice olives / grove photo",
      "stats": [
        {
          "value": "~330",
          "label": "mg/kg mean, 125 samples"
        },
        {
          "value": "~73%",
          "label": "mean oleic acid"
        }
      ],
      "grove": [
        "Nocellara del Belice comes from the Belìce valley straddling Trapani and Agrigento, and is overwhelmingly Sicilian: 98 of 125 samples in Italy’s national monovarietal database came from the island. The tree is of medium vigour, self-sterile, and only moderately productive, but its fruit detaches easily, which makes it genuinely mechanisable. It is susceptible to drought and very susceptible to olive fly, peacock spot and olive knot.",
        "It is the only variety here holding protected status in both product categories: Valle del Belìce DOP for the oil, which requires at least 70% Nocellara, and Nocellara del Belice DOP for the table olives. Do not confuse it with Nocellara Etnea or Nocellara Messinese, which are separate varieties despite the shared name."
      ],
      "reference": [
        [
          "Also called",
          "Tunna, Oliva di Castelvetrano, Nocellara di Castelvetrano"
        ],
        [
          "Main regions",
          "Trapani and Agrigento, Sicily"
        ],
        [
          "Purpose",
          "Dual-purpose — green table olives and oil"
        ],
        [
          "Oil yield",
          "18–19% of fruit weight"
        ],
        [
          "Harvest",
          "Late ripening"
        ],
        [
          "Designations",
          "Valle del Belìce DOP (oil, ≥70%); Nocellara del Belice DOP (table)"
        ],
        [
          "Watch out for",
          "Self-sterile; susceptible to drought, fly, peacock spot, knot"
        ]
      ],
      "aroma": [
        "Cut grass",
        "Tomato",
        "Fresh almond",
        "Artichoke"
      ],
      "aromaNote": "From the sensory typology assigned by Italy’s national monovarietal database: medium to high olive fruitiness with grassy notes and tomato scent, medium bitterness and pungency. A database typology, not a single panel median.",
      "compare": {
        "origin": "Sicily, Italy",
        "polyphenols": "~330 mg/kg mean",
        "sensory": "Green and grassy with tomato, medium bitterness and pungency",
        "pairing": "Caponata, grilled fish, tomato dishes"
      },
      "map": {
        "placeholder": "Map · Valle del Belìce",
        "caption": "Valle del Belìce, Sicily · 37.7° N, 12.9° E"
      },
      "seo": {
        "title": "Nocellara del Belice — Castelvetrano | bestoliveoils.eu",
        "description": "The Sicilian variety behind Castelvetrano table olives, protected in both oil and table categories. Why the fruit stays green, plus chemistry and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/italy/nocellara-del-belice"
        },
        {
          "label": "Banca dati nazionale degli oli monovarietali italiani",
          "url": "https://www.olimonovarietali.it/en/database/cultivar/?id=NOCELLARA+DEL+BELICE"
        }
      ]
    },
    {
      "slug": "tonda-iblea",
      "name": "Tonda Iblea",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Monti Iblei, Ragusa and Siracusa, Sicily",
      "purpose": "Dual-purpose",
      "tags": [
        "Italy · Sicily",
        "Dual-purpose",
        "Tomato character"
      ],
      "lede": "The reference Sicilian variety for the tomato-leaf aroma type, and the one with the highest pulp-to-stone ratio in this whole set — about 88% flesh. That makes a superb table olive and, inconveniently, a poor oil yield for the size of the fruit.",
      "image": { "src": "assets/img/cultivars/tonda-iblea.webp", "alt": "Olive grove in Monti Iblei, Ragusa and Siracusa, Sicily — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Tonda Iblea olives / grove photo",
      "stats": [
        {
          "value": "~285",
          "label": "mg/kg mean, 69 samples"
        },
        {
          "value": "5.1",
          "label": "pulp-to-stone ratio"
        }
      ],
      "grove": [
        "Tonda Iblea is native to the Hyblaean uplands of south-eastern Sicily, concentrated in Ragusa and Siracusa. Mean drupe weight is 5.64 grams at a pulp-to-stone ratio of 5.1 — roughly 88% flesh. It is practically self-sterile, with Calatina, Moresca and Zaituna used as pollinators, reported as cold-tolerant, and susceptible to scale, Verticillium, anthracnose and peacock spot. It is also prone to acinellatura, the clustering of undersized fruit in some seasons.",
        "Its tomato character is famous and repeatedly documented in catalogues and trade-technical sources, which give a medium-intense fruitiness with medium bitterness and medium-intense pungency over green tomato and tomato leaf. We should be straight about the limit of that evidence: we could not find a peer-reviewed volatile study isolating the compounds responsible in this specific cultivar."
      ],
      "reference": [
        [
          "Also called",
          "Cetrala"
        ],
        [
          "Main regions",
          "Ragusa and Siracusa, Sicily"
        ],
        [
          "Purpose",
          "Dual-purpose — table and oil"
        ],
        [
          "Oleic acid",
          "~70.5% mean"
        ],
        [
          "Oil yield",
          "Sources disagree: 16–20%, or around 11–15%"
        ],
        [
          "Designations",
          "Monti Iblei DOP, Sicilia IGP"
        ],
        [
          "Watch out for",
          "Self-sterile; low oil yield for the fruit size"
        ]
      ],
      "aroma": [
        "Green tomato",
        "Tomato leaf",
        "Cut grass",
        "Artichoke",
        "Almond"
      ],
      "aromaNote": "Descriptors from Sicilian variety catalogues and the national monovarietal database typology. No peer-reviewed volatile study isolating the tomato note in this cultivar was found.",
      "compare": {
        "origin": "Sicily, Italy",
        "polyphenols": "~285 mg/kg mean",
        "sensory": "Unmistakable green tomato, medium bitterness, medium-intense pungency",
        "pairing": "Tomato and bread, ricotta, raw over pasta"
      },
      "map": {
        "placeholder": "Map · Monti Iblei",
        "caption": "Monti Iblei, Sicily · 37.0° N, 14.7° E"
      },
      "seo": {
        "title": "Tonda Iblea — Sicily’s Tomato-Leaf Olive | bestoliveoils.eu",
        "description": "About 88% flesh, and the reference variety for the tomato aroma type. What the sensory evidence actually supports, plus chemistry and harvest."
      },
      "sources": [
        {
          "label": "Banca dati nazionale degli oli monovarietali italiani",
          "url": "https://www.olimonovarietali.it/en/database/cultivar/?id=TONDA%20IBLEA"
        },
        {
          "label": "Plantgest variety sheet — Tonda Iblea",
          "url": "https://plantgest.imagelinenetwork.com/it/varieta/frutticole/olivo-da-mensa/tonda-iblea/8016"
        },
        {
          "label": "Cronache di Gusto — Tonda Iblea",
          "url": "https://www.cronachedigusto.it/scenari/olio-oliva-tonda-iblea-olive-mensa/"
        }
      ]
    },
    {
      "slug": "itrana",
      "name": "Itrana",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Itri, Latina, Lazio",
      "purpose": "Dual-purpose",
      "tags": [
        "Italy · Lazio",
        "Dual-purpose",
        "High oleic"
      ],
      "lede": "One variety, two harvests months apart: picked green in autumn it gives a high-oleic, green-tomato oil, and left to turn fully black it becomes the Oliva di Gaeta. It also carries real winter cold tolerance, which is rare in this company.",
      "image": { "src": "assets/img/cultivars/itrana.webp", "alt": "Olive grove in Itri, Latina, Lazio — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Itrana olives / grove photo",
      "stats": [
        {
          "value": "~381",
          "label": "mg/kg mean, 211 samples"
        },
        {
          "value": "~76.5%",
          "label": "mean oleic acid — the highest here"
        }
      ],
      "grove": [
        "Itrana takes its name from Itri in the province of Latina and accounts for around 70% of the olive plants there; 208 of 211 samples in the national database came from Lazio. The tree is highly vigorous with an upright habit and dense canopy, roots readily, and is self-incompatible — Leccino, Pendolino and Olivastro are used as pollinators. It tolerates the main fungal diseases but is susceptible to olive fly.",
        "Its mean oleic acid of 76.47% across 211 commercial samples is the highest of the Italian varieties in this set, and the DOP Colline Pontine sets a floor of 72% along with a phenol minimum above 100 mg/kg. Ripening is late and staggered, which is exactly what makes the two-crop strategy possible."
      ],
      "reference": [
        [
          "Also called",
          "Gaetana, Oliva di Gaeta, Oliva di Esperia, Trana"
        ],
        [
          "Main regions",
          "Latina province, Lazio"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and black table olives"
        ],
        [
          "Oleic acid",
          "~76.5% mean, range 70–83%"
        ],
        [
          "Harvest",
          "Late and staggered"
        ],
        [
          "Designations",
          "Colline Pontine DOP (50–100%); Oliva di Gaeta DOP (table)"
        ],
        [
          "Tolerances",
          "Notable winter cold tolerance"
        ]
      ],
      "aroma": [
        "Green tomato",
        "Cut grass",
        "Green almond",
        "Artichoke"
      ],
      "aromaNote": "From the national monovarietal database typology and the Colline Pontine DOP specification, which describes a medium to intense fruity aroma of green olives with an almond aftertaste. No panel medians published.",
      "compare": {
        "origin": "Lazio, Italy",
        "polyphenols": "~381 mg/kg mean",
        "sensory": "Green tomato and almond, medium bitterness and pungency",
        "pairing": "Buffalo mozzarella, bruschetta, braised greens"
      },
      "map": {
        "placeholder": "Map · Colline Pontine",
        "caption": "Itri, Latina, Lazio · 41.3° N, 13.5° E"
      },
      "seo": {
        "title": "Itrana — Green Oil and the Gaeta Olive | bestoliveoils.eu",
        "description": "The Lazio variety that yields two crops months apart, and the highest mean oleic acid of the Italian cultivars in our set. Chemistry, DOPs and taste."
      },
      "sources": [
        {
          "label": "Banca dati nazionale degli oli monovarietali italiani",
          "url": "https://www.olimonovarietali.it/en/database/cultivar/?id=ITRANA"
        },
        {
          "label": "Colline Pontine DOP and Oliva di Gaeta DOP",
          "url": "https://www.oliocentrica.it/en/itrana-extra-virgin-olive-oil-and-the-pontine-pdo-hills/"
        }
      ]
    },
    {
      "slug": "peranzana",
      "name": "Peranzana",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Alto Tavoliere, Foggia, Puglia",
      "purpose": "Dual-purpose",
      "tags": [
        "Italy · Puglia",
        "Dual-purpose",
        "Needs pollinators"
      ],
      "lede": "Puglia has always told a story about this variety arriving from Provence — the local names Provenzale and Francese preserve it. The molecular evidence points somewhere else entirely: Peranzana is the same genotype as Sardinia’s Bosana.",
      "image": { "src": "assets/img/cultivars/peranzana.webp", "alt": "Olive grove in Alto Tavoliere, Foggia, Puglia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Peranzana olives / grove photo",
      "stats": [
        {
          "value": "~396",
          "label": "mg/kg mean, 223 samples"
        },
        {
          "value": "~4%",
          "label": "self-fertility"
        }
      ],
      "grove": [
        "Peranzana is grown in the Alto Tavoliere north-west of Foggia, around Torremaggiore, with smaller plantings in Molise and Marche. Estimates of its area range from 5,000–6,000 hectares to about 10,000, depending on whether table-only groves are counted. It is medium in vigour, roots poorly, comes into bearing late, and yields modestly in the early years.",
        "Its reproductive biology is the planting constraint that matters: self-fertility around 4% and ovary abortion around 40% mean an orchard depends heavily on cross-pollination. And despite the IOC classifying its phenol content as low, two decades of panel-tested Apulian monovarietals give a mean of 396 mg/kg — among the higher figures in this set."
      ],
      "reference": [
        [
          "Also called",
          "Provenzale, Francese; genetically the same as Bosana"
        ],
        [
          "Main regions",
          "Alto Tavoliere, Foggia; Molise, Marche"
        ],
        [
          "Purpose",
          "Dual-purpose, oil dominant"
        ],
        [
          "Oleic acid",
          "~71.7% mean"
        ],
        [
          "Oil yield",
          "Medium-low, around 15%"
        ],
        [
          "Designations",
          "Dauno DOP, Alto Tavoliere mention (≥80%)"
        ],
        [
          "Watch out for",
          "Self-fertility ~4% — pollinators are essential"
        ]
      ],
      "aroma": [
        "Cut grass",
        "Artichoke",
        "Fresh almond",
        "Tomato"
      ],
      "aromaNote": "From the national monovarietal database typology: medium to high olive fruitiness with grass, artichoke, almond and tomato, medium bitterness and pungency. No panel medians published.",
      "compare": {
        "origin": "Puglia, Italy",
        "polyphenols": "~396 mg/kg mean",
        "sensory": "Balanced — sweet, bitter and pungent at once, almond finish",
        "pairing": "Grilled vegetables, orecchiette, fresh cheese"
      },
      "map": {
        "placeholder": "Map · Alto Tavoliere",
        "caption": "Torremaggiore, Foggia, Puglia · 41.7° N, 15.3° E"
      },
      "seo": {
        "title": "Peranzana — Puglia’s Provençal Myth | bestoliveoils.eu",
        "description": "Local names say it came from Provence; SSR fingerprinting says it is Sardinia’s Bosana. Chemistry, the 4% self-fertility problem, and how it tastes."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/italy/peranzana"
        },
        {
          "label": "Banca dati nazionale degli oli monovarietali italiani",
          "url": "https://www.olimonovarietali.it/en/database/cultivar/?id=PERANZANA"
        },
        {
          "label": "Genetic and cyto-histological analyses in Olea europaea, Int. J. Mol. Sci. 27(1):94",
          "url": "https://www.mdpi.com/1422-0067/27/1/94"
        }
      ]
    },
    {
      "slug": "bosana",
      "name": "Bosana",
      "country": "Italy",
      "countryCode": "IT",
      "originRegion": "Sardinia",
      "purpose": "Oil",
      "tags": [
        "Italy · Sardinia",
        "Monovarietal",
        "High phenolic"
      ],
      "lede": "The cultivar of an entire island — over half of Sardinian production — and the highest mean phenol content in Italy’s national monovarietal dataset. It is also, genetically, the same variety as Puglia’s Peranzana.",
      "image": { "src": "assets/img/cultivars/bosana.webp", "alt": "Olive grove in Sardinia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Bosana olives / grove photo",
      "stats": [
        {
          "value": "~415",
          "label": "mg/kg mean, 260 samples"
        },
        {
          "value": "~71.7%",
          "label": "mean oleic acid"
        }
      ],
      "grove": [
        "Bosana dominates the centre-north of Sardinia — Sassari, the Nurra, Marghine and Planargia — and is present across the rest of the island. All 260 samples in twenty-one years of the national database came from Sardinia. Ripening is late and staggered with harvest in November and December, and the sources are explicit that early picking gives the better oil.",
        "It is one of the few traditional varieties expressly studied as a cultivar for intensive olive growing, and it is reported as highly resistant to heat and to olive knot. Its practical weakness is nursery propagation: rooting from cuttings is very low. Sources also disagree on whether it is partially self-compatible or outright self-sterile, so pollinators are the safe assumption."
      ],
      "reference": [
        [
          "Also called",
          "Sassarese, Tondo di Sassari, Algherese, Palma"
        ],
        [
          "Main regions",
          "Sassari, Nurra, Marghine, Planargia, Sardinia"
        ],
        [
          "Purpose",
          "Oil, with larger fruit used for the table"
        ],
        [
          "Oleic acid",
          "~71.7% mean"
        ],
        [
          "Harvest",
          "November–December, late and staggered"
        ],
        [
          "Designations",
          "Sardegna DOP"
        ],
        [
          "Watch out for",
          "Very low rooting from cuttings; fertility disputed"
        ]
      ],
      "aroma": [
        "Cut grass",
        "Artichoke",
        "Fresh almond",
        "Tomato"
      ],
      "aromaNote": "The national database assigns Bosana the same sensory typology as Peranzana — consistent with their shared genotype. No panel medians published.",
      "compare": {
        "origin": "Sardinia, Italy",
        "polyphenols": "~415 mg/kg mean",
        "sensory": "Fruity, firmly bitter and pungent",
        "pairing": "Pane carasau, lamb, pecorino, fish stew"
      },
      "map": {
        "placeholder": "Map · northern Sardinia",
        "caption": "Sassari, Sardinia · 40.7° N, 8.6° E"
      },
      "seo": {
        "title": "Bosana — Sardinia’s Own Olive | bestoliveoils.eu",
        "description": "Over half of Sardinian production and the highest mean phenol content in Italy’s national monovarietal dataset. Chemistry, harvest and how it tastes."
      },
      "sources": [
        {
          "label": "Banca dati nazionale degli oli monovarietali italiani",
          "url": "https://www.olimonovarietali.it/en/database/cultivar/?id=BOSANA"
        },
        {
          "label": "Genetic and cyto-histological analyses in Olea europaea, Int. J. Mol. Sci. 27(1):94",
          "url": "https://www.mdpi.com/1422-0067/27/1/94"
        }
      ]
    },
    {
      "slug": "ayvalik",
      "name": "Ayvalık",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Edremit Gulf, Balıkesir",
      "purpose": "Oil",
      "tags": [
        "Türkiye · Balıkesir",
        "Monovarietal",
        "High pigment"
      ],
      "lede": "Türkiye’s second oil variety, from the Edremit Gulf on the north Aegean coast. Among the major Turkish cultivars it is the low-phenol, high-pigment one — a greener-looking oil with a gentler bitter and pungent load than Memecik.",
      "image": { "src": "assets/img/cultivars/ayvalik.webp", "alt": "Olive grove in Edremit Gulf, Balıkesir — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Ayvalık olives / grove photo",
      "stats": [
        {
          "value": "~24%",
          "label": "oil content of the fruit"
        },
        {
          "value": "70–72%",
          "label": "oleic acid, typical"
        }
      ],
      "grove": [
        "Ayvalık — also called Edremit Yağlık — grows along the Edremit Gulf in Balıkesir province, through Ayvalık, Gömeç and Burhaniye, extending into Çanakkale and northern İzmir. The tree is of medium vigour with small round fruit and a low tendency to alternate bearing, but it is sensitive both to drought and to frost, which narrows where it can be planted.",
        "It is the only one of Türkiye’s four leading cultivars with no entry in the IOC World Catalogue, so its published agronomic description rests almost entirely on Turkish ministry and institute material. Its measured phenol figures scatter widely across studies — from 46 to 235 mg/kg — which reflects ripeness and site rather than a stable varietal value, so no single typical number should be quoted. What is consistent is the pigment: the highest chlorophyll and carotenoid content of the Turkish cultivars tested."
      ],
      "reference": [
        [
          "Also called",
          "Edremit Yağlık, Ayvalık Yağlık"
        ],
        [
          "Main regions",
          "Balıkesir (Edremit, Ayvalık, Gömeç, Burhaniye), Çanakkale, İzmir"
        ],
        [
          "Purpose",
          "Oil; also green cracked table olives locally"
        ],
        [
          "Oleic acid",
          "Roughly 65–76%, centring near 70–72%"
        ],
        [
          "Harvest",
          "Late ripening; fruit holds on the tree"
        ],
        [
          "Designations",
          "Ayvalık Zeytinyağı (Turkish PDO no. 88)"
        ],
        [
          "Watch out for",
          "Sensitive to both drought and frost"
        ]
      ],
      "aroma": [
        "Artichoke",
        "Green almond",
        "Green apple",
        "Grass",
        "Olive leaf"
      ],
      "aromaNote": "Descriptors from the Ayvalık Zeytinyağı PDO specification — a registration document, not a panel result. A published Turkish panel study did record one of its highest fruitiness medians for an Ayvalık sample.",
      "compare": {
        "origin": "Balıkesir, Türkiye",
        "polyphenols": "Reported 46–235 mg/kg; no stable typical value",
        "sensory": "Green and aromatic, moderate bitterness, gentle pungency",
        "pairing": "Mezze, white cheese, raw vegetables, fish"
      },
      "map": {
        "placeholder": "Map · Edremit Gulf",
        "caption": "Edremit Gulf, Balıkesir · 39.4° N, 26.9° E"
      },
      "seo": {
        "title": "Ayvalık — Türkiye’s North Aegean Olive | bestoliveoils.eu",
        "description": "The Edremit Gulf variety behind Türkiye’s best-known PDO oil: low in phenols, highest in pigment, and absent from the IOC world catalogue entirely."
      },
      "sources": [
        {
          "label": "Ayvalık Zeytinyağı geographical indication record, Türk Patent",
          "url": "https://ci.turkpatent.gov.tr/cografi-isaretler/detay/37940"
        },
        {
          "label": "Ministry of Agriculture and Forestry, Edremit olive extension sheet",
          "url": "https://www.tarimorman.gov.tr/BUGEM/edremitzeytin/Belgeler/Fidan_Secim_Bakim_Oneri/Zuim_Fidan.pdf"
        },
        {
          "label": "Minor components of Turkish monovarietal oils, Zeytin Bilimi",
          "url": "https://dergipark.org.tr/tr/download/article-file/298723"
        }
      ]
    },
    {
      "slug": "memecik",
      "name": "Memecik",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Muğla, southern Aegean",
      "purpose": "Dual-purpose",
      "tags": [
        "Türkiye · Muğla",
        "Dual-purpose",
        "Robust"
      ],
      "lede": "Türkiye’s leading oil cultivar and the most assertive of them on the palate — published Turkish panel work puts it at the top of both the bitterness and the pungency scale. It is also highly drought resistant, which matters more every year in the southern Aegean.",
      "image": { "src": "assets/img/cultivars/memecik.webp", "alt": "Olive grove in Muğla, southern Aegean — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Memecik olives / grove photo",
      "stats": [
        {
          "value": "296–407",
          "label": "mg/kg total phenols"
        },
        {
          "value": "73–76%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Memecik is the variety of the southern Aegean — Aydın, Muğla, İzmir, Manisa and Denizli — and accounts for roughly 19% of Türkiye’s olive trees. The tree is strongly vigorous with a spreading, dense canopy, highly resistant to drought and moderately resistant to cold, partially self-fertile with Ayvalık, Gemlik and Erkence among its recommended pollinators. Oil content is high, above 22%. It shows periodicity, but yields stay satisfactory.",
        "Fruit matures mid-November to mid-December. In a multi-region Turkish panel study, Memecik samples recorded the highest bitterness — 5.5 in Muğla, 4.8 in Aydın on a 10 cm scale — and the highest pungency at 6.1, of every cultivar and region tested. The EU-recognised Aydın Memecik PDO description says the same thing in words: intense fruity aroma, high bitterness and pungency."
      ],
      "reference": [
        [
          "Also called",
          "Aşı Yeli, Gülümbe, Şehir, Tekir, Yağlık"
        ],
        [
          "Main regions",
          "Aydın, Muğla, İzmir, Manisa, Denizli"
        ],
        [
          "Purpose",
          "Dual-purpose — mainly oil, also green and black table"
        ],
        [
          "Oleic acid",
          "73–76%"
        ],
        [
          "Oil yield",
          "High, above 22%"
        ],
        [
          "Harvest",
          "Mid-November to mid-December, late"
        ],
        [
          "Designations",
          "Aydın Memecik Zeytinyağı (EU PDO, 2024); Milas Zeytinyağı"
        ]
      ],
      "aroma": [
        "Green fruit",
        "Bitter herbs",
        "Fresh almond",
        "Pepper"
      ],
      "aromaNote": "Published panel medians on a 10 cm scale (multi-region Turkish study): bitterness up to 5.5, pungency up to 6.1 — the highest recorded in that work. The IOC describes a balanced profile of fruity, bitter and pungent attributes.",
      "compare": {
        "origin": "Muğla, Türkiye",
        "polyphenols": "296–407 mg/kg",
        "sensory": "The most bitter and pungent of the Turkish cultivars measured",
        "pairing": "Bean dishes, lamb, grilled meat, strong greens"
      },
      "map": {
        "placeholder": "Map · southern Aegean",
        "caption": "Muğla, southern Aegean · 37.2° N, 28.4° E"
      },
      "seo": {
        "title": "Memecik — Türkiye’s Robust Aegean Olive | bestoliveoils.eu",
        "description": "The country’s leading oil cultivar, and the one Turkish panel work rates highest for bitterness and pungency. Chemistry, drought tolerance, PDOs."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/turkey/memecik"
        },
        {
          "label": "Olive variety and region in Turkish olive oils, Molecules 31(5):913",
          "url": "https://www.mdpi.com/1420-3049/31/5/913"
        },
        {
          "label": "Aydın Memecik Zeytinyağı recognised by the EU",
          "url": "https://www.eeas.europa.eu/delegations/t%C3%BCrkiye/ayd%C4%B1n-memecik-zeytinya%C4%9F%C4%B1-ab-taraf%C4%B1ndan-tan%C4%B1nd%C4%B1_tr"
        }
      ]
    },
    {
      "slug": "gemlik",
      "name": "Gemlik",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Gemlik, Bursa, southern Marmara",
      "purpose": "Dual-purpose",
      "tags": [
        "Türkiye · Bursa",
        "Dual-purpose",
        "Mild"
      ],
      "lede": "The most widely planted olive in Türkiye — 48.7% of the country’s trees — and it got there on agronomy, not on oil. Easy rooting, cold hardiness, early bearing and low alternate bearing are why it spread; as an oil it is the mildest of the major Turkish varieties.",
      "image": { "src": "assets/img/cultivars/gemlik.webp", "alt": "Olive grove in Gemlik, Bursa, southern Marmara — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Gemlik olives / grove photo",
      "stats": [
        {
          "value": "244–491",
          "label": "mg/kg total phenols"
        },
        {
          "value": "48.7%",
          "label": "of Türkiye’s olive trees"
        }
      ],
      "grove": [
        "Gemlik comes from the southern shore of the Marmara — Gemlik, Mudanya, Erdek and Trilye — where it makes up 75 to 80% of the groves. Since the 2000s it has been planted across the whole country, and the IOC now records it as Türkiye’s most widely cultivated variety. It is of medium vigour, roots easily from cuttings, adapts well to cold areas but is sensitive to drought, and prefers clay soils and irrigation.",
        "It is overwhelmingly a black table olive — Turkish extension literature calls it the country’s best brine-curing variety — but oil content is above 22% and it is pressed at scale. In panel work its oils span the widest range of any Turkish cultivar tested, with the lowest pungency ever recorded in that study at 2.0. One variety producing both the delicate and the dilute."
      ],
      "reference": [
        [
          "Also called",
          "Trilye, Kara, Kaplık, Kıvırcık"
        ],
        [
          "Main regions",
          "Bursa and southern Marmara; now nationwide"
        ],
        [
          "Purpose",
          "Dual-purpose — predominantly black table olives"
        ],
        [
          "Oleic acid",
          "70–75%"
        ],
        [
          "Oil yield",
          "22–23%"
        ],
        [
          "Harvest",
          "Mid to late October — earlier than Memecik or Ayvalık"
        ],
        [
          "Designations",
          "Gemlik Zeytini (Turkish PDO no. 76)"
        ]
      ],
      "aroma": [
        "Mild fruitiness",
        "Almond",
        "Soft green notes"
      ],
      "aromaNote": "The IOC gives medium fruitiness, delicate bitterness and medium pungency. Published Turkish panel medians for Gemlik range from 3.0 to 5.3 fruitiness and down to 2.0 pungency depending on origin.",
      "compare": {
        "origin": "Bursa, Türkiye",
        "polyphenols": "244–491 mg/kg",
        "sensory": "Mild and approachable, delicate bitterness, low pungency",
        "pairing": "Breakfast table, soft cheese, eggs, salads"
      },
      "map": {
        "placeholder": "Map · southern Marmara",
        "caption": "Gemlik, Bursa · 40.4° N, 29.2° E"
      },
      "seo": {
        "title": "Gemlik — Türkiye’s Most Planted Olive | bestoliveoils.eu",
        "description": "Nearly half of Türkiye’s olive trees, and the country’s classic black table olive. Why its agronomy, not its oil, explains the spread."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/turkey/gemlik"
        },
        {
          "label": "Gemlik Zeytini geographical indication record, Türk Patent",
          "url": "https://ci.turkpatent.gov.tr/cografi-isaretler/detay/37924"
        },
        {
          "label": "Olive variety and region in Turkish olive oils, Molecules 31(5):913",
          "url": "https://www.mdpi.com/1420-3049/31/5/913"
        }
      ]
    },
    {
      "slug": "domat",
      "name": "Domat",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Akhisar, Manisa",
      "purpose": "Table",
      "tags": [
        "Türkiye · Manisa",
        "Table olive",
        "Surprisingly phenolic"
      ],
      "lede": "Catalogued as Türkiye’s leading green table variety — and yet in the one peer-reviewed head-to-head comparison, its oil came out the most phenol-rich, most bitter and most pungent of the Turkish cultivars tested. The largest gap in this set between a variety’s commercial role and its oil.",
      "image": { "src": "assets/img/cultivars/domat.webp", "alt": "Olive grove in Akhisar, Manisa — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Domat olives / grove photo",
      "stats": [
        {
          "value": "~351",
          "label": "mg/kg — highest of five Turkish cultivars"
        },
        {
          "value": "~140",
          "label": "fruits per kilo — the largest fruit here"
        }
      ],
      "grove": [
        "Domat is the variety of Akhisar in Manisa and the surrounding Aegean, at about 7.6% of Türkiye’s olive trees. It is strongly vigorous with a dense spreading canopy, medium in both cold and drought tolerance, partially self-fertile, and productive regularly rather than in alternate years. The fruit is the largest of the Turkish cultivars here — around 140 fruits per kilo, flesh-to-stone 7.3 — with a high moisture requirement.",
        "Almost all of the crop goes to green table processing, so very little Domat oil reaches the market. That is worth knowing before reading its analysis: the phenol and sensory figures below come from a single peer-reviewed comparison of five cultivars picked in the last week of October, not from a body of commercial samples."
      ],
      "reference": [
        [
          "Also called",
          "Köşeli Domat, Uzun Domat"
        ],
        [
          "Main regions",
          "Manisa (Akhisar) and the wider Aegean"
        ],
        [
          "Purpose",
          "Table olive, green; oil is a by-product"
        ],
        [
          "Oleic acid",
          "Around 62% in one trial — no home-region range published"
        ],
        [
          "Oil yield",
          "18–22%"
        ],
        [
          "Harvest",
          "Mid-October"
        ],
        [
          "Designations",
          "Akhisar Domat Zeytini (Turkish geographical indication)"
        ]
      ],
      "aroma": [
        "Green fruit",
        "Bitter herbs",
        "Pepper"
      ],
      "aromaNote": "The IOC gives medium fruitiness, medium bitterness and medium pungency with high persistence. A peer-reviewed comparison found Domat oil the most bitter and pungent of five Turkish cultivars, without stating medians.",
      "compare": {
        "origin": "Manisa, Türkiye",
        "polyphenols": "~351 mg/kg (single study)",
        "sensory": "Bitter and pungent, persistent — unusual for a table variety",
        "pairing": "The olive itself; the oil suits robust dishes"
      },
      "map": {
        "placeholder": "Map · Akhisar, Manisa",
        "caption": "Akhisar, Manisa · 38.9° N, 27.8° E"
      },
      "seo": {
        "title": "Domat — Türkiye’s Green Table Olive | bestoliveoils.eu",
        "description": "Grown for the jar, yet its oil measured the most phenol-rich and most bitter of five Turkish cultivars in the one head-to-head study. The evidence."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/turkey/domat"
        },
        {
          "label": "EVOOs of Turkish olive cultivars, Molecules 28(3):1483",
          "url": "https://www.mdpi.com/1420-3049/28/3/1483"
        }
      ]
    },
    {
      "slug": "uslu",
      "name": "Uslu",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Akhisar, Manisa",
      "purpose": "Table",
      "tags": [
        "Türkiye · Manisa",
        "Table olive",
        "Tree-ripened black"
      ],
      "lede": "One of the few Turkish varieties whose reputation rests on the fully black, tree-ripened table olive rather than on oil. Its protected designation is written entirely around that use — harvested in November, at a brilliant dark black.",
      "image": { "src": "assets/img/cultivars/uslu.webp", "alt": "Olive grove in Akhisar, Manisa — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Uslu olives / grove photo",
      "stats": [
        {
          "value": "~163",
          "label": "mg/kg in a single study"
        },
        {
          "value": "44.6%",
          "label": "seed germination — highest of 13 cultivars"
        }
      ],
      "grove": [
        "Uslu is the other Akhisar variety alongside Domat, and is grown across the Aegean with reports of secondary plantings elsewhere. Its geographical indication designates it a black table olive and names November as the optimal harvest. It is sensitive to Verticillium wilt, and Turkish extension literature uses it as a pollinator for Manzanilla.",
        "It has one distinctly practical quality: the highest seed germination rate of thirteen Turkish cultivars tested for rootstock potential, at 44.6%, which makes it one of the better choices for raising seedling rootstocks. Beyond that the published record is thin — no oil yield, no oleic acid range and no Rancimat figure could be found, and the single phenol value below is one sample from one study."
      ],
      "reference": [
        [
          "Also called",
          "Sold as Akhisar Uslu Zeytini"
        ],
        [
          "Main regions",
          "Manisa (Akhisar), Aegean"
        ],
        [
          "Purpose",
          "Black table olive; oil secondary"
        ],
        [
          "Oleic acid",
          "Not published"
        ],
        [
          "Harvest",
          "November, for black table use"
        ],
        [
          "Designations",
          "Akhisar Uslu Zeytini (Turkish PDO no. 165)"
        ],
        [
          "Watch out for",
          "Sensitive to Verticillium wilt"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "The geographical indication describes only the appearance and general quality of the cured olive. No sensory descriptors for Uslu oil are published.",
      "compare": {
        "origin": "Manisa, Türkiye",
        "polyphenols": "~163 mg/kg (single study)",
        "sensory": "Not published",
        "pairing": "The olive itself — Turkish breakfast"
      },
      "map": {
        "placeholder": "Map · Akhisar, Manisa",
        "caption": "Akhisar, Manisa · 38.9° N, 27.8° E"
      },
      "seo": {
        "title": "Uslu — Türkiye’s Tree-Ripened Black Olive | bestoliveoils.eu",
        "description": "The Akhisar variety built around the fully black, tree-ripened table olive, and one of the best Turkish cultivars for raising seedling rootstocks."
      },
      "sources": [
        {
          "label": "Akhisar Uslu Zeytini geographical indication record",
          "url": "https://www.kulturportali.gov.tr/portal/akhisar-uslu-zeytini"
        },
        {
          "label": "Minor components of Turkish monovarietal oils, Zeytin Bilimi",
          "url": "https://dergipark.org.tr/tr/download/article-file/298723"
        },
        {
          "label": "Olive cultivars as seedling rootstocks, Horticultural Studies",
          "url": "https://www.horticulturalstudies.org/uploads/pdf_10.pdf"
        }
      ]
    },
    {
      "slug": "nizip-yaglik",
      "name": "Nizip Yağlık",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Nizip, Gaziantep, southeastern Anatolia",
      "purpose": "Oil",
      "tags": [
        "Türkiye · Gaziantep",
        "Monovarietal",
        "High oleic"
      ],
      "lede": "The oil variety of southeastern Anatolia, and one of a group there that stands out for oleic acid above 75% — high by Turkish standards. Its harvest window is unusually long, running from November into the first week of February.",
      "image": { "src": "assets/img/cultivars/nizip-yaglik.webp", "alt": "Olive grove in Nizip, Gaziantep, southeastern Anatolia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Nizip Yağlık olives / grove photo",
      "stats": [
        {
          "value": ">75%",
          "label": "oleic acid"
        },
        {
          "value": "326–421",
          "label": "fruits per kilo — small fruit"
        }
      ],
      "grove": [
        "Nizip Yağlık is grown around Nizip in Gaziantep, and across Kilis and Adıyaman. It sits alongside Kilis Yağlık, Halhalı and Eğriburun as the established oil varieties of the region — separate cultivars, not synonyms, despite being grouped together in the literature. The fruit is small, in the 326 to 421 per kilo class.",
        "A study of 28 varieties in the Gaziantep collection named Nizip Yağlık among ten that stood out for oleic acid above 75%. Beyond that the published record is thin: no total phenol figure, no Rancimat value and no sensory descriptors specific to this cultivar could be found. The regional oil carries a protected designation, Nizip Zeytinyağı, which requires the variety."
      ],
      "reference": [
        [
          "Also called",
          "No verified synonyms"
        ],
        [
          "Main regions",
          "Gaziantep, Kilis, Adıyaman"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "Above 75%"
        ],
        [
          "Polyphenols",
          "Not published"
        ],
        [
          "Harvest",
          "November into the first week of February"
        ],
        [
          "Designations",
          "Nizip Zeytinyağı (Turkish PGI no. 158)"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "Nizip Yağlık was included in a published aroma-profile study of ten Turkish cultivars, but the accessible text gives no cultivar-specific descriptors. No panel medians published.",
      "compare": {
        "origin": "Gaziantep, Türkiye",
        "polyphenols": "Not published",
        "sensory": "Not published",
        "pairing": "Regional cuisine — kebab, bulgur, mezze"
      },
      "map": {
        "placeholder": "Map · Nizip, Gaziantep",
        "caption": "Nizip, Gaziantep · 37.0° N, 37.8° E"
      },
      "seo": {
        "title": "Nizip Yağlık — Gaziantep’s Oil Olive | bestoliveoils.eu",
        "description": "Oleic acid above 75%, small fruit, and a harvest window running from November into February. The Gaziantep variety behind the Nizip Zeytinyağı PGI."
      },
      "sources": [
        {
          "label": "Turkish olive varieties of southeastern Anatolia, Applied Fruit Science 2023",
          "url": "https://link.springer.com/article/10.1007/s10341-023-00843-6"
        },
        {
          "label": "Nizip Zeytinyağı geographical indication specification",
          "url": "https://ci.gaziantep.bel.tr/Urunler/nizip-zeytinyagi-1006"
        }
      ]
    },
    {
      "slug": "sariulak",
      "name": "Sarıulak",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "Tarsus, Mersin",
      "purpose": "Dual-purpose",
      "tags": [
        "Türkiye · Mersin",
        "Dual-purpose",
        "High phenolic"
      ],
      "lede": "The one Turkish variety here with a full protected-designation specification giving hard numbers — and they make an unusual pair: comparatively low oleic acid at 65–70%, alongside total phenols of 600 to 836 mg/kg.",
      "image": { "src": "assets/img/cultivars/sariulak.webp", "alt": "Olive grove in Tarsus, Mersin — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Sarıulak olives / grove photo",
      "stats": [
        {
          "value": "602–836",
          "label": "mg/kg total phenols (PDO spec)"
        },
        {
          "value": "65.6–70.1%",
          "label": "oleic acid (PDO spec)"
        }
      ],
      "grove": [
        "Sarıulak is the olive of Tarsus in Mersin province, on the eastern Mediterranean coast, with plantings across the region alongside Büyük Topak Ulak, Halhalı, Gemlik and Ayvalık. Oil content runs 18.7 to 19.6% of fruit weight, and harvest can continue through to late January. It has the lowest seed germination rate of thirteen Turkish cultivars tested, so it is a poor choice for raising seedling rootstocks.",
        "The chemistry is the interesting part. Low oleic acid normally predicts poor keeping, while high phenols predict the opposite, and no Rancimat measurement has been published to settle which wins. That makes Sarıulak’s shelf life a genuinely open question rather than a known quantity — and one worth flagging rather than guessing at."
      ],
      "reference": [
        [
          "Also called",
          "Sarı Ulak (open spelling used in academic work)"
        ],
        [
          "Main regions",
          "Mersin (Tarsus, Silifke), eastern Mediterranean"
        ],
        [
          "Purpose",
          "Dual-purpose, oil-leaning"
        ],
        [
          "Oleic acid",
          "65.6–70.1%"
        ],
        [
          "Oil yield",
          "18.7–19.6% of fruit weight"
        ],
        [
          "Harvest",
          "Through to late January"
        ],
        [
          "Designations",
          "Tarsus Sarıulak Zeytinyağı (Turkish PDO no. 767); Tarsus Sarıulak Zeytini"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "The PDO specification describes only a bright yellow colour and omits formal fruity, bitter and pungent descriptors. No panel medians published.",
      "compare": {
        "origin": "Mersin, Türkiye",
        "polyphenols": "602–836 mg/kg",
        "sensory": "Not published",
        "pairing": "Eastern Mediterranean cooking — vegetables in oil, pulses"
      },
      "map": {
        "placeholder": "Map · Tarsus, Mersin",
        "caption": "Tarsus, Mersin · 36.9° N, 34.9° E"
      },
      "seo": {
        "title": "Sarıulak — High Phenols, Low Oleic | bestoliveoils.eu",
        "description": "The Tarsus variety whose PDO publishes real numbers: 602–836 mg/kg polyphenols with only 65–70% oleic acid. Why its shelf life is an open question."
      },
      "sources": [
        {
          "label": "Tarsus Sarıulak Zeytinyağı PDO specification, Türk Patent",
          "url": "https://ci.turkpatent.gov.tr/Files/GeographicalSigns/9b293c95-3c0c-43c8-b29a-b11e84191e11.pdf"
        },
        {
          "label": "Olive cultivars as seedling rootstocks, Horticultural Studies",
          "url": "https://www.horticulturalstudies.org/uploads/pdf_10.pdf"
        }
      ]
    },
    {
      "slug": "erkence",
      "name": "Erkence",
      "country": "Türkiye",
      "countryCode": "TR",
      "originRegion": "İzmir — Karaburun, Urla, Seferihisar",
      "purpose": "Dual-purpose",
      "tags": [
        "Türkiye · İzmir",
        "Dual-purpose",
        "The hurma olive"
      ],
      "lede": "On certain trees of İzmir’s western peninsula, Erkence fruit loses its bitterness while still hanging on the branch and becomes edible with no brine, no lye and no curing at all. The olives are called hurma, and why it happens is still not settled.",
      "image": { "src": "assets/img/cultivars/erkence.webp", "alt": "Olive grove in İzmir — Karaburun, Urla, Seferihisar — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Erkence olives / grove photo",
      "stats": [
        {
          "value": "~87",
          "label": "mg/kg — very low for an oil variety"
        },
        {
          "value": "<2,000",
          "label": "mg/kg oleuropein in hurma fruit"
        }
      ],
      "grove": [
        "Erkence — from erken, \"early\" — is grown on İzmir’s western peninsula around Karaburun, Urla and Seferihisar. It is early ripening, as the name says, and dual-purpose: pressed for oil and eaten green, pink-scratched, black, or as hurma. It is highly resistant to Verticillium wilt, which is a real advantage in Turkish groves, and is used as a pollinator for Ayvalık and Gemlik. Its measured phenol content, at 87 mg CAE/kg, is very low.",
        "The hurma effect is dramatic and documented: oleuropein, the bitter secoiridoid, measures under 2,000 mg/kg in hurma fruit against up to 35,000 mg/kg in ordinary Erkence from the same area. The cause is not settled. One peer-reviewed study concludes enzymatic oxidation of oleuropein could be responsible; the fungus Phoma oleae has long been implicated, and a microbiological survey did recover it — while stating plainly that the exact reason is unknown. Anyone writing that a fungus causes it is going further than the evidence does. It is also site-specific: particular trees, particular aspects, and the same variety planted elsewhere does not reliably produce hurma."
      ],
      "reference": [
        [
          "Also called",
          "Hurma zeytin (the debittered fruit, not a separate variety); furma in Karaburun"
        ],
        [
          "Main regions",
          "İzmir — Karaburun, Urla, Seferihisar"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and table, including hurma"
        ],
        [
          "Oleic acid",
          "~61% in a non-native trial; no home-region figure published"
        ],
        [
          "Harvest",
          "Early ripening"
        ],
        [
          "Disease",
          "Highly resistant to Verticillium wilt"
        ],
        [
          "Hurma",
          "Oleuropein under 2,000 mg/kg, against up to 35,000 in ordinary fruit"
        ]
      ],
      "aroma": [
        "Olive leaf",
        "Apple",
        "Tomato"
      ],
      "aromaNote": "These three are the only documented Erkence descriptors we could verify, and they come from a study’s attribute list rather than a reported panel median.",
      "compare": {
        "origin": "İzmir, Türkiye",
        "polyphenols": "~87 mg/kg",
        "sensory": "Gentle; documented descriptors are leaf, apple and tomato",
        "pairing": "Hurma olives eaten as they are; the oil suits mild dishes"
      },
      "map": {
        "placeholder": "Map · Karaburun peninsula",
        "caption": "Karaburun, İzmir · 38.6° N, 26.5° E"
      },
      "seo": {
        "title": "Erkence and the Hurma Olive | bestoliveoils.eu",
        "description": "An olive that debitters itself on the tree, no curing required. What the peer-reviewed evidence actually says about why — and what it does not."
      },
      "sources": [
        {
          "label": "Natural de-bittering of Hurma olives on the tree, Grasas y Aceites",
          "url": "https://grasasyaceites.revistas.csic.es/index.php/grasasyaceites/article/view/1649"
        },
        {
          "label": "Microbial profile of naturally debittered Hurma olives, Int. J. Food Sci. Technol. 51(9):2099",
          "url": "https://academic.oup.com/ijfst/article/51/9/2099/7774781"
        },
        {
          "label": "Erkence oil quality, phenolics and antioxidant capacity, Gıda",
          "url": "https://dergipark.org.tr/en/pub/gida/article/92712"
        }
      ]
    },
    {
      "slug": "koroneiki",
      "name": "Koroneiki",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Koroni, Messinia, Peloponnese",
      "purpose": "Oil",
      "tags": [
        "Greece · Messinia",
        "Monovarietal",
        "High oleic"
      ],
      "lede": "A very small fruit with a disproportionately high and stable oil yield — the combination that made Koroneiki the only Greek variety adopted at scale in mechanised hedgerow orchards around the world. It covers 50 to 60% of Greece’s olive area.",
      "image": { "src": "assets/img/cultivars/koroneiki.webp", "alt": "Olive grove in Koroni, Messinia, Peloponnese — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Koroneiki olives / grove photo",
      "stats": [
        {
          "value": "74–77%",
          "label": "oleic acid"
        },
        {
          "value": "50–60%",
          "label": "of Greece’s olive area"
        }
      ],
      "grove": [
        "Koroneiki is concentrated in Crete and the Peloponnese and forms the basis of most new Greek plantings. It is of medium vigour with a sparse, spreading canopy, roots readily, flowers early, produces abundant pollen and yields high and constant crops with little alternance. It is drought tolerant but cold sensitive, resistant to leaf spot and Verticillium, and very susceptible to olive knot.",
        "Outside Greece it is now one of the three cultivars used in super-high-density orchards worldwide, after Arbequina and Arbosana, and is planted in more than twenty countries. In the largest Greek phenolic dataset — 5,764 oils analysed by qNMR — Koroneiki accounted for 53% of all samples, sitting slightly below the national mean."
      ],
      "reference": [
        [
          "Also called",
          "Koroni, Kritikia, Ladolia, Psilolia"
        ],
        [
          "Main regions",
          "Crete, Peloponnese; and 20+ countries worldwide"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "74–77%"
        ],
        [
          "Harvest",
          "Late October to January; early to intermediate ripening"
        ],
        [
          "Tolerances",
          "Drought tolerant, cold sensitive"
        ],
        [
          "Watch out for",
          "Very susceptible to olive knot"
        ]
      ],
      "aroma": [
        "Fresh green herbs",
        "Grass",
        "Citrus",
        "Floral"
      ],
      "aromaNote": "Descriptors from variety catalogues and regional descriptions. No certified panel medians for monovarietal Koroneiki were found. Our panel has not scored this cultivar.",
      "compare": {
        "origin": "Messinia, Greece",
        "polyphenols": "Around the Greek mean; Cretan surveys 138–441 mg/kg",
        "sensory": "Green and aromatic, balanced bitterness and pungency",
        "pairing": "Greek salad, feta, grilled fish, horta"
      },
      "map": {
        "placeholder": "Map · Messinia and Crete",
        "caption": "Messinia, Peloponnese · 36.8° N, 21.9° E"
      },
      "seo": {
        "title": "Koroneiki — Greece’s Export Olive | bestoliveoils.eu",
        "description": "Half of Greece’s olive area and the only Greek variety planted at scale in hedgerow orchards worldwide. Oleic acid, phenols, agronomy and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/greece/koroneiki"
        },
        {
          "label": "High-phenolic olive oil defined from Greek qNMR data, Molecules 26(4):1115",
          "url": "https://www.mdpi.com/1420-3049/26/4/1115"
        },
        {
          "label": "Fatty acid composition of four Greek cultivars, Molecules 26(14):4151",
          "url": "https://www.mdpi.com/1420-3049/26/14/4151/htm"
        }
      ]
    },
    {
      "slug": "kalamon",
      "name": "Kalamon",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Messinia, southern Peloponnese",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Messinia",
        "Table olive",
        "Name confusion"
      ],
      "lede": "The large, elongated, freestone olive sold everywhere as \"Kalamata\". Worth getting straight: Kalamon is the variety, while Kalamata PDO olive oil is made from Koroneiki — so a bottle of Kalamata PDO oil contains no Kalamon at all.",
      "image": { "src": "assets/img/cultivars/kalamon.webp", "alt": "Olive grove in Messinia, southern Peloponnese — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Kalamon olives / grove photo",
      "stats": [
        {
          "value": "24%",
          "label": "of Greece’s table-olive area"
        },
        {
          "value": "4,003",
          "label": "mg/kg — highest phenol value recorded in Greece"
        }
      ],
      "grove": [
        "Kalamon is grown across mainland Greece — Aetoloakarnania, Laconia, Fthiotida, Messinia, Arkadia and Ilia — and has recently expanded into Thessaly, Macedonia, Epirus, Samos and Crete. It is strongly vigorous with a spreading habit, roots poorly, and yields high but alternate crops. It is salt resistant and moderately cold resistant but sensitive to excessive heat, and comparatively untroubled by knot, Verticillium and fly.",
        "Its fruit is what it is grown for: large, elongated, with a high flesh-to-stone ratio and a stone that releases cleanly, and a colour that survives natural black fermentation. Its oil is a minor product but not a negligible one — in the Greek national phenolic dataset Kalamon sits among the highest-mean varieties and produced the single highest value recorded in the country, 4,003 mg/kg."
      ],
      "reference": [
        [
          "Also called",
          "Kalamata, Kalamatiani, Aetonychi, Chondrolia"
        ],
        [
          "Main regions",
          "Messinia, Laconia, Aetoloakarnania and mainland Greece"
        ],
        [
          "Purpose",
          "Dual-purpose — primarily natural black table olives"
        ],
        [
          "Oleic acid",
          "Not published"
        ],
        [
          "Harvest",
          "Late ripening, November–December, at full colour change"
        ],
        [
          "Designations",
          "Elia Kalamatas PDO (table olives)"
        ],
        [
          "Name warning",
          "Kalamata PDO olive oil is made from Koroneiki, not Kalamon"
        ]
      ],
      "aroma": [
        "Not published for the oil"
      ],
      "aromaNote": "The IOC calls the oil excellent and rich in polyphenols but publishes no descriptors, and no panel data for monovarietal Kalamon oil could be found.",
      "compare": {
        "origin": "Messinia, Greece",
        "polyphenols": "Among the highest-mean Greek varieties",
        "sensory": "Not published for the oil",
        "pairing": "The olive itself — salads, tapenade, bread"
      },
      "map": {
        "placeholder": "Map · Messinia",
        "caption": "Messinia, Peloponnese · 37.0° N, 22.1° E"
      },
      "seo": {
        "title": "Kalamon — The Olive Behind \"Kalamata\" | bestoliveoils.eu",
        "description": "Kalamon is the variety; Kalamata is a place. And Kalamata PDO olive oil is pressed from Koroneiki, not from Kalamon. Untangling the most common mix-up."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/greece/kalamon"
        },
        {
          "label": "High-phenolic olive oil defined from Greek qNMR data, Molecules 26(4):1115",
          "url": "https://www.mdpi.com/1420-3049/26/4/1115"
        },
        {
          "label": "Kalamata PDO oil in Messinia, Foods 8(12):610",
          "url": "https://www.mdpi.com/2304-8158/8/12/610"
        }
      ]
    },
    {
      "slug": "manaki",
      "name": "Manaki",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Central Greece and the northeastern Peloponnese",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Central Greece",
        "Dual-purpose",
        "Low oleic"
      ],
      "lede": "Chemically the opposite pole from Koroneiki: the lowest oleic acid and the highest linoleic of the four widely studied Greek cultivars. It is also a high-altitude variety, hardy to cold and wind, grown up to a thousand metres.",
      "image": { "src": "assets/img/cultivars/manaki.webp", "alt": "Olive grove in Central Greece and the northeastern Peloponnese — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Manaki olives / grove photo",
      "stats": [
        {
          "value": "~70%",
          "label": "oleic acid — lowest of the four studied"
        },
        {
          "value": "13.4%",
          "label": "linoleic acid — the highest"
        }
      ],
      "grove": [
        "Manaki is grown around Amfissa, Delphi, Itea, Arachova, Lamia, Kynouria, Ermioni and Poros, on ground rising to a thousand metres. The tree is hardy to cold and wind, carries small fruit of 2.2 to 2.9 grams, and is reported to bear in alternate years. It is often paired in Greek sources with Kothreiki, and whether those are one variety or two is not settled.",
        "The chemistry is what distinguishes it. At around 70% oleic acid with 13.35% linoleic, Manaki sits at the soft end of the Greek spectrum — a profile that would normally predict lower oxidative stability, though no Rancimat measurement has been published to confirm it. Its harvest window is also disputed between Greek sources, which give anything from late October to early February."
      ],
      "reference": [
        [
          "Also called",
          "Manaky; often paired with Kothreiki"
        ],
        [
          "Main regions",
          "Fokida, Argolida, Corinthia, Fthiotida"
        ],
        [
          "Purpose",
          "Dual-purpose — principally oil, also table"
        ],
        [
          "Oleic acid",
          "~70.2%"
        ],
        [
          "Altitude",
          "Grown up to 1,000 m"
        ],
        [
          "Harvest",
          "Late ripening; sources disagree on the months"
        ],
        [
          "Shelf stability",
          "Not published"
        ]
      ],
      "aroma": [
        "Apple",
        "Tomato",
        "Mild fruitiness"
      ],
      "aromaNote": "General descriptions from Greek trade sources. No published panel medians for monovarietal Manaki were found.",
      "compare": {
        "origin": "Central Greece",
        "polyphenols": "Not published",
        "sensory": "Mild and fruity, apple and tomato",
        "pairing": "Steamed greens, fresh cheese, delicate fish"
      },
      "map": {
        "placeholder": "Map · Fokida and Argolida",
        "caption": "Central Greece · 38.5° N, 22.4° E"
      },
      "seo": {
        "title": "Manaki — Greece’s High-Altitude Olive | bestoliveoils.eu",
        "description": "The lowest oleic and highest linoleic of the widely studied Greek cultivars, grown up to 1,000 m and hardy to cold and wind. Chemistry and taste."
      },
      "sources": [
        {
          "label": "Fatty acid composition of four Greek cultivars, Molecules 26(14):4151",
          "url": "https://www.mdpi.com/1420-3049/26/14/4151/htm"
        },
        {
          "label": "Greek olive varieties, Agrovim olive encyclopedia",
          "url": "https://www.agrovim.gr/el/olive-encyclopedia/greek-olive-varieties/"
        }
      ]
    },
    {
      "slug": "tsounati",
      "name": "Tsounati",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Western Crete and the southern Peloponnese",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Crete",
        "Dual-purpose",
        "Cold-hardy"
      ],
      "lede": "The cold-hardy upland counterweight to Koroneiki, and an ancient variety in the literal sense — the IOC notes thousand-year-old Tsounati trees on Crete that are still in production. It holds 15 to 20% of Greece’s olive area.",
      "image": { "src": "assets/img/cultivars/tsounati.webp", "alt": "Olive grove in Western Crete and the southern Peloponnese — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Tsounati olives / grove photo",
      "stats": [
        {
          "value": "173–641",
          "label": "mg/kg in Cretan surveys"
        },
        {
          "value": "15–20%",
          "label": "of Greece’s olive area"
        }
      ],
      "grove": [
        "Tsounati is known as Athinolia in Laconia and the southern Peloponnese and as Mastoidis on Crete — three names for one variety. It grows at altitude, up to around a thousand metres, and is dual-purpose: oil, plus green-pickled and salted black table olives. Oil content is described as high, with a Greek agronomic source giving 20 to 30%.",
        "The tree is of medium vigour with an upright habit, roots moderately, and yields medium crops in alternate years. Its strength is cold resistance; it is moderate on drought and salinity. It is susceptible to leaf spot, olive fly and Verticillium. Despite receiving far less commercial attention than Koroneiki, its phenolic range in Cretan surveys runs to the top of the Greek distribution."
      ],
      "reference": [
        [
          "Also called",
          "Athinolia, Mastoidis, Matsolia"
        ],
        [
          "Main regions",
          "Western Crete, southern Peloponnese"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and table"
        ],
        [
          "Oleic acid",
          "Not published"
        ],
        [
          "Harvest",
          "December–January; earlier where frost threatens"
        ],
        [
          "Tolerances",
          "Strong cold resistance; moderate on drought and salt"
        ],
        [
          "Watch out for",
          "Leaf spot, olive fly, Verticillium"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "The IOC records only \"oil quality: excellent\". Greek sources describe a refined oil that blends well with Koroneiki, but no descriptor set or panel median is published.",
      "compare": {
        "origin": "Crete and the Peloponnese, Greece",
        "polyphenols": "173–641 mg/kg",
        "sensory": "Not published from a primary source",
        "pairing": "Cretan cooking — pulses, wild greens, rusks"
      },
      "map": {
        "placeholder": "Map · western Crete",
        "caption": "Western Crete · 35.4° N, 24.0° E"
      },
      "seo": {
        "title": "Tsounati — Crete’s Ancient Upland Olive | bestoliveoils.eu",
        "description": "Also called Athinolia and Mastoidis. Cold-hardy, grown at altitude, on trees a thousand years old — and phenolic figures at the top of the Greek range."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/greece/tsounati"
        },
        {
          "label": "Antioxidants in Greek virgin olive oils, Antioxidants 3(2):387",
          "url": "https://www.mdpi.com/2076-3921/3/2/387"
        }
      ]
    },
    {
      "slug": "megaritiki",
      "name": "Megaritiki",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Megara, Attica",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Attica",
        "Dual-purpose",
        "Chemical outlier"
      ],
      "lede": "The chemical outlier among widespread Greek oil varieties — markedly lower in oleic acid and higher in palmitic than Koroneiki or Konservolia. Its oils do not simply taste less intense; they age differently.",
      "image": { "src": "assets/img/cultivars/megaritiki.webp", "alt": "Olive grove in Megara, Attica — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Megaritiki olives / grove photo",
      "stats": [
        {
          "value": "~66%",
          "label": "oleic acid — lowest of the four studied"
        },
        {
          "value": "~25–30%",
          "label": "oil content of the fruit"
        }
      ],
      "grove": [
        "Named for Megara in Attica, Megaritiki is grown across Attica, Boeotia, Corinthia and Achaia, out into Argolida, Arcadia, Euboea and Fthiotida, and northwards into Drama, Kavala, Kozani, Xanthi, Pella, Pieria, Serres and Chalkidiki. It is a medium-sized tree that adapts to poor soils and is described as cold- and drought-hardy and exceptionally adaptable — which is exactly why it turns up across such a latitude range.",
        "Its fatty acid profile is where it separates from the pack: 65.8% oleic against 15.5% palmitic and 12.5% linoleic, the lowest oleic and highest palmitic of the four widely studied Greek cultivars. A Greek olive-oil specialist publication reports panel-style intensities for premium Megaritiki of fruitiness 5.0–5.5, bitterness 4.0–4.5 and pungency 4.5–5.0 — indicative figures from a tasting source, not an accredited panel."
      ],
      "reference": [
        [
          "Also called",
          "Megareitiki, Perachoritiki, Athinaiki, Elia Megaron"
        ],
        [
          "Main regions",
          "Attica, Boeotia, Corinthia, Achaia; also northern Greece"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and green cracked table olives"
        ],
        [
          "Oleic acid",
          "~65.8% — with 15.5% palmitic"
        ],
        [
          "Oil yield",
          "~25%, up to ~30% under intensive cultivation"
        ],
        [
          "Harvest",
          "Not published with confidence"
        ],
        [
          "Notable tree",
          "The ~2,500-year-old \"Olive of Orsa\" on Salamis is of this variety"
        ]
      ],
      "aroma": [
        "Harmonious sweet fruity",
        "Complex aroma",
        "Balanced"
      ],
      "aromaNote": "Indicative intensities on a 10-point scale from a Greek specialist publication — fruitiness 5.0–5.5, bitterness 4.0–4.5, pungency 4.5–5.0. Not a certified IOC panel median.",
      "compare": {
        "origin": "Attica, Greece",
        "polyphenols": "Not published",
        "sensory": "Harmonious and sweet-fruity, medium-high bitterness and pungency",
        "pairing": "Everyday cooking, vegetables, pulses"
      },
      "map": {
        "placeholder": "Map · Megara, Attica",
        "caption": "Megara, Attica · 38.0° N, 23.3° E"
      },
      "seo": {
        "title": "Megaritiki — Greece’s Chemical Outlier | bestoliveoils.eu",
        "description": "Lowest oleic and highest palmitic of the widely studied Greek varieties, and one of the most adaptable. Why its oils age differently, plus taste."
      },
      "sources": [
        {
          "label": "Fatty acid composition of four Greek cultivars, Molecules 26(14):4151",
          "url": "https://www.mdpi.com/1420-3049/26/14/4151/htm"
        },
        {
          "label": "Ελαίας Καρπός — Megaritiki variety profile",
          "url": "https://elaiaskarpos.gr/μεγαρείτικη-ποικιλία-μια-ελιά-χίλια-π/7606/"
        }
      ]
    },
    {
      "slug": "konservolia",
      "name": "Konservolia",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Amfissa and Fthiotida, central Greece",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Central Greece",
        "Table olive",
        "High oleic"
      ],
      "lede": "Grown almost entirely as a table olive, yet its oil carries the highest mean oleic acid of the four widely planted Greek cultivars measured side by side. The fruit’s commercial role and its oil chemistry point in opposite directions.",
      "image": { "src": "assets/img/cultivars/konservolia.webp", "alt": "Olive grove in Amfissa and Fthiotida, central Greece — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Konservolia olives / grove photo",
      "stats": [
        {
          "value": "~75.4%",
          "label": "oleic acid — highest of the four studied"
        },
        {
          "value": "5–8 g",
          "label": "fruit weight"
        }
      ],
      "grove": [
        "Konservolia — a coined commercial name, from \"conserve\" — is the variety of Agrinio, Amfissa, Arta, Lamia, Stylida and the Pelion, and appears across central and western Greece under a string of local names: Amfissis, Agriniou, Artas, Voliotiki, Patrinia, Chondrolia. It is a large tree, seven to ten metres, with fruit of five to eight grams and crunchy flesh that detaches cleanly from the stone.",
        "It is processed green, blonde and as natural black olives, hand-harvested in November and December under its PDO specifications. Its oil is a secondary product, and while the fatty acid profile is the best of the group, no oil polyphenol range has been published for the variety at all."
      ],
      "reference": [
        [
          "Also called",
          "Amfissis, Agriniou, Artas, Voliotiki, Chondrolia"
        ],
        [
          "Main regions",
          "Amfissa, Agrinio, Arta, Lamia, Pelion"
        ],
        [
          "Purpose",
          "Dual-purpose — predominantly table olives"
        ],
        [
          "Oleic acid",
          "~75.4%"
        ],
        [
          "Harvest",
          "November–December, hand-harvested"
        ],
        [
          "Designations",
          "Konservolia Amfissis PDO; Konservolia Stylidas PDO (both 1996)"
        ],
        [
          "Polyphenols",
          "Not published for the oil"
        ]
      ],
      "aroma": [
        "Crunchy, fruity (table olive)"
      ],
      "aromaNote": "The PDO descriptions cover the cured table olive. No sensory descriptors for Konservolia oil are published.",
      "compare": {
        "origin": "Central Greece",
        "polyphenols": "Not published",
        "sensory": "Not published for the oil",
        "pairing": "The olive itself — meze, salads"
      },
      "map": {
        "placeholder": "Map · Amfissa and Fthiotida",
        "caption": "Amfissa, central Greece · 38.5° N, 22.4° E"
      },
      "seo": {
        "title": "Konservolia — Greece’s Table Olive | bestoliveoils.eu",
        "description": "Grown for the jar, yet its oil carries the highest oleic acid of the widely planted Greek cultivars. Two PDOs, and what the literature does not cover."
      },
      "sources": [
        {
          "label": "Fatty acid composition of four Greek cultivars, Molecules 26(14):4151",
          "url": "https://www.mdpi.com/1420-3049/26/14/4151/htm"
        },
        {
          "label": "Konservolia Amfissis PDO",
          "url": "https://www.qualigeo.eu/en/product/konservolia-amfissis-pdo//"
        }
      ]
    },
    {
      "slug": "chalkidiki",
      "name": "Chalkidiki",
      "country": "Greece",
      "countryCode": "GR",
      "originRegion": "Chalkidiki, Central Macedonia",
      "purpose": "Dual-purpose",
      "tags": [
        "Greece · Macedonia",
        "Table olive",
        "Measured stability"
      ],
      "lede": "A very large green table olive — six to twelve grams — whose early-harvest oil turns out to be among the more stable Greek monovarietals actually measured: 76 to 78% oleic acid with a Rancimat induction period up to 36 hours.",
      "image": { "src": "assets/img/cultivars/chalkidiki.webp", "alt": "Olive grove in Chalkidiki, Central Macedonia — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Chalkidiki olives / grove photo",
      "stats": [
        {
          "value": "290–606",
          "label": "mg/kg, falling through the season"
        },
        {
          "value": "36 h",
          "label": "Rancimat, early harvest"
        }
      ],
      "grove": [
        "Chalkidiki is grown across northern Greece — the Chalkidiki peninsula, Thessaloniki, Serres, Kavala, Xanthi and Thessaly — and holds 27% of the country’s table-olive area. The fruit is very large, around 120 to 140 per kilo, and is picked green because the variety does not reach complete black maturity. The tree is cold-resistant and moderately drought-resistant but sensitive to salinity, and it is the least disease-tolerant variety in this set: susceptible to Verticillium, leaf spot, knot and fly alike.",
        "A peer-reviewed ripening series tracked its oil across six harvest dates: total phenols fell from 606 to 290 mg/kg and oxidative stability from 36 hours downward as the fruit ripened, while oleic acid held at 76 to 78% throughout. It is the only Greek variety in this set with a published Rancimat figure at all."
      ],
      "reference": [
        [
          "Also called",
          "Chalkidikis, Chondrolia Chalkidikis, Gaidourelia, Prasinolia"
        ],
        [
          "Main regions",
          "Chalkidiki, Thessaloniki, Serres, Kavala, Xanthi, Thessaly"
        ],
        [
          "Purpose",
          "Dual-purpose — overwhelmingly green table olives"
        ],
        [
          "Oleic acid",
          "76–78%"
        ],
        [
          "Harvest",
          "Early, picked green"
        ],
        [
          "Shelf stability",
          "Up to 36 h Rancimat in early-harvest oil"
        ],
        [
          "Designations",
          "Prasines Elies Chalkidikis PDO (2012)"
        ]
      ],
      "aroma": [
        "Not enumerated in the published study"
      ],
      "aromaNote": "A peer-reviewed volatile study found harvest time strongly determined the aroma fingerprint, with the best profiles at intermediate ripening, but did not enumerate descriptors. No panel medians published.",
      "compare": {
        "origin": "Macedonia, Greece",
        "polyphenols": "290–606 mg/kg",
        "sensory": "Not published; the variety is grown mainly for the table",
        "pairing": "The olive itself — stuffed, or with ouzo"
      },
      "map": {
        "placeholder": "Map · Chalkidiki",
        "caption": "Chalkidiki, Central Macedonia · 40.3° N, 23.3° E"
      },
      "seo": {
        "title": "Chalkidiki — Greece’s Giant Green Olive | bestoliveoils.eu",
        "description": "The big stuffed olive of northern Greece, and the only Greek variety here with a published Rancimat figure: up to 36 hours from early-harvest fruit."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/greece/chalkidikis"
        },
        {
          "label": "Volatile profile and quality of Chondrolia Chalkidikis oils, Eur. Food Res. Technol. 2022",
          "url": "https://link.springer.com/article/10.1007/s00217-022-04020-z"
        },
        {
          "label": "Prasines Elies Chalkidikis PDO, Regulation (EU) No 426/2012",
          "url": "https://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX:32012R0426"
        }
      ]
    },
    {
      "slug": "galega-vulgar",
      "name": "Galega Vulgar",
      "country": "Portugal",
      "countryCode": "PT",
      "originRegion": "Portugal — polyclonal origin",
      "purpose": "Dual-purpose",
      "tags": [
        "Portugal",
        "Dual-purpose",
        "Being displaced"
      ],
      "lede": "Portugal’s dominant traditional variety by tree count — about 60% of the country’s olives — and one of its lowest yielding. Under 18% oil from fruit weighing less than two grams is precisely why it is being replaced in new intensive plantings.",
      "image": { "src": "assets/img/cultivars/galega-vulgar.webp", "alt": "Olive grove in Portugal — polyclonal origin — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Galega olives / grove photo",
      "stats": [
        {
          "value": "~416",
          "label": "mg/kg from healthy fruit"
        },
        {
          "value": "75–77%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Galega grows across Beira Interior, Ribatejo, Alentejo and the Algarve, and is also reported in Spain. It is rustic and drought tolerant with marked alternate bearing, but sensitive to cold, salinity and active limestone. It is resistant to Verticillium and very susceptible to anthracnose — the disease Portuguese growers call gafa — as well as to olive fly and olive knot.",
        "Its agronomic problem is compound. Fruit under two grams, a poor flesh-to-stone ratio, oil yield below 18%, and a tree poorly suited to both trunk-shaker harvesting and high-density systems, giving 3 to 5 tonnes per hectare where foreign varieties in intensive orchards give 8 to 13. There is a quality consequence too: research shows anthracnose-infested Galega fruit loses phenolic content, so the oil’s compliance with the EU health claim depends on disease control, not on the variety alone."
      ],
      "reference": [
        [
          "Also called",
          "Galega, Galega miúda, Molar, Negrucha"
        ],
        [
          "Main regions",
          "Beira Interior, Ribatejo, Alentejo, Algarve"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and black table olives"
        ],
        [
          "Oleic acid",
          "75.0–77.3%"
        ],
        [
          "Oil yield",
          "Below 18% of fruit weight"
        ],
        [
          "Harvest",
          "Medium and strongly staggered ripening, Oct–Nov"
        ],
        [
          "Watch out for",
          "Very susceptible to anthracnose; unsuited to high density"
        ]
      ],
      "aroma": [
        "Not published"
      ],
      "aromaNote": "No published panel medians or catalogue descriptor list for monovarietal Galega could be found in agronomic or academic sources. Retailer descriptions were excluded.",
      "compare": {
        "origin": "Portugal",
        "polyphenols": "~416 mg/kg",
        "sensory": "Not published from a primary source",
        "pairing": "Portuguese cooking — bacalhau, migas, caldo verde"
      },
      "map": {
        "placeholder": "Map · Beira Interior and Alentejo",
        "caption": "Central and southern Portugal · 39.5° N, 7.9° W"
      },
      "seo": {
        "title": "Galega Vulgar — Portugal’s Old Olive | bestoliveoils.eu",
        "description": "Sixty per cent of Portugal’s olive trees and under 18% oil from sub-two-gram fruit. Why it is being displaced, and how anthracnose costs it phenols."
      },
      "sources": [
        {
          "label": "Conservation and use of Galega vulgar, Agronomy 10(10):1467",
          "url": "https://www.mdpi.com/2073-4395/10/10/1467"
        },
        {
          "label": "Health claim, anthracnose and olive fly, Foods 13(11):1734",
          "url": "https://www.mdpi.com/2304-8158/13/11/1734"
        },
        {
          "label": "CCDR Centro — Cultura do Olival e Produção de Azeite",
          "url": "https://www.ccdrc.pt/wp-content/uploads/2025/02/caderno_tematico-Olival_final.pdf"
        }
      ]
    },
    {
      "slug": "cobrancosa",
      "name": "Cobrançosa",
      "country": "Portugal",
      "countryCode": "PT",
      "originRegion": "Trás-os-Montes and Beira Alta",
      "purpose": "Dual-purpose",
      "tags": [
        "Portugal · Trás-os-Montes",
        "Dual-purpose",
        "Very high phenolic"
      ],
      "lede": "In a same-orchard, same-season comparison it produced roughly twice the total phenols of Galega — 803 against 416 mg/kg — at a lower oleic acid. It also roots easily and takes a trunk shaker, which is why it spread out of Trás-os-Montes into the Alentejo.",
      "image": { "src": "assets/img/cultivars/cobrancosa.webp", "alt": "Olive grove in Trás-os-Montes and Beira Alta — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Cobrançosa olives / grove photo",
      "stats": [
        {
          "value": "~803",
          "label": "mg/kg from healthy fruit"
        },
        {
          "value": "70–73%",
          "label": "oleic acid"
        }
      ],
      "grove": [
        "Cobrançosa is one of the main varieties of Trás-os-Montes and is widely disseminated in Beira Alta, with plantings in Beira Baixa, Ribatejo and Alentejo. It has weak to medium vigour and a spreading habit, tolerates cold and calcareous soils, and is susceptible to drought and salinity. It is tolerant of anthracnose and less troubled by olive fly than Galega.",
        "Two practical traits explain its spread. Rooting from semi-hardwood cuttings exceeds 70%, so it propagates easily, and it is adapted to mechanical trunk-shaker harvesting. Oil yield runs 18 to 22%, ripening is medium, and harvest falls in the second half of November. It features in four Portuguese protected designations, among them Azeite de Trás-os-Montes DOP."
      ],
      "reference": [
        [
          "Also called",
          "Quebrançosa, Salgueira, Verdeal Cobrançosa"
        ],
        [
          "Main regions",
          "Trás-os-Montes, Beira Alta, Beira Baixa, Ribatejo, Alentejo"
        ],
        [
          "Purpose",
          "Dual-purpose — oil and green table olives"
        ],
        [
          "Oleic acid",
          "70.0–73.1%"
        ],
        [
          "Oil yield",
          "18–22% of fruit weight"
        ],
        [
          "Harvest",
          "Second half of November, medium ripening"
        ],
        [
          "Designations",
          "Named in four Portuguese DOPs, incl. Trás-os-Montes"
        ]
      ],
      "aroma": [
        "Green herbs",
        "Cut grass",
        "Olive leaf",
        "Dried fruit"
      ],
      "aromaNote": "General variety descriptions from regional producer associations, which describe aromatic complexity and a bitterness tendentially lower than Verdeal’s. No published panel medians for monovarietal Cobrançosa.",
      "compare": {
        "origin": "Trás-os-Montes, Portugal",
        "polyphenols": "~803 mg/kg",
        "sensory": "Herbaceous and complex, balanced spiciness, moderate bitterness",
        "pairing": "Grilled sardines, roasted peppers, cornbread"
      },
      "map": {
        "placeholder": "Map · Trás-os-Montes",
        "caption": "Trás-os-Montes, northern Portugal · 41.5° N, 7.2° W"
      },
      "seo": {
        "title": "Cobrançosa — Portugal’s High-Phenol Olive | bestoliveoils.eu",
        "description": "Double Galega’s polyphenols in the same orchards and seasons, plus over 70% rooting from cuttings and trunk-shaker compatibility. Chemistry and taste."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/portugal/cobrancosa"
        },
        {
          "label": "Health claim, anthracnose and olive fly, Foods 13(11):1734",
          "url": "https://www.mdpi.com/2304-8158/13/11/1734"
        },
        {
          "label": "Vida Rural / ITQB cultivar factsheet — Cobrançosa",
          "url": "https://www.itqb.unl.pt/science-and-society/Media/cultivares-de-oliveira-cobrancosa-vida-rural.pdf"
        }
      ]
    },
    {
      "slug": "verdeal-transmontana",
      "name": "Verdeal Transmontana",
      "country": "Portugal",
      "countryCode": "PT",
      "originRegion": "Trás-os-Montes",
      "purpose": "Oil",
      "tags": [
        "Portugal · Trás-os-Montes",
        "Monovarietal",
        "Measured stability"
      ],
      "lede": "The bitterness-and-pungency backbone of Trás-os-Montes blends, and the one Portuguese variety here with a directly measured Rancimat figure — 23 to 27 hours, roughly double a Madural from the same orchards and harvests.",
      "image": { "src": "assets/img/cultivars/verdeal-transmontana.webp", "alt": "Olive grove in Trás-os-Montes — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Verdeal Transmontana olives / grove photo",
      "stats": [
        {
          "value": "23–27 h",
          "label": "Rancimat induction time"
        },
        {
          "value": "108–202",
          "label": "mg/kg in centenarian-tree oils"
        }
      ],
      "grove": [
        "Verdeal Transmontana is the emblematic oil variety of Trás-os-Montes in northeastern Portugal. It is of medium vigour, productive but alternate-bearing, resistant to anthracnose, and susceptible to olive knot, peacock spot and olive fly. It ripens late, with research harvests documented in mid-November, and is suited to vibrator harvesting only at complete maturity.",
        "What is striking in the published data is that its stability does not track its bulk phenol content. In a two-season study of oils from centenarian trees, total phenols measured only 108 and 202 mg CAE/kg, yet Rancimat came out at 23.2 and 26.6 hours — about twice the Madural from the same groves. Something beyond phenol quantity is doing the work, and the published record does not say what."
      ],
      "reference": [
        [
          "Also called",
          "Verdeal de Trás-os-Montes (distinct from plain \"Verdeal\")"
        ],
        [
          "Main regions",
          "Trás-os-Montes, northeastern Portugal"
        ],
        [
          "Purpose",
          "Oil"
        ],
        [
          "Oleic acid",
          "Not published for the monovarietal"
        ],
        [
          "Harvest",
          "Late ripening, mid-November"
        ],
        [
          "Shelf stability",
          "23.2 h and 26.6 h Rancimat in two consecutive seasons"
        ],
        [
          "Designations",
          "Named in Azeite de Trás-os-Montes DOP"
        ]
      ],
      "aroma": [
        "Fresh herbs",
        "Cabbage",
        "Tomato leaves",
        "Cut grass"
      ],
      "aromaNote": "Published panel data, means of two seasons: fruity intensity around 5.8, pungency in the higher-intensity group, bitterness not significantly different from comparison cultivars. Descriptor intensities: fresh herbs 4.0, cabbage 3.8, tomato leaves 2.6.",
      "compare": {
        "origin": "Trás-os-Montes, Portugal",
        "polyphenols": "108–202 mg/kg in the published study",
        "sensory": "Markedly bitter and pungent, strongly vegetal, persistent",
        "pairing": "Kale soup, roast pork, chestnuts, hard cheese"
      },
      "map": {
        "placeholder": "Map · Trás-os-Montes",
        "caption": "Trás-os-Montes, northern Portugal · 41.5° N, 7.2° W"
      },
      "seo": {
        "title": "Verdeal Transmontana — Measured Stability | bestoliveoils.eu",
        "description": "Twenty-three to twenty-seven hours Rancimat on modest phenol figures — a Portuguese variety whose keeping quality is not explained by bulk phenols."
      },
      "sources": [
        {
          "label": "Minor cultivars of northeast Portugal, Food Research International",
          "url": "https://bibliotecadigital.unipb.pt/server/api/core/bitstreams/93deed12-e64a-49c1-ba7f-18f77ffd6b38/content"
        },
        {
          "label": "Azeite de Trás-os-Montes DOP, DGADR",
          "url": "https://tradicional.dgadr.gov.pt/en/categories/olive-oils-and-olives/351-azeite-de-tras-os-montes-dop-en"
        }
      ]
    },
    {
      "slug": "aglandau",
      "name": "Aglandau",
      "country": "France",
      "countryCode": "FR",
      "originRegion": "Provence",
      "purpose": "Dual-purpose",
      "tags": [
        "France · Provence",
        "Dual-purpose",
        "Self-sterile"
      ],
      "lede": "The backbone of Provençal AOP oil, accounting for around a fifth of French production, and one of the few French cultivars documented as self-sterile — so an orchard has to be planted with pollinators. Its oils are aggressive when young and soften with time.",
      "image": { "src": "assets/img/cultivars/aglandau.webp", "alt": "Olive grove in Provence — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Aglandau olives / grove photo",
      "stats": [
        {
          "value": "~20%",
          "label": "of French olive oil production"
        },
        {
          "value": "19–23%",
          "label": "oil content of the fruit"
        }
      ],
      "grove": [
        "Aglandau — the name comes from gland, acorn, for the fruit shape — is grown across Alpes-de-Haute-Provence, Bouches-du-Rhône, Gard, Var and Vaucluse. It is the principal variety of AOP Haute-Provence and a principal variety of AOP Aix-en-Provence, AOP Provence and AOP Vallée des Baux-de-Provence. It also has a table life, sold green as Berruguette.",
        "The tree is medium to weak in vigour with a spreading, dense canopy, self-sterile and so dependent on pollinators, and inclined to alternate bearing unless pruned for it. It resists Verticillium and Pseudomonas well but is susceptible to black scale, sooty mould and peacock spot. On cold and drought tolerance the French sources directly contradict each other, and no institutional data settled it, so we are not asserting either."
      ],
      "reference": [
        [
          "Also called",
          "Verdale de Carpentras, Berruguette, Blanquette, Plant d’Aix"
        ],
        [
          "Main regions",
          "Alpes-de-Haute-Provence, Bouches-du-Rhône, Gard, Var, Vaucluse"
        ],
        [
          "Purpose",
          "Dual-purpose — mainly oil, also green table"
        ],
        [
          "Oil yield",
          "19–23%"
        ],
        [
          "Harvest",
          "November–December, before frost, fruit still green"
        ],
        [
          "Fertility",
          "Self-sterile — pollinators required"
        ],
        [
          "Contested",
          "Sources disagree on cold and drought tolerance"
        ]
      ],
      "aroma": [
        "Almond",
        "Green apple",
        "Artichoke",
        "Stone fruit"
      ],
      "aromaNote": "Descriptors from French variety references, which note that bitterness and pungency are fairly marked when the oil is young. No published panel medians.",
      "compare": {
        "origin": "Provence, France",
        "polyphenols": "Not published",
        "sensory": "Fruity and unctuous, marked bitterness and pungency when young",
        "pairing": "Aïoli, tapenade, ratatouille, goat cheese"
      },
      "map": {
        "placeholder": "Map · Haute-Provence",
        "caption": "Provence, France · 43.8° N, 5.8° E"
      },
      "seo": {
        "title": "Aglandau — The Olive of Provence | bestoliveoils.eu",
        "description": "Around a fifth of French olive oil, and the principal variety of AOP Haute-Provence. Self-sterile, sharp when young, softening with time."
      },
      "sources": [
        {
          "label": "France Olive — French varieties and AOP composition",
          "url": "https://www.franceolive.fr/categorie/connaissance-de-l-arbre/les-varietes-francaises"
        },
        {
          "label": "OLEA Databases via Wikipedia — Aglandau",
          "url": "https://en.wikipedia.org/wiki/Aglandau"
        }
      ]
    },
    {
      "slug": "picholine",
      "name": "Picholine",
      "country": "France",
      "countryCode": "FR",
      "originRegion": "Collias, Gard, Languedoc",
      "purpose": "Dual-purpose",
      "tags": [
        "France · Gard",
        "Table olive",
        "Name confusion"
      ],
      "lede": "The reference French cocktail olive — lye-treated then brine-fermented for up to a year — and the sole principal variety of AOP Nîmes. Its name has been borrowed by an unrelated Moroccan cultivar that now dominates an entire national industry.",
      "image": { "src": "assets/img/cultivars/picholine.webp", "alt": "Olive grove in Collias, Gard, Languedoc — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Picholine olives / grove photo",
      "stats": [
        {
          "value": "20–22%",
          "label": "oil content, less under irrigation"
        },
        {
          "value": "~858,400 ha",
          "label": "of the unrelated Picholine Marocaine"
        }
      ],
      "grove": [
        "Picholine comes from Collias in the Gard, between Uzès and Remoulins, and is the principal variety of AOP Nîmes. It is of medium vigour with a spreading habit, partially self-fertile, and grown for both green table olives — picked October to November — and oil from later, blacker fruit. Oil yield is 20 to 22%, falling to 15 to 18% under irrigation.",
        "The identity question is worth spelling out, because it is the single most common confusion in olive-oil reference material. Picholine Marocaine is a different cultivar: the IOC catalogue lists the two separately with different SSR profiles at all five published loci, and Moroccan breeding programmes cross them as two distinct parents. Picholine Marocaine covers around 858,400 hectares and 74 million trees — roughly 80% of Morocco’s orchard — so the name carries far more weight abroad than at home."
      ],
      "reference": [
        [
          "Also called",
          "Picholine du Languedoc, Coiasse, Collias, Olive de Nîmes"
        ],
        [
          "Main regions",
          "Gard, France; reported in Italy, Israel, Chile, Tunisia, USA"
        ],
        [
          "Purpose",
          "Dual-purpose — best known as a green cocktail olive"
        ],
        [
          "Oil yield",
          "20–22%, falling to 15–18% under irrigation"
        ],
        [
          "Harvest",
          "October–November green for the table; later and black for oil"
        ],
        [
          "Designations",
          "AOP Nîmes"
        ],
        [
          "Not the same as",
          "Picholine Marocaine — a genetically distinct cultivar"
        ]
      ],
      "aroma": [
        "Green apple",
        "Pear",
        "Grass",
        "Hay"
      ],
      "aromaNote": "Descriptors from French variety references, which give a very green fruitiness with light bitterness and pungency. No published panel medians.",
      "compare": {
        "origin": "Gard, France",
        "polyphenols": "Not published",
        "sensory": "Very green and fruity, light bitterness and pungency",
        "pairing": "The olive itself — apéritif; the oil suits salads"
      },
      "map": {
        "placeholder": "Map · Gard, Languedoc",
        "caption": "Collias, Gard · 43.9° N, 4.5° E"
      },
      "seo": {
        "title": "Picholine — France’s Cocktail Olive | bestoliveoils.eu",
        "description": "The green olive of the Gard and the only principal variety of AOP Nîmes — and why Picholine Marocaine is a genetically different cultivar entirely."
      },
      "sources": [
        {
          "label": "IOC World Catalogue — Picholine du Languedoc",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/france/picholine-du-languedoc"
        },
        {
          "label": "IOC World Catalogue — Picholine Marocaine",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/marocco/picholine-marocaine"
        },
        {
          "label": "France Olive — French varieties",
          "url": "https://www.franceolive.fr/categorie/connaissance-de-l-arbre/les-varietes-francaises"
        }
      ]
    },
    {
      "slug": "istarska-bjelica",
      "name": "Istarska Bjelica",
      "country": "Croatia and Slovenia",
      "countryCode": "HR",
      "originRegion": "Istria",
      "purpose": "Oil",
      "tags": [
        "Istria · Croatia & Slovenia",
        "Monovarietal",
        "Very high phenolic"
      ],
      "lede": "One of the highest-phenol commercial cultivars documented in the northern Adriatic: 642 mg/kg against Leccino’s 199 in the same trial. The phenol fraction is unusually rich in oleocanthal, which is exactly what produces its hallmark throat burn.",
      "image": { "src": "assets/img/cultivars/istarska-bjelica.webp", "alt": "Olive grove in Istria — a generated illustration, not a photograph of a specific grove", "w": 1200, "h": 805 },
      "imagePlaceholder": "Istarska Bjelica olives / grove photo",
      "stats": [
        {
          "value": "~642",
          "label": "mg/kg total phenols"
        },
        {
          "value": "~50%",
          "label": "of secoiridoids as oleocanthal"
        }
      ],
      "grove": [
        "One cultivar, three national names: Istarska bjelica in Croatia, Istrska belica in Slovenia and Bianchera in Italy, where it is grown around Muggia and San Dorligo della Valle. It is the most widely planted variety in Slovenian olive orchards and is found throughout Istria and Kvarner. Its origin is contested — the IOC records an oral tradition placing it near Trieste, while Croatian and Slovenian sources treat it as an Istrian native.",
        "The tree is vigorous and erect with dense foliage, inclined to grow tall, which makes crown shaping difficult. It bears cold well and is notably resistant to the bora, which is how it came to dominate after the 1956 frost killed off more tender plantings. It is assumed self-fertile but preferentially cross-pollinated, with Leccino and Frantoio as pollinators, and is very sensitive to olive fly, olive moth and peacock spot. Historically harvested mid-November to mid-December, it is now picked from mid-October under current climate conditions."
      ],
      "reference": [
        [
          "Also called",
          "Istrska belica (SI), Bianchera (IT), Bijelica, Plemenita belica"
        ],
        [
          "Main regions",
          "Istria and Kvarner (HR), coastal Slovenia, Trieste province (IT)"
        ],
        [
          "Purpose",
          "Oil only"
        ],
        [
          "Oleic acid",
          "Described as high; no numeric range published"
        ],
        [
          "Oil yield",
          "16.5% at a very early harvest"
        ],
        [
          "Harvest",
          "Now from mid-October; historically Nov–Dec"
        ],
        [
          "Tolerances",
          "Cold- and bora-hardy; very sensitive to fly, moth, peacock spot"
        ]
      ],
      "aroma": [
        "Freshly mown grass",
        "Ripe olive fruit",
        "Green apple",
        "Bitter almond"
      ],
      "aromaNote": "Catalogue descriptors plus instrumental volatile data: the compounds above the odour threshold in this cultivar are 1-penten-3-one, E-2-hexenal, hexanal and Z-2-penten-1-ol. Notably its C6 volatiles are lower than Leccino’s — the intensity comes from phenols, not green volatiles.",
      "compare": {
        "origin": "Istria, Croatia and Slovenia",
        "polyphenols": "~642 mg/kg",
        "sensory": "Distinctly bitter and pungent, with a strong oleocanthal throat catch",
        "pairing": "Adriatic fish, truffle dishes, beans, boiled greens"
      },
      "map": {
        "placeholder": "Map · Istria",
        "caption": "Istria, northern Adriatic · 45.2° N, 13.9° E"
      },
      "seo": {
        "title": "Istarska Bjelica — The Adriatic Phenol King | bestoliveoils.eu",
        "description": "Triple Leccino’s polyphenols in the same trial, with half the secoiridoid fraction as oleocanthal. The cold-hardy Istrian variety behind that throat burn."
      },
      "sources": [
        {
          "label": "IOC World Catalogue of Olive Varieties",
          "url": "https://worldolivecatalogue.internationaloliveoil.org/en/variety/slovenia/istarska-bjelica"
        },
        {
          "label": "Phenolic and volatile compounds in Leccino and Istarska Bjelica oils, Food Technol. Biotechnol.",
          "url": "https://hrcak.srce.hr/file/124878"
        },
        {
          "label": "Oleocanthal quantification in Bianchera/Belica oil, Molecules 26(1):242",
          "url": "https://www.mdpi.com/1420-3049/26/1/242"
        }
      ]
    },
  ],

  notCultivars: ['not-published', 'blend-varies-by-year', 'dop-baena-varieties'],

  /* ── oils ───────────────────────────────────────────────────────────────
     `stars` is the whole-star count the ★ row draws; `score` is the printed
     decimal. `image: null` renders a labelled placeholder at the same size. */
  oils: [
    {
      slug: 'oro-bailen-picual',
      name: 'Oro Bailén Picual',
      producer: 'Oro Bailén',
      producerSlug: 'oro-bailen',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.7',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Medium',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-picual',
      image: { src: 'assets/img/oro-bailen-picual.webp', alt: 'Bottle of Oro Bailén Picual extra virgin olive oil, 250 ml', fit: 'contain', w: 562, h: 562 },
      price: '500 ml · €19.90 at our shop',
      priceAmount: 19.90,
      priceCurrency: 'EUR',
      seo: {
        title: 'Oro Bailén Picual Review | bestoliveoils.eu',
        description: 'Early-harvest Picual from Jaén, scored 4.7/5 by our panel. Tomato leaf and cut grass, 470 mg/kg polyphenols, 0.11% acidity, Flos Olei 99/100. Where to buy it.',
      },
      detail: {
        location: 'Villanueva de la Reina, Jaén, Spain',
        tags: ['Medium', 'Early harvest', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'The flagship Picual of a family mill in Jaén that picks in early October, while the fruit is still green, and cold-extracts within hours. Tomato leaf, cut grass and green almond on the nose, a clean bitterness and a peppery finish that builds slowly rather than attacking — Picual with all its character and none of the harshness the cultivar is often blamed for.',
        profile: [
          { label: 'Fruity',  desc: 'tomato leaf, cut grass, green almond', pct: '84%' },
          { label: 'Bitter',  desc: 'clear, clean',                        pct: '58%' },
          { label: 'Pungent', desc: 'builds late, lingers',                pct: '70%' },
        ],
        tastingNote: 'Green olive, tomato plant and fresh herbs on the nose, with green almond and a hint of apple. Smooth, almost buttery entry, then a clear bitterness on the tongue and a peppery pungency that arrives late and stays for a good minute. Intensely green for a "medium" oil; the balance is what makes it approachable.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025, early (green fruit)'],
          ['Polyphenols',   '470 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.11%'],
          ['Oleic acid',    '≈ 77% (monounsaturated)'],
          ['Extraction',    'Cold, within hours of picking'],
          ['Estate',        'Los Juncales & La Casa del Agua, Villanueva de la Reina'],
        ],
        awards: ['99/100 · Flos Olei 2026', "World's best EVOO · EVOOLEUM 2022", 'Gold · NYIOOC', 'Platinum · London IOOC', 'Star · Great Taste 2025'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Villanueva de la Reina sits on the Guadalquivir plain in the province of Jaén, the most densely planted olive landscape in the world. Oro Bailén picks weeks before most of its neighbours, which costs yield and buys the green, high-polyphenol style.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Tomato salad', 'Grilled vegetables', 'Bread and salt', 'White fish', 'Gazpacho'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'Picual is the workhorse olive of Jaén and most of it ends up as anonymous supermarket oil. This is the other kind. Early picking and fast milling give it the tomato-leaf, cut-grass character the cultivar is loved for, and the bitterness is clean rather than harsh. A finishing oil first: over a tomato salad, grilled vegetables or simply bread with salt. At this price we would not cook with it — the Arbequina from the same house is the one for the pan.',
        },
        reviews: [],
      },
    },
    {
      slug: 'oro-bailen-arbequina',
      name: 'Oro Bailén Arbequina',
      producer: 'Oro Bailén',
      producerSlug: 'oro-bailen',
      cultivar: 'Arbequina',
      region: 'Andalusia · Spain',
      score: '4.5',
      stars: 4,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Delicate',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-arbequina',
      image: { src: 'assets/img/oro-bailen-arbequina.webp', alt: 'Bottle of Oro Bailén Arbequina extra virgin olive oil, 250 ml', fit: 'contain', w: 562, h: 562 },
      price: '500 ml · €19.90 at our shop',
      priceAmount: 19.90,
      priceCurrency: 'EUR',
      seo: {
        title: 'Oro Bailén Arbequina Review | bestoliveoils.eu',
        description: 'The gentle Arbequina from the Oro Bailén estate in Jaén, scored 4.5/5. Ripe apple, banana and sweet almond, 330 mg/kg polyphenols, 0.1% acidity. Where to buy it.',
      },
      detail: {
        location: 'Villanueva de la Reina, Jaén, Spain',
        tags: ['Delicate', 'Early harvest', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'Same estate, same early harvest, opposite personality. Where the Picual is green and peppery, the Arbequina is soft and fruity: ripe apple, banana and sweet almond, a gentle warmth in the throat and almost no bitterness. The oil for people who find Picual too much — and, at 330 mg/kg polyphenols, a serious one all the same.',
        profile: [
          { label: 'Fruity',  desc: 'ripe apple, banana, sweet almond', pct: '70%' },
          { label: 'Bitter',  desc: 'barely there',                    pct: '22%' },
          { label: 'Pungent', desc: 'soft, warming',                   pct: '35%' },
        ],
        tastingNote: 'Ripe apple and banana first, then sweet almond, chamomile and a light citrus lift. Buttery on the palate, sweet rather than bitter, with a pungency that registers as warmth more than pepper. Clean, smooth finish. Drink it young: Arbequina loses its fruit faster than Picual, so finish the bottle within a few months of opening.',
        facts: [
          ['Cultivar',      '100% Arbequina'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '330 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.10%'],
          ['Extraction',    'Cold, within hours of picking'],
          ['Estate',        'Los Juncales & La Casa del Agua, Villanueva de la Reina'],
        ],
        awards: ['Silver · NYIOOC 2026', 'Gold · NYIOOC 2025', 'Gold · NYIOOC 2024', 'Silver · Los Angeles IEVOOC 2026'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Arbequina is a Catalan olive, but Oro Bailén grows it in Jaén alongside its Picual and gives it the same early harvest and fast milling. The result is fruitier and more structured than most Catalan Arbequinas.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['White fish', 'Green salads', 'Fresh cheese', 'Mayonnaise', 'Baking'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 4,
          text: 'The easiest oil in the library to like, and the hardest to keep. Apple and banana on the nose, a buttery texture, and a pungency so soft you notice it only as warmth. Use it where you want oil without a strong voice — mayonnaise, white fish, a cake. Keep it cool and out of the light; Arbequina does not age well. If you want the same estate with more grip, the Picual is the one.',
        },
        reviews: [],
      },
    },
    {
      slug: 'oro-bailen-hojiblanca',
      name: 'Oro Bailén Hojiblanca',
      producer: 'Oro Bailén',
      producerSlug: 'oro-bailen',
      cultivar: 'Hojiblanca',
      region: 'Andalusia · Spain',
      score: '4.6',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Medium',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-hojiblanca',
      image: { src: 'assets/img/oro-bailen-hojiblanca.webp', alt: 'Bottle of Oro Bailén Hojiblanca extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €19.90 at our shop',
      priceAmount: 19.90,
      priceCurrency: 'EUR',
      seo: {
        title: 'Oro Bailén Hojiblanca Review | bestoliveoils.eu',
        description: 'Single-varietal Hojiblanca from Oro Bailén in Jaén, scored 4.6/5. Apple, green banana, artichoke and fennel, 473 mg/kg polyphenols, NYIOOC Gold 2025 and 2026.',
      },
      detail: {
        location: 'Villanueva de la Reina, Jaén, Spain',
        tags: ['Medium', 'Early harvest', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'Hojiblanca is Andalusia\'s second olive after Picual and usually ends up in blends. On its own, from an early harvest, it is one of the most aromatic oils in Spain: sweet apple and green banana up front, then artichoke, tomato, fennel and a cool mint note, with a bitterness that is present but polite and a peppery finish. Oro Bailén\'s is the reference version.',
        profile: [
          { label: 'Fruity',  desc: 'apple, green banana, artichoke, fennel', pct: '80%' },
          { label: 'Bitter',  desc: 'moderate, well placed',                pct: '48%' },
          { label: 'Pungent', desc: 'peppery, medium',                      pct: '58%' },
        ],
        tastingNote: 'Sweet apple and green banana on the nose, followed by artichoke, tomato, fennel and peppermint. Rounder on the palate than the Picual, with a slight bitterness and a clean, peppery finish. The most herbal of the four Oro Bailén monovarietals.',
        facts: [
          ['Cultivar',      '100% Hojiblanca'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '473 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.10%'],
          ['Extraction',    'Cold, within hours of picking'],
          ['Estate',        'Los Juncales & La Casa del Agua, Villanueva de la Reina'],
        ],
        awards: ['Gold · NYIOOC 2026', 'Gold · Los Angeles IEVOOC 2026', 'Gold · NYIOOC 2025', 'Silver · NYIOOC 2024'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Hojiblanca — "white leaf", for the pale underside of its leaves — is native to the Córdoba–Málaga border but grows across Andalusia. Oro Bailén\'s block sits in the Sierra Morena foothills above Villanueva de la Reina.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Grilled fish', 'Roasted vegetables', 'Green salads', 'Grilled bread', 'Pasta'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'If the Picual is the estate\'s statement oil and the Arbequina the gentle one, the Hojiblanca is the one we would put on the table every day. Aromatic and green without being aggressive, enough bitterness to feel serious, and a pepper that lands softly. Excellent on grilled fish and on anything with fennel or artichoke.',
        },
        reviews: [],
      },
    },
    {
      slug: 'oro-bailen-frantoio',
      name: 'Oro Bailén Frantoio',
      producer: 'Oro Bailén',
      producerSlug: 'oro-bailen',
      cultivar: 'Frantoio',
      region: 'Andalusia · Spain',
      score: '4.5',
      stars: 4,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Medium',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-frantoio',
      image: { src: 'assets/img/oro-bailen-frantoio.webp', alt: 'Bottle of Oro Bailén Frantoio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €19.99 at our shop',
      priceAmount: 19.99,
      priceCurrency: 'EUR',
      seo: {
        title: 'Oro Bailén Frantoio Review | bestoliveoils.eu',
        description: 'A Tuscan olive grown in Jaén: Oro Bailén Frantoio scored 4.5/5. Green apple, kiwi, almond and pine, 441 mg/kg polyphenols, NYIOOC Gold 2025 and 2026.',
      },
      detail: {
        location: 'Villanueva de la Reina, Jaén, Spain',
        tags: ['Medium', 'Early harvest', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'Frantoio is the great olive of Tuscany, and it is unusual to find it planted in Jaén. Oro Bailén grows a small block and treats it like its other monovarietals — early pick, fast cold extraction. The result is sweeter and more aromatic than a Tuscan Frantoio, with green apple, kiwi and pine on the nose and a balsamic, moderately bitter finish.',
        profile: [
          { label: 'Fruity',  desc: 'green apple, kiwi, almond, pine', pct: '78%' },
          { label: 'Bitter',  desc: 'balanced',                       pct: '50%' },
          { label: 'Pungent', desc: 'pleasant, medium',               pct: '55%' },
        ],
        tastingNote: 'Green apple, kiwi and tropical fruit first, then almond and a resinous pine note. Sweet-toned opening, balanced bitterness, a pungency that is clearly there without dominating, and a balsamic, herbal finish. Recognisably Frantoio, but riper and rounder than the Tuscan originals.',
        facts: [
          ['Cultivar',      '100% Frantoio'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '441 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.12%'],
          ['Extraction',    'Cold, within hours of picking'],
          ['Estate',        'Los Juncales & La Casa del Agua, Villanueva de la Reina'],
        ],
        awards: ['Gold · NYIOOC 2026', 'Gold · Los Angeles IEVOOC 2026', 'Gold · CINVE 2026', 'Gold · NYIOOC 2025'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Frantoio is native to Tuscany and rarely planted in Andalusia; the warmer, drier Jaén climate ripens it earlier and gives a rounder, less bitter oil than its Italian cousins.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Pasta', 'Grilled fish', 'Red meat', 'Aged cheese', 'Pizza'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 4,
          text: 'A curiosity that turns out to be a very good oil. Anyone who knows Tuscan Frantoio will recognise the pine and the balsamic finish, but the Jaén sun has taken the edge off the bitterness and added ripe fruit. Try it on pasta or a simple pizza, where a Picual would shout.',
        },
        reviews: [],
      },
    },
    {
      slug: 'oro-bailen-picual-organic',
      name: 'Oro Bailén Picual Bio',
      producer: 'Oro Bailén',
      producerSlug: 'oro-bailen',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.7',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Robust',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-picual-bio',
      image: { src: 'assets/img/oro-bailen-picual-organic.webp', alt: 'Bottle of Oro Bailén Picual Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €20.90 at our shop',
      priceAmount: 20.90,
      priceCurrency: 'EUR',
      seo: {
        title: 'Oro Bailén Picual Bio Review | bestoliveoils.eu',
        description: 'Certified-organic Picual from Oro Bailén in Jaén, scored 4.7/5. Tomato, fig and cut grass, 535 mg/kg polyphenols, 0.12% acidity, NYIOOC Gold and BioL Gold 2026.',
      },
      detail: {
        location: 'Villanueva de la Reina, Jaén, Spain',
        tags: ['Robust', 'Organic', 'Early harvest', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'The organic edition of the Picual, from certified-organic groves on the same estate: EVOOLEUM Grand Prestige 2026 and a top finish in the World\'s Best Olive Oils 2025 ranking. Bolder than the standard Picual: more tomato and fig, a firmer, well-structured bitterness and a long, spicy finish. The highest polyphenol count in the Oro Bailén range, which is exactly what those attributes are telling you.',
        profile: [
          { label: 'Fruity',  desc: 'tomato, fig, cut grass, green almond', pct: '86%' },
          { label: 'Bitter',  desc: 'firm, structured',                    pct: '66%' },
          { label: 'Pungent', desc: 'bold, persistent',                    pct: '76%' },
        ],
        tastingNote: 'Tomato, apple and banana on the nose, with green almond, fig and freshly cut grass behind. On the palate a well-structured bitterness and a persistent, pleasantly bold pungency. Robust rather than medium: this is Picual with the volume up.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '535 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.12%'],
          ['Extraction',    'Cold, within hours of picking'],
          ['Certification', 'EU Organic'],
          ['Estate',        'Villanueva de la Reina, Jaén'],
        ],
        awards: ['Grand Prestige · EVOOLEUM 2026', 'Gold · NYIOOC 2026', 'Gold · BioL 2026', 'Silver · Los Angeles IEVOOC 2026', 'Bronze · Sol d\'Oro 2026'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Organic Picual from the same Villanueva de la Reina estate as the Reserva Familiar. Organic groves in Jaén are still rare; the early-harvest, high-polyphenol style is the same.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Tomato salad', 'Red meat', 'Roasted vegetables', 'Aged cheese', 'Grilled bread'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'The Reserva Familiar Picual with the safety catch off. More bitterness, more pepper, more tomato — and the organic certification for those who want it. If you are buying olive oil for health as much as flavour, this is the Oro Bailén to choose; 535 mg/kg is a serious number. Pair it with food that can push back.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-flor-de-abeja-picual-bio',
      name: 'Nobleza del Sur Flor de Abeja Picual Bio',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.8',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Robust',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-flor-de-abeja-picual',
      image: { src: 'assets/img/nobleza-del-sur-flor-de-abeja-picual-bio.webp', alt: 'Bottle of Nobleza del Sur Flor de Abeja Picual Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €39.95 at our shop',
      priceAmount: 39.95,
      priceCurrency: 'EUR',
      seo: {
        title: 'Flor de Abeja Picual Bio Review | bestoliveoils.eu',
        description: 'Organic, unfiltered, 705 mg/kg: the high-polyphenol Picual from Nobleza del Sur, scored 4.8/5. Tomato leaf, green banana peel and a long oleocanthal burn.',
      },
      detail: {
        location: 'Castellar, Jaén, Spain',
        tags: ['Robust', 'Organic', 'Unfiltered', 'High polyphenol', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'Flor de Abeja is the line Nobleza del Sur built for people who buy olive oil as a health decision, and the organic Picual is its centre: hand-picked from old trees at the point where phenolic content peaks, cold-extracted within hours, and bottled unfiltered. At 705 mg/kg it sits close to three times the EU threshold for the polyphenol health claim, and the palate tells you so before the label does.',
        profile: [
          { label: 'Fruity',  desc: 'green — tomato leaf, banana peel', pct: '85%' },
          { label: 'Bitter',  desc: 'assertive, structured',            pct: '75%' },
          { label: 'Pungent', desc: 'oleocanthal burn, very long',      pct: '80%' },
        ],
        tastingNote: 'Intensely green fruity on the nose: tomato leaf and green olive first, then green banana peel, fresh almond and cut grass — the aromatic signature of Picual picked well before veraison. The attack is broad rather than sharp; bitterness builds across the tongue and holds, and the pungency arrives late in the throat and stays for well over a minute. That burn is oleocanthal, and at this concentration a first taste will make most people cough once. Being unfiltered, it carries a fine suspension that adds body now and shortens its life later: buy it to drink this year, keep it dark and cool, and do not save it for a special occasion.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025, early — hand-picked'],
          ['Polyphenols',   '705 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.12%'],
          ['Filtration',    'Unfiltered'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Certification', 'EU Organic'],
        ],
        awards: ['99/100 · Flos Olei (producer)', 'Gold · BIOL 2026', 'Gold · NYIOOC 2025'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Castellar sits in eastern Jaén, where the Guadalquivir plain climbs towards the Sierra de Segura. Cooler nights and altitude slow ripening, which is part of why an early pick here holds this much phenolic content.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Green salads', 'Roasted vegetables', 'Pulses and soups', 'Beef carpaccio', 'Bread and salt'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'High-polyphenol oils are usually sold on a number and drunk as a penance. This one earns the number and is still a pleasure, because the fruit underneath is real: tomato leaf and banana peel rather than the flat green sap you get when a producer picks too early and mills too slowly. Bitterness and pungency are close to balanced, with pungency just ahead — textbook Picual, correctly made. Serve it raw and at room temperature; heat destroys exactly what you paid for. If you find the throat burn too much at first, give the bottle a month, or step down to Eco Day.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-novo',
      name: 'Nobleza del Sur Novo',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.7',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Robust',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-novo',
      image: { src: 'assets/img/nobleza-del-sur-novo.webp', alt: 'Bottle of Nobleza del Sur Novo extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €24.95 at our shop',
      priceAmount: 24.95,
      priceCurrency: 'EUR',
      seo: {
        title: 'Nobleza del Sur Novo Review — Novello | bestoliveoils.eu',
        description: 'The first Picual of the season from Finca Vista Alegre, scored 4.7/5. 837 mg/kg polyphenols — the highest in our library — with lavender and tomato vine.',
      },
      detail: {
        location: 'Finca Vista Alegre, Jaén, Spain',
        tags: ['Robust', 'Novello', 'Seasonal', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'A true novello: the first oil off the mill each season, from the earliest pick at Finca Vista Alegre, sold while it lasts and gone by spring. It is also, at 837 mg/kg, the highest-phenolic oil in our library — the number you get when olives go under a cold press within four hours of being picked green, and when roughly fourteen kilos of fruit are spent on a single litre.',
        profile: [
          { label: 'Fruity',  desc: 'green — tomato vine, lavender',  pct: '90%' },
          { label: 'Bitter',  desc: 'moderate for the phenolics',     pct: '65%' },
          { label: 'Pungent', desc: 'immediate, prickling',           pct: '75%' },
        ],
        tastingNote: 'Startlingly green in the glass and on the nose: tomato vine, green apple and green almond, with an unusual floral top note the producer calls lavender and which our panel read as something closer to fresh herbs. The attack is fruity and surprisingly harmonious for the phenolic load; bitterness stays moderate while pungency arrives at once rather than building, with the faint prickle on the tongue that only very young oil has. What it lacks is the roundness that three or four months in a tank would give it — and that absence is the entire point of buying a novello.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025 — first pick of the season'],
          ['Polyphenols',   '837 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.15%'],
          ['Yield',         '≈ 10–14 kg of olives per litre'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Estate',        'Finca Vista Alegre, Jaén'],
          ['Availability',  'Seasonal — one bottling a year'],
        ],
        awards: ['99/100 · Flos Olei 2026 (producer)'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Finca Vista Alegre lies in central Jaén with a distinct Mediterranean microclimate; it is also the grove behind the estate\'s Centenarium Premium.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Toasted bread', 'Bean and lentil soups', 'Grilled vegetables', 'Burrata', 'A pinch of sea salt'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'Novello is a seasonal event, not a pantry oil, and it has to be judged on those terms. Judged that way this is excellent: enormous green fruit, a phenolic count higher than anything else we have measured, and — the part that surprised us — enough balance that it never turns harsh. Note the acidity, 0.15%, slightly above the estate\'s own house standard: that is the tax you pay for milling the very first, hardest fruit of the year, and it is not a fault. Pour it generously within weeks of buying, over soup or bread. By March it will be a good oil rather than a remarkable one. For the same estate\'s Picual in a form that keeps, buy Eco Day.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-eco-day',
      name: 'Nobleza del Sur Eco Day',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.7',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Medium',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-vroege-oogst-organic-day',
      image: { src: 'assets/img/nobleza-del-sur-eco-day.webp', alt: 'Bottle of Nobleza del Sur Eco Day extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €27.50 at our shop',
      priceAmount: 27.50,
      priceCurrency: 'EUR',
      seo: {
        title: 'Nobleza del Sur Eco Day Review | bestoliveoils.eu',
        description: 'Organic early-harvest Picual from Jaén with 690 mg/kg polyphenols, scored 4.7/5. Tomato plant, artichoke and apple peel. Flos Olei 99/100, NYIOOC Gold.',
      },
      detail: {
        location: 'Castellar, Jaén, Spain',
        tags: ['Medium', 'Organic', 'High polyphenol', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'The bee on the label is a farming statement: Eco Day comes from organic groves managed to keep their daytime pollinators in them. Inside is a serious early-harvest Picual at 690 mg/kg — within a whisker of the Flor de Abeja line — but tuned for daily use rather than for the number. Green and herbaceous, with a clean bitterness and a pepper that lands lightly. The estate\'s everyday flagship, and the one we hand people who ask for "a good olive oil".',
        profile: [
          { label: 'Fruity',  desc: 'green — tomato plant, artichoke', pct: '80%' },
          { label: 'Bitter',  desc: 'clean, well placed',              pct: '60%' },
          { label: 'Pungent', desc: 'peppery, medium persistence',     pct: '65%' },
        ],
        tastingNote: 'Green fruity, led by tomato plant, artichoke and freshly cut grass, with apple peel and green banana behind — the second pair is what keeps it from reading as purely vegetal. Medium-bodied, with bitterness and pungency arriving together and neither dominating; the finish is peppery and clean rather than long. Notably smooth for its phenolic count, which is the whole trick of this bottle: 690 mg/kg usually costs you approachability, and here it does not.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '690 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.10%'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Certification', 'EU Organic'],
        ],
        awards: ['99/100 · Flos Olei', 'Gold · NYIOOC', 'Gold · Olive Japan', 'Gold · London IOOC'],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Organic groves in eastern Jaén, farmed to protect the daytime pollinators on the label, and milled on the estate within four hours of picking.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Pan con tomate', 'Green salads', 'Grilled vegetables', 'Pasta', 'Everyday finishing'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'The most useful bottle Nobleza del Sur makes. It has the full green Picual signature — tomato plant, artichoke, a proper peppery close — with the volume set where a household will actually finish it rather than admire it. Balance is its real achievement: at 690 mg/kg most oils are markedly bitter, and this one reads as harmonious. Good enough raw to justify the price, stable enough to cook with when you have to. If it is still too green for the people at your table, Eco Night is the same estate with the edges taken off.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-flor-de-abeja-arbequina',
      name: 'Nobleza del Sur Flor de Abeja Arbequina',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Arbequina',
      region: 'Andalusia · Spain',
      score: '4.6',
      stars: 5,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Medium',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-flor-de-abeja-arbequina',
      image: { src: 'assets/img/nobleza-del-sur-flor-de-abeja-arbequina.webp', alt: 'Bottle of Nobleza del Sur Flor de Abeja Arbequina extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €39.95 at our shop',
      priceAmount: 39.95,
      priceCurrency: 'EUR',
      seo: {
        title: 'Flor de Abeja Arbequina Review | bestoliveoils.eu',
        description: 'A high-polyphenol Arbequina from the Sierra de Cazorla, scored 4.6/5. Over 500 mg/kg with green apple and banana — the soft variety, made serious.',
      },
      detail: {
        location: 'Sierra de Cazorla, Jaén, Spain',
        tags: ['Medium', 'High polyphenol', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'Arbequina is the softest of the Spanish varieties and normally the poorest in polyphenols; a typical bottle lands between 100 and 250 mg/kg. This one is over 500. The mechanism is not magic — picked green in October at the phenolic peak, in the cooler air of the Sierra de Cazorla, under the cold press within four hours — but the result is genuinely unusual: Arbequina fruit with a real oleocanthal finish.',
        profile: [
          { label: 'Fruity',  desc: 'green apple, banana, cut grass', pct: '75%' },
          { label: 'Bitter',  desc: 'mild, well behind the fruit',    pct: '40%' },
          { label: 'Pungent', desc: 'a clear tickle, not a burn',     pct: '55%' },
        ],
        tastingNote: 'Green apple and banana on the nose with cut grass behind, more concentrated than the variety usually manages. Silky on entry — Arbequina\'s characteristic soft, almost buttery texture is intact — then a distinct peppery tickle at the back of the throat that no ordinary Arbequina delivers. Bitterness stays mild throughout and never competes with the fruit. The balance is unusual and the reason the oil exists: the sensory profile of a delicate oil with the phenolic behaviour of a robust one.',
        facts: [
          ['Cultivar',      '100% Arbequina'],
          ['Harvest',       'October 2025, picked green'],
          ['Polyphenols',   '500+ mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.10%'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Grove',         'Sierra de Cazorla, Jaén'],
        ],
        awards: [],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'The Sierra de Cazorla is the mountainous east of Jaén — higher, cooler and later than the Guadalquivir plain. Slower ripening is part of why an Arbequina grown here can hold this much phenolic content.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Raw fish and carpaccio', 'Steamed vegetables', 'Fresh cheeses', 'Green salads', 'Mayonnaise'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 5,
          text: 'This answers the question we are asked more than any other: is there a high-polyphenol oil that does not taste like punishment? Yes, and this is it. Understand what you are buying, though — the price matches a top Picual because Arbequina yields less of everything, phenolics included, so reaching 500 mg/kg with this variety is expensive work rather than a marketing decision. One caution from the sommelier\'s side: Arbequina oxidises faster than Picual whatever its phenolic count, so treat this as a twelve-month bottle, not a three-year one. Superb over raw fish, where a Picual would flatten the dish.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-eco-night',
      name: 'Nobleza del Sur Eco Night',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Picual · Arbequina',
      region: 'Andalusia · Spain',
      score: '4.4',
      stars: 4,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Delicate',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-vroege-oogst-organic-night',
      image: { src: 'assets/img/nobleza-del-sur-eco-night.webp', alt: 'Bottle of Nobleza del Sur Eco Night extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '500 ml · €27.95 at our shop',
      priceAmount: 27.95,
      priceCurrency: 'EUR',
      seo: {
        title: 'Nobleza del Sur Eco Night Review | bestoliveoils.eu',
        description: 'The organic Picual and Arbequina coupage from Jaén, scored 4.4/5. Almond and ripe fruit with a light peppery lift, 373 mg/kg. The easy half of a pair.',
      },
      detail: {
        location: 'Castellar, Jaén, Spain',
        tags: ['Delicate', 'Organic', 'Coupage', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'The softer half of the estate\'s organic pair, and the only blend among them: Arbequina supplies the fruit and the almond, Picual the herbal edge and a light pepper at the close. The moth on the label stands for the nocturnal pollinators the groves are farmed to keep. At 373 mg/kg it still clears the EU health-claim threshold of 250 comfortably, but it drinks like an everyday oil, which is precisely its brief.',
        profile: [
          { label: 'Fruity',  desc: 'ripe — almond, apple, herbs', pct: '65%' },
          { label: 'Bitter',  desc: 'gentle, short',               pct: '35%' },
          { label: 'Pungent', desc: 'a light lift at the end',     pct: '40%' },
        ],
        tastingNote: 'Where Eco Day is green fruity, this leans ripe: sweet almond, ripe apple and a touch of stone fruit from the Arbequina, with the Picual showing as a fresh herbal thread and a subtle pepper on the finish. Round and low in bitterness, with modest persistence. A coupage built to be liked rather than to be admired, and honest about it — the two varieties are legible in the glass instead of muddied together.',
        facts: [
          ['Cultivar',      'Picual and Arbequina (coupage)'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '373 mg/kg (producer lab report, 2025/26)'],
          ['Free acidity',  '0.10%'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Certification', 'EU Organic'],
        ],
        awards: [],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'The same organic groves as Eco Day, in eastern Jaén, managed to protect the night-flying pollinators pictured on the label.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Salads', 'Steamed vegetables', 'Pasta', 'Light frying', 'Baking'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 4,
          text: 'A well-judged blend rather than a compromise, and a useful one. If Eco Day is too green for the people you cook for — and in many households it is — this is the same estate, the same organic groves and the same four-hour milling, simply built for the middle of the table. It is also the better of the two for cooking, since you are not burning off 690 mg/kg of phenolics you paid a premium for. Do not expect complexity: this is a harmonious, mild, correct oil, and being deliberately unremarkable is the job it was given.',
        },
        reviews: [],
      },
    },
    {
      slug: 'nobleza-del-sur-only-for-children',
      name: 'Nobleza del Sur Only for Children',
      producer: 'Nobleza del Sur',
      producerSlug: 'nobleza-del-sur',
      cultivar: 'Arbequina · Picual',
      region: 'Andalusia · Spain',
      score: '4.3',
      stars: 4,
      reviews: 0,
      readerScore: null,
      readerStars: 0,
      intensity: 'Delicate',
      inShop: true,
      shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-alleen-voor-kinderen',
      image: { src: 'assets/img/nobleza-del-sur-only-for-children.webp', alt: 'Bottle of Nobleza del Sur Only for Children extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
      price: '250 ml · €19.90 at our shop',
      priceAmount: 19.90,
      priceCurrency: 'EUR',
      seo: {
        title: 'Olive Oil for Children — Review | bestoliveoils.eu',
        description: 'An organic extra virgin oil blended for young palates: mostly Arbequina with a little Picual for polyphenols, and almost no bitterness. We scored it 4.3/5.',
      },
      detail: {
        location: 'Castellar, Jaén, Spain',
        tags: ['Delicate', 'Organic', 'For children', 'Harvest 2025'],
        panelNote: 'Provisional panel score · full blind tasting in the 2025/26 round',
        description: 'An extra virgin oil blended on purpose for children: mostly Arbequina, naturally soft and faintly sweet, with a measured share of Picual added for polyphenols and oleic acid. The design problem is real — bitterness and pungency are exactly the attributes a child rejects, and they are also where most of the health value sits — and this is a sensible answer to it rather than a gimmick.',
        profile: [
          { label: 'Fruity',  desc: 'ripe — apple, sweet almond', pct: '60%' },
          { label: 'Bitter',  desc: 'almost absent',              pct: '15%' },
          { label: 'Pungent', desc: 'warmth rather than pepper',  pct: '25%' },
        ],
        tastingNote: 'Gentle and rounded: ripe apple and sweet almond, a light green note where the Picual shows through, and no bitterness worth recording. The pungency registers as a mild warmth at the back of the throat rather than pepper. An adult palate will read it as simple; the achievement is that a four-year-old eats it on pasta without noticing it is there, which is harder to make than a robust oil.',
        facts: [
          ['Cultivar',      'Arbequina with a small share of Picual'],
          ['Harvest',       'October 2025, early'],
          ['Free acidity',  'Extra virgin grade (≤ 0.8%)'],
          ['Extraction',    'Cold, within 4 hours of picking'],
          ['Certification', 'EU Organic'],
          ['Bottle',        '250 ml'],
        ],
        awards: [],
        origin: {
          mapPlaceholder: 'Region map · Jaén',
          note: 'Made on the family estate at Castellar, Jaén, from the same organically farmed groves as the rest of the range.',
          linkLabel: 'All Andalusian oils in the library →',
          linkHref: '/oils/?region=andalusia',
        },
        pairings: ['Pasta', 'Purées', 'Steamed vegetables', 'Bread', 'Scrambled eggs'],
        expertReview: {
          initial: 'P',
          name: 'Tasting panel · bestoliveoils.eu',
          meta: 'Panel note · September 2026',
          badge: 'Panel pick',
          stars: 4,
          text: 'We came to this expecting packaging and found a properly made oil. It is genuinely extra virgin, correctly milled, and blended to remove the single attribute children refuse while keeping enough Picual to matter nutritionally. The 250 ml bottle is the right call: a household that uses oil this mild will not get through 500 ml before it tires. Two honest caveats — the producer does not publish a polyphenol figure for it, so treat the health argument as modest, and an adult should not expect to enjoy it neat. As a first olive oil for a child, or a present for new parents, it is hard to fault.',
        },
        reviews: [],
      },
    },
  {
    slug: 'sabino-leone-don-gioacchino',
    name: 'Don Gioacchino DOP',
    producer: 'Sabino Leone',
    producerSlug: 'sabino-leone',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(1, 465),
    seo: {
      title: 'Don Gioacchino DOP — Coratina from Puglia | bestoliveoils.eu',
      description: 'The oil that topped the World’s Best Olive Oils 2025/26 ranking. Coratina from 220-year-old trees at Canosa di Puglia, DOP Terra di Bari. The facts.',
    },
    detail: {
      location: 'Canosa di Puglia, Barletta-Andria-Trani, Italy',
      tags: ['Coratina', 'DOP Terra di Bari', 'Harvest 2025/26'],
      description: 'A DOP Coratina from trees the estate states are over 220 years old, on the Murge foothills at Canosa di Puglia. It finished first in the World’s Best Olive Oils 2025/26 aggregate ranking with 465 points — the widest margin on that table.',
      facts: [
        ['Cultivar', '100% Coratina, from trees stated to be 220+ years old'],
        ['Designation', 'DOP Terra di Bari, sottozona Castel del Monte'],
        ['Harvest', '2025/26 crop; month not published'],
        ['Polyphenols', '833 mg/kg (importer Olive Oil Lovers; producer publishes no figure)'],
        ['Free acidity', '0.21% (same source)'],
        ['Extraction', 'Cold extraction at controlled temperature; temperature not published'],
        ['Formats', '250 ml and 500 ml, dark glass'],
      ],
      awards: ['1st · WBOO 2025/26', 'Best in Class · Flos Olei 2023', 'Gold · NYIOOC 2024', 'Gold · NYIOOC 2025'],
      origin: {
        mapPlaceholder: 'Region map · Canosa di Puglia',
        note: 'Canosa sits at the foot of the Murge plateau in northern Puglia, Coratina country. The cultivar is one of the most polyphenol-rich in cultivation, which is why Puglian Coratina turns up so often at the top of chemistry-weighted rankings.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'miceli-sensat-unico',
    name: 'Unico',
    producer: 'Miceli & Sensat',
    producerSlug: 'miceli-sensat',
    cultivar: 'Picual',
    region: 'Sicily · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(2, 365),
    seo: {
      title: 'Miceli & Sensat Unico — Sicilian Picual | bestoliveoils.eu',
      description: 'Spanish Picual grafted onto wild Sicilian rootstock, farmed organically near Lago Garcia. Second in the World’s Best Olive Oils 2025/26. Facts and figures.',
    },
    detail: {
      location: 'Monreale, Palermo, Sicily, Italy',
      tags: ['Picual', 'Organic', 'Harvest 2025'],
      description: 'An unusual oil: Spanish Picual grafted onto wild Sicilian olive rootstock, grown organically between 200 and 450 m in the Palermo hinterland. It placed second overall and first among organic oils in the World’s Best Olive Oils 2025/26 ranking.',
      facts: [
        ['Cultivar', '100% Picual, grafted on wild Sicilian rootstock'],
        ['Farming', 'Certified organic; groves at 200–450 m near Lago Garcia'],
        ['Harvest', '2025, hand-picked early in the season'],
        ['Polyphenols', 'Producer specification ≥ 500 mg/kg; no measured figure published'],
        ['Free acidity', '≤ 0.25% (producer specification)'],
        ['Extraction', 'Milled within hours at the estate mill, temperature monitored'],
        ['Formats', '250 ml and 500 ml, dark green glass'],
      ],
      awards: ['2nd overall · WBOO 2025/26', "World's best organic EVOO · WBOO 2025/26", 'Olio dell’anno · Il Magnifico 2026', 'Gold · NYIOOC 2025'],
      origin: {
        mapPlaceholder: 'Region map · Palermo',
        note: 'Sicily grows almost none of its oil from Spanish cultivars. Grafting Picual onto local wild rootstock is a deliberate experiment — Spanish variety, Sicilian ground — and this is the clearest evidence so far that it works.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'monini-monocultivar-coratina',
    name: 'Monini Monocultivar Coratina',
    producer: 'Monini',
    producerSlug: 'monini',
    cultivar: 'Coratina',
    region: 'Umbria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(4, 285),
    seo: {
      title: 'Monini Monocultivar Coratina — Organic | bestoliveoils.eu',
      description: 'The only large-scale bottler in the WBOO 2025/26 top ten: an organic Coratina from Puglia, milled by variety. Fourth with 285 points. What is published.',
    },
    detail: {
      location: 'Spoleto, Perugia, Umbria, Italy',
      tags: ['Coratina', 'Organic', '100% Italian'],
      description: 'The one oil in the top ten that comes from a large bottler rather than a single estate. Organic Coratina from Puglia, milled separately by variety rather than blended, and made from the pulp only. Fourth in the World’s Best Olive Oils 2025/26 with 285 points.',
      facts: [
        ['Cultivar', '100% Coratina, from Puglia'],
        ['Certification', 'EU organic and USDA Certified Organic'],
        ['Harvest', 'Picked slightly ahead of full ripeness; year not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold-pressed, each cultivar milled separately'],
        ['Formats', '500 ml glass'],
      ],
      awards: ['4th · WBOO 2025/26', 'Gold · NYIOOC', 'Best monovarietal · EVOOLEUM', 'Gold · Olive Japan 2025'],
      origin: {
        mapPlaceholder: 'Region map · Umbria and Puglia',
        note: 'Monini is an Umbrian house that has bottled since 1920, but this oil’s olives come from its Coratina country plant at Carpino in Puglia. It is a reminder that scale and quality are not automatically opposed.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'rincon-de-la-subbetica-hojiblanca',
    name: 'Rincón de la Subbética Hojiblanca',
    producer: 'Almazaras de la Subbética',
    producerSlug: 'almazaras-de-la-subbetica',
    cultivar: 'Hojiblanca',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(5, 280),
    seo: {
      title: 'Rincón de la Subbética Hojiblanca | bestoliveoils.eu',
      description: 'Organic DOP Priego de Córdoba Hojiblanca from the Sierras Subbéticas, joint-fifth in the World’s Best Olive Oils 2025/26. The published facts.',
    },
    detail: {
      location: 'Carcabuey, Córdoba, Andalusia, Spain',
      tags: ['Hojiblanca', 'DOP Priego de Córdoba', 'Organic'],
      description: 'The organic Hojiblanca of a 4,000-family cooperative inside the Sierras Subbéticas natural park, bottled under DOP Priego de Córdoba. Joint-fifth in the World’s Best Olive Oils 2025/26 with 280 points.',
      facts: [
        ['Cultivar', '100% Hojiblanca'],
        ['Designation', 'DOP Priego de Córdoba; certified organic'],
        ['Harvest', '2025/26 campaign, hand-picked in late autumn'],
        ['Polyphenols', 'Retailer figures conflict: 425 and 598 mg/kg. Producer publishes none'],
        ['Free acidity', '0.16% (retailer data sheets)'],
        ['Extraction', 'Cold-extracted, filtered before bottling'],
        ['Formats', '500 ml glass; 100 ml in the tasting pack'],
      ],
      awards: ['5th · WBOO 2025/26', 'Gold · BIOL 2026', 'Best in Class · Los Angeles IEVOOC 2026', 'Gold · Sol d’Oro 2026'],
      origin: {
        mapPlaceholder: 'Region map · Sierras Subbéticas',
        note: 'The Subbética ranges south of Córdoba are mountain olive country: high rainfall for Andalusia, wide day-to-night temperature swings, and a DOP built around the Picuda and Hojiblanca that grow there.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'o-med-picual',
    name: 'O-Med Picual',
    producer: 'O-Med',
    producerSlug: 'o-med',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(5, 280),
    seo: {
      title: 'O-Med Picual — Early-Harvest from Granada | bestoliveoils.eu',
      description: 'Late-October Picual from a solar-powered mill built inside its own grove near Granada. Joint-fifth in the World’s Best Olive Oils 2025/26. The facts.',
    },
    detail: {
      location: 'Ácula, Granada, Andalusia, Spain',
      tags: ['Picual', 'Early harvest', 'Milled in the grove'],
      description: 'Picual picked green in the last week of October and milled within about three hours, at a mill built inside the grove itself and run on solar power. Joint-fifth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Harvest', 'Last week of October, green fruit'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', '0.1%'],
        ['Extraction', 'Cold; milled roughly 3 hours after picking, mill inside the grove'],
        ['Estate', '200 ha at Ácula; drip irrigation, biomass from olive stones'],
        ['Formats', '500 ml UV-blocking recycled glass; 250 ml and 1 L tins'],
      ],
      awards: ['5th · WBOO 2025/26', 'Grand Prize · Mario Solinas 2017', 'Best Spanish EVOO · Alimentos de España 2022/23', 'No. 1 worldwide · Der Feinschmecker 2021'],
      origin: {
        mapPlaceholder: 'Region map · Granada',
        note: 'Granada is not Jaén: fewer trees, higher ground, later harvests as a rule. O-Med works against that by picking in a three-to-four-day window at the end of October and milling immediately.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oleicola-jaen-don-remigio',
    name: 'Don Remigio',
    producer: 'Oleícola Jaén',
    producerSlug: 'oleicola-jaen',
    cultivar: 'Royal / Hojiblanca',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(8, 265),
    seo: {
      title: 'Don Remigio — Oleícola Jaén’s Premium Line | bestoliveoils.eu',
      description: 'Eighth in the World’s Best Olive Oils 2025/26. A line launched in 2026 with two monovarietals, Royal and Hojiblanca. What is published, and what is not.',
    },
    detail: {
      location: 'Baeza, Jaén, Andalusia, Spain',
      tags: ['Royal', 'Hojiblanca', 'Launched 2026'],
      description: 'Eighth in the World’s Best Olive Oils 2025/26. Don Remigio is not one oil but a premium line launched in January 2026, named after a co-founder of the company, with two monovarietal bottlings — Royal and Hojiblanca. The ranking does not say which of the two placed.',
      facts: [
        ['Line', 'Two monovarietals: Don Remigio Royal and Don Remigio Hojiblanca'],
        ['Which one placed', 'WBOO lists only "Don Remigio"; the variety is not specified'],
        ['Harvest', 'Early harvest, October–November; release year not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published by the producer; an exporter states max 0.2%'],
        ['Extraction', 'Cold mechanical extraction; an exporter states 18–20 °C'],
        ['Formats', '500 ml glass in a gift tube'],
      ],
      awards: ['8th · WBOO 2025/26', '5th best mill in the world · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Baeza, Jaén',
        note: 'Royal is a Jaén native, grown almost nowhere else and notoriously hard to farm: low yields, fragile fruit, a short picking window. Bottling it as a monovarietal is a statement of intent rather than a commercial decision.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'parqueoliva-serie-oro',
    name: 'Parqueoliva Serie Oro',
    producer: 'Almazaras de la Subbética',
    producerSlug: 'almazaras-de-la-subbetica',
    cultivar: 'Picuda · Hojiblanca',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(9, 260),
    seo: {
      title: 'Parqueoliva Serie Oro — Picuda Blend | bestoliveoils.eu',
      description: 'A Picuda-and-Hojiblanca blend under DOP Priego de Córdoba, ninth in the World’s Best Olive Oils 2025/26 with 260 points. The published figures.',
    },
    detail: {
      location: 'Carcabuey, Córdoba, Andalusia, Spain',
      tags: ['Picuda', 'Hojiblanca', 'DOP Priego de Córdoba'],
      description: 'The cooperative’s long-running Picuda-led blend, and its most decorated label after the Rincón. Ninth in the World’s Best Olive Oils 2025/26 with 260 points.',
      facts: [
        ['Cultivar', 'Picuda and Hojiblanca; one retailer states 80/20, unconfirmed'],
        ['Designation', 'DOP Priego de Córdoba'],
        ['Harvest', '2025/26 campaign, hand-picked'],
        ['Polyphenols', '293 mg/kg (retailer data sheet; producer publishes none)'],
        ['Free acidity', '0.14–0.18% depending on the lot'],
        ['Extraction', 'Cold-extracted, filtered'],
        ['Formats', '100 ml and 500 ml glass; 3 L tin'],
      ],
      awards: ['9th · WBOO 2025/26', 'Silver · Los Angeles IEVOOC 2026', 'Gold · Alimentos de España 2026', 'Gold · CINVE 2026'],
      origin: {
        mapPlaceholder: 'Region map · Sierras Subbéticas',
        note: 'Picuda is the signature cultivar of the Priego de Córdoba DOP: sweeter and more aromatic than Picual, with a softer bitterness, which is why it is usually blended rather than bottled alone.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'knolive-epicure',
    name: 'Knolive Epicure',
    producer: 'Knolive',
    producerSlug: 'knolive',
    cultivar: 'Hojiblanca · Picuda',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(9, 260),
    seo: {
      title: 'Knolive Epicure — Mountain Coupage, Córdoba | bestoliveoils.eu',
      description: 'A Hojiblanca-and-Picuda coupage from hand-picked mountain groves at 600–800 m near Priego de Córdoba. Ninth in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Priego de Córdoba, Córdoba, Andalusia, Spain',
      tags: ['Hojiblanca', 'Picuda', 'Mountain groves'],
      description: 'A coupage of Hojiblanca and Picuda from 98 hectares of steep ground at 600–800 m near La Tiñosa, the highest peak in Córdoba province, where the terrain rules out machine harvesting. Joint-ninth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Hojiblanca and Picuda coupage; percentages not published'],
        ['Harvest', 'First harvest; the 2025/26 crop is the current release'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold extraction, milled at night'],
        ['Estate', '98 ha, ~9,800 trees at 600–800 m, hand-harvested'],
        ['Formats', '250 ml and 500 ml glass'],
      ],
      awards: ['9th · WBOO 2025/26', 'Gold · Olive Japan 2026', "World's best coupage · Leone d’Oro 2025", 'Best EVOO · AOVE World Cup 2025'],
      origin: {
        mapPlaceholder: 'Region map · Priego de Córdoba',
        note: 'At 600–800 m the trees ripen late and slowly, which holds acidity down and aromatics up. It also means every olive is picked by hand — the reason mountain oils cost what they cost.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'xiangyu-coratina',
    name: 'Xiang Yu Coratina',
    producer: 'Longnan Xiangyu',
    producerSlug: 'xiangyu',
    cultivar: 'Coratina',
    region: 'Gansu · China',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(11, 195),
    seo: {
      title: 'Xiang Yu Coratina — Chinese EVOO from Gansu | bestoliveoils.eu',
      description: 'The only Chinese oil in the WBOO 2025/26 top forty: Italian Coratina grown in Longnan, Gansu. Almost nothing is published about it. What we could verify.',
    },
    detail: {
      location: 'Wudu District, Longnan, Gansu, China',
      tags: ['Coratina', 'China', 'Little published data'],
      description: 'The only Chinese oil in the top forty of the World’s Best Olive Oils 2025/26, at eleventh with 195 points. It is Italian Coratina grown in the Bailong river valley of southern Gansu — and beyond that, almost nothing about it is published in any language we could read.',
      facts: [
        ['Cultivar', 'Coratina; whether it is a 100% monovarietal is not published'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Not published'],
        ['Formats', 'Not published'],
        ['Note', 'The company website could not be reached; no product data sheet exists in English'],
      ],
      awards: ['11th · WBOO 2025/26', 'Gold, Quality category · 2022'],
      origin: {
        mapPlaceholder: 'Region map · Longnan, Gansu',
        note: 'Longnan is China’s olive belt — a warm, sheltered river valley in an otherwise continental province, planted with Italian and Spanish cultivars from the 1970s onward. It is now the largest olive-growing area in the country.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'virrey-del-pino',
    name: 'Virrey del Pino',
    producer: 'Olivarera Ntra. Sra. de Guadalupe',
    producerSlug: 'olivarera-guadalupe',
    cultivar: 'DOP Baena varieties',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(12, 190),
    seo: {
      title: 'Virrey del Pino — DOP Baena EVOO | bestoliveoils.eu',
      description: 'Twelfth in the World’s Best Olive Oils 2025/26. The DOP Baena oil of a Córdoba cooperative, and 2026 Expoliva winner for intense green fruity.',
    },
    detail: {
      location: 'Baena, Córdoba, Andalusia, Spain',
      tags: ['DOP Baena', 'Intense green fruity', 'Cooperative'],
      description: 'The flagship DOP Baena oil of the Guadalupe cooperative, twelfth in the World’s Best Olive Oils 2025/26. In 2026 it took the Expoliva quality prize in the intense green fruity category.',
      facts: [
        ['Cultivar', 'Not published; the producer states only "the best varieties of the DOP Baena zone"'],
        ['Designation', 'DOP Baena'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Mill', 'Four crushing lines, 24 hoppers; olives processed within 24 hours of delivery'],
        ['Formats', '250 ml and 500 ml glass; 500 ml and 3 L tins; 3 L bag-in-box'],
      ],
      awards: ['12th · WBOO 2025/26', 'Expoliva 2026 · intense green fruity', 'Gold · Premios Mezquita 2019 and 2021', 'First prize · Mario Solinas'],
      origin: {
        mapPlaceholder: 'Region map · Baena, Córdoba',
        note: 'DOP Baena covers eight towns in south-eastern Córdoba and is built on Picuda with Lechín, Hojiblanca and Picual alongside. It is one of Spain’s oldest oil denominations, recognised in 1981.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'quattrociocchi-olivastro',
    name: 'Olivastro',
    producer: 'Quattrociocchi',
    producerSlug: 'quattrociocchi',
    cultivar: 'Itrana',
    region: 'Lazio · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/olio-quattrociocchi-olivastro',
    price: '500 ml · €26.95 at our shop',
    priceAmount: 26.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/quattrociocchi-olivastro.webp', alt: 'Bottle of Olivastro extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    listing: listing(13, 185),
    seo: {
      title: 'Quattrociocchi Olivastro — Organic Itrana | bestoliveoils.eu',
      description: 'Organic Itrana from Alatri in Lazio, picked in early October and left unfiltered. 672 mg/kg polyphenols, 13th in WBOO 2025/26. Where to buy it.',
    },
    detail: {
      location: 'Alatri, Frosinone, Lazio, Italy',
      tags: ['Itrana', 'Organic', 'Unfiltered'],
      description: 'Olivastro is the old local name for the Itrana olive, and this is the monovarietal that made Quattrociocchi’s reputation: organic, picked at the start of October, milled the same day and left unfiltered. Thirteenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Itrana'],
        ['Farming', 'Certified organic; 110 ha and roughly 25,000 trees around Alatri'],
        ['Harvest', 'Autumn 2025; the estate starts picking at the beginning of October'],
        ['Polyphenols', '672 mg/kg (importer figure; the producer’s site is offline)'],
        ['Free acidity', '0.17% (same source)'],
        ['Extraction', 'Hand-picked and cold-extracted the same day; left unfiltered'],
        ['Formats', '500 ml; also 3 L and 5 L'],
      ],
      awards: ['13th · WBOO 2025/26', 'Gold · BIOL 2026', 'Hall of Fame · Flos Olei 2026', 'Best in Class · EVOOLEUM 2026'],
      origin: {
        mapPlaceholder: 'Region map · Ciociaria, Lazio',
        note: 'Itrana is a Lazio native that can be picked green for a fierce, high-polyphenol oil or left to turn black for table olives. Quattrociocchi brought its harvest forward by weeks two decades ago and has stayed there.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'trappeto-di-caprafico-crognale',
    name: 'Crognale',
    producer: 'Trappéto di Caprafico',
    producerSlug: 'trappeto-di-caprafico',
    cultivar: 'Crognalegno',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(13, 185),
    seo: {
      title: 'Crognale — Rare Crognalegno from Abruzzo | bestoliveoils.eu',
      description: 'A monovarietal of Crognalegno, a cultivar grown almost nowhere else, milled on granite below the Maiella. Joint-13th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Caprafico di Casoli, Chieti, Abruzzo, Italy',
      tags: ['Crognalegno', 'Rare cultivar', 'Unfiltered'],
      description: 'A monovarietal of Crognalegno, a local Abruzzese cultivar grown almost nowhere else, from a family mill working since 1948 on the stony Caprafico plateau below the Maiella. Joint-thirteenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Crognalegno'],
        ['Harvest', 'Producer lists the 2023/24 campaign; picked early'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Picked early and milled within hours on granite millstones, cold'],
        ['Storage', 'Unfiltered, under nitrogen at 15–18 °C; bottled to order'],
        ['Formats', '500 ml'],
      ],
      awards: ['13th · WBOO 2025/26', 'Tre Foglie, best intense fruity · Gambero Rosso 2024', 'Cinque Gocce · Bibenda 2024'],
      origin: {
        mapPlaceholder: 'Region map · Casoli, Abruzzo',
        note: 'The estate is a designated custodian of the Intosso di Casoli, a Slow Food presidium variety, and works calcareous, skeletal ground below the Maiella massif. Crognalegno is the other local rarity it keeps alive.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oro-de-canava',
    name: 'Oro de Cánava Cosecha Temprana',
    producer: 'Oro de Cánava',
    producerSlug: 'oro-de-canava',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(13, 185),
    seo: {
      title: 'Oro de Cánava — Early-Harvest Sierra Mágina | bestoliveoils.eu',
      description: 'Early-harvest DOP Sierra Mágina Picual from a Jaén cooperative founded in 1976, joint-13th in WBOO 2025/26 and Mario Solinas first prize in 2023.',
    },
    detail: {
      location: 'Jimena, Jaén, Andalusia, Spain',
      tags: ['Picual', 'DOP Sierra Mágina', 'Early harvest'],
      description: 'The early-harvest Picual of a Jaén cooperative that was among the first in Sierra Mágina to pick green. Joint-thirteenth in the World’s Best Olive Oils 2025/26, and first prize in the intense green fruity class at Mario Solinas 2023.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Designation', 'DOP Sierra Mágina'],
        ['Harvest', 'From October, green fruit, taken straight to the mill'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Producer’s class', 'Intense fruity'],
        ['Formats', '250 ml and 500 ml (Cosecha Temprana)'],
      ],
      awards: ['13th · WBOO 2025/26', 'First prize · Mario Solinas 2023', 'Jaén Selección 2020, 2021, 2023, 2025', 'Best Picual in the world · AOVE World Cup 2026'],
      origin: {
        mapPlaceholder: 'Region map · Sierra Mágina',
        note: 'Sierra Mágina is the high, cold corner of Jaén — groves climbing the flanks of a limestone massif, harvests that start earlier than the plain, and a DOP that is Picual almost to the exclusion of everything else.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oleicola-jaen-picual-especial',
    name: 'Oleícola Jaén Picual Especial',
    producer: 'Oleícola Jaén',
    producerSlug: 'oleicola-jaen',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(13, 185),
    seo: {
      title: 'Oleícola Jaén Picual Especial — Baeza | bestoliveoils.eu',
      description: 'Early-harvest Picual from a Baeza mill that has run since the early 1980s, joint-13th in the World’s Best Olive Oils 2025/26. The published facts.',
    },
    detail: {
      location: 'Baeza, Jaén, Andalusia, Spain',
      tags: ['Picual', 'Early harvest', 'Baeza'],
      description: 'The premium Picual of a Baeza mill that buys fruit from growers across the Jaén countryside and picks its premium lots green in October. Joint-thirteenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Name', 'The producer’s own shop lists it as "AOVE Picual Selección"; exporters use "Especial"'],
        ['Harvest', 'Green olives, October–November; 2025/26 is the current release'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold pressed within hours of harvest, mechanical only'],
        ['Formats', '500 ml glass; Picual also in 3 L bag-in-box and 5 L'],
      ],
      awards: ['13th · WBOO 2025/26', '5th best mill in the world · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Baeza, Jaén',
        note: 'Baeza sits on La Loma, the ridge between the Guadalquivir and the Guadalimar. Jaén makes more olive oil than any country except Spain itself, and almost all of it is Picual.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'paola-orsini-dop-colline-pontine',
    name: 'Olio DOP Colline Pontine',
    producer: 'Paola Orsini',
    producerSlug: 'paola-orsini',
    cultivar: 'Itrana',
    region: 'Lazio · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Paola Orsini DOP Colline Pontine — Itrana | bestoliveoils.eu',
      description: 'Organic Itrana under DOP Colline Pontine, a Slow Food presidium oil from the Monti Lepini. Joint-17th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Priverno, Latina, Lazio, Italy',
      tags: ['Itrana', 'DOP Colline Pontine', 'Organic'],
      description: 'Organic Itrana from ten thousand trees in the Monti Lepini, milled in the family’s own mill immediately after picking. A Slow Food presidium oil, joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Itrana'],
        ['Designation', 'DOP Colline Pontine; Slow Food Presidium; organic'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold extraction in the family mill, immediately after harvest'],
        ['Formats', '250 ml, 500 ml and 750 ml'],
      ],
      awards: ['17th · WBOO 2025/26', 'Ercole Olivario 2011, 2012, 2016'],
      origin: {
        mapPlaceholder: 'Region map · Colline Pontine',
        note: 'The Colline Pontine DOP runs along the Lepini and Ausoni hills above the reclaimed Pontine marshes, facing the Tyrrhenian. Itrana must make up at least half of any oil carrying the name.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'mimi-premium-blend',
    name: 'Mimì Premium Blend',
    producer: 'Mimì',
    producerSlug: 'mimi',
    cultivar: 'Blend, varies by year',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Mimì Premium Blend — Puglian EVOO | bestoliveoils.eu',
      description: 'A blend recomposed every harvest at a Modugno mill that chills its paste to 19–20 °C. Joint-17th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Modugno, Bari, Puglia, Italy',
      tags: ['Blend', 'Harvest 2025/26', 'Nitrogen storage'],
      description: 'A blend the mill recomposes each harvest from whichever of its cultivars suit that year — the producer publishes no fixed recipe. Joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Two or more cultivars, changed each year; recipe not published'],
        ['Harvest', '2025/26 crop'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Paste chilled to a maximum of 19–20 °C, two-phase decanter'],
        ['Storage', 'Filtered immediately after extraction, stored under nitrogen'],
        ['Formats', '500 ml'],
      ],
      awards: ['17th · WBOO 2025/26', 'Special mention · Sol d’Oro Verona 2023'],
      origin: {
        mapPlaceholder: 'Region map · Modugno, Bari',
        note: 'The groves sit on the red soils just inland of Bari, roughly 24,000 trees across 80 hectares. Olives are washed and dried before crushing so that wash water never enters the process.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'terracuza-biologico',
    name: 'Terracuza Biologico',
    producer: 'Terracuza',
    producerSlug: 'terracuza',
    cultivar: 'Bosana · Cariasina',
    region: 'Sardinia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Terracuza Biologico — Sardinian Organic | bestoliveoils.eu',
      description: 'Organic Bosana from recovered terraces in the Marghine, all worked by hand. About 4,000 litres a year. Joint-17th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Bolotana, Nuoro, Sardinia, Italy',
      tags: ['Bosana', 'Organic', 'Hand-worked terraces'],
      description: 'Organic oil from twenty-five abandoned terraced plots recovered on steep granite hillsides in the Marghine range, where the ground rules out machinery entirely. Annual output is around 4,000 litres. Joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Bosana with Cariasina; percentages not published'],
        ['Farming', 'Certified organic (Suolo e Salute); ~2,500 trees averaging 150 years'],
        ['Groves', 'Terraces at roughly 300–700 m, south-west facing, dry-stone walled'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Milled within 12 hours at a partner mill, two-phase, cold'],
      ],
      awards: ['17th · WBOO 2025/26', 'Gold · Olive Japan 2026', '1st place · Olive Japan 2025', 'Special mention · Ercole Olivario 2026'],
      origin: {
        mapPlaceholder: 'Region map · Marghine, Sardinia',
        note: 'Bosana is Sardinia’s dominant cultivar, and on the island’s granite uplands it makes an oil with an assertive bitterness. The plots here were abandoned for decades before being brought back by hand.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'schinosa-la-coratina',
    name: 'Schinosa La Coratina',
    producer: 'Schinosa',
    producerSlug: 'schinosa',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Schinosa La Coratina — Trani, Puglia | bestoliveoils.eu',
      description: 'A 100% Coratina from a Trani estate dating to 1647, milled on site since 2015. Joint-17th in the World’s Best Olive Oils 2025/26. The facts.',
    },
    detail: {
      location: 'Trani, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Coratina', 'Estate mill', 'Trani'],
      description: 'The monovarietal Coratina of Masseria Schinosa, an estate dating to 1647 whose own mill opened in 2015. Joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Coratina'],
        ['Free acidity', 'Producer states "well below 0.2%"'],
        ['Polyphenols', 'Not published'],
        ['Harvest', 'Early mechanical harvest; release year not published'],
        ['Extraction', 'Two-phase cold extraction with automated temperature control'],
        ['Estate', '~180 ha and roughly 28,000 trees on limestone around Trani'],
        ['Formats', '100 ml, 250 ml and 500 ml'],
      ],
      awards: ['17th · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Trani, Puglia',
        note: 'Each variety on the estate is picked at its own moment — table olives first, then Peranzana, and Coratina last. Published accounts of the time between grove and mill vary between one and twelve hours.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'goya-organics',
    name: 'Goya Organics',
    producer: 'Goya en España',
    producerSlug: 'goya-espana',
    cultivar: 'Hojiblanca · Picuda',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Goya Organics — Organic Spanish EVOO | bestoliveoils.eu',
      description: 'An organic Hojiblanca-and-Picuda blend selected from about 2,000 supplier samples a season. Joint-17th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Alcalá de Guadaíra, Seville, Andalusia, Spain',
      tags: ['Hojiblanca', 'Picuda', 'Organic'],
      description: 'The organic blend of a Spanish subsidiary of the American Goya group, which selects its blends from roughly two thousand supplier samples a season. Joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Hojiblanca and Picuda; percentages not published'],
        ['Certification', 'Organic; certifying body not published'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Model', 'Blender and packer, not a grower — no estate of its own'],
        ['Formats', '500 ml glass'],
      ],
      awards: ['17th · WBOO 2025/26', 'Gold · NYIOOC 2024', 'Top 100 · EVOOLEUM 2024 (92 points)', 'Bronze · AVPA Paris 2021'],
      origin: {
        mapPlaceholder: 'Region map · Seville',
        note: 'Goya farms nothing. Its oils are built by a tasting panel from supplier samples, which is how the industrial side of Spanish oil works — and this ranking is a reminder that it can be done well.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oleicola-jaen-eco',
    name: 'Oleícola Jaén Ecológico Picual',
    producer: 'Oleícola Jaén',
    producerSlug: 'oleicola-jaen',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Oleícola Jaén Ecológico Picual — Organic | bestoliveoils.eu',
      description: 'Organic Picual from Baeza, certified since 2013 and joint-17th in the World’s Best Olive Oils 2025/26. Fifth among organic oils. The published facts.',
    },
    detail: {
      location: 'Baeza, Jaén, Andalusia, Spain',
      tags: ['Picual', 'Organic since 2013', 'Early harvest'],
      description: 'The organic Picual of the Baeza mill, certified since 2013. Joint-seventeenth in the World’s Best Olive Oils 2025/26 overall and fifth in the same body’s organic ranking.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Certification', 'Organic since 2013; certifying body not published'],
        ['Harvest', 'Green olives, October–November, straight to the mill'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold pressed within hours of harvest, mechanical only'],
        ['Formats', '250 ml and 500 ml glass'],
      ],
      awards: ['17th · WBOO 2025/26', '5th organic EVOO · WBOO 2025/26', 'Medium fruity · Terra Oleum 2020'],
      origin: {
        mapPlaceholder: 'Region map · Baeza, Jaén',
        note: 'Organic olive growing in Jaén is still a minority practice — the province’s density of trees makes pest pressure and drift hard to manage — which is part of why certified Jaén Picual is worth noticing.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oro-del-desierto-picual',
    name: 'Oro del Desierto Picual',
    producer: 'Oro del Desierto',
    producerSlug: 'oro-del-desierto',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Oro del Desierto Picual — Tabernas Desert | bestoliveoils.eu',
      description: 'Organic Picual grown in the Tabernas desert, 844 mg/kg polyphenols in the 2025/26 harvest by the estate’s own lab. Joint-17th in WBOO 2025/26.',
    },
    detail: {
      location: 'Tabernas, Almería, Andalusia, Spain',
      tags: ['Picual', 'Organic', '844 mg/kg'],
      description: 'Organic Picual grown in the Tabernas desert, the only desert in continental Europe: over 3,000 hours of sun a year and under 180 mm of rain. The estate publishes its polyphenol series by variety and year, which almost nobody does.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Polyphenols', '844 mg/kg, 2025/26 harvest (Folin-Ciocalteu, estate lab report)'],
        ['Polyphenol trend', '529 mg/kg in 2023/24, 717 in 2024/25, 844 in 2025/26'],
        ['Harvest', 'Mid-October to early November, fruit 65–75% still green'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Two-phase cold extraction; oleic acid 77–80%'],
        ['Formats', '100 ml, 250 ml, 500 ml glass; 1 L and 3 L tins'],
      ],
      awards: ['17th · WBOO 2025/26', '99/100 · Flos Olei 2026', 'Best extraction method · Flos Olei 2026'],
      origin: {
        mapPlaceholder: 'Region map · Tabernas, Almería',
        note: 'Desert farming sounds like a stunt until you see the chemistry: extreme sun and drought stress push polyphenol production up, and the estate’s own published series shows exactly that, year after year.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'olibaeza-premium-picual',
    name: 'Olibaeza Premium Picual',
    producer: 'Olibaeza',
    producerSlug: 'olibaeza',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Olibaeza Premium Picual — Baeza Co-op | bestoliveoils.eu',
      description: 'Early-October Picual from a 1,263-member Baeza cooperative, farmed under Integrated Production. Joint-17th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Baeza, Jaén, Andalusia, Spain',
      tags: ['Picual', 'Integrated Production', 'Early October'],
      description: 'The premium bottling of a Baeza cooperative founded in 1951, whose 1,263 members work over half a million trees. Picked in early October while the fruit is still green. Joint-seventeenth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Picual'],
        ['Farming', 'Producción Integrada (Integrated Production); not organic'],
        ['Harvest', 'Early October, before the fruit turns purple'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published by the producer; a retailer states 0.1%'],
        ['Cooperative', '1,263 members, 554,000+ trees, ~10.5 million kg of oil a year'],
        ['Formats', '500 ml glass in two bottle designs; 1 L tin at retail'],
      ],
      awards: ['17th · WBOO 2025/26', 'EVOOLEUM 2019', 'Mario Solinas 2019', 'Sol d’Oro 2019'],
      origin: {
        mapPlaceholder: 'Region map · Baeza, Jaén',
        note: 'Baeza is a UNESCO Renaissance town sitting on an ocean of olive trees. Cooperatives handle most of that fruit, and the premium lines are how they prove that co-op scale need not mean anonymous oil.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'jabalcuz-gran-seleccion',
    name: 'Jabalcuz Gran Selección',
    producer: 'Jabalcuz',
    producerSlug: 'jabalcuz',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(17, 180),
    seo: {
      title: 'Jabalcuz Gran Selección — Mountain Picual | bestoliveoils.eu',
      description: 'Mountain Picual milled the same day it is picked, and first prize at Mario Solinas 2025 for medium green fruity. Joint-17th in WBOO 2025/26.',
    },
    detail: {
      location: 'Los Villares, Jaén, Andalusia, Spain',
      tags: ['Picual', 'Mountain groves', 'Same-day milling'],
      description: 'Mountain Picual from the Sierra Sur de Jaén, picked in October and, the cooperative states, milled the same day. It took first prize in the medium green fruity class at the IOC’s Mario Solinas award in 2025.',
      facts: [
        ['Cultivar', 'Picual; the cooperative does not state a percentage'],
        ['Harvest', 'October, early; 2025/26 campaign is the current release'],
        ['Polyphenols', 'Not published as a figure'],
        ['Free acidity', 'Not published'],
        ['Producer’s class', 'Frutado verde medio (medium green fruity)'],
        ['Cooperative', '~1,400 member families; 17 million kg of olives in 2025/26'],
        ['Formats', '500 ml glass in a gift case; 100 ml minis'],
      ],
      awards: ['17th · WBOO 2025/26', 'First prize · Mario Solinas 2025', '3rd in the world · AOVE World Cup 2026', 'Jaén Selección 2024, 2025, 2026'],
      origin: {
        mapPlaceholder: 'Region map · Sierra Sur de Jaén',
        note: 'The Sierra de Jabalcuz rises straight out of the city of Jaén. The groves on its flanks are family-sized and hard to work, and the cooperative sells the result explicitly as mountain oil.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'frantoi-cutrera-primo-dop',
    name: 'Primo DOP Monti Iblei',
    producer: 'Frantoi Cutrera',
    producerSlug: 'frantoi-cutrera',
    cultivar: 'Tonda Iblea',
    region: 'Sicily · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/frantoi-cutrera-primo-dop',
    price: '500 ml · €26.90 at our shop',
    priceAmount: 26.90,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/frantoi-cutrera-primo-dop.webp', alt: 'Bottle of Primo DOP Monti Iblei extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    listing: listing(26, 175),
    seo: {
      title: 'Primo DOP Monti Iblei — Tonda Iblea | bestoliveoils.eu',
      description: 'Tonda Iblea from the first harvest of the season, the first Sicilian oil to win DOP Monti Iblei. 26th in WBOO 2025/26. Where to buy it.',
    },
    detail: {
      location: 'Chiaramonte Gulfi, Ragusa, Sicily, Italy',
      tags: ['Tonda Iblea', 'DOP Monti Iblei', 'First harvest'],
      description: 'Tonda Iblea from the first harvest of the season, and the oil the producer states was the first Sicilian one to obtain the DOP Monti Iblei. Twenty-sixth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Monocultivar Tonda Iblea'],
        ['Designation', 'DOP Monti Iblei'],
        ['Harvest', 'First harvest of the season; month not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Two-phase continuous cycle, no added water, below 27 °C'],
        ['Formats', '500 ml and 750 ml'],
      ],
      awards: ['26th · WBOO 2025/26', 'Gold · NYIOOC 2025', 'Grande Olio · Slow Food 2025', '5 Gocce · Bibenda 2026'],
      origin: {
        mapPlaceholder: 'Region map · Monti Iblei, Sicily',
        note: 'Tonda Iblea is a large, round Sicilian olive that gives an oil of unmistakable tomato-and-green-herb character. The mill states it was the first in the world to sort individual olives with infrared optical graders.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'goya-unico',
    name: 'Goya Único',
    producer: 'Goya en España',
    producerSlug: 'goya-espana',
    cultivar: 'Hojiblanca · Picuda',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(26, 175),
    seo: {
      title: 'Goya Único — Premium Spanish Blend | bestoliveoils.eu',
      description: 'Hand-picked end-October Hojiblanca and Picuda, about 10 kg of olives per litre. 26th in the World’s Best Olive Oils 2025/26. The published facts.',
    },
    detail: {
      location: 'Alcalá de Guadaíra, Seville, Andalusia, Spain',
      tags: ['Hojiblanca', 'Picuda', 'Late October'],
      description: 'Goya’s premium blend: hand-picked Hojiblanca and Picuda from selected trees at the end of October, cold-pressed within hours, at a stated ten kilos of olives per litre against about five for a standard extra virgin. Twenty-sixth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Hojiblanca and Picuda; percentages not published'],
        ['Harvest', 'End of October, hand-picked from selected trees'],
        ['Yield', '≈10 kg of olives per litre (producer figure)'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold press within hours of harvest; kept under nitrogen'],
        ['Formats', '500 ml glass at retail'],
      ],
      awards: ['26th · WBOO 2025/26', 'Gold · NYIOOC 2024', 'Top 100 · EVOOLEUM 2024 (92 points)'],
      origin: {
        mapPlaceholder: 'Region map · Seville',
        note: 'Ten kilos of olives to the litre is roughly double the normal ratio, and it is the single most useful number on this page: it is what early picking of green fruit actually costs a producer.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'miceli-sensat-verde',
    name: 'Verde',
    producer: 'Miceli & Sensat',
    producerSlug: 'miceli-sensat',
    cultivar: 'Cerasuola · Biancolilla',
    region: 'Sicily · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(26, 175),
    seo: {
      title: 'Miceli & Sensat Verde — IGP Sicilia Organic | bestoliveoils.eu',
      description: 'The native-cultivar counterpart to Unico: organic IGP Sicilia from Cerasuola and Biancolilla. 26th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Monreale, Palermo, Sicily, Italy',
      tags: ['IGP Sicilia', 'Organic', 'Native cultivars'],
      description: 'The native-cultivar counterpart to Unico — organic IGP Sicilia from Cerasuola and Biancolilla, hand-picked early and milled within hours. Twenty-sixth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Cerasuola and Biancolilla (importer information); percentages not published'],
        ['Designation', 'IGP Sicilia; certified organic'],
        ['Harvest', '2025, hand-picked early'],
        ['Polyphenols', 'Producer specification ≥ 500 mg/kg'],
        ['Free acidity', '≤ 0.25% (producer specification)'],
        ['Producer’s class', 'Mildly intense'],
        ['Formats', '250 ml and 500 ml, dark green glass'],
      ],
      awards: ['26th · WBOO 2025/26', 'Gold · NYIOOC 2025', 'Gold · NYIOOC 2026', 'Tre Foglie · Gambero Rosso 2025'],
      origin: {
        mapPlaceholder: 'Region map · Palermo',
        note: 'Cerasuola and Biancolilla are the two workhorse cultivars of western Sicily, usually blended: the first brings bitterness and tomato, the second softness and almond.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'santuario-de-magina-seleccion-temprana',
    name: 'El Santuario de Mágina Selección Temprana',
    producer: 'El Santuario de Mágina',
    producerSlug: 'santuario-de-magina',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(26, 175),
    seo: {
      title: 'El Santuario de Mágina Selección Temprana | bestoliveoils.eu',
      description: 'Early-harvest Picual from a 1,595-member Huelma cooperative in the DOP Sierra Mágina. 26th in the World’s Best Olive Oils 2025/26. The facts.',
    },
    detail: {
      location: 'Huelma, Jaén, Andalusia, Spain',
      tags: ['Picual', 'DOP Sierra Mágina', 'Early harvest'],
      description: 'The early-harvest bottling of a Huelma cooperative founded in 1953 and now over 1,595 members strong, working inside the DOP Sierra Mágina. Twenty-sixth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Picual; percentage not stated'],
        ['Designation', 'DOP Sierra Mágina'],
        ['Harvest', 'Early harvest of green olives, from October'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Mill', 'Five continuous lines, 52 tanks holding 4 million kg of oil'],
        ['Formats', '2 L containers; a 500 ml glass pack is no longer listed'],
      ],
      awards: ['26th · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Sierra Mágina',
        note: 'Huelma sits on the southern slope of the Mágina massif, on the road between Córdoba and Almería. The cooperative has milled the town’s olives since 1953 and moved to its present plant in 2005.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'artajo-10-koroneiki',
    name: 'Artajo 10 Bio Koroneiki',
    producer: 'Artajo',
    producerSlug: 'artajo',
    cultivar: 'Koroneiki',
    region: 'Navarra · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(26, 175),
    seo: {
      title: 'Artajo 10 Bio Koroneiki — Navarra Organic | bestoliveoils.eu',
      description: 'Greek Koroneiki grown in the Ebro valley, milled within two hours at 18–20 °C. 26th in the World’s Best Olive Oils 2025/26. The published facts.',
    },
    detail: {
      location: 'Fontellas, Navarra, Spain',
      tags: ['Koroneiki', 'Organic', '10 kg per litre'],
      description: 'Greek Koroneiki grown in the Ebro valley between the Bardenas Reales and the Moncayo, on an estate that trialled over seventy cultivars before settling on fourteen. The "10" is the yield: ten kilos of olives to the litre. Twenty-sixth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Certification', 'EU organic'],
        ['Yield', '≈10 kg of olives per litre (the line’s name)'],
        ['Polyphenols', 'Not published by the producer; a retailer states 422 mg/kg'],
        ['Free acidity', 'Not published'],
        ['Extraction', '18–20 °C, refrigerated malaxer and centrifuges, in-line filtering'],
        ['Grove to mill', 'Under two hours; the mill sits on the plantation'],
      ],
      awards: ['26th · WBOO 2025/26', 'Best Koroneiki · EVOOLEUM 2024', 'Gold · BIOL 2024', 'Gold · Olive Japan 2024'],
      origin: {
        mapPlaceholder: 'Region map · Ebro valley, Navarra',
        note: 'Navarra is a long way north for olives. The Ebro valley gets away with it: over 3,300 hours of sun a year, and Mediterranean, continental and Atlantic weather meeting in the same place.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oro-del-desierto-coupage',
    name: 'Oro del Desierto Coupage',
    producer: 'Oro del Desierto',
    producerSlug: 'oro-del-desierto',
    cultivar: 'Arbequina · Hojiblanca · Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(31, 170),
    seo: {
      title: 'Oro del Desierto Coupage — 99/100 Flos Olei | bestoliveoils.eu',
      description: 'The estate’s most decorated oil: an organic three-variety blend from the Tabernas desert, 719 mg/kg in 2025/26 and 99/100 in Flos Olei 2026.',
    },
    detail: {
      location: 'Tabernas, Almería, Andalusia, Spain',
      tags: ['Coupage', 'Organic', '99/100 Flos Olei'],
      description: 'The estate’s most decorated oil since 2003: an organic blend of Arbequina, Hojiblanca and Picual whose proportions change with each harvest. Joint-thirty-first in the World’s Best Olive Oils 2025/26, and 99/100 in Flos Olei 2026.',
      facts: [
        ['Cultivar', 'Arbequina, Hojiblanca and Picual; proportions vary by harvest'],
        ['Polyphenols', '719 mg/kg, 2025/26 harvest (estate lab report)'],
        ['Polyphenol trend', '490 mg/kg in 2023/24, 493 in 2024/25, 719 in 2025/26'],
        ['Harvest', 'Mid-October to early November, fruit 75–80% still green'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Two-phase cold extraction; filtered. Oleic acid 70–75%'],
        ['Formats', '100 ml, 250 ml, 500 ml glass; 1 L and 3 L tins'],
      ],
      awards: ['31st · WBOO 2025/26', '99/100 · Flos Olei 2026', '99/100 · Flos Olei 2025', 'Top 20 "The Best" · Flos Olei 2026'],
      origin: {
        mapPlaceholder: 'Region map · Tabernas, Almería',
        note: 'The mill dates from 1925, built by the grandfather of the present owner, abandoned in the 1970s and restored. It now runs on photovoltaic power and composts its own pomace back into the groves.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'oro-del-desierto-hojiblanca',
    name: 'Oro del Desierto Hojiblanca',
    producer: 'Oro del Desierto',
    producerSlug: 'oro-del-desierto',
    cultivar: 'Hojiblanca',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(31, 170),
    seo: {
      title: 'Oro del Desierto Hojiblanca — Almería | bestoliveoils.eu',
      description: 'Organic Hojiblanca picked in the first fortnight of November in the Tabernas desert, 712 mg/kg in 2025/26. Joint-31st in WBOO 2025/26.',
    },
    detail: {
      location: 'Tabernas, Almería, Andalusia, Spain',
      tags: ['Hojiblanca', 'Organic', '712 mg/kg'],
      description: 'The latest-picked of the estate’s three ranked oils — the first fortnight of November, with the fruit 60–70% green. Joint-thirty-first in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', '100% Hojiblanca'],
        ['Polyphenols', '712 mg/kg, 2025/26 harvest (estate lab report)'],
        ['Polyphenol trend', '451 mg/kg in 2023/24, 661 in 2024/25, 712 in 2025/26'],
        ['Harvest', 'First fifteen days of November, fruit 60–70% still green'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Two-phase cold extraction'],
        ['Formats', '100 ml, 250 ml, 500 ml glass; 1 L and 3 L tins'],
      ],
      awards: ['31st · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Tabernas, Almería',
        note: 'Hojiblanca ripens later than Picual, so even an early-harvest Hojiblanca is a November oil. In Tabernas the drought stress does the rest of the work on polyphenols.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'balcon-del-guadalquivir',
    name: 'Balcón del Guadalquivir',
    producer: 'Balcón del Guadalquivir',
    producerSlug: 'balcon-del-guadalquivir',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(31, 170),
    seo: {
      title: 'Balcón del Guadalquivir — Early Picual | bestoliveoils.eu',
      description: 'Extra-early Picual from a Baeza cooperative milling 2,100 hectares the same day it picks. Joint-31st in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Baeza, Jaén, Andalusia, Spain',
      tags: ['Picual', 'Extra-early harvest', 'La Loma'],
      description: 'An "extratemprano" Picual from a Baeza cooperative whose members work around 2,100 hectares on La Loma, and whose plant is sized so the whole day’s harvest is milled the same day. Joint-thirty-first in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Picual (retailer and press information; the co-op does not state it)'],
        ['Harvest', 'Extra-early, green fruit picked before véraison'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Mill', 'The day’s harvest is milled the same day; own bottling line'],
        ['Cooperative', '~500 members, ~2,100 ha, 200,000–240,000 trees'],
        ['Formats', '250 ml and 500 ml glass; 2 L and 5 L PET; 1 L and 3 L tins'],
      ],
      awards: ['31st · WBOO 2025/26', 'Jaén Selección 2026', 'Jaén Selección 2020 and 2022', 'Mario Solinas 2021'],
      origin: {
        mapPlaceholder: 'Region map · La Loma, Jaén',
        note: 'The cooperative takes its name from its old site by Baeza’s watchtower, looking out over the Guadalquivir valley. It moved to a modern plant in 2004–05 but kept the name.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'almaoliva-bio',
    name: 'Almaoliva Bio',
    producer: 'Almazaras de la Subbética',
    producerSlug: 'almazaras-de-la-subbetica',
    cultivar: 'Hojiblanca · Picuda · Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(34, 165),
    seo: {
      title: 'Almaoliva Bio — Organic Subbética Coupage | bestoliveoils.eu',
      description: 'An organic three-variety coupage from the Sierras Subbéticas, 475 mg/kg polyphenols. Joint-34th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Carcabuey, Córdoba, Andalusia, Spain',
      tags: ['Coupage', 'Organic', 'Sierras Subbéticas'],
      description: 'The cooperative’s organic coupage of Hojiblanca, Picuda and Picual — sold outside the DOP, unlike its two stablemates on this ranking. Joint-thirty-fourth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Hojiblanca, Picuda and Picual; percentages not published'],
        ['Designation', 'None — organic coupage, not bottled under the DOP'],
        ['Harvest', 'Autumn 2025'],
        ['Polyphenols', '475 mg/kg (retailer data sheet)'],
        ['Free acidity', '0.18% (same source)'],
        ['Extraction', 'Not published'],
        ['Formats', '500 ml glass; 3 L tin'],
      ],
      awards: ['34th · WBOO 2025/26', 'Gold · Los Angeles IEVOOC 2026', 'Gold · CINVE 2026', 'Gold · Olive Japan 2024'],
      origin: {
        mapPlaceholder: 'Region map · Sierras Subbéticas',
        note: 'Almaoliva is where the cooperative blends across all three of its cultivars rather than bottling them separately — the everyday end of a range whose top labels sit in the world’s first ten.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'paola-orsini-riserva',
    name: 'Riserva Paola Orsini',
    producer: 'Paola Orsini',
    producerSlug: 'paola-orsini',
    cultivar: 'Itrana',
    region: 'Lazio · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(34, 165),
    seo: {
      title: 'Riserva Paola Orsini — Numbered Itrana | bestoliveoils.eu',
      description: 'A numbered limited release of organic Itrana, special mention for organic oil at Ercole Olivario 2025. Joint-34th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Priverno, Latina, Lazio, Italy',
      tags: ['Itrana', 'Organic', 'Numbered release'],
      description: 'A limited, individually numbered release of organic Itrana from the same Monti Lepini groves as the DOP bottling. It took a special mention for organic oil at Ercole Olivario 2025.',
      facts: [
        ['Cultivar', '100% Itrana'],
        ['Release', 'Limited, individually numbered'],
        ['Harvest', 'Not published; the 2025 crop is the current release'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold extraction in the family mill'],
        ['Formats', '250 ml and 500 ml'],
      ],
      awards: ['34th · WBOO 2025/26', 'Special mention, organic · Ercole Olivario 2025', '2 Foglie · Gambero Rosso 2025'],
      origin: {
        mapPlaceholder: 'Region map · Colline Pontine',
        note: 'The mill runs two decanters and no centrifugal separator — a deliberate choice the producer says preserves the oil’s character, at the cost of a slower, less complete extraction.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'decimi-emozione',
    name: 'Emozione',
    producer: 'Decimi',
    producerSlug: 'decimi',
    cultivar: 'Moraiolo · Frantoio · Leccino · San Felice',
    region: 'Umbria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(34, 165),
    seo: {
      title: 'Decimi Emozione — Umbrian Blend | bestoliveoils.eu',
      description: 'Flos Olei’s best blended intense fruity in the world for 2024, from a Bettona mill that mills within four hours. Joint-34th in WBOO 2025/26.',
    },
    detail: {
      location: 'Bettona, Perugia, Umbria, Italy',
      tags: ['Blend', 'Milled in 4 hours', 'Colli Martani'],
      description: 'A blend recomposed each year from Moraiolo, Frantoio, Leccino and San Felice according to how the cultivars come out, from a Bettona mill that mills within four hours of picking. Flos Olei named it the world’s best blended intense fruity in 2024.',
      facts: [
        ['Cultivar', 'Moraiolo, Frantoio, Leccino and San Felice; percentages not published'],
        ['Harvest', 'October–November; milled within four hours of picking'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Two-phase MORI-TEM plant, closely controlled cold extraction'],
        ['Storage', 'Stainless steel under nitrogen, temperature-controlled'],
        ['Formats', '100 ml, 250 ml and 500 ml'],
      ],
      awards: ['34th · WBOO 2025/26', "World's best blended intense fruity · Flos Olei 2024", 'Tre Foglie · Gambero Rosso', 'Best mill of the year · Gambero Rosso 2014'],
      origin: {
        mapPlaceholder: 'Region map · Colli Martani, Umbria',
        note: 'The Colli Martani are Moraiolo country — a small, hard olive that gives one of Italy’s most bitter and pungent oils, and needs blending partners to become drinkable young.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'marsicani-opera-nostra',
    name: 'Opera Nostra',
    producer: 'Frantoio Marsicani',
    producerSlug: 'marsicani',
    cultivar: 'Not published',
    region: 'Campania · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(37, 160),
    seo: {
      title: 'Marsicani Opera Nostra — Cilento, Campania | bestoliveoils.eu',
      description: '37th in the World’s Best Olive Oils 2025/26, from a Cilento mill named Italy’s mill of the year in 2024 — but this label is not in its published range.',
    },
    detail: {
      location: 'Sicilì di Morigerati, Salerno, Campania, Italy',
      tags: ['Cilento', 'Label unverified', 'Mill of the year 2024'],
      description: 'Thirty-seventh in the World’s Best Olive Oils 2025/26, credited to a mill inside the Cilento National Park that Gambero Rosso named Italy’s mill of the year in 2024. We could not match the label to the producer’s published range, and say so rather than guess.',
      facts: [
        ['Label', 'Listed by WBOO as "Opera Nostra Campania IGP"'],
        ['Verification', 'No such label appears in the producer’s published range'],
        ['Published range', 'Alter Ego, Viride, NU-EVO, Algoritmo, Plusvalore'],
        ['Designation', 'The mill’s DOP oil is Cilento DOP, not Campania IGP'],
        ['Cultivars grown', 'Pisciottana, Frantoio, Rotondella, Leccino; also mills Itrana and Coratina'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
      ],
      awards: ['37th · WBOO 2025/26', 'Mill of the year · Gambero Rosso 2024'],
      origin: {
        mapPlaceholder: 'Region map · Cilento, Campania',
        note: 'The mill sits among ultra-centenarian trees inside the Cilento National Park and works about 1,500 quintals of olives a year, of which roughly a hundred become its own extra virgin — some five thousand bottles.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'el-empiedro',
    name: 'El Empiedro',
    producer: 'Olivarera La Purísima',
    producerSlug: 'olivarera-la-purisima',
    cultivar: 'Picuda · Hojiblanca',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(37, 160),
    seo: {
      title: 'El Empiedro — DOP Priego de Córdoba | bestoliveoils.eu',
      description: 'Mountain Picuda and Hojiblanca under DOP Priego de Córdoba, first prize at Alimentos de España 2023/24. 37th in WBOO 2025/26.',
    },
    detail: {
      location: 'Priego de Córdoba, Córdoba, Andalusia, Spain',
      tags: ['DOP Priego de Córdoba', 'Picuda', 'Mountain groves'],
      description: 'The flagship of a cooperative founded in Priego de Córdoba in 1945, working traditional mountain groves of the native Picuda, Hojiblanca and Picual. First prize in the sweet green fruity class at the Alimentos de España awards for 2023/24.',
      facts: [
        ['Cultivar', 'Picuda and Hojiblanca (retailer information); percentages not published'],
        ['Designation', 'DOP Priego de Córdoba'],
        ['Harvest', 'Not published; a retailer lists the 2025/26 crop'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Producer’s class', 'Intense fruity'],
        ['Formats', '250 ml and 500 ml glass; 3 L tin; 5 L PET'],
      ],
      awards: ['37th · WBOO 2025/26', 'First prize · Alimentos de España 2023/24', 'Gold · DOP Priego de Córdoba quality awards'],
      origin: {
        mapPlaceholder: 'Region map · Priego de Córdoba',
        note: 'Priego de Córdoba is the other great Subbética denomination alongside Baena, and the cooperative’s mill master has been named Spain’s best by the AEMO, the national association of olive-growing municipalities.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'cetrone-in',
    name: 'Cetrone In',
    producer: 'Alfredo Cetrone',
    producerSlug: 'cetrone',
    cultivar: 'Itrana',
    region: 'Lazio · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(39, 155),
    seo: {
      title: 'Cetrone In — Itrana from Sonnino, Lazio | bestoliveoils.eu',
      description: '39th in the World’s Best Olive Oils 2025/26. Hand-picked Itrana from century-old trees at 500 m, milled the same day. The label name is unresolved.',
    },
    detail: {
      location: 'Sonnino, Latina, Lazio, Italy',
      tags: ['Itrana', 'Sonnino', 'Label name unresolved'],
      description: 'Thirty-ninth in the World’s Best Olive Oils 2025/26. The estate grows nothing but Itrana, on century-old trees at around 500 m between the Monti Lepini and the Circeo park, hand-picked and milled the same day.',
      facts: [
        ['Cultivar', '100% Itrana — the estate grows no other variety'],
        ['Label', 'WBOO lists "In"; the producer’s published range is Novolio, Intenso, Delicato, DOP Colline Pontine, Monocultivar Itrana and Blend'],
        ['Most likely match', 'Intenso, the estate’s robust Itrana — not confirmed by the producer'],
        ['Groves', '~100 ha and nearly 20,000 trees at about 500 m'],
        ['Harvest', 'Hand-picked by brucatura, cold-milled the same day'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
      ],
      awards: ['39th · WBOO 2025/26', 'Tre Olive · Slow Food, six times'],
      origin: {
        mapPlaceholder: 'Region map · Sonnino, Lazio',
        note: 'Sonnino is the heart of Itrana country, on the ridge above the Amaseno valley. The variety is unusual in being genuinely dual-purpose: the same fruit makes the black Gaeta table olive and, picked green, a fiercely bitter oil.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'masoni-becciu-cuncordu',
    name: 'Cuncordu',
    producer: 'Masoni Becciu',
    producerSlug: 'masoni-becciu',
    cultivar: 'Not published',
    region: 'Sardinia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    listing: listing(40, 150),
    seo: {
      title: 'Masoni Becciu Cuncordu — Sardinian Organic | bestoliveoils.eu',
      description: 'First for intense fruity at Ercole Olivario 2024, from a 65-hectare organic estate below Monte Linas. 40th in the World’s Best Olive Oils 2025/26.',
    },
    detail: {
      location: 'Villacidro, South Sardinia, Italy',
      tags: ['Organic', 'Intense fruity', 'Villacidro'],
      description: 'From a 65-hectare organic estate planted in 1989 at 267 m between the Campidano plain and the Monte Linas massif. Cuncordu took first place for intense fruity at Ercole Olivario 2024 and first place at Leone d’Oro the same year. Fortieth in the World’s Best Olive Oils 2025/26.',
      facts: [
        ['Cultivar', 'Not published'],
        ['Certification', 'Certified organic; certifying body not published'],
        ['Estate', '65 ha and over 14,000 trees at 267 m'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '250 ml and 500 ml'],
      ],
      awards: ['40th · WBOO 2025/26', '1st, intense fruity · Ercole Olivario 2024', '1st place · Leone d’Oro 2024', '2nd in the world · BIOL 2019'],
      origin: {
        mapPlaceholder: 'Region map · Villacidro, Sardinia',
        note: 'The estate mixes traditional 10 × 10 m spacing with intensive 8 × 7 and 6 × 4 m plantings across the same 65 hectares — an unusually explicit experiment in how density affects an organic grove.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'de-palma-olio-longevo',
    name: 'Olio Longevo Top Quality',
    producer: 'Frantoio de Palma',
    producerSlug: 'de-palma',
    cultivar: 'Not published',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Not stated',
    inShop: false,
    image: null,
    listing: listing(41, 145),
    seo: {
      title: 'Olio Longevo Top Quality — de Palma, Puglia | bestoliveoils.eu',
      description: '41st in the World’s Best Olive Oils 2025/26, and the least documented oil on that table. What we could and could not verify about it.',
    },
    detail: {
      location: 'Puglia, Italy',
      tags: ['Puglia', 'Almost no published data'],
      description: 'Forty-first in the World’s Best Olive Oils 2025/26, and the least documented oil on the whole table. We could not reach a single page belonging to the producer, and we are not going to fill the gap with guesses.',
      facts: [
        ['Producer', 'Frantoio Oleario Domenico de Palma SRL, Puglia'],
        ['Cultivar', 'Not published'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Not published'],
        ['Note', 'No reachable producer website; no data sheet found in any language'],
      ],
      awards: ['41st · WBOO 2025/26'],
      origin: {
        mapPlaceholder: 'Region map · Puglia',
        note: 'Puglia produces around half of all Italian olive oil, most of it Coratina, Ogliarola and Peranzana. A great many of its mills sell locally and have almost no presence online — which is what appears to be the case here.',
        linkLabel: null, linkHref: null,
      },
    },
  },
  {
    slug: 'etruna-regular',
    name: 'Etruna Regular',
    producer: 'Etruna',
    producerSlug: 'etruna',
    cultivar: 'Leccino · Frantoio · Moraiolo',
    region: 'Umbria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/olijfolie-markt-etruna-olijfolie',
    price: '500 ml · €24.90 at our shop',
    priceAmount: 24.90,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/etruna-regular.webp', alt: 'Bottle of Etruna Regular extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Etruna Regular — Umbrian Blend | bestoliveoils.eu',
      description: 'Leccino, Frantoio and Moraiolo from the Colli Assisi, picked in early October. Medium fruity, almond and green herbs. Gold at AIOOC 2025. Where to buy it.',
    },
    detail: {
      location: 'Colli Assisi, Umbria, Italy',
      tags: ['Medium', 'Umbrian blend', 'House brand'],
      description: 'The everyday oil of our retail partner’s own Umbrian label. Three traditional varieties from the hills around Assisi — Leccino and Frantoio for a soft, fruity base, Moraiolo for the aromatic complexity the region is known for — picked in early October. Medium fruity, with almond, Mediterranean herbs and fresh green notes, a mild bitterness and a clean finish. The producer states the polyphenol content sits well above the EU 432/2012 threshold; no figure is published.',
      facts: [
        ['Cultivar',      'Leccino, Frantoio, Moraiolo'],
        ['Harvest',       'Early October'],
        ['Polyphenols',   'Not published — stated to exceed 250 mg/kg'],
        ['Free acidity',  'Not published'],
        ['Extraction',    'Cold'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · Amsterdam IOOC 2025', 'Bronze · Amsterdam IOOC 2026'],
      origin: {
        mapPlaceholder: 'Region map · Colli Assisi, Umbria',
        note: 'The Colli Assisi–Spoleto hills carry the DOP Umbria’s best-known sub-zone. Moraiolo is the local olive — small, hard and bitter — and is nearly always blended with Leccino and Frantoio to be drinkable young.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Pasta', 'Fish', 'Salads', 'Soft vegetables', 'Bread'],
      reviews: [],
    },
  },
  {
    slug: 'etruna-intense-bio',
    name: 'Etruna Intense Bio',
    producer: 'Etruna',
    producerSlug: 'etruna',
    cultivar: 'Leccino · Frantoio',
    region: 'Umbria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/olijfolie-markt-etruna-intense-bio',
    price: '500 ml · €37.95 at our shop',
    priceAmount: 37.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/etruna-intense-bio.webp', alt: 'Bottle of Etruna Intense Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Etruna Intense Bio — Early-Harvest Umbria | bestoliveoils.eu',
      description: 'Organic Leccino and Frantoio hand-picked green in late September in the Colli Assisi. Cut grass, artichoke, green almond; intensely peppery. Gold at AIOOC 2025.',
    },
    detail: {
      location: 'Colli Assisi, Umbria, Italy',
      tags: ['Robust', 'Organic', 'Early harvest', 'Limited'],
      description: 'The limited early-harvest edition of our retail partner’s Umbrian label, made once a year and sold until it runs out. Organic Leccino and Frantoio are hand-picked in late September while still intensely green and cold-pressed within hours. Deep green, with cut grass, artichoke and green almond on the nose and an intensely peppery, pungent palate that the producer describes as balanced rather than harsh. The producer states polyphenols at more than double the EU 432/2012 threshold; no figure is published.',
      facts: [
        ['Cultivar',      'Leccino, Frantoio'],
        ['Harvest',       'Late September, hand-picked green'],
        ['Polyphenols',   'Not published — stated to exceed 500 mg/kg'],
        ['Free acidity',  'Not published'],
        ['Extraction',    'Cold, within hours of picking'],
        ['Certification', 'EU Organic'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · Amsterdam IOOC 2025', 'Bronze · Amsterdam IOOC 2026'],
      origin: {
        mapPlaceholder: 'Region map · Colli Assisi, Umbria',
        note: 'Picking in late September in Umbria is early even by the region’s standards. It costs yield and buys the green, high-polyphenol style — the same trade every early-harvest producer in the library makes.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Grilled vegetables', 'Pulses', 'Red meat', 'Robust salads'],
      reviews: [],
    },
  },
  {
    slug: 'casa-del-agua-picual',
    name: 'Casa del Agua Picual',
    producer: 'Oro Bailén',
    producerSlug: 'oro-bailen',
    cultivar: 'Picual',
    region: 'Andalusia · Spain',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/casa-del-agua',
    price: '500 ml · €13.90 at our shop',
    priceAmount: 13.90,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/casa-del-agua-picual.webp', alt: 'Bottle of Casa del Agua Picual extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Casa del Agua Picual — Oro Bailén House Oil | bestoliveoils.eu',
      description: 'Picual from Oro Bailén’s own finca in Jaén, picked a little later than the flagship for a softer everyday oil. 0.16% acidity, lab-tested each harvest.',
    },
    detail: {
      location: 'Villanueva de la Reina, Jaén, Spain',
      tags: ['Delicate', 'Everyday', 'House brand', '5 L tin'],
      description: 'Made for our retail partner by Oro Bailén from the same Picual groves and the same mill as the flagship. The difference is the picking date: a little later, which gives a softer oil at a far more accessible price. Medium-fruity with the Picual signature of green olive and fresh herbs, a mild bitterness and a light pepper. Sold in 500 ml and in a 5-litre tin; the producer states each harvest is tested by an independent laboratory.',
      facts: [
        ['Cultivar',      '100% Picual'],
        ['Harvest',       'Later than the flagship; month not published'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  '0.16% (producer, per-harvest lab test)'],
        ['Extraction',    'Cold, same line as Oro Bailén'],
        ['Formats',       '500 ml · 5 L tin'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Jaén',
        note: 'The Oro Bailén estate on the Guadalquivir plain. Casa del Agua takes its name from one of the two fincas, La Casa del Agua.',
        linkLabel: 'All Andalusian oils in the library →',
        linkHref: '/oils/?region=andalusia',
      },
      pairings: ['Salads', 'Sauces and marinades', 'Cooking and roasting', 'Dips'],
      reviews: [],
    },
  },
  {
    slug: 'frantoi-cutrera-selezione',
    name: 'Frantoi Cutrera Selezione',
    producer: 'Frantoi Cutrera',
    producerSlug: 'frantoi-cutrera',
    cultivar: 'Moresca · Biancolilla · Nocellara · Cerasuola · Tonda Iblea',
    region: 'Sicily · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/frantoi-cutrera-selezione',
    price: '500 ml · €16.95 at our shop',
    priceAmount: 16.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/frantoi-cutrera-selezione.webp', alt: 'Bottle of Frantoi Cutrera Selezione extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Frantoi Cutrera Selezione — Sicilian Blend | bestoliveoils.eu',
      description: 'Five native Sicilian cultivars picked from early November for a softer, everyday oil. Artichoke, cut grass, red tomato; 0.16% acidity. Where to buy it.',
    },
    detail: {
      location: 'Chiaramonte Gulfi, Ragusa, Sicily, Italy',
      tags: ['Medium', 'Sicilian blend', 'Everyday'],
      description: 'Cutrera’s all-purpose oil: five native Sicilian varieties — Moresca, Biancolilla, Nocellara, Cerasuola and Tonda Iblea — from young groves near the coast, picked from early November. The later harvest gives a softer oil than the house’s early-picked Primo. Green with golden tints; artichoke, cut grass, green almond and red tomato on the nose, balanced bitterness and pungency, and a finish the producer describes as artichoke and oregano.',
      facts: [
        ['Cultivar',      'Moresca, Biancolilla, Nocellara, Cerasuola, Tonda Iblea'],
        ['Harvest',       'From early November'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  '0.16% (producer)'],
        ['Extraction',    'Two-phase continuous cycle, below 27 °C'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Monti Iblei, Sicily',
        note: 'The same Hyblaean mill as Primo DOP; this is the blend it makes for the kitchen rather than the competition table.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Marinated fish', 'Mushrooms', 'Salads', 'Soups', 'Grilled red meat'],
      reviews: [],
    },
  },
  {
    slug: 'marina-palusci-luomo-di-ferro',
    name: 'Marina Palusci L’Uomo di Ferro',
    producer: 'Marina Palusci',
    producerSlug: 'marina-palusci',
    cultivar: 'Dritta',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-luomo-di-ferro',
    price: '500 ml · €49.99 at our shop',
    priceAmount: 49.99,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/marina-palusci-luomo-di-ferro.webp', alt: 'Bottle of Marina Palusci L’Uomo di Ferro extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Marina Palusci L’Uomo di Ferro — Dritta | bestoliveoils.eu',
      description: '100% Dritta picked green in late September from 450-year-old trees in Pianella, Abruzzo. 1,108 mg/kg polyphenols. Gold at NYIOOC 2025 and 2026. Where to buy it.',
    },
    detail: {
      location: 'Pianella, Pescara, Abruzzo, Italy',
      tags: ['Robust', 'Monocultivar', 'High polyphenol', 'Early harvest'],
      description: '“The iron man” — the most extreme oil Marina Palusci makes. 100% Dritta, the native olive of Pescara, picked green in late September from monumental trees of 450 years and older on clay soil at about 282 m, and cold-processed within twelve hours of hand-picking. Bright green; raw artichoke, olive leaf, rocket, radish and chicory with balsamic mint, basil and parsley, and the almond warmth Dritta is known for. A firm, structured bitterness builds to a fierce, lasting pungency.',
      facts: [
        ['Cultivar',      '100% Dritta'],
        ['Harvest',       'Late September, hand-picked green'],
        ['Polyphenols',   '1,108 mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Extraction',    'Cold, within 12 hours; natural decanting under inert gas'],
        ['Trees',         '450 years and older'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · NYIOOC 2026', 'Best in Class · EVOOLEUM 2026', 'Gold · NYIOOC 2025'],
      origin: {
        mapPlaceholder: 'Region map · Pianella, Abruzzo',
        note: 'Dritta is grown almost nowhere outside the province of Pescara. Pianella sits in the clay hills between the Gran Sasso and the Adriatic, and its old-tree Dritta groves are among the oldest productive olive trees in Italy.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Pulse soups', 'Grilled red meat', 'Game', 'Aged cheese', 'Dark chocolate'],
      reviews: [],
    },
  },
  {
    slug: 'marina-palusci-lextravergine',
    name: 'Marina Palusci L’Extravergine',
    producer: 'Marina Palusci',
    producerSlug: 'marina-palusci',
    cultivar: 'Dritta · Leccino',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-lextravergine',
    price: '500 ml · €44.99 at our shop',
    priceAmount: 44.99,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/marina-palusci-lextravergine.webp', alt: 'Bottle of Marina Palusci L’Extravergine extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Marina Palusci L’Extravergine — Dritta & Leccino Blend',
      description: 'The house blend: 60% Dritta, 40% Leccino, cold-extracted in Pianella, Abruzzo. 708 mg/kg polyphenols, 0.28% acidity. Artichoke, green herbs, apple. Where to buy it.',
    },
    detail: {
      location: 'Pianella, Pescara, Abruzzo, Italy',
      tags: ['Medium', 'Blend', 'High polyphenol'],
      description: 'The classic blend of the house: 60% Dritta for structure and strength, 40% Leccino for harmony and aromatic finesse, from groves between 20 and 450 years old on clay soil at about 282 m. After cold pressing the oil rests in tanks under inert gas at controlled temperature. Golden yellow with green reflections; artichoke, fresh green herbs, apple and a clean almond note with floral undertones. Medium-intense, with well-built bitterness and a clearly peppery finish.',
      facts: [
        ['Cultivar',      '60% Dritta, 40% Leccino'],
        ['Harvest',       'Not published'],
        ['Polyphenols',   '708 mg/kg (producer)'],
        ['Free acidity',  '0.28% (producer)'],
        ['Extraction',    'Cold; stored under inert gas'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Pianella, Abruzzo',
        note: 'The all-purpose oil of a Pescara estate whose other bottlings are single-variety. Leccino is the blending partner here, as it is in most of central Italy.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Grilled fish', 'Red meat', 'Bruschetta', 'Soups', 'Roast vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'marina-palusci-alchimia',
    name: 'Marina Palusci Alchimia',
    producer: 'Marina Palusci',
    producerSlug: 'marina-palusci',
    cultivar: 'Leccio del Corno',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-alchimia',
    price: '500 ml · €44.99 at our shop',
    priceAmount: 44.99,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/marina-palusci-alchimia.webp', alt: 'Bottle of Marina Palusci Alchimia extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Marina Palusci Alchimia — Leccio del Corno | bestoliveoils.eu',
      description: 'Late-harvest 100% Leccio del Corno from Pianella, Abruzzo, picked in late November. Floral — chamomile, wisteria, ripe almond. 668 mg/kg polyphenols.',
    },
    detail: {
      location: 'Pianella, Pescara, Abruzzo, Italy',
      tags: ['Delicate', 'Monocultivar', 'Late harvest'],
      description: 'The late harvest of the house: a monocultivar of Leccio del Corno, a Tuscan-origin variety, picked at the end of November when it is at its most aromatic. From a forty-year-old grove on clay and limestone at 278 m, cold-extracted and decanted naturally under inert gas. Golden with green reflections; lightly fruity and markedly floral — yellow and red flowers, chamomile, wisteria, ripe almond and aromatic herbs, with apricot, ripe apple and a hint of ripe tomato at the close. Delicate and harmonious, with soft bitterness and pungency.',
      facts: [
        ['Cultivar',      '100% Leccio del Corno'],
        ['Harvest',       'Late November'],
        ['Polyphenols',   '668 mg/kg (producer)'],
        ['Free acidity',  '0.28% (producer)'],
        ['Extraction',    'Cold; natural decanting under inert gas'],
        ['Grove',         'About 40 years old, 278 m, clay and limestone'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Pianella, Abruzzo',
        note: 'Leccio del Corno is a Tuscan variety planted here for its sweet, floral character — the opposite end of the house range from the green Dritta bottlings.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Burrata and soft cheese', 'Delicate fish and shellfish', 'Carpaccio', 'Mushroom salads', 'Ice cream'],
      reviews: [],
    },
  },
  {
    slug: 'marina-palusci-novus',
    name: 'Marina Palusci Novus',
    producer: 'Marina Palusci',
    producerSlug: 'marina-palusci',
    cultivar: 'Dritta · Leccino',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-novus-colfondo',
    price: '500 ml · €44.99 at our shop',
    priceAmount: 44.99,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/marina-palusci-novus.webp', alt: 'Bottle of Marina Palusci Novus extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Marina Palusci Novus — Unfiltered Olio Nuovo | Abruzzo',
      description: 'The new-harvest olio nuovo of Marina Palusci: unfiltered, colfondo, bottled straight after the late-September pick. 60% Dritta, 40% Leccino. Where to buy it.',
    },
    detail: {
      location: 'Pianella, Pescara, Abruzzo, Italy',
      tags: ['Medium', 'Novello', 'Unfiltered', 'Seasonal'],
      description: 'The olio nuovo of the house: unfiltered, colfondo, and bottled straight after the harvest with no decanting. 60% Dritta and 40% Leccino, picked from late September to mid-October from groves of 120 to 350 years on clay at about 280 m, and cold-extracted at once. Cloudy emerald green with the sediment that colfondo implies; green almond, artichoke and aromatic herbs on the nose, finishing on green olive fruit. Medium-intense and, for an oil this young, harmonious. Available only while the new harvest lasts; the producer advises finishing it within a few months.',
      facts: [
        ['Cultivar',      '60% Dritta, 40% Leccino'],
        ['Harvest',       'Late September to mid-October'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  'Not published'],
        ['Extraction',    'Cold; unfiltered, no decanting'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Pianella, Abruzzo',
        note: 'A novello: the first oil of the season, sold cloudy and meant to be drunk, not kept. See our storage guide for why.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Salads', 'Grilled vegetables', 'Soups', 'Panna cotta'],
      reviews: [],
    },
  },
  /* ── Türkiye ─────────────────────────────────────────────────────────────
     Catalogue entries. Figures are the producers' own unless a row says
     otherwise; competition results are as the producers list them, and the
     producer page says which could be confirmed on the competition's side. */
  {
    slug: 'hermus-arbequina',
    name: 'Hermus Arbequina',
    producer: 'Hermus',
    producerSlug: 'hermus',
    cultivar: 'Arbequina',
    region: 'Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/hermus-arbequina',
    price: '500 ml · €23.95 at our shop',
    priceAmount: 23.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/hermus-arbequina.webp', alt: 'Bottle of Hermus Arbequina extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Hermus Arbequina — Early-Harvest Manisa | bestoliveoils.eu',
      description: 'Arbequina from the Gediz plain at Köprübaşı, Manisa, picked in September by the nursery that first brought the variety to Türkiye. NYIOOC Gold 2022–2024.',
    },
    detail: {
      location: 'Köprübaşı, Manisa, Türkiye',
      tags: ['Medium', 'Early harvest', 'Arbequina in Türkiye'],
      description: 'Arbequina grown on the Gediz plain by the nursery that, the company states, first brought the Catalan variety to Türkiye in 2008 and launched the Hermus label in 2017. Picked in early to mid-September — very early — and cold-extracted. The producer describes a striking green, smooth oil: almond, green banana, tomato, apple, artichoke, fresh leaf and grass, with balanced bitterness and a pleasant pungency.',
      facts: [
        ['Cultivar',      '100% Arbequina'],
        ['Harvest',       'Early to mid-September'],
        ['Polyphenols',   'Minimum 500 mg/kg (producer’s US listing); not stated on the Turkish site'],
        ['Free acidity',  'Below 0.2% (producer)'],
        ['Extraction',    'Cold, below 27 °C (producer)'],
        ['Formats',       '100 ml · 500 ml · 1 L'],
      ],
      awards: ['Gold · NYIOOC 2024', 'Gold · London IOOC 2024', 'Gold + Platinum · Berlin GOOA 2023', 'Gold · NYIOOC 2023', 'Gold · NYIOOC 2022', 'Best of Türkiye · Athena IOOC 2022'],
      origin: {
        mapPlaceholder: 'Region map · Gediz plain, Manisa',
        note: 'Köprübaşı sits on the Gediz — the ancient Hermus — east of Manisa, inland from the Aegean. It is table-grape and tobacco country; Hermus planted it with foreign oil varieties on a nursery’s instinct rather than a tradition.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'hermus-memecik',
    name: 'Hermus Memecik',
    producer: 'Hermus',
    producerSlug: 'hermus',
    cultivar: 'Memecik',
    region: 'Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/hermus-memecik',
    price: '500 ml · €27.95 at our shop',
    priceAmount: 27.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/hermus-memecik.webp', alt: 'Bottle of Hermus Memecik extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Hermus Memecik — Robust Early Harvest | bestoliveoils.eu',
      description: 'Early-harvest Memecik from Köprübaşı, Manisa: green apple, rocket, cress and green tea, firm bitterness. NYIOOC Gold 2021–2023, Olive Japan Gold 2023.',
    },
    detail: {
      location: 'Köprübaşı, Manisa, Türkiye',
      tags: ['Robust', 'Early harvest', 'Memecik'],
      description: 'The native Aegean variety in the Hermus range, and the one the producer calls its strongest. Picked green in September. Green apple, rocket, cress, green tea and fresh herbs, with what the producer describes as a distinct but balanced bitterness and a pleasant pungency; the US listing calls it medium-intense fruity. Sold as USDA Organic on the producer’s US site; organic status is not stated on the Turkish site.',
      facts: [
        ['Cultivar',      '100% Memecik'],
        ['Harvest',       'September, early'],
        ['Polyphenols',   '≥ 500 mg/kg (producer’s US listing)'],
        ['Free acidity',  'Below 0.2% (producer)'],
        ['Extraction',    'Cold, below 27 °C (producer)'],
        ['Certification', 'USDA Organic on the US listing; not stated in Türkiye'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · NYIOOC 2023', 'Gold · London IOOC 2023', 'Gold · Olive Japan 2023', 'Gold · Berlin GOOA 2023', 'Best of Türkiye · JOOP 2022', 'Gold · NYIOOC 2022', 'Gold · NYIOOC 2021'],
      origin: {
        mapPlaceholder: 'Region map · Gediz plain, Manisa',
        note: 'Memecik is the oil olive of Aydın and Muğla; here it is grown further north on the Gediz plain and picked early, which gives it the green, bitter style rather than the softer Aegean norm.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'hermus-emerald',
    name: 'Hermus Emerald',
    producer: 'Hermus',
    producerSlug: 'hermus',
    cultivar: 'Arbequina',
    region: 'Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Hermus Emerald — First-Day Arbequina | bestoliveoils.eu',
      description: 'The first-day pick of Hermus’s Arbequina, about 20 kg of olives per kilo of oil, in 100 ml. Producer-stated 1,117 mg/kg polyphenols; the most bitter in the range.',
    },
    detail: {
      location: 'Köprübaşı, Manisa, Türkiye',
      tags: ['Robust', 'First-day harvest', '100 ml', 'Limited'],
      description: 'A selection, not a cultivar: the very first day of the Arbequina harvest, when the fruit is at its greenest and, the producer states, around twenty kilos of olives go into each kilo of oil. Sold only in 100 ml. More bitter than the rest of the range, with the same green apple, rocket and green tea notes. The producer’s US site states 1,117 mg/kg polyphenols; the figure does not appear on the Turkish site.',
      facts: [
        ['Cultivar',      '100% Arbequina, first-day pick'],
        ['Harvest',       'First day of the September harvest'],
        ['Yield',         '≈ 20 kg of olives per kg of oil (producer)'],
        ['Polyphenols',   '1,117 mg/kg (producer’s US site only)'],
        ['Free acidity',  'Below 0.2% (producer)'],
        ['Formats',       '100 ml'],
      ],
      awards: ['Silver · JOOP 2022', 'Gold · OLIVINUS 2020'],
      origin: {
        mapPlaceholder: 'Region map · Gediz plain, Manisa',
        note: 'The same groves as the Arbequina; the difference is the day.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'hermus-ayvalik',
    name: 'Hermus Ayvalık',
    producer: 'Hermus',
    producerSlug: 'hermus',
    cultivar: 'Ayvalık',
    region: 'Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/hermus-ayvalik',
    price: '500 ml · €23.95 at our shop',
    priceAmount: 23.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/hermus-ayvalik.webp', alt: 'Bottle of Hermus Ayvalık extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Hermus Ayvalık — Early-Harvest Manisa | bestoliveoils.eu',
      description: 'Hermus’s Ayvalık carries the longest medal list in the range: NYIOOC Gold 2019, 2023 and 2024, Olive Japan Gold 2022 and 2024, London IOOC Gold five times.',
    },
    detail: {
      location: 'Köprübaşı, Manisa, Türkiye',
      tags: ['Medium', 'Early harvest', 'Ayvalık'],
      description: 'Türkiye’s classic oil variety in Hermus’s early-picked style, and the bottling that has collected most of the company’s medals since 2017. Our shop carries the September 2025 early harvest. The producer’s US listing states 500+ mg/kg polyphenols.',
      facts: [
        ['Cultivar',      '100% Ayvalık'],
        ['Harvest',       'September, early'],
        ['Polyphenols',   '500+ mg/kg (producer’s US listing)'],
        ['Free acidity',  'Below 0.2% (producer)'],
        ['Extraction',    'Cold (producer)'],
        ['Availability',  'Not in the 2026 Turkish range as listed; last US harvest 2022/23'],
      ],
      awards: ['Gold · NYIOOC 2024', 'Gold · Olive Japan 2024', 'Gold · London IOOC 2024', 'Gold · Monte Carlo 2024', 'Gold · NYIOOC 2023', 'Gold · Berlin GOOA 2023', 'Silver · NYIOOC 2022', 'Gold · Olive Japan 2022', 'Best in Class · JOOP 2022', 'Gold · NYIOOC 2019'],
      origin: {
        mapPlaceholder: 'Region map · Gediz plain, Manisa',
        note: 'Ayvalık is the Edremit Gulf’s olive, two hundred kilometres north; grown here on the Gediz plain it is picked far earlier than the Gulf’s late-ripening norm.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'buta-assos-freyya-nefes',
    name: 'Freyya Premium Nefes',
    producer: 'Buta Assos',
    producerSlug: 'buta-assos',
    cultivar: 'Hanım Parmağı',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    listing: listing(42, 100),
    seo: {
      title: 'Freyya Premium Nefes — Hanım Parmağı from Assos, Türkiye',
      description: 'A monovarietal of Hanım Parmağı, a Çanakkale olive registered in 2017, picked ultra-early and green at Assos. London IOOC Platinum 2024; WBOO 2025/26 tier.',
    },
    detail: {
      location: 'Kulfal, Ayvacık, Çanakkale, Türkiye',
      tags: ['Medium', 'Ultra-early harvest', 'Rare cultivar', 'Also unfiltered'],
      description: 'The flagship of Buta Assos and one of very few oils made from Hanım Parmağı, an olive identified in the Ezine district of Çanakkale in 2014 and registered as a variety in 2017 — about five hundred trees stand mixed through the Kulfal grove. Picked entirely green, ultra-early, and pressed the same day on the estate’s Mori-Tem line. The producer describes refreshing, fruity, grassy aromas and an exceptionally smooth palate, and “remarkably high” polyphenols without publishing a figure. Sold filtered and unfiltered.',
      facts: [
        ['Cultivar',      '100% Hanım Parmağı'],
        ['Harvest',       'Ultra-early, green, hand-picked; pressed the same day'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  '0.2% (the Japanese importer’s release; not on the producer site)'],
        ['Extraction',    'Mori-Tem cold-press on the estate; stored under argon at 16–18 °C, bottled to order under nitrogen (producer)'],
        ['Formats',       '250 ml · 500 ml'],
      ],
      awards: ['100-point tier · WBOO 2025/26', 'Platinum · London IOOC 2024', 'Monovarietal finalist · Leone d’Oro 2024', 'Best Expo Scent of the Year · Monocultivar Olive Oil Expo 2024 (9.70)', 'Gold · Monocultivar Expo 2022'],
      origin: {
        mapPlaceholder: 'Region map · Assos, Çanakkale',
        note: 'Ayvacık is the district behind the ancient city of Assos on the Çanakkale coast, facing Lesbos. Hanım Parmağı — “lady’s finger” — is a local olive the producer calls ancient Anatolian and the registry calls a 2017 variety; both can be true.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'buta-assos-odin-oleocanthal',
    name: 'Odin Premium Oleocanthal',
    producer: 'Buta Assos',
    producerSlug: 'buta-assos',
    cultivar: 'Ayvalık',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Odin Premium Oleocanthal — Buta Assos | bestoliveoils.eu',
      description: 'Buta Assos’s greenest pick, sold on its oleocanthal content — 333 mg/kg by the producer’s figure. Ayvalık per the Monocultivar Expo 2024, where it took Expo Gold.',
    },
    detail: {
      location: 'Kulfal, Ayvacık, Çanakkale, Türkiye',
      tags: ['Robust', 'Early harvest', 'Oleocanthal', 'Also unfiltered'],
      description: 'The oil Buta Assos positions on a single compound: oleocanthal, the phenolic behind the pepper in the throat, which the producer states at 333 mg/kg. Picked at the greenest stage from what the producer calls organic-certified groves. The producer does not name the cultivar; the Monocultivar Olive Oil Expo 2024, which scored it 9.00 and gave it Expo Gold, lists it as Ayvalık, and that is what we show.',
      facts: [
        ['Cultivar',      'Ayvalık (per Monocultivar Expo 2024; not stated by the producer)'],
        ['Harvest',       'Early, greenest stage'],
        ['Oleocanthal',   '333 mg/kg (producer)'],
        ['Polyphenols',   'Not published as a total'],
        ['Free acidity',  'Not published'],
        ['Certification', 'Organic-certified groves (producer); certificate issuer not named'],
        ['Formats',       '250 ml · 500 ml'],
      ],
      awards: ['Expo Gold · Monocultivar Olive Oil Expo 2024 (9.00)'],
      origin: {
        mapPlaceholder: 'Region map · Assos, Çanakkale',
        note: 'Same estate as Freyya; Odin is the Ayvalık pick, Freyya the Hanım Parmağı.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'buta-assos-premium-gurme',
    name: 'Assos Premium Gourmet',
    producer: 'Buta Assos',
    producerSlug: 'buta-assos',
    cultivar: 'Ayvalık',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Assos Premium Gourmet — Early-Harvest Ayvalık, Çanakkale',
      description: 'The everyday early-harvest Ayvalık of Buta Assos, pressed the same day at the estate mill in Ayvacık. Pronounced fruity aroma; sold up to 2 litres.',
    },
    detail: {
      location: 'Kulfal, Ayvacık, Çanakkale, Türkiye',
      tags: ['Medium', 'Early harvest', 'Ayvalık'],
      description: 'The house Ayvalık: early-picked, pressed the same day, with what the producer describes as a pronounced fruity aroma. The format the estate’s Gold at the London IOOC 2021 (“Buta Assos Ayvalık”) and NYIOOC Gold 2023 (“Ayvalık Premium”, per TasteAtlas) most plausibly refer to, though the producer does not tie those medals to a bottling.',
      facts: [
        ['Cultivar',      '100% Ayvalık'],
        ['Harvest',       'Early, hand-picked; pressed the same day'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  '“0.3% or less” across the range (Japanese importer)'],
        ['Extraction',    'Mori-Tem cold-press on the estate'],
        ['Formats',       '250 ml · 500 ml · 2 L'],
      ],
      awards: ['Gold · London IOOC 2021 (as “Buta Assos Ayvalık”)', 'Gold · NYIOOC 2023 (as “Ayvalık Premium”, per TasteAtlas)'],
      origin: {
        mapPlaceholder: 'Region map · Assos, Çanakkale',
        note: 'Çanakkale’s Ayvalık groves are the northern end of the variety’s range; the Edremit Gulf proper begins just south.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'nermin-hanim-edremit-erken-hasat',
    name: 'Nermin Hanım Edremit Erken Hasat',
    producer: 'Nermin Hanım Zeytinliği',
    producerSlug: 'nermin-hanim',
    cultivar: 'Edremit',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Nermin Hanım Edremit Early Harvest — Kaz Dağları, Türkiye',
      description: 'The flagship Ayvalık-type oil of a large old-tree estate under Mount Ida. 325.66 mg/kg polyphenols by the producer’s lab; NYIOOC Gold every year 2020–2026.',
    },
    detail: {
      location: 'Havran, Edremit Gulf, Balıkesir, Türkiye',
      tags: ['Medium', 'Early harvest', 'Edremit / Ayvalık', 'Also unfiltered'],
      description: 'The most-awarded bottling of Nermin Hanım Zeytinliği, from century-old Edremit trees in the Kaz Dağları villages above the gulf. Picked green in September–October and milled within a few hours at the estate’s own mill. The producer labels it “balanced and fruity”: a clear fruit character, balanced bitterness and balanced pungency. The producer publishes a polyphenol figure and links its lab reports from the product page; the laboratory is not named.',
      facts: [
        ['Cultivar',      '100% Edremit (Ayvalık) Yağlık'],
        ['Harvest',       'September–October, early'],
        ['Polyphenols',   '325.66 mg/kg (producer’s lab report)'],
        ['Free acidity',  '0.4% (producer)'],
        ['Extraction',    'Cold, paste at about 20 °C, no hot water or enzymes; own mill (producer)'],
        ['Storage',       'Nitrogen-blanketed steel tanks at 18 °C, bottled to order (producer)'],
        ['Formats',       '100 ml to 5 L'],
      ],
      awards: ['Gold · NYIOOC 2026', 'Platinum · Berlin GOOA 2026', 'Gold · London IOOC 2026', 'Gold · NYIOOC 2025', 'Gold · NYIOOC 2024', 'Gold · NYIOOC 2023', 'Gold · NYIOOC 2021', 'Gold · NYIOOC 2020'],
      origin: {
        mapPlaceholder: 'Region map · Edremit Gulf, Balıkesir',
        note: 'Havran lies at the eastern end of the Edremit Gulf, under the Kaz Dağları — Mount Ida. The gulf is the home of the Ayvalık olive and the source of Türkiye’s best-known oils.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'nermin-hanim-arbequina',
    name: 'Nermin Hanım Arbequina Filtresiz',
    producer: 'Nermin Hanım Zeytinliği',
    producerSlug: 'nermin-hanim',
    cultivar: 'Arbequina',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Nermin Hanım Arbequina — Unfiltered Early Harvest, Edremit',
      description: 'An unfiltered early-harvest Arbequina from the Edremit Gulf the producer labels “hard and sharp”: 480 mg/kg polyphenols, 0.2% acidity. London IOOC Platinum 2026.',
    },
    detail: {
      location: 'Havran, Edremit Gulf, Balıkesir, Türkiye',
      tags: ['Robust', 'Early harvest', 'Unfiltered', 'Arbequina'],
      description: 'Arbequina is usually the mild one; this is the exception the producer labels “sert ve keskin” — hard and sharp — picked early and sold unfiltered, with high bitterness and pungency by its own description. The highest polyphenol figure the producer publishes.',
      facts: [
        ['Cultivar',      '100% Arbequina'],
        ['Harvest',       'Early'],
        ['Polyphenols',   '480 mg/kg (producer’s lab report)'],
        ['Free acidity',  '0.2% (producer)'],
        ['Extraction',    'Cold, own mill; unfiltered'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Platinum · London IOOC 2026', 'Gold · CINVE 2026', 'Grand Gold · CINVE 2025', 'Best in Class · Anatolia IOOC 2025', 'Gold · JOOP 2025', 'Best in Class · JOOP 2022'],
      origin: {
        mapPlaceholder: 'Region map · Edremit Gulf, Balıkesir',
        note: 'A Catalan variety on Mount Ida’s foothills, picked the way the estate picks its Edremit: early and green.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'nermin-hanim-domat',
    name: 'Nermin Hanım Domat Erken Hasat',
    producer: 'Nermin Hanım Zeytinliği',
    producerSlug: 'nermin-hanim',
    cultivar: 'Domat',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Nermin Hanım Domat — Early-Harvest Domat Oil, Edremit Gulf',
      description: 'Domat, the big green table olive of the Aegean, picked early for oil: fresh, green, lively notes by the producer’s label, 435.84 mg/kg polyphenols. NYIOOC Gold 2021.',
    },
    detail: {
      location: 'Havran, Edremit Gulf, Balıkesir, Türkiye',
      tags: ['Medium', 'Early harvest', 'Domat'],
      description: 'Domat is grown for green table olives — large, fleshy, low in oil — and few estates press it. Nermin Hanım picks it early for an oil the producer labels “green, fresh and lively”, fruity and elegant. One of the estate’s most consistently medalled oils.',
      facts: [
        ['Cultivar',      '100% Domat'],
        ['Harvest',       'Early'],
        ['Polyphenols',   '435.84 mg/kg (producer’s lab report)'],
        ['Free acidity',  '0.2% (producer)'],
        ['Extraction',    'Cold, own mill'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · London IOOC 2026', 'Gold · JOOP 2025', 'Gold · JOOP 2024', 'Gold · Anatolia IOOC 2024', 'Silver · NYIOOC 2023', 'Gold · EVO IOOC 2023', 'Gold · London IOOC 2022', 'Gold · NYIOOC 2021', 'Best in Class · JOOP 2020'],
      origin: {
        mapPlaceholder: 'Region map · Edremit Gulf, Balıkesir',
        note: 'Domat is an İzmir and Manisa table olive planted here among the Edremit trees.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'nermin-hanim-trilye',
    name: 'Nermin Hanım Trilye Erken Hasat',
    producer: 'Nermin Hanım Zeytinliği',
    producerSlug: 'nermin-hanim',
    cultivar: 'Trilye',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Nermin Hanım Trilye — the Gemlik Olive Pressed Early',
      description: 'The Gemlik olive under its Trilye name, pressed early at Havran: aromatic and balanced, 439.59 mg/kg polyphenols. Gold at London, EVO IOOC and Carthage 2026.',
    },
    detail: {
      location: 'Havran, Edremit Gulf, Balıkesir, Türkiye',
      tags: ['Medium', 'Early harvest', 'Trilye (Gemlik)', 'Also unfiltered'],
      description: 'Trilye is the Gemlik olive — Türkiye’s black table olive — under the name of the Mudanya village it is associated with. Picked early for oil it gives, by the producer’s label, an aromatic and balanced oil with high fruity notes. Sold filtered and unfiltered.',
      facts: [
        ['Cultivar',      '100% Trilye (Gemlik)'],
        ['Harvest',       'Early'],
        ['Polyphenols',   '439.59 mg/kg (producer’s lab report)'],
        ['Free acidity',  '0.2% (producer)'],
        ['Extraction',    'Cold, own mill'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · London IOOC 2026', 'Gold · EVO IOOC 2026', 'Gold · Carthage IOOC 2026', 'Gold · Los Angeles 2026', 'Gold · EVO IOOC 2025', 'Gold · JOOP 2025', 'Gold · London IOOC 2024', 'Gold · Anatolia IOOC 2024', 'Gold · TerraOlivo 2019'],
      origin: {
        mapPlaceholder: 'Region map · Edremit Gulf, Balıkesir',
        note: 'Gemlik is a Marmara olive; on the Edremit Gulf it is a minority planting, pressed here rather than brined.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  {
    slug: 'nermin-hanim-memecik',
    name: 'Nermin Hanım Memecik Erken Hasat',
    producer: 'Nermin Hanım Zeytinliği',
    producerSlug: 'nermin-hanim',
    cultivar: 'Memecik',
    region: 'North Aegean · Türkiye',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Nermin Hanım Memecik — Intense Early Harvest, Edremit Gulf',
      description: 'The robust oil of the Nermin Hanım range: Memecik picked early for a full body, cut grass, rocket, cress and wild Aegean herbs. EVO IOOC Gold 2026.',
    },
    detail: {
      location: 'Havran, Edremit Gulf, Balıkesir, Türkiye',
      tags: ['Robust', 'Early harvest', 'Memecik', 'Also unfiltered'],
      description: 'The strong one in the range. The producer describes an intense body with freshly cut grass, rocket, cress and wild Aegean herbs, and “high polyphenols” without a published figure. Memecik is an Aydın variety; whether the fruit comes from the estate’s own Kaz Dağları groves is not stated.',
      facts: [
        ['Cultivar',      '100% Memecik'],
        ['Harvest',       'Early'],
        ['Polyphenols',   'Not published — described as high'],
        ['Free acidity',  'Not published'],
        ['Extraction',    'Cold, own mill'],
        ['Formats',       '500 ml, filtered and unfiltered'],
      ],
      awards: ['Gold · EVO IOOC 2026'],
      origin: {
        mapPlaceholder: 'Region map · Edremit Gulf, Balıkesir',
        note: 'Memecik is the southern Aegean’s oil olive, from Aydın down to Muğla; on the Edremit Gulf it is an import.',
        linkLabel: null, linkHref: null,
      },
      reviews: [],
    },
  },
  /* ── Puglia · in our partner's shop ──────────────────────────────────── */
  {
    slug: 'guglielmi-monogram-igp-puglia',
    name: 'Guglielmi Monogram IGP Puglia',
    producer: 'Olio Guglielmi',
    producerSlug: 'guglielmi',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-puglia-p-g-i',
    price: '500 ml · €27.90 at our shop',
    priceAmount: 27.90, priceCurrency: 'EUR',
    image: { src: 'assets/img/guglielmi-monogram-igp-puglia.webp', alt: 'Bottle of Guglielmi Monogram IGP Puglia extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Guglielmi Monogram IGP Puglia — 100% Coratina, Andria',
      description: 'Andria Coratina under the IGP Puglia seal, pressed within hours: cut grass, artichoke, tomato, a long peppery finish. 527 mg/kg polyphenols. Bibenda 5 Gocce 2025.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Robust', 'Monocultivar Coratina', 'IGP Puglia'],
      description: 'Coratina in its purest form: a single-variety oil from the Andria plain, harvested and pressed within hours under the IGP Puglia designation, which requires every step from grove to bottle to happen in the region. Cut grass, artichoke and tomato, then the cultivar’s signature bitterness and a peppery finish that lasts. The producer states 527 mg/kg polyphenols — more than twice the EU 432/2012 threshold.',
      facts: [
        ['Cultivar',      '100% Coratina'],
        ['Designation',   'IGP Olio di Puglia'],
        ['Harvest',       'Early; cold-pressed within hours of picking'],
        ['Polyphenols',   '527 mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Formats',       '500 ml'],
      ],
      awards: ['5 Gocce · Bibenda 2025', 'EVOOLEUM Awards (listed)', 'Oli d’Italia · Gambero Rosso 2025'],
      origin: {
        mapPlaceholder: 'Region map · Andria, Puglia',
        note: 'Andria is Coratina’s home town — the variety is named for Corato, the next town over — and the Castel del Monte plateau behind it is the densest Coratina landscape in Italy.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Grilled vegetables', 'Pulses', 'Red meat'],
      reviews: [],
    },
  },
  {
    slug: 'guglielmi-bio-igp-puglia',
    name: 'Guglielmi Bio IGP Puglia',
    producer: 'Olio Guglielmi',
    producerSlug: 'guglielmi',
    cultivar: 'Ogliarola',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-puglia-bio-p-g-i',
    price: '500 ml · €28.90 at our shop',
    priceAmount: 28.90, priceCurrency: 'EUR',
    image: { src: 'assets/img/guglielmi-bio-igp-puglia.webp', alt: 'Bottle of Guglielmi Bio IGP Puglia extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Guglielmi Bio IGP Puglia — Organic Ogliarola, Andria',
      description: 'Organic 100% Ogliarola from Andria under IGP Puglia: ripe olive, green herbs and a light peppery finish, with 587 mg/kg polyphenols by the producer’s figure.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Medium', 'Organic', 'Monocultivar Ogliarola', 'IGP Puglia'],
      description: 'The gentler Pugliese olive, grown organically and bottled as a monocultivar under IGP Puglia. Ogliarola gives a soft, fruity oil — ripe olive, green herbs, a light pepper at the end — and here it carries, by the producer’s figure, 587 mg/kg polyphenols while staying smooth. The everyday bottle of the range for those who want the phenolics without Coratina’s bite.',
      facts: [
        ['Cultivar',      '100% Ogliarola'],
        ['Designation',   'IGP Olio di Puglia · EU Organic'],
        ['Harvest',       'Not published'],
        ['Polyphenols',   '587 mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Andria, Puglia',
        note: 'Ogliarola Barese is the other olive of the Bari plain, planted beside Coratina and usually used to soften it in blends; a monocultivar is less common.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Salads', 'Grilled vegetables', 'Fish', 'Pasta', 'Bread'],
      reviews: [],
    },
  },
  {
    slug: 'guglielmi-monogram-intenso',
    name: 'Guglielmi Monogram Intenso',
    producer: 'Olio Guglielmi',
    producerSlug: 'guglielmi',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-monogram-intenso',
    price: '500 ml · €19.90 at our shop',
    priceAmount: 19.90, priceCurrency: 'EUR',
    image: { src: 'assets/img/guglielmi-monogram-intenso.webp', alt: 'Bottle of Guglielmi Monogram Intenso extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Guglielmi Monogram Intenso — Coratina for the Pan',
      description: 'Guglielmi’s strongest everyday oil: 100% Coratina, artichoke, fresh almond and cut grass, 500+ mg/kg polyphenols, stable enough to cook with. NYIOOC Gold.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Robust', 'Monocultivar Coratina', 'Also for cooking'],
      description: 'The same Coratina as the IGP bottling without the designation, at a price that lets it be used in the pan as well as on the plate. Artichoke, fresh almond and freshly cut grass, firm bitterness and a long peppery finish; the producer states 500+ mg/kg polyphenols and positions it as the house’s most heat-stable oil. Monogram Intenso took a NYIOOC Gold, per the producer’s own news page.',
      facts: [
        ['Cultivar',      '100% Coratina'],
        ['Harvest',       'Cold-pressed within hours of picking'],
        ['Polyphenols',   '500+ mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Gold · NYIOOC (year per producer news; not verified on the competition side)'],
      origin: {
        mapPlaceholder: 'Region map · Andria, Puglia',
        note: 'Same groves as the IGP; the difference is the certification paperwork, not the olive.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Grilled meat', 'Pulse soups', 'Roast vegetables', 'Robust salads'],
      reviews: [],
    },
  },
  {
    slug: 'guglielmi-fior-do',
    name: 'Guglielmi Fior d’O',
    producer: 'Olio Guglielmi',
    producerSlug: 'guglielmi',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-fior-do',
    price: '500 ml · €23.90 at our shop',
    priceAmount: 23.90, priceCurrency: 'EUR',
    image: { src: 'assets/img/guglielmi-fior-do.webp', alt: 'Bottle of Guglielmi Fior d’O extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Guglielmi Fior d’O — Unfiltered Olio Nuovo | bestoliveoils.eu',
      description: 'The first unfiltered pressing of Guglielmi’s Coratina each October, bottled once a year: cloudy, creamy, grassy, 783 mg/kg polyphenols by the producer. Seasonal.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Robust', 'Olio nuovo', 'Unfiltered', 'Seasonal'],
      description: 'Guglielmi’s olio nuovo: the very first pressing of the new season, unfiltered, bottled once in October and gone within months. Cloudy and creamy in texture, with freshly cut grass and green fruit, artichoke and almond, and a lively peppery finish. The producer states 783 mg/kg polyphenols — the highest figure in our partner’s range — which is what very young Coratina pressed within hours of the earliest pick gives. An unfiltered oil is at its best in its first months; buy it when it lands.',
      facts: [
        ['Cultivar',      '100% Coratina, first pick'],
        ['Harvest',       'October; first pressing of the season'],
        ['Polyphenols',   '783 mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Filtration',    'Unfiltered'],
        ['Formats',       '500 ml, once a year'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Andria, Puglia',
        note: 'Pugliese novello: the oil the mills themselves eat in October, before the filtered bottlings reach the shelves.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Soups', 'Grilled vegetables', 'Bread and sea salt'],
      reviews: [],
    },
  },
  {
    slug: 'le-ferre-olio-di-puglia-igp',
    name: 'Le Ferre Olio di Puglia IGP',
    producer: 'Le Ferre',
    producerSlug: 'le-ferre',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/leferre-olio-di-puglia-i-g-p',
    price: '500 ml · €26.95 at our shop',
    priceAmount: 26.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/le-ferre-olio-di-puglia-igp.webp', alt: 'Bottle of Le Ferre Olio di Puglia IGP extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Le Ferre Olio di Puglia IGP — 100% Coratina, Castellaneta',
      description: 'Coratina from Castellaneta, Taranto, under IGP Puglia: grass, artichoke and almond with the cultivar’s bitterness and pepper. 601 mg/kg polyphenols, lab report.',
    },
    detail: {
      location: 'Castellaneta, Taranto, Puglia, Italy',
      tags: ['Robust', 'Monocultivar Coratina', 'IGP Puglia', 'Harvest 2025/26'],
      description: 'A single-variety Coratina from the Taranto side of Puglia, rich green in colour and medium-to-intense in fruit: grass, artichoke and almond with the bitterness and spicy finish the variety is known for. The producer publishes 601 mg/kg polyphenols for the 2025/26 harvest and links the laboratory report from the product page.',
      facts: [
        ['Cultivar',      '100% Coratina'],
        ['Designation',   'IGP Olio di Puglia'],
        ['Harvest',       '2025/26'],
        ['Polyphenols',   '601 mg/kg (producer’s lab report, linked)'],
        ['Free acidity',  'Not published on the product page'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Castellaneta, Taranto',
        note: 'Castellaneta sits on the Murgia edge above the Ionian coast, between Taranto and Matera; the groves are at 230–290 m on neutral soils, by the producer’s account.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Salads', 'Grilled meat', 'Pizza'],
      reviews: [],
    },
  },
  {
    slug: 'le-ferre-selezione',
    name: 'Le Ferre Selezione',
    producer: 'Le Ferre',
    producerSlug: 'le-ferre',
    cultivar: 'Coratina · Frantoio',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/leferre-selezione-olio',
    price: '500 ml · €42.95 at our shop',
    priceAmount: 42.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/le-ferre-selezione.webp', alt: 'Bottle of Le Ferre Selezione extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Le Ferre Selezione — Gambero Rosso’s Best Blend 2024',
      description: 'Coratina and Frantoio from Castellaneta: 703 mg/kg polyphenols by HPLC at an accredited lab, 331 mg/kg oleocanthal, 0.24% acidity. Gambero Rosso Best Blend 2024.',
    },
    detail: {
      location: 'Castellaneta, Taranto, Puglia, Italy',
      tags: ['Robust', 'Blend', 'High polyphenol', 'Harvest 2025/26'],
      description: 'The top of the Le Ferre range and the best-documented oil in our partner’s shop. Coratina for power, Frantoio chosen each harvest to round it: intense, broad aromas of olive leaf, green tomato and artichoke heart with a hint of ripe nut, a soft full body, and a long warm pungency from an exceptional oleocanthal content. The polyphenol figure is measured by the IOC’s HPLC method at Chemiservice, an ISO/IEC 17025 laboratory in Monopoli, and the report is linked from the product page — which is the standard every number on this site would like to meet.',
      profile: [
        { label: 'Fruity',  desc: 'olive leaf, green tomato, artichoke', pct: '86%' },
        { label: 'Bitter',  desc: 'firm, tempered by Frantoio',          pct: '66%' },
        { label: 'Pungent', desc: 'long, warm — oleocanthal',            pct: '80%' },
      ],
      facts: [
        ['Cultivar',      'Coratina and Frantoio; Frantoio share selected per harvest'],
        ['Harvest',       '2025/26; processed within 24 hours'],
        ['Polyphenols',   '703 mg/kg — HPLC, Chemiservice ISO/IEC 17025, Monopoli (report linked)'],
        ['Oleocanthal',   '331 mg/kg (same report)'],
        ['Free acidity',  '0.24%'],
        ['Peroxide value','4.5 meq O₂/kg'],
        ['Extraction',    'Cold, below 27 °C, continuous two-phase; stored under nitrogen'],
        ['Groves',        '230–290 m, neutral-pH soils (producer)'],
        ['Formats',       '500 ml'],
      ],
      awards: ['Miglior Blend d’Italia · Gambero Rosso 2024', '5 Gocce · Bibenda 2022–2025', 'Oli d’Italia · Gambero Rosso 2025', '3 Foglie · Gambero Rosso 2022, 2023', '1st, Fruttato Medio · Nutri Evo 2024', 'Guida agli Extravergini · Slow Food 2025'],
      origin: {
        mapPlaceholder: 'Region map · Castellaneta, Taranto',
        note: 'Western Puglia, on the ravine country between the Murgia and the Gulf of Taranto.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Soup', 'Risotto', 'Grilled meat', 'Bruschetta'],
      reviews: [],
    },
  },
  {
    slug: 'le-ferre-multivarietale',
    name: 'Le Ferre Multivarietale',
    producer: 'Le Ferre',
    producerSlug: 'le-ferre',
    cultivar: 'Leccino · Ogliarola · Frantoio · Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/leferre-multivarietale',
    price: '500 ml · €14.95 at our shop',
    priceAmount: 14.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/le-ferre-multivarietale.webp', alt: 'Bottle of Le Ferre Multivarietale extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Le Ferre Multivarietale — Everyday Puglia Blend',
      description: 'A four-variety Pugliese blend — Leccino, Ogliarola, Frantoio, Coratina — fruity and balanced, 0.21% acidity, in 500 ml and a 3-litre tin.',
    },
    detail: {
      location: 'Castellaneta, Taranto, Puglia, Italy',
      tags: ['Delicate', 'Blend', 'Everyday', '3 L tin'],
      description: 'The house blend for every day: Leccino and Ogliarola for softness, Frantoio and Coratina for structure. The producer labels it medium to delicate — fruity, a subtle bitterness, a pleasant spicy finish — and publishes 0.21% free acidity for the 2025/26 harvest with the lab sheet linked. Also sold in a 3-litre tin, which is the sensible format for an oil used this freely.',
      facts: [
        ['Cultivar',      'Leccino, Ogliarola, Frantoio, Coratina'],
        ['Harvest',       '2025/26'],
        ['Polyphenols',   'Not published'],
        ['Free acidity',  '0.21% (producer’s lab sheet, linked)'],
        ['Formats',       '500 ml · 3 L tin'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Castellaneta, Taranto',
        note: 'The same Castellaneta groves as the monocultivars, blended for the kitchen.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Cooking', 'Salads', 'Vegetables', 'Bread'],
      reviews: [],
    },
  },
  {
    slug: 'le-ferre-puglia-bio',
    name: 'Le Ferre Puglia Bio',
    producer: 'Le Ferre',
    producerSlug: 'le-ferre',
    cultivar: 'Coratina · Ogliarola · Frantoio · Leccino',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/leferre-puglia-bio',
    price: '500 ml · €26.95 at our shop',
    priceAmount: 26.95, priceCurrency: 'EUR',
    image: { src: 'assets/img/le-ferre-puglia-bio.webp', alt: 'Bottle of Le Ferre Puglia Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: {
      title: 'Le Ferre Puglia Bio — Organic Four-Variety Blend, Taranto',
      description: 'An organic Pugliese blend of Coratina, Ogliarola, Frantoio and Leccino: cut grass, tomato leaf, almond, medium fruity, 500+ mg/kg polyphenols by the producer.',
    },
    detail: {
      location: 'Castellaneta, Taranto, Puglia, Italy',
      tags: ['Medium', 'Organic', 'Blend'],
      description: 'The organic blend: the same four native varieties as the Multivarietale, grown without synthetic pesticides or fertiliser and leaning further toward Coratina. Medium fruity — freshly cut grass, tomato leaf, a touch of almond — with a light, pleasant bitterness and pepper. The producer states 500+ mg/kg polyphenols for the 2025/26 harvest.',
      facts: [
        ['Cultivar',      'Coratina, Ogliarola, Frantoio, Leccino'],
        ['Designation',   'EU Organic'],
        ['Harvest',       '2025/26'],
        ['Polyphenols',   '500+ mg/kg (producer)'],
        ['Free acidity',  'Not published'],
        ['Formats',       '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Castellaneta, Taranto',
        note: 'Organic groves on the same Castellaneta hillsides.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Salads', 'Grilled vegetables', 'Fish', 'Bread'],
      reviews: [],
    },
  },
  /* ── Italy · survey additions (not stocked by our partner) ─────────────
     Catalogue entries from the producers' own published material. Where a
     producer prints no tasting note or figure the row says so. */
  {
    slug: 'muraglia-essenza-coratina',
    name: 'Frantoio Muraglia Essenza Intenso',
    producer: 'Frantoio Muraglia',
    producerSlug: 'frantoio-muraglia',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Frantoio Muraglia Essenza Intenso — Coratina, Andria',
      description: 'A monocultivar Coratina from a five-generation Andria mill: dill, fennel, artichoke, pepper and hay, 770 mg/L polyphenols by the producer’s figure.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Robust', 'Monocultivar Coratina', 'Harvest 2025/26'],
      description: 'The intense fruity of the Muraglia family’s Essenza line — the bottle, not the famous ceramic jar. 100% Coratina, cold-extracted and filtered, intensely green, with what the producer describes as dill, fennel, artichoke, pepper and hay on the nose and a peppery finish. One of the few Pugliese producers in this survey to print a polyphenol figure.',
      facts: [
        ['Cultivar', '100% Coratina'],
        ['Harvest', '2025/26'],
        ['Polyphenols', '770 mg/L (producer)'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold, filtered'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Andria',
        note: 'Andria again: Coratina country. Muraglia is better known abroad for its hand-painted ceramic jars than for the oil inside them, which is a pity.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Pulses', 'Grilled meat'],
      reviews: [],
    },
  },
  {
    slug: 'muraglia-essenza-peranzana',
    name: 'Frantoio Muraglia Essenza Medio',
    producer: 'Frantoio Muraglia',
    producerSlug: 'frantoio-muraglia',
    cultivar: 'Peranzana',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Frantoio Muraglia Essenza Medio — Monocultivar Peranzana',
      description: 'The medium fruity of Muraglia’s Essenza line, a monocultivar of Peranzana, the Daunian olive of northern Puglia.',
    },
    detail: {
      location: 'Andria, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Medium', 'Monocultivar Peranzana'],
      description: 'Peranzana — the olive of the Foggia plain, far gentler than Coratina — bottled as the medium fruity of the Essenza line. The producer publishes no tasting note or figures for it; the variety’s own character is soft fruit, tomato and almond with light bitterness.',
      facts: [
        ['Cultivar', '100% Peranzana'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Andria',
        note: 'Peranzana is grown around San Severo and Torremaggiore in the Daunia; a monocultivar from an Andria mill means bought-in fruit or northern groves.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Salads', 'Vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'intini-coratina-bio',
    name: 'Intini Monocultivar Coratina Bio',
    producer: 'Olio Intini',
    producerSlug: 'olio-intini',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Intini Monocultivar Coratina Bio — Alberobello',
      description: 'Organic Coratina from Alberobello, picked and milled the same day: powerful and bitter by the producer’s description.',
    },
    detail: {
      location: 'Alberobello, Bari, Puglia, Italy',
      tags: ['Robust', 'Organic', 'Monocultivar Coratina'],
      description: 'An organic Coratina from the trulli country of the Itria valley, harvested and milled within the day. The producer describes it as powerful and bitter and says its polyphenols are high without printing a number. Recognised by Slow Food, Gambero Rosso and Olive Japan in 2023 per the producer.',
      facts: [
        ['Cultivar', '100% Coratina'],
        ['Designation', 'EU Organic'],
        ['Harvest', 'Milled the same day'],
        ['Polyphenols', '“High” — not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: ['Presidio · Slow Food 2023', 'Tre Foglie · Gambero Rosso 2023', 'Olive Japan 2023'],
      origin: {
        mapPlaceholder: 'Region map · Alberobello',
        note: 'Alberobello sits on the Murgia dei Trulli, higher and cooler than the Bari plain; Coratina here ripens later.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Pulse soups', 'Grilled meat', 'Bitter greens'],
      reviews: [],
    },
  },
  {
    slug: 'galantino-intenso',
    name: 'Galantino L’Intenso',
    producer: 'Frantoio Galantino',
    producerSlug: 'frantoio-galantino',
    cultivar: 'Coratina',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Galantino L’Intenso — Coratina from Bisceglie',
      description: 'The intense fruity of a Bisceglie mill: Coratina from centuries-old groves north of Bari, cold-extracted, “decided” in flavour by the producer’s description.',
    },
    detail: {
      location: 'Bisceglie, Barletta-Andria-Trani, Puglia, Italy',
      tags: ['Robust', 'Coratina'],
      description: 'Coratina from old groves along the Adriatic north of Bari, cold-extracted and sold as the intense fruity of a mill that also bottles under DOP Terre di Bari Castel del Monte. The producer describes a decided flavour and publishes no figures.',
      facts: [
        ['Cultivar', 'Coratina'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '750 ml · 5 L tin'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Bisceglie',
        note: 'Bisceglie is on the coast between Trani and Molfetta; the groves behind it are among the oldest on the Bari plain.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Grilled vegetables', 'Soups'],
      reviews: [],
    },
  },
  {
    slug: 'dorazio-peranzana',
    name: 'Frantoio D’Orazio Monocultivar Peranzana',
    producer: 'Frantoio D’Orazio',
    producerSlug: 'frantoio-dorazio',
    cultivar: 'Peranzana',
    region: 'Puglia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Frantoio D’Orazio Monocultivar Peranzana — Conversano',
      description: 'A Peranzana monocultivar from a Conversano mill founded in 1964 that presses around 300,000 litres a year. Tasting notes and figures not published.',
    },
    detail: {
      location: 'Conversano, Bari, Puglia, Italy',
      tags: ['Medium', 'Monocultivar Peranzana'],
      description: 'One of a set of monocultivars — Peranzana, Olivastro, Picholine — from a mid-sized mill in Conversano. The producer publishes no tasting note or figures for it.',
      facts: [
        ['Cultivar', '100% Peranzana'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Conversano',
        note: 'Conversano is in the hills south-east of Bari, cherry and olive country.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Salads', 'Vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'quattrociocchi-superbo',
    name: 'Quattrociocchi Superbo',
    producer: 'Quattrociocchi',
    producerSlug: 'quattrociocchi',
    cultivar: 'Moraiolo',
    region: 'Lazio · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Quattrociocchi Superbo — Organic Moraiolo, Alatri',
      description: 'The intense organic monocultivar of Moraiolo from the Alatri mill whose Olivastro placed 13th in WBOO 2025/26. Hand-picked, milled the same day, unfiltered.',
    },
    detail: {
      location: 'Alatri, Frosinone, Lazio, Italy',
      tags: ['Robust', 'Organic', 'Monocultivar Moraiolo', 'Unfiltered'],
      description: 'The other monocultivar of the Quattrociocchi house: Moraiolo, the small bitter Umbrian olive, grown here in the Ciociaria hills and bottled unfiltered as the intense oil of the range. Organic, hand-picked and milled the same day, as everything the mill makes.',
      facts: [
        ['Cultivar', '100% Moraiolo'],
        ['Designation', 'EU Organic'],
        ['Harvest', 'Hand-picked, milled the same day'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Filtration', 'Unfiltered'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Alatri',
        note: 'Same mill as Olivastro; Moraiolo is the Umbrian import among the Itrana.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Grilled meat', 'Pulse soups', 'Bitter greens'],
      reviews: [],
    },
  },
  {
    slug: 'franci-villa-magra-grand-cru',
    name: 'Frantoio Franci Villa Magra Grand Cru',
    producer: 'Frantoio Franci',
    producerSlug: 'frantoio-franci',
    cultivar: 'Frantoio',
    region: 'Tuscany · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Franci Villa Magra Grand Cru — Flos Olei 100/100',
      description: 'About 10,000 bottles a year of Frantoio from Montenero d’Orcia: broad, sweet on entry, pleasantly bitter, spiced pungency.',
    },
    detail: {
      location: 'Montenero d’Orcia, Grosseto, Tuscany, Italy',
      tags: ['Robust', 'Monocultivar Frantoio', 'Grand Cru'],
      description: 'The flagship of one of Tuscany’s most decorated mills. Frantoio from the Villa Magra grove, made in a run of about 10,000 bottles: the producer describes it as broad, sweet on opening, with a pleasant bitter charge and a spiced, peppery pungency. Flos Olei scored it 100/100 in its 2026 guide; Bibenda named it the best extra virgin in Italy in 2022.',
      facts: [
        ['Cultivar', '100% Frantoio'],
        ['Harvest', 'October–November'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Production', 'About 10,000 bottles'],
        ['Formats', '500 ml'],
      ],
      awards: ['100/100 · Flos Olei 2026', 'Best EVOO of Italy · Bibenda 2022'],
      origin: {
        mapPlaceholder: 'Region map · Montenero d’Orcia',
        note: 'Montenero d’Orcia is on the slopes of Monte Amiata in the Maremma, well south of the Chianti; Franci has been there since 1958.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Ribollita', 'Grilled steak', 'Bruschetta', 'Raw vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'franci-fiore-del-frantoio',
    name: 'Frantoio Franci Fiore del Frantoio',
    producer: 'Frantoio Franci',
    producerSlug: 'frantoio-franci',
    cultivar: 'Tuscan blend',
    region: 'Tuscany · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: {
      title: 'Franci Fiore del Frantoio — the Everyday Tuscan',
      description: 'Franci’s everyday blend: ripe olive, mature fruit and a faint artichoke, with bitterness and pepper the producer calls slight.',
    },
    detail: {
      location: 'Montenero d’Orcia, Grosseto, Tuscany, Italy',
      tags: ['Delicate', 'Blend', 'Everyday', '5 L tin'],
      description: 'The house’s kitchen oil, picked October to November: ripe olive and mature fruit with a faint artichoke note, and bitter and spicy notes the producer describes as of slight intensity. Cultivars are not named. The format range — 500 ml to 5 litres — says what it is for.',
      facts: [
        ['Cultivar', 'Blend; varieties not published'],
        ['Harvest', 'October–November'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml · 3 L · 5 L'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Montenero d’Orcia',
        note: 'Same mill as Villa Magra; this is the bottle the Franci family cooks with.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Cooking', 'Salads', 'Vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'laudemio-frescobaldi',
    name: 'Laudemio Frescobaldi',
    producer: 'Marchesi Frescobaldi',
    producerSlug: 'frescobaldi',
    cultivar: 'Frantoio · Moraiolo · Leccino',
    region: 'Tuscany · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Laudemio Frescobaldi — the Chianti Benchmark',
      description: 'The best-known bottle of the Laudemio consortium: Frantoio, Moraiolo and Leccino from the Frescobaldi estates, intense and typically spicy — green olive.',
    },
    detail: {
      location: 'Chianti Rufina, Florence, Tuscany, Italy',
      tags: ['Robust', 'Laudemio', 'Tuscan blend'],
      description: 'The oil most people picture when they think of Tuscan olive oil, from the Frescobaldi family’s Chianti Rufina estates under the Laudemio consortium rules — cold extraction, early picking, two tasting panels before release. Very intense and typically spicy, by the producer’s description: green olive, cut grass, artichoke, rocket and green almond.',
      facts: [
        ['Cultivar', 'Frantoio, Moraiolo, Leccino'],
        ['Harvest', 'Early, by consortium rule'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '250 ml · 500 ml'],
      ],
      awards: ['Gold · NYIOOC 2026', 'Gold · NYIOOC 2025', 'Gold · JOOP 2025', 'Tre Foglie · Gambero Rosso 2024/25'],
      origin: {
        mapPlaceholder: 'Region map · Chianti Rufina',
        note: 'Laudemio is a brand shared by about twenty Tuscan estates since the mid-1980s; the square bottle is the same, the oil inside is each estate’s own.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Bean soup', 'Grilled meat', 'Bistecca'],
      reviews: [],
    },
  },
  {
    slug: 'volmiano-laudemio',
    name: 'Laudemio Fattoria di Volmiano',
    producer: 'Fattoria di Volmiano',
    producerSlug: 'fattoria-di-volmiano',
    cultivar: 'Frantoio · Moraiolo · Leccino',
    region: 'Tuscany · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: {
      title: 'Laudemio Fattoria di Volmiano — Organic, Monte Morello',
      description: 'The Gondi family’s organic Laudemio from 70 hectares of olives on Monte Morello above Calenzano: Frantoio, Moraiolo, Leccino and Pendolino.',
    },
    detail: {
      location: 'Calenzano, Florence, Tuscany, Italy',
      tags: ['Robust', 'Organic', 'Laudemio', 'Tuscan blend'],
      description: 'Laudemio from a 550-hectare estate on the slopes of Monte Morello north of Florence, with 70 hectares and more than 20,000 olive trees between 250 and 1,000 m. Half Frantoio, 30% Moraiolo, 20% Leccino plus Pendolino, farmed organically and pressed at a traditional millstone-and-press mill. Tasting notes and figures are not published.',
      facts: [
        ['Cultivar', 'Frantoio 50%, Moraiolo 30%, Leccino 20%, Pendolino'],
        ['Designation', 'EU Organic · Laudemio'],
        ['Harvest', 'Early, by consortium rule'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Mill', 'Traditional stone mill and press'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Calenzano',
        note: 'Monte Morello is the hill wall north of Florence; the groves run unusually high for Tuscany.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Bruschetta', 'Soups', 'Grilled meat'],
      reviews: [],
    },
  },
  {
    slug: 'marfuga-sassente',
    name: 'Marfuga Sassente',
    producer: 'Marfuga',
    producerSlug: 'marfuga',
    cultivar: 'Frantoio',
    region: 'Umbria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Marfuga Sassente — 100% Frantoio, Campello sul Clitunno',
      description: 'A Frantoio monocultivar from a mill founded in 1817 on the Spoleto hills, picked mid-October to early November: fresh green almond, grass.',
    },
    detail: {
      location: 'Campello sul Clitunno, Perugia, Umbria, Italy',
      tags: ['Medium', 'Monocultivar Frantoio', 'Since 1817'],
      description: 'Frantoio from hillside terraces above the springs of the Clitunno, picked between 15 October and 10 November. The producer describes an elegant, complex oil — fresh green almond and grass, with a balanced bitter and peppery finish — and lists it as the best monocultivar in Umbria at an unspecified competition.',
      facts: [
        ['Cultivar', '100% Frantoio'],
        ['Harvest', '15 October – 10 November'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: ['Top 20 · Flos Olei 2027 (producer)'],
      origin: {
        mapPlaceholder: 'Region map · Campello sul Clitunno',
        note: 'Campello sul Clitunno is in the DOP Umbria Colli Assisi–Spoleto zone, the same hills Etruna is pressed in.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Grilled vegetables', 'Fish', 'Legumes'],
      reviews: [],
    },
  },
  {
    slug: 'agraria-riva-46-parallelo-casaliva',
    name: '46° Parallelo Monocultivar Casaliva',
    producer: 'Agraria Riva del Garda',
    producerSlug: 'agraria-riva-del-garda',
    cultivar: 'Casaliva',
    region: 'Trentino · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: '46° Parallelo Casaliva — Lake Garda’s Olive, Riva',
      description: 'A monocultivar of Casaliva, the olive of Lake Garda, from the Riva co-operative at the lake’s northern tip: herbaceous, balanced bitter and pepper.',
    },
    detail: {
      location: 'Riva del Garda, Trento, Trentino, Italy',
      tags: ['Medium', 'Monocultivar Casaliva', 'Early harvest'],
      description: 'The northernmost olive oil in the library, from the co-operative at the head of Lake Garda — the 46th parallel of the name. 100% Casaliva, picked early and mostly by hand, cold-extracted on a two-phase continuous line. The producer describes a herbaceous, medium oil with balanced bitterness and pepper.',
      facts: [
        ['Cultivar', '100% Casaliva'],
        ['Harvest', 'Early, mostly hand-picked'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold, two-phase continuous'],
        ['Formats', '500 ml'],
      ],
      awards: ['5 Gocce · Bibenda 2024, 2025, 2026', '3 Foglie · Gambero Rosso 2026'],
      origin: {
        mapPlaceholder: 'Region map · Riva del Garda',
        note: 'Olives grow at Riva because the lake stores summer heat; it is the northern limit of commercial olive growing in Europe.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Lake fish', 'Risotto', 'Salads'],
      reviews: [],
    },
  },
  {
    slug: 'agraria-riva-46-parallelo-verde',
    name: '46° Parallelo Verde',
    producer: 'Agraria Riva del Garda',
    producerSlug: 'agraria-riva-del-garda',
    cultivar: 'Casaliva blend',
    region: 'Trentino · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: '46° Parallelo Verde — Early-Harvest Garda Blend',
      description: 'The Riva co-operative’s early-harvest blend led by Casaliva: green almond, light bitterness and a more marked pepper. Sold from 250 ml to a 5-litre tin.',
    },
    detail: {
      location: 'Riva del Garda, Trento, Trentino, Italy',
      tags: ['Medium', 'Blend', 'Early harvest', '5 L tin'],
      description: 'The green, early-picked blend of the Riva co-operative, led by Casaliva with the lake’s minor varieties. Green almond on the nose, a light bitterness and a pepper the producer describes as more marked. The bottle a visitor to the lake comes home with.',
      facts: [
        ['Cultivar', 'Casaliva-led blend'],
        ['Harvest', 'Early'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '250 ml to 5 L'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Riva del Garda',
        note: 'Same co-operative as the Casaliva monocultivar.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Lake fish', 'Polenta', 'Vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'caldera-solo-casaliva',
    name: 'Olearia Caldera Solo Casaliva',
    producer: 'Olearia Caldera',
    producerSlug: 'olearia-caldera',
    cultivar: 'Casaliva',
    region: 'Lombardy · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: {
      title: 'Olearia Caldera Solo Casaliva — Manerba del Garda',
      description: 'A Casaliva monocultivar from the Brescia shore of Lake Garda: fresh, a hint of herbs, green apple and artichoke heart, delicate and elegant. Figures not published.',
    },
    detail: {
      location: 'Manerba del Garda, Brescia, Lombardy, Italy',
      tags: ['Delicate', 'Monocultivar Casaliva'],
      description: 'Casaliva from the western, Lombard shore of the lake, by a mill that bottles four monocultivars — Casaliva, Frantoio, Leccino and FS17. The producer describes a fresh, delicate and elegant oil with a hint of herbs, green apple and artichoke heart. Figures are not published.',
      facts: [
        ['Cultivar', '100% Casaliva'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Continuous cycle'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Manerba del Garda',
        note: 'Manerba is on the Brescia side, across the water from the Veneto shore; the Garda DOP spans both.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Lake fish', 'Carpaccio', 'Salads'],
      reviews: [],
    },
  },
  {
    slug: 'anfosso-tumai-taggiasca',
    name: 'Olio Anfosso Tumaì',
    producer: 'Olio Anfosso',
    producerSlug: 'olio-anfosso',
    cultivar: 'Taggiasca',
    region: 'Liguria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: {
      title: 'Olio Anfosso Tumaì — Monocultivar Taggiasca, Imperia',
      description: 'A Taggiasca monocultivar from a rebuilt family mill at Chiusavecchia in the Imperia hills, listed by Gambero Rosso.',
    },
    detail: {
      location: 'Chiusavecchia, Imperia, Liguria, Italy',
      tags: ['Delicate', 'Monocultivar Taggiasca'],
      description: 'Taggiasca, the small sweet olive of the Ligurian Riviera, from a family mill in the Impero valley recently rebuilt with regional funding. Gambero Rosso has listed Tumaì; the producer publishes no tasting note or figures. Taggiasca gives a delicate, almondy oil with little bitterness.',
      facts: [
        ['Cultivar', '100% Taggiasca'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '750 ml'],
      ],
      awards: ['Listed · Gambero Rosso Oli d’Italia'],
      origin: {
        mapPlaceholder: 'Region map · Chiusavecchia',
        note: 'Chiusavecchia is up the Impero valley from Imperia, the heart of Taggiasca country.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Pesto', 'Vegetables'],
      reviews: [],
    },
  },
  {
    slug: 'santagata-oro-taggiasco',
    name: 'Frantoio di Sant’Agata d’Oneglia Oro Taggiasco',
    producer: 'Frantoio di Sant’Agata d’Oneglia',
    producerSlug: 'frantoio-di-santagata',
    cultivar: 'Taggiasca',
    region: 'Liguria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: {
      title: 'Sant’Agata d’Oneglia Oro Taggiasco — Taggiasca since 1827',
      description: 'A Taggiasca monocultivar from a mill at Imperia founded in 1827, hand-picked before full ripeness and cold-pressed the same day: delicate and aromatic.',
    },
    detail: {
      location: 'Imperia, Liguria, Italy',
      tags: ['Delicate', 'Monocultivar Taggiasca', 'Since 1827'],
      description: 'Taggiasca picked before full ripeness, by hand, and cold-pressed the same day at one of the oldest working mills on the Riviera. The producer describes a delicate, aromatic oil. Recognised at Ercole Olivario 2018, the WineHunter Awards 2019 and the Los Angeles competition 2019, per the producer.',
      facts: [
        ['Cultivar', '100% Taggiasca'],
        ['Harvest', 'Hand-picked before full ripeness; pressed the same day'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: ['Ercole Olivario 2018', 'Platinum · WineHunter 2019', 'Los Angeles IOOC 2019'],
      origin: {
        mapPlaceholder: 'Region map · Imperia',
        note: 'Sant’Agata is a hamlet above Oneglia, Imperia’s eastern half.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Pesto', 'Focaccia'],
      reviews: [],
    },
  },
  {
    slug: 'ursini-opera-mastra',
    name: 'Ursini Opera Mastra',
    producer: 'Ursini',
    producerSlug: 'ursini',
    cultivar: 'Leccino · Gentile di Chieti',
    region: 'Abruzzo · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'Ursini Opera Mastra — Organic Leccino & Gentile di Chieti',
      description: 'An organic medium-fruity blend of Leccino and Gentile di Chieti from trees of 20 to 250 years on the Chieti coast at Fossacesia.',
    },
    detail: {
      location: 'Fossacesia, Chieti, Abruzzo, Italy',
      tags: ['Medium', 'Organic', 'Blend'],
      description: 'Leccino with Gentile di Chieti, the local olive of the Chieti hills, from groves at Fossacesia, Rocca San Giovanni and Lanciano with trees of 20 to 250 years. Organic and medium fruity by the producer’s description; no figures published.',
      facts: [
        ['Cultivar', 'Leccino, Gentile di Chieti'],
        ['Designation', 'EU Organic'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Fossacesia',
        note: 'The Costa dei Trabocchi, south of Pescara; Gentile di Chieti is the variety the Marina Palusci estate does not grow.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Vegetables', 'Soups'],
      reviews: [],
    },
  },
  {
    slug: 'olearia-san-giorgio-altanum',
    name: 'Olearia San Giorgio Altanum IGP',
    producer: 'Olearia San Giorgio',
    producerSlug: 'olearia-san-giorgio',
    cultivar: 'Ottobratica · Carolea',
    region: 'Calabria · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: {
      title: 'Altanum IGP Olio di Calabria — Olearia San Giorgio',
      description: 'A medium-light Calabrian IGP from the Fazari family mill at San Giorgio Morgeto: Ottobratica, Carolea, Sinopolese, Roggianella and Ciciarello.',
    },
    detail: {
      location: 'San Giorgio Morgeto, Reggio Calabria, Calabria, Italy',
      tags: ['Delicate', 'IGP Olio di Calabria', 'Blend'],
      description: 'The library’s first Calabrian oil: a blend of the region’s own varieties — Ottobratica and Carolea leading, with Sinopolese, Roggianella and Ciciarello — from a mill the Fazari family has run since 1940 on the Piana di Gioia Tauro. Medium-light fruity, green with yellow highlights, by the producer’s description.',
      facts: [
        ['Cultivar', 'Ottobratica, Carolea, Sinopolese, Roggianella, Ciciarello'],
        ['Designation', 'IGP Olio di Calabria'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '500 ml · 750 ml'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · San Giorgio Morgeto',
        note: 'The Gioia Tauro plain is Italy’s most densely planted olive landscape after Puglia, with huge Ottobratica trees.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Fish', 'Vegetables', 'Pasta'],
      reviews: [],
    },
  },
  {
    slug: 'san-giuliano-loriginale',
    name: 'San Giuliano L’Originale',
    producer: 'San Giuliano',
    producerSlug: 'san-giuliano',
    cultivar: 'Bosana · Coratina · Ogliarola',
    region: 'Sardinia · Italy',
    score: null, stars: 0, reviews: 0, readerScore: null, readerStars: 0,
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: {
      title: 'San Giuliano L’Originale — Alghero',
      description: 'The Manca family’s all-Italian blend from Alghero: Bosana with Coratina, Ogliarola, Carolea and Semidana, picked at late ripeness — ripe olive.',
    },
    detail: {
      location: 'Alghero, Sassari, Sardinia, Italy',
      tags: ['Medium', 'Blend'],
      description: 'The everyday oil of Sardinia’s best-known producer: Bosana, the island’s olive, with Coratina, Ogliarola, Carolea and Semidana from Italian groves, picked at late ripeness. Medium-intense — ripe olive, leaf and tomato, with light bitterness and pepper — by the producer’s description. Sold from 10 ml to a 3-litre tin.',
      facts: [
        ['Cultivar', 'Bosana, Coratina, Ogliarola, Carolea, Semidana'],
        ['Harvest', 'Late ripeness'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Formats', '10 ml to 3 L'],
      ],
      awards: [],
      origin: {
        mapPlaceholder: 'Region map · Alghero',
        note: 'Alghero, on the north-west coast; Bosana is the variety behind the DOP Sardegna.',
        linkLabel: null, linkHref: null,
      },
      pairings: ['Cooking', 'Roast lamb', 'Vegetables'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'cretan-heritage-krissa',
    name: 'Cretan Heritage Krissa',
    producer: 'Cretan Heritage',
    producerSlug: 'cretan-heritage',
    cultivar: 'Tsounati',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-krissa',
    price: '500 ml · €28.50 at our shop',
    priceAmount: 28.5,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/cretan-heritage-krissa.webp', alt: 'Bottle of Cretan Heritage Krissa extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Cretan Heritage Krissa — 100% Tsounati, Chania', description: 'Single-variety Tsounati from Sfakopigadi, Kissamos, picked in October and milled the same day. Athena Double Gold and Best Greek Olive Oil 2024.' },
    detail: {
      location: 'Sfakopigadi, Kissamos, Chania, Crete, Greece',
      tags: ['Medium', 'Monocultivar Tsounati', 'Athena Best of Greece 2024', 'Harvest 2025'],
      description: 'The flagship of Cretan Heritage and a rare chance to taste Tsounati on its own — the Chania-native variety that most of the island blends into Koroneiki or leaves to the table. Picked early in October from the family groves at Sfakopigadi and pressed the same day at Glykorizia, with malaxation capped at 45 minutes and extraction held around 27 °C. Medium in intensity: olive leaf, herbs, almond and eucalyptus on the nose, medium bitterness and spice, and a long nutty finish, in the retailer’s description that the producer repeats. Its best result is beyond dispute — Athena 2024 Double Gold with the special prize for the best Greek oil, in the competition’s published list.',
      facts: [
        ['Cultivar', '100% Tsounati'],
        ['Harvest', 'October 2025, early'],
        ['Polyphenols', '419 mg/kg, HPLC (retailer Olive Epitome, October 2025 lot)'],
        ['Free acidity', '0.28% (same listing); peroxide 7.0 meq O₂/kg'],
        ['Extraction', 'Same-day, ~27 °C, malaxation ≤ 45 min (producer)'],
        ['Formats', '500 ml'],
      ],
      awards: ['Double Gold · Athena IOOC 2024', 'Best Greek Olive Oil · Athena IOOC 2024', 'Silver · Athena IOOC 2025', 'Gold · Berlin GOOA 2024', 'Gold · Berlin GOOA 2025', 'Silver · London IOOC 2022'],
      origin: { mapPlaceholder: 'Region map · Kissamos, Crete', note: 'Tsounati is the old variety of western Crete, taller and later than Koroneiki; it gives a softer, nuttier oil and is the one the Kissamos hills were planted to before the twentieth century.', linkLabel: 'Tsounati — the variety', linkHref: '/cultivars/tsounati/' },
      pairings: ['Grilled fish', 'Dakos', 'Fresh cheese', 'Greens'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'cretan-heritage-krissa-bio',
    name: 'Cretan Heritage Krissa Bio',
    producer: 'Cretan Heritage',
    producerSlug: 'cretan-heritage',
    cultivar: 'Tsounati',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-krissa-bio',
    price: '500 ml · €29.90 at our shop',
    priceAmount: 29.9,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/cretan-heritage-krissa-bio.webp', alt: 'Bottle of Cretan Heritage Krissa Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Cretan Heritage Krissa Bio — Organic Tsounati, Crete', description: 'The organic bottling of Krissa: same Tsounati, same Kissamos grove, October harvest; 624 mg/kg polyphenols by HPLC for the 2025 lot (retailer).' },
    detail: {
      location: 'Sfakopigadi, Kissamos, Chania, Crete, Greece',
      tags: ['Medium', 'Organic', 'Monocultivar Tsounati', 'Harvest 2025'],
      description: 'Krissa from the certified-organic part of the grove, sold under its own label with its own medal list. Same variety, same October picking and same-day milling; the published chemistry for the 2025 lot is noticeably higher in polyphenols than the conventional Krissa — 624 against 419 mg/kg — both figures from the same retailer’s HPLC listing, so treat the gap as a lot-to-lot fact rather than a rule. The tasting notes the retailer gives are the same as Krissa’s: leaf, herbs, almond, eucalyptus, medium bitterness and spice. The organic certifier is not named by the producer.',
      facts: [
        ['Cultivar', '100% Tsounati'],
        ['Harvest', 'October 2025'],
        ['Polyphenols', '624 mg/kg, HPLC (retailer Olive Epitome, October 2025 lot)'],
        ['Free acidity', '0.30% (same listing); peroxide 4.9 meq O₂/kg'],
        ['Certification', 'EU organic (certifier not published)'],
        ['Formats', '500 ml'],
      ],
      awards: ['Silver · Berlin GOOA 2025', 'Silver · Athena IOOC 2023', 'Silver · Berlin GOOA 2023'],
      origin: { mapPlaceholder: 'Region map · Kissamos, Crete', note: 'The producer’s posts do not always say which bottling — Krissa or Krissa Bio — was entered in a given year; the medals here are the ones named for the Bio.', linkLabel: 'Tsounati — the variety', linkHref: '/cultivars/tsounati/' },
      pairings: ['Salads', 'Grilled fish', 'Pulses', 'Bread and olives'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'cretan-heritage-one-root',
    name: 'Cretan Heritage One Root',
    producer: 'Cretan Heritage',
    producerSlug: 'cretan-heritage',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-one-root',
    price: '500 ml · €13.90 at our shop · 5 L tin €84.95',
    priceAmount: 13.9,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/cretan-heritage-one-root.webp', alt: 'Bottle of Cretan Heritage One Root extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Cretan Heritage One Root (Mia Riza) — Koroneiki, Crete', description: 'The everyday Koroneiki from Kissamos, named for the first tree the family planted: pressed around 27 °C, in 500 ml and 5 L tins. Athena Silver 2025.' },
    detail: {
      location: 'Sfakopigadi, Kissamos, Chania, Crete, Greece',
      tags: ['Medium', 'Monocultivar Koroneiki', 'Everyday', '5 L tin'],
      description: 'Mia Riza — “one root” — is the Koroneiki line and the one to cook with: priced as an everyday oil and offered in a five-litre tin as well as the bottle. The producer picks at what it calls a satisfying ripening stage and avoids overripe fruit, pressing the same day at about 27 °C. No polyphenol figure or acidity is published; Berlin’s 2025 Gold was given “for remarkably high polyphenol content”, in the producer’s words, and Athena placed it Silver in 2025 in the competition’s own list. Green herbs, fresh-picked olive and a clearly peppery finish, in our partner’s description. The shop lists a PDO; no producer or competition source names one, so we do not.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Harvest', 'October to January window (producer)'],
        ['Polyphenols', 'Not published as a figure'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Same-day, ~27 °C (producer)'],
        ['Formats', '500 ml · 3 L · 5 L tin'],
      ],
      awards: ['Silver · Athena IOOC 2025', 'Gold (polyphenol) · Berlin GOOA 2025', 'Gold · Athena IOOC 2023', 'Gold · Athena IOOC 2022', 'Gold · London IOOC 2022', 'Gold · Berlin GOOA 2022'],
      origin: { mapPlaceholder: 'Region map · Kissamos, Crete', note: 'Kissamos is the westernmost olive country on Crete, where the Koroneiki groves run down to the sea; the producer says the trees “inhale the breeze of the Cretan Sea”.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Everyday cooking', 'Roast vegetables', 'Greek salad', 'Beans'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'cretan-heritage-one-root-bio',
    name: 'Cretan Heritage One Root Bio',
    producer: 'Cretan Heritage',
    producerSlug: 'cretan-heritage',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-one-root-bio',
    price: '500 ml · €14.90 at our shop · 3 L €59.95 · 5 L €89.95',
    priceAmount: 14.9,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/cretan-heritage-one-root-bio.webp', alt: 'Bottle of Cretan Heritage One Root Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Cretan Heritage One Root Bio — Organic Koroneiki, Crete', description: 'Organic Koroneiki from the Sfakopigadi groves near Kissamos, the certified twin of One Root, in 500 ml, 3 L and 5 L. No separate chemistry published.' },
    detail: {
      location: 'Sfakopigadi, Kissamos, Chania, Crete, Greece',
      tags: ['Medium', 'Organic', 'Monocultivar Koroneiki', '5 L tin'],
      description: 'The organic-certified version of One Root: the same Koroneiki from Sfakopigadi, pressed the same way, under EU organic certification. The producer publishes no chemistry and no medal list specific to the Bio — its posts do not separate the two One Roots — so the page stays with what is known: the variety, the grove, the method, and the certification. Expect the same profile as the conventional oil, green and peppery, at an everyday price with a tin for the kitchen.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Harvest', 'October to January window (producer)'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Certification', 'EU organic (certifier not published)'],
        ['Formats', '500 ml · 3 L · 5 L tin'],
      ],
      awards: [],
      origin: { mapPlaceholder: 'Region map · Kissamos, Crete', note: 'Same grove as One Root; the organic certification applies to the parcels at Sfakopigadi the producer names on the shop listing.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Everyday cooking', 'Roast vegetables', 'Greek salad', 'Beans'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'corinto-manaki',
    name: 'Corinto Extra Virgin',
    producer: 'Corinto',
    producerSlug: 'corinto',
    cultivar: 'Manaki',
    region: 'Peloponnese · Greece',
    intensity: 'Delicate',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/corinto-extra-vierge-olijfolie-500ml',
    price: '500 ml · €17.95 at our shop · 5 L tin €84.95',
    priceAmount: 17.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/corinto-manaki.webp', alt: 'Bottle of Corinto Extra Virgin extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Corinto Extra Virgin — 100% Manaki, Corinthia', description: 'Manaki from the coastal plain at Lechaio, west of Corinth: a soft, low-bitterness oil with grass, tomato and almond from the producer’s own mill.' },
    detail: {
      location: 'Lechaio, Corinthia, Peloponnese, Greece',
      tags: ['Delicate', 'Monocultivar Manaki', 'Everyday', '5 L tin'],
      description: 'The base oil of the range and an introduction to Manaki, the Peloponnesian variety that gives softer, less bitter oil than Koroneiki and is almost unknown outside Greece. Harvested mid-October to early December at Lechaio and cold-extracted at the company’s own mill; the producer describes a full taste, low acidity and a smooth finish with a touch of spice, and names cut grass, tomato, banana peel, hillside herbs and almond. Athena registered its 2025 entry as Manaki 85% / Koroneiki 15% where the producer says 100% Manaki; we print the producer’s statement and note the difference. Free acidity of 0.32% is from a laboratory report our partner shop holds.',
      facts: [
        ['Cultivar', '100% Manaki (producer); Athena 2025 entry registered 85/15 with Koroneiki'],
        ['Harvest', 'Mid-October to early December'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', '0.32% (partner shop’s laboratory report)'],
        ['Extraction', 'Cold, no heating, own FSSC 22000 mill (producer)'],
        ['Formats', '500 ml · 5 L tin'],
      ],
      awards: ['Silver · London IOOC 2022', 'Bronze · Athena IOOC 2025'],
      origin: { mapPlaceholder: 'Region map · Lechaio, Corinthia', note: 'Manaki is the olive of the north-east Peloponnese — Argolida and Corinthia — small-fruited and aromatic, pressed into a mild oil the region keeps for itself.', linkLabel: 'Manaki — the variety', linkHref: '/cultivars/manaki/' },
      pairings: ['Everyday cooking', 'Fish', 'Salads', 'Baking'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'corinto-bio',
    name: 'Corinto Bio',
    producer: 'Corinto',
    producerSlug: 'corinto',
    cultivar: 'Manaki',
    region: 'Peloponnese · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/corinto-bio-griekse-extra-vierge-olijfolie',
    price: '500 ml · €19.95 at our shop · 5 L tin €94.95',
    priceAmount: 19.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/corinto-bio.webp', alt: 'Bottle of Corinto Bio extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Corinto Bio — Organic Early-Harvest Manaki, Corinthia', description: 'Organic Manaki picked early at Lechaio: greener and more peppery than the regular Corinto; 448 mg/kg polyphenols by lab report. Athena Bronze 2025.' },
    detail: {
      location: 'Lechaio, Corinthia, Peloponnese, Greece',
      tags: ['Medium', 'Organic', 'Monocultivar Manaki', 'Early harvest'],
      description: 'The same Manaki as the regular Corinto, grown organically and picked earlier in the season, which is what moves it from delicate to medium: more green fruit, more pepper, a shade more bitterness. Athena placed it Bronze in 2025 as “Corinto Organic”, 100% Manaki, in the competition’s published results. The only chemistry in circulation — 448 mg/kg polyphenols and 0.38% free acidity — is from a laboratory report held by our partner shop rather than a public page, and is labelled as such. Sold in 500 ml and a five-litre tin for daily use.',
      facts: [
        ['Cultivar', '100% Manaki'],
        ['Harvest', 'Early, within the mid-October to early December window'],
        ['Polyphenols', '448 mg/kg (partner shop’s laboratory report)'],
        ['Free acidity', '0.38% (same report)'],
        ['Certification', 'EU organic (certifier not published)'],
        ['Formats', '500 ml · 5 L tin'],
      ],
      awards: ['Bronze · Athena IOOC 2025'],
      origin: { mapPlaceholder: 'Region map · Lechaio, Corinthia', note: 'The groves sit behind Corinth’s ancient western harbour at Lechaio, on the plain between the Gulf and the first hills.', linkLabel: 'Manaki — the variety', linkHref: '/cultivars/manaki/' },
      pairings: ['Salads', 'Grilled vegetables', 'Fish', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'corinto-high-phenolic',
    name: 'Corinto High-Phenolic',
    producer: 'Corinto',
    producerSlug: 'corinto',
    cultivar: 'Koroneiki · Nemoutiana',
    region: 'Peloponnese · Greece',
    intensity: 'Robust',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/corinto-high-phenolic-olijfolie',
    price: '500 ml · €41.95 at our shop',
    priceAmount: 41.95,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/corinto-high-phenolic.webp', alt: 'Bottle of Corinto High-Phenolic extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Corinto High-Phenolic — Early Koroneiki & Nemoutiana', description: 'Corinto’s one non-Manaki oil: an early-October Koroneiki–Nemoutiana blend made for the polyphenol claim, 639 mg/kg by NMR for 2025/26. Intense.' },
    detail: {
      location: 'Lechaio, Corinthia, Peloponnese, Greece',
      tags: ['Robust', 'High phenolic', 'Early harvest', 'Organic'],
      description: 'The outlier in the Corinto range: not Manaki but an early-October blend of Koroneiki and the rarer Nemoutiana, picked green specifically for phenolic content and positioned on the EU 432/2012 health claim. The 2025/26 figure is 639 mg/kg by NMR — published on a reseller’s listing and repeated by our partner, with the honest note that it declines over the oil’s life. Intense green fruit, pronounced bitterness and a long, hot finish, in the producer’s words. It has no competition record; it is sold on its number and its taste, and priced accordingly.',
      facts: [
        ['Cultivar', 'Koroneiki and Nemoutiana, early harvest'],
        ['Harvest', 'Early October, 2025/26'],
        ['Polyphenols', '639 mg/kg, NMR (reseller listing; figure declines with age)'],
        ['Free acidity', 'Not published'],
        ['Certification', 'EU organic; EU 432/2012 claim stated'],
        ['Formats', '500 ml'],
      ],
      awards: [],
      origin: { mapPlaceholder: 'Region map · Lechaio, Corinthia', note: 'Nemoutiana is a minor Peloponnesian variety from the hills of Achaea and Corinthia, rarely bottled on its own; here it is the partner to Koroneiki.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Raw, by the spoon', 'Bitter greens', 'Grilled meat', 'Soups'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'corinto-manaki-limited-edition',
    name: 'Corinto Manaki Limited Edition',
    producer: 'Corinto',
    producerSlug: 'corinto',
    cultivar: 'Manaki',
    region: 'Peloponnese · Greece',
    intensity: 'Medium',
    inShop: true,
    shopUrl: 'https://olijfoliemarkt.nl/products/corinto-manaki-limited-edition',
    price: '500 ml · €39.90 at our shop',
    priceAmount: 39.9,
    priceCurrency: 'EUR',
    image: { src: 'assets/img/corinto-manaki-limited-edition.webp', alt: 'Bottle of Corinto Manaki Limited Edition extra virgin olive oil', fit: 'contain', w: 900, h: 900 },
    seo: { title: 'Corinto Manaki Limited Edition — NYIOOC Gold 2026', description: 'A numbered early-harvest Manaki micro-batch from Lechaio, extracted below 27 °C: NYIOOC Gold 2026, herbaceous with fennel and a peach-like sweetness.' },
    detail: {
      location: 'Lechaio, Corinthia, Peloponnese, Greece',
      tags: ['Medium', 'Monocultivar Manaki', 'Numbered batch', 'NYIOOC Gold 2026'],
      description: 'The top of the Corinto range and the oil that put the name on the NYIOOC list: a small, numbered batch of early-harvest Manaki in a dark bottle, extracted below 27 °C. New York’s 2026 judges gave it Gold in the medium class and described herbaceous notes and fennel rounded by ripe fruit and a peach-like sweetness — an unusually precise note for a variety most tasters have never met. The polyphenol and oleocanthal figures come from a laboratory report held by our partner shop and are not reproduced on any producer or competition page; the bottle count is not published.',
      facts: [
        ['Cultivar', '100% Manaki, early harvest'],
        ['Harvest', '2025/26, early'],
        ['Polyphenols', '512 mg/kg, HPLC, of which 218 mg/kg oleocanthal (partner shop’s laboratory report)'],
        ['Free acidity', '0.19% (same report)'],
        ['Extraction', 'Cold, below 27 °C'],
        ['Formats', '500 ml, numbered'],
      ],
      awards: ['Gold · NYIOOC 2026'],
      origin: { mapPlaceholder: 'Region map · Lechaio, Corinthia', note: 'The 2026 NYIOOC result is on the competition’s news site, which also ranks Corinto 28th among Greek producers for the year.', linkLabel: 'Manaki — the variety', linkHref: '/cultivars/manaki/' },
      pairings: ['Raw, on fish', 'Fennel and citrus salads', 'Fresh cheese', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'terra-creta-grand-cru',
    name: 'Terra Creta Grand Cru',
    producer: 'Terra Creta',
    producerSlug: 'terra-creta',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: { title: 'Terra Creta Grand Cru — Koroneiki, Kolymvari, Crete', description: 'The single-variety Koroneiki selection of Crete’s largest premium brand, milled within twelve hours: Mario Solinas first prize 2021, NYIOOC Gold 2026.' },
    detail: {
      location: 'Kolymvari, Chania, Crete, Greece',
      tags: ['Medium', 'Monocultivar Koroneiki', 'Mario Solinas 2021', 'NYIOOC Gold 2026'],
      description: 'Terra Creta’s selection oil, chosen from Koroneiki milled in the company’s own facility within twelve hours of picking. Green almond, flowers and citrus on the nose, green pepper, artichoke and herbs on the palate, by the producer. The IOC’s Mario Solinas jury put it first in the mild green fruitiness class in 2021; NYIOOC gave it Gold in 2026 as a medium-intensity monovarietal, and the EVOO World Ranking has had it as the top Greek oil for several years. Polyphenols and acidity are not published beyond “extremely low acidity”.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Harvest', 'Not published for this oil (company window October–December)'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', '“Extremely low” (producer), no figure'],
        ['Extraction', 'Cold, within 12 hours of harvest (producer)'],
        ['Formats', '500 ml'],
      ],
      awards: ['Gold · NYIOOC 2026', 'Grand Prestige Gold · Terraolivo 2026', 'First Prize, mild green fruitiness · Mario Solinas 2021', '#1 Greek oil · EVOO World Ranking 2025'],
      origin: { mapPlaceholder: 'Region map · Kolymvari, Crete', note: 'Kolymvari, west of Chania, is the PDO zone for Kolymvari Chanion Kritis; Terra Creta’s Estate line carries the PDO, its Platinum line PGI Chania.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Salads', 'Fish', 'Vegetables', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'biolea-astrikas-estate',
    name: 'Biolea Astrikas Estate Organic',
    producer: 'Biolea — Astrikas Estate',
    producerSlug: 'biolea',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Biolea Astrikas Estate — Stone-Milled Organic Koroneiki', description: 'Single-estate organic Koroneiki from above Kolymvari, crushed with granite millstones and pressed hydraulically: tomato, nuts and wild herbs, by the producer.' },
    detail: {
      location: 'Astrikas, Kolymvari, Chania, Crete, Greece',
      tags: ['Stone-milled', 'Organic', 'Single estate', 'PDO'],
      description: 'The estate oil of Crete’s stone-mill holdout: Koroneiki from the Dimitriadis family’s groves at Astrikas, crushed under modernised granite stones and pressed on hydraulic presses with stainless-steel filters, the way the island did it before centrifuges. Organic with BioHellas since 1993, PDO-certified annually and carrying an EU 432/2012 claim, all by the producer. “A unique fruitiness, notes of tomato, nuts and wild herbs and a pleasant spicy aftertaste”, in its own words; elsewhere it calls the oil mild and sweet. No recent competition result and no producer-published polyphenol figure — a retailer’s NMR number for one lot is not reproduced here.',
      facts: [
        ['Cultivar', 'Koroneiki (share not stated)'],
        ['Harvest', 'Not published'],
        ['Polyphenols', '“High” with EU 432/2012 claim (producer), no figure published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Stone mill, hydraulic press, cold (producer)'],
        ['Certification', 'Organic (BioHellas, since 1993) · PDO · ISO 22000'],
      ],
      awards: [],
      origin: { mapPlaceholder: 'Region map · Astrikas, Crete', note: 'Astrikas is a hill village a few kilometres inland from Kolymvari; the estate is also a visitor mill, open for tours and tastings.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Bread', 'Tomato salads', 'Beans', 'Roast vegetables'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'pamako-monovarietal-tsounati',
    name: 'Pamako Monovarietal Tsounati',
    producer: 'Pamako',
    producerSlug: 'pamako',
    cultivar: 'Tsounati',
    region: 'Crete · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Pamako Monovarietal Tsounati — 1,222 mg/kg, Crete', description: 'Organic Tsounati from ~1,200 century-old trees at 650 m in south-west Crete, with a University of Athens NMR certificate: 1,222 mg/kg total phenols, 2024.' },
    detail: {
      location: 'Selino, Chania, Crete, Greece',
      tags: ['High phenolic', 'Monocultivar Tsounati', 'Organic', 'Mountain grove'],
      description: 'A mountain Tsounati from old trees above Sougia and Paliochora, picked in several passes as the fruit ripens and pressed at the owner’s own facility. What distinguishes it is the certificate: each harvest is analysed by NMR at the National and Kapodistrian University of Athens and the producer publishes the document. For 2024 that is 1,222 mg/kg total phenols, with oleocanthal 372, oleacein 262 and oleuropein aglycone 233 mg/kg — among the highest producer-certified figures in this library. Fresh and fruity with strong spicy elements and a soft bitterness, by the producer; artichoke to ripe tomato, in an Olive Oil Times tasting. Registered as a food supplement in Belgium.',
      facts: [
        ['Cultivar', '100% Tsounati'],
        ['Harvest', 'Staged picking, 2024 harvest certified; months not published'],
        ['Polyphenols', '1,222 mg/kg total phenols, NMR, Univ. of Athens cert. C2425-00285, Nov 2024 (producer-published)'],
        ['Oleocanthal', '372 mg/kg; oleacein 262 mg/kg (same certificate)'],
        ['Free acidity', 'Not published'],
        ['Certification', 'EU organic · EU 432/2012 claim since 2013 · BE food-supplement registration 2019'],
      ],
      awards: ['Gold · NYIOOC 2020', 'Gold (Blend) · NYIOOC 2022'],
      origin: { mapPlaceholder: 'Region map · Selino, Crete', note: 'Selino is the south-western district of Chania, mountainous and sparsely planted; the Tsounati trees here are described by the producer as monumental, with some 10,000 Koroneiki lower down near Maleme.', linkLabel: 'Tsounati — the variety', linkHref: '/cultivars/tsounati/' },
      pairings: ['Raw, by the spoon', 'Bitter greens', 'Grilled meat', 'Pulses'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'oleum-crete-pdo-messara',
    name: 'Oleum Crete PDO Messara',
    producer: 'Oleum Crete — Kydonakis Bros',
    producerSlug: 'oleum-crete',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Delicate',
    inShop: false,
    image: null,
    seo: { title: 'Oleum Crete PDO Messara — Koroneiki, Tympaki, Crete', description: 'Kydonakis Bros’ PDO Messara Koroneiki from the southern Cretan plain, cold-processed at the family’s 1983 mill: golden-green, delicately fruity, peppery.' },
    detail: {
      location: 'Tympaki, Messara, Heraklion, Crete, Greece',
      tags: ['Delicate', 'Monocultivar Koroneiki', 'PDO Messara'],
      description: 'The house oil of a 1983 family mill on the Messara plain, Koroneiki under PDO Messara, malaxed at no more than 27 °C for no more than forty minutes in an FSSC 22000 plant. The producer describes a vibrant golden-green colour, a delicate fruity aroma and a balanced, peppery flavour — a soft, everyday style rather than a bitter early harvest, which is why it sits at the delicate end here. An organic twin, PDO Messara Bio, placed higher in the 2025 EVOO World Ranking (#55 against #60 among Greek oils). The “100+ international awards” the company claims are not itemised by year.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Designation', 'PDO Messara (cert. POC/2403-20889.13, producer)'],
        ['Harvest', 'Not published for this oil'],
        ['Polyphenols', '“High” (producer), no figure'],
        ['Free acidity', 'Not published for this oil'],
        ['Extraction', '≤ 27 °C, ≤ 40 min malaxation, FSSC 22000 plant (producer)'],
      ],
      awards: ['#60 Greek oil · EVOO World Ranking 2025', '#55 Greek oil (PDO Messara Bio) · EVOO World Ranking 2025'],
      origin: { mapPlaceholder: 'Region map · Tympaki, Crete', note: 'The Messara is the broad plain of southern Heraklion between Psiloritis and the Asterousia hills, Crete’s biggest olive basin; Tympaki is at its western end near the coast.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Everyday cooking', 'Salads', 'Fish', 'Vegetables'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'agia-marina-premium',
    name: 'Agia Marina Premium',
    producer: 'Collias Estates — Agia Marina',
    producerSlug: 'collias-estates',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: { title: 'Agia Marina Premium — PGI Chania Koroneiki, NYIOOC Gold', description: 'A gravity-filtered single-estate Koroneiki from the coast west of Chania under PGI Chania: green apple, cut grass and artichoke. NYIOOC Gold 2025.' },
    detail: {
      location: 'Agia Marina, Chania, Crete, Greece',
      tags: ['Medium', 'Monocultivar Koroneiki', 'PGI Chania', 'NYIOOC Gold 2025'],
      description: 'An owner-run estate oil from Agia Marina on the north coast west of Chania: Koroneiki pressed within hours and left to settle under gravity rather than spun through a centrifuge, under PGI Chania Kritis. Green apple, fresh-cut grass and artichoke, finishing with a light peppery touch, in the producer’s words; NYIOOC listed it medium in 2025 and gave it Gold, as reported by Olive Oil Times. Polyphenols are not published and acidity is given only as a range. Sold mainly direct to US customers.',
      facts: [
        ['Cultivar', '100% Koroneiki'],
        ['Designation', 'PGI Chania Kritis'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', '0.3–0.6% (producer’s range)'],
        ['Filtration', 'Gravity-filtered'],
      ],
      awards: ['Gold · NYIOOC 2025'],
      origin: { mapPlaceholder: 'Region map · Agia Marina, Crete', note: 'Agia Marina is a coastal village on the Gulf of Chania, between the town and the Rodopou peninsula.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Salads', 'Fish', 'Vegetables', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'chrisopigi-pdo-sitia',
    name: 'Chrisopigi PDO Sitia',
    producer: 'Chrisopigi',
    producerSlug: 'chrisopigi',
    cultivar: 'Koroneiki',
    region: 'Crete · Greece',
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: { title: 'Chrisopigi PDO Sitia — Koroneiki, Eastern Crete', description: 'The Lasithiotakis family’s Koroneiki from a 400 m hill village under PDO Sitia: NYIOOC Gold and Best in Class Koroneiki 2017, Athena Bronze 2025.' },
    detail: {
      location: 'Chrisopigi, Sitia, Lasithi, Crete, Greece',
      tags: ['Medium', 'Monocultivar Koroneiki', 'PDO Sitia'],
      description: 'Eastern Crete’s entry: a family Koroneiki from Chrisopigi, a village at 400 metres in the Sitia hills, milled by the family and bottled under PDO Sitia Lasithiou Kritis. Its moment was 2017, when NYIOOC gave it Gold and Best in Class for the variety, listing it as medium; the recent record is a Bronze at Athena 2025. The producer states an EU 432/2012 health claim without printing a figure, and gives free acidity as 0.1–0.3%, with a laboratory result of 0.25% from November 2025. “Rich and fruity”, in its own two words.',
      facts: [
        ['Cultivar', 'Koroneiki (share not stated)'],
        ['Designation', 'PDO Sitia Lasithiou Kritis'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'EU 432/2012 claim stated (producer), no figure'],
        ['Free acidity', '0.25% (producer’s analysis, Nov 2025); 0.1–0.3% stated range'],
        ['Certification', 'PDO · ISO 22000'],
      ],
      awards: ['Bronze · Athena IOOC 2025', 'Gold & Best in Class Koroneiki · NYIOOC 2017', 'Prestige Gold · Terraolivo 2015'],
      origin: { mapPlaceholder: 'Region map · Sitia, Crete', note: 'Sitia, at the eastern tip of Crete, has its own PDO; the groves are drier and higher than Chania’s, and the oils tend to be fruitier and softer.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Dakos', 'Salads', 'Pulses', 'Fish'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'laconiko-extra-virgin',
    name: 'Laconiko Extra Virgin',
    producer: 'Laconiko',
    producerSlug: 'laconiko',
    cultivar: 'Koroneiki',
    region: 'Peloponnese · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Laconiko Extra Virgin — Early-Harvest Koroneiki, Laconia', description: 'Single-estate Koroneiki picked green in November by the Evrotas estuary, ~578 mg/kg by the producer; Athena 2025 Double Gold, Best of Greece, Best Koroneiki.' },
    detail: {
      location: 'Skala, Laconia, Peloponnese, Greece',
      tags: ['Monocultivar Koroneiki', 'Early harvest', 'Athena Best of Greece 2025'],
      description: 'The Pierrakos brothers’ estate oil from 5,000 Koroneiki trees a few metres from the sea at Skala, picked green in November and sold under the family name since 2009. Grassy and artichoke-led with a smooth start and a peppery finish, by the producer, which also gives about 578 mg/kg polyphenols and 0.17% free acidity without naming the method. Athena’s 2025 published results gave it Double Gold, Best of Greece and Best Koroneiki in the world; the producer reports two Golds and two Silvers at NYIOOC 2025 for the range without saying which oil took which. Neither Athena nor the producer states an intensity class.',
      facts: [
        ['Cultivar', '100% Koroneiki, early harvest'],
        ['Harvest', 'November'],
        ['Polyphenols', '~578 mg/kg (producer; method not stated)'],
        ['Free acidity', '0.17% (producer)'],
        ['Certification', 'None stated; EU health-claim wording on the label'],
        ['Formats', '500 ml and larger'],
      ],
      awards: ['Double Gold · Athena IOOC 2025', 'Best of Greece · Athena IOOC 2025', 'Best Koroneiki Worldwide · Athena IOOC 2025'],
      origin: { mapPlaceholder: 'Region map · Skala, Laconia', note: 'Skala lies where the Evrotas reaches the Laconian Gulf, in a Natura 2000 wetland; the groves are flat, coastal and sandy, unusual for Greek Koroneiki.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Salads', 'Grilled vegetables', 'Fish', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'kyklopas-ages-pdo-makris',
    name: 'Kyklopas Ages PDO Makris',
    producer: 'Kyklopas',
    producerSlug: 'kyklopas',
    cultivar: 'Makri',
    region: 'Thrace · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Kyklopas Ages PDO Makris — Early-Harvest Makri, Thrace', description: 'The only PDO oil from Thrace: early-picked Makri from the Kelidis family mill near Alexandroupoli. Athena Double Gold and Best of Thrace 2025.' },
    detail: {
      location: 'Makri, Evros, Thrace, Greece',
      tags: ['Monocultivar Makri', 'PDO Makris', 'Early harvest', 'Athena Best of Thrace 2025'],
      description: 'An oil from the northern edge of the olive’s range: the Makri variety grows around one village near Alexandroupoli and almost nowhere else, and the Kelidis family’s mill, founded 1982, presses it early under PDO Makris. Ripe banana, freshly cut grass, hints of tomato and green apple, green almond and black pepper, in the producer’s and its retailer’s descriptors. Athena’s 2025 published results gave Ages Organic Double Gold and Best of Thrace, and the 2026 list gives Ages Limited Reserve Gold and Best of Thrace. One producer post reports a lot at 812 mg/kg polyphenols and 0.13% acidity — undated, method not given — so it is quoted here and not metered.',
      facts: [
        ['Cultivar', '100% Makri, early harvest'],
        ['Designation', 'PDO Makris'],
        ['Harvest', 'Early (agourelaio); months not published'],
        ['Polyphenols', '812 mg/kg for one lot (producer post, undated, method not stated); 2025/26 lot awaiting results'],
        ['Free acidity', '0.13% (same post); “< 0.2%” (retailer)'],
        ['Certification', 'PDO; Ages Organic is EU organic'],
      ],
      awards: ['Double Gold (Ages Organic) · Athena IOOC 2025', 'Best of Thrace · Athena IOOC 2025', 'Gold & Best of Thrace (Ages Limited Reserve) · Athena IOOC 2026'],
      origin: { mapPlaceholder: 'Region map · Makri, Evros', note: 'Makri sits on the Thracian coast west of Alexandroupoli, in Greece’s far north-east; the variety carries the village’s name and the PDO is the region’s only one.', linkLabel: null, linkHref: null },
      pairings: ['Salads', 'Grilled fish', 'Vegetables', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'the-governor-limited-edition',
    name: 'The Governor Limited Edition',
    producer: 'The Governor — Olive Fabrica',
    producerSlug: 'the-governor',
    cultivar: 'Lianolia',
    region: 'Ionian Islands · Greece',
    intensity: 'Robust',
    inShop: false,
    image: null,
    seo: { title: 'The Governor Limited Edition — Unfiltered Lianolia, Corfu', description: 'Corfu’s high-phenolic Lianolia, picked in early October and bottled unfiltered, hand-numbered: 1,316 mg/kg total phenols, 577 mg/kg oleocanthal (WOCH).' },
    detail: {
      location: 'Agios Matthaios, Corfu, Ionian Islands, Greece',
      tags: ['Robust', 'High phenolic', 'Unfiltered', 'Monocultivar Lianolia'],
      description: 'The earliest, unfiltered bottling from the Dafnis brothers’ old Lianolia trees in south-west Corfu — a variety the island mostly sends to bulk, here picked in the first weeks of October and bottled cloudy, hand-numbered, in a run of seven to nine thousand bottles. Fresh-cut grass, rocket and green herbs with light floral hints, balanced bitterness and a persistent peppery finish, robust and complex, by the producer. The phenol figures — 1,316 mg/kg total, oleocanthal 577, oleacein 298 — were analysed by WOCH and are published by the brand’s UK site. Its medal run peaked between 2013 and 2020; the recent record is a Great Taste star in 2026.',
      facts: [
        ['Cultivar', '100% Lianolia Kerkyras'],
        ['Harvest', 'First weeks of October, 2025/26'],
        ['Polyphenols', '1,316 mg/kg total; oleocanthal 577, oleacein 298 mg/kg (WOCH analysis, published by the brand)'],
        ['Free acidity', 'Not published'],
        ['Filtration', 'Unfiltered, hand-numbered'],
        ['Certification', 'Organic (DIO), non-irrigated (brand site)'],
      ],
      awards: ['One star · Great Taste 2026', 'Silver · NYIOOC 2020'],
      origin: { mapPlaceholder: 'Region map · Agios Matthaios, Corfu', note: 'Corfu is planted almost entirely to Lianolia, tall old trees once harvested from nets over months; the Governor’s October picking is the opposite of the island habit.', linkLabel: null, linkHref: null },
      pairings: ['Raw, by the spoon', 'Bitter greens', 'Grilled meat', 'Soups'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'yannis-finest',
    name: 'Yanni’s Finest',
    producer: 'Yanni’s Olive Grove',
    producerSlug: 'yannis-olive-grove',
    cultivar: 'Chondrolia',
    region: 'Chalkidiki · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Yanni’s Finest — Early-Harvest Chondrolia, Chalkidiki', description: 'One of the few extra virgins from Chalkidiki’s big green table olive, Chondrolia, picked mid-September on a waterfront estate with its own mill.' },
    detail: {
      location: 'Nea Potidaia, Chalkidiki, Macedonia, Greece',
      tags: ['Early harvest', 'Chondrolia', 'Own mill'],
      description: 'A green early-harvest oil from grafted wild and Chondrolia Chalkidikis trees on the Prodromou family’s waterfront estate at Nea Potidaia, pressed at their own plant minutes away — a rare use of the big Chalkidiki table olive for oil. Hand-picked from mid-September. The World Olive Center lists its polyphenols in the 250–499 mg/kg band for the 2019/20 lots without a figure or method, and the producer publishes no tasting note we could find. NYIOOC Gold in 2016 and an EVOOLEUM TOP100 placing the same year are on the producer’s awards page, which stops at 2019–2020; nothing more recent was found, and the site was down when checked. Listed with that disclosure.',
      facts: [
        ['Cultivar', 'Chondrolia Chalkidikis and grafted wild stock (share not published)'],
        ['Harvest', 'Mid-September to mid-October, hand-picked'],
        ['Polyphenols', '250–499 mg/kg band, 2019/20 lots (WOCH listing), no figure'],
        ['Free acidity', 'Not published'],
        ['Certification', 'Organic (per WOCH); PDO Agoureleo Chalkidikis on the Limited line'],
        ['Mill', 'Own plant, Nea Tenedos'],
      ],
      awards: ['Gold · NYIOOC 2016', 'TOP100 (Family) · EVOOLEUM 2016'],
      origin: { mapPlaceholder: 'Region map · Nea Potidaia, Chalkidiki', note: 'Chalkidiki is table-olive country — Chondrolia is the green olive on every Greek meze — so an early-harvest oil from it is an outlier by design.', linkLabel: null, linkHref: null },
      pairings: ['Salads', 'Grilled vegetables', 'Fish', 'Bread'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'fyllikon-first-harvest',
    name: 'Fyllikon First Harvest Organic',
    producer: 'Sakellaropoulos Organic Farms',
    producerSlug: 'sakellaropoulos',
    cultivar: 'Koroneiki',
    region: 'Peloponnese · Greece',
    intensity: 'Not stated',
    inShop: false,
    image: null,
    seo: { title: 'Fyllikon First Harvest — Sakellaropoulos, Sparta', description: 'The earliest oil of a Laconian estate organic since 1992: unripe Koroneiki from mid-September, extracted at 16–18 °C, unfiltered. London Platinum 2026.' },
    detail: {
      location: 'Skoura, Sparta, Laconia, Peloponnese, Greece',
      tags: ['Early harvest', 'Organic', 'Unfiltered', 'London IOOC Platinum 2026'],
      description: 'Sakellaropoulos’s first-harvest oil, picked very unripe from mid-September to early October and extracted at 16–18 °C within hours, unfiltered — the greenest expression of the estate’s Koroneiki. Intense aromas of freshly picked green olives and fresh herbs, with a prolonged, complex, fresh aftertaste, in the producer’s words. It has been used in Harvard and Yale diet research, and the producer’s medal count for the whole range runs past 1,300, chiefly at London, Olympia and the EVOO World Ranking. The producer says its oils exceed 2,000 mg/kg polyphenols but publishes no dated per-oil certificate; a retailer prints 1,825 mg/kg by NMR for an unspecified lot. Neither is given a meter here.',
      facts: [
        ['Cultivar', 'Koroneiki, monovarietal'],
        ['Harvest', 'Mid-September to early October, very unripe'],
        ['Polyphenols', '“1,000+ mg/kg” (WOCH listing); producer states > 2,000 mg/kg for its oils without a per-lot certificate'],
        ['Free acidity', '“Very low” (producer), no figure'],
        ['Extraction', '16–18 °C, within hours, unfiltered (producer)'],
        ['Certification', 'Organic (Bio-Hellas)'],
      ],
      awards: ['Platinum · London IOOC 2026', 'EVOO of the Year · EVOO World Ranking 2025'],
      origin: { mapPlaceholder: 'Region map · Skoura, Sparta', note: 'Skoura lies in the Evrotas valley below Sparta, between the Taygetos and Parnon ranges — Laconia’s classic Koroneiki country.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Raw, by the spoon', 'Bitter greens', 'Pulses', 'Grilled meat'],
      reviews: [],
    },
  },
  {
    score: null,
    stars: 0,
    reviews: 0,
    readerScore: null,
    readerStars: 0,
    slug: 'iliada-kalamata-pdo',
    name: 'Iliada Kalamata PDO',
    producer: 'Agrovim — Iliada',
    producerSlug: 'agrovim',
    cultivar: 'Koroneiki',
    region: 'Peloponnese · Greece',
    intensity: 'Medium',
    inShop: false,
    image: null,
    seo: { title: 'Iliada Kalamata PDO — Agrovim, Messinia', description: 'The most widely exported Kalamata: PDO Koroneiki from Agrovim’s grower network, green-harvested and cold-extracted within 24 hours. NYIOOC Gold 2025.' },
    detail: {
      location: 'Kalamata, Messinia, Peloponnese, Greece',
      tags: ['Medium', 'Monocultivar Koroneiki', 'PDO Kalamata', 'Benchmark'],
      description: 'Included as the benchmark: the PDO Kalamata most people outside Greece have actually tasted, bottled by the Gyfteas family’s Agrovim from a network of Messinian growers rather than one estate. Unripe green Koroneiki cold-extracted within 24 hours, medium fruity — green banana, artichoke, cut grass, tomato and dried nuts with a slight peppery finish — in the producer’s sheet. A 2025 NYIOOC Gold is reported through a retailer citing the company; Athena 2025 gave the Iliada line several medals in its published results. Polyphenols and acidity are not published. A reliable, consistent oil rather than a rare one.',
      facts: [
        ['Cultivar', '100% Koroneiki, green harvest'],
        ['Designation', 'PDO Kalamata'],
        ['Harvest', 'Not published'],
        ['Polyphenols', 'Not published'],
        ['Free acidity', 'Not published'],
        ['Extraction', 'Cold, within 24 hours (producer)'],
      ],
      awards: ['Gold · NYIOOC 2025', 'Medals, Iliada line · Athena IOOC 2025', 'Gold · Terraolivo 2024'],
      origin: { mapPlaceholder: 'Region map · Kalamata, Messinia', note: 'Kalamata PDO covers oil, not just the table olive of the same name; the zone is the Messinian plain and hills around the city, Koroneiki almost exclusively.', linkLabel: 'Koroneiki — the variety', linkHref: '/cultivars/koroneiki/' },
      pairings: ['Everyday cooking', 'Greek salad', 'Fish', 'Vegetables'],
      reviews: [],
    },
  },
  ],

  /* ── regions ─────────────────────────────────────────────────────────── */
  regions: [
    { slug: 'andalusia',   name: 'Andalusia',   count: 64, image: null },
    { slug: 'tuscany',     name: 'Tuscany',     count: 48, image: null },
    { slug: 'crete',       name: 'Crete',       count: 31, image: null },
    { slug: 'sicily',      name: 'Sicily',      count: 27, image: null },
    { slug: 'alentejo',    name: 'Alentejo',    count: 22, image: null },
    { slug: 'peloponnese', name: 'Peloponnese', count: 19, image: null },
  ],

  /* ── guides teased on the homepage ───────────────────────────────────────
     `href: null` means the guide is not written yet: the card renders without
     a link rather than pointing at a 404. Give it a URL once the matching
     record exists in `guides` below. */
  /* ── learn categories ───────────────────────────────────────────────────
     The v2 hub draws a six-card category grid. Only the categories that have
     something in them are defined here: a card promising "Competitions &
     awards" that opens onto nothing is worse than no card. The rest arrive
     with their first guide. */
  learnCategories: [
    { slug: 'tasting', name: 'Tasting & judging',
      body: 'How the panel scores fruitiness, bitterness and pungency, and how to taste at home.' },
    { slug: 'kitchen', name: 'Kitchen & storage',
      body: 'Decanting, dark glass, heat, and how long an open bottle really lasts.' },
    { slug: 'buying', name: 'Buying & labels',
      body: 'Harvest dates, designations and the small print that tells you what is in the bottle.' },
    { slug: 'science', name: 'Science & numbers',
      body: 'Polyphenols, acidity, methods and what the figures on a technical sheet really measure.' },
    { slug: 'varieties', name: 'Varieties',
      body: 'The olive behind the oil: what each cultivar tends to taste like and why.' },
    { slug: 'regions', name: 'Regions',
      body: 'Jaén to the Edremit Gulf: the habits of each producing country and region.' },
    { slug: 'competitions', name: 'Competitions',
      body: 'How the medals are judged, what they mean, and which tables we republish.' },
  ],

  articles: [
    { slug: 'how-to-taste-olive-oil', category: 'tasting', kicker: 'Tasting', title: 'How to taste olive oil like our panel does', meta: '6 min read', href: '/learn/how-to-taste-olive-oil/', image: null },
    { slug: 'why-your-oil-goes-flat', category: 'kitchen', kicker: 'Storage', title: 'Why your oil goes flat, and how to stop it',  meta: '5 min read', href: '/learn/why-your-oil-goes-flat/', image: null },
    { slug: 'harvest-date-on-label',  category: 'buying', kicker: 'Buying',  title: 'What the harvest date on the label really tells you', meta: '5 min read', href: '/learn/harvest-date-on-label/', image: null },
    { slug: 'olive-oil-polyphenols-explained', category: 'science', kicker: 'Science', title: 'Olive oil polyphenols, explained: what the number means', meta: '7 min read', href: '/learn/olive-oil-polyphenols-explained/', image: null },
    { slug: 'is-high-phenolic-olive-oil-worth-it', category: 'science', kicker: 'Science', title: 'Is high-phenolic olive oil worth the price?', meta: '6 min read', href: '/learn/is-high-phenolic-olive-oil-worth-it/', image: null },
    { slug: 'olive-oil-acidity-explained', category: 'science', kicker: 'Science', title: 'Acidity: what 0.2% means, and why you cannot taste it', meta: '4 min read', href: '/learn/olive-oil-acidity-explained/', image: null },
    { slug: 'pdo-pgi-olive-oil-what-they-guarantee', category: 'buying', kicker: 'Buying', title: 'PDO and PGI olive oil: what the seals guarantee, and what they don’t', meta: '6 min read', href: '/learn/pdo-pgi-olive-oil-what-they-guarantee/', image: null },
    { slug: 'early-harvest-olive-oil-olio-nuovo', category: 'buying', kicker: 'Buying', title: 'Early harvest: what changes when the olives are picked green', meta: '6 min read', href: '/learn/early-harvest-olive-oil-olio-nuovo/', image: null },
    { slug: 'olive-varieties-cheat-sheet', category: 'varieties', kicker: 'Varieties', title: 'Twelve olive varieties, and what each one tastes like', meta: '7 min read', href: '/learn/olive-varieties-cheat-sheet/', image: null },
    { slug: 'olive-oil-regions-greece-italy-spain-turkiye', category: 'regions', kicker: 'Regions', title: 'Greek, Italian, Spanish, Turkish: the four styles, by region', meta: '6 min read', href: '/learn/olive-oil-regions-greece-italy-spain-turkiye/', image: null },
    { slug: 'how-olive-oil-competitions-work', category: 'competitions', kicker: 'Competitions', title: 'How olive oil competitions work, and what a Gold is worth', meta: '6 min read', href: '/learn/how-olive-oil-competitions-work/', image: null },
  ],

  /* ── producers ───────────────────────────────────────────────────────── */
  producers: [
    {
      slug: 'oro-bailen',
      name: 'Oro Bailén',
      country: 'Spain',
      countryCode: 'ES',
      locality: 'Villanueva de la Reina',
      regionName: 'Jaén, Andalusia',
      founded: '2005',
      geo: { lat: 38.00, lon: -3.92 },
      website: 'https://www.orobailen.com',
    logo: { src: 'assets/img/producers/oro-bailen-logo.webp', alt: 'Oro Bailén logo', w: 557, h: 800 },
      seo: {
        title: 'Oro Bailén — Family Mill in Jaén & Its Oils | bestoliveoils.eu',
        description: 'The Gálvez family mill in Villanueva de la Reina, Jaén: farm bought in 1999, mill since 2005, Flos Olei 99/100. All five oils with our panel scores.',
      },
      tags: ['Jaén, Andalusia, Spain', 'Family mill since 2005', 'Flos Olei 99/100'],
      lede: 'A family estate on the Guadalquivir plain in Jaén, run by the Gálvez family under the company Galgón 99. The farm was bought in 1999, the mill built in 2005, and the whole operation is set up around one idea: pick early, mill within hours, bottle to order.',
      image: null,
      imagePlaceholder: 'Estate / grove photo',
      stats: [
        { value: '6',   label: 'oils in library' },
        { value: '4.6', label: 'average expert rating' },
        { value: '6',   label: 'available in our shop' },
      ],
      oils: [
        { name: 'Oro Bailén Picual',    slug: 'oro-bailen-picual', cultivar: 'Picual',    intensity: 'Medium',   stars: 5, score: '4.7', readers: '—', inShop: true,  shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-picual' },
        { name: 'Oro Bailén Arbequina', slug: 'oro-bailen-arbequina', cultivar: 'Arbequina', intensity: 'Delicate', stars: 4, score: '4.5', readers: '—', inShop: true,  shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-arbequina' },
        { name: 'Oro Bailén Picual Bio', slug: 'oro-bailen-picual-organic', cultivar: 'Picual', intensity: 'Robust', stars: 5, score: '4.7', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-picual-bio' },
        { name: 'Oro Bailén Hojiblanca', slug: 'oro-bailen-hojiblanca', cultivar: 'Hojiblanca', intensity: 'Medium', stars: 5, score: '4.6', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-hojiblanca' },
        { name: 'Oro Bailén Frantoio', slug: 'oro-bailen-frantoio', cultivar: 'Frantoio', intensity: 'Medium', stars: 4, score: '4.5', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/oro-bailen-frantoio' },
        { name: 'Casa del Agua Picual', slug: 'casa-del-agua-picual', cultivar: 'Picual', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/casa-del-agua' },
      ],
      estate: [
        'Two farms, Los Juncales and La Casa del Agua, around Villanueva de la Reina in the heart of Jaén — the province that alone produces more olive oil than all of Italy. Most of that oil is late-harvest, bulk Picual. Oro Bailén went the other way: in the early 2000s José Gálvez, third generation, moved the family from selling fruit to the cooperative to making premium single-varietal oils, and the estate has since collected most of the industry\'s top awards, including 99/100 in the Flos Olei guide and EVOOLEUM\'s world number one.',
        'Harvest starts in early October, well before the region, and fruit is cold-extracted within hours of picking. The range is four monovarietals — Picual, Arbequina, Hojiblanca and Frantoio — plus an organic Picual; all five are in the library and all five are stocked in our shop.',
      ],
      map: {
      image: { src: 'assets/img/maps/oro-bailen.svg', alt: "Locator map: Villanueva de la Reina, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Villanueva de la Reina', caption: 'Villanueva de la Reina, Jaén · 38.00° N, 3.92° W' },
    },
    {
      slug: 'nobleza-del-sur',
      name: 'Nobleza del Sur',
      country: 'Spain',
      countryCode: 'ES',
      locality: 'Castellar',
      regionName: 'Jaén, Andalusia',
      founded: '1640',
      geo: { lat: 38.23, lon: -3.10 },
      website: 'https://www.noblezadelsur.com',
    logo: { src: 'assets/img/producers/nobleza-del-sur-logo.webp', alt: 'Nobleza del Sur logo', w: 800, h: 329 },
      seo: {
        title: 'Nobleza del Sur — Jaén Estate & Its Oils | bestoliveoils.eu',
        description: 'Twelve generations in Castellar, Jaén: 300 hectares, milling within four hours, Flos Olei 99/100. The full Nobleza del Sur range with our panel scores.',
      },
      tags: ['Castellar, Jaén, Spain', 'Family estate since 1640', 'Flos Olei 99/100'],
      lede: 'A family estate in Castellar, Jaén, trading as Aceites Castellar and farming the same land since 1640. Twelve generations of the Peñuelas-Sagra family, more than 300 hectares of Picual and Arbequina, and a mill that presses every load within four hours of picking.',
      image: null,
      imagePlaceholder: 'Estate / grove photo',
      stats: [
        { value: '6',   label: 'oils in library' },
        { value: '4.6', label: 'average expert rating' },
        { value: '6',   label: 'available in our shop' },
      ],
      oils: [
        { name: 'Flor de Abeja Picual Bio', slug: 'nobleza-del-sur-flor-de-abeja-picual-bio', cultivar: 'Picual', intensity: 'Robust', stars: 5, score: '4.8', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-flor-de-abeja-picual' },
        { name: 'Novo', slug: 'nobleza-del-sur-novo', cultivar: 'Picual', intensity: 'Robust', stars: 5, score: '4.7', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-novo' },
        { name: 'Eco Day', slug: 'nobleza-del-sur-eco-day', cultivar: 'Picual', intensity: 'Medium', stars: 5, score: '4.7', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-vroege-oogst-organic-day' },
        { name: 'Flor de Abeja Arbequina', slug: 'nobleza-del-sur-flor-de-abeja-arbequina', cultivar: 'Arbequina', intensity: 'Medium', stars: 5, score: '4.6', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-flor-de-abeja-arbequina' },
        { name: 'Eco Night', slug: 'nobleza-del-sur-eco-night', cultivar: 'Picual · Arbequina', intensity: 'Delicate', stars: 4, score: '4.4', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-vroege-oogst-organic-night' },
        { name: 'Only for Children', slug: 'nobleza-del-sur-only-for-children', cultivar: 'Arbequina · Picual', intensity: 'Delicate', stars: 4, score: '4.3', readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/nobleza-del-sur-alleen-voor-kinderen' },
        { name: 'Centenarium Premium', slug: '#', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
        { name: 'Arbequina Premium', slug: '#', cultivar: 'Arbequina', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
        { name: 'Tradición 1640', slug: '#', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
        { name: 'Reserva Familiar', slug: '#', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
        { name: 'Cosecha Propia', slug: '#', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      ],
      estate: [
        'The family dates its olive growing to 1640, when Miguel Sánchez Sagra bought a plantation at Los Añadios. Twelve generations later the Peñuelas-Sagra family still farms it, now across more than 300 hectares in several parts of Jaén province, and each grove feeds a different oil: Vista Alegre, with its own Mediterranean microclimate, gives the Centenarium Premium and the Novo; El Campillo, up in low mountain scrub, gives the Arbequina Premium; Los Añadios gives the Reserva Familiar. The company trades as Aceites Castellar and mills everything itself.',
        'One working rule explains most of what is in the bottles: olives reach the press within four hours of leaving the tree, cold-extracted. That is why free acidity across the range sits at 0.10–0.15% against a legal ceiling of 0.8%, and why the volatile green aromas survive to the bottle. Picking starts early, while the fruit is still turning, with drone monitoring and soil and leaf analysis used to fix the date. It costs yield — roughly 10 to 14 kilos of olives per litre at that stage — and buys polyphenols. The mill runs on its own photovoltaic array.',
        'The two organic oils carry endangered pollinators on the label rather than a family crest: a bee for Day, a night moth for Night. On this estate that is a farming decision, not a graphic one. Alongside them sit Flor de Abeja, the high-polyphenol line aimed squarely at people who buy olive oil as a health decision, and Novo, the first pressing of the season, made once a year and gone by spring. Between the six oils we have reviewed, polyphenol counts run from 373 to 837 mg/kg — an unusually wide range from one mill, and a good illustration of how much harvest date alone decides.',
      ],
      map: {
      image: { src: 'assets/img/maps/nobleza-del-sur.svg', alt: "Locator map: Castellar, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Castellar, Jaén', caption: 'Castellar, Jaén · 38.23° N, 3.10° W' },
    },
  {
    slug: 'sabino-leone',
    name: 'Sabino Leone',
    country: 'Italy', countryCode: 'IT',
    locality: 'Canosa di Puglia',
    regionName: 'Barletta-Andria-Trani, Puglia',
    founded: '2010',
    geo: { lat: 41.22, lon: 16.07 },
    website: 'https://www.sabinoleone.it',
    logo: { src: 'assets/img/producers/sabino-leone-logo.webp', alt: 'Sabino Leone logo', w: 613, h: 197 },
    seo: {
      title: 'Sabino Leone — Canosa di Puglia Estate | bestoliveoils.eu',
      description: 'The Puglian estate whose Don Gioacchino DOP topped the World’s Best Olive Oils 2025/26. Groves, cultivars, and the oil that won.',
    },
    tags: ['Puglia, Italy', 'Coratina', 'WBOO 2025/26 · 1st'],
    lede: 'A farming family at Canosa di Puglia, at the foot of the Murge, bottling under its own name since about 2010. Its DOP Coratina came first in the World’s Best Olive Oils 2025/26 aggregate ranking, ahead of the field by a hundred points.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#1', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Don Gioacchino DOP', slug: 'sabino-leone-don-gioacchino', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'A trade magazine profile puts the holding at roughly 300 hectares, about 150 of them olive groves with some 45,000 trees, planted to Coratina, Peranzana, Frantoio and Carolea. The estate itself publishes neither figure. What it does state is the age of the trees behind its flagship oil: over 220 years.',
      'Six oils are bottled, each from a separate cultivar or selection. Harvest is early and extraction cold at controlled temperature, with a short gap between picking and milling; the oil is filtered. The estate publishes no polyphenol or acidity figures, so the numbers on our oil page come from its US importer.',
    ],
    map: {
      image: { src: 'assets/img/maps/sabino-leone.svg', alt: "Locator map: Canosa di Puglia, Barletta-Andria-Trani, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Canosa di Puglia', caption: 'Canosa di Puglia, Puglia · 41.22° N, 16.07° E' },
  },
  {
    slug: 'miceli-sensat',
    name: 'Miceli & Sensat',
    country: 'Italy', countryCode: 'IT',
    locality: 'Monreale',
    regionName: 'Palermo, Sicily',
    founded: '2017',
    geo: { lat: 38.08, lon: 13.29 },
    website: 'https://miceliandsensat.it',
    logo: { src: 'assets/img/producers/miceli-sensat-logo.svg', alt: 'Miceli & Sensat logo', w: 297, h: 151 },
    seo: {
      title: 'Miceli & Sensat — Organic Sicilian Estate | bestoliveoils.eu',
      description: 'Spanish Picual grafted onto wild Sicilian rootstock, 48,000 organic trees near Lago Garcia, and the world’s best organic mill for 2025/26.',
    },
    tags: ['Sicily, Italy', 'Organic', 'WBOO 2025/26 · 2nd'],
    lede: 'An organic estate in the Palermo hinterland founded in 2017 by Paolo Miceli and Sergio Sensat, joining a Sicilian farming family to a Spanish olive-growing line that goes back to the mid-1800s. It was named the world’s best organic mill in the World’s Best Olive Oils 2025/26.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#2', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Unico', slug: 'miceli-sensat-unico', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Verde', slug: 'miceli-sensat-verde', cultivar: 'Cerasuola · Biancolilla', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'One hundred and fifteen hectares of certified organic groves and 48,000 trees between 200 and 450 metres near Lago Garcia, west of Palermo. The estate grows native Cerasuola and Biancolilla alongside two Spanish cultivars, Picual and Arbequina — and the Spanish vines are not planted directly but grafted onto wild Sicilian olive rootstock.',
      'Olives are hand-picked early and milled within hours at the estate’s own mill, with temperature monitored through extraction and storage. Irrigation is subsurface drip from on-site reservoirs. Output is over 45,000 litres a year, roughly 85% of it exported.',
    ],
    map: {
      image: { src: 'assets/img/maps/miceli-sensat.svg', alt: "Locator map: Monreale, Palermo, Sicily, Italy", w: 600, h: 600 }, placeholder: 'Map · Monreale', caption: 'Monreale, Palermo, Sicily · 38.08° N, 13.29° E' },
  },
  {
    slug: 'monini',
    name: 'Monini',
    country: 'Italy', countryCode: 'IT',
    locality: 'Spoleto',
    regionName: 'Perugia, Umbria',
    founded: '1920',
    geo: { lat: 42.73, lon: 12.74 },
    website: 'https://www.monini.com',
    logo: { src: 'assets/img/producers/monini-logo.webp', alt: 'Monini logo', w: 500, h: 326 },
    seo: {
      title: 'Monini — Umbrian Bottler Since 1920 | bestoliveoils.eu',
      description: 'The one large-scale house in the World’s Best Olive Oils 2025/26 top ten. Two plants, 30 million litres a year, and an organic Coratina at fourth.',
    },
    tags: ['Umbria, Italy', 'Founded 1920', 'WBOO 2025/26 · 4th'],
    lede: 'An Umbrian house founded at Spoleto in 1920 by Zefferino Monini, and by a wide margin the largest company in the top ten of the World’s Best Olive Oils 2025/26. It is a bottler and blender rather than an estate, which makes its fourth place worth a second look.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#4', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Monini Monocultivar Coratina', slug: 'monini-monocultivar-coratina', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Two production plants with a combined capacity of around 30 million litres a year, exporting to some sixty countries. The Coratina olives come from Puglia, where the company runs a plant at Carpino in the heart of the cultivar’s home ground.',
      'Monini also owns the Frantoio del Poggiolo above the Spoleto valley, which works as a mill and a tasting and education centre. In the Monocultivar range each variety is milled separately rather than blended — which is the whole point of the line, and the reason a Coratina from a company this size can hold its own against single estates.',
    ],
    map: {
      image: { src: 'assets/img/maps/monini.svg', alt: "Locator map: Spoleto, Perugia, Umbria, Italy", w: 600, h: 600 }, placeholder: 'Map · Spoleto', caption: 'Spoleto, Umbria · 42.73° N, 12.74° E' },
  },
  {
    slug: 'almazaras-de-la-subbetica',
    name: 'Almazaras de la Subbética',
    country: 'Spain', countryCode: 'ES',
    locality: 'Carcabuey',
    regionName: 'Córdoba, Andalusia',
    founded: '2007',
    geo: { lat: 37.45, lon: -4.28 },
    website: 'https://almazarasdelasubbetica.com',
    logo: { src: 'assets/img/producers/almazaras-de-la-subbetica-logo.webp', alt: 'Almazaras de la Subbética logo', w: 600, h: 376 },
    seo: {
      title: 'Almazaras de la Subbética — Córdoba Co-op | bestoliveoils.eu',
      description: 'A 4,000-family cooperative inside the Sierras Subbéticas with three oils in the World’s Best Olive Oils 2025/26 top forty. Mills, groves, range.',
    },
    tags: ['Córdoba, Andalusia', 'Cooperative', 'WBOO 2025/26 · 5th'],
    lede: 'A cooperative of around four thousand member families formed in 2007 from the merger of two older ones, working groves inside and around the Sierras Subbéticas natural park. It placed three oils in the top forty of the World’s Best Olive Oils 2025/26.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '3', label: 'oils in library' },
      { value: '#5', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Rincón de la Subbética Hojiblanca', slug: 'rincon-de-la-subbetica-hojiblanca', cultivar: 'Hojiblanca', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Parqueoliva Serie Oro', slug: 'parqueoliva-serie-oro', cultivar: 'Picuda · Hojiblanca', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Almaoliva Bio', slug: 'almaoliva-bio', cultivar: 'Hojiblanca · Picuda · Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The two founding cooperatives were Virgen del Castillo at Carcabuey, founded in 1954, and Nuestro Padre Jesús Nazareno at Priego de Córdoba, founded in the early 1960s. Both mills still run; Carcabuey also houses bottling and design. The groves are Hojiblanca, Picuda and Picual, spread across Carcabuey, Priego de Córdoba, Fuente-Tójar and Almedinilla.',
      'This is mountain country by Andalusian standards: higher rainfall than the plain, wide day-to-night temperature swings, and a harvest picked by hand in late autumn. The premium oils are bottled under DOP Priego de Córdoba; the organic coupage is sold outside it.',
    ],
    map: {
      image: { src: 'assets/img/maps/almazaras-de-la-subbetica.svg', alt: "Locator map: Carcabuey, Córdoba, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Carcabuey', caption: 'Carcabuey, Córdoba · 37.45° N, 4.28° W' },
  },
  {
    slug: 'o-med',
    name: 'O-Med',
    country: 'Spain', countryCode: 'ES',
    locality: 'Ácula, Ventas de Huelma',
    regionName: 'Granada, Andalusia',
    founded: '2004',
    geo: { lat: 37.05, lon: -3.89 },
    website: 'https://www.omedoil.com',
    logo: { src: 'assets/img/producers/o-med-logo.webp', alt: 'O-Med logo', w: 188, h: 50 },
    seo: {
      title: 'O-Med — Solar Mill in the Grove, Granada | bestoliveoils.eu',
      description: 'A glass-and-polycarbonate mill built inside its own 200-hectare grove near Granada, milling Picual within three hours of picking.',
    },
    tags: ['Granada, Andalusia', 'Mill in the grove', 'WBOO 2025/26 · 5th'],
    lede: 'Two hundred hectares at Ácula, south-west of Granada, with a mill built inside the grove itself — glass and polycarbonate, solar-powered, burning its own olive stones for heat. Its Picual placed joint-fifth in the World’s Best Olive Oils 2025/26.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#5', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'O-Med Picual', slug: 'o-med-picual', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Picual and Arbequina, both bottled as monovarietals. The harvest is compressed into three or four days at the end of October, with green fruit going to the mill within about three hours of picking and extraction kept cold.',
      'The estate irrigates by subsurface drip on solar power, reuses its process water, runs experimental plots with the IFAPA research centre and the University of Córdoba, and takes part in the Olivares Vivos biodiversity programme. Its award record is one of the longest in Spain, going back to 2010.',
    ],
    map: {
      image: { src: 'assets/img/maps/o-med.svg', alt: "Locator map: Ácula, Ventas de Huelma, Granada, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Ácula', caption: 'Ácula, Granada · 37.05° N, 3.89° W' },
  },
  {
    slug: 'oleicola-jaen',
    name: 'Oleícola Jaén',
    country: 'Spain', countryCode: 'ES',
    locality: 'Baeza',
    regionName: 'Jaén, Andalusia',
    founded: '1981',
    geo: { lat: 37.99, lon: -3.47 },
    website: 'https://www.oleicolajaen.es',
    logo: { src: 'assets/img/producers/oleicola-jaen-logo.webp', alt: 'Oleícola Jaén logo', w: 374, h: 205 },
    seo: {
      title: 'Oleícola Jaén — Baeza Mill Since 1981 | bestoliveoils.eu',
      description: 'The fifth-best mill in the world for 2025/26, with three oils in the top twenty. A Baeza mill that buys fruit from growers across the province.',
    },
    tags: ['Jaén, Andalusia', 'Mill since 1981', 'WBOO 2025/26 · 8th'],
    lede: 'A Baeza mill that started in the early 1980s pressing olives for local growers and now runs an "almazara 4.0" opened in 2022. The World’s Best Olive Oils 2025/26 ranked it the fifth-best mill in the world, with three of its oils in the top twenty.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '3', label: 'oils in library' },
      { value: '#8', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Don Remigio', slug: 'oleicola-jaen-don-remigio', cultivar: 'Royal / Hojiblanca', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Oleícola Jaén Picual Especial', slug: 'oleicola-jaen-picual-especial', cultivar: 'Picual', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Oleícola Jaén Ecológico Picual', slug: 'oleicola-jaen-eco', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The company owns no groves. It buys olives from growers around Baeza, Úbeda, Linares and Mancha Real, which makes its results a statement about milling rather than about farming. Picual, Arbequina, Frantoio, Royal, Hojiblanca and Coratina all pass through it.',
      'It began burning olive stones as fuel in 1986, switched from three-phase to two-phase extraction in 1994, took organic certification in 2013 and started bottling monovarietals in 2015. The new mill, reported at around six million euros, opened in 2022. Premium lots are picked green in October and November and milled straight away.',
    ],
    map: {
      image: { src: 'assets/img/maps/oleicola-jaen.svg', alt: "Locator map: Baeza, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Baeza', caption: 'Baeza, Jaén · 37.99° N, 3.47° W' },
  },
  {
    slug: 'knolive',
    name: 'Knolive',
    country: 'Spain', countryCode: 'ES',
    locality: 'Priego de Córdoba',
    regionName: 'Córdoba, Andalusia',
    founded: '2015',
    geo: { lat: 37.44, lon: -4.20 },
    website: 'https://knolive.com',
    logo: { src: 'assets/img/producers/knolive-logo.webp', alt: 'Knolive logo', w: 286, h: 95 },
    seo: {
      title: 'Knolive — Mountain Groves at 600–800 m | bestoliveoils.eu',
      description: 'Ninety-eight hectares of hand-harvested mountain grove below La Tiñosa, milled at night. Sixth-generation family, company founded 2015.',
    },
    tags: ['Córdoba, Andalusia', 'Hand-harvested', 'WBOO 2025/26 · 9th'],
    lede: 'A sixth-generation family whose olive land at Priego de Córdoba goes back to 1858, trading as Knolive since 2015. Its groves sit at 600 to 800 metres below La Tiñosa, the highest peak in the province, on ground too steep to harvest by machine.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#9', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Knolive Epicure', slug: 'knolive-epicure', cultivar: 'Hojiblanca · Picuda', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Ninety-eight hectares across two orchards, about 9,800 trees at roughly a hundred to the hectare, planted to Picual, Picuda and Hojiblanca in roughly equal thirds. Everything is picked by hand because the terrain gives no other option.',
      'Milling is done at night, cold, at the company’s own facility in Priego de Córdoba. Storage is about sixty stainless-steel tanks of 54 tonnes each, held at 15 °C under nitrogen. Total output is around 3.5 million litres a year, of which roughly half a million comes from the family’s own groves and the rest from seventy to eighty local farmers.',
    ],
    map: {
      image: { src: 'assets/img/maps/knolive.svg', alt: "Locator map: Priego de Córdoba, Córdoba, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Priego de Córdoba', caption: 'Priego de Córdoba, Córdoba · 37.44° N, 4.20° W' },
  },
  {
    slug: 'xiangyu',
    name: 'Longnan Xiangyu',
    country: 'China', countryCode: 'CN',
    locality: 'Wudu District, Longnan',
    regionName: 'Gansu',
    founded: '1997',
    geo: { lat: 33.39, lon: 104.93 },
    website: 'http://www.xiangyuoliveoil.com',
    seo: {
      title: 'Longnan Xiangyu — Chinese Olive Oil, Gansu | bestoliveoils.eu',
      description: 'The only Chinese producer in the WBOO 2025/26 top forty, founded 1997 in China’s olive belt. What is verifiable, and what is not.',
    },
    tags: ['Gansu, China', 'Founded 1997', 'WBOO 2025/26 · 11th'],
    lede: 'A company founded in 1997 in Wudu District, Longnan — the warm river valley in southern Gansu that is China’s main olive-growing area. Its Coratina placed eleventh in the World’s Best Olive Oils 2025/26, the only Chinese entry in the top forty.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#11', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Xiang Yu Coratina', slug: 'xiangyu-coratina', cultivar: 'Coratina', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The company runs processing plants and a bottling line in Longnan and works through a contract-growing model with local farmers rather than farming a single estate. Its industrial site is designated a National Industrial Tourism Demonstration Base. Coratina is the cultivar we could confirm; grove area, altitude, harvest timing and mill technology are not published anywhere we could reach.',
      'A note on sourcing: the company website would not load for us, and no product data sheet exists in English. Figures circulating in Chinese press about hectares under olives describe the Longnan region as a whole, not this company, so we have left them out rather than repeat them as if they were the estate’s own.',
    ],
    map: {
      image: { src: 'assets/img/maps/xiangyu.svg', alt: "Locator map: Wudu District, Longnan, Gansu, China", w: 600, h: 600 }, placeholder: 'Map · Longnan', caption: 'Wudu District, Longnan, Gansu · 33.39° N, 104.93° E' },
  },
  {
    slug: 'olivarera-guadalupe',
    name: 'Olivarera Ntra. Sra. de Guadalupe',
    country: 'Spain', countryCode: 'ES',
    locality: 'Baena',
    regionName: 'Córdoba, Andalusia',
    founded: 'Not published',
    geo: { lat: 37.62, lon: -4.32 },
    website: 'https://www.cooperativadeguadalupe.es',
    seo: {
      title: 'Olivarera de Guadalupe — DOP Baena Co-op | bestoliveoils.eu',
      description: 'The Baena cooperative behind Virrey del Pino: four crushing lines, 24 hoppers, olives milled within 24 hours. Twelfth in WBOO 2025/26.',
    },
    tags: ['Baena, Córdoba', 'DOP Baena', 'WBOO 2025/26 · 12th'],
    lede: 'A farmers’ cooperative at Baena in south-eastern Córdoba, bottling under the Virrey del Pino name inside the DOP Baena zone. Its flagship placed twelfth in the World’s Best Olive Oils 2025/26 and won the 2026 Expoliva quality prize for intense green fruity.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#12', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Virrey del Pino', slug: 'virrey-del-pino', cultivar: 'DOP Baena varieties', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The mill runs four crushing lines, each with two hammer mills feeding malaxers, a decanter and vertical centrifuges, with 24 hoppers on the intake and olives processed within 24 hours of delivery. Oil is held in on-site bodegas before bottling.',
      'The cooperative works inside DOP Baena, which covers eight towns and is built on Picuda alongside Lechín, Hojiblanca and Picual. It also bottles an organic line, Virrey Ecológico, and a separate early-harvest oil. Neither its founding year nor its membership is published.',
    ],
    map: {
      image: { src: 'assets/img/maps/olivarera-guadalupe.svg', alt: "Locator map: Baena, Córdoba, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Baena', caption: 'Baena, Córdoba · 37.62° N, 4.32° W' },
  },
  {
    slug: 'quattrociocchi',
    name: 'Quattrociocchi',
    country: 'Italy', countryCode: 'IT',
    locality: 'Alatri',
    regionName: 'Frosinone, Lazio',
    founded: '1888',
    geo: { lat: 41.73, lon: 13.34 },
    website: 'https://olioquattrociocchi.it',
    seo: {
      title: 'Quattrociocchi — Organic Itrana, Lazio | bestoliveoils.eu',
      description: 'One hundred and ten hectares of organic grove at Alatri, harvest brought forward to early October for twenty years. Flos Olei Hall of Fame 2026.',
    },
    tags: ['Lazio, Italy', 'Organic', 'WBOO 2025/26 · 13th'],
    lede: 'An organic family estate at Alatri in the Ciociaria hills, growing olives since the late 1800s and exporting to more than fifty countries. Flos Olei has twice named it the best company in the world, and put it in its Hall of Fame for 2026.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#13', label: 'best WBOO 2025/26 rank' },
      { value: '1', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Olivastro', slug: 'quattrociocchi-olivastro', cultivar: 'Itrana', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/olio-quattrociocchi-olivastro' },
      { name: 'Superbo', slug: 'quattrociocchi-superbo', cultivar: 'Moraiolo', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Around 110 hectares and 25,000 trees, certified organic, planted to Itrana, Leccino, Moraiolo and Frantoio. For about twenty years the estate has brought its harvest forward to the start of October to pick green, polyphenol-rich fruit — a decision that costs yield and defines the house style.',
      'Olives are hand-harvested and milled the same day using cold extraction. The oil is left unfiltered and kept in stainless steel. Trees are hand-pruned in February. The company is registered with the Olio di Roma IGP consortium.',
    ],
    map: {
      image: { src: 'assets/img/maps/quattrociocchi.svg', alt: "Locator map: Alatri, Frosinone, Lazio, Italy", w: 600, h: 600 }, placeholder: 'Map · Alatri', caption: 'Alatri, Frosinone, Lazio · 41.73° N, 13.34° E' },
  },
  {
    slug: 'trappeto-di-caprafico',
    name: 'Trappéto di Caprafico',
    country: 'Italy', countryCode: 'IT',
    locality: 'Caprafico di Casoli',
    regionName: 'Chieti, Abruzzo',
    founded: '1948',
    geo: { lat: 42.12, lon: 14.29 },
    website: 'https://trappetodicaprafico.com',
    seo: {
      title: 'Trappéto di Caprafico — Abruzzo Mill | bestoliveoils.eu',
      description: 'A family mill working since 1948 below the Maiella, custodian of the Intosso di Casoli and home to the rare Crognalegno cultivar.',
    },
    tags: ['Abruzzo, Italy', 'Mill since 1948', 'WBOO 2025/26 · 13th'],
    lede: 'A family estate on the Caprafico plateau below the Maiella massif, farming olives since 1874 and milling since 1948. Tommaso Masciantonio is a designated custodian of the Intosso di Casoli, a Slow Food presidium variety, and keeps the rarer Crognalegno alive alongside it.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#13', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Crognale', slug: 'trappeto-di-caprafico-crognale', cultivar: 'Crognalegno', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Over five thousand trees, more than half of them over a century old, on ground the producer describes as stony, harsh and skeletal. The cultivars are Gentile di Chieti, Intosso, Crognalegno and Leccino; the farm also grows Montepulciano, Pecorino and Passerina for wine.',
      'Olives are picked early and milled within a few hours on granite millstones, with no intermediate storage. The oil stays unfiltered in nitrogen-blanketed steel in rooms held at 15–18 °C, and is bottled only when ordered.',
    ],
    map: {
      image: { src: 'assets/img/maps/trappeto-di-caprafico.svg', alt: "Locator map: Caprafico di Casoli, Chieti, Abruzzo, Italy", w: 600, h: 600 }, placeholder: 'Map · Casoli', caption: 'Caprafico di Casoli, Chieti · 42.12° N, 14.29° E' },
  },
  {
    slug: 'oro-de-canava',
    name: 'Oro de Cánava',
    country: 'Spain', countryCode: 'ES',
    locality: 'Jimena',
    regionName: 'Jaén, Andalusia',
    founded: '1976',
    geo: { lat: 37.86, lon: -3.48 },
    website: 'https://www.orodecanava.com',
    seo: {
      title: 'Oro de Cánava — Sierra Mágina Co-op | bestoliveoils.eu',
      description: 'A Jaén cooperative founded in 1976 with 750+ members, among the first in Sierra Mágina to harvest early. Mario Solinas first prize in 2023.',
    },
    tags: ['Sierra Mágina, Jaén', 'DOP Sierra Mágina', 'WBOO 2025/26 · 13th'],
    lede: 'A cooperative founded at Jimena in 1976 by seventy-five growers, now more than 750 strong, working the Sierra Mágina foothills. It says it was among the first producers in the area to move to early harvesting, and its award record over the last five years is among the best in Jaén.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#13', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Oro de Cánava Cosecha Temprana', slug: 'oro-de-canava', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The oils are Picual, bottled under DOP Sierra Mágina in four formats — an early-harvest bottling, a standard glass line, PET for everyday use and tins. Fruit is picked green from October and taken straight to the mill; storage is stainless steel at the mill, which also keeps an exhibition room of the cooperative’s awards.',
      'Since 2020 it has taken Jaén Selección four times, the IOC’s Mario Solinas prize three times — first place for intense green fruity in 2023 — and, in 2026, best Picual in the world at the AOVE World Cup and the number one spot in the Iberoleum guide.',
    ],
    map: {
      image: { src: 'assets/img/maps/oro-de-canava.svg', alt: "Locator map: Jimena, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Jimena', caption: 'Jimena, Jaén · 37.86° N, 3.48° W' },
  },
  {
    slug: 'paola-orsini',
    name: 'Paola Orsini',
    country: 'Italy', countryCode: 'IT',
    locality: 'Priverno',
    regionName: 'Latina, Lazio',
    founded: 'Not published',
    geo: { lat: 41.47, lon: 13.18 },
    website: 'https://www.olioorsini.it',
    seo: {
      title: 'Paola Orsini — Organic Itrana, Monti Lepini | bestoliveoils.eu',
      description: 'Ten thousand organic Itrana trees in the Monti Lepini, milled on site with two decanters and no separator. Two oils in the WBOO top forty.',
    },
    tags: ['Lazio, Italy', 'Organic', 'WBOO 2025/26 · 17th'],
    lede: 'An organic farm in the Monti Lepini above the Pontine plain, growing Itrana on ten thousand trees and milling in its own mill immediately after picking. The family has grown olives here for more than a century.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Olio DOP Colline Pontine', slug: 'paola-orsini-dop-colline-pontine', cultivar: 'Itrana', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Riserva Paola Orsini', slug: 'paola-orsini-riserva', cultivar: 'Itrana', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The groves face the Tyrrhenian from the Lepini slopes, and the oils are monovarietal Itrana, bottled both as DOP Colline Pontine and as a numbered organic Riserva. The DOP oil also carries a Slow Food presidium designation.',
      'The mill runs two decanters and deliberately no centrifugal separator, which the producer says preserves the oil’s character. Alongside oil the farm makes table olives, olive creams, artichokes in oil, honey, citrus and wine.',
    ],
    map: {
      image: { src: 'assets/img/maps/paola-orsini.svg', alt: "Locator map: Priverno, Latina, Lazio, Italy", w: 600, h: 600 }, placeholder: 'Map · Priverno', caption: 'Priverno, Latina, Lazio · 41.47° N, 13.18° E' },
  },
  {
    slug: 'mimi',
    name: 'Mimì',
    country: 'Italy', countryCode: 'IT',
    locality: 'Modugno',
    regionName: 'Bari, Puglia',
    founded: '2015',
    geo: { lat: 41.09, lon: 16.78 },
    website: 'https://www.oliomimi.com',
    seo: {
      title: 'Mimì — Donato Conserva, Modugno | bestoliveoils.eu',
      description: 'Eighty hectares near Bari and a mill that chills its paste to 19–20 °C before malaxation. Il Magnifico best European oil in 2021.',
    },
    tags: ['Puglia, Italy', '24,000 trees', 'WBOO 2025/26 · 17th'],
    lede: 'The mill Donato and Michele Conserva built on the red soils outside Bari to realise their late father Domenico’s ambition. It is one of the most technically explicit producers we have looked at — every step of the process is published, temperature by temperature.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Mimì Premium Blend', slug: 'mimi-premium-blend', cultivar: 'Blend, varies by year', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Around eighty hectares and 24,000 trees at Contrada Gravinella, planted to Ogliarola, Peranzana, Coratina, Cima di Melfi and Nocellara, each bottled as a monovarietal alongside the blend.',
      'Olives are washed and dried before crushing so that wash water never enters the process. The paste is chilled through a heat exchanger to a maximum of 19–20 °C before malaxation in vertically arranged malaxers, then run through a two-phase decanter. Oil is filtered immediately and stored under nitrogen with temperature monitored throughout.',
    ],
    map: {
      image: { src: 'assets/img/maps/mimi.svg', alt: "Locator map: Modugno, Bari, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Modugno', caption: 'Modugno, Bari, Puglia · 41.09° N, 16.78° E' },
  },
  {
    slug: 'terracuza',
    name: 'Terracuza',
    country: 'Italy', countryCode: 'IT',
    locality: 'Bolotana',
    regionName: 'Nuoro, Sardinia',
    founded: '2007',
    geo: { lat: 40.32, lon: 8.96 },
    website: 'https://www.terracuza.com',
    seo: {
      title: 'Terracuza — Recovered Sardinian Terraces | bestoliveoils.eu',
      description: 'Twenty-five abandoned terraced plots on Sardinian granite, all worked by hand, about 4,000 litres a year. Organic, and heavily awarded.',
    },
    tags: ['Sardinia, Italy', 'Organic', 'WBOO 2025/26 · 17th'],
    lede: 'Giacomo Nieddu farms twenty-five separate terraced plots in the Marghine range, recovered from abandonment on steep granite hillsides held by dry-stone walls. Everything is done by hand, because nothing else fits, and the whole operation makes about four thousand litres a year.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Terracuza Biologico', slug: 'terracuza-biologico', cultivar: 'Bosana · Cariasina', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'About 2,500 trees averaging some 150 years old, some reported at up to six hundred, in plots of between seventy and a thousand trees each at roughly 300–700 m with south-western exposure. The cultivars are Bosana and Cariasina, with Tonda di Cagliari for the table. Certification is organic, through Suolo e Salute.',
      'The farm has no mill of its own: olives are taken to a partner mill and cold-extracted on a two-phase system within twelve hours of picking. A second label, Ozzastrera, carries the Bosana monovarietal, and the farm also runs nomadic beekeeping.',
    ],
    map: {
      image: { src: 'assets/img/maps/terracuza.svg', alt: "Locator map: Bolotana, Nuoro, Sardinia, Italy", w: 600, h: 600 }, placeholder: 'Map · Bolotana', caption: 'Bolotana, Nuoro, Sardinia · 40.32° N, 8.96° E' },
  },
  {
    slug: 'schinosa',
    name: 'Schinosa',
    country: 'Italy', countryCode: 'IT',
    locality: 'Trani',
    regionName: 'Barletta-Andria-Trani, Puglia',
    founded: '1647',
    geo: { lat: 41.28, lon: 16.42 },
    website: 'https://agridimartino.it',
    seo: {
      title: 'Schinosa — Masseria Estate at Trani, Puglia | bestoliveoils.eu',
      description: 'An estate dating to 1647 with 28,000 trees on limestone near Trani, and its own mill since 2015. Coratina, Peranzana, Nocellara and more.',
    },
    tags: ['Puglia, Italy', 'Estate since 1647', 'WBOO 2025/26 · 17th'],
    lede: 'Masseria Schinosa dates to 1647; Maria Francesca Di Martino has run the groves personally since 1996, and the estate’s own mill opened in 2015. Around 180 hectares of mostly centuries-old trees on the limestone behind Trani.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Schinosa La Coratina', slug: 'schinosa-la-coratina', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'About 28,000 trees, most of them 150 to 200 years old, across the Santa Perpetua, Dote and San Giovanni districts. Coratina dominates, with roughly nine hectares of Peranzana and six of Nocellara, plus Leccino, Picholine and Bella di Cerignola for the table.',
      'Each variety is picked at its own moment — table olives first, Peranzana next, Coratina last. Milling is on an Amenduni continuous two-phase line with automated temperature control during crushing. An organic line, Stellare Bio, is bottled from Leccino.',
    ],
    map: {
      image: { src: 'assets/img/maps/schinosa.svg', alt: "Locator map: Trani, Barletta-Andria-Trani, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Trani', caption: 'Trani, Puglia · 41.28° N, 16.42° E' },
  },
  {
    slug: 'goya-espana',
    name: 'Goya en España',
    country: 'Spain', countryCode: 'ES',
    locality: 'Alcalá de Guadaíra',
    regionName: 'Seville, Andalusia',
    founded: '1974',
    geo: { lat: 37.34, lon: -5.84 },
    website: 'https://www.goyaspain.com',
    seo: {
      title: 'Goya en España — Seville Blender Since 1974 | bestoliveoils.eu',
      description: 'A blender and packer, not a grower: roughly 2,000 supplier samples tasted a season, fewer than 100 selected. Two oils in the WBOO top forty.',
    },
    tags: ['Seville, Andalusia', 'Blender and packer', 'WBOO 2025/26 · 17th'],
    lede: 'The Spanish arm of the American Goya group, incorporated in 1974 at Alcalá de Guadaíra outside Seville. It owns no groves: its oils are built by a tasting panel from supplier samples — roughly two thousand a season, of which fewer than a hundred make the final blends.',
    image: null,
    imagePlaceholder: 'Plant photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Goya Organics', slug: 'goya-organics', cultivar: 'Hojiblanca · Picuda', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Goya Único', slug: 'goya-unico', cultivar: 'Hojiblanca · Picuda', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The Alcalá de Guadaíra site began as a processing and bottling plant for oil and table olives, gained a dedicated olive factory in 1985 and was rebuilt as an integrated plant in 1998. Oil is held under controlled atmosphere and temperature, and finished bottles are nitrogen-flushed.',
      'Output is around four million kilos of olive oil and as much again in olives and capers a year, almost all of it exported. Goya publishes no polyphenol figures, no acidity and no harvest years — which is worth knowing before comparing its numbers with an estate’s, because there are none to compare.',
    ],
    map: {
      image: { src: 'assets/img/maps/goya-espana.svg', alt: "Locator map: Alcalá de Guadaíra, Seville, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Alcalá de Guadaíra', caption: 'Alcalá de Guadaíra, Seville · 37.34° N, 5.84° W' },
  },
  {
    slug: 'oro-del-desierto',
    name: 'Oro del Desierto',
    country: 'Spain', countryCode: 'ES',
    locality: 'Tabernas',
    regionName: 'Almería, Andalusia',
    founded: '1999',
    geo: { lat: 37.05, lon: -2.39 },
    website: 'https://orodeldesierto.com',
    seo: {
      title: 'Oro del Desierto — Organic, Tabernas | bestoliveoils.eu',
      description: 'Organic olive oil grown in the only desert in continental Europe, from a restored 1925 mill. Three oils in the WBOO 2025/26 top forty.',
    },
    tags: ['Almería, Andalusia', 'Organic', 'WBOO 2025/26 · 17th'],
    lede: 'Organic olive oil from the Tabernas desert, the only desert in continental Europe — over three thousand hours of sun a year and under 180 mm of rain. The mill dates from 1925, was abandoned in the 1970s and has been restored; it now runs on solar power.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '3', label: 'oils in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Oro del Desierto Picual', slug: 'oro-del-desierto-picual', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Oro del Desierto Coupage', slug: 'oro-del-desierto-coupage', cultivar: 'Arbequina · Hojiblanca · Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Oro del Desierto Hojiblanca', slug: 'oro-del-desierto-hojiblanca', cultivar: 'Hojiblanca', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'One hundred and thirty hectares of olives on Finca El Vicario, planted to Picual, Hojiblanca, Lechín and Arbequina, all certified organic. Irrigation is drip-based and stated to use 30–35% less water than conventional systems; mill pomace is composted back into the groves and burned as biomass.',
      'The estate does something almost no producer does: it publishes its polyphenol results by variety and by harvest year, measured by an outside laboratory. That series is the reason our oil pages here can carry real numbers instead of a marketing range.',
    ],
    map: {
      image: { src: 'assets/img/maps/oro-del-desierto.svg', alt: "Locator map: Tabernas, Almería, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Tabernas', caption: 'Tabernas, Almería · 37.05° N, 2.39° W' },
  },
  {
    slug: 'olibaeza',
    name: 'Olibaeza',
    country: 'Spain', countryCode: 'ES',
    locality: 'Baeza',
    regionName: 'Jaén, Andalusia',
    founded: '1951',
    geo: { lat: 37.99, lon: -3.47 },
    website: 'https://www.olibaeza.com',
    seo: {
      title: 'Olibaeza — Baeza Cooperative Since 1951 | bestoliveoils.eu',
      description: '1,263 members working over 554,000 trees, milling about 35 million kilos of olives a season. Its premium Picual is 17th in WBOO 2025/26.',
    },
    tags: ['Baeza, Jaén', 'Cooperative since 1951', 'WBOO 2025/26 · 17th'],
    lede: 'A Baeza cooperative founded in 1951 and rehoused in purpose-built premises in 2008. Its 1,263 members work over 554,000 olive trees and produce around 10.5 million kilos of oil a year; the premium line is picked in early October under Integrated Production.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Olibaeza Premium Picual', slug: 'olibaeza-premium-picual', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The members grow Picual, with some Arbequina, on La Loma around Baeza. About 35 million kilos of olives pass through the mill in an average season, and nearly two thousand local families are connected to the cooperative.',
      'For the Olibaeza premium line, fruit is selected from members’ groves and picked in early October while still green, before it turns purple, then cold-extracted. The bottles carry two designs referencing Baeza cathedral and the town’s ceramics, one of them with a Machado quotation.',
    ],
    map: {
      image: { src: 'assets/img/maps/olibaeza.svg', alt: "Locator map: Baeza, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Baeza', caption: 'Baeza, Jaén · 37.99° N, 3.47° W' },
  },
  {
    slug: 'jabalcuz',
    name: 'Jabalcuz',
    country: 'Spain', countryCode: 'ES',
    locality: 'Los Villares',
    regionName: 'Jaén, Andalusia',
    founded: '2004',
    geo: { lat: 37.72, lon: -3.83 },
    website: 'https://aovejabalcuz.com',
    seo: {
      title: 'Jabalcuz — Mountain Picual from Jaén | bestoliveoils.eu',
      description: 'A 1,400-family cooperative at Los Villares milling 17 million kilos a season, and winner of the IOC Mario Solinas first prize in 2025.',
    },
    tags: ['Sierra Sur, Jaén', 'Mountain oil', 'WBOO 2025/26 · 17th'],
    lede: 'A cooperative formed in 2004 from the merger of two sister societies at Los Villares, south-west of Jaén, working mountain Picual on the flanks of the Sierra de Jabalcuz. In 2025 its Gran Selección took first prize in the medium green fruity class at the IOC’s Mario Solinas award.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#17', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Jabalcuz Gran Selección', slug: 'jabalcuz-gran-seleccion', cultivar: 'Picual', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Around 1,400 member families, and 17 million kilos of olives processed in the 2025/26 season. Storage runs to more than 5.2 million kilos across 54 stainless-steel tanks.',
      'The cooperative sells its output explicitly as mountain oil — family-sized holdings on steep ground in the Sierra Sur, picked in October and, it states, milled the same day. Its predecessor label, La Pandera Premium, scored 94 points in the EVOOLEUM guide.',
    ],
    map: {
      image: { src: 'assets/img/maps/jabalcuz.svg', alt: "Locator map: Los Villares, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Los Villares', caption: 'Los Villares, Jaén · 37.72° N, 3.83° W' },
  },
  {
    slug: 'frantoi-cutrera',
    name: 'Frantoi Cutrera',
    country: 'Italy', countryCode: 'IT',
    locality: 'Chiaramonte Gulfi',
    regionName: 'Ragusa, Sicily',
    founded: 'Six generations',
    geo: { lat: 37.03, lon: 14.70 },
    website: 'https://frantoicutrera.it',
    seo: {
      title: 'Frantoi Cutrera — Hyblaean Sicily | bestoliveoils.eu',
      description: '150 hectares of native Sicilian cultivars, and a mill the family says was the first in the world to sort olives with infrared graders.',
    },
    tags: ['Sicily, Italy', 'DOP Monti Iblei', 'WBOO 2025/26 · 26th'],
    lede: 'A Sicilian family mill in the Hyblaean Mountains, farming 150 hectares of native cultivars and selling in more than fifty countries. Its Primo was, the family states, the first Sicilian oil to obtain the DOP Monti Iblei.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '#26', label: 'best WBOO 2025/26 rank' },
      { value: '2', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Primo DOP Monti Iblei', slug: 'frantoi-cutrera-primo-dop', cultivar: 'Tonda Iblea', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/frantoi-cutrera-primo-dop' },
      { name: 'Selezione', slug: 'frantoi-cutrera-selezione', cultivar: 'Sicilian blend', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/frantoi-cutrera-selezione' },
    ],
    estate: [
      'One hundred and fifty hectares farmed directly in south-eastern Sicily, planted only to native varieties — Tonda Iblea and Nocellara del Belice among them — and harvested before full ripeness. Organic, IGP Sicilia and DOP Monti Iblei oils are all produced.',
      'The mill runs Pieralisi equipment and, the company states, was the first in the world to integrate infrared optical sorters that assess olives individually. Extraction is continuous-cycle and two-phase, without added water, below 27 °C, in a closed facility under a nitrogen atmosphere.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoi-cutrera.svg', alt: "Locator map: Chiaramonte Gulfi, Ragusa, Sicily, Italy", w: 600, h: 600 }, placeholder: 'Map · Chiaramonte Gulfi', caption: 'Chiaramonte Gulfi, Ragusa, Sicily · 37.03° N, 14.70° E' },
  },
  {
    slug: 'santuario-de-magina',
    name: 'El Santuario de Mágina',
    country: 'Spain', countryCode: 'ES',
    locality: 'Huelma',
    regionName: 'Jaén, Andalusia',
    founded: '1953',
    geo: { lat: 37.65, lon: -3.46 },
    website: 'https://www.scasanisidro.es',
    seo: {
      title: 'El Santuario de Mágina — Huelma Co-op | bestoliveoils.eu',
      description: 'Founded in 1953 with 140 members and now over 1,595, milling on five continuous lines with 52 tanks. DOP Sierra Mágina Picual.',
    },
    tags: ['Sierra Mágina, Jaén', 'Cooperative since 1953', 'WBOO 2025/26 · 26th'],
    lede: 'The cooperative of San Isidro Labrador at Huelma, on the southern slope of the Mágina massif. It started in 1953 with a hundred and forty members and two presses; it now has over 1,595 members and a plant opened in 2005.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#26', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'El Santuario de Mágina Selección Temprana', slug: 'santuario-de-magina-seleccion-temprana', cultivar: 'Picual', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The oils are Picual under DOP Sierra Mágina. The plant has six automatic weighing lines, five continuous milling lines and 52 stainless-steel tanks holding four million kilos of oil, plus a bottling line added in 2001.',
      'The cooperative moved to the A-324 road site in 1969–70 and expanded to six presses, adopted two-phase continuous extraction in the 1990s and opened its current facilities on 1 October 2005. It also runs a diesel station and an agricultural supply outlet for members.',
    ],
    map: {
      image: { src: 'assets/img/maps/santuario-de-magina.svg', alt: "Locator map: Huelma, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Huelma', caption: 'Huelma, Jaén · 37.65° N, 3.46° W' },
  },
  {
    slug: 'artajo',
    name: 'Artajo',
    country: 'Spain', countryCode: 'ES',
    locality: 'Fontellas',
    regionName: 'Navarra',
    founded: '1780',
    geo: { lat: 42.02, lon: -1.64 },
    website: 'https://artajo.es',
    seo: {
      title: 'Artajo — Organic Olive Estate in Navarra | bestoliveoils.eu',
      description: 'Nearly 300 hectares in the Ebro valley, fourteen cultivars chosen from over seventy trialled, and a mill on the plantation itself.',
    },
    tags: ['Navarra, Spain', 'Organic', 'WBOO 2025/26 · 26th'],
    lede: 'A family business at Tudela since 1780, whose olive-growing was revived and modernised in 1998. The Los Llanos estate covers nearly three hundred hectares in the Ebro valley between the Bardenas Reales and the Moncayo, and grows fourteen cultivars chosen from over seventy trialled.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#26', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Artajo 10 Bio Koroneiki', slug: 'artajo-10-koroneiki', cultivar: 'Koroneiki', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Koroneiki, Arbequina, Arbosana, Manzanilla Cacereña and Arróniz are the named cultivars, all farmed organically. The valley gets over 3,300 hours of sun a year, with Mediterranean, continental and Atlantic influences meeting in the same place.',
      'The mill sits on the plantation, so olives reach it within two hours of picking. Extraction runs at 18–20 °C with a double-cut mill, a refrigerated malaxer and refrigerated centrifuges, with in-line filtering; the oil is stored under nitrogen at 18–20 °C and bottled on demand into dark, inert bottles.',
    ],
    map: {
      image: { src: 'assets/img/maps/artajo.svg', alt: "Locator map: Fontellas, Navarra, Spain", w: 600, h: 600 }, placeholder: 'Map · Fontellas', caption: 'Fontellas, Navarra · 42.02° N, 1.64° W' },
  },
  {
    slug: 'balcon-del-guadalquivir',
    name: 'Balcón del Guadalquivir',
    country: 'Spain', countryCode: 'ES',
    locality: 'Baeza',
    regionName: 'Jaén, Andalusia',
    founded: '1959',
    geo: { lat: 37.99, lon: -3.47 },
    website: 'https://www.balcondelguadalquivir.com',
    seo: {
      title: 'Balcón del Guadalquivir — Baeza Co-op | bestoliveoils.eu',
      description: 'Around 500 members working some 2,100 hectares on La Loma at Baeza, with a plant sized to mill the whole day’s harvest on the day it is picked.',
    },
    tags: ['La Loma, Jaén', 'Cooperative', 'WBOO 2025/26 · 31st'],
    lede: 'The San Felipe Apóstol cooperative at Baeza, constituted at the end of the 1950s with about a hundred growers and now around five hundred. The name comes from its old site by the town’s watchtower, looking out over the Guadalquivir valley.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#31', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Balcón del Guadalquivir', slug: 'balcon-del-guadalquivir', cultivar: 'Picual', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Member groves cover roughly 2,100 hectares of La Loma around Baeza, in the upper Guadalquivir valley. The cooperative publishes conflicting tree counts — 200,000 on one page, 240,000 on another — and does not state its cultivar, though retailers and trade press describe the oil as Picual.',
      'It moved to new facilities in 2004–05 with machinery sized so that the entire day’s harvest can be milled the same day. The plant includes a large bodega, its own bottling line, a pitting machine and a wash-water treatment plant.',
    ],
    map: {
      image: { src: 'assets/img/maps/balcon-del-guadalquivir.svg', alt: "Locator map: Baeza, Jaén, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Baeza', caption: 'Baeza, Jaén · 37.99° N, 3.47° W' },
  },
  {
    slug: 'olivarera-la-purisima',
    name: 'Olivarera La Purísima',
    country: 'Spain', countryCode: 'ES',
    locality: 'Priego de Córdoba',
    regionName: 'Córdoba, Andalusia',
    founded: '1945',
    geo: { lat: 37.44, lon: -4.20 },
    website: 'https://coopurisimapriego.com',
    seo: {
      title: 'Olivarera La Purísima — Priego de Córdoba | bestoliveoils.eu',
      description: 'A cooperative founded in 1945 working traditional mountain groves of Picuda, Hojiblanca and Picual under DOP Priego de Córdoba.',
    },
    tags: ['Priego de Córdoba', 'DOP Priego de Córdoba', 'WBOO 2025/26 · 37th'],
    lede: 'A cooperative founded at Priego de Córdoba in 1945, working traditional mountain groves of the native Picuda, Hojiblanca and Picual in the Sierras Subbéticas, and bottling under the El Empiedro name.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#37', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'El Empiedro', slug: 'el-empiedro', cultivar: 'Picuda · Hojiblanca', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The cooperative runs its own mill on the Priego–Luque road and bottles four labels: El Empiedro, the organic BioEmpiedro, Bajondillo and Prados de Olivo. Its production manager, Antonio Jesús Mérida Jiménez, has been named Spain’s best mill master by the AEMO.',
      'El Empiedro took first prize in the sweet green fruity class at the Alimentos de España awards for 2023/24. Mill technology, storage, harvest window and grove altitude are not published, and the cooperative gives no polyphenol or acidity figures.',
    ],
    map: {
      image: { src: 'assets/img/maps/olivarera-la-purisima.svg', alt: "Locator map: Priego de Córdoba, Córdoba, Andalusia, Spain", w: 600, h: 600 }, placeholder: 'Map · Priego de Córdoba', caption: 'Priego de Córdoba, Córdoba · 37.44° N, 4.20° W' },
  },
  {
    slug: 'decimi',
    name: 'Decimi',
    country: 'Italy', countryCode: 'IT',
    locality: 'Bettona',
    regionName: 'Perugia, Umbria',
    founded: 'Early 2000s',
    geo: { lat: 43.01, lon: 12.48 },
    website: 'https://www.oliodecimi.it',
    seo: {
      title: 'Decimi — Umbrian Mill at Bettona | bestoliveoils.eu',
      description: 'Gambero Rosso’s Italian mill of the year in 2014, milling within four hours on solar power in the Colli Martani near Assisi.',
    },
    tags: ['Umbria, Italy', 'Milled in 4 hours', 'WBOO 2025/26 · 34th'],
    lede: 'A mill in the Colli Martani near Assisi that started in the early 2000s with about fifty trees and was named Italy’s mill of the year by Gambero Rosso in 2014. Its blend Emozione was Flos Olei’s best blended intense fruity in the world for 2024.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#34', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Emozione', slug: 'decimi-emozione', cultivar: 'Moraiolo · Frantoio · Leccino · San Felice', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Groves at Bettona, Collemancio and Giano dell’Umbria, planted to Moraiolo, San Felice, Frantoio and Leccino. Harvest runs October to November and olives are milled within four hours of picking.',
      'The mill is a two-phase MORI-TEM plant run under closely controlled cold extraction. Oil is stored in stainless steel under nitrogen, shielded from light and temperature-controlled. The site runs on photovoltaic power, burns olive pits as fuel and sends its by-products to biogas.',
    ],
    map: {
      image: { src: 'assets/img/maps/decimi.svg', alt: "Locator map: Bettona, Perugia, Umbria, Italy", w: 600, h: 600 }, placeholder: 'Map · Bettona', caption: 'Bettona, Perugia, Umbria · 43.01° N, 12.48° E' },
  },
  {
    slug: 'marsicani',
    name: 'Frantoio Marsicani',
    country: 'Italy', countryCode: 'IT',
    locality: 'Sicilì di Morigerati',
    regionName: 'Salerno, Campania',
    founded: '1928',
    geo: { lat: 40.15, lon: 15.55 },
    website: 'http://www.marsicani.com',
    seo: {
      title: 'Frantoio Marsicani — Cilento National Park | bestoliveoils.eu',
      description: 'Gambero Rosso’s Italian mill of the year in 2024, working ultra-centenarian olive trees inside the Cilento National Park, in business since 1928.',
    },
    tags: ['Cilento, Campania', 'Mill since 1928', 'WBOO 2025/26 · 37th'],
    lede: 'A family mill registered with the Salerno chamber of commerce in 1928 and modernised in 2007, working ultra-centenarian olive trees inside the Cilento National Park. Gambero Rosso named it Italy’s mill of the year in 2024 — the third time it had taken the title.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#37', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Opera Nostra', slug: 'marsicani-opera-nostra', cultivar: 'Not published', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The native cultivars are Pisciottana, Frantoio, Rotondella and Leccino, and the mill also works Itrana and Coratina for others. Around 1,500 quintals of olives pass through a year, of which roughly a hundred become the house extra virgin — about five thousand bottles plus tins. Three full-time sensory evaluators work on site.',
      'The published labels are Alter Ego, Viride, NU-EVO, Algoritmo and Plusvalore, and the mill’s DOP oil is Cilento DOP. The label credited in the World’s Best Olive Oils ranking, "Opera Nostra Campania IGP", does not appear in that range, and we have flagged it on the oil page rather than assume a match.',
    ],
    map: {
      image: { src: 'assets/img/maps/marsicani.svg', alt: "Locator map: Sicilì di Morigerati, Salerno, Campania, Italy", w: 600, h: 600 }, placeholder: 'Map · Morigerati', caption: 'Sicilì di Morigerati, Salerno · 40.15° N, 15.55° E' },
  },
  {
    slug: 'cetrone',
    name: 'Alfredo Cetrone',
    country: 'Italy', countryCode: 'IT',
    locality: 'Sonnino',
    regionName: 'Latina, Lazio',
    founded: '1860',
    geo: { lat: 41.42, lon: 13.24 },
    website: 'https://www.cetrone.it',
    seo: {
      title: 'Alfredo Cetrone — Itrana at Sonnino, Lazio | bestoliveoils.eu',
      description: 'Nearly 20,000 century-old Itrana trees at about 500 m, hand-picked and milled the same day. Nothing but Itrana is grown here.',
    },
    tags: ['Lazio, Italy', 'Itrana only', 'WBOO 2025/26 · 39th'],
    lede: 'The Cetrone family has grown century-old olives at Sonnino since 1860, and grows nothing but Itrana. The groves sit at around five hundred metres between the Monti Lepini and the Circeo National Park; the fruit is picked by hand and milled the same day.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#39', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Cetrone In', slug: 'cetrone-in', cultivar: 'Itrana', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Roughly a hundred hectares and nearly twenty thousand trees, all Itrana. Picking is by brucatura — stripping the fruit from the branch by hand — and milling is cold, on the same day, at the family’s own mill.',
      'The published range is Novolio, Intenso, Delicato, DOP Colline Pontine, Monocultivar Itrana and a Blend. The label listed in the World’s Best Olive Oils ranking, "In", does not appear among them; Intenso is the likeliest match, but the producer has not confirmed it and neither will we.',
    ],
    map: {
      image: { src: 'assets/img/maps/cetrone.svg', alt: "Locator map: Sonnino, Latina, Lazio, Italy", w: 600, h: 600 }, placeholder: 'Map · Sonnino', caption: 'Sonnino, Latina, Lazio · 41.42° N, 13.24° E' },
  },
  {
    slug: 'masoni-becciu',
    name: 'Masoni Becciu',
    country: 'Italy', countryCode: 'IT',
    locality: 'Villacidro',
    regionName: 'South Sardinia',
    founded: '1989',
    geo: { lat: 39.46, lon: 8.74 },
    website: 'https://masonibecciu.it',
    seo: {
      title: 'Masoni Becciu — Organic Estate, Villacidro | bestoliveoils.eu',
      description: 'Sixty-five organic hectares and 14,000 trees at 267 m below Monte Linas, planted at three different densities on purpose.',
    },
    tags: ['Sardinia, Italy', 'Organic', 'WBOO 2025/26 · 40th'],
    lede: 'An estate founded at Villacidro in 1989 by Gianni Deidda and Franca Maria Serra with an initial five hectares, now sixty-five and run by Valentina Deidda and Nicola Solinas. Everything is certified organic, and the estate claims more than three hundred awards.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#40', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Cuncordu', slug: 'masoni-becciu-cuncordu', cultivar: 'Not published', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Sixty-five hectares and over fourteen thousand trees at 267 metres, between the Campidano plain and the Monte Linas massif. The plantings deliberately mix traditional 10 × 10 m spacing with intensive 8 × 7 and 6 × 4 m layouts across the same estate.',
      'The property also runs an agriturismo with a tasting panel room, courses and slow-tourism activities. The estate publishes no cultivar names, harvest timing or chemistry for its oils, which is a real gap given how decorated they are.',
    ],
    map: {
      image: { src: 'assets/img/maps/masoni-becciu.svg', alt: "Locator map: Villacidro, South Sardinia, Italy", w: 600, h: 600 }, placeholder: 'Map · Villacidro', caption: 'Villacidro, South Sardinia · 39.46° N, 8.74° E' },
  },
  {
    slug: 'de-palma',
    name: 'Frantoio de Palma',
    country: 'Italy', countryCode: 'IT',
    locality: 'Puglia',
    regionName: 'Puglia',
    founded: 'Not published',
    geo: { lat: 41.00, lon: 16.50 },
    website: null,
    seo: {
      title: 'Frantoio de Palma — Puglia | bestoliveoils.eu',
      description: '41st in the World’s Best Olive Oils 2025/26, and the least documented producer on that table. What we could and could not verify.',
    },
    tags: ['Puglia, Italy', 'Almost no published data', 'WBOO 2025/26 · 41st'],
    lede: 'Frantoio Oleario Domenico de Palma SRL placed forty-first in the World’s Best Olive Oils 2025/26 with Olio Longevo Top Quality. Beyond the company name, the region and that placing, we could verify nothing at all — and we would rather say so than fill the page with plausible guesses.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '#41', label: 'best WBOO 2025/26 rank' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Olio Longevo Top Quality', slug: 'de-palma-olio-longevo', cultivar: 'Not published', intensity: 'Not stated', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'No reachable company website, no product data sheet in any language, no published town, founding year, hectares, cultivars or chemistry. Two candidate domains resolve in DNS but would not load, and we could not confirm that either belongs to this company.',
      'This is more common than it sounds. Puglia produces around half of all Italian olive oil, and a great many of its mills sell locally with essentially no presence online. A competition placing is sometimes the only public trace such a producer leaves.',
    ],
    map: {
      image: { src: 'assets/img/maps/de-palma.svg', alt: "Locator map: Puglia, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Puglia', caption: 'Puglia, Italy' },
  },
  {
    slug: 'etruna',
    name: 'Etruna',
    country: 'Italy', countryCode: 'IT',
    locality: 'Colli Assisi',
    regionName: 'Perugia, Umbria',
    founded: 'House label',
    geo: { lat: 43.07, lon: 12.62 },
    website: 'https://olijfoliemarkt.nl/collections/etruna',
    seo: {
      title: 'Etruna — Umbrian House Label | bestoliveoils.eu',
      description: 'The Umbrian house label of our retail partner, pressed in the Colli Assisi from Leccino, Frantoio and Moraiolo. Regular and an early-harvest organic Intense.',
    },
    tags: ['Umbria, Italy', 'Colli Assisi', 'Partner house label'],
    lede: 'The own-label Umbrian oil of olijfoliemarkt.nl, our retail partner, pressed for them in the Colli Assisi hills from the three traditional varieties of the DOP Umbria. Two bottlings: a medium Regular and a limited early-harvest organic Intense. Listed here on the same terms as every other oil — as a catalogue entry our panel has not yet scored.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '2', label: 'AIOOC medals' },
      { value: '2', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Etruna Regular', slug: 'etruna-regular', cultivar: 'Leccino · Frantoio · Moraiolo', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/olijfolie-markt-etruna-olijfolie' },
      { name: 'Etruna Intense Bio', slug: 'etruna-intense-bio', cultivar: 'Leccino · Frantoio', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/olijfolie-markt-etruna-intense-bio' },
    ],
    estate: [
      'The olives grow in the Colli Assisi, the hill zone north of Spoleto that gives the DOP Umbria its best-known sub-denomination. Regular is picked in early October as the fruit turns; Intense is hand-picked green at the end of September and cold-pressed within hours.',
      'The label is owned by our retail partner, which is why it is disclosed as such on every page that carries it. The mill is not named in the producer’s published material.',
    ],
    map: {
      image: { src: 'assets/img/maps/etruna.svg', alt: "Locator map: Colli Assisi, Perugia, Umbria, Italy", w: 600, h: 600 }, placeholder: 'Map · Colli Assisi', caption: 'Colli Assisi, Perugia, Umbria · 43.07° N, 12.62° E' },
  },
  {
    slug: 'marina-palusci',
    name: 'Marina Palusci',
    country: 'Italy', countryCode: 'IT',
    locality: 'Pianella',
    regionName: 'Pescara, Abruzzo',
    founded: 'Family estate',
    geo: { lat: 42.40, lon: 14.05 },
    website: 'https://www.marinapalusci.com',
    seo: {
      title: 'Marina Palusci — Dritta from Pianella, Abruzzo',
      description: 'A Pescara estate with Dritta trees of 450 years and older, cold-extracting within twelve hours. Four oils, from a 1,108 mg/kg monocultivar to a floral late harvest.',
    },
    tags: ['Abruzzo, Italy', 'Dritta', 'NYIOOC Gold 2025 · 2026'],
    lede: 'A family estate in the clay hills of Pianella, in the province of Pescara, built around Dritta — the local olive that is grown almost nowhere else — on trees that range from forty to more than four hundred and fifty years old. Olives are hand-picked, cold-extracted within twelve hours and decanted naturally under inert gas.',
    image: null,
    imagePlaceholder: 'Estate / grove photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: '1,108', label: 'mg/kg polyphenols, L’Uomo di Ferro' },
      { value: '4', label: 'available in our shop' },
    ],
    oils: [
      { name: 'L’Uomo di Ferro', slug: 'marina-palusci-luomo-di-ferro', cultivar: 'Dritta', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-luomo-di-ferro' },
      { name: 'L’Extravergine', slug: 'marina-palusci-lextravergine', cultivar: 'Dritta · Leccino', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-lextravergine' },
      { name: 'Novus', slug: 'marina-palusci-novus', cultivar: 'Dritta · Leccino', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-novus-colfondo' },
      { name: 'Alchimia', slug: 'marina-palusci-alchimia', cultivar: 'Leccio del Corno', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/marina-palusci-alchimia' },
    ],
    estate: [
      'Groves on clay and clay-limestone soils at roughly 280 m, between the Gran Sasso massif and the Adriatic. Dritta dominates, with Leccino as the blending partner and a forty-year-old block of Leccio del Corno for the late-harvest Alchimia. The oldest Dritta trees, which go into L’Uomo di Ferro, are stated to be 450 years and older.',
      'Harvest starts in the last week of September for the green bottlings and runs to late November for Alchimia. Fruit is cold-processed within twelve hours of picking; the oils rest in tanks under inert gas at controlled temperature. Polyphenol and acidity figures are the producer’s own.',
    ],
    map: {
      image: { src: 'assets/img/maps/marina-palusci.svg', alt: "Locator map: Pianella, Pescara, Abruzzo, Italy", w: 600, h: 600 }, placeholder: 'Map · Pianella', caption: 'Pianella, Pescara, Abruzzo · 42.40° N, 14.05° E' },
  },
  {
    slug: 'hermus',
    name: 'Hermus',
    country: 'Türkiye', countryCode: 'TR',
    locality: 'Köprübaşı',
    regionName: 'Manisa, Aegean',
    founded: '2017 (nursery 2008)',
    geo: { lat: 38.75, lon: 28.40 },
    website: 'https://www.hermus.com.tr',
    seo: {
      title: 'Hermus — Köprübaşı, Manisa | bestoliveoils.eu',
      description: 'An olive nursery on the Gediz plain that planted Arbequina, Memecik and Koroneiki and launched an oil label in 2017. Four oils in the library, all September picks.',
    },
    tags: ['Manisa, Türkiye', 'Early harvest', 'NYIOOC Gold 2019–2024'],
    lede: 'A label grown out of a nursery. Arbekina Fidancılık, run by mechanical engineer Ali Zihnioğlu at Köprübaşı on the Gediz plain, states it brought Arbequina to Türkiye in 2008; Hermus — the river’s ancient name — followed in 2017 as the oil brand. Everything is picked in early to mid-September, which is extremely early even for the Aegean.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: '2017', label: 'label launched' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Hermus Arbequina', slug: 'hermus-arbequina', cultivar: 'Arbequina', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/hermus-arbequina' },
      { name: 'Hermus Memecik', slug: 'hermus-memecik', cultivar: 'Memecik', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/hermus-memecik' },
      { name: 'Hermus Emerald', slug: 'hermus-emerald', cultivar: 'Arbequina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Hermus Ayvalık', slug: 'hermus-ayvalik', cultivar: 'Ayvalık', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/hermus-ayvalik' },
    ],
    estate: [
      'The producer states it started with 30 dönüm (3 ha) and now draws on more than 3,000 dönüm (300 ha) through contract growing; its US site says 3,000 acres and a 2023 newspaper profile says over 5,000 dönüm, so the figure is uncertain. Tree count is not published. The 2026 range is Memecik, Koroneiki, Picual, Emerald and Arbequina; Ayvalık, Trilye and Domat were bottled in earlier years.',
      'Cold extraction below 27 °C on the Turkish site, 20–25 °C on the US one. A 2020 newspaper profile stated the company had no mill of its own and also bought olives in; the producer’s current pages describe its own automated line. Certified under Türkiye’s Good Agricultural Practice scheme; organic and kosher claims appear only on the US and wholesale listings. Competition results are as the producer lists them; London IOOC 2023 for Memecik is confirmed on the competition’s site.',
    ],
    map: {
      image: { src: 'assets/img/maps/hermus.svg', alt: 'Locator map: Köprübaşı, Manisa, on the Gediz plain inland from the Aegean', w: 600, h: 600 }, placeholder: 'Map · Köprübaşı', caption: 'Köprübaşı, Manisa · 38.75° N, 28.40° E' },
  },
  {
    slug: 'buta-assos',
    name: 'Buta Assos',
    country: 'Türkiye', countryCode: 'TR',
    locality: 'Ayvacık',
    regionName: 'Çanakkale, North Aegean',
    founded: 'Not published',
    geo: { lat: 39.53, lon: 26.40 },
    website: 'https://butaassos.com.tr',
    seo: {
      title: 'Buta Assos — Ayvacık, Çanakkale | bestoliveoils.eu',
      description: 'An estate behind Assos with its own Mori-Tem mill, best known for Freyya Nefes, a monovarietal of the rare Hanım Parmağı olive. Flos Olei 2026, 91 points.',
    },
    tags: ['Çanakkale, Türkiye', 'Hanım Parmağı', 'Flos Olei 2026 · 91'],
    lede: 'An estate at Kulfal, in the hills behind the ancient city of Assos, founded by Nurlan Yusifov, with an Italian Mori-Tem press beside the grove and oils stored under argon and bottled to order. Its reputation rests on one unusual olive: Hanım Parmağı, a Çanakkale variety registered in 2017, which it bottles as Freyya Nefes. Freyya, Odin, Idun and Assos are product lines, not companies.',
    image: null,
    imagePlaceholder: 'Estate / mill photo',
    stats: [
      { value: '3', label: 'oils in library' },
      { value: '91', label: 'Flos Olei 2026' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Freyya Premium Nefes', slug: 'buta-assos-freyya-nefes', cultivar: 'Hanım Parmağı', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Odin Premium Oleocanthal', slug: 'buta-assos-odin-oleocanthal', cultivar: 'Ayvalık', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Assos Premium Gourmet', slug: 'buta-assos-premium-gurme', cultivar: 'Ayvalık', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Estate size, tree count, altitude and soil are not published. A Turkish olive journal counts about five hundred Hanım Parmağı trees mixed through the Kulfal grove. Harvest is early and by hand, with fruit never touching the ground and pressed the same day; the Golden Taste blend is picked in August. The producer lists FDA, kosher and organic-agriculture certificates without naming the issuers.',
      'Extraction on a Mori-Tem line at the estate; storage in stainless steel at 16–18 °C under argon; filled to order into dark glass with a nitrogen flush. Company-level credentials: Flos Olei 2026 at 91 points, and a claimed 40 international awards. Freyya Nefes sits in the 100-point tier of the World’s Best Olive Oils 2025/26 under the company name. An Olive Japan 2026 Double Gold claimed on the Japanese site could not be found in Olive Japan’s published results.',
    ],
    map: {
      image: { src: 'assets/img/maps/buta-assos.svg', alt: "Locator map: Ayvacık, Çanakkale, North Aegean, Türkiye", w: 600, h: 600 }, placeholder: 'Map · Ayvacık', caption: 'Kulfal, Ayvacık, Çanakkale · 39.53° N, 26.40° E' },
  },
  {
    slug: 'nermin-hanim',
    name: 'Nermin Hanım Zeytinliği',
    country: 'Türkiye', countryCode: 'TR',
    locality: 'Havran',
    regionName: 'Balıkesir, Edremit Gulf',
    founded: '2012',
    geo: { lat: 39.56, lon: 27.10 },
    website: 'https://nerminhanim.com',
    seo: {
      title: 'Nermin Hanım Zeytinliği — Havran, Edremit Gulf, Türkiye',
      description: 'An engineer-turned-grower’s estate under Mount Ida: tens of thousands of old trees, its own mill since 2019, lab reports on every oil. NYIOOC Gold 2020–2026.',
    },
    tags: ['Balıkesir, Türkiye', 'Kaz Dağları', 'NYIOOC Gold 2020–2026'],
    lede: 'Nermin Gelbal Gökduman left a career in steel and telecoms in 2012 to farm 800 trees at Altınoluk; the estate now covers villages across the Kaz Dağları foothills of the Edremit Gulf, with its own mill, shop and restaurant at Havran since 2019. Unusually for Türkiye, every oil carries a published polyphenol figure and a linked lab report.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '5', label: 'oils in library' },
      { value: '2012', label: 'founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Edremit Erken Hasat', slug: 'nermin-hanim-edremit-erken-hasat', cultivar: 'Edremit', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Arbequina Filtresiz', slug: 'nermin-hanim-arbequina', cultivar: 'Arbequina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Domat Erken Hasat', slug: 'nermin-hanim-domat', cultivar: 'Domat', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Trilye Erken Hasat', slug: 'nermin-hanim-trilye', cultivar: 'Trilye', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Memecik Erken Hasat', slug: 'nermin-hanim-memecik', cultivar: 'Memecik', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Groves in Altınoluk-Avcılar, Güre, Çamlıbel, Kızılkeçili, İnönü, Büyükdere, Kalabak, Dereli, Murateli and Keremköy. The producer’s own story says 4,200 dönüm (420 ha) and 60,000 century-old trees; its homepage says 50,000 trees and its US site 55,000 on 865 acres, so take the scale as “tens of thousands of old trees” rather than a number. Altitude and soil are not published. Early harvest runs September–October, mature harvest November–December.',
      'Own mill, own fruit only; cold extraction with the paste at about 20 °C, no hot water and no enzymes; nitrogen-blanketed steel tanks at 18 °C; bottled to order. No organic or other certification is published. Lab reports for peroxide, pesticides, chemistry and polyphenols are linked from each product page; the laboratory is not named. Competition results are as the producer lists them; London IOOC 2022 and JOOP 2022 are confirmed on the competitions’ sides, and Canada IOOC 2024 shows a Silver the producer’s list does not.',
    ],
    map: {
      image: { src: 'assets/img/maps/nermin-hanim.svg', alt: "Locator map: Havran, Balıkesir, Edremit Gulf, Türkiye", w: 600, h: 600 }, placeholder: 'Map · Havran', caption: 'Havran, Balıkesir · 39.56° N, 27.10° E' },
  },
  {
    slug: 'guglielmi',
    name: 'Olio Guglielmi',
    country: 'Italy', countryCode: 'IT',
    locality: 'Andria',
    regionName: 'Barletta-Andria-Trani, Puglia',
    founded: '1954',
    geo: { lat: 41.23, lon: 16.30 },
    website: 'https://olioguglielmi.it',
    seo: {
      title: 'Olio Guglielmi — Andria, Puglia | bestoliveoils.eu',
      description: 'A family mill in Andria, Coratina’s home town, bottling the variety as IGP Puglia, as an everyday Intenso and as the unfiltered Fior d’O olio nuovo.',
    },
    tags: ['Puglia, Italy', 'Coratina', 'Since 1954'],
    lede: 'A family oil mill in Andria, on the plain below Castel del Monte where Coratina was born, trading since 1954 and bottling under the Monogram label. The range runs from an IGP Puglia monocultivar and an organic Ogliarola to Fior d’O, the unfiltered first pressing of October. Every polyphenol figure on these pages is the producer’s own.',
    image: null,
    imagePlaceholder: 'Mill photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: '783', label: 'mg/kg polyphenols, Fior d’O' },
      { value: '4', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Monogram IGP Puglia', slug: 'guglielmi-monogram-igp-puglia', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-puglia-p-g-i' },
      { name: 'Bio IGP Puglia', slug: 'guglielmi-bio-igp-puglia', cultivar: 'Ogliarola', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-puglia-bio-p-g-i' },
      { name: 'Monogram Intenso', slug: 'guglielmi-monogram-intenso', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-monogram-intenso' },
      { name: 'Fior d’O', slug: 'guglielmi-fior-do', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/guglielmi-fior-do' },
    ],
    estate: [
      'Hectares and tree count are not published. The producer describes its mill as built on research and technological innovation, and bottles under several labels — Monogram, Le Monocultivar, Arso, Fior d’O, Leaf, Tales — of which the library carries the four our partner stocks. Oils are cold-pressed within hours of picking.',
      'Awards are claimed on the producer’s own pages — a NYIOOC Gold for Monogram Intenso, Bibenda 5 Gocce 2025 and a Gambero Rosso listing for the IGP — and have not been checked on the competitions’ sides.',
    ],
    map: {
      image: { src: 'assets/img/maps/guglielmi.svg', alt: "Locator map: Andria, Barletta-Andria-Trani, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Andria', caption: 'Andria, BAT, Puglia · 41.23° N, 16.30° E' },
  },
  {
    slug: 'le-ferre',
    name: 'Le Ferre',
    country: 'Italy', countryCode: 'IT',
    locality: 'Castellaneta',
    regionName: 'Taranto, Puglia',
    founded: 'Not published',
    geo: { lat: 40.63, lon: 16.94 },
    website: 'https://olioleferre.com',
    seo: {
      title: 'Le Ferre — Castellaneta, Taranto | bestoliveoils.eu',
      description: 'A Castellaneta producer whose Selezione publishes HPLC polyphenols from an accredited lab and took Gambero Rosso’s Best Blend of Italy 2024. Four oils here.',
    },
    tags: ['Puglia, Italy', 'Coratina & Frantoio', 'Gambero Rosso Best Blend 2024'],
    lede: 'A producer on the ravine country of Castellaneta, in the province of Taranto, with groves at 230–290 m. Its Selezione is one of the few oils in the library whose polyphenol figure comes with the laboratory’s name, method and report attached; the rest of the range — an IGP Coratina, an organic blend, an everyday four-variety blend — follows the same habit of publishing numbers. Founded year and estate size are not published.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: '703', label: 'mg/kg polyphenols, Selezione (HPLC)' },
      { value: '4', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Selezione', slug: 'le-ferre-selezione', cultivar: 'Coratina · Frantoio', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/leferre-selezione-olio' },
      { name: 'Olio di Puglia IGP', slug: 'le-ferre-olio-di-puglia-igp', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/leferre-olio-di-puglia-i-g-p' },
      { name: 'Puglia Bio', slug: 'le-ferre-puglia-bio', cultivar: 'Blend', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/leferre-puglia-bio' },
      { name: 'Multivarietale', slug: 'le-ferre-multivarietale', cultivar: 'Blend', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: true, shopUrl: 'https://olijfoliemarkt.nl/products/leferre-multivarietale' },
    ],
    estate: [
      'Groves between 230 and 290 m on neutral-pH soils, planted to Coratina, Ogliarola, Frantoio and Leccino. Olives are machine-harvested and processed within 24 hours; extraction is cold, below 27 °C, on a continuous two-phase line; oil is held in stainless steel under nitrogen.',
      'The producer positions blending as its craft, and publishes a technical sheet and laboratory report for each oil. Selezione’s figures are from Chemiservice in Monopoli, an ISO/IEC 17025 laboratory, by the IOC HPLC method.',
    ],
    map: {
      image: { src: 'assets/img/maps/le-ferre.svg', alt: "Locator map: Castellaneta, Taranto, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Castellaneta', caption: 'Castellaneta, Taranto, Puglia · 40.63° N, 16.94° E' },
  },
  {
    slug: 'frantoio-muraglia',
    name: 'Frantoio Muraglia',
    country: 'Italy', countryCode: 'IT',
    locality: 'Andria',
    regionName: 'Barletta-Andria-Trani, Puglia',
    founded: 'Five generations',
    geo: { lat: 41.23, lon: 16.29 },
    website: 'https://www.frantoiomuraglia.it',
    seo: {
      title: 'Frantoio Muraglia — Andria, Puglia | bestoliveoils.eu',
      description: 'A five-generation Andria mill led by Savino Muraglia, famous for its ceramic jars and bottling Coratina and Peranzana monocultivars under the Essenza line.',
    },
    tags: ['Puglia, Italy', 'Coratina', 'Ceramic jars'],
    lede: 'A family mill in Andria now in its fifth generation under Savino Muraglia, known abroad for hand-painted ceramic jars and at home for its Coratina. The Essenza bottles — an intense Coratina, a medium Peranzana and a pitted Coratina — are the oils without the pottery. Founded year, hectares and trees are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '770', label: 'mg/L polyphenols, Coratina' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Essenza Intenso', slug: 'muraglia-essenza-coratina', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Essenza Medio', slug: 'muraglia-essenza-peranzana', cultivar: 'Peranzana', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Coratina from the Andria plain, cold-extracted and filtered; the producer publishes a polyphenol figure for the Coratina (770 mg/L) and nothing for the Peranzana.',
      'The ceramic jars are decorated by hand in Puglia and have made the brand a design object; the oil is the same as in the bottles.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoio-muraglia.svg', alt: "Locator map: Andria, Barletta-Andria-Trani, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Andria', caption: 'Andria, Barletta-Andria-Trani, Puglia · 41.23° N, 16.29° E' },
  },
  {
    slug: 'olio-intini',
    name: 'Olio Intini',
    country: 'Italy', countryCode: 'IT',
    locality: 'Alberobello',
    regionName: 'Bari, Puglia',
    founded: 'Not published',
    geo: { lat: 40.78, lon: 17.24 },
    website: 'https://www.oliointini.it',
    seo: {
      title: 'Olio Intini — Alberobello, Puglia | bestoliveoils.eu',
      description: 'An organic producer in the trulli country of Alberobello that harvests and mills within the day. One Coratina monocultivar in the library.',
    },
    tags: ['Puglia, Italy', 'Organic', 'Alberobello'],
    lede: 'An organic mill in Alberobello, in the Itria valley south-east of Bari, whose rule is harvest and milling within the day. The library holds its Coratina monocultivar; the mill also presses a Fruttato blend of Olivastra, Picholine and Coratina sold in tins. Founded year and estate size are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '2023', label: 'Slow Food Presidio' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Monocultivar Coratina Bio', slug: 'intini-coratina-bio', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Organic groves on the Murgia dei Trulli, higher and cooler than the Bari plain.',
      'Recognitions claimed by the producer for the Coratina: Slow Food Presidio 2023, Gambero Rosso Tre Foglie 2023, Olive Japan 2023.',
    ],
    map: {
      image: { src: 'assets/img/maps/olio-intini.svg', alt: "Locator map: Alberobello, Bari, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Alberobello', caption: 'Alberobello, Bari, Puglia · 40.78° N, 17.24° E' },
  },
  {
    slug: 'frantoio-galantino',
    name: 'Frantoio Galantino',
    country: 'Italy', countryCode: 'IT',
    locality: 'Bisceglie',
    regionName: 'Barletta-Andria-Trani, Puglia',
    founded: 'Not published',
    geo: { lat: 41.24, lon: 16.5 },
    website: 'https://www.galantino.it',
    seo: {
      title: 'Frantoio Galantino — Bisceglie, Puglia | bestoliveoils.eu',
      description: 'A Bisceglie mill on the Adriatic north of Bari with Coratina from centuries-old groves and a DOP Terre di Bari Castel del Monte line.',
    },
    tags: ['Puglia, Italy', 'Coratina', 'DOP Terre di Bari'],
    lede: 'A mill on the coast at Bisceglie, between Trani and Molfetta, pressing Coratina from old groves inland and bottling a DOP Terre di Bari Castel del Monte line alongside its fruity-intensity range. Our partner stocks its children’s oils; the library carries L’Intenso. Founded year and estate size are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: 'DOP', label: 'Terre di Bari line' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'L’Intenso', slug: 'galantino-intenso', cultivar: 'Coratina', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Coratina from centuries-old groves north of Bari, cold-extracted.',
      'Also known for flavoured oils and a baby line; the Intenso is the serious bottle.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoio-galantino.svg', alt: "Locator map: Bisceglie, Barletta-Andria-Trani, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Bisceglie', caption: 'Bisceglie, Barletta-Andria-Trani, Puglia · 41.24° N, 16.5° E' },
  },
  {
    slug: 'frantoio-dorazio',
    name: 'Frantoio D’Orazio',
    country: 'Italy', countryCode: 'IT',
    locality: 'Conversano',
    regionName: 'Bari, Puglia',
    founded: '1964',
    geo: { lat: 40.97, lon: 17.11 },
    website: 'https://www.frantoiodorazio.it',
    seo: {
      title: 'Frantoio D’Orazio — Conversano, Puglia | bestoliveoils.eu',
      description: 'A Conversano mill founded in January 1964, pressing around 300,000 litres a year with more than 40% exported. Monocultivars of Peranzana, Olivastro and Picholine.',
    },
    tags: ['Puglia, Italy', 'Since 1964', 'Monocultivars'],
    lede: 'A mid-sized mill in the hills south-east of Bari, founded on 15 January 1964, pressing about 300,000 litres a year and exporting more than 40% of it. No DOP or IGP; the range is built on monocultivars — Peranzana, Olivastro, Picholine — of which the library carries the Peranzana.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '1964', label: 'founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Monocultivar Peranzana', slug: 'dorazio-peranzana', cultivar: 'Peranzana', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'About 300,000 litres a year; export share above 40% (regional producer profile).',
      'Tasting notes and figures are not published for the monocultivars.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoio-dorazio.svg', alt: "Locator map: Conversano, Bari, Puglia, Italy", w: 600, h: 600 }, placeholder: 'Map · Conversano', caption: 'Conversano, Bari, Puglia · 40.97° N, 17.11° E' },
  },
  {
    slug: 'frantoio-franci',
    name: 'Frantoio Franci',
    country: 'Italy', countryCode: 'IT',
    locality: 'Montenero d’Orcia',
    regionName: 'Grosseto, Tuscany',
    founded: '1958',
    geo: { lat: 42.9, lon: 11.43 },
    website: 'https://frantoiofranci.com',
    seo: {
      title: 'Frantoio Franci — Montenero d’Orcia, Tuscany',
      description: 'One of Tuscany’s most decorated mills, on Monte Amiata since 1958: Flos Olei Hall of Fame, Villa Magra Grand Cru at 100/100. Two oils in the library.',
    },
    tags: ['Tuscany, Italy', 'Since 1958', 'Flos Olei Hall of Fame'],
    lede: 'A family mill on the slopes of Monte Amiata in the southern Maremma, founded in 1958 and, by its own count, in Flos Olei’s top twenty nineteen times. Villa Magra Grand Cru is the flagship; Fiore del Frantoio the kitchen oil; a Delicate Maurino monocultivar took Il Magnifico’s best oil of Europe in 2023.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '100', label: 'Flos Olei 2026, Villa Magra' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Villa Magra Grand Cru', slug: 'franci-villa-magra-grand-cru', cultivar: 'Frantoio', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
      { name: 'Fiore del Frantoio', slug: 'franci-fiore-del-frantoio', cultivar: 'Tuscan blend', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Own mill at Montenero d’Orcia; harvest October–November. Hectares and trees are not published.',
      'Villa Magra Grand Cru is made in about 10,000 bottles; Flos Olei 2026 scored it 100/100 and Bibenda named it best EVOO of Italy in 2022.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoio-franci.svg', alt: "Locator map: Montenero d’Orcia, Grosseto, Tuscany, Italy", w: 600, h: 600 }, placeholder: 'Map · Montenero d’Orcia', caption: 'Montenero d’Orcia, Grosseto, Tuscany · 42.9° N, 11.43° E' },
  },
  {
    slug: 'frescobaldi',
    name: 'Marchesi Frescobaldi',
    country: 'Italy', countryCode: 'IT',
    locality: 'Chianti Rufina',
    regionName: 'Florence, Tuscany',
    founded: 'Laudemio since 1986',
    geo: { lat: 43.83, lon: 11.48 },
    website: 'https://www.frescobaldi.com',
    seo: {
      title: 'Marchesi Frescobaldi — Laudemio, Chianti Rufina',
      description: 'The Florentine wine house whose Laudemio is the best-known bottle of the Tuscan Laudemio consortium. NYIOOC Gold 2025 and 2026.',
    },
    tags: ['Tuscany, Italy', 'Laudemio', 'NYIOOC Gold 2025–26'],
    lede: 'A Florentine family estate better known for wine, whose olive oil became the public face of Laudemio — the consortium of Tuscan estates founded in the mid-1980s around early picking, cold extraction and panel tasting. The square bottle is shared; the oil is Frescobaldi’s own, from the Chianti Rufina hills east of Florence.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '1986', label: 'Laudemio consortium' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Laudemio Frescobaldi', slug: 'laudemio-frescobaldi', cultivar: 'Frantoio · Moraiolo · Leccino', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Frantoio, Moraiolo and Leccino from the Rufina estates, picked early by consortium rule and cold-extracted. Hectares and trees for olives are not published.',
      'Awards as listed by a US retailer: NYIOOC Gold 2025 and 2026, JOOP Gold 2025, Gambero Rosso Tre Foglie 2024/25.',
    ],
    map: {
      image: { src: 'assets/img/maps/frescobaldi.svg', alt: "Locator map: Chianti Rufina, Florence, Tuscany, Italy", w: 600, h: 600 }, placeholder: 'Map · Chianti Rufina', caption: 'Chianti Rufina, Florence, Tuscany · 43.83° N, 11.48° E' },
  },
  {
    slug: 'fattoria-di-volmiano',
    name: 'Fattoria di Volmiano',
    country: 'Italy', countryCode: 'IT',
    locality: 'Calenzano',
    regionName: 'Florence, Tuscany',
    founded: 'Gondi family',
    geo: { lat: 43.87, lon: 11.17 },
    website: 'https://www.gondi.com',
    seo: {
      title: 'Fattoria di Volmiano — Calenzano, Tuscany | bestoliveoils.eu',
      description: 'The Gondi family’s 550-hectare estate on Monte Morello: 70 hectares of olives, more than 20,000 trees up to 1,000 m, organic.',
    },
    tags: ['Tuscany, Italy', 'Organic', 'Laudemio'],
    lede: 'A Gondi family estate of about 550 hectares on Monte Morello, the hill wall north of Florence, with 70 hectares and more than 20,000 olive trees between 250 and 1,000 m — unusually high for Tuscany. Half Frantoio, 30% Moraiolo, 20% Leccino plus Pendolino, farmed organically and pressed at a traditional millstone mill. A member of the Laudemio consortium.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '20,000+', label: 'olive trees' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Laudemio Fattoria di Volmiano', slug: 'volmiano-laudemio', cultivar: 'Frantoio · Moraiolo · Leccino', intensity: 'Robust', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      '70 ha of olives, >20,000 trees, 250–1,000 m (Laudemio consortium profile).',
      'Traditional stone mill and press; organic certification.',
    ],
    map: {
      image: { src: 'assets/img/maps/fattoria-di-volmiano.svg', alt: "Locator map: Calenzano, Florence, Tuscany, Italy", w: 600, h: 600 }, placeholder: 'Map · Calenzano', caption: 'Calenzano, Florence, Tuscany · 43.87° N, 11.17° E' },
  },
  {
    slug: 'marfuga',
    name: 'Marfuga',
    country: 'Italy', countryCode: 'IT',
    locality: 'Campello sul Clitunno',
    regionName: 'Perugia, Umbria',
    founded: '1817',
    geo: { lat: 42.82, lon: 12.78 },
    website: 'https://www.marfuga.it',
    seo: {
      title: 'Marfuga — Campello sul Clitunno, Umbria | bestoliveoils.eu',
      description: 'A hillside mill above the Clitunno springs, in the same family since 1817, run on renewable energy; Flos Olei top-20 and a Gambero Rosso anniversary.',
    },
    tags: ['Umbria, Italy', 'Since 1817', 'Flos Olei top 20'],
    lede: 'Terraced groves and a mill above the springs of the Clitunno, between Spoleto and Foligno, in the Gradassi family since 1817. The mill runs on 100% renewable energy. Sassente, the Frantoio monocultivar, is in the library; the DOP Umbria Classico and a Moraiolo complete the range.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '1817', label: 'founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Sassente', slug: 'marfuga-sassente', cultivar: 'Frantoio', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Hillside terraces in the DOP Umbria Colli Assisi–Spoleto zone; harvest 15 October – 10 November for Sassente. Hectares and trees are not published.',
      'Flos Olei 2027 top-20 and a Gambero Rosso 40th-anniversary recognition in 2024, per the producer.',
    ],
    map: {
      image: { src: 'assets/img/maps/marfuga.svg', alt: "Locator map: Campello sul Clitunno, Perugia, Umbria, Italy", w: 600, h: 600 }, placeholder: 'Map · Campello sul Clitunno', caption: 'Campello sul Clitunno, Perugia, Umbria · 42.82° N, 12.78° E' },
  },
  {
    slug: 'agraria-riva-del-garda',
    name: 'Agraria Riva del Garda',
    country: 'Italy', countryCode: 'IT',
    locality: 'Riva del Garda',
    regionName: 'Trento, Trentino',
    founded: 'Co-operative',
    geo: { lat: 45.89, lon: 10.84 },
    website: 'https://www.agririva.it',
    seo: {
      title: 'Agraria Riva del Garda — 46° Parallelo | bestoliveoils.eu',
      description: 'The growers’ co-operative at the head of Lake Garda, pressing Europe’s northernmost commercial olive oil under the 46° Parallelo label.',
    },
    tags: ['Trentino, Italy', 'Casaliva', '46th parallel'],
    lede: 'A co-operative of small growers at Riva, at the northern tip of Lake Garda, where the lake’s stored warmth lets olives ripen at the 46th parallel — the northern limit of commercial olive growing in Europe. Casaliva is the variety; cold extraction on a two-phase continuous line; most fruit is hand-picked early.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '2', label: 'oils in library' },
      { value: '46°', label: 'parallel north' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: '46° Parallelo Monocultivar Casaliva', slug: 'agraria-riva-46-parallelo-casaliva', cultivar: 'Casaliva', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
      { name: '46° Parallelo Verde', slug: 'agraria-riva-46-parallelo-verde', cultivar: 'Casaliva blend', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Member groves around the north shore of the lake; the DOP Garda Trentino Imperiale and an organic Bianco complete the range.',
      'Awards for the Casaliva monocultivar as listed by the producer: Bibenda 5 Gocce 2024–2026, Gambero Rosso 3 Foglie 2026.',
    ],
    map: {
      image: { src: 'assets/img/maps/agraria-riva-del-garda.svg', alt: "Locator map: Riva del Garda, Trento, Trentino, Italy", w: 600, h: 600 }, placeholder: 'Map · Riva del Garda', caption: 'Riva del Garda, Trento, Trentino · 45.89° N, 10.84° E' },
  },
  {
    slug: 'olearia-caldera',
    name: 'Olearia Caldera',
    country: 'Italy', countryCode: 'IT',
    locality: 'Manerba del Garda',
    regionName: 'Brescia, Lombardy',
    founded: 'Not published',
    geo: { lat: 45.55, lon: 10.55 },
    website: 'https://oleariacaldera.com',
    seo: {
      title: 'Olearia Caldera — Manerba del Garda, Lombardy',
      description: 'A mill on the Brescia shore of Lake Garda bottling four monocultivars — Casaliva, Frantoio, Leccino and FS17. Solo Casaliva in the library.',
    },
    tags: ['Lombardy, Italy', 'Casaliva', 'Lake Garda'],
    lede: 'A mill at Manerba on the western, Lombard shore of Lake Garda, continuous-cycle extraction, bottling the lake’s Casaliva and three other varieties each as a monocultivar. Founded year and estate size are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '4', label: 'monocultivars bottled' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Solo Casaliva', slug: 'caldera-solo-casaliva', cultivar: 'Casaliva', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Monocultivars of Casaliva, Frantoio, Leccino and FS17 (producer).',
      'Tasting notes published; no figures.',
    ],
    map: {
      image: { src: 'assets/img/maps/olearia-caldera.svg', alt: "Locator map: Manerba del Garda, Brescia, Lombardy, Italy", w: 600, h: 600 }, placeholder: 'Map · Manerba del Garda', caption: 'Manerba del Garda, Brescia, Lombardy · 45.55° N, 10.55° E' },
  },
  {
    slug: 'olio-anfosso',
    name: 'Olio Anfosso',
    country: 'Italy', countryCode: 'IT',
    locality: 'Chiusavecchia',
    regionName: 'Imperia, Liguria',
    founded: 'Not published',
    geo: { lat: 43.97, lon: 7.98 },
    website: 'http://www.olioanfosso.com',
    seo: {
      title: 'Olio Anfosso — Chiusavecchia, Liguria | bestoliveoils.eu',
      description: 'A family mill in the Impero valley above Imperia, recently rebuilt, pressing Taggiasca. Tumaì monocultivar in the library.',
    },
    tags: ['Liguria, Italy', 'Taggiasca', 'Impero valley'],
    lede: 'A family mill at Chiusavecchia, up the Impero valley from Imperia, in the heart of Taggiasca country, with a mill rebuilt under the 2014–22 Ligurian rural development programme. Tumaì, the Taggiasca monocultivar, has been listed by Gambero Rosso. Founded year and estate size are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '—', label: 'figures not published' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Tumaì', slug: 'anfosso-tumai-taggiasca', cultivar: 'Taggiasca', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Taggiasca from the terraced valley groves of the Imperia hinterland.',
      'No figures published.',
    ],
    map: {
      image: { src: 'assets/img/maps/olio-anfosso.svg', alt: "Locator map: Chiusavecchia, Imperia, Liguria, Italy", w: 600, h: 600 }, placeholder: 'Map · Chiusavecchia', caption: 'Chiusavecchia, Imperia, Liguria · 43.97° N, 7.98° E' },
  },
  {
    slug: 'frantoio-di-santagata',
    name: 'Frantoio di Sant’Agata d’Oneglia',
    country: 'Italy', countryCode: 'IT',
    locality: 'Imperia',
    regionName: 'Imperia, Liguria',
    founded: '1827',
    geo: { lat: 43.9, lon: 8.04 },
    website: 'https://www.frantoiosantagata.com',
    seo: {
      title: 'Frantoio di Sant’Agata d’Oneglia — Imperia | bestoliveoils.eu',
      description: 'One of the oldest working mills on the Riviera, founded in 1827 above Oneglia, hand-picking Taggiasca before full ripeness and cold-pressing the same day.',
    },
    tags: ['Liguria, Italy', 'Since 1827', 'Taggiasca'],
    lede: 'A mill founded in 1827 in the hamlet of Sant’Agata above Oneglia, Imperia’s eastern half, pruning and picking by hand and cold-pressing the same day. Oro Taggiasco is the monocultivar in the library; the house also sells the olives, pesto and the rest of the Ligurian larder.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '1827', label: 'founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Oro Taggiasco', slug: 'santagata-oro-taggiasco', cultivar: 'Taggiasca', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Hand-pruned and hand-picked Taggiasca, cold-pressed the same day (producer).',
      'Recognitions per the producer: Ercole Olivario 2018, WineHunter Platinum 2019, Los Angeles IOOC 2019.',
    ],
    map: {
      image: { src: 'assets/img/maps/frantoio-di-santagata.svg', alt: "Locator map: Imperia, Imperia, Liguria, Italy", w: 600, h: 600 }, placeholder: 'Map · Imperia', caption: 'Imperia, Imperia, Liguria · 43.9° N, 8.04° E' },
  },
  {
    slug: 'ursini',
    name: 'Ursini',
    country: 'Italy', countryCode: 'IT',
    locality: 'Fossacesia',
    regionName: 'Chieti, Abruzzo',
    founded: 'Not published',
    geo: { lat: 42.24, lon: 14.48 },
    website: 'https://www.ursini.com',
    seo: {
      title: 'Ursini — Fossacesia, Abruzzo | bestoliveoils.eu',
      description: 'An organic producer on the Costa dei Trabocchi with groves at Fossacesia, Rocca San Giovanni and Lanciano, trees of 20 to 250 years.',
    },
    tags: ['Abruzzo, Italy', 'Organic', 'Gentile di Chieti'],
    lede: 'An organic estate on the Chieti coast south of Pescara, with groves at Fossacesia, Rocca San Giovanni and Lanciano carrying trees from twenty to two hundred and fifty years old, planted to Leccino and the local Gentile di Chieti. Founded year and hectares are not published.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '250', label: 'years, oldest trees' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Opera Mastra', slug: 'ursini-opera-mastra', cultivar: 'Leccino · Gentile di Chieti', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Organic groves on three sites along the Costa dei Trabocchi.',
      'No figures published for the oils.',
    ],
    map: {
      image: { src: 'assets/img/maps/ursini.svg', alt: "Locator map: Fossacesia, Chieti, Abruzzo, Italy", w: 600, h: 600 }, placeholder: 'Map · Fossacesia', caption: 'Fossacesia, Chieti, Abruzzo · 42.24° N, 14.48° E' },
  },
  {
    slug: 'olearia-san-giorgio',
    name: 'Olearia San Giorgio',
    country: 'Italy', countryCode: 'IT',
    locality: 'San Giorgio Morgeto',
    regionName: 'Reggio Calabria, Calabria',
    founded: '1940',
    geo: { lat: 38.43, lon: 16.1 },
    website: 'https://www.olearia.eu',
    seo: {
      title: 'Olearia San Giorgio — Fazari family, Calabria',
      description: 'The Fazari family mill on the Piana di Gioia Tauro since 1940, pressing Calabria’s own varieties. Altanum IGP in the library.',
    },
    tags: ['Calabria, Italy', 'Since 1940', 'IGP Olio di Calabria'],
    lede: 'A family mill at San Giorgio Morgeto on the Piana di Gioia Tauro, run by the Fazari brothers since 1940, pressing the plain’s own olives — Ottobratica above all, with Carolea, Sinopolese, Roggianella and Ciciarello. The first Calabrian producer in the library.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: '1940', label: 'founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'Altanum IGP', slug: 'olearia-san-giorgio-altanum', cultivar: 'Ottobratica · Carolea', intensity: 'Delicate', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'The Gioia Tauro plain, Italy’s densest olive landscape after Puglia, with very large Ottobratica trees.',
      'Altanum carries the IGP Olio di Calabria; no figures published.',
    ],
    map: {
      image: { src: 'assets/img/maps/olearia-san-giorgio.svg', alt: "Locator map: San Giorgio Morgeto, Reggio Calabria, Calabria, Italy", w: 600, h: 600 }, placeholder: 'Map · San Giorgio Morgeto', caption: 'San Giorgio Morgeto, Reggio Calabria, Calabria · 38.43° N, 16.1° E' },
  },
  {
    slug: 'san-giuliano',
    name: 'San Giuliano',
    country: 'Italy', countryCode: 'IT',
    locality: 'Alghero',
    regionName: 'Sassari, Sardinia',
    founded: 'Manca family',
    geo: { lat: 40.56, lon: 8.32 },
    website: 'https://www.sangiuliano.it',
    seo: {
      title: 'San Giuliano — Alghero, Sardinia | bestoliveoils.eu',
      description: 'Sardinia’s best-known olive oil house, the Manca family at Alghero, bottling DOP Sardegna from Bosana and the all-Italian L’Originale blend.',
    },
    tags: ['Sardinia, Italy', 'Bosana', 'DOP Sardegna'],
    lede: 'The Manca family’s mill at Alghero on the north-west coast, the largest name in Sardinian olive oil, with a DOP Sardegna built on Bosana and a range of blends that reaches supermarket shelves across Italy. L’Originale is in the library; the DOP Sardegna is the one to look for next.',
    image: null,
    imagePlaceholder: 'Mill / grove photo',
    stats: [
      { value: '1', label: 'oil in library' },
      { value: 'DOP', label: 'Sardegna' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      { name: 'L’Originale', slug: 'san-giuliano-loriginale', cultivar: 'Bosana · Coratina · Ogliarola', intensity: 'Medium', stars: 0, score: null, readers: '—', inShop: false },
    ],
    estate: [
      'Bosana-based DOP Sardegna and an organic version; L’Originale blends Bosana with mainland varieties.',
      'No figures published.',
    ],
    map: {
      image: { src: 'assets/img/maps/san-giuliano.svg', alt: "Locator map: Alghero, Sassari, Sardinia, Italy", w: 600, h: 600 }, placeholder: 'Map · Alghero', caption: 'Alghero, Sassari, Sardinia · 40.56° N, 8.32° E' },
  },
  {
    slug: 'cretan-heritage',
    name: 'Cretan Heritage',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Kissamos',
    regionName: 'Chania, Crete',
    founded: 'Not published',
    geo: { lat: 35.48, lon: 23.65 },
    website: 'https://www.cretanheritage.com',
    seo: { title: 'Cretan Heritage — Kissamos, Chania, Crete | bestoliveoils.eu', description: 'A Kissamos family mill pressing Tsounati and Koroneiki from Sfakopigadi the day they are picked: Athena Best Greek Oil 2024 for Krissa. Four oils here.' },
    tags: ['Chania, Crete', 'Own mill', 'Athena Best of Greece 2024'],
    lede: 'A family label from Kissamos at the western end of Crete, run by Michalis Cheretakis, whose groves at Sfakopigadi sit about a kilometre from the sea and whose fruit is milled the same day at Glykorizia. Two varieties, two lines: Krissa is the Chania-native Tsounati, One Root the island’s workhorse Koroneiki, each with an organic twin. The producer publishes its ten processing rules — malaxation capped at 45 minutes, extraction around 27 °C — rather than its hectares or founding year.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: '2024', label: 'Athena Best Greek Olive Oil, Krissa' },
      { value: '4', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Krissa',
        slug: 'cretan-heritage-krissa',
        cultivar: 'Tsounati',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-krissa',
      },
      {
        name: 'Krissa Bio',
        slug: 'cretan-heritage-krissa-bio',
        cultivar: 'Tsounati',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-krissa-bio',
      },
      {
        name: 'One Root',
        slug: 'cretan-heritage-one-root',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-one-root',
      },
      {
        name: 'One Root Bio',
        slug: 'cretan-heritage-one-root-bio',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/cretan-heritage-one-root-bio',
      },
    ],
    estate: ['The producer describes its land at Sfakopigadi of Kissamos as “2,500 acres” — almost certainly Greek stremmata, which would be about 250 hectares; the site does not say, and we have not converted it. Tree count is not published. The family traces the grove to the tenth century and its coat of arms to 981, by its own account.', 'Harvest runs October to January, picked “a bit earlier than specified”; the mill is the family’s own, a two-phase line with stainless steel throughout, malaxation at most 45 minutes, extraction averaging 27 °C and never above 30 °C. Each batch gets a chemical and a panel analysis, the producer states. The shop lists One Root as PDO/PGI; no producer, competition or reseller source names a designation, so we do not.'],
    map: {
      image: { src: 'assets/img/maps/cretan-heritage.svg', alt: "Locator map: Kissamos, Chania, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Kissamos', caption: 'Kissamos, Chania, Crete · 35.48° N, 23.65° E' },
  },
  {
    slug: 'corinto',
    name: 'Corinto',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Lechaio',
    regionName: 'Corinthia, Peloponnese',
    founded: 'Not published',
    geo: { lat: 37.93, lon: 22.85 },
    website: 'https://corinto-oliveoil.com',
    seo: { title: 'Corinto — Lechaio, Corinthia | bestoliveoils.eu', description: 'A Manaki specialist west of Corinth with its own certified mill: soft, low-bitterness oils, a high-phenolic blend and a NYIOOC Gold micro-batch.' },
    tags: ['Corinthia, Peloponnese', 'Manaki', 'NYIOOC Gold 2026'],
    lede: 'C. R. Corinto GP presses Manaki — the Peloponnese’s mild, aromatic variety — at Lechaio, eight kilometres west of Corinth on the Gulf, from its own trees and from “local cooperating producers”. The mill is the company’s own and certified FSSC 22000 and ISO 22000; harvest runs mid-October to early December. The range is three Manaki oils of rising seriousness and one deliberately bitter early-harvest Koroneiki–Nemoutiana blend. Family name and founding year are not published.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '4', label: 'oils in library' },
      { value: 'FSSC 22000', label: 'certified own mill' },
      { value: '4', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Corinto',
        slug: 'corinto-manaki',
        cultivar: 'Manaki',
        intensity: 'Delicate',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/corinto-extra-vierge-olijfolie-500ml',
      },
      {
        name: 'Corinto Bio',
        slug: 'corinto-bio',
        cultivar: 'Manaki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/corinto-bio-griekse-extra-vierge-olijfolie',
      },
      {
        name: 'Corinto High-Phenolic',
        slug: 'corinto-high-phenolic',
        cultivar: 'Koroneiki · Nemoutiana',
        intensity: 'Robust',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/corinto-high-phenolic-olijfolie',
      },
      {
        name: 'Manaki Limited Edition',
        slug: 'corinto-manaki-limited-edition',
        cultivar: 'Manaki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: true,
        shopUrl: 'https://olijfoliemarkt.nl/products/corinto-manaki-limited-edition',
      },
    ],
    estate: ['Lechaio was Corinth’s ancient western harbour; the groves are on the coastal plain behind it. The company cites “our family’s century-long experience with the Manaki variety” and lists six staff, exports to ten countries and a mill with FSSC 22000, ISO 22000:2018 and HACCP certification. Tree count, hectares and the organic certifier are not published.', 'Harvest is mid-October to early December with cold extraction and no heating, by the producer. Athena’s 2025 register lists the conventional Corinto as Manaki 85% / Koroneiki 15% while the producer says 100% Manaki — possibly a different lot, possibly the organic entry; we print the producer’s statement and note the discrepancy. The chemistry figures on the three Manaki oils come from laboratory reports our partner shop holds, not from a public page.'],
    map: {
      image: { src: 'assets/img/maps/corinto.svg', alt: "Locator map: Lechaio, Corinthia, Peloponnese, Greece", w: 600, h: 600 }, placeholder: 'Map · Lechaio', caption: 'Lechaio, Corinthia, Peloponnese · 37.93° N, 22.85° E' },
  },
  {
    slug: 'terra-creta',
    name: 'Terra Creta',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Kolymvari',
    regionName: 'Chania, Crete',
    founded: 'Not published',
    geo: { lat: 35.54, lon: 23.78 },
    website: 'https://www.terracreta.gr/en/',
    seo: { title: 'Terra Creta — Kolymvari, Chania, Crete | bestoliveoils.eu', description: 'Crete’s largest premium brand, a family company milling Koroneiki within twelve hours of picking; Grand Cru is the top Greek oil in the EVOO World Ranking.' },
    tags: ['Chania, Crete', 'PDO Kolymvari', 'NYIOOC Gold 2026'],
    lede: 'The biggest Cretan name in this library: Melissa Kikizas, a third-generation family food company, runs Terra Creta from Kolymvari west of Chania and mills contracted Koroneiki in its own facility within twelve hours of harvest. The lines carry PDO Kolymvari Chanion Kritis and PGI Chania; the company also runs an olive academy for its growers and publishes their soil and residue practices. Grand Cru, its single-variety selection, took the 2021 Mario Solinas first prize and a 2026 NYIOOC Gold.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '#1', label: 'Greek oil, EVOO World Ranking 2025' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Grand Cru',
        slug: 'terra-creta-grand-cru',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Terra Creta works with a network of growers rather than one estate; hectares and tree counts are not published. Harvest on Crete begins late September to early October and is over by February, the company states, with the optimum between October and December. All lines are Koroneiki.', 'Competition record as the producer lists it, with the 2026 NYIOOC Gold confirmed on the competition’s news site and the 2026 Terraolivo Grand Prestige Gold on Terraolivo’s awards site. The 2023 London IOOC Platinum and Berlin Gold badges on the producer’s site were not independently checked.'],
    map: {
      image: { src: 'assets/img/maps/terra-creta.svg', alt: "Locator map: Kolymvari, Chania, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Kolymvari', caption: 'Kolymvari, Chania, Crete · 35.54° N, 23.78° E' },
  },
  {
    slug: 'biolea',
    name: 'Biolea — Astrikas Estate',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Astrikas',
    regionName: 'Kolymvari, Chania, Crete',
    founded: 'Organic since 1993',
    geo: { lat: 35.5, lon: 23.78 },
    website: 'https://biolea.gr/',
    seo: { title: 'Biolea, Astrikas Estate — Stone-Milled Organic, Crete', description: 'A single estate above Kolymvari pressing organic Koroneiki with granite millstones and hydraulic presses, certified organic since 1993, sixth generation.' },
    tags: ['Chania, Crete', 'Stone-milled', 'Organic since 1993'],
    lede: 'Biolea is the odd one out in Cretan milling: the Dimitriadis family at Astrikas, in the hills above Kolymvari, crush with modernised granite stones and press hydraulically rather than spin a centrifuge. The estate has been certified organic with BioHellas since 1993 and is run today by Chloe Dimitriadis and Michalis Papadakis, the fifth and sixth generations. Alongside the estate Koroneiki it presses whole lemons and bitter oranges with the fruit. It is a visitor estate more than a competition entrant.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1993', label: 'organic-certified since' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Astrikas Estate Organic',
        slug: 'biolea-astrikas-estate',
        cultivar: 'Koroneiki',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Stone mills and hydraulic presses “enabling cold pressing”, with stainless-steel pressing filters, on the estate itself. The oil carries a PDO (retailers name it Kolymvari), an EU 432/2012 polyphenol health claim and ISO 22000 through TÜV Hellas, all by the producer. Hectares and harvest window are not published on the pages we could reach.', 'No recent major-competition result was found; the producer shows a Cretan competition badge without year or medal. A retailer prints an NMR figure of 786 mg/kg for one 250 ml lot — retailer-published and lot-specific, so it is not on the oil page.'],
    map: {
      image: { src: 'assets/img/maps/biolea.svg', alt: "Locator map: Astrikas, Kolymvari, Chania, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Astrikas', caption: 'Astrikas, Kolymvari, Chania · 35.50° N, 23.78° E' },
  },
  {
    slug: 'pamako',
    name: 'Pamako',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Selino',
    regionName: 'Chania, Crete',
    founded: 'Not published',
    geo: { lat: 35.25, lon: 23.81 },
    website: 'https://www.pamako.gr/',
    seo: { title: 'Pamako — Mountain Tsounati, Selino, Crete | bestoliveoils.eu', description: 'A small south-west Crete producer built on ~1,200 century-old Tsounati trees at 650 m, publishing a University of Athens NMR certificate each harvest.' },
    tags: ['Chania, Crete', 'Tsounati', '1,222 mg/kg (NMR, 2024)'],
    lede: 'Eftychis Androulakis’s label from the Selino district above Sougia and Paliochora, where about 1,200 old Tsounati trees grow at around 650 metres, with some 10,000 Koroneiki lower down near Maleme. The company runs its own extraction facility and the owner picks and presses himself. What sets Pamako apart is paperwork: every harvest gets an NMR phenolic certificate from the National and Kapodistrian University of Athens, which the producer publishes in full, and the oil was among the first Greek extra virgins registered as a food supplement.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1,222', label: 'mg/kg total phenols, 2024 (NMR, UoA)' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Monovarietal Tsounati',
        slug: 'pamako-monovarietal-tsounati',
        cultivar: 'Tsounati',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Fruit from the old mountain trees ripens in stages and is picked in several passes, according to an Olive Oil Times feature; months are not published. Organic certification (2025 certificate on the producer’s site), an EU health claim since 2013 and a Belgian food-supplement registration in 2019, by the producer.', 'The 2024 certificate (C2425-00285, 19 November 2024) gives 1,222 mg/kg total phenols with oleocanthal 372, oleacein 262 and oleuropein aglycone 233 mg/kg. Retailers advertise 2,081 mg/kg for another lot; it is not on the certificate, so it is not here. NYIOOC Golds in 2020 and 2022 (the latter for the blend) are reported by Olive Oil Times; the 2025/26 record could not be read from the competition’s site.'],
    map: {
      image: { src: 'assets/img/maps/pamako.svg', alt: "Locator map: Selino, Chania, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Selino', caption: 'Selino, Chania, Crete · 35.25° N, 23.81° E' },
  },
  {
    slug: 'oleum-crete',
    name: 'Oleum Crete — Kydonakis Bros',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Tympaki',
    regionName: 'Messara, Heraklion, Crete',
    founded: '1983',
    geo: { lat: 35.07, lon: 24.77 },
    website: 'https://www.oilcrete.com/en',
    seo: { title: 'Oleum Crete, Kydonakis Bros — Tympaki, Messara, Crete', description: 'A 1983 family mill on the Messara plain in southern Crete: PDO Messara Koroneiki from an 8,000 m² plant; four oils in the 2025 EVOO World Ranking.' },
    tags: ['Heraklion, Crete', 'PDO Messara', 'Est. 1983'],
    lede: 'Two brothers’ mill on the Messara plain, Crete’s largest southern olive basin between the Psiloritis massif and the Asterousia range. Kydonakis Bros has pressed here since 1983 and now runs an 8,000 m² production and bottling plant taking in ten tonnes an hour, malaxing at no more than 27 °C for no more than forty minutes, certified FSSC 22000. The oils are Koroneiki under PDO Messara, with an organic twin, styled soft and balanced rather than bitter. The company reports exports to 49 countries.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1983', label: 'mill founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'PDO Messara',
        slug: 'oleum-crete-pdo-messara',
        cultivar: 'Koroneiki',
        intensity: 'Delicate',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Tympaki, on the road along the plain; coordinates are the producer’s own. Hectares and tree counts are not published. The early-harvest line is picked “in the first weeks of the harvest, while the fruit is still green”, the producer states, without naming months.', 'PDO Messara certificate POC/2403-20889.13 and EU organic code GR-BIO-15.300-0079890 for the Bio version, both by the producer. The site claims “100+ international awards” with Gold at NYIOOC and Terraolivo but gives no years; the 2025 EVOO World Ranking places PDO Messara Bio and PDO Messara at #55 and #60 among Greek oils.'],
    map: {
      image: { src: 'assets/img/maps/oleum-crete.svg', alt: "Locator map: Tympaki, Messara, Heraklion, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Tympaki', caption: 'Tympaki, Messara, Crete · 35.07° N, 24.77° E' },
  },
  {
    slug: 'collias-estates',
    name: 'Collias Estates — Agia Marina',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Agia Marina',
    regionName: 'Chania, Crete',
    founded: 'Not published',
    geo: { lat: 35.52, lon: 23.93 },
    website: 'https://agiamarinaoliveoil.com/',
    seo: { title: 'Collias Estates, Agia Marina — PGI Chania Koroneiki', description: 'An owner-run single estate on the coast west of Chania town: gravity-filtered PGI Chania Koroneiki, one of the few Cretan Golds at NYIOOC 2025.' },
    tags: ['Chania, Crete', 'PGI Chania', 'NYIOOC Gold 2025'],
    lede: 'A small estate at Agia Marina on the north coast west of Chania, whose owner states he owns the trees, manages the land and oversees every step. The single oil is a Koroneiki under PGI Chania Kritis, pressed within hours and gravity-filtered rather than centrifuged, sold mostly direct to customers in the United States. It was one of the few Cretan Golds at NYIOOC 2025, reported by Olive Oil Times and repeated on the estate’s site. Hectares, tree count and harvest window are not published.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '2025', label: 'NYIOOC Gold' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Agia Marina Premium',
        slug: 'agia-marina-premium',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Whether the mill is the estate’s own is not stated. The producer gives free acidity as a range, 0.3–0.6%, and no polyphenol figure.'],
    map: {
      image: { src: 'assets/img/maps/collias-estates.svg', alt: "Locator map: Agia Marina, Chania, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Agia Marina', caption: 'Agia Marina, Chania, Crete · 35.52° N, 23.93° E' },
  },
  {
    slug: 'chrisopigi',
    name: 'Chrisopigi',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Chrisopigi',
    regionName: 'Sitia, Lasithi, Crete',
    founded: 'Not published',
    geo: { lat: 35.13, lon: 26.05 },
    website: 'https://chrisopigi.gr/en/',
    seo: { title: 'Chrisopigi — PDO Sitia, Lasithi, Crete | bestoliveoils.eu', description: 'The Lasithiotakis family’s PDO Sitia Koroneiki from a hill village at 400 m in eastern Crete, with its own mill; NYIOOC Best in Class Koroneiki 2017.' },
    tags: ['Lasithi, Crete', 'PDO Sitia', 'NYIOOC Best in Class 2017'],
    lede: 'The eastern end of the island: the Lasithiotakis family — third generation, four siblings named on the site — mill Koroneiki at Chrisopigi, a village at 400 metres in the municipality of Sitia, under PDO Sitia Lasithiou Kritis, and sell it through delis in Athens and Thessaloniki. The high point of its record is 2017, when NYIOOC gave it Gold and Best in Class for Koroneiki; recent results are quieter, a Bronze at Athena 2025. A laboratory analysis dated November 2025 on the site shows the oil is current.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '400 m', label: 'village altitude' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'PDO Sitia',
        slug: 'chrisopigi-pdo-sitia',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Own milling is stated; hectares, tree count and harvest window are not. Certifications: PDO Sitia and ISO 22000, with an EU 432/2012 health claim the producer states without printing a figure.'],
    map: {
      image: { src: 'assets/img/maps/chrisopigi.svg', alt: "Locator map: Chrisopigi, Sitia, Lasithi, Crete, Greece", w: 600, h: 600 }, placeholder: 'Map · Chrisopigi', caption: 'Chrisopigi, Sitia, Crete · 35.13° N, 26.05° E' },
  },
  {
    slug: 'laconiko',
    name: 'Laconiko',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Skala',
    regionName: 'Laconia, Peloponnese',
    founded: '2009',
    geo: { lat: 36.85, lon: 22.67 },
    website: 'https://laconiko.com',
    seo: { title: 'Laconiko — Skala, Laconia | bestoliveoils.eu', description: 'The Pierrakos brothers’ 5,000-tree Koroneiki estate by the Evrotas estuary in Laconia: Athena Double Gold, Best of Greece and Best Koroneiki 2025.' },
    tags: ['Laconia, Peloponnese', 'Koroneiki', 'Athena Best of Greece 2025'],
    lede: 'Diamantis and Dino Pierrakos, fourth generation, bottled their first batch in January 2009 from the family’s 5,000 Koroneiki trees at Skala, a few metres from the sea where the Evrotas meets the Laconian Gulf, inside a Natura 2000 area. The brand is run from Virginia and sells chiefly in the United States, which is why its medal list is so long at NYIOOC; in 2025 Athena gave the estate oil Double Gold, Best of Greece and Best Koroneiki in the world, all in the competition’s published results. Whether the mill is the family’s own is not stated.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '5,000', label: 'Koroneiki trees' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Laconiko Extra Virgin',
        slug: 'laconiko-extra-virgin',
        cultivar: 'Koroneiki',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Early harvest in November; fruit is “crushed at the olive mill every evening”. Hectares are not published. Besides the Koroneiki there is a Kalamon oil, Zoi, and an olio nuovo, both Athena Golds in 2026.', 'The producer’s blog reports two Golds and two Silvers at NYIOOC 2025 for the range without saying which oil took which, and “12 awards” in 2026; neither could be read on the competition’s own site, so they are listed as the producer states them.'],
    map: {
      image: { src: 'assets/img/maps/laconiko.svg', alt: "Locator map: Skala, Laconia, Peloponnese, Greece", w: 600, h: 600 }, placeholder: 'Map · Skala', caption: 'Skala, Laconia, Peloponnese · 36.85° N, 22.67° E' },
  },
  {
    slug: 'kyklopas',
    name: 'Kyklopas',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Makri',
    regionName: 'Evros, Thrace',
    founded: '1982',
    geo: { lat: 40.85, lon: 25.78 },
    website: 'https://kyklopas.com',
    seo: { title: 'Kyklopas — Makri, Evros, Thrace | bestoliveoils.eu', description: 'The Kelidis family mill at Makri near Alexandroupoli, founded 1982: 12,000 trees of the local Makri variety under Thrace’s only PDO. Athena Best of Thrace 2025.' },
    tags: ['Evros, Thrace', 'PDO Makris', 'Athena Best of Thrace 2025'],
    lede: 'Greece’s north-eastern corner, where the olive barely grows: Argyris and Niki Kelidis’s mill at Makri, outside Alexandroupoli, has pressed since 1982 and the company is the mill. Some 12,000 trees, 2,000 of them organic, of the local Makri variety — grown almost nowhere else — go into early-picked oils under PDO Makris, with Picual and Koroneiki in the blend. Athena gave Ages Organic Double Gold and Best of Thrace in 2025 and Ages Limited Reserve Gold and Best of Thrace in 2026, both in the competition’s own results.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1982', label: 'mill founded' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Ages PDO Makris',
        slug: 'kyklopas-ages-pdo-makris',
        cultivar: 'Makri',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Hectares and harvest months are not published; the style is agourelaio, early harvest. A producer news post gives one lot at 812 mg/kg polyphenols, 0.13% acidity and 2.8 peroxide with sensory medians of fruity 6.3, bitter 3.4, pungent 3.8 — undated and without a method, so it is quoted on the oil page as a producer figure and not given a meter. The current 2025/26 lot is listed by a retailer as “awaiting results”.', 'Other medals the producer lists — Olivalue Gold 2025, Berlin Platinum 2025 for the blend, Istanbul IOOC Platinum 2025, Anatolian IOOC Gold 2026 — are as the producer states them. No NYIOOC result for 2025 or 2026 appears on its awards page.'],
    map: {
      image: { src: 'assets/img/maps/kyklopas.svg', alt: "Locator map: Makri, Evros, Thrace, Greece", w: 600, h: 600 }, placeholder: 'Map · Makri', caption: 'Makri, Evros, Thrace · 40.85° N, 25.78° E' },
  },
  {
    slug: 'the-governor',
    name: 'The Governor — Olive Fabrica',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Agios Matthaios',
    regionName: 'Corfu, Ionian Islands',
    founded: '2010 (brand)',
    geo: { lat: 39.49, lon: 19.87 },
    website: 'https://thegovernor.gr',
    seo: { title: 'The Governor, Olive Fabrica — Agios Matthaios, Corfu', description: 'The Dafnis brothers’ 12,000 old Lianolia trees in south-west Corfu, picked in early October and bottled unfiltered: 1,316 mg/kg total phenols (WOCH).' },
    tags: ['Corfu, Ionian Islands', 'Lianolia', 'Unfiltered, early October'],
    lede: 'Spyros and George Dafnis, third generation at Agios Matthaios in south-west Corfu, started in 2010 with 2,000 abandoned trees and now farm 12,000, a hundred to five hundred years old, of Lianolia Kerkyras — a variety the island otherwise sends to bulk. The family’s own mill also presses for about a hundred local growers. The Governor is picked in the first weeks of October and bottled unfiltered, hand-numbered, seven to nine thousand bottles a year; phenol figures come from WOCH analyses and are published by the brand. Its competition run was strongest in 2013–2020.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '12,000', label: 'trees, 100–500 years old' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Limited Edition',
        slug: 'the-governor-limited-edition',
        cultivar: 'Lianolia',
        intensity: 'Robust',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Non-irrigated groves; DIO organic certification by the UK brand site; hectares not published. The Premium Edition is the same fruit picked a little later, 1,174 mg/kg total phenols by the same analysis.', 'Great Taste one star in 2026 and a NYIOOC Silver in 2020 are the recent results we could trace; the brand claims a hundred international awards without itemising them, and it does not appear in Athena’s 2025 or 2026 lists.'],
    map: {
      image: { src: 'assets/img/maps/the-governor.svg', alt: "Locator map: Agios Matthaios, Corfu, Ionian Islands, Greece", w: 600, h: 600 }, placeholder: 'Map · Agios Matthaios', caption: 'Agios Matthaios, Corfu · 39.49° N, 19.87° E' },
  },
  {
    slug: 'yannis-olive-grove',
    name: 'Yanni’s Olive Grove',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Nea Potidaia',
    regionName: 'Chalkidiki, Macedonia',
    founded: '2012',
    geo: { lat: 40.19, lon: 23.33 },
    website: 'https://yannisolivegrove.gr',
    seo: { title: 'Yanni’s Olive Grove — Nea Potidaia, Chalkidiki', description: 'A waterfront Chalkidiki estate of 6,000 trees that turned its table-olive varieties into early-harvest oil in 2012, pressed at its own mill.' },
    tags: ['Chalkidiki, Macedonia', 'Chondrolia', 'Own mill, Nea Tenedos'],
    lede: 'Yannis Prodromou and Evi Psounou-Prodromou farm more than 6,000 trees on the Kassandra waterfront at Nea Potidaia and, since 2012, press them for oil at their own plant in Nea Tenedos instead of curing them as table olives — Chondrolia Chalkidikis, Galani and wild Chalkidiki stock grafted with Chondrolia. Harvest is early, mid-September to mid-October, hand-picked. The estate’s oil was used in the MICOIL Alzheimer’s study. Its documentation is strongest for 2015–2019; no result from 2021 onwards was found, and the site was down when checked.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '6,000+', label: 'trees on the Kassandra waterfront' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Yanni’s Finest',
        slug: 'yannis-finest',
        cultivar: 'Chondrolia',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['The Limited line carries PDO Agoureleo Chalkidikis; organic status is stated by WOCH, and ISO 22000 and FDA registration by a trade directory. Hectares are not published. The producer’s own awards page stops at 2019–2020.'],
    map: {
      image: { src: 'assets/img/maps/yannis-olive-grove.svg', alt: "Locator map: Nea Potidaia, Chalkidiki, Macedonia, Greece", w: 600, h: 600 }, placeholder: 'Map · Nea Potidaia', caption: 'Nea Potidaia, Chalkidiki · 40.19° N, 23.33° E' },
  },
  {
    slug: 'sakellaropoulos',
    name: 'Sakellaropoulos Organic Farms',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Skoura',
    regionName: 'Sparta, Laconia',
    founded: '1992',
    geo: { lat: 37.03, lon: 22.52 },
    website: 'https://www.bioarmonia.gr',
    seo: { title: 'Sakellaropoulos Organic Farms — Skoura, Sparta', description: 'A Laconian single estate farmed organically since 1992 between Taygetos and Parnon; Fyllikon is picked unripe in mid-September. London Platinum 2026.' },
    tags: ['Laconia, Peloponnese', 'Organic since 1992', 'London IOOC Platinum 2026'],
    lede: 'The Sakellaropoulos family has farmed organically at Skoura, near Sparta, since 1992, with Bio-Hellas certification from the start, and by its own count has collected over 1,300 competition awards — mostly at London, Olympia and the EVOO World Ranking rather than New York. Fyllikon is its earliest oil, Koroneiki picked very green from mid-September and extracted at 16–18 °C within hours; it has been used in Harvard and Yale diet research. The producer states its oils exceed 2,000 mg/kg polyphenols but publishes no dated per-oil certificate; tree count and hectares are not disclosed.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1992', label: 'organic from the first year' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Fyllikon First Harvest',
        slug: 'fyllikon-first-harvest',
        cultivar: 'Koroneiki',
        intensity: 'Not stated',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['A single estate between the Taygetos and Parnon ranges; whether milling is on the estate is not explicitly stated. WOCH lists Fyllikon at “1,000+ mg/kg”; one retailer prints an NMR total of 1,825 mg/kg without a lot year. Neither is the producer’s own published analysis, so the oil page gives the claim, not a meter.', 'Results as the producer lists them: London IOOC Platinum 2026, fifteen London awards in 2025, EVOO World Ranking company #1 for gourmet oils and “EVOO of the Year 2025” for Fyllikon, Olympia Health & Nutrition high-phenolic awards. Not in Athena’s 2025 or 2026 lists; no NYIOOC result found on its site.'],
    map: {
      image: { src: 'assets/img/maps/sakellaropoulos.svg', alt: "Locator map: Skoura, Sparta, Laconia, Greece", w: 600, h: 600 }, placeholder: 'Map · Skoura', caption: 'Skoura, Sparta, Laconia · 37.03° N, 22.52° E' },
  },
  {
    slug: 'agrovim',
    name: 'Agrovim — Iliada',
    country: 'Greece',
    countryCode: 'GR',
    locality: 'Kalamata',
    regionName: 'Messinia, Peloponnese',
    founded: '1964 (A. Gyfteas), 1994 (Agrovim)',
    geo: { lat: 37.04, lon: 22.11 },
    website: 'https://www.agrovim.gr',
    seo: { title: 'Agrovim, Iliada — Kalamata, Messinia | bestoliveoils.eu', description: 'The Gyfteas family’s Kalamata bottler, successor to a 1964 firm: Iliada is the most widely exported PDO Kalamata Koroneiki, from a grower network.' },
    tags: ['Messinia, Peloponnese', 'PDO Kalamata', 'NYIOOC Gold 2025'],
    lede: 'The benchmark Kalamata, included as such: Agrovim continues A. Gyfteas S.A. of 1964, incorporated under its present name in 1994, and bottles Koroneiki from a network of Messinian growers at its own facility in Kalamata under PDO Kalamata. Iliada is the label most people outside Greece have met. It is a brand, not an estate — no hectares, trees or harvest window are published — and its medium-fruity, green-harvest profile is consistent from year to year. A 2025 NYIOOC Gold is reported through a retailer citing the company; Athena 2025 medals for the Iliada line are in the competition’s published results.',
    image: null,
    imagePlaceholder: 'Grove photo',
    stats: [
      { value: '1', label: 'oils in library' },
      { value: '1964', label: 'founding firm' },
      { value: '0', label: 'available in our shop' },
    ],
    oils: [
      {
        name: 'Iliada Kalamata PDO',
        slug: 'iliada-kalamata-pdo',
        cultivar: 'Koroneiki',
        intensity: 'Medium',
        stars: 0,
        score: null,
        readers: '—',
        inShop: false,
      },
    ],
    estate: ['Unripe green olives cold-extracted within 24 hours, by the producer; an organic version exists. Polyphenols and acidity are not published.'],
    map: {
      image: { src: 'assets/img/maps/agrovim.svg', alt: "Locator map: Kalamata, Messinia, Peloponnese, Greece", w: 600, h: 600 }, placeholder: 'Map · Kalamata', caption: 'Kalamata, Messinia, Peloponnese · 37.04° N, 22.11° E' },
  },
  ],

  /* ── competitions ─────────────────────────────────────────────────────
     The competitions and guides we follow. Every field is the organiser's
     own published fact (name, where it is judged, first edition, award
     scale); a field we could not confirm is left out rather than guessed —
     London IOOC's first year, KIOOC's first year, Dubai's organiser. `cites`
     are the spellings an oil's award strings use, so the hub can count how
     many library oils carry a result from each. A competition links to a
     table on this site only through a `rankings[]` record whose
     `competition` names it. */
  competitions: [
    { slug: 'nyiooc', shortName: 'NYIOOC', name: 'NYIOOC World Olive Oil Competition',
      organiser: 'Olive Oil Times', city: 'New York', country: 'United States', since: 2013,
      format: 'Medals', season: 'April', scale: 'Gold Award · Silver Award',
      website: 'https://nyiooc.org/', cites: ['NYIOOC', 'New York International'],
      note: 'The largest quality competition by entries — over a thousand oils from some thirty countries each spring.' },
    { slug: 'flos-olei', shortName: 'Flos Olei', name: 'Flos Olei — A Guide to the World of Extra Virgin Olive Oil',
      organiser: 'Marco Oreggia and Laura Marinelli', city: 'Rome', country: 'Italy', since: 2010,
      format: 'Guide scores', season: 'December', scale: '0–100 points · The Best · Hall of Fame (100/100)',
      website: 'https://www.flosolei.com/', cites: ['Flos Olei'],
      note: 'An annual printed guide, not a medal contest: each estate is tasted blind and scored out of 100.' },
    { slug: 'evooleum', shortName: 'EVOOLEUM', name: "EVOOLEUM World's TOP100 Extra Virgin Olive Oils",
      organiser: 'Mercacei and AEMO', city: 'Córdoba', country: 'Spain', since: 2016,
      format: 'Points table', scale: '0–100 points · the hundred highest scores form the TOP100',
      website: 'https://www.evooleum.com/', cites: ['EVOOLEUM', 'Evooleum'],
      note: 'Publishes a ranked top hundred with every oil’s score, ties broken by a chemical quality index.' },
    { slug: 'london-iooc', shortName: 'London IOOC', name: 'London International Olive Oil Competitions',
      organiser: 'Global Olive Oil Stars', city: 'London', country: 'United Kingdom',
      format: 'Medals', season: 'May–June', scale: 'Platinum (95.5–100) · Gold (85.5–95) · Silver (75.5–85) · Bronze (65–75)',
      website: 'https://www.londonoliveoil.com/', cites: ['London IOOC', 'London International', 'London'],
      note: 'Four divisions — Quality, Packaging, Health Claim (70% phenolic analysis) and Infused.' },
    { slug: 'olive-japan', shortName: 'Olive Japan', name: 'OLIVE JAPAN International Extra Virgin Olive Oil Competition',
      organiser: 'Olive Oil Sommelier Association of Japan', city: 'Tokyo', country: 'Japan', since: 2012,
      format: 'Medals', season: 'June', scale: 'Premier · Gold · Silver; Country Best',
      website: 'https://olivejapan.com/en', cites: ['Olive Japan', 'OLIVE JAPAN'],
      note: 'The largest competition in Asia–Oceania, around eight hundred entries a year.' },
    { slug: 'kiooc', shortName: 'KIOOC', name: 'Korea International Olive Oil Competition',
      organiser: 'Olive Standard (JOS Agricultural Corporation)', city: 'Seogwipo, Jeju', country: 'South Korea',
      format: 'Medals', season: 'June', scale: 'Platinum · Gold · Silver',
      website: 'https://www.kiooc.com/', cites: ['KIOOC', 'Korea International', 'Korea'],
      note: 'South Korea’s first international olive oil competition; categories for monovarietal, blended, organic, infused and PDO/PGI oils.' },
    { slug: 'mario-solinas', shortName: 'Mario Solinas', name: 'Mario Solinas Quality Award',
      organiser: 'International Olive Council', city: 'Madrid', country: 'Spain', since: 2000,
      format: 'Ranking', season: 'April', scale: 'First · Second · Third Prize and Finalists per fruitiness category',
      website: 'https://www.internationaloliveoil.org/', cites: ['Mario Solinas', 'Solinas'],
      note: 'The only competition run by the intergovernmental IOC itself; three places per category rather than unlimited medals.' },
    { slug: 'athena', shortName: 'ATHIOOC', name: 'ATHENA International Olive Oil Competition',
      organiser: 'Vinetum', city: 'Athens', country: 'Greece', since: 2016,
      format: 'Medals', season: 'May', scale: 'Double Gold (95–100) · Gold (85–94.9) · Silver (75–84.9) · Bronze (65–74.9)',
      website: 'https://www.athenaoliveoil.gr/en/', cites: ['Athena', 'ATHIOOC', 'ATHENA'],
      note: 'Judged each May in a different Greek olive-growing region.' },
    { slug: 'berlin-gooa', shortName: 'Berlin GOOA', name: 'Berlin Global Olive Oil Awards',
      organiser: 'Berlin GOOA', city: 'Berlin', country: 'Germany', since: 2020,
      format: 'Medals', season: 'April–May', scale: 'Platinum (96–100) · Gold (91–95) · Silver (86–90) · Bronze (81–85)',
      website: 'https://berlingooa.com/', cites: ['Berlin GOOA', 'Berlin'],
      note: 'Results roll out from mid-April; winners are listed on eliteoliveoils.com.' },
    { slug: 'la-ievooc', shortName: 'LA IEVOOC', name: 'Los Angeles International Extra Virgin Olive Oil Competition',
      organiser: 'Fairplex', city: 'Pomona, California', country: 'United States', since: 2000,
      format: 'Medals', season: 'February–March', scale: 'Best of Show · Best of Class · Gold (90+) · Silver · Bronze',
      website: 'https://fairplex.com/competitions/olive-oil-competition/', cites: ['Los Angeles', 'LA IEVOOC', 'LAIEVOOC'],
      note: 'The oldest of the US competitions, judged in late February at the Los Angeles County Fair grounds.' },
    { slug: 'terraolivo', shortName: 'Terraolivo', name: 'TerraOlivo — Mediterranean International Olive Oil Competition',
      organiser: 'TerraOlivo', city: 'Jerusalem', country: 'Israel', since: 2010,
      format: 'Medals', season: 'June', scale: 'Grand Prestige Gold · Prestige Gold · Gold',
      website: 'https://www.terraolivo.org/', cites: ['Terraolivo', 'TerraOlivo'],
      note: 'Three tiers of gold-named awards rather than gold, silver and bronze.' },
    { slug: 'joop', shortName: 'JOOP', name: 'Japan Olive Oil Prize',
      organiser: 'JOOP Organizing Committee with the Italian Chamber of Commerce in Japan', city: 'Tokyo', country: 'Japan', since: 2013,
      format: 'Medals', season: 'June', scale: 'Best in Class (9.50–10) · Gold (8.00–9.49) · Silver (7.00–7.99)',
      website: 'https://jooprize.com/', cites: ['JOOP', 'Japan Olive Oil Prize'],
      note: 'Scores on a 7.00–10.00 decimal scale; also names a Best of Country and a highest-polyphenol oil.' },
    { slug: 'canada-iooc', shortName: 'Canada IOOC', name: 'Canada International Olive Oil Competition',
      organiser: 'Global Olive Oil Stars', city: 'Montreal', country: 'Canada', since: 2021,
      format: 'Medals', season: 'May–June', scale: 'Platinum · Gold · Silver · Bronze',
      website: 'https://canadaiooc.com/', cites: ['Canada IOOC', 'Canada International'],
      note: 'Sister event of London IOOC, with the same organiser and the same results portal.' },
    { slug: 'wboo', shortName: 'WBOO', name: "World's Best Olive Oils",
      organiser: "World's Best Olive Oils (non-profit)", since: 2012,
      format: 'Ranking', season: 'After the spring competitions, per harvest year', scale: 'Points per competition placing (50 down to 15) plus bonus, 100 maximum per competition',
      website: 'https://www.wboo.org/', cites: ['WBOO', "World's Best Olive Oils", 'World Ranking'],
      note: 'A meta-ranking, not a contest: it totals results from the strictest competitions it tracks over a season.' },
    { slug: 'sol-d-oro', shortName: "Sol d'Oro", name: "Sol d'Oro International Competition",
      organiser: 'Veronafiere', city: 'Verona', country: 'Italy', since: 2002,
      format: 'Medals', season: 'February–March (Northern Hemisphere) · September (Southern)', scale: "Sol d'Oro · Sol d'Argento · Sol di Bronzo · Gran Menzione",
      website: 'https://www.solagrifood.com/en/sol-d-oro', cites: ["Sol d'Oro", 'Sol d’Oro', "Sol d'Argento", 'Sol d’Argento', 'Sol di Bronzo'],
      note: 'Successor to Veronafiere’s Leone d’Oro; winners are published in the Stars of the Golden Sun guide.' },
    { slug: 'biol', shortName: 'BIOL', name: 'Premio Internazionale BIOL',
      organiser: 'Ci.Bi. with Biol Italia', city: 'Bari', country: 'Italy', since: 1996,
      format: 'Ranking', season: 'March', scale: 'Top Ten · ExtraGold · Gold · Biol Quality Certificate (65–69.99)',
      website: 'https://premiobiol.it/', cites: ['BIOL', 'Biol'],
      note: 'Certified-organic oils only, since 1996 — the oldest competition on this list.' },
    { slug: 'evo-iooc', shortName: 'EVO IOOC', name: 'EVO International Olive Oil Contest',
      organiser: 'Associazione EVO IOOC', city: 'Palmi, Calabria', country: 'Italy', since: 2016,
      format: 'Medals', season: 'June', scale: 'Gold Medal · Silver Medal; nominees announced first',
      website: 'https://www.evo-iooc.it/', cites: ['EVO IOOC', 'EVOIOOC'],
      note: 'Began in Palermo in 2016 as the Domina IOOC; nominees are announced before the medals.' },
    { slug: 'dubai-ooc', shortName: 'Dubai OOC', name: 'Dubai Olive Oil Competition',
      city: 'Dubai', country: 'United Arab Emirates',
      format: 'Medals', season: 'June, with a separate early-harvest edition', scale: 'Gold · Silver',
      website: 'https://dubaiooc.com/', cites: ['Dubai'],
      note: 'Results are announced at the awards ceremony during the competition itself.' },
  ],

  /* ── rankings ─────────────────────────────────────────────────────────
     Competition tables we republish in full. Rows are the competition's own
     words, lightly normalised (accents, company suffixes); `oilSlug` links a
     row to its library entry and is null when we have no page for it. The
     build refuses a slug that does not exist. */
  rankings: [
    {
      slug: 'worlds-best-olive-oils-2025-26',
      competition: 'WBOO',
      name: "World's Best Olive Oils 2025/26",
      shortName: 'WBOO 2025/26',
      source: { label: 'wboo.org — the published ranking', url: 'https://www.wboo.org/worlds-best-olive-oils.html' },
      seo: {
        title: "World's Best Olive Oils 2025/26 — the Full 83-Oil Table",
        description: 'All 83 oils in the WBOO 2025/26 ranking with points, producer and country, linked to our library page for every oil we cover. A competition result, not our score.',
      },
      heading: "World's Best Olive Oils 2025/26",
      lede: 'The full 83-oil table of the 2025/26 World Ranking, republished with a link to our own page on every oil the library covers.',
      intro: [
        'The World\'s Best Olive Oils ranking is compiled by the World Ranking EVOO project from the results of the international competitions it tracks over a season. An oil earns points for each medal or placing it collects, and the table is the season\'s running total. It rewards oils that are entered widely and win repeatedly, which is a different thing from a single blind tasting — and it is not our panel.',
        'Ranks 1 to 41 are ordered by points. Everything from 42 down shares 100 points and is one flat tier in the source table; we list it alphabetically by producer, as the competition does, and give it no further order.',
        'Names are the competition\'s own, lightly normalised. Where the competition and the producer disagree about a product\'s name — Virrey del Pino "Selección", Cetrone "In", Opera Nostra "Campania IGP" — the library page says so.',
      ],
      corrections: [
        'Almazaras de la Subbética is an S.C.A. (cooperative), not an S.L.',
        'Goya en España is in Alcalá de Guadaíra, Sevilla.',
        'S.C.A. Olivarera La Purísima is in the province of Córdoba; El Empiedro is DOP Priego de Córdoba.',
        'S.C.A. Sierra de la Pandera is in Los Villares, not in the city of Jaén.',
      ],
      rows: [
      { rank: 1, oil: 'Don Gioacchino', producer: 'Az. Agr. Leone Sabino', country: 'Italy', points: 465, oilSlug: 'sabino-leone-don-gioacchino' },
      { rank: 2, oil: 'Único', producer: 'Miceli & Sensat S.S.A.', country: 'Italy', points: 365, oilSlug: 'miceli-sensat-unico' },
      { rank: 3, oil: 'Oro Bailén Picual', producer: 'Aceites Oro Bailén Galgon 99 SL', country: 'Spain', points: 290, oilSlug: 'oro-bailen-picual' },
      { rank: 4, oil: 'Monini Monocultivar Coratina', producer: 'Monini S.p.A.', country: 'Italy', points: 285, oilSlug: 'monini-monocultivar-coratina' },
      { rank: 5, oil: 'Oro Bailén Picual Bio', producer: 'Aceites Oro Bailén Galgon 99 SL', country: 'Spain', points: 280, oilSlug: 'oro-bailen-picual-organic' },
      { rank: 5, oil: 'Rincón de la Subbética Hojiblanca', producer: 'Almazaras de la Subbética S.C.A.', country: 'Spain', points: 280, oilSlug: 'rincon-de-la-subbetica-hojiblanca' },
      { rank: 5, oil: 'O-Med Picual', producer: 'Venchipa S.L.', country: 'Spain', points: 280, oilSlug: 'o-med-picual' },
      { rank: 8, oil: 'Don Remigio', producer: 'Oleícola Jaén', country: 'Spain', points: 265, oilSlug: 'oleicola-jaen-don-remigio' },
      { rank: 9, oil: 'Parqueoliva Serie Oro', producer: 'Almazaras de la Subbética S.C.A.', country: 'Spain', points: 260, oilSlug: 'parqueoliva-serie-oro' },
      { rank: 9, oil: 'Epicure', producer: 'Knolive Oils SL', country: 'Spain', points: 260, oilSlug: 'knolive-epicure' },
      { rank: 11, oil: 'Xiang Yu Coratina', producer: 'Longnan Xiangyu Olive Development Co., Ltd.', country: 'China', points: 195, oilSlug: 'xiangyu-coratina' },
      { rank: 12, oil: 'Virrey del Pino', producer: 'Ntra. Sra. de Guadalupe S.C.A.', country: 'Spain', points: 190, oilSlug: 'virrey-del-pino' },
      { rank: 13, oil: 'Olivastro', producer: 'Az. Agr. Quattrociocchi Americo', country: 'Italy', points: 185, oilSlug: 'quattrociocchi-olivastro' },
      { rank: 13, oil: 'Crognale', producer: 'Az. Agr. Tommaso Masciantonio', country: 'Italy', points: 185, oilSlug: 'trappeto-di-caprafico-crognale' },
      { rank: 13, oil: 'Oro de Cánava', producer: 'Ntra. Sra. de los Remedios', country: 'Spain', points: 185, oilSlug: 'oro-de-canava' },
      { rank: 13, oil: 'Oleícola Jaén Picual Especial', producer: 'Oleícola Jaén', country: 'Spain', points: 185, oilSlug: 'oleicola-jaen-picual-especial' },
      { rank: 17, oil: 'DOP Colline Pontine Bio', producer: 'Az. Agr. Biologica Paola Orsini', country: 'Italy', points: 180, oilSlug: 'paola-orsini-dop-colline-pontine' },
      { rank: 17, oil: 'Mimì Premium Blend', producer: 'Az. Agr. Donato Conserva', country: 'Italy', points: 180, oilSlug: 'mimi-premium-blend' },
      { rank: 17, oil: 'Terracuza Biologico', producer: 'Azienda Agricola Giacomo Nieddu', country: 'Italy', points: 180, oilSlug: 'terracuza-biologico' },
      { rank: 17, oil: 'Schinosa La Coratina', producer: 'Aziende Agricole di Martino Sas', country: 'Italy', points: 180, oilSlug: 'schinosa-la-coratina' },
      { rank: 17, oil: 'Goya Organics', producer: 'Goya en España S.A.U.', country: 'Spain', points: 180, oilSlug: 'goya-organics' },
      { rank: 17, oil: 'Oleícola Jaén Eco', producer: 'Oleícola Jaén', country: 'Spain', points: 180, oilSlug: 'oleicola-jaen-eco' },
      { rank: 17, oil: 'Oro del Desierto Picual', producer: 'Rafael Alonso Aguilera S.L.', country: 'Spain', points: 180, oilSlug: 'oro-del-desierto-picual' },
      { rank: 17, oil: 'Olibaeza Premium Picual', producer: 'S.C.A. del Campo "El Alcázar"', country: 'Spain', points: 180, oilSlug: 'olibaeza-premium-picual' },
      { rank: 17, oil: 'Jabalcuz Gran Selección', producer: 'S.C.A. Sierra de la Pandera', country: 'Spain', points: 180, oilSlug: 'jabalcuz-gran-seleccion' },
      { rank: 26, oil: 'Primo DOP Tonda Iblea', producer: 'Frantoi Cutrera Srl', country: 'Italy', points: 175, oilSlug: 'frantoi-cutrera-primo-dop' },
      { rank: 26, oil: 'Goya Único', producer: 'Goya en España S.A.U.', country: 'Spain', points: 175, oilSlug: 'goya-unico' },
      { rank: 26, oil: 'Verde', producer: 'Miceli & Sensat S.S.A.', country: 'Italy', points: 175, oilSlug: 'miceli-sensat-verde' },
      { rank: 26, oil: 'El Santuario de Mágina Selección Temprana', producer: 'S.C.A. San Isidro Labrador', country: 'Spain', points: 175, oilSlug: 'santuario-de-magina-seleccion-temprana' },
      { rank: 26, oil: 'Artajo 10 Bio Koroneiki', producer: 'Suministro Agroebro S.L.', country: 'Spain', points: 175, oilSlug: 'artajo-10-koroneiki' },
      { rank: 31, oil: 'Oro del Desierto Coupage', producer: 'Rafael Alonso Aguilera S.L.', country: 'Spain', points: 170, oilSlug: 'oro-del-desierto-coupage' },
      { rank: 31, oil: 'Oro del Desierto Hojiblanca', producer: 'Rafael Alonso Aguilera S.L.', country: 'Spain', points: 170, oilSlug: 'oro-del-desierto-hojiblanca' },
      { rank: 31, oil: 'Balcón del Guadalquivir', producer: 'S.C.A. San Felipe Apóstol', country: 'Spain', points: 170, oilSlug: 'balcon-del-guadalquivir' },
      { rank: 34, oil: 'Almaoliva Bio', producer: 'Almazaras de la Subbética S.C.A.', country: 'Spain', points: 165, oilSlug: 'almaoliva-bio' },
      { rank: 34, oil: 'Riserva Paola Orsini', producer: 'Az. Agr. Biologica Paola Orsini', country: 'Italy', points: 165, oilSlug: 'paola-orsini-riserva' },
      { rank: 34, oil: 'Emozione', producer: 'Decimi Società Agricola', country: 'Italy', points: 165, oilSlug: 'decimi-emozione' },
      { rank: 37, oil: 'Opera Nostra Campania IGP', producer: 'Nicolangelo Marsicani', country: 'Italy', points: 160, oilSlug: 'marsicani-opera-nostra' },
      { rank: 37, oil: 'El Empiedro', producer: 'S.C.A. Olivarera La Purísima', country: 'Spain', points: 160, oilSlug: 'el-empiedro' },
      { rank: 39, oil: 'In', producer: 'Az. Agr. Alfredo Cetrone', country: 'Italy', points: 155, oilSlug: 'cetrone-in' },
      { rank: 40, oil: 'Cuncordu', producer: 'Masoni Becciu di Deidda Valentina', country: 'Italy', points: 150, oilSlug: 'masoni-becciu-cuncordu' },
      { rank: 41, oil: 'Olio Longevo Top Quality', producer: 'Frantoio Oleario Domenico de Palma SRL', country: 'Italy', points: 145, oilSlug: 'de-palma-olio-longevo' },
      { rank: 42, oil: '4C', producer: '4 C Azeites Unipessoal', country: 'Portugal', points: 100, oilSlug: null },
      { rank: 42, oil: 'Oro Bailén Frantoio', producer: 'Aceites Oro Bailén Galgon 99 SL', country: 'Spain', points: 100, oilSlug: 'oro-bailen-frantoio' },
      { rank: 42, oil: 'Oliveira da Serra O Lagar', producer: 'Agrícola S. Bartolomé S.A.', country: 'Portugal', points: 100, oilSlug: null },
      { rank: 42, oil: 'El Faro', producer: 'Agroliva', country: 'Argentina', points: 100, oilSlug: null },
      { rank: 42, oil: 'Finca Badenes', producer: 'Aires de Jaén S.L.', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Al Kaabi', producer: 'Al Kaabi Olive Oil', country: 'Tunisia', points: 100, oilSlug: null },
      { rank: 42, oil: 'Ogliarola Delicato', producer: 'Arg Chalet del Sole', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Cetrone Novolio', producer: 'Az. Agr. Alfredo Cetrone', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Evo Bio', producer: 'Az. Agr. Kali', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Peranzana', producer: 'Az. Agr. Mio Padre è un Albero', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Classico Bio', producer: 'Az. Agr. Quattrociocchi Americo', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Olio di Roma IGP', producer: 'Az. Agr. Quattrociocchi Americo', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Gran Pregio Bio Coratina', producer: 'Azienda Agricola Caputo Maria', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Freyya Premium Nefes', producer: 'Buta Assos Gıda', country: 'Türkiye', points: 100, oilSlug: 'buta-assos-freyya-nefes' },
      { rank: 42, oil: 'Olíric Koroneiki', producer: 'Can Torres Agroeco S.L.', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Pintacura Frantoio', producer: 'Catas y Olivas SPA', country: 'Chile', points: 100, oilSlug: null },
      { rank: 42, oil: 'Mestral Arbequina', producer: 'Cooperativa Agrícola de Cambrils SCCL', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'DOP Umbria', producer: 'Decimi Società Agricola', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Olio Extravergine di Oliva', producer: 'Di Girolamo Massimiliano', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Di Molfetta Frantoiani', producer: 'Di Molfetta Pantaleo & C. SNC', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Tupercí Picual', producer: 'Ernesto Singer', country: 'Uruguay', points: 100, oilSlug: null },
      { rank: 42, oil: 'Potenza Intenso', producer: 'Fazenda Serra dos Tapes', country: 'Brazil', points: 100, oilSlug: null },
      { rank: 42, oil: 'Nobles Caciques Blend Medio', producer: 'Fercom Argentina SRL', country: 'Argentina', points: 100, oilSlug: null },
      { rank: 42, oil: 'Nobles Caciques Coratina', producer: 'Fercom Argentina SRL', country: 'Argentina', points: 100, oilSlug: null },
      { rank: 42, oil: 'Pons Jan Roc Lecciana', producer: 'Grupo Pons since 1945 S.L.', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Selección de Finca Arauco', producer: 'La Agrícola S.A.', country: 'Argentina', points: 100, oilSlug: null },
      { rank: 42, oil: 'Koroneiki', producer: 'Lagar H', country: 'Brazil', points: 100, oilSlug: null },
      { rank: 42, oil: 'Terra Creta PDO Kolymvari', producer: 'Melissa Kikizas S.A.', country: 'Greece', points: 100, oilSlug: null },
      { rank: 42, oil: 'Garmonia', producer: 'Oilivis S.R.L.', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Morgan Blend', producer: 'Olive Oil Morgan', country: 'Slovenia', points: 100, oilSlug: null },
      { rank: 42, oil: 'Serrano', producer: 'Olivosur S.R.L.', country: 'Uruguay', points: 100, oilSlug: null },
      { rank: 42, oil: 'Romano', producer: 'OPG Chiavalon', country: 'Croatia', points: 100, oilSlug: null },
      { rank: 42, oil: 'Monasto', producer: 'Rosana Chiavassa', country: 'Brazil', points: 100, oilSlug: null },
      { rank: 42, oil: 'Estepa Virgen', producer: 'S.C.A. Ntra. Sra. de la Fuensanta de Oleoestepa', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Oleoestepa Selección', producer: 'S.C.A. Olivarera Pontanense, Oleoestepa', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Señorío de Mesía', producer: 'S.C.A. San Sebastián', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Puerta de las Villas Ecológico', producer: 'S.C.A. San Vicente', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Adurré Bella', producer: 'Soc. Agr. Manduano', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'Bella di Cerignola', producer: 'Soc. Agr. Swiss Olives', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'D\'Amare', producer: 'Soc. Agr. Swiss Olives', country: 'Italy', points: 100, oilSlug: null },
      { rank: 42, oil: 'La Quinta Esencia', producer: 'Stmo. Cristo de la Misericordia S.C.A.', country: 'Spain', points: 100, oilSlug: null },
      { rank: 42, oil: 'Artajo 10 Bio Arbequina', producer: 'Suministro Agroebro S.L.', country: 'Spain', points: 100, oilSlug: null },
      ],
    },
  ],

  /* ── guide pages ─────────────────────────────────────────────────────── */
  guides: [
    {
      slug: 'why-your-oil-goes-flat',
      category: 'kitchen',
      kicker: 'Storage · 5 min read',
      seo: {
        title: 'Why Olive Oil Goes Flat, and How to Stop It | bestoliveoils.eu',
        description: 'Light, heat, air and time turn a bright extra virgin flat. What each one does, how fast it happens, and four storage habits that keep a bottle tasting fresh.',
      },
      datePublished: '2026-10-03',
      dateModified: '2026-10-03',
      wordCountNote: 'five minute read',
      breadcrumb: ['Learn', 'Storage'],
      title: 'Why your oil goes flat, and how to stop it',
      lede: 'A good extra virgin does not go off the way milk does. It fades. Here is what fades it, how fast, and the four habits that slow it down.',
      author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 3 October 2026' },
      image: { src: 'assets/img/dipping-bread.webp', alt: 'Bread being dipped into a dish of extra virgin olive oil', w: 1040, h: 1040 },
      toc: [
        { id: 'what-flat-means',   label: '1. What "flat" means' },
        { id: 'the-four-enemies',  label: '2. The four enemies' },
        { id: 'how-fast',          label: '3. How fast it happens' },
        { id: 'four-habits',       label: '4. Four habits that work' },
        { id: 'what-does-not-help', label: '5. What does not help' },
      ],
      keyFigures: [
        { value: '12–18 mo', label: 'typical best-before from bottling, sealed and stored dark' },
        { value: '6–8 wk',   label: 'the window to finish a bottle after opening' },
        { value: '< 20 °C',  label: 'where to keep it — a cupboard, not the hob' },
      ],
      promo: {
        kicker: 'Taste the difference',
        oilSlug: 'nobleza-del-sur-novo',
        note: 'A novello is the freshest oil in the library and the quickest to show fading. Buy it young, open it, finish it.',
      },
      sections: [
        {
          id: 'what-flat-means',
          heading: '1. What "flat" means',
          blocks: [
            { type: 'p', text: 'Open a bottle of good early-harvest oil and the first thing you get is green: grass, tomato leaf, artichoke. There is a bitterness on the tongue and a pepper in the throat. Three months later the same bottle, left on the counter, has none of it. It is not rancid yet — that comes later and smells of crayons and old nuts — but the greenness has gone and what is left tastes of nothing much. That is flat.' },
            { type: 'p', text: 'What has happened is chemistry, not magic. The aromas are volatile compounds that escape every time the bottle is opened. The bitterness and pepper come from polyphenols, which are antioxidants: they protect the oil by reacting with oxygen first, and are used up doing it. An oil with 470 mg/kg of polyphenols has a bigger reserve than one with 150, which is why robust oils keep longer than delicate ones, but every oil is spending that reserve from the day it is milled.' },
            { type: 'callout', kicker: 'Panel note', text: 'We taste every oil in the library within weeks of opening it, from the same bottle. An oil that scored well in October may taste flat by March in your kitchen. That is not a bad oil — it is an oil that was stored badly, and the storing is on us all.' },
          ],
        },
        {
          id: 'the-four-enemies',
          heading: '2. The four enemies',
          blocks: [
            { type: 'p', text: 'Light. Olive oil contains chlorophyll, which is why it is green and also why light destroys it: chlorophyll under light generates a reactive form of oxygen that attacks the oil far faster than ordinary air does. This is the reason serious producers bottle in dark glass or tins, and why a clear bottle on a sunny shelf is the worst place an oil can be.' },
            { type: 'p', text: 'Heat. Oxidation roughly doubles in speed for every 10 °C. An oil kept next to the hob at 35 °C is ageing at three or four times the rate of the same oil in a cupboard at 18 °C. Heat also drives off the volatile aromas faster, so the bottle by the stove goes flat first and rancid second.' },
            { type: 'p', text: 'Air. Every time you open the bottle you exchange the air in the headspace. A half-empty bottle has twice the oxygen of a full one, and oxygen is what the polyphenols are spent on. This is why the last third of a bottle always tastes worse than the first, even when nothing else changed.' },
            { type: 'p', text: 'Time. Even sealed, dark and cool, an oil is losing aroma and polyphenols slowly. A best-before date of eighteen months from bottling is a promise that the oil will still be extra virgin by the regulatory tests, not that it will taste as it did. Most oils are at their best in the first six to nine months after harvest.' },
          ],
        },
        {
          id: 'how-fast',
          heading: '3. How fast it happens',
          blocks: [
            { type: 'p', text: 'The figures below are from storage trials on extra virgin oils, which agree on the direction and the rough scale even where the exact numbers differ by cultivar and starting polyphenol level. Treat them as orders of magnitude, not promises about your bottle.' },
            {
              type: 'table',
              columns: ['Stored', 'What it does', 'Aroma and polyphenols lost'],
              rows: [
                ['Sealed, dark, 15–20 °C', 'Baseline ageing', '≈ 10–20% in a year'],
                ['Sealed, clear glass, daylight', 'Chlorophyll photo-oxidation', '≈ 30–50% in a year; defects within months'],
                ['Open, dark, cool, finished in 8 weeks', 'Headspace oxygen', '≈ 5–10% — barely noticeable'],
                ['Open, next to the hob, used over 6 months', 'Heat plus repeated air exchange', '≈ 40–60%; flat by month three'],
              ],
              caption: 'Indicative ranges drawn from published storage studies on extra virgin olive oil; the loss depends heavily on the starting polyphenol level and cultivar.',
            },
            { type: 'pull', text: 'The bottle by the stove goes flat first and rancid second.' },
          ],
        },
        {
          id: 'four-habits',
          heading: '4. Four habits that work',
          blocks: [
            { type: 'p', text: 'Buy smaller than you think. A 500 ml bottle finished in six weeks will taste better all the way down than a 5-litre tin used over a year. If you do buy the tin, decant from it into a small dark bottle and keep the tin closed and cool; you are then opening the big container once a fortnight rather than twice a day.' },
            { type: 'p', text: 'Keep it in a cupboard. Dark, closed, away from the oven and the dishwasher. Not the fridge: cold makes the oil cloud and solidify, which does no harm, but condensation on the inside of a cold bottle brought into a warm kitchen does, and the oil is usually too thick to pour when you want it.' },
            { type: 'p', text: 'Close it. The cap, straight away, every time. A pourer spout left open is a chimney for aroma and a funnel for air. If you like a spout, use one with a flap.' },
            { type: 'p', text: 'Read the harvest date, not the best-before. A bottle with a harvest date on it was bottled by a producer who expects you to care. Buy the most recent harvest you can find, and buy it when the new harvest arrives — November to January for most of the Mediterranean — rather than in late summer, when the shelves hold the oldest oil of the year.' },
            { type: 'oil', slug: 'oro-bailen-picual', kicker: 'A bottle that tells you' },
          ],
        },
        {
          id: 'what-does-not-help',
          heading: '5. What does not help',
          blocks: [
            { type: 'p', text: 'Tasting the oil for colour. Colour is chlorophyll and carotene, which say something about the cultivar and the ripeness at harvest and nothing about freshness. Competition panels taste from blue glasses for exactly this reason.' },
            { type: 'p', text: 'Nitrogen gadgets and vacuum pumps for the home. They work in a producer\'s steel tank, where the headspace is purged and the tank is never opened. In a kitchen the bottle is opened daily, which undoes the purge each time. Finishing the bottle faster does the same job for free.' },
            { type: 'p', text: 'Trusting a date without a harvest. "Best before 2028" on a bottle bought in 2026 tells you it was bottled recently; it does not tell you when the olives were picked. Oil can sit in a tank for a year before bottling. The harvest date is the one that matters, and a producer who prints it is a producer who is proud of it.' },
            {
              type: 'sources',
              kicker: 'How we sourced this',
              text: 'The mechanisms — chlorophyll photo-oxidation, the temperature dependence of oxidation and the role of polyphenols as sacrificial antioxidants — are standard lipid chemistry. The ranges in the table are indicative, drawn from published storage trials on extra virgin oils; the exact loss varies with cultivar and the oil\'s starting polyphenol content.',
              items: [
                { label: 'International Olive Council — trade standard for olive oils (quality limits and the tests behind a best-before date)', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
                { label: 'EU Regulation 2022/2104 — marketing standards for olive oil, including the harvest-year labelling rules', url: 'https://eur-lex.europa.eu/eli/reg_del/2022/2104/oj' },
                { label: 'UC Davis Olive Center — storage and shelf-life research summaries', url: 'https://olivecenter.ucdavis.edu/research/reports' },
              ],
            },
          ],
        },
      ],
    },
    {
      slug: 'how-to-taste-olive-oil',
      category: 'tasting',
      kicker: 'Tasting · 6 min read',
      seo: {
        title: 'How to Taste Olive Oil: The Panel Method | bestoliveoils.eu',
        description: 'Warm the glass, cover it, sip loudly. The five-step method our tasting panel uses on every oil, plus the three positives and the common defects.',
      },
      datePublished: '2026-03-02',
      dateModified: '2026-05-12',
      wordCountNote: 'six minute read',
      breadcrumb: ['Learn', 'Tasting'],
      title: 'How to taste olive oil like our panel does',
      lede: 'Warm the glass, cover it, sip loudly. The method is simple and it works on any oil in the library.',
      author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Updated 12 May 2026' },
      image: { src: 'assets/img/harvest-grove.webp', alt: 'Harvesting olives with a pole shaker in an olive grove', w: 1200, h: 1200 },
      toc: [
        { id: 'warm-the-glass',      label: '1. Warm the glass' },
        { id: 'smell',               label: '2. Smell' },
        { id: 'strip-and-sip',       label: '3. Strip and sip' },
        { id: 'the-three-positives', label: '4. The three positives' },
        { id: 'common-defects',      label: '5. Common defects' },
      ],
      promo: {
        kicker: 'Try it on',
        oilSlug: 'oro-bailen-picual',
        note: 'An early-harvest Picual that shows all three positives clearly.',
      },
      sections: [
        {
          id: 'warm-the-glass',
          heading: '1. Warm the glass',
          blocks: [
            { type: 'p', text: 'Pour about a tablespoon into a small glass. Cup it in one hand and cover the top with the other for a minute. Olive oil releases its aromas at around 28 °C, roughly the temperature of your palm, so this step is not ceremony.' },
          ],
        },
        {
          id: 'smell',
          heading: '2. Smell',
          blocks: [
            { type: 'p', text: 'Uncover and take a few short sniffs. You are looking for green notes first: grass, tomato leaf, artichoke, green almond. Riper oils lean to apple, banana and nuts. If the first thing you notice is crayons, cardboard or vinegar, note it and come back to it in section 5.' },
            { type: 'callout', kicker: 'Panel note', text: 'We taste from blue glasses so colour cannot influence us. Colour tells you nothing about quality.' },
          ],
        },
        {
          id: 'strip-and-sip',
          heading: '3. Strip and sip',
          blocks: [
            { type: 'p', text: 'Take a small sip and, with lips slightly parted and teeth closed, draw air in sharply across the oil. This sprays it across the palate and pushes the aromas up into the nose. It is loud. That is the point.' },
          ],
        },
        {
          id: 'the-three-positives',
          heading: '4. The three positives',
          blocks: [
            { type: 'p', text: 'Every score in the library rests on three attributes: fruitiness on the nose and palate, bitterness on the tongue, and pungency, the pepper in the throat that can make you cough. All three are signs of fresh, polyphenol-rich oil. The balance between them is what we describe when we call an oil delicate, medium or robust.' },
          ],
        },
      ],
    },
  {
    slug: 'harvest-date-on-label',
    category: 'buying',
    kicker: 'Buying · 5 min read',
    seo: { title: 'What the Harvest Date on an Olive Oil Label Tells You', description: 'Harvest date, best-before, cold extraction, acidity: what each line on an EU olive oil label means by law, which are optional, and the two that matter.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'five minute read',
    breadcrumb: ['Learn', 'Buying'],
    title: 'What the harvest date on the label really tells you',
    lede: 'A bottle of extra virgin carries up to a dozen claims. Two of them tell you how fresh it is, one tells you how it was made, and the rest are decoration. Here is how to read them.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles, labels facing out', fit: 'contain', w: 576, h: 576 },
    toc: [
      { id: 'harvest-vs-best-before', label: '1. Harvest date vs best-before' },
      { id: 'what-the-law-requires', label: '2. What the law requires' },
      { id: 'cold-extraction', label: '3. “Cold extraction” and “first pressing”' },
      { id: 'acidity-on-the-label', label: '4. Acidity on the label' },
      { id: 'reading-a-bottle', label: '5. Reading a bottle in the shop' },
    ],
    keyFigures: [
      { value: 'Optional', label: 'the harvest year on an EU label — voluntary, and only if 100% of the oil is from that harvest' },
      { value: '≤ 27 °C', label: 'the ceiling for calling an oil “cold extracted”' },
      { value: '≤ 0.8%', label: 'free acidity for extra virgin under EU rules — most good oils sit at 0.1–0.3%' },
    ],
    promo: { kicker: 'A label that says it all', oilSlug: 'le-ferre-selezione', note: 'Harvest year, variety, laboratory and method on the technical sheet, with the report linked — the standard every label could meet.' },
    sections: [
      {
        id: 'harvest-vs-best-before',
        heading: '1. Harvest date vs best-before',
        blocks: [
          { type: 'p', text: 'The harvest date is when the olives were picked. The best-before date is when the bottler expects the oil to stop tasting like itself, and it is the bottler’s own guess: EU law sets no shelf life for olive oil, so a best-before of eighteen months from bottling is a convention, not a measurement. Oil can sit in a tank for a year before it is bottled, which is why a best-before alone tells you very little.' },
          { type: 'p', text: 'Olive oil is a fruit juice. It does not improve in the bottle. Everything that makes an extra virgin worth paying for — the green aromas, the bitterness, the pepper in the throat — is at its peak the week the oil is milled and declines from there. An oil from the October 2025 harvest bought in October 2026 is a year old; the same oil bought in March 2027 is eighteen months old and will taste of it.' },
          { type: 'callout', kicker: 'Rule of thumb', text: 'Buy by harvest date, not best-before. Within twelve months of harvest for a delicate oil; within eighteen for a robust one with a high polyphenol count, which keeps better. Finish an open bottle within six to eight weeks.' },
        ],
      },
      {
        id: 'what-the-law-requires',
        heading: '2. What the law requires',
        blocks: [
          { type: 'p', text: 'Under EU Regulation 2022/2104 a bottle of extra virgin olive oil sold in the Union must carry the category name and its legal definition (“superior category olive oil obtained directly from olives and solely by mechanical means”), the designation of origin at the level of a member state, the Union, or a third country — or a blend statement — the net volume, the best-before date, storage advice, and the bottler’s name and address. Blends of EU and non-EU oils must say so.' },
          { type: 'p', text: 'The harvest year is not on that list. It may be shown, and only if every drop in the bottle comes from that harvest; a bottler who mixes two seasons cannot print either year. Some member states have gone further under national law — Italy requires the harvest campaign on oils bottled there — but across the EU the honest bottler prints it and the others do not.' },
          {
            type: 'table',
            columns: ['On the label', 'Required?', 'What it tells you'],
            rows: [
              ['Category: extra virgin', 'Yes', 'Passed the chemical limits and a taste panel found no defects'],
              ['Origin (country / EU / blend)', 'Yes', 'Where the olives were grown and milled — at country level only'],
              ['Best-before', 'Yes', 'The bottler’s own estimate; no legal basis for the length'],
              ['Harvest year', 'No', 'When the fruit was picked — the one date that measures freshness'],
              ['Cold extraction', 'No', 'Oil was extracted below 27 °C (if the claim is made, it must be true)'],
              ['Acidity', 'No', 'Free fatty acids; if shown, must be accompanied by peroxide, wax and UV values'],
              ['Variety, estate, mill', 'No', 'Voluntary; useful when a producer gives them'],
            ],
            caption: 'What EU Regulation 2022/2104 requires on a bottle of extra virgin, and what is voluntary.',
          },
        ],
      },
      {
        id: 'cold-extraction',
        heading: '3. “Cold extraction” and “first pressing”',
        blocks: [
          { type: 'p', text: '“Cold extraction” has a legal meaning: the oil was obtained at a temperature below 27 °C by centrifugal separation of the paste. “First cold pressing” means the same thing done on a hydraulic press, which almost nobody uses any more — Biolea on Crete is the one estate in this library that still does. Both terms are optional and both are checked: a bottler who prints them must be able to show the extraction temperature.' },
          { type: 'p', text: 'In practice nearly every quality extra virgin is cold extracted, because heat drives off aroma. The term distinguishes good oil from industrial oil, not good oil from better oil. A bottle that says “cold extracted” and nothing else about harvest or variety is telling you the minimum.' },
          { type: 'pull', text: '“Cold extraction” rules out the worst. It does not pick out the best.' },
        ],
      },
      {
        id: 'acidity-on-the-label',
        heading: '4. Acidity on the label',
        blocks: [
          { type: 'p', text: 'Free acidity is the share of fatty acids that have broken loose from the oil’s triglycerides, expressed as grams of oleic acid per hundred grams. The extra virgin limit is 0.8%. It is not a taste — you cannot detect 0.2% against 0.5% on the tongue — but it is a record of how the fruit was handled: bruised, delayed or fermenting olives give higher acidity. A figure of 0.1–0.3% says the fruit went to the mill quickly and whole.' },
          { type: 'p', text: 'Acidity may be printed only together with the peroxide value, the wax content and the ultraviolet absorbency, all in the same typeface — the regulation forbids using a low acidity figure on its own as a selling point. That is why most labels leave it off and the producers who publish it do so on a technical sheet instead. We print it in each oil’s laboratory panel, with who measured it.' },
        ],
      },
      {
        id: 'reading-a-bottle',
        heading: '5. Reading a bottle in the shop',
        blocks: [
          { type: 'p', text: 'Turn the bottle round and look for a harvest year first. No harvest year, no sale, unless you know the bottler. Then the origin line: a single country is better than “EU blend”; a region or estate is better still, and a variety better again. Dark glass or tin beats clear glass, because light is the fastest way to ruin an oil on a shelf. Price last.' },
          { type: 'oil', slug: 'le-ferre-selezione', kicker: 'A label that says it all' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'The required and optional label elements are set out in Delegated Regulation 2022/2104, which replaced Regulation 29/2012 in 2022; the 27 °C threshold for “cold extraction”, the 0.8% acidity limit and the rule that acidity may only be shown alongside peroxide, wax and UV values are all in that text. Italy’s national harvest-year requirement is in its 2013 olive-oil law as amended.',
            items: [
              { label: 'EU Delegated Regulation 2022/2104 — marketing standards for olive oil (categories, limits, labelling terms)', url: 'https://eur-lex.europa.eu/eli/reg_del/2022/2104/oj' },
              { label: 'EU Implementing Regulation 2022/2105 — conformity checks and the methods behind the limits', url: 'https://eur-lex.europa.eu/eli/reg_impl/2022/2105/oj' },
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'olive-oil-polyphenols-explained',
    category: 'science',
    kicker: 'Science · 7 min read',
    seo: { title: 'Olive Oil Polyphenols Explained: mg/kg, the EU Claim, Methods', description: 'What a polyphenol figure means, where the 250 mg/kg EU health-claim line comes from, why HPLC, NMR and Folin numbers differ, and how our oils compare.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'seven minute read',
    breadcrumb: ['Learn', 'Science'],
    title: 'Olive oil polyphenols, explained: what the number means',
    lede: 'Polyphenols are the compounds that make an extra virgin bitter, peppery and slow to go rancid. Producers now print a figure for them. Here is what the figure measures, where the 250 mg/kg line comes from, and why two laboratories can disagree about the same bottle.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/dipping-bread.webp', alt: 'Bread being dipped into a dish of extra virgin olive oil', w: 1040, h: 1040 },
    toc: [
      { id: 'what-they-are', label: '1. What they are' },
      { id: 'the-eu-claim', label: '2. The EU health claim and 250 mg/kg' },
      { id: 'three-methods', label: '3. Three methods, three numbers' },
      { id: 'what-moves-the-number', label: '4. What moves the number' },
      { id: 'in-the-library', label: '5. In the library' },
    ],
    keyFigures: [
      { value: '250 mg/kg', label: 'the threshold behind the EU 432/2012 claim: 5 mg of hydroxytyrosol and derivatives per 20 g of oil' },
      { value: '20 g/day', label: 'the daily intake the claim is based on — about a tablespoon and a half' },
      { value: '48', label: 'oils in the library with a published polyphenol figure, each naming who measured it' },
    ],
    promo: { kicker: 'The one with the certificate', oilSlug: 'pamako-monovarietal-tsounati', note: 'The only oil here whose figure comes with a university laboratory certificate the producer publishes in full: 1,222 mg/kg by NMR for the 2024 harvest.' },
    sections: [
      {
        id: 'what-they-are',
        heading: '1. What they are',
        blocks: [
          { type: 'p', text: 'Olive oil polyphenols are a family of phenolic compounds the olive makes to defend its fruit, carried into the oil at milling. The ones that matter in oil are hydroxytyrosol and tyrosol and their larger relatives — the secoiridoids oleuropein aglycone, ligstroside aglycone, oleacein and oleocanthal. They are antioxidants: they react with oxygen before the fat does, which is why a high-polyphenol oil stays fresh longer, and they are what you taste as bitterness on the tongue and pungency in the throat.' },
          { type: 'p', text: 'The amount varies enormously. A late-picked, ripe Arbequina might carry 100 mg/kg; an early-picked Coratina or Picual 600–800; a very early mountain Tsounati with a laboratory certificate, over 1,200. The variety sets the ceiling, the harvest date sets how close the oil gets to it, and time in the bottle brings it down from there.' },
          { type: 'callout', kicker: 'Bitter is the point', text: 'A bitter, peppery oil is not a faulty one. Bitterness and pungency are two of the three positive attributes a tasting panel scores, and they track polyphenol content closely. The cough at the back of the throat is oleocanthal.' },
        ],
      },
      {
        id: 'the-eu-claim',
        heading: '2. The EU health claim and 250 mg/kg',
        blocks: [
          { type: 'p', text: 'Regulation 432/2012 lists the health claims a food may make in the EU. One of them reads: “Olive oil polyphenols contribute to the protection of blood lipids from oxidative stress.” It may be used only for an oil containing at least 5 mg of hydroxytyrosol and its derivatives per 20 g, and the label must say the effect is obtained with a daily intake of 20 g. Five milligrams per twenty grams is 250 mg per kilogram — the only externally defined line on the whole polyphenol scale, and the one we use to split the library into bands.' },
          { type: 'p', text: 'Two things the claim does not say. It does not say more is better: EFSA’s 2011 opinion established a threshold, not a dose-response. And it does not say polyphenols cure anything; the wording is deliberately about blood lipids and oxidative stress. An oil at 300 mg/kg qualifies for the claim exactly as an oil at 1,300 does.' },
          { type: 'pull', text: '250 mg/kg is a threshold the regulator set. Everything above it is marketing, or taste.' },
        ],
      },
      {
        id: 'three-methods',
        heading: '3. Three methods, three numbers',
        blocks: [
          { type: 'p', text: 'A polyphenol figure means nothing without its method. Three are in common use and they do not give the same answer for the same oil.' },
          {
            type: 'table',
            columns: ['Method', 'What it measures', 'Typical reading', 'Who uses it'],
            rows: [
              ['Folin–Ciocalteu', 'Total reducing capacity, reported as gallic or caffeic acid equivalent', 'Highest — reacts with non-phenols too', 'Estate labs, quick checks'],
              ['HPLC (IOC method)', 'Individual phenols separated and summed; the regulatory reference', 'Middle', 'Accredited labs, competitions'],
              ['NMR', 'Specific secoiridoids (oleocanthal, oleacein, aglycones) by nuclear magnetic resonance', 'Varies — a different set of compounds', 'University labs, high-phenolic marketing'],
            ],
            caption: 'Why 600 mg/kg from one laboratory and 450 from another can describe the same bottle. Compare figures only within a method.',
          },
          { type: 'p', text: 'This is why every laboratory panel on this site names the method and the laboratory when the producer does, and why we never put a producer’s Folin figure next to a competitor’s HPLC figure as if they were on one scale. When a producer publishes a number with no method, we print it with that caveat.' },
        ],
      },
      {
        id: 'what-moves-the-number',
        heading: '4. What moves the number',
        blocks: [
          { type: 'p', text: 'Variety first: Coratina, Picual, Koroneiki, Tsounati and Lianolia are naturally rich; Arbequina, Taggiasca and Manaki are naturally low. Harvest second: green fruit in October carries two or three times the phenols of the same tree’s black fruit in December. Milling third — long, warm malaxation loses phenols to the water phase, which is why serious producers cap it at 25–27 °C and under 45 minutes. Then time: a bottle loses a share of its phenols every month, faster in light and heat, and an unfiltered oil faster than a filtered one.' },
          { type: 'p', text: 'Water matters too. Irrigated groves give bigger fruit with lower phenol concentration; dry-farmed mountain trees give small, intense fruit. Several of the highest figures in this library — Pamako’s Tsounati at 650 metres, The Governor’s unirrigated Corfu Lianolia — come from exactly that kind of grove.' },
        ],
      },
      {
        id: 'in-the-library',
        heading: '5. In the library',
        blocks: [
          {
            type: 'table',
            columns: ['Oil', 'Variety', 'Figure', 'Who measured it'],
            rows: [
              ['Pamako Monovarietal', 'Tsounati', '1,222 mg/kg', 'Univ. of Athens, NMR, certificate published'],
              ['The Governor Limited Edition', 'Lianolia', '1,316 mg/kg', 'WOCH analysis, published by the brand'],
              ['Oro del Desierto Picual', 'Picual', '844 mg/kg', 'Estate lab report, Folin–Ciocalteu'],
              ['Le Ferre Selezione', 'Coratina · Frantoio', '703 mg/kg', 'Chemiservice ISO 17025, HPLC, report linked'],
              ['Corinto High-Phenolic', 'Koroneiki · Nemoutiana', '639 mg/kg', 'NMR, reseller listing'],
              ['Cretan Heritage Krissa', 'Tsounati', '419 mg/kg', 'Retailer HPLC, October 2025 lot'],
              ['Oro Bailén Arbequina', 'Arbequina', '330 mg/kg', 'Producer lab report'],
              ['Etruna Regular', 'Blend', '250 mg/kg', 'Producer'],
            ],
            caption: 'A spread of published figures from the library, with the methods that make them hard to compare. The full list, with source on every row, is on each oil’s page.',
            barColumn: 2,
          },
          { type: 'oil', slug: 'pamako-monovarietal-tsounati', kicker: 'The one with the certificate' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'The 5 mg per 20 g condition is the wording of entry 1 of the Annex to Regulation 432/2012, which follows EFSA’s 2011 opinion. Method descriptions follow the IOC’s COI/T.20 series for HPLC and the published NMR protocols used by the University of Athens laboratory. Library figures are each producer’s or its named laboratory’s, as printed on the oil pages.',
            items: [
              { label: 'EU Regulation 432/2012 — the list of permitted health claims, including the olive-oil polyphenol claim', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj' },
              { label: 'EFSA 2011 — scientific opinion on the olive-oil polyphenol claim (the 5 mg per 20 g basis)', url: 'https://www.efsa.europa.eu/en/efsajournal/pub/2033' },
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'is-high-phenolic-olive-oil-worth-it',
    category: 'science',
    kicker: 'Science · 6 min read',
    seo: { title: 'Is High-Phenolic Olive Oil Worth the Price? What to Check', description: 'High-phenolic oils cost two to four times a good extra virgin. What the label promises, what the evidence supports, how the number decays, five checks.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'six minute read',
    breadcrumb: ['Learn', 'Science'],
    title: 'Is high-phenolic olive oil worth the price?',
    lede: 'A “high-phenolic” bottle costs two to four times a good extra virgin and arrives with a number on the label. Sometimes the number is a laboratory certificate; sometimes it is a hope. Here is how to tell, and whether to pay.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles', fit: 'contain', w: 576, h: 576 },
    toc: [
      { id: 'what-the-term-means', label: '1. What the term means' },
      { id: 'what-the-evidence-says', label: '2. What the evidence says' },
      { id: 'the-number-decays', label: '3. The number decays' },
      { id: 'five-checks', label: '4. Five things to check' },
      { id: 'who-should-buy', label: '5. Who should buy it' },
    ],
    keyFigures: [
      { value: '2–4×', label: 'the usual price premium over a good early-harvest extra virgin' },
      { value: '20 g', label: 'the daily amount the EU claim is written for — the claim is met at 250 mg/kg, not 1,000' },
      { value: '−30–50%', label: 'typical polyphenol loss over a year in the bottle, faster unfiltered' },
    ],
    promo: { kicker: 'A certified example', oilSlug: 'the-governor-limited-edition', note: 'Unfiltered Corfu Lianolia at 1,316 mg/kg by an outside laboratory — and a reminder that the figure is for the lot the laboratory saw.' },
    sections: [
      {
        id: 'what-the-term-means',
        heading: '1. What the term means',
        blocks: [
          { type: 'p', text: '“High-phenolic” has no legal definition. It is a marketing category for extra virgin oils whose polyphenol content is well above the 250 mg/kg needed for the EU health claim — in practice from about 500 mg/kg upward, with the top of the market above 1,000. The oils are made the way phenols are made: very early harvest from phenol-rich varieties, fast cold milling, often unfiltered, usually from dry-farmed trees. They taste the part — intensely bitter and pungent, a cough in the throat — and they are sold by the number.' },
          { type: 'p', text: 'The number is real when a laboratory produced it and the producer can show the certificate for the lot in the bottle. It is less real when it is a retailer’s figure, a “1,000+” band, or a company statement with no method. In this library we print all three kinds, with who said it; a bar on the meter means a measured figure, and a band or a claim gets text.' },
        ],
      },
      {
        id: 'what-the-evidence-says',
        heading: '2. What the evidence says',
        blocks: [
          { type: 'p', text: 'The regulator’s position is modest. Regulation 432/2012 permits one claim — polyphenols “contribute to the protection of blood lipids from oxidative stress” — at 5 mg of hydroxytyrosol and derivatives per 20 g of oil. EFSA found the evidence for that effect convincing and for nothing more; the opinion is a threshold, and an oil at 300 mg/kg carries the claim as fully as one at 1,300.' },
          { type: 'p', text: 'Beyond that, the research is active and incomplete. Oleocanthal’s ibuprofen-like inhibition of COX enzymes was shown in 2005; studies on cognition, blood pressure and markers of inflammation exist, mostly small, some promising, few replicated at scale, and nearly all using daily amounts around the 20–40 g the claim assumes. Nothing here says a 1,200 mg/kg oil does something a 500 mg/kg oil does not, because nobody has run that comparison properly. What the figure reliably predicts is shelf life and taste.' },
          { type: 'callout', kicker: 'What we can say', text: 'A high-phenolic oil keeps longer, tastes more, and meets the EU claim with room to spare. Whether its extra phenols do anything extra for you is not established. Buy it for the first two reasons.' },
        ],
      },
      {
        id: 'the-number-decays',
        heading: '3. The number decays',
        blocks: [
          { type: 'p', text: 'A polyphenol figure describes the oil the day it was analysed. Phenols are antioxidants and they are spent protecting the oil; storage studies put the loss at 30–50% over a year under normal conditions, less in a cool dark cupboard, more in light and heat, and faster in an unfiltered oil whose suspended water and fruit particles keep hydrolysis going. A certificate dated November for a bottle you open in July is describing a different oil — still good, but not the number on the label. Corinto says this plainly on its High-Phenolic listing; most do not.' },
          { type: 'pull', text: 'The certificate is for the lot the laboratory saw, on the day it saw it.' },
        ],
      },
      {
        id: 'five-checks',
        heading: '4. Five things to check',
        blocks: [
          {
            type: 'table',
            columns: ['Check', 'Good sign', 'Weak sign'],
            rows: [
              ['Method named', 'HPLC or NMR, laboratory named', 'No method; “1,000+”; “among the highest in the world”'],
              ['Lot and date', 'Certificate dated, harvest year on the bottle', 'A figure from a previous year’s lot'],
              ['Harvest', 'September–October, stated', 'Not stated'],
              ['Variety', 'A phenol-rich variety named', 'Unnamed blend'],
              ['Taste', 'Bitter, pungent, makes you cough', 'Mild — a mild oil at 1,000 mg/kg is a contradiction'],
            ],
            caption: 'What separates a certified high-phenolic oil from a label that borrowed the phrase.',
          },
        ],
      },
      {
        id: 'who-should-buy',
        heading: '5. Who should buy it',
        blocks: [
          { type: 'p', text: 'If you like intense, bitter oil and use it raw — on greens, pulses, grilled meat, by the spoon — a certified high-phenolic bottle is a fair purchase and a long-lived one. If you cook with oil or prefer it soft, you are paying for a number you will not taste and a claim an everyday extra virgin already carries. The best value in the category is usually a producer’s own early-harvest from a rich variety at 600–800 mg/kg, sold without the word “high-phenolic” on the front.' },
          { type: 'oil', slug: 'the-governor-limited-edition', kicker: 'A certified example' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'The claim and its threshold are in Regulation 432/2012 and EFSA’s 2011 opinion. The oleocanthal finding is Beauchamp et al. 2005. Decay ranges are indicative, from published storage trials on extra virgin oils; they depend on cultivar, filtration and starting level. Library figures are as the producers or their laboratories publish them.',
            items: [
              { label: 'EU Regulation 432/2012 — the list of permitted health claims, including the olive-oil polyphenol claim', url: 'https://eur-lex.europa.eu/eli/reg/2012/432/oj' },
              { label: 'EFSA 2011 — scientific opinion on the olive-oil polyphenol claim (the 5 mg per 20 g basis)', url: 'https://www.efsa.europa.eu/en/efsajournal/pub/2033' },
              { label: 'Beauchamp et al., Nature 2005 — ibuprofen-like activity in extra-virgin olive oil (oleocanthal)', url: 'https://www.nature.com/articles/437045a' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'olive-oil-acidity-explained',
    category: 'science',
    kicker: 'Science · 4 min read',
    seo: { title: 'Olive Oil Acidity: What 0.2% Means and Why You Can’t Taste It', description: 'Free acidity is the most quoted, least understood olive oil number: what it measures, the 0.8% limit, why it is not a flavour, what a low figure tells you.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'four minute read',
    breadcrumb: ['Learn', 'Science'],
    title: 'Acidity: what 0.2% means, and why you cannot taste it',
    lede: 'Producers print it, shops repeat it, and almost everyone reads it wrong. Free acidity is a measure of how the fruit was handled, not of how the oil tastes.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/dipping-bread.webp', alt: 'Bread being dipped into a dish of extra virgin olive oil', w: 1040, h: 1040 },
    toc: [
      { id: 'what-it-measures', label: '1. What it measures' },
      { id: 'the-limits', label: '2. The limits' },
      { id: 'not-a-taste', label: '3. Not a taste' },
      { id: 'what-low-means', label: '4. What a low figure tells you' },
    ],
    keyFigures: [
      { value: '≤ 0.8%', label: 'free acidity limit for extra virgin, as grams of oleic acid per 100 g' },
      { value: '≤ 2.0%', label: 'the limit for the next category down, virgin olive oil' },
      { value: '0.1–0.3%', label: 'where most of the library’s oils with a published figure sit' },
    ],
    promo: { kicker: 'A low one, with the report', oilSlug: 'corinto-manaki-limited-edition', note: '0.19% on the laboratory report for the Limited Edition — fruit to mill without delay.' },
    sections: [
      {
        id: 'what-it-measures',
        heading: '1. What it measures',
        blocks: [
          { type: 'p', text: 'Olive oil is mostly triglycerides: three fatty acids bound to a glycerol backbone. When fruit is bruised, left in heaps, attacked by fly or fungus, or simply picked and milled too slowly, enzymes and microbes start cutting fatty acids loose. Free acidity is the weight of those loose fatty acids as a share of the oil, expressed as oleic acid. An oil at 0.2% has two grams of free fatty acids in a kilogram.' },
          { type: 'p', text: 'It is, in other words, a record of the fruit’s condition and the speed of the mill. Sound olives picked from the tree and milled within a day give 0.1–0.3%. Fruit off the ground, fermenting in sacks for a week, gives 1% and more, and the oil goes to the refinery.' },
        ],
      },
      {
        id: 'the-limits',
        heading: '2. The limits',
        blocks: [
          {
            type: 'table',
            columns: ['Category', 'Free acidity', 'Also required'],
            rows: [
              ['Extra virgin olive oil', '≤ 0.8 g/100 g', 'Peroxide ≤ 20 meq O₂/kg · K232 ≤ 2.50 · K270 ≤ 0.22 · no sensory defect, fruity > 0'],
              ['Virgin olive oil', '≤ 2.0 g/100 g', 'Peroxide ≤ 20 · slight defects allowed (median ≤ 3.5)'],
              ['Lampante (not for retail)', '> 2.0 g/100 g', 'Sent for refining'],
              ['Olive oil (refined + virgin)', '≤ 1.0 g/100 g', 'A blend of refined oil with some virgin'],
            ],
            caption: 'The EU categories in Regulation 2022/2104 and the chemical limits behind them. Acidity is one test of several; a taste panel is another.',
          },
          { type: 'p', text: 'Note what the table implies: an oil can be at 0.3% and still fail to be extra virgin if the panel finds a defect, and an oil at 0.75% can pass. Acidity is necessary, not sufficient.' },
        ],
      },
      {
        id: 'not-a-taste',
        heading: '3. Not a taste',
        blocks: [
          { type: 'p', text: 'Free fatty acids at these levels have no taste and no smell. The “acidity” people think they detect in a sharp, peppery oil is pungency from polyphenols, which is a different thing entirely and a positive attribute. A bland refined oil can have lower acidity than a magnificent early-harvest Coratina. This is also why EU rules forbid printing acidity on a label unless peroxide, waxes and UV absorbency are printed alongside it in the same size: on its own it invites exactly this misreading.' },
          { type: 'pull', text: '0.2% against 0.5% is a story about the harvest. It is not a flavour.' },
        ],
      },
      {
        id: 'what-low-means',
        heading: '4. What a low figure tells you',
        blocks: [
          { type: 'p', text: 'A very low figure — 0.1 to 0.2% — tells you the producer picked sound fruit and milled it fast. That is worth knowing, because the same care usually shows up as freshness and clean aromas. It does not tell you the oil is intense, or high in phenols, or from a good variety, and it says nothing about how long the bottle sat in a tank before bottling. Read it as one line of a technical sheet, next to the harvest date, the polyphenol figure and the method, and weight it accordingly.' },
          { type: 'oil', slug: 'corinto-manaki-limited-edition', kicker: 'A low one, with the report' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'Category limits are Annex I of Delegated Regulation 2022/2104; the labelling restriction on acidity is in the same regulation. Methods are the IOC’s. Library figures are the producers’ or their named laboratories’.',
            items: [
              { label: 'EU Delegated Regulation 2022/2104 — marketing standards for olive oil (categories, limits, labelling terms)', url: 'https://eur-lex.europa.eu/eli/reg_del/2022/2104/oj' },
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'pdo-pgi-olive-oil-what-they-guarantee',
    category: 'buying',
    kicker: 'Buying · 6 min read',
    seo: { title: 'PDO and PGI Olive Oil: What the Seals Guarantee (and Don’t)', description: 'What the EU origin seals on olive oil promise — place, variety, method — what they say nothing about, and the designations behind the library’s oils.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'six minute read',
    breadcrumb: ['Learn', 'Buying'],
    title: 'PDO and PGI olive oil: what the seals guarantee, and what they don’t',
    lede: 'Kolymvari, Kalamata, Terra di Bari, Priego de Córdoba, Olio di Puglia: the origin seals are the closest thing olive oil has to wine’s appellations. They promise a place and a method. They do not promise a taste.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles', fit: 'contain', w: 576, h: 576 },
    toc: [
      { id: 'two-seals', label: '1. Two seals, one register' },
      { id: 'what-is-guaranteed', label: '2. What is guaranteed' },
      { id: 'what-is-not', label: '3. What is not' },
      { id: 'in-the-library', label: '4. Designations in the library' },
      { id: 'how-to-use-them', label: '5. How to use them' },
    ],
    keyFigures: [
      { value: 'PDO', label: 'every stage — growing, milling, usually bottling — inside the named area, with the varieties and methods the specification lists' },
      { value: 'PGI', label: 'at least one stage inside the area; the specification is looser' },
      { value: '1151/2012', label: 'the EU regulation that defines both seals and runs the register' },
    ],
    promo: { kicker: 'A PDO that names its variety', oilSlug: 'kyklopas-ages-pdo-makris', note: 'PDO Makris is the only designation in Thrace and ties the oil to one village and one variety.' },
    sections: [
      {
        id: 'two-seals',
        heading: '1. Two seals, one register',
        blocks: [
          { type: 'p', text: 'The EU runs one register of protected names for food, under Regulation 1151/2012, and olive oil has more entries in it than any product except cheese. A Protected Designation of Origin (PDO — DOP in Italian, DOP in Spanish, ΠΟΠ in Greek, AOP in French) means the olives were grown, milled and in most cases bottled inside the named area, from the varieties the specification lists, by the methods it describes. A Protected Geographical Indication (PGI — IGP, ΠΓΕ) requires at least one stage inside the area and leaves more room: Olio di Puglia IGP covers a whole region and a long list of varieties; Toscano IGP the same.' },
          { type: 'p', text: 'Each name has a published specification — the disciplinare, the pliego — that sets the boundary, the permitted varieties and their minimum shares, the maximum yield, sometimes the harvest window and the extraction temperature, and usually a chemical and sensory profile tighter than the generic extra virgin limits. A control body checks compliance and numbers the labels.' },
        ],
      },
      {
        id: 'what-is-guaranteed',
        heading: '2. What is guaranteed',
        blocks: [
          {
            type: 'table',
            columns: ['Promise', 'PDO', 'PGI'],
            rows: [
              ['Olives grown in the area', 'Yes', 'At least one stage in the area'],
              ['Milled in the area', 'Yes', 'Usually'],
              ['Named varieties, minimum shares', 'Yes', 'Often, with a longer list'],
              ['Tighter chemical limits than generic EVOO', 'Usually', 'Sometimes'],
              ['Panel-tasted to a defined profile', 'Usually', 'Sometimes'],
              ['Harvest date on the label', 'No', 'No'],
              ['A particular intensity or quality tier', 'No', 'No'],
            ],
            caption: 'What the two seals commit a producer to under Regulation 1151/2012 and a typical olive-oil specification.',
          },
          { type: 'p', text: 'The strongest guarantee is the variety. A PDO Kolymvari Chanion Kritis is Koroneiki, at least 90% by its specification; a PDO Terra di Bari Castel del Monte is at least 80% Coratina; PDO Kalamata is Koroneiki with a little Mastoidis; PDO Makris is the Makri olive of one Thracian village. Where the bottle does not name its variety, the seal often does.' },
        ],
      },
      {
        id: 'what-is-not',
        heading: '3. What is not',
        blocks: [
          { type: 'p', text: 'A seal does not tell you when the fruit was picked, how long the oil sat in a tank, or whether it is fresh. It does not rank oils inside the designation — a PDO Kalamata from a careless mill and one from a careful estate carry the same mark. It does not mean the oil is better than an unsealed one from the same hills: many of the best producers in this library bottle outside the scheme because their estate is too small, their variety is not on the list, or they pick earlier than the specification allows. Laconiko, Pamako and The Governor carry no seal; Terra Creta’s Grand Cru does not use the PDO its Estate line does.' },
          { type: 'pull', text: 'The seal fixes the place and the variety. The producer still decides everything that makes the oil good.' },
        ],
      },
      {
        id: 'in-the-library',
        heading: '4. Designations in the library',
        blocks: [
          {
            type: 'table',
            columns: ['Designation', 'Country', 'Variety the specification centres on', 'In the library'],
            rows: [
              ['Olio di Puglia IGP', 'Italy', 'Coratina, Ogliarola, Peranzana and others', 'Guglielmi, Le Ferre'],
              ['Toscano IGP', 'Italy', 'Frantoio, Moraiolo, Leccino', 'Several Tuscan oils'],
              ['PDO Kolymvari Chanion Kritis', 'Greece', 'Koroneiki', 'Terra Creta Estate line'],
              ['PGI Chania Kritis', 'Greece', 'Koroneiki', 'Agia Marina Premium'],
              ['PDO Messara', 'Greece', 'Koroneiki', 'Oleum Crete'],
              ['PDO Sitia Lasithiou Kritis', 'Greece', 'Koroneiki', 'Chrisopigi'],
              ['PDO Kalamata', 'Greece', 'Koroneiki', 'Iliada'],
              ['PDO Makris', 'Greece', 'Makri', 'Kyklopas Ages'],
              ['DOP Priego de Córdoba', 'Spain', 'Picudo, Hojiblanca, Picual', 'Córdoba oils'],
            ],
            caption: 'Designations behind oils in the library, with the variety each specification is built around. Check the oil page for whether a given bottling uses the seal.',
          },
        ],
      },
      {
        id: 'how-to-use-them',
        heading: '5. How to use them',
        blocks: [
          { type: 'p', text: 'Use a seal to learn the variety and the place when the label does not say, and to rule out a “Greek” oil that was merely bottled in Greece. Then look for the things the seal cannot give you: a harvest year, a named estate or mill, a polyphenol figure with a method. A sealed oil with those is a good buy. A sealed oil without them is a correct one.' },
          { type: 'oil', slug: 'kyklopas-ages-pdo-makris', kicker: 'A PDO that names its variety' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'The definitions of PDO and PGI are Articles 5 and 7 of Regulation 1151/2012; each product specification is public in the EU’s eAmbrosia register, which is where the variety shares above come from. Which oils in the library carry a seal is as each producer states on its own site or label.',
            items: [
              { label: 'EU Regulation 1151/2012 — quality schemes (PDO, PGI) for agricultural products', url: 'https://eur-lex.europa.eu/eli/reg/2012/1151/oj' },
              { label: 'eAmbrosia — the EU register of protected designations, searchable by product', url: 'https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'early-harvest-olive-oil-olio-nuovo',
    category: 'buying',
    kicker: 'Buying · 6 min read',
    seo: { title: 'Early-Harvest Olive Oil: Olio Nuovo, Agourelaio, Erken Hasat', description: 'What changes when olives are picked green in October instead of ripe in December: yield, polyphenols, taste, price, shelf life — and what the words mean.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'six minute read',
    breadcrumb: ['Learn', 'Buying'],
    title: 'Early harvest: what changes when the olives are picked green',
    lede: 'Olio nuovo in Italy, agourelaio in Greece, cosecha temprana in Spain, erken hasat in Türkiye — four languages for one decision: pick the fruit green, give up half the oil, and get all of the flavour.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/harvest-grove.webp', alt: 'Harvesting olives with a pole shaker over nets in an olive grove', w: 1200, h: 1200 },
    toc: [
      { id: 'the-trade', label: '1. The trade' },
      { id: 'what-you-taste', label: '2. What you taste' },
      { id: 'the-words', label: '3. The words on the bottle' },
      { id: 'filtered-or-not', label: '4. Filtered or unfiltered' },
      { id: 'when-to-buy', label: '5. When to buy and how long to keep' },
    ],
    keyFigures: [
      { value: 'Sept–Oct', label: 'early-harvest picking in the Mediterranean; the main harvest runs November to January' },
      { value: '2–3×', label: 'the polyphenol content of green fruit against the same tree’s ripe fruit' },
      { value: '−30–50%', label: 'the oil yield the grower gives up by picking green — why the bottle costs more' },
    ],
    promo: { kicker: 'The season’s first', oilSlug: 'guglielmi-fior-do', note: 'Guglielmi’s unfiltered first pressing, bottled once in October and gone within months — olio nuovo as Puglia drinks it.' },
    sections: [
      {
        id: 'the-trade',
        heading: '1. The trade',
        blocks: [
          { type: 'p', text: 'An olive’s oil content rises through the autumn as the fruit ripens from green to purple to black. Pick in September or early October and the fruit yields perhaps 10–14% oil by weight; wait until December and it gives 20–25%. The grower who picks early is giving up a third to a half of the crop. What the green fruit has instead is polyphenols — two to three times the ripe fruit’s level — chlorophyll, and the volatile aromas that make an oil smell of cut grass and tomato leaf rather than ripe fruit and butter.' },
          { type: 'p', text: 'That is the whole economics of early harvest. The oil costs more because there is less of it, and it is worth more because it tastes more and lasts longer. Every high-phenolic oil, every competition Gold and nearly every oil in this library with a figure above 500 mg/kg was picked early.' },
          { type: 'callout', kicker: 'Timing', text: 'Early is relative. On Crete and the Turkish Aegean September is early; in Tuscany and Puglia mid-October; in Jaén late October. The variety sets the calendar — Arbequina ripens weeks before Picual on the same farm.' },
        ],
      },
      {
        id: 'what-you-taste',
        heading: '2. What you taste',
        blocks: [
          {
            type: 'table',
            columns: ['', 'Early harvest (green)', 'Main harvest (turning)', 'Late harvest (ripe)'],
            rows: [
              ['Colour', 'Intense green', 'Green-gold', 'Gold'],
              ['Aroma', 'Cut grass, tomato leaf, artichoke, green almond', 'Green and ripe fruit together', 'Ripe fruit, banana, butter'],
              ['Bitterness and pungency', 'High', 'Medium', 'Low'],
              ['Polyphenols', 'Highest', 'Medium', 'Lowest'],
              ['Shelf life', 'Longest', 'Medium', 'Shortest'],
              ['Yield to the grower', 'Lowest', 'Medium', 'Highest'],
            ],
            caption: 'The same tree, three picking dates. Taste and keeping quality move one way; yield moves the other.',
          },
          { type: 'p', text: 'Early oils divide people. The bitterness that a panel scores as a positive attribute reads to some palates as harsh, and a very early Coratina or Picual is not an oil for poaching fish. Used raw where the food can stand up to it — bread, pulses, grilled meat, bitter greens — it is the most olive an olive oil can taste.' },
        ],
      },
      {
        id: 'the-words',
        heading: '3. The words on the bottle',
        blocks: [
          { type: 'p', text: 'Italian olio nuovo or novello is the first oil of the season, usually unfiltered, sold from October to Christmas and meant to be finished by spring. Greek agourelaio — “unripe oil” — is early-picked oil from green fruit, filtered or not, and is used on labels in the Peloponnese and on Crete; Chalkidiki has a PDO for it. Spanish cosecha temprana, “early harvest”, is now on most premium Andalusian labels and usually means October picking of Picual or Hojiblanca. Turkish erken hasat is the same idea on the Aegean coast, where Hermus and Nermin Hanım pick in September. None of the four has a legal definition; all of them mean what the producer says they mean, which is why the harvest date matters more than the word.' },
          { type: 'pull', text: 'Four words, no legal definition. The harvest date is the definition.' },
        ],
      },
      {
        id: 'filtered-or-not',
        heading: '4. Filtered or unfiltered',
        blocks: [
          { type: 'p', text: 'Fresh from the separator, oil carries suspended water and fruit particles that make it cloudy. Filtering removes them; leaving them gives olio nuovo its texture and a slightly fuller taste for the first weeks, at a price — the water keeps hydrolysis and fermentation going, so an unfiltered oil loses freshness faster and its acidity creeps up. Sediment at the bottom of a bottle is harmless, but it is also where the oil ages first. Buy unfiltered oil to drink now; buy filtered oil to keep.' },
        ],
      },
      {
        id: 'when-to-buy',
        heading: '5. When to buy and how long to keep',
        blocks: [
          { type: 'p', text: 'The new season’s early oils reach shops from late October (Crete, Türkiye, Puglia) through November (Andalusia, Tuscany). Buy them then — that is when the gap between an early oil and an ordinary one is widest. A filtered early oil with a high polyphenol count will still be good eighteen months on if kept dark and cool; an unfiltered one is at its best for three to four months and fine for six. Either way, the clock runs from the harvest, not from the day you open the bottle.' },
          { type: 'oil', slug: 'guglielmi-fior-do', kicker: 'The season’s first' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'Yield and polyphenol relationships with ripening are standard olive agronomy, documented across cultivars in the IOC’s and the Spanish and Italian research institutes’ literature; the ranges given are indicative and vary by variety and season. The harvest timing for each oil is as the producer states on its page.',
            items: [
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
              { label: 'EU Delegated Regulation 2022/2104 — marketing standards for olive oil (categories, limits, labelling terms)', url: 'https://eur-lex.europa.eu/eli/reg_del/2022/2104/oj' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'olive-varieties-cheat-sheet',
    category: 'varieties',
    kicker: 'Varieties · 7 min read',
    seo: { title: 'Olive Varieties Cheat Sheet: Picual, Koroneiki, Coratina…', description: 'Twelve olive varieties behind Europe’s best oils — Picual, Koroneiki, Coratina, Arbequina, Tsounati, Manaki and more — with origin, polyphenol range, style.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'seven minute read',
    breadcrumb: ['Learn', 'Varieties'],
    title: 'Twelve olive varieties, and what each one tastes like',
    lede: 'The variety does more to shape an oil than the country, the mill or the price. Here are the twelve behind most of the library, with where they come from, what the literature says about their polyphenols, and how to recognise them in the glass.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/harvest-grove.webp', alt: 'Green olives on the branch during harvest', w: 1200, h: 1200 },
    toc: [
      { id: 'why-variety-matters', label: '1. Why variety matters' },
      { id: 'the-robust-ones', label: '2. The robust ones' },
      { id: 'the-middle', label: '3. The middle' },
      { id: 'the-delicate-ones', label: '4. The delicate ones' },
      { id: 'the-table', label: '5. The table' },
    ],
    keyFigures: [
      { value: '40', label: 'varieties with a reference page on this site' },
      { value: '5×', label: 'roughly the spread in typical polyphenols between the richest and the mildest varieties in this list' },
      { value: '70–81%', label: 'oleic acid share across these twelve — Picual the highest, Manaki the lowest' },
    ],
    promo: { kicker: 'Two varieties, one bottle', oilSlug: 'le-ferre-selezione', note: 'Coratina for the bite, Frantoio for the fruit — the classic Puglian blend.' },
    sections: [
      {
        id: 'why-variety-matters',
        heading: '1. Why variety matters',
        blocks: [
          { type: 'p', text: 'Plant a Picual and an Arbequina in the same grove, pick them the same morning and run them through the same mill, and you will get two oils that could be from different continents — one bitter, tomato-leaf and tenacious, the other soft, apple-and-almond and gone in a year. The variety sets the ceiling on polyphenols, the fatty-acid balance that decides how long the oil lasts, and the aromatic family. Everything the grower and the miller do is adjustment inside those limits.' },
          { type: 'p', text: 'The figures below are ranges published for each variety in the agronomic literature and on the cultivar pages of this site. They are what the variety tends to do, not measurements of any bottle: an individual oil’s number is on its own page, with who measured it.' },
        ],
      },
      {
        id: 'the-robust-ones',
        heading: '2. The robust ones',
        blocks: [
          { type: 'p', text: 'Picual, from Jaén, is the most planted olive in the world and the backbone of Andalusian oil: 78–81% oleic acid, 300–700 mg/kg polyphenols typical, tomato leaf and fig leaf, firmly bitter, built to last. Coratina, from Corato in Puglia, is Italy’s equivalent — green almond and artichoke with a bitterness that producers now put on the label as a virtue, 330–410 mg/kg measured at bottling in trials and far higher when picked green. Koroneiki, half of Greece’s olive area, gives a smaller, peppery, grassy oil with a persistent finish and keeps well. Tsounati, the old variety of western Crete, surveys at 173–641 mg/kg and gives something nuttier and softer than Koroneiki when picked early. Hojiblanca swings widest with the season, 280–820 mg/kg, falling as the fruit ripens.' },
        ],
      },
      {
        id: 'the-middle',
        heading: '3. The middle',
        blocks: [
          { type: 'p', text: 'Frantoio is the Tuscan workhorse: grassy, artichoke, a clean pepper, about 76% oleic and 230 mg/kg in a like-for-like trial, higher from the hills. Memecik, from Muğla on the Turkish south Aegean, measures 296–407 mg/kg total phenols and gives a green, herbal oil with real bite when picked in September. Nocellara del Belìce, Sicily’s table olive turned oil olive, means 330 mg/kg across 125 samples and tastes of tomato and green herbs. Ayvalık, the Edremit Gulf’s variety, is softer — 70–72% oleic, fruity, almond — and Türkiye’s most medalled.' },
        ],
      },
      {
        id: 'the-delicate-ones',
        heading: '4. The delicate ones',
        blocks: [
          { type: 'p', text: 'Arbequina, from Les Garrigues in Catalonia and now planted worldwide, is sweet, apple, green banana and almond, 200–230 mg/kg typical and 70–75% oleic — easy to like, quick to fade. Taggiasca, Liguria’s small olive, is the mildest serious oil in Italy: ripe, buttery, pine-nut, meant for fish and the Ligurian table. Manaki, the olive of Corinthia and the Argolid, has the lowest oleic share of the Greek varieties and the highest linoleic, which makes a soft, aromatic oil that does not keep as long as Koroneiki and is almost unknown outside Greece.' },
          { type: 'pull', text: 'Delicate is not lesser. It is a different job: fish, salad, a light hand.' },
        ],
      },
      {
        id: 'the-table',
        heading: '5. The table',
        blocks: [
          {
            type: 'table',
            columns: ['Variety', 'Home', 'Published polyphenols (variety)', 'Oleic acid', 'Style'],
            rows: [
              ['Picual', 'Jaén, Andalusia', '300–700 mg/kg typical', '78–81%', 'Robust · tomato leaf · keeps longest'],
              ['Coratina', 'Corato, Puglia', '330–410 mg/kg at bottling (trial)', '~77%', 'Robust · green almond · bitter'],
              ['Hojiblanca', 'Córdoba, Andalusia', '280–820 mg/kg through the season', '70–79%', 'Robust to medium · artichoke · herbal'],
              ['Koroneiki', 'Messinia, Peloponnese', 'Not stated as a stable range', '74–77%', 'Medium-robust · grass · pepper'],
              ['Tsounati', 'Western Crete', '173–641 mg/kg in surveys', 'Not published', 'Medium · nutty · herbal'],
              ['Memecik', 'Muğla, Türkiye', '296–407 mg/kg', '73–76%', 'Medium · green herbs · bite'],
              ['Nocellara del Belìce', 'Belìce valley, Sicily', '~330 mg/kg mean, 125 samples', '~73%', 'Medium · tomato · green'],
              ['Frantoio', 'Tuscany', '~230 mg/kg in a trial', '~76%', 'Medium · artichoke · pepper'],
              ['Ayvalık', 'Edremit Gulf, Türkiye', 'Not stated', '70–72%', 'Medium-delicate · fruity · almond'],
              ['Arbequina', 'Lleida, Catalonia', '200–230 mg/kg typical', '70–75%', 'Delicate · apple · banana'],
              ['Taggiasca', 'Imperia, Liguria', 'Not stated', 'Not published', 'Delicate · ripe · pine nut'],
              ['Manaki', 'Corinthia & Argolid', 'Not stated', '~70%', 'Delicate · soft · aromatic'],
            ],
            caption: 'Published ranges for the variety, as cited on each cultivar page. Not measurements of any oil — those are on the oil pages, with their source.',
          },
          { type: 'oil', slug: 'le-ferre-selezione', kicker: 'Two varieties, one bottle' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'Every figure is taken from the cultivar reference pages on this site, each of which cites its agronomic or survey source; where a variety’s literature gives no stable typical value, the table says so rather than inventing one. Styles are the panel’s shorthand for the descriptors the literature and producers use.',
            items: [
              { label: 'Cultivar reference pages — forty varieties with sources', url: '/cultivars/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'olive-oil-regions-greece-italy-spain-turkiye',
    category: 'regions',
    kicker: 'Regions · 6 min read',
    seo: { title: 'Greek, Italian, Spanish or Turkish Olive Oil: Styles by Region', description: 'How the oils of Greece, Italy, Spain and Türkiye differ by variety, harvest habit and region — Jaén, Puglia, Crete, the Edremit Gulf — and which to try.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'six minute read',
    breadcrumb: ['Learn', 'Regions'],
    title: 'Greek, Italian, Spanish, Turkish: the four styles, by region',
    lede: 'The country on the label tells you less than the region, and the region less than the variety. But each of the four big producing countries has habits — what they plant, when they pick, how they sell — and those habits are a usable guide.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/harvest-grove.webp', alt: 'An olive grove at harvest, nets spread under the trees', w: 1200, h: 1200 },
    toc: [
      { id: 'spain', label: '1. Spain' },
      { id: 'italy', label: '2. Italy' },
      { id: 'greece', label: '3. Greece' },
      { id: 'turkiye', label: '4. Türkiye' },
      { id: 'which-to-buy', label: '5. Which to buy for what' },
    ],
    keyFigures: [
      { value: '~45%', label: 'Spain’s typical share of world olive oil output — more than the next three countries together' },
      { value: '17', label: 'regions represented in the library, counted from the oils' },
      { value: '4', label: 'countries so far: Spain, Italy, Greece and Türkiye, with Portugal next' },
    ],
    promo: { kicker: 'A region in one bottle', oilSlug: 'cretan-heritage-krissa', note: 'Western Crete in its old variety: Tsounati, picked in October, milled the same day at Kissamos.' },
    sections: [
      {
        id: 'spain',
        heading: '1. Spain',
        blocks: [
          { type: 'p', text: 'Spain makes almost half the world’s olive oil, and most of it comes from one province: Jaén, in eastern Andalusia, a sea of Picual trees. Jaén’s best estates — Oro Bailén, Nobleza del Sur, Oro del Desierto further east in Almería — pick in October and bottle robust, tomato-leaf oils with the highest published polyphenol figures in Spain. Córdoba, to the west, grows Hojiblanca and Picudo under the Priego de Córdoba and Baena seals, a touch softer and more herbal. Catalonia is Arbequina country: delicate, sweet, early to ripen. Spanish labels say cosecha temprana for early harvest and increasingly print a polyphenol figure; the big estates run their own laboratories.' },
        ],
      },
      {
        id: 'italy',
        heading: '2. Italy',
        blocks: [
          { type: 'p', text: 'Italy has more regions, more varieties and more protected names than anywhere else, and no single style. Puglia, in the south-east, makes the most oil and the bitterest: Coratina from Bari and Andria, Ogliarola and Peranzana from Foggia, under the Olio di Puglia IGP and the Terra di Bari DOP. Tuscany sells the idea of Italian oil — Frantoio, Moraiolo and Leccino blends, grassy and peppery, under Toscano IGP and estate brands like Laudemio. Umbria and Lazio make dense, artichoke-led oils from Moraiolo and Itrana; Liguria the gentlest, Taggiasca for fish; Sicily tomato-and-herb Nocellara and Tonda Iblea; Abruzzo and Garda sit in between. Italian law makes the harvest year compulsory on Italian-bottled oil, which helps.' },
        ],
      },
      {
        id: 'greece',
        heading: '3. Greece',
        blocks: [
          { type: 'p', text: 'Greece is the third producer and the most single-minded: Koroneiki is half the olive area and the basis of nearly every PDO. Crete makes a third of the country’s oil, mostly from Chania, Heraklion and Sitia under their PDOs, with Tsounati surviving in the west; the Peloponnese — Messinia, Laconia, Corinthia — grows Koroneiki in the south and the softer Manaki in the north-east. Outside those two, the interesting oils are the outliers: Lianolia on Corfu, Makri in Thrace, Chondrolia in Chalkidiki. Greek producers pick early — agourelaio — and the top end now leads Europe in laboratory certificates for polyphenols, with Pamako, The Governor and Sakellaropoulos trading on numbers above 1,000 mg/kg.' },
        ],
      },
      {
        id: 'turkiye',
        heading: '4. Türkiye',
        blocks: [
          { type: 'p', text: 'Türkiye is the fourth or fifth producer by volume and the newest to premium bottling. The oil country is the Aegean coast: the Edremit Gulf and Ayvalık in the north, with the Ayvalık variety — fruity, almond, medium — and Memecik further south around Muğla and Manisa, greener and more bitter. Early harvest, erken hasat, has become the premium claim, and estates like Hermus, Buta Assos and Nermin Hanım pick in September, publish laboratory figures and enter the international competitions where Turkish oils now medal regularly. Prices are below Italy and Greece for comparable quality.' },
          { type: 'pull', text: 'The country is a habit. The region is a variety. The bottle is a harvest.' },
        ],
      },
      {
        id: 'which-to-buy',
        heading: '5. Which to buy for what',
        blocks: [
          {
            type: 'table',
            columns: ['If you want', 'Look to', 'Example in the library'],
            rows: [
              ['A robust oil that keeps a year', 'Jaén Picual, Puglia Coratina, early Koroneiki', 'Oro Bailén Picual · Le Ferre Olio di Puglia IGP · Laconiko'],
              ['A certified high-phenolic oil', 'Crete and the Peloponnese, Puglia', 'Pamako Monovarietal · Le Ferre Selezione'],
              ['Something green for bread and greens', 'Tuscany, Umbria, Thrace', 'Laudemio Frescobaldi · Kyklopas Ages'],
              ['A soft oil for fish and salads', 'Liguria, Catalonia, Corinthia', 'Oro Bailén Arbequina · Corinto Extra Virgin'],
              ['Value and freshness', 'The Turkish Aegean', 'Hermus Memecik · Hermus Ayvalık'],
            ],
            caption: 'A starting map. Every row links to oils with a harvest date and a stated source for each figure.',
          },
          { type: 'oil', slug: 'cretan-heritage-krissa', kicker: 'A region in one bottle' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'Production shares are the IOC’s long-run averages and move with the harvest; regional variety patterns are from the cultivar reference pages and the producer records on this site. The region list and counts come from the library’s own oils.',
            items: [
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
              { label: 'Regions hub — 17 regions counted from the library', url: '/regions/' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'how-olive-oil-competitions-work',
    category: 'competitions',
    kicker: 'Competitions · 6 min read',
    seo: { title: 'How Olive Oil Competitions Work: What a Gold Medal Means', description: 'NYIOOC, Flos Olei, EVOOLEUM, Athena, London, WBOO: how the competitions judge, how many medals they give, what a Gold is worth, how to read one.' },
    datePublished: '2026-10-04',
    dateModified: '2026-10-04',
    wordCountNote: 'six minute read',
    breadcrumb: ['Learn', 'Competitions'],
    title: 'How olive oil competitions work, and what a Gold is worth',
    lede: 'A medal on a bottle is the one claim that did not come from the producer. It is still worth reading carefully: the competitions differ in how they judge, how many medals they hand out and whether they publish a table at all.',
    author: { initial: 'P', name: 'The bestoliveoils.eu panel', updated: 'Published 4 October 2026' },
    image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles', fit: 'contain', w: 576, h: 576 },
    toc: [
      { id: 'how-judging-works', label: '1. How judging works' },
      { id: 'four-kinds', label: '2. Four kinds of result' },
      { id: 'what-a-gold-means', label: '3. What a Gold means' },
      { id: 'reading-a-medal', label: '4. Reading a medal on a label' },
      { id: 'what-we-republish', label: '5. What we republish' },
    ],
    keyFigures: [
      { value: '18', label: 'competitions and guides we follow on the rankings hub' },
      { value: '1,000+', label: 'entries a year at NYIOOC, the largest by entries' },
      { value: '0', label: 'competitions whose medal we treat as our own score' },
    ],
    promo: { kicker: 'A medal with a table behind it', oilSlug: 'sabino-leone-don-gioacchino', note: 'First in the WBOO 2025/26 ranking, which we republish in full with a link to every oil we cover.' },
    sections: [
      {
        id: 'how-judging-works',
        heading: '1. How judging works',
        blocks: [
          { type: 'p', text: 'Nearly every serious competition judges blind, in panels of trained tasters, using the IOC’s method or a close variant: the oil is warmed in a covered blue glass so colour cannot be seen, the taster scores fruitiness, bitterness and pungency and checks for defects, and the panel’s median decides. Most add a 100-point scale on top for ranking and medal thresholds. Entries are paid — typically a few hundred euros per oil — which means the field is self-selected: producers enter the oils they expect to win.' },
          { type: 'p', text: 'The differences are in what happens next. Some competitions give a medal to every oil over a threshold, so a vintage with many good entries produces many Golds. Some rank. Some score every entry and publish the score. One, WBOO, does not taste at all but totals other competitions’ results. Those four designs produce four different kinds of claim on a label.' },
        ],
      },
      {
        id: 'four-kinds',
        heading: '2. Four kinds of result',
        blocks: [
          {
            type: 'table',
            columns: ['Kind', 'How it works', 'Examples', 'What a top result tells you'],
            rows: [
              ['Medals by threshold', 'Every entry over a score gets Gold, Silver or Bronze; unlimited', 'NYIOOC, Athena, London IOOC, Olive Japan, Berlin', 'The oil was defect-free and well above average — alongside hundreds of others'],
              ['Points table', 'Every entry scored out of 100 and listed in order', 'EVOOLEUM TOP100', 'Where the oil stood against the whole field, with the number'],
              ['Guide scores', 'Estates scored out of 100 in an annual book', 'Flos Olei', 'A rating of the producer, not a single bottle'],
              ['Ranking', 'Places by category, or totals across other competitions', 'Mario Solinas (IOC), BIOL, WBOO', 'Rare: three places per class, or a season’s aggregate'],
            ],
            caption: 'Four designs, four meanings. A Gold from the first kind and a first place from the fourth are not the same achievement.',
          },
        ],
      },
      {
        id: 'what-a-gold-means',
        heading: '3. What a Gold means',
        blocks: [
          { type: 'p', text: 'At a threshold competition a Gold means the panel scored the oil above a fixed line — 85 or 90 out of 100, depending on the event — and found no defect. It is a real mark of quality. It is not a ranking: NYIOOC hands out several hundred Golds a year, London and Athena their share, and an oil with Golds from three competitions has passed three bars rather than beaten three fields. The scarce results are the ones on top of the medal — Best in Class, Best of Country, Best Koroneiki in the World — which single out one oil from the Golds, and the ranked competitions where there is a first and only one.' },
          { type: 'pull', text: 'A Gold says the oil cleared the bar. “Best in Class” says it was the best oil that did.' },
          { type: 'p', text: 'Two more things to weigh. The year: a 2017 Best in Class on a 2025 bottle is history. And which oil: producers enter one bottling and print the medal on the range, so check the competition’s own list for the exact name — which is why we link to it wherever we can.' },
        ],
      },
      {
        id: 'reading-a-medal',
        heading: '4. Reading a medal on a label',
        blocks: [
          { type: 'p', text: 'Find the competition, the year and the tier, in that order. A named competition from the list on our rankings hub is worth more than an unfamiliar one; the current or previous harvest year is worth more than an older one; a special award or a ranked place is worth more than a medal. Then look for what the medal cannot tell you — harvest date, variety, a laboratory figure — because a competition judged a sample once and you are buying a bottle now.' },
        ],
      },
      {
        id: 'what-we-republish',
        heading: '5. What we republish',
        blocks: [
          { type: 'p', text: 'The rankings hub lists the eighteen competitions and guides we follow, with each one’s organiser, scale, season and how many of the library’s oils cite it. Where we have republished a full results table — the WBOO 2025/26 ranking so far — it is reproduced in the competition’s own order with a link to our page on every oil we cover. We never reorder a table, and a medal is never our score: the panel rating on an oil page is ours, the medals are theirs, and the page keeps them apart.' },
          { type: 'oil', slug: 'sabino-leone-don-gioacchino', kicker: 'A medal with a table behind it' },
          {
            type: 'sources',
            kicker: 'How we sourced this',
            text: 'Judging methods follow the IOC sensory standard that most competitions adopt; each competition’s scale and format are as stated on its own site and summarised on our rankings hub, where fields we could not confirm are left blank. Medal counts are approximate and vary by year.',
            items: [
              { label: 'International Olive Council — trade standard and methods of analysis', url: 'https://www.internationaloliveoil.org/what-we-do/chemistry-standardisation-unit/standards-and-methods/' },
              { label: 'Our rankings hub — the competitions we follow and the tables we republish', url: '/rankings/' },
            ],
          },
        ],
      },
    ],
  },
  ],

  /* ── homepage-only copy ──────────────────────────────────────────────── */
  home: {
    /* {oils}, {producers}, {regions} and {cultivars} are filled in at build
       time from the records, so no number on this page can drift from what is
       actually published. The mockup's "312 oils" was never true. */
    eyebrow: '{oils} oils · {producers} mills · {regions} regions',
    heading: 'The European reference for extra virgin olive oil.',
    lede: 'An independent library of European extra virgin olive oil. Every entry names its producer, cultivar, region and harvest, says where the information came from, and says plainly when our panel has not tasted it.',
    searchPlaceholder: 'Search an oil, cultivar, mill or region…',
    /* Every one of these resolves to a real filtered view — the library reads
       these exact parameters. "Under €15" used to point at ?max=15, which no
       filter has ever read, so it quietly returned the whole library. */
    popular: [
      { label: 'Picual',        href: '/cultivars/picual/' },
      { label: 'Andalusia',     href: '/oils/?region=andalusia' },
      { label: 'Robust oils',   href: '/oils/?intensity=robust' },
      { label: 'Organic',       href: '/oils/?flag=organic' },
      { label: 'In our shop',   href: '/oils/?flag=in-shop' },
    ],
    hero: { src: 'assets/img/dipping-bread.webp', alt: 'Bread being dipped into a dish of extra virgin olive oil', w: 1040, h: 1040 },

    /* ── how the library works ────────────────────────────────────────────
       The v2 design draws this band as "How every bottle is verified", with
       four steps claiming blind retail purchase, independent HPLC analysis, a
       five-panellist tasting and a mill visit for every oil. None of that is
       true of this site today, and a homepage is the last place to claim a
       method you do not have. What is written below is what the code actually
       does — each step is enforced somewhere in src/, not aspirational. */
    method: {
      heading: 'How the library works',
      sub: 'What a listing here does and does not claim',
      steps: [
        {
          n: '1',
          title: 'Nothing here is paid for',
          body: 'We do not charge a producer to be listed and we do not take submissions in exchange for coverage. An oil is here because we bought it, or because it placed in a competition we follow.',
        },
        {
          n: '2',
          title: 'Every claim names its source',
          body: 'A competition placing links to the competition. A polyphenol figure says who published it — the producer, an importer, or nobody. Where a number has no source, the page says so instead of printing one.',
        },
        {
          n: '3',
          title: 'A score means the panel tasted it',
          body: 'Most oils here are catalogue entries carrying a competition record and no score at all. Those pages say "our panel has not tasted this oil yet" and show no stars. We never fill the box with a guess.',
        },
        {
          n: '4',
          title: 'The shop is disclosed, not hidden',
          body: 'Some oils are stocked at olijfoliemarkt.nl and carry an "In our shop" badge. It is a disclosure, not a recommendation — nothing about a rating changes because an oil is or is not on the shelf.',
        },
      ],
    },

    /* ── HPLC & health ────────────────────────────────────────────────────
       The regulation and the threshold are facts worth explaining. What the
       design's copy adds — "we publish the measured figure from independent
       HPLC testing for every oil" — is not, so it is not here. */
    phenol: {
      kicker: 'Polyphenols & health',
      heading: 'Why 250 mg/kg is the number that matters',
      body: [
        'EU Regulation 432/2012 permits an antioxidant health claim on an olive oil only where it carries at least 250 mg/kg of hydroxytyrosol and its derivatives. Below that figure the claim is not allowed, whatever else the label says.',
        'We do not yet commission our own laboratory analysis. Where a producer or importer publishes a measured figure we print it and name who measured it; where nobody publishes one, the oil\'s page says exactly that rather than estimating.',
      ],
      bands: [
        { label: 'High-phenolic', range: '500+', pct: '100%', tone: 'accent', note: 'Assertive, and keeps its character for about two years' },
        { label: 'Claim threshold', range: '250', pct: '50%', tone: 'accent-2', note: 'The EU 432/2012 minimum for an antioxidant claim' },
        { label: 'Gentle', range: 'under 250', pct: '24%', tone: 'neutral', note: 'Softer on the palate, and no antioxidant claim' },
      ],
      actions: [
        { label: 'Browse the library', href: '/oils/', primary: true },
        { label: 'Read the cultivar profiles', href: '/cultivars/' },
      ],
    },
    shopBand: {
      kicker: 'Where to buy',
      heading: 'Oils marked "In our shop" ship from olijfoliemarkt.nl',
      body: 'We stock a selection of the oils we rate highest, stored cool and dark and shipped across Europe. Reviews here are independent of what we sell.',
      image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles stocked in our shop', fit: 'contain', w: 576, h: 576 },
    },
  },
};
