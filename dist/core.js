/* Mayes Core – core.js – built from: javascript/components/core-sheet.js javascript/privacy/core-consent.js javascript/utilities/core-business.js javascript/utilities/core-announcement.js javascript/components/core-install.js */

/* Mayes Core – Sheet v3.0.0
 * Sheets are native Webflow Modals (<dialog>), designed in Webflow as bottom sheets. Webflow and the browser do the work:
 * show/hide links (link mode "modal"), focus moved in, trapped and returned, Escape, the inert page, the top layer.
 * core-base.css adds the slide-up motion, the dimmed ::backdrop and the scroll lock (the style panel can't express them).
 *
 * This file adds only what Webflow can't do:
 *   OPEN BY NAME  [data-sheet-open="name"] opens the Modal with data-sheet="name" from anywhere on the page. A Webflow
 *                 modal link can only target a Modal in the same component, so the bottom nav, the top nav's ⋯ button,
 *                 the footer and the Button component's "Opens Sheet" prop use the name. An empty data-sheet-open="" is
 *                 ignored, so the link just goes to its href. CoreSheet.open(name) does the same from JS.
 *   SWIPE DOWN    drag down on [data-sheet-grabber] or [data-sheet-head] (not on their buttons or links) to close.
 *   TAP OUTSIDE   closes the sheet in browsers without closedby="any" (Safari). Opt out with closedby="none".
 *   CLOSE         [data-sheet-close] closes the sheet it is in (Webflow's modal › hide link does the same natively).
 *   EVENTS        "sheet:open" / "sheet:close" on the Modal (they bubble), for consent and install.
 *
 * Markup (Webflow component, root = Modal):
 *   <dialog class="sheet" data-sheet="quote" closedby="any">
 *     <div class="sheet_panel">
 *       <div class="sheet_grabber" data-sheet-grabber>…</div>
 *       <div class="sheet_head" data-sheet-head>title, close (modal › hide)</div>
 *       <div class="sheet_body">…</div>  footer (button-group)
 *     </div>
 *   </dialog>
 *
 * Public API: window.CoreSheet — open(name|el), close([name|el], {instant}), current(), top(), get(name)
 */
