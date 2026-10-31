/* Mayes Core – core.js – built from: javascript/components/core-sheet.js javascript/components/core-bottom-nav.js javascript/privacy/core-consent.js javascript/utilities/core-business.js javascript/utilities/core-announcement.js javascript/motion/core-motion.js */

/* Mayes Core – Sheet v1.1.0
 * Reusable attribute-driven sheet, dialog, and drawer engine.
 * Supports responsive presentations, focus management, inert background,
 * scroll locking, swipe-to-close, and reduced-motion friendly styling.
 * Public API: window.CoreSheet
 */
(function(){
  if(window.CoreSheet) return;
  var ANIM = 260, host, panel, grab, defHead, defTitle, defBody, current = null, closeTimer = 0, inerted = [];
  var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  var X_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var SKIP = /^data-sheet(-content|-mode|-title|-width|-height|-open)?$/;
  var MQ_APP = window.matchMedia('(max-width: 991px)'), MQ_PHONE = window.matchMedia('(max-width: 767px)');

  function esc(n){ return window.CSS && CSS.escape ? CSS.escape(n) : n; }
  function byName(n){ return document.querySelector('[data-sheet-content="' + esc(n) + '"], [data-sheet="' + esc(n) + '"]:not([data-sheet-host])'); }
  function nameOf(b){ return b.getAttribute('data-sheet-content') || b.getAttribute('data-sheet') || ''; }
  function fire(el, type){ try{ el && el.dispatchEvent(new CustomEvent(type, {bubbles:true})); }catch(e){} }
  function visible(el){ return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length); }
  function xButton(){ return '<button type="button" data-sheet-x aria-label="Close">' + X_SVG + '</button>'; }

  function build(){
    if(host) return;
    host = document.createElement('div');
    host.setAttribute('data-sheet', 'drawer'); host.setAttribute('data-sheet-host', '');
    host.innerHTML = '<div data-sheet-overlay data-sheet-close></div>' +
      '<div data-sheet-panel role="dialog" aria-modal="true" tabindex="-1">' +
        '<div data-sheet-grabber aria-hidden="true"></div>' +
        '<div data-sheet-head data-sheet-default><div data-sheet-title id="sheet-host-title"></div><div data-sheet-close>' + xButton() + '</div></div>' +
        '<div data-sheet-body data-sheet-default></div>' +
      '</div>';
    panel = host.querySelector('[data-sheet-panel]');
    grab = panel.children[0]; defHead = panel.children[1]; defTitle = defHead.querySelector('[data-sheet-title]'); defBody = panel.children[2];
    document.body.appendChild(host);
    panel.addEventListener('pointerdown', dragStart);
  }

  /* which presentation the current mode resolves to at this width */
  function present(){
    if(!host) return 'center';
    var m = host.getAttribute('data-sheet-mode') || 'auto', as;
    if(m === 'auto') as = MQ_APP.matches ? 'bottom' : 'center';
    else if(m === 'drawer') as = MQ_PHONE.matches ? 'bottom' : 'right';
    else as = (m === 'bottom' || m === 'center' || m === 'left' || m === 'right') ? m : 'center';
    host.setAttribute('data-sheet-as', as);
    return as;
  }
  function onResize(){ if(host && host.classList.contains('is-open')) present(); }
  [MQ_APP, MQ_PHONE].forEach(function(q){ if(q.addEventListener) q.addEventListener('change', onResize); else if(q.addListener) q.addListener(onResize); });

  /* everything outside the drawer becomes inert while it is open (screen readers and Tab stay inside) */
  function setInert(on){
    if(on){
      Array.prototype.forEach.call(document.body.children, function(el){
        if(el === host || el.hasAttribute('inert') || /^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(el.tagName)) return;
        el.setAttribute('inert', ''); inerted.push(el);
      });
    } else { inerted.forEach(function(el){ el.removeAttribute('inert'); }); inerted = []; }
  }

  /* move a node into the host and remember where it came from */
  function borrow(node, before){
    var mark = document.createComment('sheet');
    node.parentNode.insertBefore(mark, node);
    panel.insertBefore(node, before || null);
    current.moved.push([node, mark]);
  }
  function part(block, sel){
    var list = block.querySelectorAll(sel);
    for(var i = 0; i < list.length; i++){ if(!list[i].closest('[data-sheet-host]')) return list[i]; }
    return null;
  }

  function mount(block, opts){
    current = { block: block, moved: [], attrs: [], node: opts.node || null, returnFocus: opts.returnFocus || document.activeElement };
    var name = block ? nameOf(block) : (opts.view || 'dynamic');
    host.setAttribute('data-sheet-view', name);
    host.setAttribute('data-sheet-mode', (block && block.getAttribute('data-sheet-mode')) || opts.mode || 'auto');
    var h = (block && block.getAttribute('data-sheet-height')) || opts.height;
    if(h) host.setAttribute('data-sheet-height', h); else host.removeAttribute('data-sheet-height');
    var w = (block && block.getAttribute('data-sheet-width')) || opts.width;
    if(w) host.style.setProperty('--sheet-width', w); else host.style.removeProperty('--sheet-width');
    present();
    if(block){                                       // mirror the block's data-* attributes (CSS/JS hooks)
      Array.prototype.forEach.call(block.attributes, function(a){
        if(a.name.indexOf('data-') === 0 && !SKIP.test(a.name) && !host.hasAttribute(a.name)){ host.setAttribute(a.name, a.value); current.attrs.push(a.name); }
      });
    }
    var head = block && part(block, '[data-sheet-head]'), body = block && part(block, '[data-sheet-body]'), foot = block && part(block, '[data-sheet-footer]');
    var title = (block && block.getAttribute('data-sheet-title')) || opts.title || '';
    defTitle.textContent = title;
    defHead.hidden = false;
    if(head){
      var customTitle = head.querySelector('[data-sheet-title]');
      if(customTitle && !title) defTitle.textContent = (customTitle.textContent || '').trim();
      head.querySelectorAll('[data-sheet-close],[data-sheet-x]').forEach(function(x){ x.hidden = true; });
      borrow(head, defBody);
    }
    defBody.innerHTML = '';
    if(body){ defBody.hidden = true; borrow(body, defBody); }
    else {
      defBody.hidden = false;
      if(block){ Array.prototype.slice.call(block.childNodes).forEach(function(n){ if(n !== foot && !(n.matches && n.matches('[data-sheet-overlay],[data-sheet-panel]'))) { var m = document.createComment('sheet'); block.insertBefore(m, n); defBody.appendChild(n); current.moved.push([n, m]); } }); }
      else if(opts.node){ defBody.appendChild(opts.node); }
      else if(opts.html){ defBody.innerHTML = opts.html; }
    }
    if(foot) borrow(foot, null);
    if(defTitle.textContent){ panel.setAttribute('aria-labelledby', defTitle.id); panel.removeAttribute('aria-label'); }
    else { panel.removeAttribute('aria-labelledby'); panel.setAttribute('aria-label', title || name.replace(/-/g,' ')); }
  }

  function unmount(){
    if(!current) return;
    current.moved.reverse().forEach(function(p){ var n = p[0], m = p[1]; if(m.parentNode){ m.parentNode.insertBefore(n, m); m.parentNode.removeChild(m); } });
    current.attrs.forEach(function(a){ host.removeAttribute(a); });
    host.className = '';                               // drop state classes a feature added (e.g. is-invalid)
    host.removeAttribute('data-sheet-height');
    defHead.hidden = false; defBody.hidden = false; defBody.innerHTML = '';
    current = null;
  }

  function open(target, opts){
    opts = opts || {};
    build();
    var block = typeof target === 'string' ? byName(target) : target;
    if(block && block.closest && block.closest('[data-sheet-host]')) block = current && current.block;   // already inside the host
    if(!block && !opts.html && !opts.node) return null;
    if(current && current.block === block && host.classList.contains('is-open')) return host;
    if(current){ fire(current.block, 'sheet:close'); unmount(); }
    clearTimeout(closeTimer);
    resetDrag();
    mount(block, opts);
    host.classList.add('is-open');
    document.documentElement.classList.add('sheet-lock');
    setInert(true);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ host.classList.add('is-visible'); }); });
    setTimeout(function(){
      var f = panel.querySelector('[data-sheet-autofocus]');
      if(!f){ var b = panel.querySelector('[data-sheet-body]:not([hidden])'); f = b && Array.prototype.find.call(b.querySelectorAll(FOCUSABLE), visible); }
      (f || panel).focus({preventScroll:true});
    }, 60);
    fire(block, 'sheet:open'); fire(host, 'sheet:open');
    return host;
  }
  function show(o){ o = o || {}; return open(null, o); }

  function close(target, opts){
    if(!host || !current || !host.classList.contains('is-open')) return;
    opts = opts || {};
    var block = current.block, r = current.returnFocus;
    resetDrag();                                       // a swiped panel animates on from where the finger left it
    host.classList.remove('is-visible');
    document.documentElement.classList.remove('sheet-lock');
    setInert(false);
    fire(block, 'sheet:close'); fire(host, 'sheet:close');
    var done = function(){ host.classList.remove('is-open'); unmount(); };
    if(opts.instant) done(); else closeTimer = setTimeout(done, ANIM);
    if(!opts.noFocus && r && r.focus && document.contains(r)) r.focus({preventScroll:true});
  }

  /* swipe down to close – bottom-sheet presentation, started on the handle or the head (not on its buttons/links) */
  var drag = null;
  function dragStart(e){
    if(!host.classList.contains('is-visible') || host.getAttribute('data-sheet-as') !== 'bottom') return;
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    var zone = e.target.closest('[data-sheet-grabber], [data-sheet-head]');
    if(!zone || !panel.contains(zone) || e.target.closest('button, a, input, select, textarea, label')) return;
    drag = { id: e.pointerId, y0: e.clientY, t0: e.timeStamp, dy: 0, h: panel.offsetHeight };
    panel.style.transition = 'none';
    try{ panel.setPointerCapture(e.pointerId); }catch(err){}
    panel.addEventListener('pointermove', dragMove);
    panel.addEventListener('pointerup', dragEnd);
    panel.addEventListener('pointercancel', dragEnd);
  }
  function dragMove(e){
    if(!drag || e.pointerId !== drag.id) return;
    drag.dy = Math.max(0, e.clientY - drag.y0);        // only downward
    panel.style.transform = 'translateY(' + drag.dy + 'px)';
  }
  function dragEnd(e){
    if(!drag || e.pointerId !== drag.id) return;
    var d = drag, v = d.dy / Math.max(1, e.timeStamp - d.t0);   // px per ms
    if(d.dy > Math.min(140, d.h * 0.3) || (v > 0.6 && d.dy > 24)) close();
    else resetDrag();
  }
  function resetDrag(){
    if(panel){
      panel.style.transition = ''; panel.style.transform = '';
      panel.removeEventListener('pointermove', dragMove);
      panel.removeEventListener('pointerup', dragEnd);
      panel.removeEventListener('pointercancel', dragEnd);
    }
    drag = null;
  }

  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var t = e.target.closest('[data-sheet-open]');
    if(t){ e.preventDefault(); open(t.getAttribute('data-sheet-open'), {returnFocus:t}); return; }
    var c = e.target.closest('[data-sheet-close]');
    if(c && host && host.contains(c)){ e.preventDefault(); close(); }
  });
  document.addEventListener('keydown', function(e){
    if(!host || !host.classList.contains('is-open')) return;
    if(e.key === 'Escape'){ close(); return; }
    if(e.key === 'Tab'){
      var f = Array.prototype.filter.call(panel.querySelectorAll(FOCUSABLE), visible);
      if(!f.length){ e.preventDefault(); return; }
      var a = f[0], z = f[f.length-1];
      if(e.shiftKey && (document.activeElement === a || !panel.contains(document.activeElement))){ e.preventDefault(); z.focus(); }
      else if(!e.shiftKey && (document.activeElement === z || !panel.contains(document.activeElement))){ e.preventDefault(); a.focus(); }
    }
  });
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();

  window.CoreSheet = {
    version: '1.1.0',
    open: open, show: show, close: close,
    top: function(){ return host && host.classList.contains('is-open') ? host : null; },
    current: function(){ return current ? current.block : null; },
    host: function(){ build(); return host; },
    presentation: function(){ return host ? host.getAttribute('data-sheet-as') : null; }
  };
})();

