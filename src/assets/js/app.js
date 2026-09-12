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


  /* ── cultivars index: facets, synonym typeahead, sort ─────────────────────
     Same bargain as the library. Every card is in the HTML already; this only
     hides, reorders and counts. With JS off the forty varieties are all there
     and the chips are inert.

     The counts are recomputed on every change from the cards themselves, so a
     chip can never advertise a number that clicking it will not produce. */
  function initCultivarIndex() {
    var root = document.querySelector('[data-cultivar-index]');
    if (!root) return;

    var grid = root.querySelector('[data-cv-grid]');
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.cv-card'));
    var order = cards.slice();
    var countEl = root.querySelector('[data-cv-count]');
    var stateEl = root.querySelector('[data-cv-filterstate]');
    var activeEl = root.querySelector('[data-cv-active]');
    var emptyEl = root.querySelector('[data-cv-empty]');
    var emptyText = root.querySelector('[data-cv-empty-text]');
    var emptyActions = root.querySelector('[data-cv-empty-actions]');
    var moreEl = root.querySelector('[data-cv-more]');
    var showingEl = root.querySelector('[data-cv-showing]');
    var moreBtn = root.querySelector('[data-cv-showmore]');
    var search = root.querySelector('[data-cv-search]');
    var typeahead = root.querySelector('[data-cv-typeahead]');

    var PAGE = 9;
    var shown = PAGE;
    var state = { country: [], purpose: [], phenol: [], intensity: [] };
    var KEYS = { country: 'country', purpose: 'purpose', phenolBand: 'phenol', intensity: 'intensity' };
    var ATTR = { country: 'country', purpose: 'purpose', phenol: 'phenol', intensity: 'intensity' };
    var LABEL = { country: 'Country', purpose: 'Used for', phenol: 'Polyphenols', intensity: 'Intensity' };

    function valueOf(card, key) { return card.getAttribute('data-' + ATTR[key]) || 'Not published'; }

    /* Cards matching every active facet except the one named — the base a
       chip's own count is measured against. */
    function matching(except) {
      return cards.filter(function (card) {
        return Object.keys(state).every(function (key) {
          if (key === except || !state[key].length) return true;
          return state[key].indexOf(valueOf(card, key)) !== -1;
        });
      });
    }

    function sortCards(mode) {
      var by = {
        az: function (a, b) { return a.dataset.name.localeCompare(b.dataset.name); },
        country: function (a, b) {
          return a.dataset.country.localeCompare(b.dataset.country) ||
                 a.dataset.name.localeCompare(b.dataset.name);
        },
        oils: function (a, b) {
          return (Number(b.dataset.oils) || 0) - (Number(a.dataset.oils) || 0) ||
                 a.dataset.name.localeCompare(b.dataset.name);
        },
      };
      order = cards.slice().sort(by[mode] || by.az);
      order.forEach(function (card) { grid.appendChild(card); });
    }

    /* The escape hatches the design puts in the empty state: each one names the
       filter it would drop and how many varieties that leaves. */
    function renderEmpty(total) {
      var chips = [];
      Object.keys(state).forEach(function (key) {
        state[key].forEach(function (value) {
          var without = { country: state.country.slice(), purpose: state.purpose.slice(),
            phenol: state.phenol.slice(), intensity: state.intensity.slice() };
          without[key] = without[key].filter(function (v) { return v !== value; });
          var n = cards.filter(function (card) {
            return Object.keys(without).every(function (k) {
              return !without[k].length || without[k].indexOf(valueOf(card, k)) !== -1;
            });
          }).length;
          chips.push({ key: key, value: value, n: n });
        });
      });

      emptyText.textContent = chips.length
        ? 'Nothing carries all ' + chips.length + ' of these at once. Loosen one and you will have results.'
        : 'Nothing matches.';
      emptyActions.innerHTML = '';
      chips.forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn ' + (i === 0 ? 'btn-primary' : 'btn-secondary');
        b.textContent = 'Remove “' + c.value + '” · ' + c.n + ' varieties';
        b.addEventListener('click', function () {
          state[c.key] = state[c.key].filter(function (v) { return v !== c.value; });
          apply();
        });
        emptyActions.appendChild(b);
      });
      if (chips.length) {
        var clear = document.createElement('button');
        clear.type = 'button';
        clear.className = 'btn btn-ghost';
        clear.textContent = 'Clear all · ' + cards.length + ' varieties';
        clear.addEventListener('click', function () {
          Object.keys(state).forEach(function (k) { state[k] = []; });
          apply();
        });
        emptyActions.appendChild(clear);
      }
      return total;
    }

    function apply() {
      var visible = matching(null);

      cards.forEach(function (card) { card.hidden = true; });
      order.filter(function (card) { return visible.indexOf(card) !== -1; })
        .forEach(function (card, i) { card.hidden = i >= shown; });

      // chip counts and pressed state
      root.querySelectorAll('[data-facet]').forEach(function (group) {
        var raw = group.getAttribute('data-facet');
        var key = KEYS[raw] || raw;
        var base = matching(key);
        group.querySelectorAll('.cv-chipbtn').forEach(function (btn) {
          var value = btn.getAttribute('data-value');
          var n = base.filter(function (card) { return valueOf(card, key) === value; }).length;
          btn.querySelector('.cv-chipbtn__count').textContent = n;
          var on = state[key].indexOf(value) !== -1;
          btn.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (n === 0 && !on) btn.setAttribute('data-zero', '1');
          else btn.removeAttribute('data-zero');
        });
      });

      // active chips
      var active = [];
      Object.keys(state).forEach(function (key) {
        state[key].forEach(function (v) { active.push({ key: key, value: v }); });
      });
      activeEl.hidden = active.length === 0;
      activeEl.innerHTML = '';
      if (active.length) {
        var lead = document.createElement('span');
        lead.className = 'cv-active__lead';
        lead.textContent = 'Filtering by';
        activeEl.appendChild(lead);
        active.forEach(function (a) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'tag tag-accent cv-active__chip';
          b.innerHTML = '';
          b.appendChild(document.createTextNode(a.value + ' ×'));
          b.setAttribute('aria-label', 'Remove filter ' + LABEL[a.key] + ': ' + a.value);
          b.addEventListener('click', function () {
            state[a.key] = state[a.key].filter(function (v) { return v !== a.value; });
            apply();
          });
          activeEl.appendChild(b);
        });
        var all = document.createElement('button');
        all.type = 'button';
        all.className = 'btn btn-ghost';
        all.textContent = 'Clear all';
        all.addEventListener('click', function () {
          Object.keys(state).forEach(function (k) { state[k] = []; });
          apply();
        });
        activeEl.appendChild(all);
      }

      countEl.textContent = visible.length + (visible.length === 1 ? ' variety' : ' varieties');
      stateEl.textContent = active.length
        ? 'filtered from ' + cards.length
        : visible.filter(function (c) { return Number(c.dataset.oils) > 0; }).length +
          ' of them have an oil in the library';

      emptyEl.hidden = visible.length !== 0;
      if (!visible.length) renderEmpty(visible.length);

      var hiddenByPaging = Math.max(0, visible.length - shown);
      moreEl.hidden = hiddenByPaging === 0;
      if (hiddenByPaging) {
        showingEl.textContent = 'Showing ' + Math.min(shown, visible.length) + ' of ' + visible.length;
        moreBtn.textContent = 'Show ' + Math.min(PAGE, hiddenByPaging) + ' more';
      }
    }

    root.querySelectorAll('.cv-chipbtn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('[data-facet]');
        var raw = group.getAttribute('data-facet');
        var key = KEYS[raw] || raw;
        var value = btn.getAttribute('data-value');
        var at = state[key].indexOf(value);
        if (at === -1) state[key].push(value); else state[key].splice(at, 1);
        shown = PAGE;
        apply();
      });
    });

    root.querySelectorAll('input[name="cvsort"]').forEach(function (el) {
      el.addEventListener('change', function () { sortCards(el.value); apply(); });
    });

    moreBtn.addEventListener('click', function () { shown += PAGE; apply(); });

    /* Typeahead. Matches the variety's own name and every synonym on the card,
       so "kalamata" surfaces Kalamon and says which name it matched. */
    if (search && typeahead) {
      var closeTypeahead = function () { typeahead.hidden = true; typeahead.innerHTML = ''; };
      search.addEventListener('input', function () {
        var q = fold(search.value.trim());
        if (q.length < 2) return closeTypeahead();
        var hits = cards.filter(function (card) {
          return fold(card.dataset.terms).indexOf(q) !== -1;
        }).slice(0, 6);
        if (!hits.length) return closeTypeahead();
        typeahead.innerHTML = '';
        var head = document.createElement('div');
        head.className = 'cv-typeahead__head';
        head.textContent = hits.length + ' match' + (hits.length === 1 ? '' : 'es') +
          ' for “' + search.value.trim() + '”';
        typeahead.appendChild(head);
        hits.forEach(function (card) {
          var name = card.querySelector('.cv-card__name').textContent;
          // Show the synonym as it is written, not as it was folded for matching.
          var via = null;
          (card.dataset.synonyms || '').split(' · ').forEach(function (term) {
            if (!via && term && fold(term).indexOf(q) !== -1 && fold(term) !== fold(name)) via = term;
          });
          var a = document.createElement('a');
          a.className = 'cv-typeahead__row';
          a.href = card.getAttribute('href');
          a.innerHTML = '<span class="cv-typeahead__name"></span>' +
            '<span class="cv-typeahead__meta"></span>';
          a.querySelector('.cv-typeahead__name').textContent = name;
          a.querySelector('.cv-typeahead__meta').textContent =
            card.dataset.country + (via ? ' · also called ' + via : '');
          typeahead.appendChild(a);
        });
        typeahead.hidden = false;
      });
      search.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeTypeahead(); });
      document.addEventListener('click', function (e) {
        if (!typeahead.contains(e.target) && e.target !== search) closeTypeahead();
      });
    }

    /* A shortcut card or a shared link arrives as ?purpose=Oil — honour it so
       the URL is the state, the way the library's filters already work. */
    var params = new URLSearchParams(location.search);
    ['country', 'purpose', 'phenolBand', 'intensity'].forEach(function (raw) {
      var v = params.get(raw);
      if (v) state[KEYS[raw] || raw].push(v);
    });

    /* ── mobile: the same chips in a bottom sheet ──────────────────────────
       The sheet's body is the facet rail itself, moved into the panel when it
       opens and moved back when it closes. One set of chips, one set of
       listeners, so the sheet cannot disagree with the rail. */
    var fab = root.querySelector('[data-cv-fab]');
    var sheet = root.querySelector('[data-cv-sheet]');
    if (fab && sheet) {
      var rail = root.querySelector('[data-cv-facets]');
      var body = sheet.querySelector('[data-cv-sheetbody]');
      var applyBtn = sheet.querySelector('[data-cv-sheetapply]');
      var fabCount = root.querySelector('[data-cv-fabcount]');

      var mq = window.matchMedia('(max-width: 760px)');

      var syncFab = function () {
        var n = Object.keys(state).reduce(function (t, k) { return t + state[k].length; }, 0);
        fab.hidden = !mq.matches;
        fabCount.hidden = n === 0;
        fabCount.textContent = n;
        if (!sheet.hidden) {
          var visible = matching(null).length;
          applyBtn.textContent = 'Show ' + visible + (visible === 1 ? ' variety' : ' varieties');
        }
      };

      /* Named openSheet/closeSheet rather than open/close: `var` hoists to the
         whole of initCultivarIndex, and a plain `close` here would shadow the
         typeahead's, so dismissing the suggestions would shut the sheet. */
      var openSheet = function () {
        body.appendChild(rail);
        sheet.hidden = false;
        document.body.style.overflow = 'hidden';
        syncFab();
      };
      var closeSheet = function () {
        root.insertBefore(rail, sheet);
        sheet.hidden = true;
        document.body.style.overflow = '';
        syncFab();
      };

      fab.addEventListener('click', openSheet);
      sheet.querySelector('[data-cv-sheetclose]').addEventListener('click', closeSheet);
      applyBtn.addEventListener('click', closeSheet);
      sheet.querySelector('[data-cv-sheetreset]').addEventListener('click', function () {
        Object.keys(state).forEach(function (k) { state[k] = []; });
        apply();
      });
      sheet.querySelector('[data-cv-sheetclear]').addEventListener('click', function () {
        Object.keys(state).forEach(function (k) { state[k] = []; });
        apply();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !sheet.hidden) closeSheet();
      });
      mq.addEventListener('change', function () { if (!mq.matches && !sheet.hidden) closeSheet(); syncFab(); });

      // Fold the fab into the render pass so its badge and the sheet's button
      // never lag the state.
      var baseApply = apply;
      apply = function () { baseApply(); syncFab(); };
    }

    // Signals to the stylesheet that the chips are live, which is what lets the
    // mobile layout hand them to the sheet.
    root.setAttribute('data-cv-enhanced', '');

    sortCards('az');
    apply();
  }


  /* ── cultivars compare: pick two to four, collapse empty rows ─────────────
     The build renders a usable three-variety table, so the page works with no
     JavaScript. This swaps the columns from the payload the build embedded —
     the same values, so the two cannot disagree — and keeps the rule that a
     row no chosen variety publishes is collapsed rather than padded with
     "Not published" in every cell. */
  function initCultivarCompare() {
    var root = document.querySelector('[data-cv-compare]');
    if (!root) return;

    var data, defs;
    try {
      data = JSON.parse(root.querySelector('[data-cv-data]').textContent);
      defs = JSON.parse(root.querySelector('[data-cv-rows]').textContent);
    } catch (e) { return; }

    var table = root.querySelector('[data-cv-table]');
    var picks = root.querySelector('[data-cv-picks]');
    var slots = root.querySelector('[data-cv-slots]');
    var add = root.querySelector('[data-cv-add]');
    var MAX = 4;

    var bySlug = {};
    data.forEach(function (d) { bySlug[d.slug] = d; });

    var chosen = Array.prototype.slice
      .call(root.querySelectorAll('.cv-cmp__header .cv-cmp__name'))
      .map(function (el) {
        var name = el.textContent;
        var hit = data.filter(function (d) { return d.name === name; })[0];
        return hit ? hit.slug : null;
      })
      .filter(Boolean);

    var params = new URLSearchParams(location.search);
    var pick = params.get('pick');
    if (pick) {
      var wanted = pick.split(',').map(function (s) { return s.trim(); })
        .filter(function (s) { return bySlug[s]; }).slice(0, MAX);
      if (wanted.length >= 2) chosen = wanted;
    }

    function cell(value) {
      var div = document.createElement('div');
      div.className = 'cv-cmp__cell' + (value == null ? ' cv-none' : '');
      div.textContent = value == null ? 'Not published' : value;
      return div;
    }

    function render() {
      var cols = chosen.map(function (slug) { return bySlug[slug]; });
      table.style.setProperty('--cv-cols', cols.length);
      table.innerHTML = '';

      var header = document.createElement('div');
      header.className = 'cv-cmp__header';
      var spacer = document.createElement('div');
      spacer.className = 'cv-cmp__label';
      header.appendChild(spacer);
      cols.forEach(function (c) {
        var col = document.createElement('div');
        col.className = 'cv-cmp__col';
        var name = document.createElement('span');
        name.className = 'cv-cmp__name';
        name.textContent = c.name;
        var country = document.createElement('span');
        country.className = 'cv-cmp__country';
        country.textContent = c.country;
        col.appendChild(name);
        col.appendChild(country);
        header.appendChild(col);
      });
      table.appendChild(header);

      defs.forEach(function (def, i) {
        var values = cols.map(function (c) { return c.cells[i]; });
        var anyPublished = values.some(function (v) { return v != null; });

        if (!anyPublished) {
          var collapsed = document.createElement('div');
          collapsed.className = 'cv-cmp__collapsed';
          var text = document.createElement('span');
          text.innerHTML = '<strong>Row hidden</strong> — ';
          text.appendChild(document.createTextNode(
            def.label.toLowerCase() + ' is not published for any of these varieties.'));
          var show = document.createElement('button');
          show.type = 'button';
          show.className = 'btn btn-ghost';
          show.textContent = 'Show anyway';
          show.addEventListener('click', function () {
            collapsed.replaceWith(buildRow(def, values));
          });
          collapsed.appendChild(text);
          collapsed.appendChild(show);
          table.appendChild(collapsed);
          return;
        }
        table.appendChild(buildRow(def, values));
      });

      picks.innerHTML = '';
      chosen.forEach(function (slug) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cv-cmp__pick';
        b.textContent = bySlug[slug].name + ' ×';
        b.setAttribute('aria-label', 'Remove ' + bySlug[slug].name);
        b.disabled = chosen.length <= 2;
        b.addEventListener('click', function () {
          chosen = chosen.filter(function (s) { return s !== slug; });
          render();
        });
        picks.appendChild(b);
      });

      slots.textContent = chosen.length + ' of ' + MAX + ' slots used';
      add.disabled = chosen.length >= MAX;
      Array.prototype.slice.call(add.options).forEach(function (opt) {
        if (opt.value) opt.disabled = chosen.indexOf(opt.value) !== -1;
      });
    }

    function buildRow(def, values) {
      var rowEl = document.createElement('div');
      rowEl.className = 'cv-cmp__row';
      var label = document.createElement('div');
      label.className = 'cv-cmp__label';
      label.textContent = def.label;
      rowEl.appendChild(label);
      values.forEach(function (v) { rowEl.appendChild(cell(v)); });
      return rowEl;
    }

    add.addEventListener('change', function () {
      if (!add.value || chosen.length >= MAX) return;
      chosen.push(add.value);
      add.value = '';
      render();
    });

    render();
  }

  initLibrary();
  initStarPicker();
  initTocHighlight();
  initMegaMenu();
  initCultivarIndex();
  initCultivarCompare();
})();