(function(){
  if(window.CoreSheet) return;
  var MQ_REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');

  function esc(n){ return window.CSS && CSS.escape ? CSS.escape(n) : n; }
  function fire(el, type){ try{ el.dispatchEvent(new CustomEvent(type, {bubbles: true})); }catch(e){} }
  function get(n){
    if(!n) return null;
    if(typeof n !== 'string') return n.tagName === 'DIALOG' ? n : (n.closest && n.closest('dialog'));
    var el = document.querySelector('[data-sheet="' + esc(n) + '"]');
    if(!el) return null;
    return el.tagName === 'DIALOG' ? el : (el.querySelector('dialog') || el.closest('dialog'));
  }
  function isOpen(d){ return !!(d && d.open); }
  function current(){
    var all = document.querySelectorAll('dialog[data-sheet]'), top = null;
    for(var i = 0; i < all.length; i++){ if(all[i].open) top = all[i]; }
    return top;
  }

  /* every Modal that opens fires sheet:open, however it was opened (Core, a Webflow link, or the browser) */
  var seen = typeof WeakSet === 'function' ? new WeakSet() : null;
  function watch(d){
    if(!d || (seen && seen.has(d)) || d.__coreSheet) return;
    if(seen) seen.add(d); else d.__coreSheet = true;
    d.addEventListener('close', function(){ resetDrag(d); fire(d, 'sheet:close'); });
    new MutationObserver(function(){ if(d.open && !d.__wasOpen){ d.__wasOpen = true; fire(d, 'sheet:open'); } else if(!d.open) d.__wasOpen = false; })
      .observe(d, {attributes: true, attributeFilter: ['open']});
  }
  function watchAll(){ Array.prototype.forEach.call(document.querySelectorAll('dialog[data-sheet]'), watch); }

  function open(n, opts){
    var d = get(n);
    if(!d || typeof d.showModal !== 'function') return null;
    watch(d);
    var cur = current();
    if(cur && cur !== d) close(cur, {instant: true});
    if(!d.open){
      d.__wasOpen = true;
      d.showModal();
      fire(d, 'sheet:open');
    }
    return d;
  }
  function close(n, opts){
    var d = n ? get(n) : current();
    if(!isOpen(d)) return;
    opts = opts || {};
    if(opts.instant || MQ_REDUCE.matches){ d.setAttribute('data-sheet-instant', ''); d.close(); setTimeout(function(){ d.removeAttribute('data-sheet-instant'); }, 30); return; }
    d.close();
  }

  /* swipe down to close (started on the grabber or the head, not on their buttons or links) */
  var drag = null;
  function resetDrag(d){
    if(drag && drag.d === d) drag = null;
  }
  document.addEventListener('pointerdown', function(e){
    if(!e.target.closest || (e.pointerType === 'mouse' && e.button !== 0)) return;
    var zone = e.target.closest('[data-sheet-grabber], [data-sheet-head]');
    var d = zone && zone.closest('dialog[data-sheet]');
    if(!d || !d.open || e.target.closest('button, a, input, select, textarea, label')) return;
    drag = { d: d, id: e.pointerId, y0: e.clientY, t0: e.timeStamp, dy: 0, h: d.offsetHeight };
    d.style.transition = 'none';
    try{ zone.setPointerCapture(e.pointerId); }catch(err){}
  });
  document.addEventListener('pointermove', function(e){
    if(!drag || e.pointerId !== drag.id) return;
    drag.dy = Math.max(0, e.clientY - drag.y0);        // downward only
    drag.d.style.transform = 'translateY(' + drag.dy + 'px)';
  });
  function dragEnd(e){
    if(!drag || e.pointerId !== drag.id) return;
    var g = drag, v = g.dy / Math.max(1, e.timeStamp - g.t0);   // px per ms
    drag = null;
    if(g.dy > Math.min(140, g.h * 0.3) || (v > 0.6 && g.dy > 24)){
      // carry on from where the finger left it: the stylesheet's closed transform finishes the slide
      g.d.style.transition = ''; g.d.style.transform = '';
      g.d.close();
    } else {
      g.d.style.transition = MQ_REDUCE.matches ? 'none' : 'transform 200ms cubic-bezier(.2,.8,.2,1)';
      g.d.style.transform = '';
      setTimeout(function(){ g.d.style.transition = ''; }, 220);
    }
  }
  document.addEventListener('pointerup', dragEnd);
  document.addEventListener('pointercancel', dragEnd);

  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var t = e.target.closest('[data-sheet-open]:not([data-sheet-open=""])');
    if(t){ if(get(t.getAttribute('data-sheet-open'))){ e.preventDefault(); open(t.getAttribute('data-sheet-open')); } return; }
    var c = e.target.closest('[data-sheet-close]');
    if(c){ var d = c.closest('dialog'); if(d && d.open){ e.preventDefault(); close(d); } return; }
    /* tap on the backdrop: a click whose target is the dialog itself, outside its box (closedby="any" fallback) */
    var dlg = e.target;
    if(dlg.tagName === 'DIALOG' && dlg.open && dlg.hasAttribute('data-sheet') && dlg.getAttribute('closedby') !== 'none'){
      var r = dlg.getBoundingClientRect();
      if(e.clientY < r.top || e.clientY > r.bottom || e.clientX < r.left || e.clientX > r.right) close(dlg);
    }
  });

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watchAll); else watchAll();

  window.CoreSheet = {
    version: '3.0.0',
    open: open, close: close, get: get,
    current: current,
    top: current
  };
})();