/* Mayes Core – Bottom Nav v1.1.0 – behavior for Navigation / Bottom Nav + Navigation / Bottom Nav Tab.
   Works with the Sheet engine (window.CoreSheet). Optional GSAP tap feedback when GSAP is loaded.

   Markup contract (built by the Webflow components):
     [data-bottom-nav]                       outer spacer (reserves height so content is never covered)
       nav.bottom-nav_bar
         [data-bottom-nav-tab][data-tab-action="…"]   one per tab (Action prop)
           a[data-bottom-nav-link]                     full-tab hit area (Link prop = no-JS fallback)
           .bottom-nav_badge                           optional, in the Badge slot

   Tab actions (Action prop):
     ""                    normal link (active when the current page matches)
     "sheet:NAME"          opens the sheet [data-sheet="NAME"]
     "click:SELECTOR"      clicks an existing control, e.g. click:[data-booking-open]
   Badges whose text is empty or 0 get .is-empty (hidden); the tab's accessible name includes the count. */
(function(){
  if(window.__coreBottomNav) return; window.__coreBottomNav = true;
  var TAB = '[data-bottom-nav-tab]', LINK = '[data-bottom-nav-link]';
  function sheetApi(){ return window.CoreSheet || null; }
  function motionOk(){ return !!window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  function animateTab(tab){
    if(!tab || !motionOk()) return;
    var icon = tab.querySelector('.bottom-nav_icon');
    if(icon) window.gsap.fromTo(icon, {scale:0.88}, {scale:1, duration:0.22, ease:'power2.out', clearProps:'transform'});
  }
  function norm(p){ p = (p || '/').replace(/\/+$/, ''); return p || '/'; }

  document.addEventListener('click', function(e){
    var link = e.target.closest && e.target.closest(LINK);
    if(!link) return;
    var tab = link.closest(TAB), action = tab && (tab.getAttribute('data-tab-action') || '').trim();
    animateTab(tab);
    if(!action) return;                                   // plain link: let it navigate
    var i = action.indexOf(':'), kind = action.slice(0, i), arg = action.slice(i + 1).trim();
    if(kind === 'sheet' && sheetApi()){
      e.preventDefault(); sheetApi().open(arg, {returnFocus: link});
    } else if(kind === 'click'){
      var target = null; try{ target = document.querySelector(arg); }catch(err){}
      if(target){ e.preventDefault(); target.click(); }     // missing target: fall back to the link
    }
  });

  function markActive(){
    var here = norm(location.pathname);
    document.querySelectorAll(TAB).forEach(function(tab){
      var link = tab.querySelector(LINK), action = (tab.getAttribute('data-tab-action') || '').trim(), on = false;
      if(link && !action){
        var a = document.createElement('a'); a.href = link.getAttribute('href') || '/';
        if(a.origin === location.origin){ var p = norm(a.pathname); on = p === '/' ? here === '/' : (here === p || here.indexOf(p + '/') === 0); }
      }
      tab.classList.toggle('is-active', on);
      if(link){ if(on) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current'); }
      if(link && action.indexOf('sheet:') === 0) link.setAttribute('aria-haspopup', 'dialog');
    });
  }

  function syncBadges(){
    document.querySelectorAll(TAB).forEach(function(tab){
      var b = tab.querySelector('.bottom-nav_badge'), link = tab.querySelector(LINK);
      if(!b || !link) return;
      var n = (b.textContent || '').trim(), empty = n === '' || n === '0';
      if(b.classList.contains('is-empty') !== empty) b.classList.toggle('is-empty', empty);
      var base = link.getAttribute('data-label') || link.getAttribute('aria-label') || '';
      if(!link.hasAttribute('data-label')) link.setAttribute('data-label', base);
      var name = empty ? base : base + ', ' + n + (n === '1' ? ' item' : ' items');
      if(link.getAttribute('aria-label') !== name) link.setAttribute('aria-label', name);
    });
  }

  function init(){
    markActive(); syncBadges();
    var t = 0, mo = new MutationObserver(function(){ clearTimeout(t); t = setTimeout(syncBadges, 30); });
    document.querySelectorAll('[data-bottom-nav] .bottom-nav_badge').forEach(function(b){
      mo.observe(b, {childList:true, characterData:true, subtree:true});
    });
    document.documentElement.classList.toggle('has-bottom-nav', !!document.querySelector('[data-bottom-nav]'));
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* Mayes Core – Consent v1.1.0 – cookie consent + the Site Settings sheet.
   Uses the Sheet engine (window.CoreSheet). Pairs with the head snippet (Consent Mode v2 defaults),
   which must run BEFORE the Google tag. Categories: essential (always on), analytics, marketing.

   Markup (Webflow component "Core / Site Settings", placed in the Page Shell Overlay slot):
     [data-sheet="site-settings"]  the settings sheet (cog opens it). Sections: [data-settings-section] (privacy now, appearance later)
       [data-consent-switch="analytics|marketing|essential"]   role="switch" buttons
     [data-sheet="cookie-notice"]  first-visit notice
     [data-consent-action="accept-all|necessary|save|customize"]
   Opening: any [data-sheet-open="site-settings"] (the brand-bar cog) or CoreConsent.open().
   Deferred third-party scripts: <script type="text/plain" data-consent="analytics|marketing" src|inline> run once consent is given.
   Events: "core:consent" on document (detail = {analytics, marketing}). */
(function(){
  if(window.CoreConsent) return;
  var KEY = document.documentElement.getAttribute('data-consent-key') || 'core-consent-v1', CATS = ['analytics','marketing'];
  function sheet(){ return window.CoreSheet || null; }
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY)) || null; }catch(e){ return null; } }
  function write(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
  function g(v){ return v ? 'granted' : 'denied'; }

  function apply(s){
    if(typeof window.gtag === 'function'){
      window.gtag('consent', 'update', { analytics_storage: g(s.analytics), ad_storage: g(s.marketing), ad_user_data: g(s.marketing), ad_personalization: g(s.marketing) });
    }
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function(old){
      if(!s[old.getAttribute('data-consent')] || old.hasAttribute('data-consent-ran')) return;
      old.setAttribute('data-consent-ran', '');
      var n = document.createElement('script');
      Array.prototype.forEach.call(old.attributes, function(a){ if(a.name !== 'type' && a.name.indexOf('data-consent') !== 0) n.setAttribute(a.name, a.value); });
      if(!old.src) n.text = old.text;
      old.parentNode.insertBefore(n, old.nextSibling);
    });
    try{ document.dispatchEvent(new CustomEvent('core:consent', {detail: {analytics: !!s.analytics, marketing: !!s.marketing}})); }catch(e){}
  }

  function sync(s){
    s = s || read() || {};
    document.querySelectorAll('[data-consent-switch]').forEach(function(sw){
      var c = sw.getAttribute('data-consent-switch'), on = c === 'essential' ? true : !!s[c];
      sw.setAttribute('role', 'switch'); if(sw.tagName === 'BUTTON') sw.type = 'button'; else if(!sw.hasAttribute('tabindex')) sw.setAttribute('tabindex', '0');
      sw.setAttribute('aria-checked', on ? 'true' : 'false');
      if(c === 'essential') sw.setAttribute('aria-disabled', 'true');
    });
  }
  function fromSwitches(){
    var s = {};
    CATS.forEach(function(c){ var sw = document.querySelector('[data-consent-switch="' + c + '"]'); s[c] = !!sw && sw.getAttribute('aria-checked') === 'true'; });
    return s;
  }
  function set(s){
    s = { analytics: !!s.analytics, marketing: !!s.marketing, v: 1, ts: new Date().toISOString() };
    write(s); sync(s); apply(s);
    if(sheet()) sheet().close();
    return s;
  }
  function open(){ sync(); if(sheet()) sheet().open('site-settings'); }

  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var sw = e.target.closest('[data-consent-switch]');
    if(sw){
      e.preventDefault();
      if(sw.getAttribute('aria-disabled') === 'true') return;
      sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      return;
    }
    var b = e.target.closest('[data-consent-action]');
    if(!b) return;
    e.preventDefault();
    var a = b.getAttribute('data-consent-action');
    if(a === 'accept-all') set({analytics: true, marketing: true});
    else if(a === 'necessary') set({analytics: false, marketing: false});
    else if(a === 'save') set(fromSwitches());
    else if(a === 'customize'){ if(sheet()) sheet().close(null, {instant: true, noFocus: true}); setTimeout(open, 30); }
  });
  document.addEventListener('sheet:open', function(){ sync(); });
  /* Webflow renders these as div/link elements: make them real controls for keyboard and screen readers */
  function prepActions(){
    document.querySelectorAll('[data-consent-action]').forEach(function(b){
      if(b.tagName === 'BUTTON'){ b.type = 'button'; return; }
      b.setAttribute('role', 'button'); if(!b.hasAttribute('tabindex')) b.setAttribute('tabindex', '0'); b.removeAttribute('href');
    });
  }
  document.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-consent-switch]:not(button),[data-consent-action]:not(button)')){ e.preventDefault(); e.target.click(); }
  });

  function init(){
    var s = read();
    prepActions(); sync(s);
    if(s) apply(s);
    else if(document.querySelector('[data-sheet="cookie-notice"]')){
      setTimeout(function(){ if(!read() && sheet() && !sheet().top()) sheet().open('cookie-notice'); }, 1200);
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreConsent = { version: '1.1.0', key: KEY, get: read, set: set, open: open };
})();

