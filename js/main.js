/* =========================================================
   AURIGUL — main.js
   Product data, cart (localStorage), UI interactions
   Prices in PKR (Pakistan)
   ========================================================= */

/* ---------- Product catalogue (prices in PKR) ---------- */
const PRODUCTS = [
  { id: 1,  name: "Linen Blend Shirt",     cat: "Women", price: 3490,  old: null,  img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", badge: "New",  rating: 5 },
  { id: 2,  name: "Oversized Wool Coat",   cat: "Women", price: 12900, old: 16500, img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80", badge: "Sale", rating: 5 },
  { id: 3,  name: "Classic Denim Jacket",  cat: "Men",   price: 5990,  old: null,  img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80", badge: null,   rating: 4 },
  { id: 4,  name: "Ribbed Knit Sweater",   cat: "Women", price: 4290,  old: null,  img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80", badge: "New",  rating: 5 },
  { id: 5,  name: "Tailored Chino Pants",  cat: "Men",   price: 4990,  old: null,  img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80", badge: null,   rating: 4 },
  { id: 6,  name: "Silk Slip Dress",       cat: "Women", price: 7900,  old: 9900,  img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80", badge: "Sale", rating: 5 },
  { id: 7,  name: "Cotton Crew Tee",       cat: "Men",   price: 1890,  old: null,  img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80", badge: null,   rating: 4 },
  { id: 8,  name: "Leather Crossbody Bag", cat: "Accessories", price: 8900, old: null, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80", badge: "New", rating: 5 },
  { id: 9,  name: "Pleated Midi Skirt",    cat: "Women", price: 4590,  old: null,  img: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80", badge: null,   rating: 4 },
  { id: 10, name: "Merino Roll Neck",      cat: "Men",   price: 5690,  old: null,  img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80", badge: null,   rating: 5 },
  { id: 11, name: "Structured Blazer",     cat: "Women", price: 9900,  old: 12900, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80", badge: "Sale", rating: 5 },
  { id: 12, name: "Canvas Sneakers",       cat: "Accessories", price: 5490, old: null, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80", badge: null, rating: 4 },
  { id: 13, name: "Relaxed Linen Trouser", cat: "Women", price: 4490,  old: null,  img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80", badge: "New", rating: 4 },
  { id: 14, name: "Wrap Midi Dress",       cat: "Women", price: 6900,  old: null,  img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=600&q=80", badge: null, rating: 5 },
  { id: 15, name: "Wool Felt Hat",         cat: "Accessories", price: 3290, old: 4290, img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80", badge: "Sale", rating: 4 },
  { id: 16, name: "Quilted Puffer Vest",   cat: "Women", price: 7490,  old: null,  img: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?auto=format&fit=crop&w=600&q=80", badge: "New", rating: 5 },
];

/* Inline SVG placeholder shown if a product image fails to load.
   Quotes are URL-encoded (%27) so the string is safe inside the
   single-quoted onerror="...this.src='...'" attribute. */
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27300%27%20height=%27400%27%3E%3Crect%20width=%27300%27%20height=%27400%27%20fill=%27%23ede7de%27/%3E%3Ctext%20x=%2750%25%27%20y=%2750%25%27%20font-family=%27serif%27%20font-size=%2722%27%20fill=%27%239a6a45%27%20text-anchor=%27middle%27%20dominant-baseline=%27middle%27%3EAURIGUL%3C/text%3E%3C/svg%3E";

/* PKR money formatting — whole rupees, no decimals */
const money = n => "Rs " + Math.round(n).toLocaleString("en-US");
const starStr = r => "★★★★★☆☆☆☆☆".slice(5 - r, 10 - r);
const priceHTML = p => p.old
  ? `<del>${money(p.old)}</del><ins>${money(p.price)}</ins>`
  : money(p.price);

/* Short marketing copy for the product detail view */
const FABRIC = {
  Women:       "Cut from a soft, breathable fabric with a beautiful drape.",
  Men:         "A durable, comfortable weave tailored for an everyday modern fit.",
  Accessories: "Crafted from quality materials with careful attention to every detail.",
};
const productDesc = p =>
  `The ${p.name} is a standout piece from our ${p.cat.toLowerCase()} line. ${FABRIC[p.cat] || FABRIC.Accessories} Designed in-house and finished by hand — an easy, versatile addition to your everyday wardrobe.`;
const sizesFor = p => (p.cat === "Accessories" ? ["One Size"] : ["S", "M", "L", "XL"]);

/* ---------- Product card markup ---------- */
function productCard(p) {
  const badge = p.badge
    ? `<span class="product__badge ${p.badge === "Sale" ? "product__badge--sale" : ""}">${p.badge}</span>`
    : "";
  return `
  <article class="product reveal" data-cat="${p.cat}" data-id="${p.id}">
    <div class="product__media">
      ${badge}
      <button class="product__fav" aria-label="Add to wishlist" data-fav="${p.id}">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      </button>
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
      <button class="product__add" data-add="${p.id}">Add to cart</button>
    </div>
    <div class="product__info">
      <div>
        <h3 class="product__name">${p.name}</h3>
        <p class="product__cat">${p.cat}</p>
      </div>
      <p class="product__price">${priceHTML(p)}</p>
    </div>
    <div class="product__stars">${starStr(p.rating)}</div>
  </article>`;
}

function renderInto(elId, list) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = list.map(productCard).join("");
}

/* ---------- Cart (persisted) ---------- */
const CART_KEY = "aura_cart";
let cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

const saveCart = () => localStorage.setItem(CART_KEY, JSON.stringify(cart));

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const line = cart.find(x => x.id === id);
  if (line) line.qty += qty;
  else cart.push({ id, name: p.name, price: p.price, img: p.img, cat: p.cat, qty });
  saveCart();
  renderCart();
  toast(`${p.name} added to cart`);
  bumpCart();
}

function changeQty(id, delta) {
  const line = cart.find(x => x.id === id);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}

function removeLine(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function cartTotals() {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const total = cart.reduce((s, x) => s + x.qty * x.price, 0);
  return { count, total };
}

function renderCart() {
  const { count, total } = cartTotals();
  ["cartCount", "drawerCount"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = count;
  });
  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = money(total);

  const box = document.getElementById("cartItems");
  if (!box) return;

  if (!cart.length) {
    box.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" width="54" height="54"><path d="M6 2l-2 4v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4H6zM4 6h16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
        <p>Your cart is empty.</p>
      </div>`;
    return;
  }

  box.innerHTML = cart.map(x => `
    <div class="cart-item">
      <img class="cart-item__img" src="${x.img}" alt="${x.name}" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
      <div>
        <p class="cart-item__name">${x.name}</p>
        <p class="cart-item__meta">${x.cat}</p>
        <div class="qty">
          <button data-dec="${x.id}" aria-label="Decrease">−</button>
          <span>${x.qty}</span>
          <button data-inc="${x.id}" aria-label="Increase">+</button>
        </div>
      </div>
      <div class="cart-item__right">
        <span class="cart-item__price">${money(x.price * x.qty)}</span>
        <button class="cart-item__remove" data-rm="${x.id}">Remove</button>
      </div>
    </div>`).join("");
}

function bumpCart() {
  const btn = document.getElementById("cartOpen");
  if (!btn) return;
  btn.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
    { duration: 350, easing: "ease-out" }
  );
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- Panels (menu / search / cart / filters) ---------- */
function openPanel(el, overlay) { el && el.classList.add("open"); overlay && overlay.classList.add("show"); document.body.style.overflow = "hidden"; }
function closePanel(el, overlay) { el && el.classList.remove("open"); overlay && overlay.classList.remove("show"); document.body.style.overflow = ""; }

/* ---------- Scroll reveal ----------
   Position-based (not IntersectionObserver) so fast scrolls and anchor
   jumps can never skip a section and leave it invisible. */
function initReveal() {
  const els = [...document.querySelectorAll(".reveal")];
  if (!els.length) return;
  let ticking = false;

  function reveal() {
    ticking = false;
    const trigger = window.innerHeight * 0.9;
    for (let i = els.length - 1; i >= 0; i--) {
      if (els[i].getBoundingClientRect().top < trigger) {
        els[i].classList.add("in");
        els.splice(i, 1);
      }
    }
    if (!els.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(reveal); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  reveal(); // reveal whatever is already on screen
}

/* ---------- Product detail (quick view) modal ---------- */
const PRODUCT_MODAL_HTML = `
  <div class="pmodal" id="productModal" aria-hidden="true">
    <div class="pmodal__overlay" id="pmodalOverlay"></div>
    <div class="pmodal__dialog" role="dialog" aria-modal="true" aria-labelledby="pmName">
      <button class="pmodal__close" id="pmodalClose" aria-label="Close">&times;</button>
      <div class="pmodal__media">
        <span class="pmodal__badge" id="pmBadge"></span>
        <img id="pmImg" src="" alt="" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
      </div>
      <div class="pmodal__info">
        <p class="pmodal__cat" id="pmCat"></p>
        <h2 class="pmodal__name" id="pmName"></h2>
        <div class="pmodal__stars" id="pmStars"></div>
        <p class="pmodal__price" id="pmPrice"></p>
        <p class="pmodal__desc" id="pmDesc"></p>
        <span class="pmodal__label">Size</span>
        <div class="size-list" id="pmSizeList"></div>
        <div class="pmodal__qtyrow">
          <span class="pmodal__label">Quantity</span>
          <div class="qty">
            <button id="pmDec" aria-label="Decrease">−</button>
            <span id="pmQty">1</span>
            <button id="pmInc" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="btn btn--dark btn--block" id="pmAdd">Add to cart</button>
        <ul class="pmodal__meta">
          <li>✓ Free delivery on orders over Rs 5,000</li>
          <li>✓ 7-day easy returns · Cash on Delivery available</li>
        </ul>
      </div>
    </div>
  </div>`;

/* ---------- Site-wide slide-in menu (hamburger) ---------- */
const MENU_DRAWER_HTML = `
  <div class="filters-overlay" id="menuOverlay"></div>
  <aside class="filters menu-drawer" id="menuDrawer" aria-hidden="true">
    <button class="filters__close" id="menuClose" aria-label="Close menu">&times;</button>
    <div class="filters__promo">
      <p class="filters__newin">NEW IN</p>
      <p class="filters__sale">+ SEASON END SALE — UPTO 50% OFF</p>
    </div>
    <h4>Shop by Categories</h4>
    <div class="filter-list filter-list--cats">
      <a href="shop.html">All Products</a>
      <a href="shop.html?cat=Women">Women</a>
      <a href="shop.html?cat=Men">Men</a>
      <a href="shop.html?cat=Accessories">Accessories</a>
    </div>
    <h4>Menu</h4>
    <div class="filter-list filter-list--cats">
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </div>
  </aside>`;

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {

  // Render homepage grids if present
  renderInto("productGrid", PRODUCTS.slice(0, 8));
  renderInto("bestGrid", [PRODUCTS[1], PRODUCTS[5], PRODUCTS[10], PRODUCTS[7]]);

  renderCart();
  initReveal();

  // Year in footer
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Header shadow on scroll + back to top
  const header = document.getElementById("header");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Mobile menu
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");
  navToggle && navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
    open ? openPanel(navMenu, navOverlay) : closePanel(navMenu, navOverlay);
  });
  navOverlay && navOverlay.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    closePanel(navMenu, navOverlay);
  });

  // Search overlay
  const searchOverlay = document.getElementById("searchOverlay");
  document.getElementById("searchOpen")?.addEventListener("click", () => {
    searchOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchOverlay.querySelector("input")?.focus(), 200);
  });
  document.getElementById("searchClose")?.addEventListener("click", () => {
    searchOverlay.classList.remove("show");
    document.body.style.overflow = "";
  });

  // Cart drawer
  const drawer = document.getElementById("cartDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");
  const openCart = () => openPanel(drawer, drawerOverlay);
  const closeCart = () => closePanel(drawer, drawerOverlay);
  document.getElementById("cartOpen")?.addEventListener("click", openCart);
  document.getElementById("cartClose")?.addEventListener("click", closeCart);
  document.getElementById("continueBtn")?.addEventListener("click", closeCart);
  drawerOverlay?.addEventListener("click", closeCart);
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) { toast("Your cart is empty"); return; }
    window.location.href = "checkout.html";
  });

  // ----- Site-wide hamburger menu -----
  document.body.insertAdjacentHTML("beforeend", MENU_DRAWER_HTML);
  const menuDrawer = document.getElementById("menuDrawer");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuToggle = document.getElementById("menuToggle");
  const openMenu = () => {
    menuDrawer.classList.add("open"); menuOverlay.classList.add("show");
    menuToggle?.classList.add("open"); menuToggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => {
    menuDrawer.classList.remove("open"); menuOverlay.classList.remove("show");
    menuToggle?.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  menuToggle?.addEventListener("click", () => menuDrawer.classList.contains("open") ? closeMenu() : openMenu());
  menuOverlay?.addEventListener("click", closeMenu);
  document.getElementById("menuClose")?.addEventListener("click", closeMenu);

  // ----- Product detail modal -----
  document.body.insertAdjacentHTML("beforeend", PRODUCT_MODAL_HTML);
  const pmodal      = document.getElementById("productModal");
  const pmodalOv    = document.getElementById("pmodalOverlay");
  const pmSizeList  = document.getElementById("pmSizeList");
  const pmQtyEl     = document.getElementById("pmQty");
  let pmState = { id: null, qty: 1, size: null };

  const closeProduct = () => { pmodal.classList.remove("open"); document.body.style.overflow = ""; };

  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    pmState = { id, qty: 1, size: null };

    document.getElementById("pmImg").src = p.img;
    document.getElementById("pmImg").alt = p.name;
    const badge = document.getElementById("pmBadge");
    badge.textContent = p.badge || "";
    badge.classList.toggle("sale", p.badge === "Sale");
    document.getElementById("pmCat").textContent = p.cat;
    document.getElementById("pmName").textContent = p.name;
    document.getElementById("pmStars").textContent = starStr(p.rating);
    document.getElementById("pmPrice").innerHTML = priceHTML(p);
    document.getElementById("pmDesc").textContent = productDesc(p);

    const sizes = sizesFor(p);
    pmState.size = sizes[0];
    pmSizeList.innerHTML = sizes
      .map((s, i) => `<button data-size="${s}" class="${i === 0 ? "active" : ""}">${s}</button>`)
      .join("");
    pmQtyEl.textContent = "1";

    pmodal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  pmodalOv.addEventListener("click", closeProduct);
  document.getElementById("pmodalClose").addEventListener("click", closeProduct);
  pmSizeList.addEventListener("click", e => {
    const b = e.target.closest("[data-size]");
    if (!b) return;
    pmState.size = b.dataset.size;
    pmSizeList.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
  });
  document.getElementById("pmInc").addEventListener("click", () => { pmState.qty++; pmQtyEl.textContent = pmState.qty; });
  document.getElementById("pmDec").addEventListener("click", () => { if (pmState.qty > 1) { pmState.qty--; pmQtyEl.textContent = pmState.qty; } });
  document.getElementById("pmAdd").addEventListener("click", () => {
    if (!pmState.id) return;
    addToCart(pmState.id, pmState.qty);
    closeProduct();
  });

  // Escape closes everything
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeCart();
      closeProduct();
      closeMenu();
      searchOverlay?.classList.remove("show");
      if (navMenu?.classList.contains("open")) { navMenu.classList.remove("open"); navToggle.classList.remove("open"); closePanel(navMenu, navOverlay); }
      document.body.style.overflow = "";
    }
  });

  // Delegated clicks: add to cart, qty, remove, wishlist, open product
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add) { addToCart(+add.dataset.add); return; }

    const inc = e.target.closest("[data-inc]");
    if (inc) { changeQty(+inc.dataset.inc, 1); return; }

    const dec = e.target.closest("[data-dec]");
    if (dec) { changeQty(+dec.dataset.dec, -1); return; }

    const rm = e.target.closest("[data-rm]");
    if (rm) { removeLine(+rm.dataset.rm); return; }

    const fav = e.target.closest("[data-fav]");
    if (fav) { fav.classList.toggle("active"); toast(fav.classList.contains("active") ? "Added to wishlist" : "Removed from wishlist"); return; }

    // Open product detail when clicking a card (but not its buttons)
    const card = e.target.closest(".product");
    if (card && card.dataset.id && !e.target.closest("button")) { openProduct(+card.dataset.id); return; }
  });

  // Newsletter
  document.getElementById("newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const note = document.getElementById("newsletterNote");
    const input = e.target.querySelector("input");
    if (input.value && /\S+@\S+\.\S+/.test(input.value)) {
      note.textContent = "🎉 Thanks for subscribing! Check your inbox for 10% off.";
      input.value = "";
    } else {
      note.textContent = "Please enter a valid email address.";
    }
  });

  // Expose for shop / checkout pages
  window.AURIGUL = { PRODUCTS, productCard, renderInto, addToCart, openProduct, toast, money, cartTotals, clearCart, getCart: () => cart };
});
