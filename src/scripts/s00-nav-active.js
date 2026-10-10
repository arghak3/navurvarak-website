
  /* ---- Highlight the menu item for the section in view ------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]:not(.btn)'));
  if (window.IntersectionObserver && navLinks.length){
    var byId = {};
    navLinks.forEach(function(a){ byId[a.getAttribute("href").slice(1)] = a; });
    var navIo = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting && byId[en.target.id]){
          navLinks.forEach(function(a){ a.classList.remove("active"); });
          byId[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin:"-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function(id){ var s = document.getElementById(id); if (s) navIo.observe(s); });
  }
