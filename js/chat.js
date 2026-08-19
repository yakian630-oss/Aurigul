/* =========================================================
   AURIGUL — chat.js
   Site-wide helper chatbot. Rule-based, offline (no backend).
   • Understands & replies in English, Urdu and Roman Urdu.
   • Searches the live product catalogue, lets you select items
     and calculates their total price.
   ========================================================= */
(function () {

  const money = n => "Rs " + Math.round(n).toLocaleString("en-US");
  const getProducts = () =>
    (window.AURIGUL && window.AURIGUL.PRODUCTS) ? window.AURIGUL.PRODUCTS
    : (typeof PRODUCTS !== "undefined" ? PRODUCTS : null);

  const CHAT_HTML = `
    <button class="chat-fab" id="chatFab" aria-label="Chat with AURIGUL">
      <span class="chat-fab__open"><svg viewBox="0 0 24 24" width="25" height="25"><path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.6-5.2A8.5 8.5 0 1 1 21 11.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="8.5" cy="11.5" r="1.05" fill="currentColor"/><circle cx="12" cy="11.5" r="1.05" fill="currentColor"/><circle cx="15.5" cy="11.5" r="1.05" fill="currentColor"/></svg></span>
      <span class="chat-fab__close"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
    </button>
    <div class="chat-panel" id="chatPanel" role="dialog" aria-label="AURIGUL chat">
      <div class="chat-panel__head">
        <div class="chat-panel__title"><span class="chat-dot"></span> AURIGUL Assistant <span class="chat-panel__sub">• online</span></div>
        <button class="chat-panel__close" id="chatClose" aria-label="Close chat">&times;</button>
      </div>
      <div class="chat-panel__body" id="chatBody"></div>
      <form class="chat-panel__input" id="chatForm">
        <input type="text" id="chatInput" placeholder="Type your message…" autocomplete="off" />
        <button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 12l16-8-6 16-3-6-7-2z" fill="currentColor"/></svg></button>
      </form>
    </div>`;

  /* ---------- Support intents (keyword → EN / Roman-Urdu reply) ---------- */
  const INTENTS = [
    { test: /(^|\b)(hi+|hey+|hello|helo|hy|yo|salam|salaam|assalam|aoa|adaab|adab)\b|السلام|سلام|ہیلو/i,
      en: "Hello! 👋 Welcome to AURIGUL. I can show you products, help with orders, delivery, payment, returns, sizes and offers. What are you looking for?",
      ur: "Assalam-o-alaikum! 👋 AURIGUL mein khush aamdeed. Main products dikha sakta hoon aur orders, delivery, payment, returns, sizes aur offers mein madad kar sakta hoon. Aap kya dhoond rahe hain?",
      quick: true },
    { test: /(ship|shipping|deliver|delivery|courier|dispatch|tcs|leopard)|kitn[ea] din|kab (aa|mil|ay|aye)|ڈیلیوری|کب آئے/i,
      en: "🚚 We deliver nationwide across Pakistan. Delivery is FREE on orders over Rs 5,000, otherwise a flat Rs 200. Orders usually arrive in 3–5 working days.",
      ur: "🚚 Hum poore Pakistan mein delivery karte hain. Rs 5,000 se upar delivery FREE hai, warna Rs 200. Order aam taur par 3–5 kaam ke dinon mein pohnch jata hai." },
    { test: /(return|exchange|refund|replace|wapsi|wapas|badal|واپس|ریفنڈ|تبدیل)/i,
      en: "↩️ You can return or exchange items within 7 days of delivery — unworn and with tags attached. Full details are on the Terms & Conditions page.",
      ur: "↩️ Aap 7 din ke andar item wapas ya exchange kar sakte hain — unworn aur tags ke saath. Poori tafseel Terms & Conditions page par hai." },
    { test: /(payment|pay\b|cod|cash on delivery|easypaisa|jazzcash|card|debit|credit|ادائیگی|پیسے|کیش)/i,
      en: "💳 We accept Cash on Delivery (COD), Easypaisa, JazzCash, and debit/credit cards. You pick your method at checkout.",
      ur: "💳 Hum Cash on Delivery (COD), Easypaisa, JazzCash, aur debit/credit card lete hain. Checkout par apna tareeqa chun sakte hain." },
    { test: /(size|sizing|\bfit\b|size chart|size guide|ناپ|سائز)/i,
      en: "📏 Every product has sizes S, M, L and XL (accessories are One Size). Open a product and choose your size before adding to cart.",
      ur: "📏 Har product par sizes S, M, L, XL hoti hain (accessories One Size). Product khol kar size chunein, phir cart mein add karein." },
    { test: /(track|tracking|order status|my order|where.*order|order (kahan|kaha|kidhar)|ٹریک|آرڈر کہاں)/i,
      en: "📦 Once your order ships, you'll get a tracking link by email/SMS. If you have an order number (e.g. #AURIGUL-123456), share it with us at hello@aurigul.pk.",
      ur: "📦 Order ship hone par aap ko email/SMS par tracking link mil jayega. Agar order number hai (jaise #AURIGUL-123456) to hello@aurigul.pk par bhej dein." },
    { test: /(discount|promo|coupon|\bcode\b|\bsale\b|\boff\b|offer|deal|رعایت|سیل|کوڈ|ڈسکاؤنٹ)/i,
      en: "🎉 Use code AURIGUL10 for 10% off your first order! Our season-end sale (up to 50% off) is live right now.",
      ur: "🎉 Apne pehle order par AURIGUL10 code se 10% off! Season-end sale (50% tak off) abhi live hai." },
    { test: /(contact|phone|call|email|address|location|store|studio|rabta|رابطہ|پتہ|فون)/i,
      en: "📍 Email us at hello@aurigul.pk or visit the studio: MM Alam Road, Gulberg III, Lahore. Hours: Mon–Sat, 11am–8pm (PKT).",
      ur: "📍 hello@aurigul.pk par email karein ya studio aayein: MM Alam Road, Gulberg III, Lahore. Timings: Mon–Sat, 11am–8pm (PKT)." },
    { test: /(thank|thanks|thx|shukriya|shukria|mehrbani|شکریہ)/i,
      en: "You're most welcome! 😊 Anything else I can help you with?",
      ur: "Koi baat nahi! 😊 Kya main aur kisi cheez mein madad kar sakta hoon?" },
    { test: /(bye|goodbye|khuda hafiz|allah hafiz|alvida|خدا حافظ)/i,
      en: "Thanks for visiting AURIGUL — take care and happy shopping! 👋",
      ur: "AURIGUL visit karne ka shukriya — apna khayal rakhein, happy shopping! 👋" },
  ];

  const FALLBACK = {
    en: "I'm not fully sure about that 🤔 I can show products (try “show men”, “embroidered kurta”, “handbags”), or help with delivery, payment, returns, sizes and offers.",
    ur: "Mujhe is ka theek andaza nahi 🤔 Main products dikha sakta hoon (“show men”, “kurta dikhao”, “handbags”), ya delivery, payment, returns, sizes aur offers mein madad kar sakta hoon."
  };

  /* ---------- Product search ----------
     Everything below runs in the visitor's browser against the catalogue
     already loaded by main.js. No network call, no key, no backend. */

  const SYN = {
    /* Women */
    kurta:["kurta","kurti"], kurti:["kurti","kurta"], suit:["suit"], suits:["suit"],
    shirt:["shirt","kameez"], top:["blouse","shirt","kurti"], blouse:["blouse"], blouses:["blouse"],
    dress:["kurta","suit","skirt"], skirt:["skirt"], skirts:["skirt"],
    trouser:["trouser","pant","culotte"], trousers:["trouser","pant","culotte"],
    pant:["trouser","pant","culotte"], pants:["trouser","pant","culotte"],
    bottom:["trouser","pant","culotte","skirt"], bottoms:["trouser","pant","culotte","skirt"],
    shalwar:["kameez","suit"], kameez:["kameez","suit"],
    blazer:["blazer"], blazers:["blazer"], coat:["blazer"], jacket:["blazer"], waistcoat:["blazer"],
    embroidered:["embroider","zari","chikankari","sequin"], embroidery:["embroider","zari","chikankari"],
    kadhai:["embroider","zari"], zari:["zari"], chikankari:["chikankari"], sequin:["sequin"],
    printed:["print"], print:["print"], lawn:["lawn"], floral:["floral"], botanical:["botanical","floral"],
    solid:["solid","plain"], plain:["solid","plain"],
    /* Men */
    bosky:["bosky"], khaddar:["khaddar"], cotton:["cotton"], wash:["wash"],
    /* Accessories */
    bag:["bag","tote","clutch","satchel"], bags:["bag","tote","clutch","satchel"],
    handbag:["handbag","tote","shoulder","satchel"], purse:["clutch","handbag","wallet"],
    clutch:["clutch"], tote:["tote"], vanity:["vanity"],
    scarf:["scarf","stole","shawl"], scarves:["scarf","stole","shawl"],
    dupatta:["scarf","stole","shawl"], stole:["stole"], shawl:["shawl","pashmina"],
    wallet:["wallet","card holder","bifold"], wallets:["wallet","card holder","bifold"],
    /* Fabrics */
    silk:["silk"], linen:["linen"], chiffon:["chiffon"], velvet:["velvet"],
    viscose:["viscose"], wool:["wool"], leather:["leather"], satin:["satin"], denim:["denim"]
  };

  /* Occasions map onto the subcategory slugs that actually suit them. Without
     this, "shaadi ke liye kuch dikhao" matched only the word "dikhao" and
     handed back the first four products in the catalogue — confidently wrong. */
  const OCCASIONS = [
    { test: /(shaadi|shadi|wedding|barat|baraat|mehndi|mayoun|mayun|walima|nikah|dulhan|bridal|شادی|مہندی|بارات)/i,
      subs: ["embroidered", "bosky", "clutches"], label: { en: "for a wedding", ur: "shaadi ke liye" } },
    { test: /(\beid\b|عید)/i,
      subs: ["embroidered", "printed", "bosky", "clutches"], label: { en: "for Eid", ur: "Eid ke liye" } },
    { test: /(party|function|dinner|evening|guest|dawat|دعوت)/i,
      subs: ["embroidered", "blazers", "clutches"], label: { en: "for a party", ur: "party ke liye" } },
    { test: /(office|work\b|job|formal|meeting|daftar|دفتر|آفس)/i,
      subs: ["wash-and-wear", "bosky", "blazers", "solid"], label: { en: "for the office", ur: "office ke liye" } },
    { test: /(casual|rozana|rozmarra|daily|everyday|aam din|روزانہ)/i,
      subs: ["cotton", "printed", "solid", "bottoms"], label: { en: "for everyday", ur: "rozana ke liye" } },
    { test: /(summer|garmi|garmiyon|garmiyan|گرمی)/i,
      subs: ["cotton", "printed"], label: { en: "for summer", ur: "garmi ke liye" } },
    { test: /(winter|sardi|sardiyon|sardiyan|thand|سردی)/i,
      subs: ["khaddar", "blazers", "scarves"], label: { en: "for winter", ur: "sardi ke liye" } }
  ];

  /* The catalogue carries no colour field, so a colour word can only be
     acknowledged, never filtered on. Silently dropping it used to hand back
     unrelated items as though they matched. */
  const COLOUR = /\b(black|white|ivory|cream|beige|tan|brown|grey|gray|navy|blue|green|olive|red|maroon|pink|rose|gold|golden|silver|mustard|rust|charcoal|camel|emerald|teal|plum|burgundy|purple|yellow|orange|kala|kali|safed|neela|neeli|hara|hari|laal|gulabi|peela|peeli|سیاہ|سفید|نیلا|ہرا|لال|گلابی)\b/i;

  /* ---------- Urdu script ----------
     JS word boundaries only understand ASCII, so they never fire inside نیا or
     خواتین and every Urdu-script product query fell through to the fallback.
     These patterns are tested against the raw message instead, unanchored. */
  const UR = {
    women:  /خواتین|زنانہ|لیڈیز|عورت|لڑکی/,
    men:    /مردانہ|مرد|جینٹس|لڑکا/,
    access: /بیگ|پرس|بٹوہ|اسکارف|سکارف|دوپٹہ|شال|کلچ/,
    newOnly:/نیا|نئی|نئے|لیٹسٹ/,
    sale:   /سیل|رعایت|ڈسکاؤنٹ|آفر/,
    show:   /دکھائ|دکھاؤ|دکھا|چاہیے|چاہئے|تلاش|بتائ|کچھ/,
    cheap:  /سستا|سستی|سستے|کم قیمت/,
    costly: /مہنگا|مہنگی|مہنگے/
  };

  const UR_TERMS = [
    [/کرتا|کرتی/,               ["kurta", "kurti"]],
    [/قمیض|شرٹ/,                ["shirt", "kameez"]],
    [/سوٹ/,                      ["suit"]],
    [/شلوار/,                    ["kameez", "suit"]],
    [/بلیزر|کوٹ|جیکٹ/,          ["blazer"]],
    [/اسکرٹ|سکرٹ/,              ["skirt"]],
    [/کڑھائی|کشیدہ/,            ["embroider", "zari", "chikankari"]],
    [/پرنٹ/,                     ["print"]],
    [/سادہ/,                     ["solid", "plain"]],
    [/ہینڈ بیگ|بیگ/,            ["bag", "tote", "handbag", "satchel"]],
    [/کلچ/,                      ["clutch"]],
    [/بٹوہ|والٹ/,               ["wallet"]],
    [/اسکارف|سکارف|دوپٹہ|شال/, ["scarf", "stole", "shawl"]],
    [/کھدر/,                     ["khaddar"]],
    [/سوتی|کاٹن/,               ["cotton"]],
    [/ریشم|سلک/,                ["silk"]]
  ];

  /* ---------- Typo tolerance ----------
     One vocabulary built from the catalogue plus the synonym keys, so
     "embroiderd" and "handbg" still land. The edit budget is bounded: a word
     has to be long before a second edit is forgiven, or "men" matches "pen". */
  let VOCAB = null;
  function vocabulary() {
    if (VOCAB) return VOCAB;
    const set = new Set(Object.keys(SYN));
    (getProducts() || []).forEach(p => {
      (p.name + " " + p.sub + " " + p.cat).toLowerCase()
        .split(/[^a-z]+/).forEach(w => { if (w.length > 3) set.add(w); });
    });
    VOCAB = set;
    return set;
  }

  /* True when `a` can be turned into `b` within `max` edits. */
  function within(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let best = i;
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return false;                 // the whole row is already too far
      prev = cur;
    }
    return prev[b.length] <= max;
  }

  function correct(word) {
    const v = vocabulary();
    if (v.has(word) || word.length < 4) return word;
    const max = word.length >= 7 ? 2 : 1;
    let best = null, bestGap = Infinity;
    for (const k of v) {
      if (within(word, k, max) && Math.abs(k.length - word.length) < bestGap) {
        best = k; bestGap = Math.abs(k.length - word.length);
        if (bestGap === 0) break;
      }
    }
    return best || word;
  }

  /* ---------- Budget ----------
     Shoppers write a budget a dozen ways: "under 3000", "3 hazar tak",
     "5k se kam", "2000 se 5000". They all end up as {min, max}. */
  function parseBudget(q) {
    const nums = [];
    const re = /(?:rs\.?\s*)?(\d[\d,]*(?:\.\d+)?)\s*(k\b|hazaar|hazar|hzar|thousand)?/gi;
    let m;
    while ((m = re.exec(q)) !== null) {
      let n = parseFloat(m[1].replace(/,/g, ""));
      if (!isFinite(n)) continue;
      if (m[2]) n *= 1000;
      if (n < 300) continue;               // "size 38", the code AURIGUL10 — not a budget
      nums.push(Math.round(n));
    }
    if (!nums.length) return null;

    const under = /(under|below|less than|cheaper than|upto|up to|\bmax\b|maximum|se kam|se neech|se sasta|tak\b|ke andar)/i.test(q);
    const over  = /(over|above|more than|se zyada|se ziada|se upar|se mehnga|\bmin\b|minimum|at least)/i.test(q);
    const range = nums.length >= 2 && /(between|\bse\b|\bto\b|\baur\b|darmiyan|درمیان)/i.test(q);

    if (range) return { min: Math.min.apply(null, nums), max: Math.max.apply(null, nums) };
    if (over && !under) return { min: nums[0], max: null };
    if (under) return { min: null, max: nums[0] };
    // A bare figure sitting next to a money word is a ceiling — that is what people mean.
    if (/(price|budget|\brs\b|rupee|rupay|paise|\bka\b|\bke\b|wala|wali|walay)/i.test(q)) return { min: null, max: nums[0] };
    return null;
  }

  /* ---------- Reading the whole message ---------- */
  function parseQuery(text) {
    const raw = " " + text.toLowerCase() + " ";
    const words = raw.replace(/[^\p{L}\p{N}]+/gu, " ").trim().split(/\s+/).filter(Boolean);
    const fixed = words.map(correct);
    const q = " " + fixed.join(" ") + " ";

    let cat = null;
    if (/\b(wom[ae]n|womens|ladies|lady|girl|girls|female|zanana|khawateen)\b/.test(q) || UR.women.test(raw)) cat = "Women";
    else if (/\b(men|mens|man|male|gents|guys|mard|mardana|larka|larkay)\b/.test(q) || UR.men.test(raw)) cat = "Men";
    else if (/\b(accessor\w*|bag|bags|handbag\w*|clutch\w*|purse|wallet\w*|scarf|scarves|dupatta|stole|shawl|vanity)\b/.test(q) || UR.access.test(raw)) cat = "Accessories";

    const subs = [];
    let occasion = null;
    for (const o of OCCASIONS) {
      if (o.test.test(raw)) { occasion = o; o.subs.forEach(function (s) { subs.push(s); }); break; }
    }

    const terms = [];
    fixed.forEach(function (w) { if (SYN[w]) terms.push.apply(terms, SYN[w]); });
    UR_TERMS.forEach(function (pair) { if (pair[0].test(raw)) terms.push.apply(terms, pair[1]); });

    const newOnly  = /\b(new|newest|latest|arrival\w*|naya|nayi|naye|nai)\b/.test(q) || UR.newOnly.test(raw);
    const saleOnly = /\b(sale|discount\w*|deal\w*|offer\w*|reduced|clearance|سیل|رعایت)\b/.test(q) || UR.sale.test(raw);

    let sort = null;
    if (/\b(sasta|sasti|saste|cheap\w*|budget|cheapest|affordable)\b/.test(q) || UR.cheap.test(raw)) sort = "low";
    else if (/\b(mehnga|mehngi|expensive|premium|luxury|costliest)\b/.test(q) || UR.costly.test(raw)) sort = "high";
    else if (/\b(best|top|popular|rated|rating|behtareen)\b/.test(q)) sort = "rated";

    const budget = parseBudget(q);
    const colour = COLOUR.test(raw) ? (raw.match(COLOUR) || [])[0] : null;
    const showVerb = /\b(show|dikha\w*|dekh\w*|display|browse|see|find|need|want|looking|suggest|recommend|outfit\w*|clothes|kapr[ae]y?|articles|items|products|collection|chahiye|chahye|batao)\b/.test(q) || UR.show.test(raw);

    return { cat: cat, subs: subs, terms: terms, occasion: occasion, newOnly: newOnly,
             saleOnly: saleOnly, sort: sort, budget: budget, colour: colour, showVerb: showVerb };
  }

  /* ---------- Ranking ----------
     Scored rather than filtered. The old version AND-ed every clue together,
     so a single unknown word emptied the results; now a weak clue only ranks
     lower instead of erasing everything. */
  function relevance(p, ctx) {
    let signal = 0;
    if (ctx.subs.length && ctx.subs.indexOf(p.subSlug) !== -1) signal += 4;
    if (ctx.terms.length) {
      const hay = (p.name + " " + (p.sub || "")).toLowerCase();
      const seen = {};
      ctx.terms.forEach(function (t) {
        if (seen[t]) return;
        seen[t] = 1;
        if (hay.indexOf(t) !== -1) signal += 2;
      });
    }
    return signal;
  }

  function searchProducts(text) {
    const products = getProducts();
    if (!products) return null;
    const ctx = parseQuery(text);

    const anyClue = ctx.cat || ctx.subs.length || ctx.terms.length ||
                    ctx.newOnly || ctx.saleOnly || ctx.budget || ctx.showVerb || ctx.sort;
    if (!anyClue) return null;                        // not a product request at all

    // Hard filters — these are promises, not hints.
    let list = products.slice();
    if (ctx.cat)      list = list.filter(function (p) { return p.cat === ctx.cat; });
    if (ctx.newOnly)  list = list.filter(function (p) { return p.badge === "New"; });
    if (ctx.saleOnly) list = list.filter(function (p) { return p.badge === "Sale" || p.old; });

    let relaxedBudget = false;
    if (ctx.budget) {
      const inBudget = list.filter(function (p) {
        return (ctx.budget.min == null || p.price >= ctx.budget.min) &&
               (ctx.budget.max == null || p.price <= ctx.budget.max);
      });
      if (inBudget.length) list = inBudget;
      else { relaxedBudget = true; list = list.slice().sort(function (a, b) { return a.price - b.price; }); }
    }

    // Soft ranking — keep only what the clues actually touch, if anything does.
    let looseMatch = false;
    if (ctx.subs.length || ctx.terms.length) {
      const scored = list.map(function (p) { return { p: p, s: relevance(p, ctx) }; })
                         .filter(function (x) { return x.s > 0; });
      if (scored.length) {
        scored.sort(function (a, b) { return b.s - a.s || (b.p.rating || 0) - (a.p.rating || 0); });
        list = scored.map(function (x) { return x.p; });
      } else {
        looseMatch = true;                 // nothing matched — say so rather than bluff
      }
    }

    if (ctx.sort === "low")        list = list.slice().sort(function (a, b) { return a.price - b.price; });
    else if (ctx.sort === "high")  list = list.slice().sort(function (a, b) { return b.price - a.price; });
    else if (ctx.sort === "rated") list = list.slice().sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
    else if (!ctx.subs.length && !ctx.terms.length) {
      // No ranking signal at all — spread the sample across categories instead
      // of handing back whichever four happen to sit first in the array.
      const byCat = {};
      list.forEach(function (p) { (byCat[p.cat] = byCat[p.cat] || []).push(p); });
      const cats = Object.keys(byCat), spread = [];
      for (let i = 0; cats.some(function (c) { return byCat[c][i]; }); i++)
        cats.forEach(function (c) { if (byCat[c][i]) spread.push(byCat[c][i]); });
      list = spread;
    }

    return { list: list, ctx: ctx, relaxedBudget: relaxedBudget, looseMatch: looseMatch };
  }

  /* ---------- Wording the answer ---------- */
  function introFor(res, lang, total, showing) {
    const ctx = res.ctx;
    const bits = [];
    if (ctx.newOnly)  bits.push(lang === "ur" ? "nayi" : "new");
    if (ctx.saleOnly) bits.push(lang === "ur" ? "sale wali" : "on-sale");
    const cat = ctx.cat ? ctx.cat.toLowerCase() : "";
    const occ = ctx.occasion ? ctx.occasion.label[lang] : "";

    let budget = "";
    if (ctx.budget && !res.relaxedBudget) {
      if (ctx.budget.min != null && ctx.budget.max != null) budget = money(ctx.budget.min) + "–" + money(ctx.budget.max);
      else if (ctx.budget.max != null) budget = (lang === "ur" ? money(ctx.budget.max) + " se kam" : "under " + money(ctx.budget.max));
      else budget = (lang === "ur" ? money(ctx.budget.min) + " se upar" : "over " + money(ctx.budget.min));
    }

    const parts = bits.concat([cat, occ, budget]).filter(Boolean).join(" ");
    const count = total > showing
      ? (lang === "ur" ? total + " mein se " + showing : showing + " of " + total)
      : String(total);

    return lang === "ur"
      ? "Ye " + count + " cheezen mili" + (parts ? " — " + parts : "") + ":"
      : "Here " + (total === 1 ? "is" : "are") + " " + count + (parts ? " " + parts : "") +
        " piece" + (total === 1 ? "" : "s") + ":";
  }

  function notesFor(res, lang) {
    const out = [];
    if (res.ctx.colour)
      out.push(lang === "ur"
        ? "Colour ke hisaab se filter abhi nahi kar sakta — \"" + res.ctx.colour.trim() + "\" chhor kar baqi par match kiya hai."
        : "I can't filter by colour yet, so I matched everything except \"" + res.ctx.colour.trim() + "\".");
    if (res.relaxedBudget)
      out.push(lang === "ur"
        ? "Us budget mein kuch nahi tha — ye sab se kam qeemat wali cheezen hain."
        : "Nothing sat inside that budget, so here are the lowest-priced pieces instead.");
    if (res.looseMatch)
      out.push(lang === "ur"
        ? "Bilkul waisa to nahi mila — ye qareeb tareen hain."
        : "No exact match for that, so these are the nearest pieces.");
    return out;
  }

  /* ---------- Language ---------- */
  function detectLang(t) {
    if (/[؀-ۿ]/.test(t)) return "ur";
    if (/\b(hai|hain|kya|kaise|kaisay|kaisa|kahan|kahaan|kab|kitne|kitna|kitni|madad|shukriya|shukria|salam|salaam|assalam|aoa|adaab|adab|alaikum|walaikum|karo|karna|karun|chahiye|chahye|mujhe|mera|meri|apka|aapka|aap|nahi|nahin|acha|accha|theek|hoga|krna|kaam|paisa|paise|wapsi|wapas|kapre|kapray|dikhao|dikha|dekhao|sasta|sasti|mehnga|naya|nayi|shaadi|shadi|hazar|hazaar|liye|wali|wala|cheez|cheezen)\b/i.test(t)) return "ur";
    return "en";
  }

  function intentReply(text) {
    const lang = detectLang(text);
    for (const it of INTENTS) if (it.test.test(text)) return { text: it[lang], quick: it.quick, matched: true };
    return { text: FALLBACK[lang], matched: false };
  }

  /* ---------- Init / UI ---------- */
  function init() {
    document.body.insertAdjacentHTML("beforeend", CHAT_HTML);
    const fab = document.getElementById("chatFab");
    const panel = document.getElementById("chatPanel");
    const body = document.getElementById("chatBody");
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const hasToTop = !!document.querySelector(".to-top");
    let greeted = false;

    const selection = new Map();     // id -> product
    let summaryEl = null;

    const scrollDown = () => { body.scrollTop = body.scrollHeight; };

    function addMsg(text, who) {
      const el = document.createElement("div");
      el.className = "chat-msg chat-msg--" + who;
      el.textContent = text;
      body.appendChild(el);
      scrollDown();
    }

    function addQuick() {
      const wrap = document.createElement("div");
      wrap.className = "chat-quick";
      ["Show Women", "Show Men", "New in", "Under Rs 5,000", "On sale", "Delivery"].forEach(label => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.addEventListener("click", () => handleUser(label));
        wrap.appendChild(b);
      });
      body.appendChild(wrap);
      scrollDown();
    }

    /* Selection summary (live total) */
    function renderSummary() {
      if (selection.size === 0) { if (summaryEl) { summaryEl.remove(); summaryEl = null; } return; }
      if (!summaryEl) summaryEl = document.createElement("div");
      summaryEl.className = "chat-summary";
      const items = [...selection.values()];
      const total = items.reduce((s, p) => s + p.price, 0);

      summaryEl.innerHTML = "";
      const row = document.createElement("div");
      row.className = "chat-summary__row";
      const label = document.createElement("span");
      label.textContent = `${items.length} item${items.length === 1 ? "" : "s"} selected`;
      const tot = document.createElement("span");
      tot.className = "chat-summary__total";
      tot.textContent = money(total);
      row.appendChild(label); row.appendChild(tot);

      const acts = document.createElement("div");
      acts.className = "chat-summary__actions";
      const addBtn = document.createElement("button");
      addBtn.className = "primary";
      addBtn.textContent = "🛒 Add to cart";
      addBtn.addEventListener("click", () => {
        if (window.AURIGUL && window.AURIGUL.addToCart) {
          items.forEach(p => window.AURIGUL.addToCart(p.id));
          addMsg(`Added ${items.length} item${items.length === 1 ? "" : "s"} to your cart (${money(total)}). 🛍️`, "bot");
        } else {
          addMsg("Please open the Shop to add these to your cart 🛍️", "bot");
        }
        selection.clear();
        renderSummary();
      });
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Clear";
      clearBtn.addEventListener("click", () => { selection.clear(); document.querySelectorAll(".chat-product.selected").forEach(c => { c.classList.remove("selected"); const b = c.querySelector(".chat-product__select"); if (b) b.textContent = "+"; }); renderSummary(); });
      acts.appendChild(addBtn); acts.appendChild(clearBtn);

      summaryEl.appendChild(row); summaryEl.appendChild(acts);
      body.appendChild(summaryEl);   // keep it at the bottom
      scrollDown();
    }

    function toggleSelect(p, card, btn) {
      if (selection.has(p.id)) { selection.delete(p.id); card.classList.remove("selected"); btn.textContent = "+"; }
      else { selection.set(p.id, p); card.classList.add("selected"); btn.textContent = "✓"; }
      renderSummary();
    }

    function renderCards(list) {
      const wrap = document.createElement("div");
      wrap.className = "chat-products";
      list.forEach(p => {
        const card = document.createElement("div");
        card.className = "chat-product" + (selection.has(p.id) ? " selected" : "");

        const img = document.createElement("img");
        img.src = p.img; img.alt = p.name; img.loading = "lazy";
        img.addEventListener("error", () => { img.removeAttribute("src"); img.style.background = "var(--bg-alt)"; });

        const info = document.createElement("div");
        info.className = "chat-product__info";
        const name = document.createElement("div");
        name.className = "chat-product__name"; name.textContent = p.name;
        const meta = document.createElement("div");
        meta.className = "chat-product__meta"; meta.textContent = p.cat + " · " + money(p.price);
        info.appendChild(name); info.appendChild(meta);

        const btn = document.createElement("button");
        btn.className = "chat-product__select";
        btn.type = "button";
        btn.textContent = selection.has(p.id) ? "✓" : "+";
        btn.setAttribute("aria-label", "Select " + p.name);
        btn.addEventListener("click", () => toggleSelect(p, card, btn));

        card.appendChild(img); card.appendChild(info); card.appendChild(btn);
        wrap.appendChild(card);
      });
      body.appendChild(wrap);
      scrollDown();
      renderSummary();
    }

    function replyTotal() {
      const items = [...selection.values()];
      if (!items.length) { addMsg("You haven't selected any items yet — show some products and tap ➕ to pick them.", "bot"); return; }
      const total = items.reduce((s, p) => s + p.price, 0);
      const lines = items.map(p => `• ${p.name} — ${money(p.price)}`).join("\n");
      addMsg(`Here's your selection:\n${lines}\n\nTotal: ${money(total)} for ${items.length} item${items.length === 1 ? "" : "s"}.`, "bot");
    }

    function respond(text) {
      const q = text.toLowerCase();
      const lang = detectLang(text);

      // 1) more of whatever was just shown
      if (lastShown && lastShown < lastList.length &&
          /\b(more|aur|mazeed|next|baqi|aage)\b/.test(q)) {
        setTimeout(() => showMore(lang), 380); return;
      }
      // 2) total of the current selection
      if (selection.size > 0 && /\b(total|calculate|calcula\w*|sum|hisab|jama|kitn[ea]|kitni|how much|add up)\b/.test(q)) {
        setTimeout(replyTotal, 420); return;
      }
      // 3) product search
      const res = searchProducts(text);
      if (res && res.list.length) {
        setTimeout(() => {
          notesFor(res, lang).forEach(n => addMsg(n, "bot"));
          lastList = res.list; lastShown = 0;
          addMsg(introFor(res, lang, res.list.length, Math.min(PAGE, res.list.length)) +
                 "  (tap \u2795 to select, I'll total it up \u{1F4B0})", "bot");
          showMore(lang);
        }, 480);
        return;
      }
      if (res) {
        // It was a product request; the filters simply left nothing. Say that
        // plainly rather than falling through to a generic "I don't know".
        setTimeout(() => addMsg(lang === "ur"
          ? "Is par kuch nahi mila \u{1F641} Budget barha kar ya doosri category try karein \u2014 ya sirf \u201csab dikhao\u201d likh dein."
          : "Nothing matched that \u{1F641} Try widening the budget or another category \u2014 or just say \u201cshow all\u201d.", "bot"), 450);
        return;
      }
      // 4) support intents
      const r = intentReply(text);
      setTimeout(() => { addMsg(r.text, "bot"); if (r.quick) addQuick(); }, 450);
    }

    /* Results are paged rather than truncated. Showing four out of thirty and
       saying nothing made the catalogue look far smaller than it really is. */
    const PAGE = 4;
    let lastList = [], lastShown = 0;

    function showMore(lang) {
      const slice = lastList.slice(lastShown, lastShown + PAGE);
      if (!slice.length) return;
      lastShown += slice.length;
      renderCards(slice);

      const left = lastList.length - lastShown;
      if (left > 0) {
        const wrap = document.createElement("div");
        wrap.className = "chat-quick";
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = lang === "ur" ? "Aur " + Math.min(PAGE, left) + " dikhao"
                                      : "Show " + Math.min(PAGE, left) + " more";
        b.addEventListener("click", () => { wrap.remove(); showMore(lang); });
        wrap.appendChild(b);
        body.appendChild(wrap);
        scrollDown();
      }
    }


    function handleUser(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg(text, "user");
      respond(text);
    }

    function openChat() {
      panel.classList.add("open");
      fab.classList.add("open");
      if (!greeted) {
        greeted = true;
        setTimeout(() => {
          addMsg("Hi! 👋 I'm the AURIGUL Assistant. Try “embroidered kurta”, “shaadi ke liye kuch dikhao”, “under 3000”, “new in” or “on sale”. Pick a few and I’ll total the price. I speak English, Urdu & Roman Urdu.", "bot");
          addQuick();
        }, 250);
      }
      setTimeout(() => input.focus(), 300);
    }
    function closeChat() { panel.classList.remove("open"); fab.classList.remove("open"); }

    fab.addEventListener("click", () => panel.classList.contains("open") ? closeChat() : openChat());
    document.getElementById("chatClose").addEventListener("click", closeChat);
    form.addEventListener("submit", e => { e.preventDefault(); handleUser(input.value); input.value = ""; });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeChat(); });

    if (hasToTop) {
      const onScroll = () => {
        const up = window.scrollY > 500;
        fab.classList.toggle("chat-fab--up", up);
        panel.classList.toggle("chat-panel--up", up);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
