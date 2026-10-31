/* Mayes Core – Motion v0.4.0 – attribute-driven motion and scroll state.
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

  function init(){
    scrollStates();
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if(!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(ST) gsap.registerPlugin(ST);
    motion(gsap, ST);
    legacy(gsap, ST);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.CoreMotion = { version: '0.4.0' };
})();
