/* Mayes Core – Install v1.0.1 – "Add to Home Screen" banner for the mobile app layer.
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
 *   · Android without a prompt → "Tap the ⋮ menu, then Add to Home screen"
 *   · Instagram, TikTok, Facebook and other in-app browsers (which cannot add to the home screen)
 *     → "Open this page in your browser first"
 *
 * MARKUP – none needed: the banner is built by this script and styled by core-install.css with Core tokens.
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
    if(p === 'android') return 'Tap <span class="core-install_glyph">' + SVG.dots + '<span class="core-install_sr">the menu</span></span> then <b>Add to Home screen</b>.';
    if(p === 'in-app') return 'Open this page in your browser first, then add it to your Home Screen.';
    return 'Use your browser menu to add it to your Home Screen.';
  }
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  function build(){
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
    version: '1.0.1',
    show: function(force){ return show(force !== false); },
    hide: function(){ hide(true); },
    state: function(){ var s = read(); return {platform: platform(), standalone: standalone(), mobile: mobile(), snoozed: snoozed(s), views: s.views || 0, canPrompt: !!deferred}; }
  };
})();