/* Mayes Core – Consent v2.0.2 – cookie consent + the Site Settings sheet.
   Uses the Sheet engine (window.CoreSheet). Pairs with the head snippet (Consent Mode v2 defaults),
   which must run BEFORE the Google tag. Categories: essential (always on), analytics, marketing.

   Markup (Webflow component "Sheet / Site Settings", built into the Page Shell in shell-sheets):
     [data-sheet="site-settings"]  the settings sheet (cog opens it). Sections: [data-settings-section] (privacy now, appearance later)
       [data-consent-switch="analytics|marketing|essential"]   role="switch" buttons
     [data-sheet="cookie-notice"]  first-visit notice
     [data-consent-action="accept-all|necessary|save|customize"]   an empty value is ignored, so a Webflow button component can
                                    bind it to a prop and leave it blank on ordinary buttons
   Opening: any [data-sheet-open="site-settings"] (the brand-bar cog) or CoreConsent.open().
   Deferred third-party scripts: <script type="text/plain" data-consent="analytics|marketing" src|inline> run once consent is given.
   Events: "core:consent" on document (detail = {analytics, marketing}).
   NATIVE: Core ships no consent CSS. Style the switches, rows and buttons with Webflow classes; switches get .is-on
   when on and .is-disabled when locked (essential), so on/off and locked are Webflow combo classes. */
(function(){
  if(window.CoreConsent) return;
  var ACTION = '[data-consent-action]:not([data-consent-action=""])';
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
      sw.classList.toggle('is-on', on);
      if(c === 'essential'){ sw.setAttribute('aria-disabled', 'true'); sw.classList.add('is-disabled'); }
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
      var nowOn = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', nowOn ? 'true' : 'false'); sw.classList.toggle('is-on', nowOn);
      return;
    }
    var b = e.target.closest(ACTION);
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
    document.querySelectorAll(ACTION).forEach(function(b){
      if(b.tagName === 'BUTTON'){ b.type = 'button'; return; }
      b.setAttribute('role', 'button'); if(!b.hasAttribute('tabindex')) b.setAttribute('tabindex', '0'); b.removeAttribute('href');
    });
  }
  document.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-consent-switch]:not(button),' + ACTION + ':not(button)')){ e.preventDefault(); e.target.click(); }
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

  window.CoreConsent = { version: '2.0.0', key: KEY, get: read, set: set, open: open };
})();

