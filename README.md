# Mobile Numerology Analyzer

A comprehensive mobile number numerology analysis tool plus a small set of standalone learning calculators (Lo Shu Grid, Driver/Conductor, Kua). Built as a single static web app — zero build step, zero dependencies, zero backend.

---

## Live Demo

Deployed on Render: [your-render-url-here]

---

## What's inside

This repo now ships two complementary surfaces:

1. **The Mobile Number Analyzer** — `index.html` — the full original tool with the Analyze / Suggest / Rules tabs.
2. **The Learn section** — `learn/` — standalone, single-purpose calculators with cited sources, useful on their own or alongside the analyzer.

---

## 1. Mobile Number Analyzer

### Analyze Tab
- **High-level Verdict Widget** — Score meter (0–100) with instant Keep / Tweak / Change recommendation
- **12-Point Checklist** — No zeros, total compatibility, 59/95 pair, malefic pairs, karmic compound, last digit, Driver, Conductor, Kua, Name Number, and profession alignment
- **Compound Number Analysis** — Cheiro compound meanings (pre-reduction 2-digit number) including Karmic Debt flags (13, 14, 16). See Recent corrections below regarding 19, 33 and 52.
- **Segment Analysis** — First 3 / Middle 4 / Last 3 digit roots with planetary interpretations
- **Digit Pair Analysis** — All consecutive pairs with meanings, critical positions 3-4 and 4-5 starred
- **Core Numbers** — Total root, Last 4 root, First digit (operator series), Last digit
- **Lo Shu Grid** — With Mental, Emotional and Practical plane analysis (based on the mobile number's digits)
- **Profile Compatibility** — % bars for Driver, Conductor, Kua and Name Number vs mobile total
- **Digit Frequency** — Visual count of each digit 1-9
- **Profession Alignment** — Goal-based recommendation (9 professions)
- **Insights** — Detailed explanation of every finding
- **Recommendation** — Plain-language verdict
- **Remedies** — Actionable fixes if number is weak (operator switch, gemstones, mantras, yantras)

### Suggest Tab
- Generates compatible 10-digit mobile numbers tailored to your numerology profile
- All suggestions: zero-free, no malefic pairs, no karmic compound, auspicious last digit, 59/95 at positions 3-4
- Interactive digit builder — mark digits as required or excluded
- Tap any suggestion to copy it, then paste into Analyze for a full check

### Rules Tab
- 14 golden rules of mobile numerology with visual cards
- Best mobile total by profession reference guide
- Compound number meanings table (Cheiro classical 10–52, with Vedic planetary extensions for 53–82 — provenance noted in the table footer)
- Enemy number chart (Chaldean/Vedic compatibility)
- Pair meanings reference table

---

## 2. Learn — Standalone Calculators

The `learn/` folder contains a small collection of single-purpose calculators. Every formula and reference table is sourced from public references (see **Sources & Citations** at the end) — nothing is invented.

| Page | What it does |
|---|---|
| [`learn/index.html`](learn/index.html) | Landing page with tiles for each calculator |
| [`learn/loshu-grid.html`](learn/loshu-grid.html) | Date of Birth → 3×3 Lo Shu Grid + Mental / Emotional / Practical planes, plus vertical Thought / Will / Action and diagonal Success / Wealth lines |
| [`learn/driver-conductor.html`](learn/driver-conductor.html) | Date of Birth → Mulank (Driver) + Bhagyank (Conductor) with the working shown step-by-step; each annotated with ruling planet and core traits |
| [`learn/kua.html`](learn/kua.html) | Date of Birth + Gender → Kua number + the full **8-direction Eight Mansions table** (Sheng Chi, Tien Yi, Nien Yen, Fu Wei, Huo Hai, Wu Gui, Liu Shar, Jueh Ming). Optional **Li Chun (Feb 4)** adjustment for early-year births. |
| [`learn/tests.html`](learn/tests.html) | Regression test runner — 34 assertions against known worked examples from cited sources. Open in browser to verify the core module before shipping. |

Shared code:
- [`learn/numerology-core.js`](learn/numerology-core.js) — every formula, every reference table, every citation
- [`learn/style.css`](learn/style.css) — design tokens shared with the parent analyzer

---

## Numerology Systems Used

| System | Usage |
|---|---|
| Vedic / Chaldean | Driver (Mulank), Conductor (Bhagyank), enemy numbers, pair meanings |
| Cheiro Chaldean | Name Number calculation, compound number meanings (10–52) |
| Feng Shui (Eight Mansions) | Kua Number, lucky/unlucky directions |
| Lo Shu Grid | Digit presence, plane analysis, missing arrows |

---

## Personal Profile Numbers Calculated

| Number | Source | Meaning |
|---|---|---|
| Driver (Mulank) | Birth day reduced to single digit | Psychic / outer personality |
| Conductor (Bhagyank) | Full DOB (dd+mm+yyyy) reduced | Life path / destiny |
| Kua Number | Birth year + gender (pre/post 2000 formula) | Feng Shui directions |
| Name Number | Chaldean alphabet chart applied to full name | Name vibration (Cheiro system) |

---

## Deployment on Render

This is still a fully static site with no dependencies, no build step, no backend.

### Steps

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) and create a new **Static Site**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** (leave blank)
   - **Publish Directory:** `.` (root)
