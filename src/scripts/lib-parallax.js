
  /* ---- Parallax for the wave backgrounds --------------------
     Each layer moves at data-parallax times the scroll, against
     the page, while its section is on screen. Off for people who
     ask for reduced motion.                                     */
  var layers = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (layers.length && !still){
    var ticking = false;
    function paint(){
      ticking = false;
      var vh = window.innerHeight;
      layers.forEach(function(el){
        var box = el.parentElement.getBoundingClientRect();
        if (box.bottom < -200 || box.top > vh + 200) return;
        // Background drifts slower than the page (depth), clamped to the
        // layer's overhang so its edges never show.
        var room = el.offsetHeight > box.height ? (el.offsetHeight - box.height) / 2 - 8 : 0;
        var shift = -(box.top + box.height / 2 - vh / 2) * parseFloat(el.dataset.parallax);
        shift = Math.max(-room, Math.min(room, shift));
        var flip = el.parentElement.classList.contains("faqs") ? " scaleX(-1)" : "";
        el.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)" + flip;
      });
    }
    function queue(){ if (!ticking){ ticking = true; requestAnimationFrame(paint); } }
    window.addEventListener("scroll", queue, { passive:true });
    window.addEventListener("resize", queue);
    paint();
  }
