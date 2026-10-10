# ACME NavUrvarak · farmer website

One page, four languages (English, Hindi, Odia, Tamil), for farmers.
Same build as the Arsoum site: the page is assembled from numbered
blocks in `src/`, never edited directly.

    python3 build.py            rebuild index.html from src/
    python3 build.py --check    report drift without writing
    python3 serve.py            preview on http://localhost:8124

## How the languages work

Every string carries all four languages side by side:

    <span class="en">…</span><span class="hi">…</span><span class="or">…</span><span class="ta">…</span>

`data-lang` on `<html>` shows one and hides the rest (CSS only, so it
works without JavaScript). A first visit opens the language picker; the
choice is remembered. A shared link can force a language: `?lang=or`.

Hindi copy follows the approved leaflet and standee where they exist.
**Odia and Tamil are Claude's translations and need a native speaker's
check before launch.**

## Content rules

- Facts only from the ACME documents (leaflet, sitemap, positioning
  note, standee). No figures that are not in them.
- Claims stay neutral: "up to", "can", "usually", and a source line
  under the comparison. Removed on purpose: the 80–90% vs 30–50%
  efficiency figures, the environment comparison, and the FAO
  "70–94% higher returns" study.
- Only smiling farmers in photographs. All photos are free Pexels
  images and are labelled illustrative in the footer.
- No ICAR logo. ICAR is named in text only.
- Logos: NavUrvarak top left, official ACME Group logo top right,
  never redrawn. Footer content mirrors acme.in.

## Before launch

- The registration form is **not connected**. Until the sheet is
  mapped, a valid form opens WhatsApp to 97322-97322 with the details
  filled in (`src/scripts/s11-register-form.js`).
- A privacy notice is needed for the form (it collects phone numbers).
- Remove the `noindex` line in `src/_head.html` and `robots.txt`.
- Odia and Tamil native-speaker review.

Internal documents (`source-materials/`) and full-size photo originals
(`assets/photos/`) are kept out of git.
