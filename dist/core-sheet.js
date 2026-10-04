/* Mayes Core – Sheet v1.2.0
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
    defBody.innerHTML = '';
    defFoot.innerHTML = '';
    if(head){
      var customTitle = head.querySelector('[data-sheet-title]');
      if(customTitle && !title) defTitle.textContent = (customTitle.textContent || '').trim();
    }
    if(body){
      defBody.hidden = false;
      borrow(body, defBody);
    } else {
      defBody.hidden = false;
      if(block){ Array.prototype.slice.call(block.childNodes).forEach(function(n){ if(n !== head && n !== foot && !(n.matches && n.matches('[data-sheet-overlay],[data-sheet-panel]'))) { var m = document.createComment('sheet'); block.insertBefore(m, n); defBody.appendChild(n); current.moved.push([n, m]); } }); }
      else if(opts.node){ defBody.appendChild(opts.node); }
      else if(opts.html){ defBody.innerHTML = opts.html; }
    }
    if(foot) borrow(foot, defFoot);
    if(defTitle.textContent){ panel.setAttribute('aria-labelledby', defTitle.id); panel.removeAttribute('aria-label'); }
    else { panel.removeAttribute('aria-labelledby'); panel.setAttribute('aria-label', title || name.replace(/-/g,' ')); }
  }

  function unmount(){
    if(!current) return;
    current.moved.reverse().forEach(function(p){ var n = p[0], m = p[1]; if(m.parentNode){ m.parentNode.insertBefore(n, m); m.parentNode.removeChild(m); } });
    current.attrs.forEach(function(a){ host.removeAttribute(a); });
    host.className = '';                               // drop state classes a feature added (e.g. is-invalid)
    host.removeAttribute('data-sheet-height');
    defHead.hidden = false; defBody.hidden = false; defBody.innerHTML = ''; defFoot.innerHTML = '';
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
    version: '1.2.0',
    open: open, show: show, close: close,
    top: function(){ return host && host.classList.contains('is-open') ? host : null; },
    current: function(){ return current ? current.block : null; },
    host: function(){ build(); return host; },
    presentation: function(){ return host ? host.getAttribute('data-sheet-as') : null; }
  };
})();
