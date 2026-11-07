/* Mayes Core – core.js – built from: javascript/components/core-sheet.js javascript/components/core-bottom-nav.js javascript/privacy/core-consent.js javascript/utilities/core-business.js javascript/utilities/core-announcement.js javascript/components/core-install.js javascript/motion/core-motion.js */

/* Mayes Core – Sheet v1.4.1
 * One shared sheet for the whole site: bottom sheet, centered dialog, or left/right drawer.
 *
 * CONTENT BLOCKS – anything the site shows in a sheet is a hidden block somewhere on the page:
 *   <div data-sheet="services" data-sheet-title="Services" data-sheet-mode="auto" data-sheet-height="medium" class="is-hidden">
 *     [data-sheet-head]    optional – replaces the default head (title + close)
 *     [data-sheet-body]    optional – the content (if missing, the block's own children are used)
 *     [data-sheet-footer]  optional – sticky actions at the bottom
 *   </div>
 *   (data-sheet-content="name" works the same as data-sheet="name".)
 *   While open, the parts move into the host and go back on close, so CMS bindings travel with them.
 *   The block's data-* attributes are mirrored onto the host, plus data-sheet-view="name".
 *
 * THE HOST – the engine builds one host ([data-sheet-host]). If the page already has a Webflow-authored host
 *   ([data-sheet-host] containing [data-sheet-panel]; optional [data-sheet-overlay], [data-sheet-grabber],
 *   [data-sheet-head] with [data-sheet-title] and [data-sheet-close], [data-sheet-body]) it adopts that one
 *   instead, so the sheet's look can be designed in Webflow. It is moved to the end of <body>.
 *   Only the host Core builds carries data-sheet-look="core" (Core's default look); an adopted host is styled by its
 *   Webflow classes. Keep data-sheet="drawer" on a Webflow-built host so it stays hidden until it opens.
 *
 * OPEN  any [data-sheet-open="name"], or CoreSheet.open(nameOrBlock, {returnFocus, mode, height, width, title})
 *       CoreSheet.show({title, html|node, mode, height, width, view}) for content built in JS
 * CLOSE [data-sheet-close], overlay tap, Escape, swipe down on the handle/head (bottom sheets), CoreSheet.close()
 * MODES (data-sheet-mode, or the mode option, which wins):
 *   auto    bottom sheet ≤991px, centered dialog above (default)
 *   drawer  bottom sheet ≤767px, right drawer above
 *   bottom | center | left | right   the same presentation at every width
 * HEIGHTS (bottom sheets): data-sheet-height = compact | medium | tall | full (default: fits content, max 88%)
 * WIDTH  data-sheet-width="34rem" (or --sheet-width)
 * The host carries data-sheet-as="bottom|center|left|right" – the presentation in use – for styling.
 * EVENTS "sheet:open" / "sheet:close" on the block and the host.
 *
 * Handles focus trap and return, inert background, scroll lock that also holds on iPhone, swipe-to-close,
 * and reduced motion. Motion: GSAP when it is loaded (and the visitor allows motion), CSS transitions otherwise.
 * Public API: window.CoreSheet
 */