/* Mayes Core – Business v2.0.1 – one business record, shown anywhere on the page.
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
 *   <img data-business="logo">         src; alt = business-name whenever the image has none (even with no logo set)
 *   <a data-business="facebook-url">   href (fields ending in -url)
 *   <a data-business="phone">          text + tel:      ·  <a data-business="email"> text + mailto:
 *   <p data-business="tagline">        text
 *   data-business-href="field"         also set the element's href from another field
 *   data-business-empty="hide"         hide the element when the field is empty (default: keep the static fallback);
 *                                      with data-business-href alone (an icon link), hide it when that field is empty
 *   NATIVE FIRST for icon links: hide the link's Webflow class by default and show it with an is-business-filled combo;
 *   Core adds .is-business-filled only when the field has a URL (no flash of empty icons, no Visibility setting needed).
 *   Older markup with data-store / data-store-href / data-store-empty works the same way.
 *   Filled elements get .is-business-filled; <html> gets .business-filled.
 *
 * HOURS – the Business Hours collection list (7 items), rendered once in the Page Shell:
 *   [data-business-hours-entry]  with children (or attributes) data-business-hours-day / -order / -open / -close /
 *                                -closed (text "true", shown by conditional visibility when Closed is set)
 *   Targets:
 *     [data-business-hours]  filled with one row per run of days that share a schedule.
 *                            NATIVE FIRST: design one row in Webflow inside it ([data-business-hours-line], placeholder
 *                            text is fine) and Core clones that row for every line, keeping its Webflow classes. The days
 *                            go in [data-business-hours-days] (else the row's first child), the time in
 *                            [data-business-hours-time] (else its last child). Without a designed row Core writes
 *                            <div data-business-hours-line data-core-look><span>Monday – Friday</span><span>8 AM–5 PM</span></div>
 *                            (unstyled: Core ships no CSS; style [data-business-hours] and the row with Webflow classes)
 *     [data-business-today]  text: "Open today, 8 AM–5 PM" / "Closed today" (empty when no hours are set)
 *
 * SCHEMA – Core writes the page's structured data from the same record, so it always matches what the site shows:
 *   <script type="application/ld+json" id="core-schema"> in <head>, one @graph with
 *     LocalBusiness (#business): name, legalName, description, url, telephone, email, logo/image, address,
 *                  areaServed, openingHoursSpecification (from Business Hours), hasMap, sameAs (only filled
 *                  social and Google Business links)
 *     WebSite (#website) and WebPage (this URL, name from the H1 or title, description from the meta description)
 *   The business type defaults to LocalBusiness. Set a more specific schema.org type (Plumber, HairSalon,
 *   HVACBusiness, AutoRepair, …) with <meta name="core-schema-type" content="Plumber"> in the site head, or bind a
 *   data-business-field="schema-type" in the data layer. Turn it off with <meta name="core-schema" content="off">.
 *   Leave Webflow's page-level JSON-LD empty on Core sites, or the business is described twice.
 *
 * Public API: window.CoreBusiness = { get(field), all(), hours(), groupedHours(), fill(), schema() }
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
      if(target.__coreRow === undefined){              // the designed row, captured once before the first fill
        var row = target.querySelector('[data-business-hours-line]:not([data-core-look])');
        target.__coreRow = row ? row.cloneNode(true) : null;
      }
      target.textContent = '';
      groups.forEach(function(g){
        var label = g.start === g.end ? g.start : g.start + ' – ' + g.end, line, days, time;
        if(target.__coreRow){
          line = target.__coreRow.cloneNode(true);
          var kids = line.children;
          days = line.querySelector('[data-business-hours-days]') || kids[0];
          time = line.querySelector('[data-business-hours-time]') || kids[kids.length - 1];
          if(days) days.textContent = label;
          if(time && time !== days) time.textContent = g.schedule;
        } else {
          line = document.createElement('div'); days = document.createElement('span'); time = document.createElement('span');
          line.setAttribute('data-business-hours-line', ''); line.setAttribute('data-core-look', '');
          days.textContent = label; time.textContent = g.schedule;
          line.appendChild(days); line.appendChild(time);
        }
        target.appendChild(line);
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


  /* ---------- schema ---------- */
  function meta(name){ var m = document.querySelector('meta[name="' + name + '"]'); return m ? clean(m.getAttribute('content')) : ''; }
  function abs(u){ try { return u ? new URL(u, location.href).href : ''; } catch(e){ return ''; } }
  function e164(phone){
    var d = (phone || '').replace(/[^\d+]/g, '');
    if(!d) return '';
    if(d.charAt(0) === '+') return d;
    if(d.length === 10) return '+1' + d;
    if(d.length === 11 && d.charAt(0) === '1') return '+' + d;
    return d;
  }
  function time24(t){                                  // "8:00 AM", "8 AM", "5:30pm", "17:00" → "HH:MM"
    var m = clean(t).toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(a|p)?\.?m?\.?$/);
    if(!m) return '';
    var h = Number(m[1]), min = m[2] || '00';
    if(m[3] === 'p' && h < 12) h += 12;
    if(m[3] === 'a' && h === 12) h = 0;
    return h > 23 ? '' : (h < 10 ? '0' : '') + h + ':' + min;
  }
  function openingHours(list){
    var specs = [];
    list.forEach(function(e){
      if(e.closed) return;
      var o = time24(e.open), c = time24(e.close);
      if(!o || !c) return;
      var day = e.day.charAt(0).toUpperCase() + e.day.slice(1).toLowerCase();
      var prev = specs[specs.length - 1];
      if(prev && prev.opens === o && prev.closes === c) prev.dayOfWeek.push(day);
      else specs.push({'@type': 'OpeningHoursSpecification', dayOfWeek: [day], opens: o, closes: c});
    });
    return specs;
  }
  function schema(){
    var d = cache || read(), name = d['business-name'];
    if(!name) return null;
    var site = location.origin + '/', page = location.href.split('#')[0];
    var business = {
      '@type': d['schema-type'] || meta('core-schema-type') || 'LocalBusiness',
      '@id': site + '#business', name: name, url: site
    };
    function put(k, v){ if(v && (!Array.isArray(v) || v.length)) business[k] = v; }
    put('legalName', d['legal-business-name'] !== name ? d['legal-business-name'] : '');
    put('description', d['short-description'] || d.tagline);
    put('telephone', e164(d.phone));
    put('email', d.email);
    put('logo', abs(d.logo)); put('image', abs(d['default-social-share-image'] || d.logo));
    if(d['street-address'] || d.city){
      var a = {'@type': 'PostalAddress'};
      var street = [d['street-address'], d['address-line-2']].filter(Boolean).join(', ');
      if(street) a.streetAddress = street;
      if(d.city) a.addressLocality = d.city;
      if(d.state) a.addressRegion = d.state;
      if(d['zip-code']) a.postalCode = d['zip-code'];
      if(d.country) a.addressCountry = d.country;
      business.address = a;
    }
    put('areaServed', d['service-area']);
    put('hasMap', abs(d['directions-url']));
    put('openingHoursSpecification', openingHours(hours()));
    put('sameAs', ['google-business-url','facebook-url','instagram-url','youtube-url','tiktok-url','linkedin-url','nextdoor-url','x-url']
      .map(function(k){ return abs(d[k]); }).filter(Boolean));
    var h1 = document.querySelector('h1');
    var webpage = {'@type': 'WebPage', '@id': page + '#webpage', url: page,
      name: clean(h1 && h1.textContent) || document.title, isPartOf: {'@id': site + '#website'}, about: {'@id': site + '#business'}};
    var desc = meta('description'); if(desc) webpage.description = desc;
    return {'@context': 'https://schema.org', '@graph': [
      business,
      {'@type': 'WebSite', '@id': site + '#website', url: site, name: name, publisher: {'@id': site + '#business'}},
      webpage
    ]};
  }
  function writeSchema(){
    if(meta('core-schema') === 'off') return;
    var data = schema(), el = document.getElementById('core-schema');
    if(!data){ if(el) el.parentNode.removeChild(el); return; }
    if(!el){ el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'core-schema'; document.head.appendChild(el); }
    var json = JSON.stringify(data);
    if(el.textContent !== json) el.textContent = json;
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
        if(el.tagName === 'IMG' && !el.getAttribute('alt')) el.setAttribute('alt', get('business-name'));
        if(!v){
          if(attr(el, '-empty') === 'hide') el.hidden = true;
        } else if(el.tagName === 'IMG'){
          if(el.getAttribute('src') !== v){ el.removeAttribute('srcset'); el.removeAttribute('sizes'); el.setAttribute('src', v); }
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
      if(!key && hrefKey){                             // icon links: is-business-filled when the field has a URL
        el.classList.toggle('is-business-filled', !!href);
        if(attr(el, '-empty') === 'hide') el.hidden = !href;
      }
    });
    renderHours(hours());
    writeSchema();
    document.documentElement.classList.add('business-filled');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
  window.addEventListener('load', fill);

  window.CoreBusiness = {
    version: '2.0.0', get: get, fill: fill, hours: hours, groupedHours: groupedHours, schema: function(){ cache = read(); return schema(); },
    all: function(){ cache = read(); return Object.assign({}, cache); }
  };
})();

