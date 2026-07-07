/* =============================================================================
   Niviya Interiors  i18n.js  (English + Hindi, vanilla, no dependencies)
   - Loaded with `defer` BEFORE main.js, so the DOM is parsed when this runs.
   - Exposes window.i18n { lang, t(key), setLang(l), onChange(cb) }.
   - Static text is tagged in HTML with data-i18n / data-i18n-html /
     data-i18n-<attr>. Dynamic content (materials, testimonials, WhatsApp
     messages) is rendered by main.js via window.i18n.t().
   ========================================================================== */
(function () {
  'use strict';

  var EN = {
    "meta_title": "Niviya Interiors, Designing Timeless Homes | Bengaluru Interior Designers",
    "meta_desc": "Niviya Interiors designs and builds complete home interiors in Bengaluru, modular kitchens, wardrobes, pooja units, TV units and more. In-house craftsmen, transparent pricing, handover in 25–30 days. Book a free home visit.",
    "nav_portfolio": "Portfolio", "nav_walkthroughs": "Walkthroughs", "nav_materials": "Materials", "nav_process": "Process", "nav_contact": "Contact", "nav_book": "Book Free Visit", "brand_tag": "Interiors",
    "hero_eyebrow": "Niviya Interiors · Bengaluru",
    "hero_h1_html": "Designing <em class=\"em\">Timeless</em> Homes.",
    "hero_sub": "Personalized interiors that blend elegance, functionality and craftsmanship, designed with you, built by our own hands.",
    "hero_cta1": "Book Free Home Visit", "hero_cta2": "Explore Portfolio",
    "hero_meta": "120+ homes across Bengaluru's finest communities", "hero_scroll": "Scroll",
    "studio_eyebrow": "The Studio",
    "studio_h2_html": "A home should feel like it was always meant to be <em class=\"em\">yours</em>, not like it came out of a catalogue.",
    "studio_lead": "We design and build complete home interiors, from kitchens and wardrobes to pooja units and living rooms, all with our own craftsmen, transparent pricing, and every material approved by you before a single panel is cut. From first visit to handover in 25–30 days.",
    "trust_eyebrow": "The record so far", "trust_stat1": "Homes Delivered", "trust_stat2": "Homes in Shriram Wytfield", "trust_stat3": "In-house Team", "trust_stat4": "Day Delivery",
    "pf_eyebrow": "Portfolio",
    "pf_title_html": "Rooms with a<br />point of <em class=\"em\">view.</em>",
    "pf_intro": "Real homes, real families, photographed the week they moved in. Filter by the room you're dreaming about.",
    "filter_all": "All", "filter_kitchens": "Kitchens", "filter_living": "Living & TV", "filter_wardrobes": "Wardrobes", "filter_pooja": "Pooja", "filter_bedrooms": "Bedrooms", "filter_decor": "Décor",
    "card1_name": "The Gallery Wall", "card1_tag": "Living · Brigade",
    "card2_name": "The Emerald Kitchen", "card2_tag": "Kitchen · Shriram Wytfield",
    "card3_name": "The Bedroom Suite", "card3_tag": "Wardrobe · Brigade",
    "card4_name": "A Corner for Stillness", "card4_tag": "Pooja · Brigade",
    "card5_name": "The Green Retreat", "card5_tag": "Bedroom · Mythri",
    "card6_name": "First Impressions", "card6_tag": "Foyer · Brigade",
    "card7_name": "A Kitchen That Hosts", "card7_tag": "Kitchen · Prestige City",
    "card8_name": "Rose & Ivory", "card8_tag": "Wardrobe · Concord",
    "card9_name": "The Balcony Room", "card9_tag": "Living · Concord",
    "card10_name": "Quiet Devotion", "card10_tag": "Pooja · Sobha",
    "card11_name": "The Entertainer", "card11_tag": "Crockery · Prestige City",
    "walk_eyebrow": "Walkthroughs",
    "walk_title_html": "See it <em class=\"em\">move.</em>",
    "walk_sub": "Short handover films from real Niviya homes. Tap any to play.",
    "reel1_t": "Living & Dining", "reel1_p": "Shriram Wytfield · T3-1303",
    "reel2_t": "Living", "reel2_p": "Shriram Wytfield · T1-301",
    "reel3_t": "Living", "reel3_p": "Bengaluru",
    "reel4_t": "Kitchen", "reel4_p": "Bengaluru",
    "mat_eyebrow": "Materials",
    "mat_title_html": "What your home<br />is <em class=\"em\">made</em> of.",
    "mat_intro": "Every board, hinge and edge, shown to you, explained to you, and approved by you before execution begins.",
    "mat_note": "Material approval before execution, always",
    "mat_plywood_name": "Plywood", "mat_plywood_tag": "The Bones", "mat_plywood_desc": "Boiling-water-resistant, ISI-710 grade ply, termite-treated, calibrated and warrantied. It's the part you'll never see, so we refuse to cut corners you'd never catch.", "mat_plywood_s1": "BWR / BWP Grade", "mat_plywood_s2": "ISI 710 Certified", "mat_plywood_s3": "Termite & Borer Treated",
    "mat_laminates_name": "Laminates", "mat_laminates_tag": "The Skin", "mat_laminates_desc": "Merino, Greenlam and Royale Touche surfaces in matte, gloss and woodgrain, scratch-resistant, easy to live with, and chosen against your walls in daylight, not under showroom bulbs.", "mat_laminates_s1": "1mm Premium Grade", "mat_laminates_s2": "Scratch Resistant", "mat_laminates_s3": "200+ Curated Finishes",
    "mat_hardware_name": "Hardware", "mat_hardware_tag": "The Movement", "mat_hardware_desc": "Hettich and Ebco channels and hinges rated for decades of daily use. Drawers glide shut on their own; doors never slam. You'll feel the difference every single morning.", "mat_hardware_s1": "Hettich · Ebco", "mat_hardware_s2": "Soft-Close Everything", "mat_hardware_s3": "Lakh-Cycle Rated",
    "mat_lighting_name": "Lighting", "mat_lighting_tag": "The Mood", "mat_lighting_desc": "Warm 3000K profile lights, layered, under cabinets, inside wardrobes, over the pooja unit. Light that makes wood glow and evenings slow down.", "mat_lighting_s1": "3000K Warm White", "mat_lighting_s2": "Profile + COB", "mat_lighting_s3": "Layered Scenes",
    "mat_glass_name": "Glass", "mat_glass_tag": "The Lightness", "mat_glass_desc": "Toughened, lacquered and fluted glass for shutters and partitions, safe for homes with kids, and generous enough to let rooms borrow light from each other.", "mat_glass_s1": "Toughened Safety Glass", "mat_glass_s2": "Fluted · Lacquered", "mat_glass_s3": "Frameless Options",
    "mat_acrylic_name": "Acrylic", "mat_acrylic_tag": "The Shine", "mat_acrylic_desc": "Mirror-gloss acrylic fronts with seamless edges, a finish that reads like lacquered furniture, not factory panels. Reserved for the rooms you show first.", "mat_acrylic_s1": "High-Gloss Finish", "mat_acrylic_s2": "Seamless Edges", "mat_acrylic_s3": "UV-Stable Colour",
    "proc_eyebrow": "Process",
    "proc_title_html": "Six steps. Zero <em class=\"em\">surprises.</em>",
    "step1_h": "Free Home Visit", "step1_p": "We walk your home with you, every wall, every corner. No charge, no obligation.",
    "step2_h": "Requirement Gathering", "step2_p": "How you live, what you store, what mornings look like. We listen before we sketch.",
    "step3_h": "Material Approval", "step3_p": "Every board, laminate and hinge in your hands before a single panel is cut.",
    "step4_h": "Execution", "step4_p": "Our own craftsmen build on site, no middlemen, no drift from the drawings.",
    "step5_h": "Quality Check", "step5_p": "Every edge, alignment and soft-close checked against the approved design.",
    "step6_h": "Delivery", "step6_p": "Keys back in 25–30 days. Your move-in date is a promise, not an estimate.",
    "why_eyebrow": "Why Niviya",
    "why_title_html": "Chosen for the way we <em class=\"em\">work.</em>",
    "why1_h": "Premium Materials", "why1_p": "ISI-certified ply, branded laminates, Hettich hardware. Nothing we wouldn't put in our own homes.",
    "why2_h": "Transparent Pricing", "why2_p": "One detailed quote, itemised to the last hinge. The number we start with is the number you pay.",
    "why3_h": "No Hidden Costs", "why3_p": "No site conditions, no escalations. Surprises belong in housewarmings, not invoices.",
    "why4_h": "Personalized Design", "why4_p": "No catalogue copies. Your home is designed around your rituals, not our templates.",
    "why5_h": "In-house Craftsmen", "why5_p": "The people who design your home build it too. Accountability never changes hands.",
    "why6_h": "On-time Delivery", "why6_p": "25–30 days, tracked step by step against a schedule you can see.",
    "comm_label": "At home in Bengaluru's finest communities",
    "testi_eyebrow": "Kind Words",
    "testi1_text": "They treated our two-bedroom like it was a ten-crore villa. Every hinge, every shade of laminate, someone had already thought about it before we could.", "testi1_name": "Ramesh & Divya", "testi1_place": "Shriram Wytfield",
    "testi2_text": "The kitchen is the room we show off first now. Thirty days, and not one number on the quote moved.", "testi2_name": "Ananya S", "testi2_place": "Prestige City",
    "testi3_text": "I approved every material sitting at my own dining table before they cut a single board. That is when I knew we had chosen right.", "testi3_name": "Karthik M", "testi3_place": "Sobha",
    "contact_eyebrow": "Book a Free Home Visit",
    "contact_h2_html": "Let's walk your home <em class=\"em\">together.</em>",
    "contact_lead": "One visit, no obligation. We'll measure, listen, and leave you with honest advice, whether or not you build with us.",
    "form_name": "Your name", "form_namePh": "e.g. Ananya", "form_phone": "Phone / WhatsApp", "form_phonePh": "+91…", "form_community": "Community / Location", "form_communityPh": "e.g. Shriram Wytfield", "form_scope": "What you need", "form_select": "Select…",
    "form_opt_complete": "Complete Home Interiors", "form_opt_kitchen": "Modular Kitchen", "form_opt_wardrobes": "Wardrobes", "form_opt_pooja": "Pooja Unit", "form_opt_tv": "TV / Crockery Unit", "form_opt_ceiling": "False Ceiling & Lighting", "form_opt_unsure": "Not sure yet",
    "form_submit": "Send on WhatsApp",
    "form_note": "This opens WhatsApp with your details pre-filled, nothing is stored on this site. Prefer to talk? Call us directly below.",
    "contact_founder": "Surendra Dan · Founder, Niviya Interiors · Bengaluru",
    "contact_mediaCap": "On site, most days of the week",
    "footer_tagline": "Designing Timeless Homes.",
    "footer_desc": "Complete home interiors, designed and built in-house, delivered across Bengaluru in 25–30 days.",
    "footer_servicesH": "Services", "footer_svc1": "Complete Home Interiors", "footer_svc2": "Modular Kitchens", "footer_svc3": "Premium Wardrobes", "footer_svc4": "TV & Crockery Units", "footer_svc5": "Pooja Units", "footer_svc6": "False Ceiling & Lighting", "footer_svc7": "Space Planning",
    "footer_communitiesH": "Communities", "footer_contactH": "Contact", "footer_whatsapp": "WhatsApp Us",
    "footer_copyright": "Niviya Interiors · Bengaluru", "footer_madeby": "Designed with care, built by hand",
    "wa_book": "Hi Niviya Interiors! I saw your website and I'd love to book a free home visit for my home. When would be a good time?",
    "wa_chat": "Hi Niviya Interiors! I saw your website and I'm planning my home interiors. Could you help me get started?",
    "wa_form_intro": "Hi Niviya Interiors! I saw your website and I'd like to book a free home visit for my home interiors.",
    "wa_form_details": "My details:", "wa_form_name": "Name", "wa_form_phone": "Phone", "wa_form_community": "Community / Location", "wa_form_looking": "Looking for", "wa_form_closing": "When would be a good time to visit?"
  };

  /* Hindi (Devanagari). Populated by the translation workflow. */
  var HI = window.__NIVIYA_HI__ || {};

  var DICTS = { en: EN, hi: HI };
  var STORAGE = 'niviya_lang';
  var ATTR_KEYS = ['aria-label', 'placeholder', 'alt', 'title'];

  function initialLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'hi') return q;
      var s = localStorage.getItem(STORAGE);
      if (s === 'en' || s === 'hi') return s;
    } catch (e) {}
    return (navigator.language || '').toLowerCase().indexOf('hi') === 0 ? 'hi' : 'en';
  }

  var i18n = {
    lang: 'en',
    dicts: DICTS,
    _cbs: [],
    t: function (key) {
      var d = DICTS[this.lang] || EN;
      var v = d[key];
      if (v === undefined || v === null || v === '') v = EN[key];
      return v === undefined ? key : v;
    },
    onChange: function (cb) { this._cbs.push(cb); },
    setLang: function (l) {
      if (l !== 'en' && l !== 'hi') l = 'en';
      if (l === this.lang) return;
      this.lang = l;
      try { localStorage.setItem(STORAGE, l); } catch (e) {}
      apply();
      this._cbs.forEach(function (cb) { try { cb(l); } catch (e) {} });
    }
  };

  function setMetaDesc(txt) {
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', txt);
  }

  function apply() {
    var lang = i18n.lang, t = function (k) { return i18n.t(k); };
    var root = document.documentElement;
    root.lang = lang;
    root.classList.toggle('lang-hi', lang === 'hi');

    var nodes = document.querySelectorAll('[data-i18n]'), i;
    for (i = 0; i < nodes.length; i++) {
      var el = nodes[i], val = t(el.getAttribute('data-i18n'));
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = val; else el.textContent = val;
    }
    for (var a = 0; a < ATTR_KEYS.length; a++) {
      var attr = ATTR_KEYS[a], list = document.querySelectorAll('[data-i18n-' + attr + ']');
      for (var j = 0; j < list.length; j++) list[j].setAttribute(attr, t(list[j].getAttribute('data-i18n-' + attr)));
    }

    document.title = t('meta_title');
    setMetaDesc(t('meta_desc'));

    // WhatsApp deep-links: data-wa="book" | "chat"
    var base = 'https://wa.me/919845780691?text=', was = document.querySelectorAll('[data-wa]');
    for (i = 0; i < was.length; i++) {
      var key = was[i].getAttribute('data-wa') === 'chat' ? 'wa_chat' : 'wa_book';
      was[i].setAttribute('href', base + encodeURIComponent(t(key)));
    }

    // Reel accessibility labels derived from the (already-translated) captions
    var reels = document.querySelectorAll('.reel');
    for (i = 0; i < reels.length; i++) {
      var ct = reels[i].querySelector('.cap .t'), cp = reels[i].querySelector('.cap .p');
      if (!ct || !cp) continue;
      var label = ct.textContent + ', ' + cp.textContent;
      var poster = reels[i].querySelector('.poster'); if (poster) poster.setAttribute('alt', label);
      var play = reels[i].querySelector('.play'); if (play) play.setAttribute('aria-label', (lang === 'hi' ? 'चलाएँ, ' : 'Play, ') + label);
    }

    // Toggle button visual state
    var tog = document.querySelector('.lang-toggle');
    if (tog) {
      tog.setAttribute('aria-label', lang === 'en' ? 'हिन्दी में देखें / View in Hindi' : 'View in English / अंग्रेज़ी में देखें');
      var e1 = tog.querySelector('[data-l="en"]'), h1 = tog.querySelector('[data-l="hi"]');
      if (e1) e1.classList.toggle('on', lang === 'en');
      if (h1) h1.classList.toggle('on', lang === 'hi');
    }
  }

  i18n.lang = initialLang();
  window.i18n = i18n;

  function boot() {
    var tog = document.querySelector('.lang-toggle');
    if (tog) tog.addEventListener('click', function () { i18n.setLang(i18n.lang === 'en' ? 'hi' : 'en'); });
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
