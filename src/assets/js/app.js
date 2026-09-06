/* ══════════════════════════════════════════════════════════════════════════
   The only JavaScript that ships.

   Every page is rendered to HTML at build time, so nothing here is needed to
   read the site — this file adds the two behaviours that genuinely require a
   browser: the star-rating input and the article sidebar tracking scroll.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── review form: star rating ─────────────────────────────────────────── */

  function initStarPicker() {
    var picker = document.querySelector('[data-star-picker]');
    if (!picker) return;

    var LABELS = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    var label = picker.querySelector('.star-picker__label');
    var input = document.querySelector('[data-star-value]');
    var buttons = [];

    for (var i = 1; i <= 5; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = '★';
      b.dataset.value = String(i);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      b.setAttribute('aria-label', i + (i === 1 ? ' star' : ' stars'));
      picker.insertBefore(b, label);
      buttons.push(b);
    }

    function paint(value) {
      buttons.forEach(function (btn, idx) {
        btn.setAttribute('aria-checked', idx < value ? 'true' : 'false');
      });
      label.textContent = value ? LABELS[value - 1] : '';
      if (input) input.value = value || '';
    }

    picker.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-value]');
      if (btn) paint(Number(btn.dataset.value));
    });

    paint(4); // matches the design's pre-filled state
  }

  /* ── article: sidebar follows the section you are reading ────────────── */

  function initTocHighlight() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.article-toc a[href^="#"]'));
    if (!links.length) return;

    var headings = links
      .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
      .filter(Boolean);
    if (!headings.length) return;

    var ticking = false;

    function update() {
      ticking = false;
      var readLine = 140;
      var currentId = headings[0].id;
      headings.forEach(function (h) {
        if (h.getBoundingClientRect().top <= readLine) currentId = h.id;
      });
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + currentId) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  initStarPicker();
  initTocHighlight();
})();