/* Mayes Core – Business v1.0.0 – one business record, shown anywhere on the page.
 *
 * SOURCE – the hidden CMS layer in the Page Shell (the one Business Settings item, rendered on every page):
 *   <a data-business-field="phone">…</a>      any Business Settings field, as a native Webflow element bound in the Designer:
 *                                            Image → its src · Link → its href · anything else → its text.
 *   Empty bindings (.w-dyn-bind-empty, .w-condition-invisible) count as empty.
 *   Also read for older Page Shells: [data-store-field="slug"] and [data-store-settings] [data-store-<field>].
 *   Computed: "address" (street, address-2, "city state zip", country), "phone-href", "email-href",
 *             "directions-url" (falls back to a Google Maps search of the address).
 *
 * TARGETS – put data-business="field" on any element, in any component:
 *   <img data-business="logo">         src (+ alt from business-name when the image has none)
 *   <a data-business="facebook-url">   href (fields ending in -url)
 *   <a data-business="phone">          text + tel:      ·  <a data-business="email"> text + mailto:
 *   <p data-business="tagline">        text
 *   data-business-href="field"         also set the element's href from another field
 *   data-business-empty="hide"         hide the element when the field is empty (default: keep the static fallback)
 *   Older markup with data-store / data-store-href / data-store-empty works the same way.
 *   Filled elements get .is-business-filled; <html> gets .business-filled.
 *
 * HOURS – the Business Hours collection list (7 items), rendered once in the Page Shell:
 *   [data-business-hours-entry]  with children (or attributes) data-business-hours-day / -order / -open / -close /
 *                                -closed (text "true", shown by conditional visibility when Closed is set)
 *   Targets:
 *     [data-business-hours]  filled with one row per run of days that share a schedule:
 *                            <div data-business-hours-line><span>Monday – Friday</span><span>8 AM–5 PM</span></div>
 *     [data-business-today]  text: "Open today, 8 AM–5 PM" / "Closed today" (empty when no hours are set)
 *
 * Public API: window.CoreBusiness = { get(field), all(), hours(), groupedHours(), fill() }
 */