(function(){
  if(window.CoreSheet) return;
  var ANIM = 260, OPEN_S = 0.3, CLOSE_S = 0.24;
  var host, baseClass = '', overlay, panel, grab, defHead, defTitle, defBody, current = null, closeTimer = 0, finishClose = null, inerted = [];
  var FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  var X_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var SKIP = /^data-sheet(-content|-mode|-title|-width|-height|-open)?$/;
  var MQ_APP = window.matchMedia('(max-width: 991px)'), MQ_PHONE = window.matchMedia('(max-width: 767px)');
  var MQ_REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)');

  function esc(n){ return window.CSS && CSS.escape ? CSS.escape(n) : n; }
  function byName(n){ return document.querySelector('[data-sheet-content="' + esc(n) + '"], [data-sheet="' + esc(n) + '"]:not([data-sheet-host])'); }
  function nameOf(b){ return b.getAttribute('data-sheet-content') || b.getAttribute('data-sheet') || ''; }
  function fire(el, type){ try{ el && el.dispatchEvent(new CustomEvent(type, {bubbles:true})); }catch(e){} }
  function visible(el){ return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length); }
  function xButton(){ return '<button type="button" data-sheet-x aria-label="Close">' + X_SVG + '</button>'; }
  function motionOk(){ return !!window.gsap && !MQ_REDUCE.matches; }
  function el(tag, attr){ var e = document.createElement(tag); e.setAttribute(attr, ''); return e; }

  /* ---------- host: adopt a Webflow-authored one, or build one ---------- */
  function adopt(h){
    host = h;
    if(host.parentNode !== document.body) document.body.appendChild(host);   // inert must never reach the host
    host.removeAttribute('aria-hidden');
    host.setAttribute('data-sheet', 'drawer');
    panel = host.querySelector('[data-sheet-panel]');
    overlay = host.querySelector('[data-sheet-overlay]');
    if(!overlay){ overlay = el('div', 'data-sheet-overlay'); host.insertBefore(overlay, host.firstChild); }
    overlay.setAttribute('data-sheet-close', '');
    panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('tabindex', '-1');
    grab = panel.querySelector('[data-sheet-grabber]');
    if(!grab){ grab = el('div', 'data-sheet-grabber'); panel.insertBefore(grab, panel.firstChild); }
    grab.setAttribute('aria-hidden', 'true');
    defHead = panel.querySelector('[data-sheet-head]');
    if(!defHead){ defHead = el('div', 'data-sheet-head'); panel.insertBefore(defHead, grab.nextSibling); }
    defHead.setAttribute('data-sheet-default', '');
    defTitle = defHead.querySelector('[data-sheet-title]');
    if(!defTitle){ defTitle = el('div', 'data-sheet-title'); defHead.insertBefore(defTitle, defHead.firstChild); }
    if(!defTitle.id) defTitle.id = 'sheet-host-title';
    var c = defHead.querySelector('[data-sheet-close]');
    if(!c){ c = el('div', 'data-sheet-close'); defHead.appendChild(c); }
    if(c.tagName === 'A'){ c.removeAttribute('href'); c.setAttribute('role', 'button'); if(!c.hasAttribute('tabindex')) c.setAttribute('tabindex', '0'); }
    if(c.tagName !== 'A' && c.tagName !== 'BUTTON' && !c.querySelector('button, a')) c.innerHTML = xButton();
    if(!c.getAttribute('aria-label') && !(c.textContent || '').trim()) c.setAttribute('aria-label', 'Close');
    defBody = panel.querySelector('[data-sheet-body]');
    if(!defBody){ defBody = el('div', 'data-sheet-body'); panel.appendChild(defBody); }
    defBody.setAttribute('data-sheet-default', '');
    defBody.innerHTML = '';
  }
  function build(){
    if(host) return;
    var authored = document.querySelector('[data-sheet-host]');
    if(authored && authored.querySelector('[data-sheet-panel]')) adopt(authored);
    else {
      host = document.createElement('div');
      host.setAttribute('data-sheet', 'drawer'); host.setAttribute('data-sheet-host', ''); host.setAttribute('data-sheet-look', 'core');
      host.innerHTML = '<div data-sheet-overlay data-sheet-close></div>' +
        '<div data-sheet-panel role="dialog" aria-modal="true" tabindex="-1">' +
          '<div data-sheet-grabber aria-hidden="true"></div>' +
          '<div data-sheet-head data-sheet-default><div data-sheet-title id="sheet-host-title"></div><div data-sheet-close>' + xButton() + '</div></div>' +
          '<div data-sheet-body data-sheet-default></div>' +
        '</div>';
      overlay = host.children[0]; panel = host.children[1];
      grab = panel.children[0]; defHead = panel.children[1]; defTitle = defHead.querySelector('[data-sheet-title]'); defBody = panel.children[2];
      document.body.appendChild(host);
    }
    baseClass = host.className;
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

  /* everything outside the sheet becomes inert while it is open (screen readers and Tab stay inside) */
  function setInert(on){
    if(on){
      Array.prototype.forEach.call(document.body.children, function(e){
        if(e === host || e.hasAttribute('inert') || /^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(e.tagName)) return;
        e.setAttribute('inert', ''); inerted.push(e);
      });
    } else { inerted.forEach(function(e){ e.removeAttribute('inert'); }); inerted = []; }
  }

  /* desktop browsers with classic scrollbars keep a reserved gutter (page stability) that no overlay can paint over;
     it shows the root background, so give that the overlay's color while a sheet is open (only when the body has its
     own background, so the page behind the overlay is never darkened twice) */
  function tintGutter(on){
    var root = document.documentElement;
    if(!on){ root.style.removeProperty('--sheet-tint'); return; }
    var bodyBg = getComputedStyle(document.body).backgroundColor, tint = overlay ? getComputedStyle(overlay).backgroundColor : '';
    var transparent = function(c){ return !c || c === 'transparent' || /rgba\([^)]*,\s*0\)$/.test(c); };
    if(transparent(bodyBg) || transparent(tint) || root.scrollHeight <= root.clientHeight) return;
    root.style.setProperty('--sheet-tint', tint);
  }

  /* scroll lock: overflow alone does not stop the page scrolling behind a sheet on iPhone, so the body is pinned */
  var lockedY = null, saved = null;
  function lockScroll(){
    if(lockedY !== null) return;
    lockedY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var b = document.body.style;
    saved = {position: b.position, top: b.top, left: b.left, right: b.right, width: b.width};
    tintGutter(true);                                  // measure before the body is pinned
    b.position = 'fixed'; b.top = (-lockedY) + 'px'; b.left = '0'; b.right = '0'; b.width = '100%';
    document.documentElement.classList.add('sheet-lock');
  }
  function unlockScroll(){
    if(lockedY === null) return;
    var y = lockedY, b = document.body.style, root = document.documentElement, behavior = root.style.scrollBehavior;
    lockedY = null;
    b.position = saved.position; b.top = saved.top; b.left = saved.left; b.right = saved.right; b.width = saved.width;
    root.classList.remove('sheet-lock');
    tintGutter(false);
    root.style.scrollBehavior = 'auto'; window.scrollTo(0, y); root.style.scrollBehavior = behavior;
  }

  /* GSAP frames per presentation: [closed, open] */
  function frames(as){
    if(as === 'bottom') return [{yPercent: 100}, {yPercent: 0}];
    if(as === 'right')  return [{xPercent: 100}, {xPercent: 0}];
    if(as === 'left')   return [{xPercent: -100}, {xPercent: 0}];
    return [{xPercent: -50, yPercent: -46, autoAlpha: 0}, {xPercent: -50, yPercent: -50, autoAlpha: 1}];
  }
  function stopMotion(){
    if(!window.gsap || !panel) return;
    window.gsap.killTweensOf([panel, overlay]);
    window.gsap.set([panel, overlay], {clearProps: 'transform,opacity,visibility'});
    host.classList.remove('is-gsap');
  }

  /* move a node into the host and remember where it came from */
  function borrow(node, before){
    var mark = document.createComment('sheet');
    node.parentNode.insertBefore(mark, node);
    (before ? before.parentNode : panel).insertBefore(node, before || null);
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
    host.setAttribute('data-sheet-mode', opts.mode || (block && block.getAttribute('data-sheet-mode')) || 'auto');
    var h = opts.height || (block && block.getAttribute('data-sheet-height'));
    if(h) host.setAttribute('data-sheet-height', h); else host.removeAttribute('data-sheet-height');
    var w = opts.width || (block && block.getAttribute('data-sheet-width'));
    if(w) host.style.setProperty('--sheet-width', w); else host.style.removeProperty('--sheet-width');
    present();
    if(block){                                       // mirror the block's data-* attributes (CSS/JS hooks)
      Array.prototype.forEach.call(block.attributes, function(a){
        if(a.name.indexOf('data-') === 0 && !SKIP.test(a.name) && !host.hasAttribute(a.name)){ host.setAttribute(a.name, a.value); current.attrs.push(a.name); }
      });
    }
    var head = block && part(block, '[data-sheet-head]'), body = block && part(block, '[data-sheet-body]'), foot = block && part(block, '[data-sheet-footer]');
    var title = opts.title || (block && block.getAttribute('data-sheet-title')) || '';
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
    host.className = baseClass;                        // drop state classes a feature added (e.g. is-invalid)
    host.removeAttribute('data-sheet-height');
    defHead.hidden = false; defBody.hidden = false; defBody.innerHTML = '';
    current = null;
  }

  /* finish a close that is still animating, so a new open starts clean */
  function flushClose(){
    clearTimeout(closeTimer);
    if(finishClose){ var f = finishClose; finishClose = null; stopMotion(); f(); }
  }

  function open(target, opts){
    opts = opts || {};
    build();
    var block = typeof target === 'string' ? byName(target) : target;
    if(block && block.closest && block.closest('[data-sheet-host]')) block = current && current.block;   // already inside the host
    if(!block && !opts.html && !opts.node) return null;
    if(!finishClose && current && current.block === block && host.classList.contains('is-open')) return host;
    flushClose();
    if(current){ fire(current.block, 'sheet:close'); unmount(); }
    resetDrag(false);
    mount(block, opts);
    var as = host.getAttribute('data-sheet-as');
    lockScroll();
    setInert(true);
    if(motionOk()){
      var g = window.gsap, f = frames(as);
      host.classList.add('is-gsap', 'is-open', 'is-visible');
      g.killTweensOf([panel, overlay]);
      g.fromTo(panel, f[0], Object.assign({}, f[1], {duration: OPEN_S, ease: 'power3.out', overwrite: true,
        onComplete: function(){ g.set(panel, {clearProps: 'transform,opacity,visibility'}); host.classList.remove('is-gsap'); }}));
      g.fromTo(overlay, {opacity: 0}, {opacity: 1, duration: OPEN_S, ease: 'power1.out', overwrite: true,
        onComplete: function(){ g.set(overlay, {clearProps: 'opacity'}); }});
    } else {
      host.classList.add('is-open');
      requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(host.classList.contains('is-open')) host.classList.add('is-visible'); }); });
    }
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
    if(!host || !current || finishClose || !host.classList.contains('is-open')) return;
    opts = opts || {};
    var block = current.block, r = current.returnFocus, as = host.getAttribute('data-sheet-as');
    var animate = !opts.instant && motionOk() && host.classList.contains('is-visible');
    resetDrag(animate);                                // keep a swiped panel where the finger left it
    unlockScroll();
    setInert(false);
    fire(block, 'sheet:close'); fire(host, 'sheet:close');
    finishClose = function(){ unmount(); };
    if(opts.instant){ flushClose(); }
    else if(animate){
      var g = window.gsap;
      host.classList.add('is-gsap');
      g.killTweensOf([panel, overlay]);
      g.to(panel, Object.assign({}, frames(as)[0], {duration: CLOSE_S, ease: 'power2.in', overwrite: true,
        onComplete: function(){ g.set(panel, {clearProps: 'transform,opacity,visibility'}); if(finishClose){ var f = finishClose; finishClose = null; f(); } }}));
      g.to(overlay, {opacity: 0, duration: CLOSE_S, ease: 'power1.out', overwrite: true,
        onComplete: function(){ g.set(overlay, {clearProps: 'opacity'}); }});
    } else {
      host.classList.remove('is-visible');
      closeTimer = setTimeout(flushClose, ANIM);
    }
    if(!opts.noFocus && r && r.focus && document.contains(r)) r.focus({preventScroll:true});
  }

  /* swipe down to close – bottom-sheet presentation, started on the handle or the head (not on its buttons/links) */
  var drag = null;
  function dragStart(e){
    if(finishClose || !host.classList.contains('is-visible') || host.getAttribute('data-sheet-as') !== 'bottom') return;
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    var zone = e.target.closest('[data-sheet-grabber], [data-sheet-head]');
    if(!zone || !panel.contains(zone) || e.target.closest('button, a, input, select, textarea, label')) return;
    if(window.gsap) window.gsap.killTweensOf(panel);
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
    else if(motionOk() && d.dy > 0){
      resetDrag(true);
      window.gsap.to(panel, {y: 0, duration: 0.2, ease: 'power2.out', onComplete: function(){ window.gsap.set(panel, {clearProps: 'transform'}); }});
    }
    else resetDrag(false);
  }
  function resetDrag(keepTransform){
    if(panel){
      panel.style.transition = '';
      if(!keepTransform) panel.style.transform = '';
      panel.removeEventListener('pointermove', dragMove);
      panel.removeEventListener('pointerup', dragEnd);
      panel.removeEventListener('pointercancel', dragEnd);
    }
    drag = null;
  }

  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var t = e.target.closest('[data-sheet-open]');
    if(t){ e.preventDefault(); open(t.getAttribute('data-sheet-open'), {returnFocus: t, mode: t.getAttribute('data-sheet-open-mode') || undefined}); return; }
    var c = e.target.closest('[data-sheet-close]');
    if(c && host && host.contains(c)){ e.preventDefault(); close(); }
  });
  document.addEventListener('keydown', function(e){
    if(!host || !host.classList.contains('is-open') || finishClose) return;
    if(e.key === 'Escape'){ close(); return; }
    if((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-sheet-close][role="button"]')){ e.preventDefault(); close(); return; }
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
    version: '1.4.1',
    open: open, show: show, close: close,
    top: function(){ return host && host.classList.contains('is-open') && !finishClose ? host : null; },
    current: function(){ return current && !finishClose ? current.block : null; },
    host: function(){ build(); return host; },
    presentation: function(){ return host ? host.getAttribute('data-sheet-as') : null; }
  };
})();

