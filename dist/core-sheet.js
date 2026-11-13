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
 *   NON-BLOCKING  data-sheet-nonmodal="desktop" (992px and up) or "always" opens the sheet with show() instead of
 *                 showModal(): no backdrop, no scroll lock, the page stays usable (a cookie bar). Tapping the page or
 *                 pressing Escape doesn't close it, and swipe is off; it closes from its own buttons. Give its class a
 *                 z-index in Webflow (it isn't in the top layer).
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
  var MQ_DESKTOP = window.matchMedia('(min-width: 992px)');

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
  function nonmodal(d){ var v = d.getAttribute('data-sheet-nonmodal'); return v === 'always' || (v === 'desktop' && MQ_DESKTOP.matches); }
  function isModal(d){ try{ return d.matches(':modal'); }catch(e){ return true; } }
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
    d.addEventListener('close', function(){
      resetDrag(d);
      if(d.hasAttribute('data-sheet-closedby')){ d.setAttribute('closedby', d.getAttribute('data-sheet-closedby')); d.removeAttribute('data-sheet-closedby'); }
      fire(d, 'sheet:close');
    });
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
      if(nonmodal(d)){
        // a non-modal dialog would light-dismiss on any page click with closedby="any"; it closes from its buttons only
        if(d.hasAttribute('closedby')) d.setAttribute('data-sheet-closedby', d.getAttribute('closedby'));
        d.setAttribute('closedby', 'none');
        d.show();
      } else d.showModal();
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
    if(!d || !d.open || !isModal(d) || e.target.closest('button, a, input, select, textarea, label')) return;
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