5. Click **Deploy**

Render will serve `index.html` automatically from the root. The `learn/` folder is served at `/learn/`.

---

## File Structure

```
/
├── index.html                      Mobile Number Analyzer (single self-contained file)
├── numerology-mobile-analyzer.html Byte-identical duplicate of index.html
├── README.md                       This file
└── learn/                          Standalone learning calculators
    ├── index.html                  Landing page
    ├── loshu-grid.html             Lo Shu Grid from DOB
    ├── driver-conductor.html       Mulank + Bhagyank from DOB
    ├── kua.html                    Kua number + 8 directions (with Li Chun toggle)
    ├── tests.html                  34-assertion regression test runner
    ├── numerology-core.js          Shared logic + cited reference tables
    └── style.css                   Shared design tokens
```

---

## Key Rules Implemented

- **Zeros are now accepted, not blocking.** Earlier versions refused to analyse any number containing a zero. The analyzer now continues, with a non-blocking amber warning and a transparent score penalty (−5 per zero, capped at −15). Ideal numbers are still zero-free; the rule simply doesn't short-circuit anymore.
- Total must be 1, 3, 5 or 6 (most auspicious)
- 59 or 95 at digit positions 3-4 or 4-5 (Mercury + Mars)
- No malefic pairs: 14/41 (liabilities), 18/81 (disputes), 28/82 (depression), 27/72 (health)
- No triple-repeat digits
- No karmic compound numbers: **13, 14, 16** (Chaldean / Cheiro). Pythagorean systems also flag 19 — this app follows Cheiro, who calls 19 the "Prince of Heaven" and treats it as fortunate.
- Last digit must be 1, 3, 5, 6 or 9 — never 4 or 8
- Mobile total must not be enemy of Driver or Conductor
- Compatible with Kua and Name Number

---

## Recent corrections (validated against sources)

- **Compound 19** is now classified as `ok` ("Prince of Heaven") per classical Cheiro. Earlier versions inherited a Pythagorean karmic-debt label that conflicted with the Cheiro/Chaldean reading the rest of the app uses. Removed from `KARMIC_COMPOUNDS`.
- **Compound 52** is now classified as `warn` per Cheiro ("same meaning as 43" — revolution, strife). Earlier "Intellect/ok" reading was unsourced.
- **Compound 33** retains its modern "Master Teacher" reading, now explicitly annotated as a modern (not Cheiro classical) interpretation.
- **Compounds 53–82** retained as Vedic planetary-combination extensions (e.g. 81 = Saturn + Sun), with provenance noted in the Rules-tab table footer.

---

## Sources & Citations

Every rule and reference table in both the analyzer and the Learn calculators is grounded in public references.

- [Classical Cheiro's Compound Numbers 10–52 — Boštjan Lovrat](https://bostjanlovrat.com/2024/08/21/classical-cheiros-descriptions-of-compound-numbers/)
- [Lo Shu Grid Mental / Spiritual / Practical Planes — dkscore.com](https://www.dkscore.com/jyotishmedium/understanding-the-lo-shu-grid-numerology-for-mental-spiritual-and-practical-insights-833)
- [Lo Shu Grid Calculation Method — numerologybynehaa.com](https://numerologybynehaa.com/lo-shu-grid-calculation-method-predictions-remedies-with-example/)
- [Lo Shu Grid Planet Mapping — bejandaruwalla.com](https://bejandaruwalla.com/blogs/astrology/lo-shu-grid-numerology)
- [Lo Shu Grid DOB Convention — InstaAstro](https://instaastro.com/numerology/lo-shu-grid/)
- [Kua Number Calculation Method — astroccult.net](https://www.astroccult.net/kua_number_calculation_method.html)
- [Kua Number Calculation Guide — LoveToKnow](https://www.lovetoknow.com/home/design-decor/how-calculate-kua-number)
- [Eight Mansions Direction Table — Feng Shui Mall](https://www.fengshuimall.com/blog/feng-shui-kua)
- [Mulank & Bhagyank Calculator — PanchangBodh](https://panchangbodh.com/mulank-bhagyank-calculator)
- [Mulank & Bhagyank Calculator — Muhuratam](https://www.muhuratam.in/bhagyank-mulank)
- [Mobile Numerology Pair Rules — luckymobilenumberbooth.in](https://www.luckymobilenumberbooth.in/how-to-calculate-mobile-number-numerology/)

---

## Verification

Open [`learn/tests.html`](learn/tests.html) in any browser. It runs 34 assertions against known worked examples from the cited sources (Mulank 27 → 9 per PanchangBodh; Bhagyank 27/03/1990 → 4 per PanchangBodh; Kua 1985 M → 6 per astroccult; Lo Shu 27/03/1990 counts; Kua 8-direction table from Feng Shui Mall; etc.). The page shows a green summary banner when all pass.

---

## Browser Compatibility

Written in pure ES5 JavaScript — no modern syntax, no external dependencies, no build tools required. Compatible with all browsers including older iOS Safari versions.

---

## Designed & Developed by

**Harish Kumar MP**