(function(){
  if(window.CoreBusiness) return;
  var cache = null;
  var DAYS = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

  function clean(t){ return (t || '').replace(/\s+/g, ' ').trim(); }
  function isEmptyBind(el){ return el.classList.contains('w-dyn-bind-empty') || el.classList.contains('w-condition-invisible'); }
  function valueOf(el){
    if(isEmptyBind(el)) return '';
    var v = el.tagName === 'IMG' ? (el.getAttribute('src') || '') : el.tagName === 'A' ? (el.getAttribute('href') || '') : clean(el.textContent);
    return (v === '#' || /placeholder\.(svg|png)/i.test(v)) ? '' : v;
  }

  function read(){
    var data = {};
    var legacy = document.querySelector('[data-store-settings]');
    if(legacy){
      Array.prototype.forEach.call(legacy.querySelectorAll('*'), function(el){
        Array.prototype.forEach.call(el.attributes, function(a){
          if(a.name.indexOf('data-store-') !== 0 || a.name === 'data-store-hours' || a.name === 'data-store-field') return;
          var key = a.name.slice(11), v = clean(a.value) || clean(el.textContent);
          if(v && !data[key]) data[key] = v;
        });
      });
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-store-field],[data-business-field]'), function(el){
      var key = el.getAttribute('data-business-field') || el.getAttribute('data-store-field');
      var v = key ? valueOf(el) : '';
      if(v) data[key] = v;
    });
    var cityLine = [data.city, data.state, data['zip-code'] || data.zip].filter(Boolean).join(' ');
    var address = [data['street-address'] || data.street, data['address-line-2'] || data['address-2'], cityLine, data.country].filter(Boolean).join(', ');
    if(address && !data.address) data.address = address;
    var phone = data.phone || data['customer-service-phone'] || data['customer-phone'];
    var email = data.email || data['customer-service-email'] || data['customer-email'];
    if(phone){ data.phone = phone; data['phone-href'] = 'tel:' + phone.replace(/[^\d+]/g, ''); }
    if(email){ data.email = email; data['email-href'] = 'mailto:' + email; }
    if(!data['directions-url'] && data.address) data['directions-url'] = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(data.address);
    return data;
  }
  function get(key){ if(!cache) cache = read(); return cache[key] || ''; }

  /* ---------- hours ---------- */
  function hours(){
    var rank = {monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6,sunday:7};
    return Array.prototype.map.call(document.querySelectorAll('[data-business-hours-entry]'), function(node){
      function r(name){
        var attr = clean(node.getAttribute(name));
        if(attr) return attr;
        var child = node.querySelector('[' + name + ']:not(.w-condition-invisible)');
        return child ? clean(child.textContent) : '';
      }
      var day = r('data-business-hours-day');
      return {
        day: day,
        order: Number(r('data-business-hours-order')) || rank[day.toLowerCase()] || 99,
        open: r('data-business-hours-open'),
        close: r('data-business-hours-close'),
        closed: /^(true|1|yes|on)$/i.test(r('data-business-hours-closed'))
      };
    }).filter(function(e){ return e.day; }).sort(function(a, b){ return a.order - b.order; });
  }
  function schedule(e){ return e.closed ? 'Closed' : [e.open, e.close].filter(Boolean).join('–'); }
  function groupedHours(list){
    return (list || hours()).reduce(function(groups, e){
      var s = schedule(e); if(!s) return groups;
      var prev = groups[groups.length - 1];
      if(prev && prev.schedule === s) prev.end = e.day; else groups.push({start: e.day, end: e.day, schedule: s});
      return groups;
    }, []);
  }
  function renderHours(list){
    var groups = groupedHours(list);
    Array.prototype.forEach.call(document.querySelectorAll('[data-business-hours]'), function(target){
      if(!groups.length){ if(target.getAttribute('data-business-empty') === 'hide') target.hidden = true; return; }
      target.textContent = '';
      groups.forEach(function(g){
        var line = document.createElement('div'), days = document.createElement('span'), time = document.createElement('span');
        line.setAttribute('data-business-hours-line', '');
        days.textContent = g.start === g.end ? g.start : g.start + ' – ' + g.end;
        time.textContent = g.schedule;
        line.appendChild(days); line.appendChild(time); target.appendChild(line);
      });
      target.hidden = false;
    });
    var today = DAYS[new Date().getDay()], entry = (list || []).filter(function(e){ return e.day.toLowerCase() === today; })[0];
    var text = !entry ? '' : entry.closed ? 'Closed today' : schedule(entry) ? 'Open today, ' + schedule(entry) : '';
    Array.prototype.forEach.call(document.querySelectorAll('[data-business-today]'), function(el){
      el.textContent = text;
      if(!text && el.getAttribute('data-business-empty') === 'hide') el.hidden = true;
    });
  }

  /* ---------- fill ---------- */
  function attr(el, name){ return el.getAttribute('data-business' + name) || el.getAttribute('data-store' + name); }
  function fill(){
    cache = read();
    Array.prototype.forEach.call(document.querySelectorAll('[data-business],[data-business-href],[data-store],[data-store-href]'), function(el){
      if(el.closest('[data-store-settings]') || el.hasAttribute('data-store-field') || el.hasAttribute('data-business-field')) return;
      var key = attr(el, ''), v = key ? get(key) : '';
      var hrefKey = attr(el, '-href'), href = hrefKey ? get(hrefKey) : '';
      if(key){
        if(!v){
          if(attr(el, '-empty') === 'hide') el.hidden = true;
        } else if(el.tagName === 'IMG'){
          if(el.getAttribute('src') !== v){ el.removeAttribute('srcset'); el.removeAttribute('sizes'); el.setAttribute('src', v); }
          if(!el.getAttribute('alt')) el.setAttribute('alt', get('business-name'));
          el.hidden = false; el.classList.add('is-business-filled');
        } else if(el.tagName === 'A' && /-url$/.test(key)){
          el.setAttribute('href', v); el.hidden = false; el.classList.add('is-business-filled');
        } else {
          if(el.textContent !== v) el.textContent = v;
          if(el.tagName === 'A' && /email$/.test(key)) el.setAttribute('href', get('email-href'));
          if(el.tagName === 'A' && /phone$/.test(key)) el.setAttribute('href', get('phone-href'));
          el.hidden = false; el.classList.add('is-business-filled');
        }
      }
      if(href) el.setAttribute('href', href);
    });
    renderHours(hours());
    document.documentElement.classList.add('business-filled');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
  window.addEventListener('load', fill);

  window.CoreBusiness = {
    version: '1.0.0', get: get, fill: fill, hours: hours, groupedHours: groupedHours,
    all: function(){ cache = read(); return Object.assign({}, cache); }
  };
})();

