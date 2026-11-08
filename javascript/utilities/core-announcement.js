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
