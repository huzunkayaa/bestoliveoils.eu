/* ══════════════════════════════════════════════════════════════════════════
   The only JavaScript that ships.

   Every page is rendered to HTML at build time, so nothing here is needed to
   READ the site. This file adds the three things that genuinely require a
   browser: the library's filters and search, the star-rating input, and the
   article sidebar tracking scroll.

   The library is progressive enhancement: without JS every oil is already in
   the page and visible, and the filters simply don't filter.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── library: filter, search, sort ────────────────────────────────────── */

  /* Same accent folding the build applies to each card's data-text, so a query
     typed without accents still matches "Bailén". */
  function fold(s) {
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function initLibrary() {
    var root = document.querySelector('[data-library]');
    if (!root) return;

    var grid = root.querySelector('[data-oil-grid]');
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.oil-card'));
    var summary = root.querySelector('[data-results-summary]');
    var empty = root.querySelector('[data-results-empty]');
    var sortSelect = root.querySelector('[data-sort]');
    var ratingLabel = root.querySelector('[data-rating-label]');
    var searchInput = document.querySelector('.searchbar input[name="q"]');
    var searchForm = searchInput && searchInput.form;

    // Remember each card's original position so "sort by" can restore it.
    cards.forEach(function (card, i) { card._order = i; });

    var state = { region: [], cultivar: [], intensity: '', minRating: 0,
                  flags: [], q: '', sort: 'score' };

    /* ── URL is the source of truth, so a filtered view can be linked and the
       back button works. The canonical stays /oils/ (see seo.js), and
       robots.txt keeps the query forms out of the crawl. */
    function readUrl() {
      var p = new URLSearchParams(window.location.search);
      state.region = p.getAll('region');
      state.cultivar = p.getAll('cultivar');
      state.intensity = p.get('intensity') || '';
      state.minRating = Number(p.get('min')) || 0;
      state.flags = p.getAll('flag');
      state.q = p.get('q') || '';
      state.sort = p.get('sort') || 'score';
    }

    function writeUrl(replace) {
      var p = new URLSearchParams();
      state.region.forEach(function (v) { p.append('region', v); });
      state.cultivar.forEach(function (v) { p.append('cultivar', v); });
      if (state.intensity) p.set('intensity', state.intensity);
      if (state.minRating) p.set('min', String(state.minRating));
      state.flags.forEach(function (v) { p.append('flag', v); });
      if (state.q) p.set('q', state.q);
      if (state.sort !== 'score') p.set('sort', state.sort);

      var qs = p.toString();
      var url = window.location.pathname + (qs ? '?' + qs : '');
      if (replace) window.history.replaceState(null, '', url);
      else window.history.pushState(null, '', url);
    }

    /* ── controls reflect state, state reflects controls ─────────────────── */

    function syncControls() {
      root.querySelectorAll('input[name="region"]').forEach(function (el) {
        el.checked = state.region.indexOf(el.value) !== -1;
      });
      root.querySelectorAll('input[name="flag"]').forEach(function (el) {
        el.checked = state.flags.indexOf(el.value) !== -1;
      });
      root.querySelectorAll('input[name="intensity"]').forEach(function (el) {
        el.checked = el.value === state.intensity;
      });
      root.querySelectorAll('[data-cultivar]').forEach(function (el) {
        var on = state.cultivar.indexOf(el.dataset.cultivar) !== -1;
        el.setAttribute('aria-pressed', on ? 'true' : 'false');
        el.classList.toggle('tag-accent', on);
        el.classList.toggle('tag-neutral', !on);
      });
      root.querySelectorAll('[data-min-rating]').forEach(function (el) {
        var n = Number(el.dataset.minRating);
        el.setAttribute('aria-checked', n === state.minRating ? 'true' : 'false');
        el.classList.toggle('is-on', n <= state.minRating);
      });
      if (ratingLabel) {
        ratingLabel.textContent = state.minRating ? state.minRating + ' & up' : 'Any';
      }
      if (sortSelect) sortSelect.value = state.sort;
      if (searchInput && searchInput.value !== state.q) searchInput.value = state.q;
    }

    /* ── the filter itself ───────────────────────────────────────────────── */

    function matches(card) {
      var d = card.dataset;
      if (state.region.length && state.region.indexOf(d.region) === -1) return false;
      if (state.intensity && d.intensity !== state.intensity) return false;
      if (state.minRating && Number(d.score) < state.minRating) return false;
      if (state.flags.indexOf('in-shop') !== -1 && d.inShop !== '1') return false;
      if (state.flags.indexOf('organic') !== -1 && d.organic !== '1') return false;

      if (state.cultivar.length) {
        var has = d.cultivar.split(' ');
        var hit = state.cultivar.some(function (c) { return has.indexOf(c) !== -1; });
        if (!hit) return false;
      }
      if (state.q) {
        // Every word must appear somewhere in the card's text.
        var words = fold(state.q).split(/\s+/).filter(Boolean);
        for (var i = 0; i < words.length; i++) {
          if (d.text.indexOf(words[i]) === -1) return false;
        }
      }
      return true;
    }

    var SORTS = {
      score: function (a, b) { return Number(b.dataset.score) - Number(a.dataset.score); },
      name: function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); },
      reviews: function (a, b) {
        return (Number(b.dataset.reviews) || 0) - (Number(a.dataset.reviews) || 0);
      },
    };

    function apply() {
      var shown = 0;
      cards.forEach(function (card) {
        var ok = matches(card);
        card.hidden = !ok;
        if (ok) shown++;
      });

      var order = cards.slice().sort(SORTS[state.sort] || SORTS.score);
      // Stable tiebreak on the build order, so equal scores keep their sequence.
      order.forEach(function (card) { grid.appendChild(card); });

      if (summary) {
        summary.textContent = shown === cards.length
          ? cards.length + ' oils'
          : shown + ' of ' + cards.length + ' oils';
      }
      if (empty) empty.hidden = shown !== 0;
    }

    function update(pushUrl) {
      syncControls();
      apply();
      writeUrl(!pushUrl);
    }

    /* ── events ──────────────────────────────────────────────────────────── */

    function toggle(list, value) {
      var i = list.indexOf(value);
      if (i === -1) list.push(value); else list.splice(i, 1);
      return list;
    }

    root.addEventListener('change', function (e) {
      var el = e.target;
      if (el.name === 'region') state.region = toggle(state.region, el.value);
      else if (el.name === 'flag') state.flags = toggle(state.flags, el.value);
      else if (el.name === 'intensity') state.intensity = el.value;
      else if (el.hasAttribute('data-sort')) state.sort = el.value;
      else return;
      update(true);
    });

    root.addEventListener('click', function (e) {
      var cultivar = e.target.closest('[data-cultivar]');
      if (cultivar) {
        state.cultivar = toggle(state.cultivar, cultivar.dataset.cultivar);
        update(true);
        return;
      }
      var star = e.target.closest('[data-min-rating]');
      if (star) {
        var n = Number(star.dataset.minRating);
        state.minRating = state.minRating === n ? 0 : n;  // click again to clear
        update(true);
        return;
      }
      // Clicking the selected intensity again clears it — there is no "Any"
      // option in the design, so the second click has to do that job.
      var seg = e.target.closest('.seg-opt');
      if (seg) {
        var input = seg.querySelector('input');
        if (input && input.value === state.intensity) {
          e.preventDefault();
          state.intensity = '';
          update(true);
        }
        return;
      }
      if (e.target.closest('[data-clear-filters]')) {
        state = { region: [], cultivar: [], intensity: '', minRating: 0,
                  flags: [], q: '', sort: state.sort };
        update(true);
      }
    });

    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        state.q = searchInput.value.trim();
        update(true);
      });
      // Filter as you type, without a history entry per keystroke.
      var timer;
      searchInput.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          state.q = searchInput.value.trim();
          syncControls();
          apply();
          writeUrl(true);
        }, 150);
      });
    }

    window.addEventListener('popstate', function () {
      readUrl();
      syncControls();
      apply();
    });

    readUrl();
    update(false);
  }

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

  /* ── nav: the "Olive oils" taxonomy panel ─────────────────────────────
     The panel ships closed and the caret opens it. Without JavaScript it
     stays closed and the nav item beside it is still a plain link to the
     library, which is where the panel leads anyway — so nothing is lost,
     and no reader is left with a permanently open block of links. */
  function initMegaMenu() {
    var caret = document.querySelector('.nav-caret');
    var panel = caret && document.getElementById(caret.getAttribute('aria-controls'));
    if (!panel) return;

    function setOpen(open) {
      caret.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
    }

    caret.addEventListener('click', function () {
      setOpen(caret.getAttribute('aria-expanded') !== 'true');
    });

    // Escape closes and returns focus to the control that opened it.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || panel.hidden) return;
      setOpen(false);
      caret.focus();
    });

    // A click outside closes it. Clicks inside the panel are links, and
    // navigating away closes it by definition.
    document.addEventListener('click', function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || caret.contains(e.target)) return;
      setOpen(false);
    });

    // Tabbing out of the panel closes it too, so keyboard users are not
    // dragged through the rest of the page with it still open behind them.
    document.addEventListener('focusin', function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || caret.contains(e.target)) return;
      setOpen(false);
    });
  }

  initLibrary();
  initStarPicker();
  initTocHighlight();
  initMegaMenu();
})();
