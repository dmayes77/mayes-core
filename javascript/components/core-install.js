/* Mayes Core – Install v2.0.1 – "Add to Home Screen" banner for the mobile app layer.
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
    box.querySelectorAll('[data-install-action]').forEach(function(a){
      if(a.tagName === 'A'){ a.setAttribute('role', 'button'); a.removeAttribute('href'); a.setAttribute('tabindex', '0'); }
      if(a.getAttribute('data-install-action') === 'prompt') a.hidden = p !== 'prompt';
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