/* Mayes Core – Bottom Nav v1.2.0 – behavior for Navigation / Bottom Nav + Navigation / Bottom Nav Tab.
   Works with the Sheet engine (window.CoreSheet). Optional GSAP tap feedback when GSAP is loaded.

   Markup contract (built by the Webflow components):
     [data-bottom-nav]                       outer spacer (reserves height so content is never covered)
       nav.bottom-nav_bar
         [data-bottom-nav-tab][data-tab-action="…"]   one per tab (Action prop)
           a[data-bottom-nav-link]                     full-tab hit area (Link prop = no-JS fallback)
           .bottom-nav_badge                           optional, in the Badge slot

   Tab actions (Action prop):
     ""                    normal link (active when the current page matches)
     "sheet:NAME"          opens the sheet [data-sheet="NAME"]; add data-tab-sheet-mode="bottom" on the tab to force a presentation
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
      e.preventDefault(); sheetApi().open(arg, {returnFocus: link, mode: tab.getAttribute('data-tab-sheet-mode') || undefined});
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

/* Mayes Core – Consent v1.2.0 – cookie consent + the Site Settings sheet.
   Uses the Sheet engine (window.CoreSheet). Pairs with the head snippet (Consent Mode v2 defaults),
   which must run BEFORE the Google tag. Categories: essential (always on), analytics, marketing.

   Markup (Webflow component "Core / Site Settings", placed in the Page Shell Overlay slot):
     [data-sheet="site-settings"]  the settings sheet (cog opens it). Sections: [data-settings-section] (privacy now, appearance later)
       [data-consent-switch="analytics|marketing|essential"]   role="switch" buttons
     [data-sheet="cookie-notice"]  first-visit notice
     [data-consent-action="accept-all|necessary|save|customize"]
   Opening: any [data-sheet-open="site-settings"] (the brand-bar cog) or CoreConsent.open().
   Deferred third-party scripts: <script type="text/plain" data-consent="analytics|marketing" src|inline> run once consent is given.
   Events: "core:consent" on document (detail = {analytics, marketing}).
   NATIVE FIRST: switches get .is-on when on and .is-disabled when locked (essential), so their look can be a Webflow
   combo class. A switch, button, row or section that carries its own Webflow class is marked data-look="webflow" and
   Core's fallback look (core-consent.css) steps aside for it. */
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
  /* elements styled with their own Webflow class keep that look; Core's fallback look is only for unstyled ones */
  function designed(el){ return (el.getAttribute('class') || '').split(/\s+/).some(function(c){ return c && !/^(w-|is-)/.test(c); }); }
  function markLooks(){
    document.querySelectorAll('[data-consent-switch],[data-consent-action],[data-settings-row],[data-settings-section]').forEach(function(el){
      if(designed(el)) el.setAttribute('data-look', 'webflow');
    });
  }
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
    markLooks(); prepActions(); sync(s);
    if(s) apply(s);
    else if(document.querySelector('[data-sheet="cookie-notice"]')){
      setTimeout(function(){ if(!read() && sheet() && !sheet().top()) sheet().open('cookie-notice'); }, 1200);
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreConsent = { version: '1.2.0', key: KEY, get: read, set: set, open: open };
})();

