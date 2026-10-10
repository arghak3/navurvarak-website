  /* ---- Reveal sections on approach --------------------------
     If IntersectionObserver is missing, everything is simply
     shown — content is never left hidden.                      */
  var reveals = document.querySelectorAll(".reveal");

  if (window.IntersectionObserver){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add("in"); });
  }