/* Mayes Core – Announcement bar v2.0.0 – keeps a fixed header stacked under an announcement bar.
 *
 * Markup: the bar carries [data-announcement] (its CMS list wrapper is measured when it has one).
 * Sets --core-announcement-offset on <html> = how much of the bar is still on screen (bar height − scroll, never below 0).
 * NATIVE: Core ships no CSS for it. In Webflow, give the fixed header's class top: var(--core-announcement-offset, 0px),
 * so it sits right under the bar, scrolls up with it, then pins at top 0; give the bar's class position: relative and a
 * z-index above the header. No bar = offset 0, nothing changes.
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

  window.CoreAnnouncement = { version: '2.0.0', refresh: measure };
})();

/* Mayes Core – Install v2.0.2 – "Add to Home Screen" banner for the mobile app layer.
 *
 * Pairs with the head snippet dist/core-app-head.html (full-screen launch, status bar, theme color) and the
 * Webflow webclip (Site settings › General), which is the home-screen icon.
 *
 * WHEN IT SHOWS – phones and tablets only, on the visitor's 2nd page view or later, never:
 *   · when the site is already open from the home screen (standalone)
 *   · while a sheet is open, including the cookie notice (shows once it closes, whether or not a choice was made)
 *   · for 30 days after the visitor closes it
 *   · when <html data-install="off">
 *
 * WHAT IT SAYS – picked from the browser:
 *   · Android Chrome with an install prompt available → an "Install" button that opens the browser's own prompt
 *   · iPhone / iPad → "Tap Share, then Add to Home Screen"
 *   · Android without a prompt → "Tap the ⋮ menu, then Install or Add to Home screen" (newer Chrome: "Install and create shortcut")
 *   · Instagram, TikTok, Facebook and other in-app browsers (which cannot add to the home screen)
 *     → "Open this page in your browser first"
 *
 * MARKUP – designed in Webflow (component "Core / Install Banner", once, in the Page Shell root). Core ships no
 * banner CSS and builds no banner: without one on the page, nothing shows.
 *   [data-install-banner]               the banner; hide it with its class and show it with an is-visible combo
 *     [data-install-icon]               optional image: gets the site's webclip and alt "<site name> icon", hidden when there is none
 *     [data-install-title]              text set to "Add <name> to your Home Screen"
 *     [data-install-name]               any text that should read just the site's name
 *     [data-install-hint="ios|android|in-app|prompt|other"]  one message per case; Core shows only the matching one
 *                                       (falls back to "other", then to the first hint)
 *     [data-install-action="prompt"]    the Install button, shown only when the browser offers its own install prompt
 *     [data-install-action="dismiss"]   the close button
 *     An empty data-install-action is ignored. When the action is a link inside a [data-core-button] wrapper
 *     (the Button component's overlay link), Core shows and hides the whole wrapper, not just the link.
 *   Core only fills it and toggles is-visible. Position it in Webflow with
 *     bottom: calc(var(--core-install-offset, env(safe-area-inset-bottom, 0px)) + 0.75rem)
 *   Core sets --core-install-offset to the bottom nav's height while the nav is showing, and removes it otherwise.
 * Optional:
 *   [data-install-open]         any element (e.g. an "Add to Home Screen" row in the More sheet) shows the banner on demand,
 *                               even if it was closed; hidden automatically (hidden attribute) when already on the home
 *                               screen or on desktop
 *   <html data-install-name="…"> the name in the banner (default: Business Settings name, then the
 *                               apple-mobile-web-app-title meta, then the page title)
 *   <html data-install-delay="4000"> ms to wait after load before showing (default 3000)
 * The icon is the site's apple-touch-icon (Webflow webclip); no icon = no image.
 * Sits above the bottom nav (measured), clear of the iPhone home bar.
 *
 * Public API: window.CoreInstall = { show(force), hide(), state() }
 * Events: "core:install" on document, detail = {action: "shown"|"dismissed"|"prompted"|"accepted"}
 */