/* Mayes Core – Announcement bar v1.0.0 – keeps a fixed header stacked under an announcement bar.
 *
 * Markup: the bar carries [data-announcement] (its CMS list wrapper is measured when it has one).
 * Sets --core-announcement-offset on <html> = how much of the bar is still on screen (bar height − scroll, never below 0).
 * css/core-announcement.css applies it as `top` on [data-announcement-follow] and .navbar-compact, so a fixed header
 * sits right under the bar, scrolls up with it, then pins at top:0. No bar = offset 0, nothing changes.
 * Public API: window.CoreAnnouncement = { refresh() }
 */
(function(){
  if(window.CoreAnnouncement) return;
  var root = document.documentElement, bar = null, height = 0, last = -1, ticking = false;

  function find(){
    var el = document.querySelector('[data-announcement]');
    return el ? (el.closest('.w-dyn-list') || el) : null;
  }
  function apply(){
    ticking = false;
    var off = Math.max(0, Math.round(height - Math.max(0, window.scrollY || 0)));
    if(off === last) return;
    last = off;
    root.style.setProperty('--core-announcement-offset', off + 'px');
  }
  function measure(){
    if(!bar || !bar.isConnected) bar = find();
    height = bar ? Math.max(0, bar.getBoundingClientRect().height) : 0;
    apply();
  }
  function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(apply); } }
  function init(){
    measure();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', measure, {passive: true});
    window.addEventListener('load', measure);
    if(bar && window.ResizeObserver) new ResizeObserver(measure).observe(bar);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreAnnouncement = { version: '1.0.0', refresh: measure };
})();

