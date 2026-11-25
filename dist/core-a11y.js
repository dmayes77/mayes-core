/* Mayes Core – Accessibility v1.0.0 – a skip link, and button semantics for sheet triggers.
 *
 * SKIP LINK    – the first Tab on any page with a <main> lands on "Skip to main content". It is injected here, hidden until it
 *                has focus (core-base.css), so a Webflow page needs no extra element. Skip it with
 *                <meta name="core-skip-link" content="off">, change the words with <meta name="core-skip-link-text" content="...">,
 *                or place your own link with data-skip-link and Core adds none. <main> gets an id (main-content) if it has none.
 * SHEET TRIGGERS – a link with data-sheet-open (the bottom nav's Services and Quote tabs, a row in a sheet) opens a dialog, but a
 *                screen reader hears "link". Core gives it role="button" and aria-haspopup="dialog", and Space opens it like a button.
 *                The href stays, so the link still works without JavaScript.
 *
 * FOCUS RING   – lives in core-base.css (a two-tone ring that shows on light and dark backgrounds).
 */
(function(){
  'use strict';
  if(window.CoreA11y) return;

  function meta(name){ var m = document.querySelector('meta[name="' + name + '"]'); return m ? m.getAttribute('content') : null; }

  function skipLink(){
    if(meta('core-skip-link') === 'off' || document.querySelector('[data-skip-link]')) return;
    var main = document.querySelector('main, [role="main"]');
    if(!main) return;
    if(!main.id) main.id = 'main-content';
    if(!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1');   /* lets the link move focus into <main> */
    var a = document.createElement('a');
    a.setAttribute('data-skip-link', '');
    a.href = '#' + main.id;
    a.textContent = meta('core-skip-link-text') || 'Skip to main content';
    document.body.insertBefore(a, document.body.firstChild);
  }

  function triggers(){
    document.querySelectorAll('[data-sheet-open]:not([data-sheet-open=""])').forEach(function(t){
      if(t.tagName !== 'BUTTON' && !t.hasAttribute('role')) t.setAttribute('role', 'button');
      if(!t.hasAttribute('aria-haspopup')) t.setAttribute('aria-haspopup', 'dialog');
    });
  }

  /* a link acts on Enter only; a button also acts on Space */
  document.addEventListener('keydown', function(e){
    if(e.key !== ' ' && e.key !== 'Spacebar') return;
    var t = e.target && e.target.closest && e.target.closest('a[role="button"][data-sheet-open]');
    if(!t) return;
    e.preventDefault();
    t.click();
  });

  function init(){ skipLink(); triggers(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreA11y = { version: '1.0.0', refresh: triggers };
})();
