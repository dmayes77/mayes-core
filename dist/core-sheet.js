/* Mayes Core – Sheet v1.3.0
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
      host.setAttribute('data-sheet', 'drawer'); host.setAttribute('data-sheet-host', '');
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

  /* scroll lock: overflow alone does not stop the page scrolling behind a sheet on iPhone, so the body is pinned */
  var lockedY = null, saved = null;
  function lockScroll(){
    if(lockedY !== null) return;
    lockedY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var b = document.body.style;
    saved = {position: b.position, top: b.top, left: b.left, right: b.right, width: b.width};
    b.position = 'fixed'; b.top = (-lockedY) + 'px'; b.left = '0'; b.right = '0'; b.width = '100%';
    document.documentElement.classList.add('sheet-lock');
  }
  function unlockScroll(){
    if(lockedY === null) return;
    var y = lockedY, b = document.body.style, root = document.documentElement, behavior = root.style.scrollBehavior;
    lockedY = null;
    b.position = saved.position; b.top = saved.top; b.left = saved.left; b.right = saved.right; b.width = saved.width;
    root.classList.remove('sheet-lock');
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
    version: '1.3.0',
    open: open, show: show, close: close,
    top: function(){ return host && host.classList.contains('is-open') && !finishClose ? host : null; },
    current: function(){ return current && !finishClose ? current.block : null; },
    host: function(){ build(); return host; },
    presentation: function(){ return host ? host.getAttribute('data-sheet-as') : null; }
  };
})();
