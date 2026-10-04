/* Core Motion v0.3.0
 * Attribute-driven motion/state layer.
 *
 * Scroll state:
 *   data-scroll-state
 *   data-scroll-threshold="64"
 *   data-scroll-class="is-scrolled"
 *   data-scroll-duration="500"
 *
 * Entrance motion (requires GSAP; ScrollTrigger optional):
 *   data-animate="fade|fade-up|fade-down|fade-left|fade-right|scale"
 *   data-duration="0.8"
 *   data-delay="0"
 *
 * Parallax (requires GSAP + ScrollTrigger):
 *   data-scroll="parallax"
 *   data-speed="-10"
 */
(()=>{const init=()=>{document.querySelectorAll("[data-scroll-state]").forEach(el=>{const y=+(el.dataset.scrollThreshold||64),c=el.dataset.scrollClass||"is-scrolled",d=+(el.dataset.scrollDuration||500);el.style.transitionDuration=d+"ms";let s;const u=()=>{const n=scrollY>y;if(n!==s){s=n;el.classList.toggle(c,n)}};addEventListener("scroll",u,{passive:true});u()});if(!window.gsap)return;const g=gsap,ST=window.ScrollTrigger;if(ST)g.registerPlugin(ST);if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.querySelectorAll("[data-animate]").forEach(el=>{const a=el.dataset.animate,o={opacity:0,duration:+(el.dataset.duration||.8),delay:+(el.dataset.delay||0),ease:"power2.out"};if(a==="fade-up")o.y=32;if(a==="fade-down")o.y=-32;if(a==="fade-left")o.x=32;if(a==="fade-right")o.x=-32;if(a==="scale")o.scale=.96;if(ST)o.scrollTrigger={trigger:el,start:"top 85%",once:true};g.from(el,o)});if(ST)document.querySelectorAll('[data-scroll="parallax"]').forEach(el=>g.to(el,{yPercent:+(el.dataset.speed||-10),ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom top",scrub:true}}))};document.readyState==="loading"?addEventListener("DOMContentLoaded",init):init()})();
