
  /* ---- Trial registration form -------------------------------
     NOT CONNECTED YET. The sheet will be mapped once the visual
     work is signed off. Until then a valid form is turned into
     a WhatsApp message to the helpline, so nothing is lost.
     To connect: post `data` to the sheet endpoint in submit().  */
  var form = document.getElementById("regForm");
  var done = document.getElementById("regDone");
  var err = document.getElementById("formError");
  var regWa = document.getElementById("regWa");

  if (form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      form.querySelectorAll(".invalid").forEach(function(el){ el.classList.remove("invalid"); });
      err.className = "form-error"; err.hidden = true;

      var f = form.elements, problems = [];
      ["name", "district", "state"].forEach(function(n){
        if (!f[n].value.trim()){ f[n].closest(".field").classList.add("invalid"); problems.push("fields"); }
      });
      var mobile = f.mobile.value.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
      if (!/^[6-9]\d{9}$/.test(mobile)){ f.mobile.closest(".field").classList.add("invalid"); problems.push("mobile"); }
      if (!f.consent.checked){ form.querySelector(".consent").classList.add("invalid"); problems.push("consent"); }

      if (problems.length){
        problems.forEach(function(p){ err.classList.add("show-" + p); });
        err.hidden = false;
        var first = form.querySelector(".invalid input");
        if (first) first.focus();
        return;
      }

      function picked(name){
        return Array.prototype.filter.call(form.querySelectorAll('[name="' + name + '"]'), function(i){ return i.checked; })
          .map(function(i){ return i.value; }).join(", ");
      }
      var data = {
        name:f.name.value.trim(), mobile:mobile, village:f.village.value.trim(),
        district:f.district.value.trim(), state:f.state.value.trim(), acres:f.acres.value,
        crops:picked("crops"), fertilizer:picked("fertilizer"), tractor:picked("tractor"),
        contact:picked("contact"), language:window.nuLang()
      };
      var lines = ["NavUrvarak trial registration"];
      Object.keys(data).forEach(function(k){ if (data[k]) lines.push(k + ": " + data[k]); });
      regWa.href = "https://wa.me/919732297322?text=" + encodeURIComponent(lines.join("\n"));

      form.hidden = true; done.hidden = false; done.focus();
    });
  }
