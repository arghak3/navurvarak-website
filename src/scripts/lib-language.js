
  /* ---- Language ----------------------------------------------
     Four languages. A first visit opens the picker; after that
     the choice is remembered on the phone. WhatsApp links get a
     greeting in the chosen language.                           */
  var LANGS = { en:"en", hi:"hi", or:"or", ta:"ta" };
  var picker = document.getElementById("langPicker");
  var langBtn = document.getElementById("langBtn");
  var WA_TEXT = {
    en:"Namaste, I want to know about NavUrvarak.",
    hi:"नमस्ते, मुझे नवउर्वरक के बारे में जानना है।",
    or:"ନମସ୍କାର, ମୁଁ ନବଉର୍ବରକ ବିଷୟରେ ଜାଣିବାକୁ ଚାହେଁ।",
    ta:"வணக்கம், நவ்உர்வரக் பற்றி அறிய விரும்புகிறேன்."
  };

  function setLang(lang){
    if (!LANGS[lang]) lang = "en";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    document.querySelectorAll("[data-set-lang]").forEach(function(b){
      b.setAttribute("aria-pressed", String(b.dataset.setLang === lang));
    });
    document.querySelectorAll("a[data-wa]").forEach(function(a){
      a.href = "https://wa.me/919732297322?text=" + encodeURIComponent(WA_TEXT[lang]);
    });
    try { localStorage.setItem("navurvarak-lang", lang); } catch(e){}
  }
  window.nuLang = function(){ return root.getAttribute("data-lang") || "en"; };

  function openPicker(){ picker.hidden = false; var b = picker.querySelector("button"); if (b) b.focus(); }
  function closePicker(){ picker.hidden = true; }

  document.querySelectorAll("[data-set-lang]").forEach(function(b){
    b.addEventListener("click", function(){ setLang(b.dataset.setLang); closePicker(); if (langBtn) langBtn.focus(); });
  });
  if (langBtn) langBtn.addEventListener("click", openPicker);
  picker.addEventListener("click", function(e){ if (e.target === picker && saved) closePicker(); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && !picker.hidden && saved) closePicker(); });

  // ?lang=hi in a shared link wins, then the saved choice.
  var saved = null;
  try { saved = localStorage.getItem("navurvarak-lang"); } catch(e){}
  var fromUrl = (location.search.match(/[?&]lang=(en|hi|or|ta)\b/) || [])[1];
  if (fromUrl){ setLang(fromUrl); saved = fromUrl; }
  else if (saved && LANGS[saved]) setLang(saved);
  else { setLang("en"); openPicker(); }
