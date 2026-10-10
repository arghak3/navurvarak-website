
  /* ---- Grow the yield bars when the chart comes into view --- */
  var bars = document.querySelector(".bars");
  if (bars){
    if (window.IntersectionObserver){
      var barIo = new IntersectionObserver(function(en){
        if (en[0].isIntersecting){ bars.classList.add("in"); barIo.disconnect(); }
      }, { threshold:.4 });
      barIo.observe(bars);
    } else bars.classList.add("in");
  }
