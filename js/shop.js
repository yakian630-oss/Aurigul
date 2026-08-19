/* =========================================================
   AURIGUL — shop.js  (category · subcategory · sort · search)
   Category + subcategory arrive as ?cat=Women&sub=blazers
   Depends on window.AURIGUL from main.js
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const A = window.AURIGUL;
  if (!A) return;

  const grid    = document.getElementById("shopGrid");
  if (!grid) return;

  const params = new URLSearchParams(location.search);
  const state  = { cat: "All", sub: "all", price: "all", sort: "featured", q: "" };

  const catNames = A.CATEGORIES.map(c => c.cat);
  const catParam = params.get("cat");
  if (catParam && catNames.includes(catParam)) state.cat = catParam;

  const subParam = params.get("sub");
  if (subParam && state.cat !== "All" && A.subBySlug(state.cat, subParam)) state.sub = subParam;

  const activeCat = () => A.catByName(state.cat);
  const subName   = () => A.subBySlug(state.cat, state.sub)?.name || "";

  /* ---------- Hero: one banner + title ---------- */

  /* Every edit ships its own wide banner; the unfiltered view falls back to the
     home artwork, which is the only shot not tied to a single category. */
  function heroShot() {
    if (state.sub !== "all") return A.subBySlug(state.cat, state.sub)?.banner;
    return activeCat()?.banner || "images/banners/home/home-01.webp";
  }

  function paintHero() {
    A.paintHeroImage(heroShot());

    const h1 = document.querySelector(".page-hero h1");
    if (h1) h1.textContent = state.sub !== "all" ? subName() : (state.cat === "All" ? "The Collection" : state.cat);
  }

  /* ---------- Filter · sort · render ---------- */
  function apply() {
    let list = A.PRODUCTS.slice();

    if (state.cat !== "All") list = list.filter(p => p.cat === state.cat);
    if (state.sub !== "all") list = list.filter(p => p.subSlug === state.sub);

    if (state.price !== "all") {
      const [min, max] = state.price.split("-").map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }

    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q)  ||
        p.sub.toLowerCase().includes(q));
    }

    switch (state.sort) {
      case "low":  list.sort((a, b) => a.price - b.price); break;
      case "high": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    grid.innerHTML = list.length
      ? list.map(A.productCard).join("")
      : `<p style="grid-column:1/-1;text-align:center;color:var(--muted);padding:60px 0;">No products match your filters.</p>`;

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

  // Initial paint (respects ?cat= and ?sub=)
  paintHero();
  apply();
});