/* Mayes Core – Business v1.2.0 – one business record, shown anywhere on the page.
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
      if(!key && hrefKey && attr(el, '-empty') === 'hide') el.hidden = !href;
    });
    renderHours(hours());
    document.documentElement.classList.add('business-filled');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
  window.addEventListener('load', fill);

  window.CoreBusiness = {
    version: '1.2.0', get: get, fill: fill, hours: hours, groupedHours: groupedHours,
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

/* Mayes Core – Install v1.1.0 – "Add to Home Screen" banner for the mobile app layer.
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
 * MARKUP – none needed: without one, the banner is built by this script and styled by core-install.css.
 * NATIVE FIRST – design it in Webflow instead (component "Core / Install Banner", once, in the Page Shell root):
 *   [data-install-banner]               the banner; hide it with its class and show it with an is-visible combo
 *     [data-install-icon]               optional image: gets the site's webclip, removed when there is none
 *     [data-install-title]              text set to "Add <name> to your Home Screen"
 *     [data-install-name]               any text that should read just the site's name
 *     [data-install-hint="ios|android|in-app|prompt|other"]  one message per case; Core shows only the matching one
 *                                       (falls back to "other", then to the first hint)
 *     [data-install-action="prompt"]    the Install button, shown only when the browser offers its own install prompt
 *     [data-install-action="dismiss"]   the close button
 *   Core only fills it, toggles is-visible, and keeps it above the bottom nav (bottom = --core-install-offset).
 * Optional:
 *   [data-install-open]         any element (e.g. an "Add to Home Screen" row in the More sheet) shows the banner on demand,
 *                               even if it was closed; hidden automatically when already on the home screen or on desktop
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
  var SVG = {
    share: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>',
    dots: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
    close: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };
  function message(p){
    if(p === 'prompt') return 'Install it for one-tap access, like an app.';
    if(p === 'ios') return 'Tap <span class="core-install_glyph">' + SVG.share + '<span class="core-install_sr">Share</span></span> then <b>Add to Home Screen</b>.';
    if(p === 'android') return 'Tap <span class="core-install_glyph">' + SVG.dots + '<span class="core-install_sr">the menu</span></span> then <b>Install</b> or <b>Add to Home screen</b>.';
    if(p === 'in-app') return 'Open this page in your browser first, then add it to your Home Screen.';
    return 'Use your browser menu to add it to your Home Screen.';
  }
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  /* a banner designed in Webflow: fill it and pick its message */
  function adopt(box){
    var p = platform(), icon = iconUrl(), name = appName();
    box.setAttribute('data-install-platform', p);
    if(!box.getAttribute('role')) box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Add ' + name + ' to your Home Screen');
    box.querySelectorAll('[data-install-title]').forEach(function(n){ n.textContent = 'Add ' + name + ' to your Home Screen'; });
    box.querySelectorAll('[data-install-name]').forEach(function(n){ n.textContent = name; });
    box.querySelectorAll('[data-install-icon]').forEach(function(img){
      if(icon){ img.removeAttribute('srcset'); img.removeAttribute('sizes'); img.setAttribute('src', icon); img.setAttribute('alt', ''); img.hidden = false; }
      else img.hidden = true;
    });
    var hints = Array.prototype.slice.call(box.querySelectorAll('[data-install-hint]'));
    var pick = hints.filter(function(h){ return h.getAttribute('data-install-hint') === p; })[0] ||
               hints.filter(function(h){ return h.getAttribute('data-install-hint') === 'other'; })[0] || hints[0];
    hints.forEach(function(h){ h.hidden = h !== pick; });
    box.querySelectorAll('[data-install-action]').forEach(function(a){
      if(a.tagName === 'A'){ a.setAttribute('role', 'button'); a.removeAttribute('href'); a.setAttribute('tabindex', '0'); }
      if(a.getAttribute('data-install-action') === 'prompt') a.hidden = p !== 'prompt';
      if(a.getAttribute('data-install-action') === 'dismiss' && !a.getAttribute('aria-label') && !(a.textContent || '').trim()) a.setAttribute('aria-label', 'Close');
    });
    if(box.parentNode !== document.body) document.body.appendChild(box);   // above everything, out of any slot
    box.hidden = false;
    return box;
  }
  function designedBanner(){ return document.querySelector('[data-install-banner]:not(.core-install)'); }

  function build(){
    var designed = designedBanner();
    if(designed) return adopt(designed);
    var p = platform(), icon = iconUrl(), name = appName();
    var box = document.createElement('div');
    box.className = 'core-install';
    box.setAttribute('data-install-banner', '');
    box.setAttribute('data-install-platform', p);
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Add ' + name + ' to your Home Screen');
    box.innerHTML =
      (icon ? '<img class="core-install_icon" src="' + esc(icon) + '" alt="" width="44" height="44">' : '') +
      '<div class="core-install_text"><p class="core-install_title">Add ' + esc(name) + ' to your Home Screen</p>' +
      '<p class="core-install_hint">' + message(p) + '</p></div>' +
      (p === 'prompt' ? '<button type="button" class="core-install_action" data-install-action="prompt">Install</button>' : '') +
      '<button type="button" class="core-install_close" data-install-action="dismiss" aria-label="Close">' + SVG.close + '</button>';
    var img = box.querySelector('.core-install_icon');
    if(img) img.addEventListener('error', function(){ if(img.parentNode) img.parentNode.removeChild(img); });
    document.body.appendChild(box);
    return box;
  }

  /* ---------- placement: above the bottom nav ---------- */
  function placeOffset(){
    var bar = document.querySelector('[data-bottom-nav] .bottom-nav_bar') || document.querySelector('[data-bottom-nav]'), off = 0;
    if(bar){
      var r = bar.getBoundingClientRect();
      if(r.height && getComputedStyle(bar).display !== 'none') off = Math.max(0, Math.round(window.innerHeight - r.top));
    }
    root.style.setProperty('--core-install-offset', off + 'px');
  }

  /* ---------- show / hide ---------- */
  function show(force){
    if(standalone() || !document.body) return false;
    if(!force && (!mobile() || snoozed(read()))) return false;
    if(el && el.isConnected){ el.classList.add('is-visible'); return true; }
    placeOffset();
    el = build();
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ if(el) el.classList.add('is-visible'); }); });
    emit('shown');
    return true;
  }
  function hide(remember){
    if(remember){ var s = read(); s.dismissed = Date.now(); write(s); }
    if(!el) return;
    var gone = el; el = null;
    gone.classList.remove('is-visible');
    if(!gone.classList.contains('core-install')) return;   // a designed banner stays in the page, hidden by its class
    var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function(){ if(gone.parentNode) gone.parentNode.removeChild(gone); }, reduced ? 0 : 260);
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
      if(hideThem){ t.hidden = true; t.style.display = 'none'; return; }
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
    var a = e.target.closest('[data-install-action]');
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
    if(standalone()) root.classList.add('is-standalone');
    var n = views();
    if(n < 2) return;
    var delay = parseInt(root.getAttribute('data-install-delay'), 10);
    if(isNaN(delay)) delay = 3000;
    if(consentNoticeDue()) delay = Math.max(delay, 2500); /* let the cookie notice open first; tryAuto then waits for it to close */
    setTimeout(tryAuto, delay);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreInstall = {
    version: '1.1.0',
    show: function(force){ return show(force !== false); },
    hide: function(){ hide(true); },
    state: function(){ var s = read(); return {platform: platform(), standalone: standalone(), mobile: mobile(), snoozed: snoozed(s), views: s.views || 0, canPrompt: !!deferred}; }
  };
})();

/* Mayes Core – Motion v0.5.0 – attribute-driven motion and scroll state.
 *
 * NATIVE FIRST: on sites where Webflow Interactions animate the data-motion attributes (the master's
 * "Core / Fade", "Core / Rise", … interactions), add this to the head so Core stays out of the way:
 *   <meta name="core-motion" content="webflow">
 * Core then skips data-motion and data-animate (Webflow animates them) and keeps only data-scroll-state.
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

  function native(){ var m = document.querySelector('meta[name="core-motion"]'); return !!m && /^webflow$/i.test(m.getAttribute('content') || ''); }

  function init(){
    scrollStates();
    if(native()) return;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if(!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(ST) gsap.registerPlugin(ST);
    motion(gsap, ST);
    legacy(gsap, ST);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreMotion = { version: '0.5.0', native: native };
})();
