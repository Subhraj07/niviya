/* =============================================================================
   Niviya Interiors, main.js  (vanilla, no dependencies)
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---- Reveal on scroll -------------------------------------------------- */
  var reveals = $$('[data-reveal]');
  if (reveals.length) {
    if ('IntersectionObserver' in window && !reduce) {
      reveals.forEach(function (el) {
        var d = el.getAttribute('data-reveal-delay');
        if (d) el.style.transitionDelay = d + 'ms';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---- Animated counters ------------------------------------------------- */
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target; cio.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        if (reduce) { el.textContent = target + suffix; return; }
        var t0 = performance.now(), dur = 1600;
        (function tick(t) {
          var p = Math.min(1, (t - t0) / dur);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---- Nav: glass on scroll + mobile menu + spine fill ------------------- */
  var nav = $('.nav');
  var toggle = $('.nav-toggle');
  var spineFill = $('.spine-fill');
  var timeline = $('.timeline');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) nav.classList.toggle('scrolled', y > 50);
    if (spineFill && timeline) {
      var r = timeline.getBoundingClientRect();
      var p = (window.innerHeight * 0.78 - r.top) / r.height;
      spineFill.style.transform = 'scaleY(' + Math.max(0, Math.min(1, p)) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Hero parallax ----------------------------------------------------- */
  var heroBg = $('.hero-bg'), heroFg = $('.hero-fg'), raf = 0;
  if (heroBg && !reduce) {
    window.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5;
      var ny = e.clientY / window.innerHeight - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        heroBg.style.transform = 'scale(1.07) translate(' + (nx * -16) + 'px,' + (ny * -10) + 'px)';
        if (heroFg) heroFg.style.transform = 'translate(' + (nx * 10) + 'px,' + (ny * 6) + 'px)';
      });
    }, { passive: true });
  }

  /* ---- i18n helper: read the active-language string (falls back to key) --- */
  function T(k) { return (window.i18n && window.i18n.t) ? window.i18n.t(k) : k; }

  /* ---- Materials tabs (copy pulled from i18n so it follows the language) -- */
  var MAT_KEYS = ['plywood', 'laminates', 'hardware', 'lighting', 'glass', 'acrylic'];
  var MAT_TEX = [
    'repeating-linear-gradient(0deg, #D9B98C 0 6px, #C9A26E 6px 9px, #E4C79B 9px 15px, #B98F5C 15px 18px)',
    'linear-gradient(135deg, #6E4A2F, #8B5E3C 45%, #5C3A22 100%)',
    'linear-gradient(135deg, #B9BDC4, #EDEFF2 35%, #8E939B 62%, #D8DBDF)',
    'radial-gradient(circle at 35% 30%, #FFE9C4, #E8B96A 48%, #8A6428)',
    'linear-gradient(160deg, rgba(203,224,220,.98), rgba(154,186,180,.95) 50%, rgba(214,233,229,.98))',
    'linear-gradient(150deg, #F7F4EF 0%, #EFE9E0 38%, #FFFFFF 54%, #E7DFD2 100%)'
  ];
  function buildMats() {
    return MAT_KEYS.map(function (m, i) {
      return {
        name: T('mat_' + m + '_name'), tag: T('mat_' + m + '_tag'), desc: T('mat_' + m + '_desc'),
        specs: [T('mat_' + m + '_s1'), T('mat_' + m + '_s2'), T('mat_' + m + '_s3')], tex: MAT_TEX[i]
      };
    });
  }
  var mats = buildMats(), matIndex = 0;
  var matBtns = $$('.mat-btn');
  var matInd = $('.mat-ind'), matTag = $('.mat-tag'), matName = $('.mat-name'),
      matDesc = $('.mat-desc'), matChips = $('.mat-chips'), matFace = $('.sample-face'),
      matPanel = $('.mat-panel');
  function setMat(i) {
    var m = mats[i]; if (!m) return;
    matIndex = i;
    matBtns.forEach(function (b, j) { b.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
    if (matInd) matInd.style.top = (i * 74) + 'px';
    if (matTag) matTag.textContent = m.tag;
    if (matName) matName.textContent = m.name;
    if (matDesc) matDesc.textContent = m.desc;
    if (matChips) matChips.innerHTML = m.specs.map(function (s) { return '<span class="chip">' + s + '</span>'; }).join('');
    if (matFace) matFace.style.background = m.tex;
    if (matPanel && !reduce) { matPanel.style.animation = 'none'; void matPanel.offsetWidth; matPanel.style.animation = 'contentFade .55s var(--ease) both'; }
  }
  matBtns.forEach(function (b, i) {
    b.addEventListener('click', function () { setMat(i); });
  });
  if (matBtns.length) setMat(0);

  /* ---- Testimonials carousel (copy pulled from i18n) --------------------- */
  function buildQuotes() {
    return [1, 2, 3].map(function (n) {
      return { text: T('testi' + n + '_text'), name: T('testi' + n + '_name'), place: T('testi' + n + '_place') };
    });
  }
  var quotes = buildQuotes();
  var qText = $('.q-text'), qName = $('.q-name'), qPlace = $('.q-place'), qPanel = $('.quote-panel');
  var dotsWrap = $('.dots'), qi = 0, lastQ = Date.now();
  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = quotes.map(function (_, j) {
      return '<button type="button" aria-label="Testimonial ' + (j + 1) + '"' + (j === qi ? ' aria-current="true"' : '') + '></button>';
    }).join('');
    $$('button', dotsWrap).forEach(function (b, j) { b.addEventListener('click', function () { setQuote(j); }); });
  }
  function setQuote(i, auto) {
    qi = (i + quotes.length) % quotes.length;
    if (!auto) lastQ = Date.now();
    var q = quotes[qi];
    if (qText) qText.textContent = '“' + q.text + '”';
    if (qName) qName.textContent = q.name;
    if (qPlace) qPlace.textContent = q.place;
    renderDots();
    if (qPanel && !reduce) { qPanel.style.animation = 'none'; void qPanel.offsetWidth; qPanel.style.animation = 'contentFade .55s var(--ease) both'; }
  }
  if (qText) {
    setQuote(0);
    var pv = $('.testi-prev'), nx = $('.testi-next');
    if (pv) pv.addEventListener('click', function () { setQuote(qi - 1); });
    if (nx) nx.addEventListener('click', function () { setQuote(qi + 1); });
    if (!reduce) setInterval(function () {
      if (document.hidden) return;
      if (Date.now() - lastQ < 8000) return;
      setQuote(qi + 1, true);
    }, 6000);
  }

  /* ---- Gallery filter ---------------------------------------------------- */
  var filters = $$('.filter'), cards = $$('.card');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var cat = f.getAttribute('data-filter');
      filters.forEach(function (x) { x.setAttribute('aria-pressed', x === f ? 'true' : 'false'); });
      cards.forEach(function (c) {
        var show = cat === 'all' || c.getAttribute('data-cat') === cat;
        c.hidden = !show;
      });
    });
  });

  /* ---- Lightbox ---------------------------------------------------------- */
  var lb = $('.lightbox'), lbImg = $('.lb-img'), lbCap = $('.lb-cap');
  var openList = [], lbIndex = 0;
  function refreshList() { openList = cards.filter(function (c) { return !c.hidden; }); }
  function openLb(card) {
    refreshList(); lbIndex = openList.indexOf(card); showLb();
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  }
  function showLb() {
    var c = openList[lbIndex]; if (!c) return;
    lbImg.src = c.getAttribute('data-full');
    lbImg.alt = c.getAttribute('data-alt') || '';
    var nm = c.querySelector('.name');
    lbCap.textContent = nm ? nm.textContent : (c.getAttribute('data-title') || '');
  }
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function stepLb(d) { lbIndex = (lbIndex + d + openList.length) % openList.length; showLb(); }
  if (lb) {
    cards.forEach(function (c) { $('button', c).addEventListener('click', function () { openLb(c); }); });
    $('.lb-close').addEventListener('click', closeLb);
    $('.lb-prev').addEventListener('click', function () { stepLb(-1); });
    $('.lb-next').addEventListener('click', function () { stepLb(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') stepLb(-1);
      else if (e.key === 'ArrowRight') stepLb(1);
    });
  }

  /* ---- Reels: tap to play ------------------------------------------------ */
  $$('.reel').forEach(function (reel) {
    var play = $('.play', reel), video = $('video', reel);
    if (!play || !video) return;
    play.addEventListener('click', function () {
      $$('.reel.playing').forEach(function (r) { if (r !== reel) { r.classList.remove('playing'); var v = $('video', r); if (v) { v.pause(); } } });
      reel.classList.add('playing');
      video.play();
    });
    video.addEventListener('ended', function () { reel.classList.remove('playing'); });
  });

  /* ---- Image load -> fade placeholder ------------------------------------ */
  $$('img[loading]').forEach(function (img) {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', function () { img.classList.add('loaded'); });
    img.addEventListener('error', function () { img.style.opacity = '0'; });
  });

  /* ---- Contact form -> WhatsApp ------------------------------------------ */
  var form = $('.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || '').trim();
      var phone = (form.elements.phone.value || '').trim();
      var community = form.elements.community.value || '';
      var scope = form.elements.scope.value || '';
      var msg = T('wa_form_intro')
        + '\n\n' + T('wa_form_details')
        + (name ? '\n• ' + T('wa_form_name') + ': ' + name : '')
        + (phone ? '\n• ' + T('wa_form_phone') + ': ' + phone : '')
        + (community ? '\n• ' + T('wa_form_community') + ': ' + community : '')
        + (scope ? '\n• ' + T('wa_form_looking') + ': ' + scope : '')
        + '\n\n' + T('wa_form_closing');
      window.open('https://wa.me/919845780691?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }

  /* ---- Re-render dynamic copy when the language changes ------------------ */
  if (window.i18n && window.i18n.onChange) {
    window.i18n.onChange(function () {
      mats = buildMats();
      if (matBtns.length) setMat(matIndex);
      quotes = buildQuotes();
      if (qText) setQuote(qi, true);
    });
  }

  /* ---- Footer year ------------------------------------------------------- */
  var yr = $('.year'); if (yr) yr.textContent = new Date().getFullYear();

  /* contentFade keyframe (defined here to keep CSS lean) */
  var style = document.createElement('style');
  style.textContent = '@keyframes contentFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}';
  document.head.appendChild(style);
})();
