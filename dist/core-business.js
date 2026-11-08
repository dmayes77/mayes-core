/* Mayes Core – Business v2.0.0 – one business record, shown anywhere on the page.
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
