/* =========================================================
   AURIGUL — shop.js  (sort · price · search on the shop page)
   Category comes from the site-wide menu via ?cat=
   Depends on window.AURIGUL from main.js
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const A = window.AURIGUL;
  if (!A) return;

  const grid = document.getElementById("shopGrid");
  const countEl = document.getElementById("shopCount");
  const state = { cat: "All", price: "all", sort: "featured", q: "" };

  const VALID_CATS = ["Women", "Men", "Accessories"];

  // Category is chosen from the hamburger menu → arrives as ?cat=
  const catParam = new URLSearchParams(location.search).get("cat");
  if (catParam && VALID_CATS.includes(catParam)) state.cat = catParam;

  // A distinct hero image per category
  const HERO_IMG = {
    All:         "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
    Women:       "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
    Men:         "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1600&q=80",
    Accessories: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1600&q=80",
  };
  const hero = document.querySelector(".page-hero");
  if (hero && HERO_IMG[state.cat]) hero.style.backgroundImage = `url('${HERO_IMG[state.cat]}')`;

  // Reflect the category in the page hero (title + breadcrumb)
  if (state.cat !== "All") {
    const h1 = document.querySelector(".page-hero h1");
    if (h1) h1.textContent = state.cat;
    const bc = document.querySelector(".page-hero .breadcrumb");
    if (bc) bc.innerHTML = `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${state.cat}`;
  }

  /* Highlight the matching top-nav link (Women / Men / Shop) */
  function setActiveNav(cat) {
    document.querySelectorAll(".nav__menu .nav__link").forEach(a => {
      const nav = a.getAttribute("data-nav");
      let on = false;
      if (cat === "Women" && nav === "Women") on = true;
      else if (cat === "Men" && nav === "Men") on = true;
      else if ((cat === "All" || cat === "Accessories") && nav === "All") on = true;
      a.classList.toggle("active", on);
    });
  }

  function apply() {
    let list = A.PRODUCTS.slice();

    if (state.cat !== "All") list = list.filter(p => p.cat === state.cat);

    if (state.price !== "all") {
      const [min, max] = state.price.split("-").map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }

    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
    }

    switch (state.sort) {
      case "low":  list.sort((a, b) => a.price - b.price); break;
      case "high": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    grid.innerHTML = list.length
      ? list.map(A.productCard).join("")
      : `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:60px 0;">No products match your filters.</p>`;

    const label = state.cat === "All" ? "" : ` in ${state.cat}`;
    countEl.textContent = `Showing ${list.length} product${list.length === 1 ? "" : "s"}${label}`;

    grid.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }

  // Sort (toolbar dropdown)
  document.getElementById("sortSelect")?.addEventListener("change", e => {
    state.sort = e.target.value;
    apply();
  });

  // Search (from the search bar overlay)
  document.getElementById("shopSearch")?.addEventListener("input", e => {
    state.q = e.target.value.trim();
    apply();
  });

  // Initial paint (respects ?cat= from the menu)
  setActiveNav(state.cat);
  apply();
});