/* Mayes Core – Motion v0.4.0 – attribute-driven motion and scroll state.
 *
 * Scroll state (no GSAP needed):
 *   data-scroll-state                  toggles a class once the page scrolls past a threshold
 *   data-scroll-threshold="64"         px (default 64)
 *   data-scroll-class="is-scrolled"    class to toggle (default is-scrolled)
 *   data-scroll-duration="500"         ms, written to transition-duration
 *
 * Motion vocabulary (Core 2.0 Implementation Addendum §5; needs GSAP, ScrollTrigger for scroll reveals):
 *   data-motion="fade"     fades in when scrolled into view
 *   data-motion="rise"     fades in and rises (alias: "reveal")
 *   data-motion="scale"    fades in from 96%
 *   data-motion="stagger"  reveals [data-motion-item] children (or direct children) one after another
 *   data-motion="hero"     like stagger, but plays on page load (no scroll trigger)
 *   data-motion-delay="0.1"  seconds · data-motion-duration="0.6" seconds
 *
 * Older vocabulary, still supported:
 *   data-animate="fade|fade-up|fade-down|fade-left|fade-right|scale"  with data-duration / data-delay
 *   data-scroll="parallax"  with data-speed="-10"  (needs ScrollTrigger)
 *
 * Content is never hidden by CSS: without GSAP, or when the visitor prefers reduced motion,
 * everything simply stays visible and nothing moves.
 */
