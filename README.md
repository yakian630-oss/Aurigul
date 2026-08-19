# AURIGUL — Clothing Brand Website

A modern, fully responsive multi-page website for a clothing brand. Built with plain
**HTML, CSS and JavaScript** — no build step, no frameworks. Just open and go.

## ✨ Features

- **Fully responsive** — mobile, tablet & desktop (breakpoints at 1024 / 860 / 600 px)
- **Sticky navbar** with slide-in mobile menu + overlay
- **Hero** section with background image, gradient overlay & scroll cue
- **Product grids** rendered from JS data (badges, hover "add to cart", wishlist, ratings)
- **Category popups** — Women / Men / Accessories open a small dropdown of their subcategories
- **91 real products** in 16 subcategories, all images served locally from `images/`
- **Working shopping cart** — add / remove / change quantity, live totals, **saved in `localStorage`**
- **Slide-in cart drawer** + search overlay
- **Shop page** with category + subcategory chips, price filter, live sort & search
- **About** and **Contact** pages (contact form with validation)
- **Scroll-reveal animations**, marquee strips, back-to-top button, toast notifications
- Accessible: keyboard `Esc` closes panels, `aria` labels, `prefers-reduced-motion` support

## 📁 Structure

```
clothing/
├── index.html        # Home page
├── shop.html         # Product listing (category / subcategory / sort / search)
├── about.html        # Brand story + values
├── contact.html      # Contact info + form
├── images/           # All product photography
│   ├── women/        # blazers, blouses, bottoms, embroidered, printed, skirts, solid
│   ├── men/          # bosky, cotton, khaddar, wash-and-wear
│   └── accessories/  # clutches, handbags, scarves, vanity-bags, wallets
├── css/
│   └── style.css     # All styles (theming via CSS variables)
└── js/
    ├── main.js       # PRODUCTS + CATEGORIES data, nav popups, cart, UI (shared)
    ├── shop.js       # Shop page filtering / sorting
    └── chat.js       # Assistant widget
```

## ▶️ How to run

Just **double-click `index.html`** to open it in your browser.

For the best experience (so all paths resolve cleanly) run a tiny local server:

```bash
# Python
python -m http.server 5500
# then open http://localhost:5500
```

Or in VS Code, install the **Live Server** extension → right-click `index.html` → *Open with Live Server*.

## 🎨 Make it yours

| Change | Where |
|---|---|
| Brand name "AURIGUL" | Search & replace `AURIGUL` in the `.html` files |
| Colours | `:root` variables at the top of `css/style.css` |
| Fonts | `<link>` in each `.html` + `--serif` / `--sans` variables |
| Products (name, price, image) | `PRODUCTS` array at the top of `js/main.js` |
| Categories & nav popups | `CATEGORIES` array in `js/main.js` (drives the dropdowns, chips and home tiles) |
| Announcement / promo text | Top of each `.html` |

> **Images** all live in `images/<category>/<subcategory>/` and are referenced from the
> `PRODUCTS` array — the site works completely offline. To add a product, drop the photo in the
> right folder and add a row to `PRODUCTS`. A built-in placeholder shows if an image ever fails
> to load. Adding a whole new subcategory means adding it to `CATEGORIES` too.

## 📝 Notes

The cart & forms are front-end only (demo). To take real orders you'd connect a backend or a
service like Shopify, Stripe Checkout or a form provider (Formspree, etc.).
