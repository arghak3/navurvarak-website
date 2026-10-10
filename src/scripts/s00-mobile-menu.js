
  /* ---- Mobile menu ------------------------------------------ */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  function closeMenu(){ document.body.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); }

  menuBtn.addEventListener("click", function(){
    var open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", function(e){ if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape" && document.body.classList.contains("menu-open")){ closeMenu(); menuBtn.focus(); }
  });

  var header = document.querySelector(".site-header");
  function onScroll(){ header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive:true }); onScroll();
