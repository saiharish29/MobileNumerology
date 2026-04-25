# Mobile Numerology Analyzer

A comprehensive mobile number numerology analysis tool built as a single-file static web app. Analyze any 10-digit mobile number against your personal numerology profile and get instant compatibility scores, insights, and number suggestions.

---

## Live Demo

Deployed on Render: [your-render-url-here]

---

## Features

### Analyze Tab
- **High-level Verdict Widget** — Score meter (0–100) with instant Keep / Tweak / Change recommendation
- **12-Point Checklist** — No zeros, total compatibility, 59/95 pair, malefic pairs, karmic compound, last digit, Driver, Conductor, Kua, Name Number, and profession alignment
- **Compound Number Analysis** — Cheiro compound meanings (pre-reduction 2-digit number) including Karmic Debt flags (13, 14, 16, 19)
- **Segment Analysis** — First 3 / Middle 4 / Last 3 digit roots with planetary interpretations
- **Digit Pair Analysis** — All consecutive pairs with meanings, critical positions 3-4 and 4-5 starred
- **Core Numbers** — Total root, Last 4 root, First digit (operator series), Last digit
- **Lo Shu Grid** — With Mental, Emotional and Practical plane analysis
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
- Compound number meanings table (Cheiro)
- Enemy number chart (Chaldean/Vedic verified)
- Pair meanings reference table

---

## Numerology Systems Used

| System | Usage |
|---|---|
| Vedic / Chaldean | Driver (Mulank), Conductor (Bhagyank), enemy numbers, pair meanings |
| Cheiro Chaldean | Name Number calculation, compound number meanings |
| Feng Shui (Eight Mansions) | Kua Number calculation by birth year and gender |
| Lo Shu Grid | Digit presence and plane analysis |

---

## Personal Profile Numbers Calculated

| Number | Source | Meaning |
|---|---|---|
| Driver (Mulank) | Birth day reduced to single digit | Psychic / outer personality |
| Conductor (Bhagyank) | Full DOB (dd+mm+yyyy) reduced | Life path / destiny |
| Kua Number | Birth year + gender (pre/post 2000 formula) | Feng Shui lucky direction |
| Name Number | Chaldean alphabet chart applied to full name | Name vibration (Cheiro system) |

---

## Deployment on Render

This is a single static HTML file with no dependencies, no build step, and no backend.

### Steps

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) and create a new **Static Site**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** (leave blank)
   - **Publish Directory:** `.` (root)
5. Click **Deploy**

Render will serve `index.html` automatically from the root.

---

## File Structure

```
/
├── index.html     # Complete app — single self-contained file
└── README.md      # This file
```

---

## Key Rules Implemented

- No zeros in mobile number
- Total must be 1, 3, 5 or 6 (most auspicious)
- 59 or 95 at digit positions 3-4 or 4-5 (Mercury + Mars)
- No malefic pairs: 14/41 (liabilities), 18/81 (disputes), 28/82 (depression), 27/72 (health)
- No triple-repeat digits
- No karmic compound numbers (13, 14, 16, 19)
- Last digit must be 1, 3, 5, 6 or 9 — never 4 or 8
- Mobile total must not be enemy of Driver or Conductor
- Compatible with Kua and Name Number

---

## Browser Compatibility

Written in pure ES5 JavaScript — no modern syntax, no external dependencies, no build tools required. Compatible with all browsers including older iOS Safari versions.

---

## Designed & Developed by

**Harish Kumar MP**
