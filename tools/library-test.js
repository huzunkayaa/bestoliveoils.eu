#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Browser test for the library's filters, search and sort.

     npm run serve          # in one shell
     node tools/library-test.js

   Needs playwright available (npm i -D playwright, or run it from a checkout
   that has it). Counts below are asserted against the current site.js, so they
   move when content is added — that is deliberate: a filter test that passes
   regardless of the data is not testing the filter.
   ══════════════════════════════════════════════════════════════════════════ */

const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });

  const visible = () => p.$$eval('.oil-card:not([hidden])', els => els.map(e => e.dataset.name));
  const summary = () => p.$eval('[data-results-summary]', e => e.textContent.trim());
  const go = async (q = '') => { await p.goto('http://localhost:8000/oils/' + q, { waitUntil: 'load' }); await p.waitForTimeout(200); };

  let fail = 0;
  const check = async (label, expected, actualFn) => {
    const a = await actualFn();
    const ok = typeof expected === 'number' ? a.length === expected : JSON.stringify(a) === JSON.stringify(expected);
    if (!ok) { fail++; console.log(`  ✗ ${label}: ${JSON.stringify(a)}`); }
    else console.log(`  ✓ ${label}${typeof expected === 'number' ? ` (${a.length})` : ''}`);
  };

  console.log('— açılış: filtresiz hepsi görünür —');
  await go();
  await check('16 yağ görünüyor', 16, visible);
  console.log('    özet:', await summary());

  console.log('\n— bölge kutusu: Andalusia —');
  await p.click('label.radio:has(input[value="andalusia"])');
  await p.waitForTimeout(150);
  await check('13 yağ', 13, visible);
  console.log('    özet:', await summary(), '| URL:', new URL(p.url()).search);

  console.log('\n— üstüne organik —');
  await p.click('label.radio:has(input[value="organic"])');
  await p.waitForTimeout(150);
  await check('6 yağ', 6, visible);

  console.log('\n— temizle —');
  await p.click('[data-clear-filters]');
  await p.waitForTimeout(150);
  await check('tekrar 16', 16, visible);
  console.log('    URL:', p.url().endsWith('/oils/') ? '/oils/ (temiz)' : new URL(p.url()).search);

  console.log('\n— çeşit düğmesi: picual —');
  await p.click('[data-cultivar="picual"]');
  await p.waitForTimeout(150);
  await check('8 yağ', 8, visible);
  await check('düğme basılı', 'true', () => p.$eval('[data-cultivar="picual"]', e => e.getAttribute('aria-pressed')));

  // Tuscany has three oils, none of them organic — a genuinely empty combination.
  console.log('\n— boş sonuç: tuscany + organic —');
  await go('?region=tuscany&flag=organic');
  await check('0 sonuç', 0, visible);
  await check('boş durum görünür', true, () => p.$eval('[data-results-empty]', e => !e.hidden));

  console.log('\n— derin link: ?region=tuscany —');
  await go('?region=tuscany');
  await check('3 yağ', 3, visible);
  await check('kutu işaretli', true, () => p.$eval('input[name="region"][value="tuscany"]', e => e.checked));

  console.log('\n— arama: ?q=frantoio —');
  await go('?q=frantoio');
  await check('4 yağ', 4, visible);
  await check('arama kutusu dolu', 'frantoio', () => p.$eval('.searchbar input[name="q"]', e => e.value));

  console.log('\n— arama kutusuna yazma —');
  await go();
  await p.fill('.searchbar input[name="q"]', 'oro bailen');
  await p.waitForTimeout(350);
  await check('5 yağ', 5, visible);

  console.log('\n— sıralama: isme göre —');
  await go();
  await p.selectOption('[data-sort]', 'name');
  await p.waitForTimeout(200);
  const names = await visible();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  console.log(JSON.stringify(names) === JSON.stringify(sorted) ? '  ✓ alfabetik' : '  ✗ sıralama yanlış: ' + names.slice(0,3));
  if (JSON.stringify(names) !== JSON.stringify(sorted)) fail++;

  console.log('\n— geri tuşu —');
  await go();
  await p.click('label.radio:has(input[value="andalusia"])');
  await p.waitForTimeout(150);
  await p.goBack();
  await p.waitForTimeout(200);
  await check('geri → 16 yağ', 16, visible);

  console.log('\n— JS kapalıyken hepsi görünür mü —');
  const p2 = await b.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  await p2.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  await p2.goto('http://localhost:8000/oils/', { waitUntil: 'load' });
  const noJs = await p2.$$eval('.oil-card:not([hidden])', e => e.length);
  console.log(noJs === 16 ? '  ✓ JS olmadan 16 yağ görünür' : `  ✗ JS olmadan ${noJs} görünüyor`);
  if (noJs !== 16) fail++;

  console.log(errs.length ? '\nJS HATALARI: ' + errs.join(' | ') : '\nJS hatası yok');
  await b.close();
  process.exit(fail || errs.length ? 1 : 0);
})();
