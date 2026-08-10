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
    en: "I'm not fully sure about that 🤔 I can show products (try “show men”, “show dresses”, “jeans”), or help with delivery, payment, returns, sizes and offers.",
    ur: "Mujhe is ka theek andaza nahi 🤔 Main products dikha sakta hoon (“show men”, “dresses dikhao”, “jeans”), ya delivery, payment, returns, sizes aur offers mein madad kar sakta hoon."
  };

  /* ---------- Product search ---------- */
  const SYN = {
    jean:["denim","jean","trouser","chino","pant"], jeans:["denim","jean","trouser","chino","pant"],
    denim:["denim","jean"], pant:["trouser","chino","pant"], pants:["trouser","chino","pant"],
    trouser:["trouser","chino","pant"], chino:["chino"],
    shirt:["shirt"], tee:["tee","crew"], tshirt:["tee","crew"], "t-shirt":["tee","crew"],
    top:["shirt","tee","knit","roll"], dress:["dress"], skirt:["skirt"],
    jacket:["jacket","coat","blazer","puffer","vest"], coat:["coat","jacket"], blazer:["blazer"],
    vest:["vest","puffer"], puffer:["puffer","vest"],
    sweater:["sweater","knit","roll","merino"], knit:["knit","sweater"], jumper:["sweater","knit"],
    hoodie:["sweater","knit"], sneaker:["sneaker"], sneakers:["sneaker"], shoe:["sneaker"], shoes:["sneaker"],
    footwear:["sneaker"], bag:["bag"], hat:["hat"], cap:["hat"],
    linen:["linen"], silk:["silk"], wool:["wool"], knitwear:["knit","sweater"]
  };

  function tryProductSearch(text) {
    const products = getProducts();
    if (!products) return null;
    const q = text.toLowerCase();

    let cat = null;
    if (/\b(wom[ae]n|womens|ladies|girl|female)\b/.test(q)) cat = "Women";
    else if (/\b(men|mens|man|male|gents|guys|mard)\b/.test(q)) cat = "Men";
    else if (/\b(accessor\w*|bag|bags|hat|cap|shoe|shoes|sneaker\w*|footwear|belt)\b/.test(q)) cat = "Accessories";

    const terms = [];
    for (const key in SYN) if (q.includes(key)) terms.push(...SYN[key]);

    const showVerb = /\b(show|dikha\w*|dekh\w*|display|browse|see|find|need|want|looking|suggest|recommend|outfit\w*|clothes|kapr[ae]y?|articles|items|products|collection)\b/.test(q);

    if (!cat && !terms.length && !showVerb) return null;   // not a product request

    let list = products.slice();
    if (cat) list = list.filter(p => p.cat === cat);
    if (terms.length) {
      const uniq = [...new Set(terms)];
      list = list.filter(p => uniq.some(t => p.name.toLowerCase().includes(t)));
    }

    let intro;
    if (!list.length) intro = null;
    else if (cat && terms.length) intro = `Here are some ${cat.toLowerCase()} pieces:`;
    else if (cat) intro = `Here are some ${cat.toLowerCase()} pieces you might like:`;
    else if (terms.length) intro = `Here's what I found:`;
    else intro = `Here are a few pieces from our collection:`;

    return { list, intro };
  }

  /* ---------- Language ---------- */
  function detectLang(t) {
    if (/[؀-ۿ]/.test(t)) return "ur";
    if (/\b(hai|hain|kya|kaise|kaisay|kaisa|kahan|kahaan|kab|kitne|kitna|kitni|madad|shukriya|shukria|salam|salaam|assalam|aoa|adaab|adab|alaikum|walaikum|karo|karna|karun|chahiye|chahye|mujhe|mera|meri|apka|aapka|aap|nahi|nahin|acha|accha|theek|hoga|krna|kaam|paisa|paise|wapsi|wapas|kapre|kapray|dikhao|dikha|dekhao)\b/i.test(t)) return "ur";
    return "en";
  }

  function intentReply(text) {
    const lang = detectLang(text);
    for (const it of INTENTS) if (it.test.test(text)) return { text: it[lang], quick: it.quick };
    return { text: FALLBACK[lang] };
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
      ["Show Women", "Show Men", "Delivery", "Payment", "Returns"].forEach(label => {
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

    function showProducts(list, intro) {
      if (!list || !list.length) {
        addMsg("Sorry, I couldn't find matching items. Try “women”, “men”, “dress”, “jacket”, “sweater”, or browse the Shop page.", "bot");
        return;
      }
      addMsg(intro + "  (tap ➕ to select, I'll total it up 💰)", "bot");
      const wrap = document.createElement("div");
      wrap.className = "chat-products";
      list.slice(0, 4).forEach(p => {
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

      // 1) total / price of the current selection
      if (selection.size > 0 && /\b(total|calculate|calcula\w*|sum|hisab|jama|price|kitn[ea]|kitni|how much|add up)\b/.test(q)) {
        setTimeout(replyTotal, 420); return;
      }
      // 2) product search
      const search = tryProductSearch(text);
      if (search) { setTimeout(() => showProducts(search.list, search.intro), 480); return; }
      // 3) support intents
      const r = intentReply(text);
      setTimeout(() => { addMsg(r.text, "bot"); if (r.quick) addQuick(); }, 450);
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
          addMsg("Hi! 👋 I'm the AURIGUL Assistant. Ask me to show products (e.g. “show men”, “dresses”, “jeans”), pick a few, and I'll total the price. I speak English, Urdu & Roman Urdu.", "bot");
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
