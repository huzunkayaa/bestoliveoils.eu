/* ══════════════════════════════════════════════════════════════════════════
   Content for bestoliveoils.eu.

   This is the whole data layer. Adding an oil, a region, a guide or a review
   means adding a record here — never touching markup. render.js turns these
   into DOM; the .html files hold only the page frame and one-off prose.

   It is read at build time by build.js, which renders every page to static
   HTML — nothing here is shipped to the browser. Swapping this file for a CMS
   or database query means changing build.js only.
   ══════════════════════════════════════════════════════════════════════════ */

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
      { label: 'Regions',   href: '/oils/',  key: 'regions' },
      { label: 'Learn',     href: '/learn/',     key: 'learn' },
    ],
    footerLinks: [
      { label: 'Library',     href: '/oils/' },
      { label: 'Producers',   href: '/producers/' },
      { label: 'Regions',     href: '/oils/' },
      { label: 'Learn',       href: '/learn/' },
      { label: 'How we rate', href: '#' },
      { label: 'Contact',     href: '#' },
    ],
  },

  /* ── page metadata for the two pages that aren't driven by one record ──
     Titles aim for 50-60 characters, descriptions for 120-160, so neither is
     truncated in results. */
  pages: {
    home: {
      title: 'Olive Oil Reviews & Tasting Notes | bestoliveoils.eu',
      description: 'Independent reviews of 312 extra virgin olive oils, tasted and scored by our panel. Find an oil, learn what makes it good, and see where to buy it.',
    },
    library: {
      title: 'The Olive Oil Library — 312 Oils Rated | bestoliveoils.eu',
      description: 'Browse 312 extra virgin olive oils by region, cultivar, intensity and rating. Every oil tasted and scored by our panel, with reader reviews alongside.',
    },
    producers: {
      title: 'Olive Oil Producers & Estates | bestoliveoils.eu',
      description: 'The mills and estates behind the oils we rate: how they farm, when they harvest, and every one of their oils with our panel score alongside.',
      intro: 'The estates and mills behind the oils in the library — how they farm, when they harvest, and how their oils scored.',
      body: [
        'A producer earns a page here once we have tasted at least one of their oils blind and scored it. The page covers the groves and the mill, the cultivars they grow, when they pick, and every oil of theirs in the library with the panel score and the reader score side by side.',
        'We do not charge producers to be listed and we do not accept submissions in exchange for coverage. Oils reach the panel because we bought them or because a reader asked us to look. Where an oil is also stocked at our shop, the listing says so plainly — the score is set before that is ever considered.',
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
  },

  /* ── oils ───────────────────────────────────────────────────────────────
     `stars` is the whole-star count the ★ row draws; `score` is the printed
     decimal. `image: null` renders a labelled placeholder at the same size. */
  oils: [
    {
      slug: 'finca-la-torre-picual',
      name: 'Finca La Torre Picual',
      producer: 'Finca La Torre',
      producerSlug: 'finca-la-torre',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.8',
      stars: 5,
      reviews: 121,
      readerScore: '4.5',
      readerStars: 4,
      intensity: 'Robust',
      inShop: true,
      image: { src: 'assets/img/oro-bailen-picual.webp', alt: 'Bottle of Finca La Torre Picual extra virgin olive oil', fit: 'contain', w: 562, h: 562 },
      price: '500 ml · €18.50 at our shop',
      priceAmount: 18.50,
      priceCurrency: 'EUR',
      seo: {
        title: 'Finca La Torre Picual Review | bestoliveoils.eu',
        description: 'Our panel scored this early-harvest Andalusian Picual 4.8/5. Tasting notes, polyphenols, acidity, awards and where to buy it.',
      },
      detail: {
        location: 'Antequera, Andalusia, Spain',
        tags: ['Robust', 'Organic', 'Harvest 2025'],
        panelNote: 'Panel of 5 · tasted March 2026',
        description: 'An early-harvest Picual with the grassy, tomato-leaf character the cultivar is loved for, backed by a clean bitterness and a peppery finish that builds. One of the most consistent oils in the library across three harvests.',
        profile: [
          { label: 'Fruity',  desc: 'green tomato, grass', pct: '82%' },
          { label: 'Bitter',  desc: 'firm, balanced',      pct: '68%' },
          { label: 'Pungent', desc: 'late, lingering',     pct: '76%' },
        ],
        tastingNote: 'Green tomato, artichoke and cut grass on the nose. Almond and green banana mid-palate, then a long, peppery pungency. Bitterness is firm but balanced.',
        facts: [
          ['Cultivar',      '100% Picual'],
          ['Harvest',       'October 2025, early'],
          ['Polyphenols',   '612 mg/kg'],
          ['Free acidity',  '0.14%'],
          ['Extraction',    'Cold, two-phase, within 4h'],
          ['Certification', 'EU Organic · DOP Antequera'],
        ],
        awards: ['Gold · NYIOOC 2026', 'Best in class · Flos Olei', 'Gold · Mario Solinas'],
        origin: {
          mapPlaceholder: 'Region map · Antequera',
          note: 'Antequera sits in the limestone hills between Málaga and Córdoba, 500 m up. Cool nights keep the Picual green.',
          linkLabel: 'About Andalusia →',
          linkHref: '#',
        },
        pairings: ['Grilled red meat', 'Gazpacho', 'Bitter greens', 'Aged manchego', 'Dark chocolate'],
        expertReview: {
          initial: 'M',
          name: 'Marta Ruiz · Tasting panel',
          meta: 'Expert review · March 2026',
          badge: "Editor's pick",
          stars: 5,
          text: 'This is the oil we reach for when we need to show someone what "robust" means without scaring them off. The bitterness is generous but never harsh, and the pepper lands late and lingers. On tomato bread it is close to perfect. If anything, wait a month after harvest before opening; it settles.',
        },
        reviews: [
          { initial: 'J', name: 'Jasper de Vries', meta: 'Reader · Utrecht · April 2026',   stars: 5, helpful: 18, text: "Bought this on the panel's recommendation. Peppery enough that my kids complain, which I take as a sign of quality. Excellent on grilled bread with tomato." },
          { initial: 'A', name: 'Anouk B.',        meta: 'Reader · Ghent · March 2026',     stars: 4, helpful: 9,  text: 'Very good, but I find it too intense for salads. It shines drizzled over a steak or bitter chicory.' },
          { initial: 'L', name: 'Lorenzo M.',      meta: 'Reader · Milan · February 2026',  stars: 5, helpful: 24, text: 'Compared it blind against three Tuscan oils and it was the clear favourite at the table. The 2025 harvest is greener than 2024.' },
        ],
      },
    },
    {
      slug: 'laudemio-frescobaldi',
      name: 'Laudemio Frescobaldi',
      producer: 'Frescobaldi',
      producerSlug: 'frescobaldi',
      cultivar: 'Frantoio blend',
      region: 'Tuscany · Italy',
      score: '4.6', stars: 5, reviews: 84, intensity: 'Medium', inShop: true,
      seo: {
        title: 'Laudemio Frescobaldi Review | bestoliveoils.eu',
        description: 'A Tuscan Frantoio blend scored 4.6/5 by our tasting panel, with 84 reader reviews. See the rating and where to buy it.',
      },
      image: { src: 'assets/img/oro-bailen-arbequina.webp', alt: 'Bottle of Laudemio Frescobaldi extra virgin olive oil', fit: 'contain', w: 562, h: 562 },
    },
    {
      slug: 'castillo-de-canena-reserva-familiar',
      name: 'Castillo de Canena Reserva Familiar',
      producer: 'Castillo de Canena',
      producerSlug: 'castillo-de-canena',
      cultivar: 'Arbequina',
      region: 'Andalusia · Spain',
      score: '4.5', stars: 4, reviews: 67, intensity: 'Medium', inShop: false,
      seo: {
        title: 'Castillo de Canena Reserva Familiar Review',
        description: 'An Andalusian Arbequina scored 4.5/5 by our tasting panel, with 67 reader reviews. See the rating and the full library entry.',
      },
      image: null,
    },
    {
      slug: 'fonte-di-foiano-grand-cru',
      name: 'Fonte di Foiano Grand Cru',
      producer: 'Fonte di Foiano',
      producerSlug: 'fonte-di-foiano',
      cultivar: 'Frantoio · Leccino',
      region: 'Tuscany · Italy',
      score: '4.4', stars: 4, reviews: 39, intensity: 'Medium', inShop: true,
      seo: {
        title: 'Fonte di Foiano Grand Cru Review | bestoliveoils.eu',
        description: 'A Tuscan Frantoio and Leccino blend scored 4.4/5 by our panel, with 39 reader reviews. See the rating and where to buy it.',
      },
      image: null,
    },
    {
      slug: 'oro-bailen-reserva',
      name: 'Oro Bailén Reserva',
      producer: 'Galgón 99',
      producerSlug: 'galgon-99',
      cultivar: 'Picual',
      region: 'Andalusia · Spain',
      score: '4.3', stars: 4, reviews: 52, intensity: 'Medium', inShop: false,
      seo: {
        title: 'Oro Bailén Reserva Review | bestoliveoils.eu',
        description: 'A Picual from Galgón 99 in Andalusia, scored 4.3/5 by our tasting panel with 52 reader reviews. See the full library entry.',
      },
      image: null,
    },
    {
      slug: 'pruneti-frantoio',
      name: 'Pruneti Frantoio',
      producer: 'Pruneti',
      producerSlug: 'pruneti',
      cultivar: 'Frantoio',
      region: 'Tuscany · Italy',
      score: '4.1', stars: 4, reviews: 28, intensity: 'Medium', inShop: false,
      seo: {
        title: 'Pruneti Frantoio Review | bestoliveoils.eu',
        description: 'A Tuscan Frantoio scored 4.1/5 by our tasting panel, with 28 reader reviews. See the rating and the full library entry.',
      },
      image: null,
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
  articles: [
    { slug: 'how-to-taste-olive-oil', kicker: 'Tasting', title: 'How to taste olive oil like our panel does', meta: '6 min read', href: '/learn/how-to-taste-olive-oil/', image: null },
    { slug: 'why-your-oil-goes-flat', kicker: 'Storage', title: 'Why your oil goes flat, and how to stop it',  meta: '4 min read', href: null,            image: null },
    { slug: 'harvest-date-on-label',  kicker: 'Buying',  title: 'What the harvest date on the label really tells you', meta: '5 min read', href: null,    image: null },
  ],

  /* ── library filter panel ────────────────────────────────────────────── */
  filters: {
    regions: [
      { label: 'Italy · Tuscany',    checked: true },
      { label: 'Italy · Sicily',     checked: false },
      { label: 'Spain · Andalusia',  checked: true },
      { label: 'Greece · Crete',     checked: false },
      { label: 'Portugal · Alentejo', checked: false },
    ],
    regionsTotal: 24,
    cultivars: [
      { label: 'Picual',     selected: true },
      { label: 'Frantoio',   selected: false },
      { label: 'Koroneiki',  selected: false },
      { label: 'Arbequina',  selected: false },
      { label: 'Coratina',   selected: false },
      { label: 'Hojiblanca', selected: false },
      { label: '+ 18',       selected: false },
    ],
    intensities: [
      { label: 'Delicate', checked: false },
      { label: 'Medium',   checked: true },
      { label: 'Robust',   checked: false },
    ],
    minRating: 4,
    flags: [
      { label: 'Available in our shop', checked: true },
      { label: 'Certified organic',     checked: false },
    ],
    summary: '48 oils · Tuscany, Andalusia · Medium · 4★ and up',
    total: 48,
    sort: 'Expert rating',
  },

  /* ── producers ───────────────────────────────────────────────────────── */
  producers: [
    {
      slug: 'finca-la-torre',
      name: 'Finca La Torre',
      country: 'Spain',
      countryCode: 'ES',
      locality: 'Antequera',
      regionName: 'Málaga, Andalusia',
      founded: '1904',
      geo: { lat: 37.02, lon: -4.56 },
      website: 'https://www.fincalatorre.com',
      seo: {
        title: 'Finca La Torre — Estate, Groves & Oils | bestoliveoils.eu',
        description: 'A biodynamic estate above Antequera, farmed by the same family since 1904. The groves, the mill, and all three of their oils with our panel scores.',
      },
      tags: ['Andalusia, Spain', 'Est. 1904', 'Organic since 2009'],
      lede: 'A 200-hectare estate in the hills above Antequera, farmed biodynamically by the Fernández family for four generations. Trees are harvested early and milled on site within four hours.',
      image: null,
      imagePlaceholder: 'Estate / grove photo',
      stats: [
        { value: '3',   label: 'oils in library' },
        { value: '4.7', label: 'average expert rating' },
        { value: '2',   label: 'available in our shop' },
      ],
      oils: [
        { name: 'Finca La Torre Picual',     slug: 'finca-la-torre-picual', cultivar: 'Picual',     intensity: 'Robust',   stars: 5, score: '4.8', readers: '4.5 · 121', inShop: true },
        { name: 'Finca La Torre Hojiblanca', slug: '#',                     cultivar: 'Hojiblanca', intensity: 'Medium',   stars: 5, score: '4.7', readers: '4.4 · 63',  inShop: true },
        { name: 'Finca La Torre Arbequina',  slug: '#',                     cultivar: 'Arbequina',  intensity: 'Delicate', stars: 4, score: '4.5', readers: '4.3 · 31',  inShop: false },
      ],
      estate: [
        'The groves sit between 450 and 600 m, on limestone that drains fast and holds the day’s heat. Picual dominates, with older Hojiblanca and a small Arbequina block planted in 2015. Harvest starts in the first week of October, well before most of the region, which costs yield but buys the green, high-polyphenol style the estate is known for.',
        'The mill is a two-phase Pieralisi line kept below 24 °C. Oil is stored under nitrogen and bottled to order, so the harvest date on the label tells you something.',
      ],
      map: { placeholder: 'Map · Antequera', caption: 'Antequera, Málaga · 37.02° N, 4.56° W' },
    },
  ],

  /* ── guide pages ─────────────────────────────────────────────────────── */
  guides: [
    {
      slug: 'how-to-taste-olive-oil',
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
      author: { initial: 'M', name: 'Marta Ruiz', updated: 'Updated 12 May 2026' },
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
        oilSlug: 'finca-la-torre-picual',
        note: 'A robust oil that shows all three positives clearly.',
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
  ],

  /* ── homepage-only copy ──────────────────────────────────────────────── */
  home: {
    eyebrow: '312 oils tasted · 24 regions',
    heading: 'Every good olive oil in Europe, tasted and explained.',
    lede: 'Independent reviews from our tasting panel and thousands of readers. Find an oil, learn what makes it good, and see where to buy it.',
    searchPlaceholder: 'Search an oil, producer or region…',
    popular: [
      { label: 'Picual',      href: '/oils/?cultivar=picual' },
      { label: 'Tuscany',     href: '/oils/?region=tuscany' },
      { label: 'Robust oils', href: '/oils/?intensity=robust' },
      { label: 'Under €15',   href: '/oils/?max=15' },
    ],
    hero: { src: 'assets/img/dipping-bread.webp', alt: 'Bread being dipped into a dish of extra virgin olive oil', w: 1040, h: 1040 },
    shopBand: {
      kicker: 'Where to buy',
      heading: 'Oils marked "In our shop" ship from olijfoliemarkt.nl',
      body: 'We stock a selection of the oils we rate highest, stored cool and dark and shipped across Europe. Reviews here are independent of what we sell.',
      image: { src: 'assets/img/bottles-lineup.webp', alt: 'A row of extra virgin olive oil bottles stocked in our shop', fit: 'contain', w: 576, h: 576 },
    },
  },
};