(function(){
  if(window.CoreMotion) return;

  function num(v, d){ var n = parseFloat(v); return isNaN(n) ? d : n; }

  function scrollStates(){
    document.querySelectorAll('[data-scroll-state]').forEach(function(el){
      var y = num(el.getAttribute('data-scroll-threshold'), 64);
      var cls = el.getAttribute('data-scroll-class') || 'is-scrolled';
      el.style.transitionDuration = num(el.getAttribute('data-scroll-duration'), 500) + 'ms';
      var state;
      function update(){ var on = window.scrollY > y; if(on !== state){ state = on; el.classList.toggle(cls, on); } }
      window.addEventListener('scroll', update, {passive: true});
      update();
    });
  }

  function items(group){
    var marked = group.querySelectorAll('[data-motion-item]');
    return marked.length ? Array.prototype.slice.call(marked) : Array.prototype.slice.call(group.children);
  }

  function motion(gsap, ST){
    var FROM = {
      fade:  {autoAlpha: 0},
      rise:  {autoAlpha: 0, y: 24},
      reveal:{autoAlpha: 0, y: 24},
      scale: {autoAlpha: 0, scale: 0.96}
    };
    var CLEAR = 'opacity,visibility,transform';
    document.querySelectorAll('[data-motion]').forEach(function(el){
      var kind = el.getAttribute('data-motion');
      var delay = num(el.getAttribute('data-motion-delay'), 0);
      if(kind === 'hero' || kind === 'stagger'){
        var list = items(el); if(!list.length) return;
        var vars = {autoAlpha: 1, y: 0, duration: num(el.getAttribute('data-motion-duration'), kind === 'hero' ? 0.85 : 0.65),
                    delay: delay, stagger: kind === 'hero' ? 0.12 : 0.1, ease: 'power2.out', clearProps: CLEAR};
        if(kind === 'stagger'){ if(!ST) return; vars.scrollTrigger = {trigger: el, start: 'top 88%', once: true}; }
        gsap.fromTo(list, {autoAlpha: 0, y: kind === 'hero' ? 28 : 20}, vars);
        return;
      }
      var from = FROM[kind]; if(!from || !ST) return;
      gsap.fromTo(el, from, {autoAlpha: 1, y: 0, scale: 1, duration: num(el.getAttribute('data-motion-duration'), 0.7),
        delay: delay, ease: 'power2.out', clearProps: CLEAR, scrollTrigger: {trigger: el, start: 'top 88%', once: true}});
    });
  }

  function legacy(gsap, ST){
    document.querySelectorAll('[data-animate]').forEach(function(el){
      var a = el.getAttribute('data-animate');
      var o = {opacity: 0, duration: num(el.getAttribute('data-duration'), 0.8), delay: num(el.getAttribute('data-delay'), 0), ease: 'power2.out'};
      if(a === 'fade-up') o.y = 32;
      if(a === 'fade-down') o.y = -32;
      if(a === 'fade-left') o.x = 32;
      if(a === 'fade-right') o.x = -32;
      if(a === 'scale') o.scale = 0.96;
      if(ST) o.scrollTrigger = {trigger: el, start: 'top 85%', once: true};
      gsap.from(el, o);
    });
    if(ST) document.querySelectorAll('[data-scroll="parallax"]').forEach(function(el){
      gsap.to(el, {yPercent: num(el.getAttribute('data-speed'), -10), ease: 'none',
        scrollTrigger: {trigger: el, start: 'top bottom', end: 'bottom top', scrub: true}});
    });
  }

  function init(){
    scrollStates();
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if(!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(ST) gsap.registerPlugin(ST);
    motion(gsap, ST);
    legacy(gsap, ST);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreMotion = { version: '0.4.0' };
})();
