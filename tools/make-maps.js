#!/usr/bin/env node
/* Locator maps for producer pages, drawn from each record's `geo` and
   committed as SVG under src/assets/img/maps/. One-time tool: it needs
   d3-geo, topojson-client and world-atlas, which are NOT project
   dependencies — install them in a scratch folder and point NODE_PATH at it:

     NODE_PATH=/path/to/scratch/node_modules node tools/make-maps.js

   The map is real geography (Natural Earth 10m coastlines and borders via
   world-atlas) with the producer's own coordinates as the dot. Nothing is
   generated or guessed. */
const fs = require('fs');
const path = require('path');
const d3 = require('d3-geo');
const topojson = require('topojson-client');
const world = require('world-atlas/countries-10m.json');
const D = require('../src/data/site.js');
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const countries = topojson.feature(world, world.objects.countries);
// world-atlas 10m carries one feature (Maldives) whose bounds span the whole
// globe; projected and clipped it paints the entire frame as land. Drop any
// feature that claims more than a hemisphere.
countries.features = countries.features.filter((f) => {
  const [[x0], [x1]] = d3.geoBounds(f);
  return x1 - x0 < 180;
});
const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
const coast = topojson.mesh(world, world.objects.countries, (a, b) => a === b);

const SIZE = 600, SPAN = 8; // degrees of longitude across the frame
const out = path.join(__dirname, '..', 'src', 'assets', 'img', 'maps');
fs.mkdirSync(out, { recursive: true });

let n = 0;
const only = process.argv[2];
for (const p of D.producers) {
  if (!p.geo || (only && p.slug !== only)) continue;
  const { lat, lon } = p.geo;
  const proj = d3.geoMercator().center([lon, lat]).translate([SIZE / 2, SIZE / 2]);
  // scale so that SPAN degrees of longitude fill the width, then clip to the
  // frame so the file holds this view and not the whole planet
  const w = proj([lon + SPAN / 2, lat])[0] - proj([lon - SPAN / 2, lat])[0];
  proj.scale(proj.scale() * SIZE / w).clipExtent([[-2, -2], [SIZE + 2, SIZE + 2]]);
  const pathGen = d3.geoPath(proj).digits(1);
  const land = pathGen(countries);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" role="img" aria-label="Locator map: ${p.locality || p.name}">
<rect width="${SIZE}" height="${SIZE}" fill="#d3e1e2"/>
<path d="${land}" fill="#f5f0e6"/>
<path d="${pathGen(coast)}" fill="none" stroke="#8fa6a8" stroke-width="2"/>
<path d="${pathGen(borders)}" fill="none" stroke="#b8ab95" stroke-width="2" stroke-dasharray="6 5"/>
<circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="22" fill="#c2622f" fill-opacity="0.18"/>
<circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="9" fill="#c2622f" stroke="#fff" stroke-width="3"/>
<text x="${SIZE / 2}" y="${SIZE / 2 + 44}" text-anchor="middle" font-family="Inter, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="#2e2b25" stroke="#f5f0e6" stroke-width="6" paint-order="stroke">${esc(p.locality || p.name)}</text>
</svg>
`;
  fs.writeFileSync(path.join(out, `${p.slug}.svg`), svg);
  n++;
}
console.log(`wrote ${n} maps to ${out}`);
