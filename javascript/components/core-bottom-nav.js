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