(function(){
  if(window.CoreInstall) return;
  var ACTION = '[data-install-action]:not([data-install-action=""])';
  function shell(a){ return a.closest('[data-core-button]') || a; }   // the Button component's wrapper, else the link itself
  var root = document.documentElement, KEY = 'core-install-v1', DAY = 864e5, SNOOZE = 30 * DAY;
  var ua = navigator.userAgent || '', deferred = null, el = null, offsetTimer = 0;

  /* ---------- environment ---------- */
  function standalone(){
    return navigator.standalone === true || (window.matchMedia && (matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches));
  }
  function ios(){ return /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function android(){ return /Android/.test(ua); }
  function inApp(){ return /Instagram|FBAN|FBAV|FB_IAB|musical_ly|BytedanceWebview|TikTok|Snapchat|Pinterest|LinkedInApp|Line\//i.test(ua); }
  function mobile(){
    var narrow = window.matchMedia ? matchMedia('(max-width: 991px)').matches : window.innerWidth <= 991;
    return narrow && (ios() || android() || (window.matchMedia && matchMedia('(pointer: coarse)').matches));
  }
  function platform(){
    if(inApp()) return 'in-app';
    if(deferred) return 'prompt';
    if(ios()) return 'ios';
    if(android()) return 'android';
    return 'other';
  }

  /* ---------- memory ---------- */
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {}; }catch(e){ return {}; } }
  function write(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
  function snoozed(s){ return s.dismissed && (Date.now() - s.dismissed) < SNOOZE; }
  /* the cookie notice opens about a second after load; give it the first chance before showing */
  function consentNoticeDue(){
    if(!window.CoreConsent || !document.querySelector('[data-sheet="cookie-notice"]')) return false;
    var key = root.getAttribute('data-consent-key') || 'core-consent-v1';
    try{ return !localStorage.getItem(key); }catch(e){ return false; }
  }
  function sheetOpen(){ return !!(window.CoreSheet && window.CoreSheet.current && window.CoreSheet.current()); }
  function emit(action){ try{ document.dispatchEvent(new CustomEvent('core:install', {detail: {action: action, platform: platform()}})); }catch(e){} }

  /* ---------- content ---------- */
  function appName(){
    var n = root.getAttribute('data-install-name');
    if(!n && window.CoreBusiness && CoreBusiness.get) n = CoreBusiness.get('business-name');
    if(!n){ var m = document.querySelector('meta[name="apple-mobile-web-app-title"]'); n = m && m.getAttribute('content'); }
    if(!n) n = (document.title || '').split(/\s[|–—-]\s/)[0];
    return (n || 'this site').trim();
  }
  function iconUrl(){
    var l = document.querySelector('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
    return l ? l.getAttribute('href') : '';
  }
  /* a banner designed in Webflow: fill it and pick its message */
  function adopt(box){
    var p = platform(), icon = iconUrl(), name = appName();
    box.setAttribute('data-install-platform', p);
    if(!box.getAttribute('role')) box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Add ' + name + ' to your Home Screen');
    box.querySelectorAll('[data-install-title]').forEach(function(n){ n.textContent = 'Add ' + name + ' to your Home Screen'; });
    box.querySelectorAll('[data-install-name]').forEach(function(n){ n.textContent = name; });
    box.querySelectorAll('[data-install-icon]').forEach(function(img){
      if(icon){ img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.setAttribute('src', icon); img.setAttribute('alt', name + ' icon'); img.hidden = false; }
      else img.hidden = true;
    });
    var hints = Array.prototype.slice.call(box.querySelectorAll('[data-install-hint]'));
    var pick = hints.filter(function(h){ return h.getAttribute('data-install-hint') === p; })[0] ||
               hints.filter(function(h){ return h.getAttribute('data-install-hint') === 'other'; })[0] || hints[0];
    hints.forEach(function(h){ h.hidden = h !== pick; });
    box.querySelectorAll(ACTION).forEach(function(a){
      if(a.tagName === 'A'){ a.setAttribute('role', 'button'); a.removeAttribute('href'); a.setAttribute('tabindex', '0'); }
      if(a.getAttribute('data-install-action') === 'prompt') shell(a).hidden = p !== 'prompt';
      if(a.getAttribute('data-install-action') === 'dismiss' && !a.getAttribute('aria-label') && !(a.textContent || '').trim()) a.setAttribute('aria-label', 'Close');
    });
    if(box.parentNode !== document.body) document.body.appendChild(box);   // above everything, out of any slot
    box.hidden = false;
    return box;
  }
  function build(){
    var designed = document.querySelector('[data-install-banner]');
    return designed ? adopt(designed) : null;
  }

  /* ---------- placement: above the bottom nav ---------- */
  function placeOffset(){
    var bar = document.querySelector('[data-bottom-nav] .bottom-nav_bar') || document.querySelector('[data-bottom-nav]'), off = 0;
    if(bar){
      var r = bar.getBoundingClientRect();
      if(r.height && getComputedStyle(bar).display !== 'none') off = Math.max(0, Math.round(window.innerHeight - r.top));
    }
    if(off) root.style.setProperty('--core-install-offset', off + 'px');
    else root.style.removeProperty('--core-install-offset');   // the class falls back to the home-bar inset
  }

  /* ---------- show / hide ---------- */
  function show(force){
    if(standalone() || !document.body) return false;
    if(!force && (!mobile() || snoozed(read()))) return false;
    if(el && el.isConnected){ el.classList.add('is-visible'); return true; }
    placeOffset();
    el = build();
    if(!el) return false;
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(el) el.classList.add('is-visible'); }); });
    emit('shown');
    return true;
  }
  function hide(remember){
    if(remember){ var s = read(); s.dismissed = Date.now(); write(s); }
    if(!el) return;
    var gone = el; el = null;
    gone.classList.remove('is-visible');                // the banner stays in the page, hidden by its class
  }
  function prompt(){
    if(!deferred){ hide(true); return; }
    var d = deferred; deferred = null;
    emit('prompted');
    d.prompt();
    (d.userChoice || Promise.resolve({})).then(function(c){
      if(c && c.outcome === 'accepted'){ var s = read(); s.installed = Date.now(); write(s); emit('accepted'); hide(false); }
      else hide(true);
    });
  }

  /* ---------- auto timing ---------- */
  function views(){ var s = read(); s.views = (s.views || 0) + 1; write(s); return s.views; }
  function tryAuto(){
    if(root.getAttribute('data-install') === 'off' || standalone() || !mobile() || snoozed(read())) return;
    if(sheetOpen()){ document.addEventListener('sheet:close', function once(){ document.removeEventListener('sheet:close', once); setTimeout(tryAuto, 800); }); return; }
    show(false);
  }

  /* triggers placed in Webflow (e.g. a row in the More sheet) */
  function prepTriggers(){
    var hideThem = standalone() || !mobile();
    document.querySelectorAll('[data-install-open]').forEach(function(t){
      if(hideThem){ t.hidden = true; return; }
      if(t.tagName !== 'BUTTON' && t.tagName !== 'A'){ t.setAttribute('role', 'button'); if(!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0'); }
      if(t.tagName === 'A'){ t.setAttribute('role', 'button'); t.removeAttribute('href'); t.setAttribute('tabindex', '0'); }
    });
  }

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault(); deferred = e;
    if(el){ hide(false); setTimeout(function(){ show(true); }, 280); } /* rebuild with the Install button */
  });
  window.addEventListener('appinstalled', function(){ var s = read(); s.installed = Date.now(); write(s); hide(false); });

  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var a = e.target.closest(ACTION);
    if(a){ e.preventDefault(); if(a.getAttribute('data-install-action') === 'prompt') prompt(); else { hide(true); emit('dismissed'); } return; }
    var t = e.target.closest('[data-install-open]');
    if(t){
      e.preventDefault();
      if(window.CoreSheet && CoreSheet.current && CoreSheet.current()) CoreSheet.close(null, {noFocus: true});
      if(deferred) prompt(); else setTimeout(function(){ show(true); }, 300);
    }
  });
  document.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && e.target.closest && e.target.closest('[data-install-open]') && e.target.tagName !== 'BUTTON'){ e.preventDefault(); e.target.click(); }
  });
  window.addEventListener('resize', function(){ clearTimeout(offsetTimer); offsetTimer = setTimeout(placeOffset, 100); }, {passive: true});

  function init(){
    prepTriggers();
    var n = views();
    if(n < 2) return;
    var delay = parseInt(root.getAttribute('data-install-delay'), 10);
    if(isNaN(delay)) delay = 3000;
    if(consentNoticeDue()) delay = Math.max(delay, 2500); /* let the cookie notice open first; tryAuto then waits for it to close */
    setTimeout(tryAuto, delay);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreInstall = {
    version: '2.0.0',
    show: function(force){ return show(force !== false); },
    hide: function(){ hide(true); },
    state: function(){ var s = read(); return {platform: platform(), standalone: standalone(), mobile: mobile(), snoozed: snoozed(s), views: s.views || 0, canPrompt: !!deferred}; }
  };
})();
