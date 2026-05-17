/* ============================================================
   Numerology Core — shared logic for the /learn/ calculators.
   Pure ES5, no dependencies, no build step.

   Every rule, table, and formula here is sourced. See the
   SOURCES object at the bottom for citations. Values intentionally
   match the parent index.html analyzer where they overlap, so the
   two surfaces stay consistent.

   Exposed namespace: window.Numerology
   ============================================================ */

(function (global) {
  'use strict';

  /* ---------- Core reduction ---------- */

  function reduce(n) {
    n = Math.abs(parseInt(n, 10));
    if (isNaN(n)) return 0;
    while (n > 9) {
      var s = 0;
      var str = String(n);
      for (var i = 0; i < str.length; i++) s += parseInt(str[i], 10);
      n = s;
    }
    return n;
  }

  function digitSum(str) {
    var s = 0;
    for (var i = 0; i < str.length; i++) {
      var d = parseInt(str[i], 10);
      if (!isNaN(d)) s += d;
    }
    return s;
  }

  /* ---------- Planet & trait mapping (Vedic Navagraha)
     Sources: bejandaruwalla.com, astrosight.ai, parent index.html
     ---------- */

  var PLANETS = {
    1: 'Sun', 2: 'Moon', 3: 'Jupiter', 4: 'Rahu', 5: 'Mercury',
    6: 'Venus', 7: 'Ketu', 8: 'Saturn', 9: 'Mars'
  };

  var TRAITS = {
    1: { name: 'Leadership',  desc: 'Independent, pioneering, authoritative. Ruled by Sun.' },
    2: { name: 'Harmony',     desc: 'Cooperative, intuitive, emotional. Ruled by Moon.' },
    3: { name: 'Creativity',  desc: 'Expressive, optimistic, teacher. Ruled by Jupiter.' },
    4: { name: 'Stability',   desc: 'Practical, disciplined, unconventional. Ruled by Rahu.' },
    5: { name: 'Freedom',     desc: 'Adventurous, versatile, communicative. Ruled by Mercury.' },
    6: { name: 'Nurturing',   desc: 'Loving, responsible, aesthetic. Ruled by Venus.' },
    7: { name: 'Mysticism',   desc: 'Spiritual, analytical, detached. Ruled by Ketu.' },
    8: { name: 'Power',       desc: 'Ambitious, karmic, disciplined. Ruled by Saturn.' },
    9: { name: 'Universal',   desc: 'Compassionate, courageous, wise. Ruled by Mars.' }
  };

  /* ---------- Mulank (Driver) & Bhagyank (Conductor)
     Sources: muhuratam.in, panchangbodh.com, astrodunia.com
     Mulank   = single-digit reduction of birth DAY only
     Bhagyank = single-digit reduction of dd+mm+yyyy summed
     ---------- */

  function calcMulank(day) {
    return reduce(day);
  }

  function calcBhagyank(dd, mm, yyyy) {
    var str = String(dd) + String(mm) + String(yyyy);
    return reduce(digitSum(str));
  }

  /* ---------- Kua Number (Feng Shui Eight Mansions)
     Sources: astroccult.net, lovetoknow.com, wofs.com, fengshuimall.com
     Steps:
       1. Take last 2 digits of birth year, reduce to single digit s.
       2. Apply gender + era formula.
       3. If result is 5: male → 2, female → 8.
       4. Optional Feb 4 adjustment (Li Chun / Chinese solar year):
          births BEFORE Feb 4 belong to the PREVIOUS solar year.
     ---------- */

  function calcKua(yyyy, gender, opts) {
    opts = opts || {};
    var year = parseInt(yyyy, 10);
    if (isNaN(year)) return null;
    var g = (gender === 'F' || gender === 'f') ? 'F' : 'M';

    var ys = year % 100;
    var s = reduce(ys);

    var kua;
    if (year < 2000) {
      kua = (g === 'M') ? (10 - s) : reduce(s + 5);
    } else {
      kua = (g === 'M') ? (9 - s)  : reduce(s + 6);
    }
    if (kua <= 0) kua += 9;
    if (kua === 5) kua = (g === 'M') ? 2 : 8;
    return reduce(kua);
  }

  /* Adjust a (dd, mm, yyyy) for the Li Chun cutoff (~Feb 4).
     Returns the adjusted year to feed into calcKua. */
  function liChunAdjustedYear(dd, mm, yyyy) {
    var d = parseInt(dd, 10);
    var m = parseInt(mm, 10);
    var y = parseInt(yyyy, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return y;
    if (m < 2) return y - 1;
    if (m === 2 && d < 4) return y - 1;
    return y;
  }

  /* ---------- Kua direction table (Eight Mansions)
     Source: fengshuimall.com (verbatim 8 × 8 table)
     For each Kua: four auspicious + four inauspicious directions.
     Codes: N, NE, E, SE, S, SW, W, NW
     ---------- */

  var KUA_DIRECTIONS = {
    1: { group:'East', shengChi:'SE', tienYi:'E',  nienYen:'S',  fuWei:'N',  huoHai:'W',  wuGui:'NE', liuShar:'NW', juehMing:'SW' },
    2: { group:'West', shengChi:'NE', tienYi:'W',  nienYen:'NW', fuWei:'SW', huoHai:'E',  wuGui:'SE', liuShar:'S',  juehMing:'N'  },
    3: { group:'East', shengChi:'S',  tienYi:'N',  nienYen:'SE', fuWei:'E',  huoHai:'SW', wuGui:'NW', liuShar:'NE', juehMing:'W'  },
    4: { group:'East', shengChi:'N',  tienYi:'S',  nienYen:'E',  fuWei:'SE', huoHai:'NW', wuGui:'SW', liuShar:'W',  juehMing:'NE' },
    6: { group:'West', shengChi:'W',  tienYi:'NE', nienYen:'SW', fuWei:'NW', huoHai:'SE', wuGui:'E',  liuShar:'N',  juehMing:'S'  },
    7: { group:'West', shengChi:'NW', tienYi:'SW', nienYen:'NE', fuWei:'W',  huoHai:'N',  wuGui:'S',  liuShar:'SE', juehMing:'E'  },
    8: { group:'West', shengChi:'SW', tienYi:'NW', nienYen:'W',  fuWei:'NE', huoHai:'S',  wuGui:'N',  liuShar:'E',  juehMing:'SE' },
    9: { group:'East', shengChi:'E',  tienYi:'SE', nienYen:'N',  fuWei:'S',  huoHai:'NE', wuGui:'W',  liuShar:'SW', juehMing:'NW' }
  };

  /* Human-readable meanings for each of the 8 categories.
     Source: standard Eight Mansions feng shui references
     (yourchineseastrology.com, fengshuimall.com). */
  var KUA_DIR_MEANINGS = {
    shengChi:  { label:'Sheng Chi',  good:true,  use:'Wealth & prosperity', desc:'Most auspicious. Face this when working or studying for success.' },
    tienYi:    { label:'Tien Yi',    good:true,  use:'Health',              desc:'Healing direction. Good for the head of bed and dining.' },
    nienYen:   { label:'Nien Yen',   good:true,  use:'Love & relationships',desc:'Promotes harmony, longevity, family bonds.' },
    fuWei:     { label:'Fu Wei',     good:true,  use:'Personal stability',  desc:'Good for self-development, meditation, peace of mind.' },
    huoHai:    { label:'Huo Hai',    good:false, use:'Mishaps',             desc:'Mildly inauspicious. Causes minor accidents and quarrels.' },
    wuGui:     { label:'Wu Gui',     good:false, use:'Five Ghosts',         desc:'Fires, conflicts, theft. Avoid as main door or bed-head.' },
    liuShar:   { label:'Liu Shar',   good:false, use:'Six Killings',        desc:'Legal issues, scandals, broken relationships.' },
    juehMing:  { label:'Jueh Ming',  good:false, use:'Total Loss',          desc:'Most inauspicious. Loss of wealth or health if mis-oriented.' }
  };

  var DIR_LONG = {
    N:  'North',     NE: 'North-East', E:  'East',     SE: 'South-East',
    S:  'South',     SW: 'South-West', W:  'West',     NW: 'North-West'
  };

  /* ---------- Lo Shu Grid (3×3 magic square)
     Sources: dkscore.com, numerologybynehaa.com, astrologyfutureeye.com,
              bejandaruwalla.com, instaastro.com
     Cell order matches the classic Lo Shu turtle pattern:
       4 9 2
       3 5 7
       8 1 6
     ---------- */

  var LOSHU_LAYOUT = [4, 9, 2, 3, 5, 7, 8, 1, 6];

  /* Planes / arrows. Each is a triple of digits that must all be present
     for the plane to be "complete" / "arrow formed", or absent for
     "missing arrow". */
  var LOSHU_PLANES = {
    rows: [
      { key:'mental',    name:'Mental Plane',    nums:[4,9,2], desc:'Thinking, analysis, intellect, memory.' },
      { key:'emotional', name:'Emotional Plane', nums:[3,5,7], desc:'Feelings, intuition, balance, spirituality.' },
      { key:'practical', name:'Practical Plane', nums:[8,1,6], desc:'Action, drive, material world, hard work.' }
    ],
    cols: [
      { key:'thought', name:'Thought Plane', nums:[4,3,8], desc:'Imagination, planning, vision.' },
      { key:'will',    name:'Will Plane',    nums:[9,5,1], desc:'Willpower, determination, persistence.' },
      { key:'action',  name:'Action Plane',  nums:[2,7,6], desc:'Doing, executing, completing.' }
    ],
    diagonals: [
      { key:'success', name:'Golden Yog / Success Line', nums:[4,5,6], desc:'Achievement, fulfilment, rise to top.' },
      { key:'wealth',  name:'Prosperity Line',           nums:[2,5,8], desc:'Material prosperity and resource flow.' }
    ]
  };

  /* Build the Lo Shu digit-count map from a date of birth.
     Convention (per numerologybynehaa.com, astrologyfutureeye.com):
       • take every digit of dd, mm and yyyy
       • drop zeros (Lo Shu has no zero cell)
       • additionally include Mulank (driver) and Bhagyank (conductor)
     The cell shows the digit repeated N times (e.g. "999" if 9 occurs 3x). */
  function calcLoshuFromDOB(dd, mm, yyyy) {
    var d = parseInt(dd, 10);
    var m = parseInt(mm, 10);
    var y = parseInt(yyyy, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return null;

    var combined = String(d) + String(m) + String(y);
    var counts = { 1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0 };

    for (var i = 0; i < combined.length; i++) {
      var n = parseInt(combined[i], 10);
      if (n >= 1 && n <= 9) counts[n]++;
    }

    var mulank   = calcMulank(d);
    var bhagyank = calcBhagyank(d, m, y);
    if (mulank   >= 1 && mulank   <= 9) counts[mulank]++;
    if (bhagyank >= 1 && bhagyank <= 9) counts[bhagyank]++;

    return {
      counts: counts,
      mulank: mulank,
      bhagyank: bhagyank,
      dobString: combined
    };
  }

  /* Status of a single plane given a counts map.
     "full"    — all three digits present at least once
     "partial" — one or two of the three present
     "empty"   — none present (missing arrow / plane) */
  function planeStatus(counts, nums) {
    var present = 0;
    for (var i = 0; i < nums.length; i++) if (counts[nums[i]] > 0) present++;
    if (present === nums.length) return 'full';
    if (present === 0)            return 'empty';
    return 'partial';
  }

  /* ---------- Date helpers ---------- */

  function parseISODate(iso) {
    /* "YYYY-MM-DD" → {dd, mm, yyyy} or null */
    if (!iso || typeof iso !== 'string') return null;
    var parts = iso.split('-');
    if (parts.length !== 3) return null;
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    if (m < 1 || m > 12 || d < 1 || d > 31) return null;
    return { dd: d, mm: m, yyyy: y };
  }

  /* ---------- Sources / citations (shown in the UI footers) ---------- */

  var SOURCES = {
    loshu: [
      { name: 'Lo Shu Grid Mental/Spiritual/Practical Planes',
        url:  'https://www.dkscore.com/jyotishmedium/understanding-the-lo-shu-grid-numerology-for-mental-spiritual-and-practical-insights-833' },
      { name: 'Lo Shu Grid Calculation Method (Numerology by Neha)',
        url:  'https://numerologybynehaa.com/lo-shu-grid-calculation-method-predictions-remedies-with-example/' },
      { name: 'Lo Shu Grid Planet Mapping (Bejan Daruwalla)',
        url:  'https://bejandaruwalla.com/blogs/astrology/lo-shu-grid-numerology' },
      { name: 'Lo Shu Grid DOB convention (InstaAstro)',
        url:  'https://instaastro.com/numerology/lo-shu-grid/' }
    ],
    mulank: [
      { name: 'Mulank & Bhagyank Calculator (Muhuratam)',
        url:  'https://www.muhuratam.in/bhagyank-mulank' },
      { name: 'Mulank & Bhagyank Calculator (PanchangBodh)',
        url:  'https://panchangbodh.com/mulank-bhagyank-calculator' }
    ],
    kua: [
      { name: 'Kua Calculation Method (Astroccult)',
        url:  'https://www.astroccult.net/kua_number_calculation_method.html' },
      { name: 'Kua Calculation Guide (LoveToKnow)',
        url:  'https://www.lovetoknow.com/home/design-decor/how-calculate-kua-number' },
      { name: 'Eight Mansions Direction Table (Feng Shui Mall)',
        url:  'https://www.fengshuimall.com/blog/feng-shui-kua' }
    ],
    cheiro: [
      { name: 'Classical Cheiro Compound Numbers 10–52',
        url:  'https://bostjanlovrat.com/2024/08/21/classical-cheiros-descriptions-of-compound-numbers/' }
    ]
  };

  /* ---------- Public API ---------- */

  global.Numerology = {
    /* Core */
    reduce: reduce,
    digitSum: digitSum,

    /* Mulank / Bhagyank */
    calcMulank: calcMulank,
    calcBhagyank: calcBhagyank,

    /* Kua */
    calcKua: calcKua,
    liChunAdjustedYear: liChunAdjustedYear,
    KUA_DIRECTIONS: KUA_DIRECTIONS,
    KUA_DIR_MEANINGS: KUA_DIR_MEANINGS,
    DIR_LONG: DIR_LONG,

    /* Lo Shu */
    LOSHU_LAYOUT: LOSHU_LAYOUT,
    LOSHU_PLANES: LOSHU_PLANES,
    calcLoshuFromDOB: calcLoshuFromDOB,
    planeStatus: planeStatus,

    /* Reference */
    PLANETS: PLANETS,
    TRAITS: TRAITS,
    SOURCES: SOURCES,

    /* Date helpers */
    parseISODate: parseISODate
  };

})(typeof window !== 'undefined' ? window : this);
