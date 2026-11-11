/* Mayes Core – Before and After v1.1.0 – optional module (not in core.js; load dist/core-before-after.js on sites that use it).
 * Drag, tap or use the keyboard to compare two photos of the same subject.
 *
 * Markup (Webflow component "Media / Before and After"):
 *   <div class="ba-slider" data-before-after>
 *     <div class="ba-after-layer">  <span class="ba-photo-placeholder">Add after photo</span>  <img class="ba-image-after" alt="…"> </div>
 *     <div class="ba-before-layer"> <span class="ba-photo-placeholder">Add before photo</span> <img class="ba-image-before" alt="…"> </div>
 *     <span class="ba-label-before" aria-hidden="true">Before</span> <span class="ba-label-after" aria-hidden="true">After</span>
 *     <span class="ba-handle" aria-hidden="true"><span class="ba-handle-dot">↔</span></span>
 *     <form class="ba-range-form"><input class="ba-range" data-before-after-range type="range" min="0" max="100" value="50"
 *            aria-label="Drag to compare before and after photos"></form>
 *   </div>
 * The range input is the control (keyboard and screen readers); --pos on the slider (0–100%) draws the split.
 * A layer whose image has no src shows its placeholder instead.
 * Sliders added later (CMS lists, sheets): CoreBeforeAfter.init(container).
 */
(function(){
  if(window.CoreBeforeAfter) return;

  function init(root){
    root = root || document;
    var sliders = root.matches && root.matches('[data-before-after]') ? [root] : root.querySelectorAll('[data-before-after]');
    Array.prototype.forEach.call(sliders, function(slider){
      if(slider.getAttribute('data-ba-ready') === '1') return;
      var range = slider.querySelector('[data-before-after-range]');
      if(!range) return;
      slider.setAttribute('data-ba-ready', '1');

      slider.querySelectorAll('.ba-before-layer, .ba-after-layer').forEach(function(layer){
        var img = layer.querySelector('img'), placeholder = layer.querySelector('.ba-photo-placeholder');
        if(!img) return;
        var has = !!img.getAttribute('src');
        img.style.display = has ? 'block' : 'none';
        if(placeholder) placeholder.style.display = has ? 'none' : 'grid';
      });

      function update(){
        var v = Math.max(0, Math.min(100, Number(range.value) || 0)) + '%';
        slider.style.setProperty('--pos', v);   // native: tracks the finger directly, no GSAP needed
      }
      update();
      range.addEventListener('input', update);
      range.addEventListener('change', update);
      range.addEventListener('focus', function(){ slider.classList.add('is-focused'); });
      range.addEventListener('blur', function(){ slider.classList.remove('is-focused'); });
      var form = range.closest('form');
      if(form) form.addEventListener('submit', function(e){ e.preventDefault(); });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ init(document); }, {once: true});
  else init(document);

  window.CoreBeforeAfter = { version: '1.1.0', init: init };
})();
