/* =========================================================
   AURIGUL — main.js
   Product data, cart (localStorage), UI interactions
   Prices in PKR (Pakistan)
   ========================================================= */

/* ---------- Product catalogue (prices in PKR) ---------- */
/* ---------- Catalogue (real AURIGUL stock — images in /images) ---------- */
const PRODUCTS = [
  { id: 1, name: "Tailored Wool Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 12790, old: null, img: "images/women/blazers/blazers-01.webp", badge: "New", rating: 4 },
  { id: 2, name: "Oversized Linen Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 11590, old: null, img: "images/women/blazers/blazers-02.webp", badge: "New", rating: 5 },
  { id: 3, name: "Double-Breasted Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 10190, old: 13790, img: "images/women/blazers/blazers-03.webp", badge: "Sale", rating: 4 },
  { id: 4, name: "Ivory Structured Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 8990, old: null, img: "images/women/blazers/blazers-04.webp", badge: null, rating: 4 },
  { id: 5, name: "Classic Fit Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 12490, old: null, img: "images/women/blazers/blazers-05.webp", badge: null, rating: 5 },
  { id: 6, name: "Cropped Formal Blazer", cat: "Women", sub: "Blazers", subSlug: "blazers", price: 11290, old: null, img: "images/women/blazers/blazers-06.webp", badge: null, rating: 5 },
  { id: 7, name: "Silk Wrap Blouse", cat: "Women", sub: "Blouses", subSlug: "blouses", price: 4390, old: null, img: "images/women/blouses/blouses-01.webp", badge: null, rating: 5 },
  { id: 8, name: "Ruffle Neck Blouse", cat: "Women", sub: "Blouses", subSlug: "blouses", price: 3890, old: null, img: "images/women/blouses/blouses-02.webp", badge: null, rating: 5 },
  { id: 9, name: "Chiffon Tie Blouse", cat: "Women", sub: "Blouses", subSlug: "blouses", price: 5390, old: null, img: "images/women/blouses/blouses-03.webp", badge: "New", rating: 4 },
  { id: 10, name: "Puff Sleeve Blouse", cat: "Women", sub: "Blouses", subSlug: "blouses", price: 4890, old: 6590, img: "images/women/blouses/blouses-04.webp", badge: "Sale", rating: 4 },
  { id: 11, name: "Satin Button Blouse", cat: "Women", sub: "Blouses", subSlug: "blouses", price: 4490, old: null, img: "images/women/blouses/blouses-05.webp", badge: "New", rating: 5 },
  { id: 12, name: "High-Waist Trousers", cat: "Women", sub: "Bottoms", subSlug: "bottoms", price: 3290, old: null, img: "images/women/bottoms/bottoms-01.webp", badge: null, rating: 4 },
  { id: 13, name: "Wide Leg Pants", cat: "Women", sub: "Bottoms", subSlug: "bottoms", price: 3790, old: null, img: "images/women/bottoms/bottoms-02.webp", badge: "New", rating: 4 },
  { id: 14, name: "Straight Cut Culottes", cat: "Women", sub: "Bottoms", subSlug: "bottoms", price: 4290, old: null, img: "images/women/bottoms/bottoms-03.webp", badge: "New", rating: 5 },
  { id: 15, name: "Pleated Cigarette Pants", cat: "Women", sub: "Bottoms", subSlug: "bottoms", price: 4690, old: null, img: "images/women/bottoms/bottoms-04.webp", badge: null, rating: 5 },
  { id: 16, name: "Relaxed Linen Trousers", cat: "Women", sub: "Bottoms", subSlug: "bottoms", price: 3390, old: null, img: "images/women/bottoms/bottoms-05.webp", badge: "New", rating: 5 },
  { id: 17, name: "Hand-Embroidered Kurta", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 12590, old: null, img: "images/women/embroidered/embroidered-01.webp", badge: null, rating: 4 },
  { id: 18, name: "Zari Work Suit", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 14290, old: null, img: "images/women/embroidered/embroidered-02.webp", badge: "New", rating: 4 },
  { id: 19, name: "Thread Embroidered Shirt", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 8890, old: null, img: "images/women/embroidered/embroidered-03.webp", badge: null, rating: 5 },
  { id: 20, name: "Chikankari Kurta", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 10590, old: null, img: "images/women/embroidered/embroidered-04.webp", badge: "New", rating: 4 },
  { id: 21, name: "Sequin Embroidered Suit", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 12290, old: null, img: "images/women/embroidered/embroidered-05.webp", badge: "New", rating: 5 },
  { id: 22, name: "Floral Embroidered Kurti", cat: "Women", sub: "Embroidered", subSlug: "embroidered", price: 13890, old: null, img: "images/women/embroidered/embroidered-06.webp", badge: null, rating: 5 },
  { id: 23, name: "Digital Printed Lawn Suit", cat: "Women", sub: "Printed", subSlug: "printed", price: 4590, old: null, img: "images/women/printed/printed-01.webp", badge: null, rating: 4 },
  { id: 24, name: "Floral Printed Kurta", cat: "Women", sub: "Printed", subSlug: "printed", price: 5290, old: null, img: "images/women/printed/printed-02.webp", badge: null, rating: 5 },
  { id: 25, name: "Geometric Print Shirt", cat: "Women", sub: "Printed", subSlug: "printed", price: 6190, old: null, img: "images/women/printed/printed-03.webp", badge: null, rating: 4 },
  { id: 26, name: "Paisley Printed Suit", cat: "Women", sub: "Printed", subSlug: "printed", price: 6890, old: null, img: "images/women/printed/printed-04.webp", badge: null, rating: 5 },
  { id: 27, name: "Block Printed Kurti", cat: "Women", sub: "Printed", subSlug: "printed", price: 4790, old: null, img: "images/women/printed/printed-05.webp", badge: "New", rating: 5 },
  { id: 28, name: "Abstract Print Kurta", cat: "Women", sub: "Printed", subSlug: "printed", price: 5490, old: 7390, img: "images/women/printed/printed-06.webp", badge: "Sale", rating: 4 },
  { id: 29, name: "Botanical Printed Lawn", cat: "Women", sub: "Printed", subSlug: "printed", price: 6290, old: null, img: "images/women/printed/printed-07.webp", badge: null, rating: 5 },
  { id: 30, name: "Pleated Midi Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 5290, old: 7090, img: "images/women/skirts/skirts-01.webp", badge: "Sale", rating: 5 },
  { id: 31, name: "A-Line Maxi Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 5890, old: null, img: "images/women/skirts/skirts-02.webp", badge: "New", rating: 4 },
  { id: 32, name: "Flared Cotton Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 3990, old: 5390, img: "images/women/skirts/skirts-03.webp", badge: "Sale", rating: 4 },
  { id: 33, name: "Tiered Boho Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 4590, old: null, img: "images/women/skirts/skirts-04.webp", badge: "New", rating: 4 },
  { id: 34, name: "Wrap Front Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 5190, old: null, img: "images/women/skirts/skirts-05.webp", badge: null, rating: 5 },
  { id: 35, name: "Panelled Long Skirt", cat: "Women", sub: "Skirts", subSlug: "skirts", price: 5790, old: null, img: "images/women/skirts/skirts-06.webp", badge: null, rating: 5 },
  { id: 36, name: "Solid Cotton Kurta", cat: "Women", sub: "Solid", subSlug: "solid", price: 3490, old: null, img: "images/women/solid/solid-01.webp", badge: "New", rating: 5 },
  { id: 37, name: "Plain Silk Shirt", cat: "Women", sub: "Solid", subSlug: "solid", price: 3090, old: 4190, img: "images/women/solid/solid-02.webp", badge: "Sale", rating: 4 },
  { id: 38, name: "Solid Linen Kurti", cat: "Women", sub: "Solid", subSlug: "solid", price: 4490, old: null, img: "images/women/solid/solid-03.webp", badge: null, rating: 5 },
  { id: 39, name: "Minimal Solid Suit", cat: "Women", sub: "Solid", subSlug: "solid", price: 3990, old: null, img: "images/women/solid/solid-04.webp", badge: null, rating: 5 },
  { id: 40, name: "Basic Cotton Top", cat: "Women", sub: "Solid", subSlug: "solid", price: 3390, old: 4590, img: "images/women/solid/solid-05.webp", badge: "Sale", rating: 5 },
  { id: 41, name: "Solid Viscose Kurta", cat: "Women", sub: "Solid", subSlug: "solid", price: 4990, old: 6690, img: "images/women/solid/solid-06.webp", badge: "Sale", rating: 4 },
  { id: 42, name: "Everyday Solid Shirt", cat: "Women", sub: "Solid", subSlug: "solid", price: 4390, old: null, img: "images/women/solid/solid-07.webp", badge: null, rating: 4 },
  { id: 43, name: "Premium Bosky Suit", cat: "Men", sub: "Bosky", subSlug: "bosky", price: 7190, old: null, img: "images/men/bosky/bosky-01.webp", badge: null, rating: 4 },
  { id: 44, name: "Classic Bosky Shalwar Kameez", cat: "Men", sub: "Bosky", subSlug: "bosky", price: 7890, old: null, img: "images/men/bosky/bosky-02.webp", badge: "New", rating: 4 },
  { id: 45, name: "Signature Bosky Suit", cat: "Men", sub: "Bosky", subSlug: "bosky", price: 8690, old: null, img: "images/men/bosky/bosky-03.webp", badge: "New", rating: 5 },
  { id: 46, name: "Royal Bosky Kameez", cat: "Men", sub: "Bosky", subSlug: "bosky", price: 9390, old: null, img: "images/men/bosky/bosky-04.webp", badge: null, rating: 4 },
  { id: 47, name: "Luxury Bosky Suit", cat: "Men", sub: "Bosky", subSlug: "bosky", price: 7290, old: null, img: "images/men/bosky/bosky-05.webp", badge: null, rating: 4 },
  { id: 48, name: "Soft Cotton Kameez", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 4290, old: null, img: "images/men/cotton/cotton-01.webp", badge: null, rating: 5 },
  { id: 49, name: "Pure Cotton Suit", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 6190, old: null, img: "images/men/cotton/cotton-02.webp", badge: null, rating: 5 },
  { id: 50, name: "Summer Cotton Shalwar Kameez", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 5590, old: null, img: "images/men/cotton/cotton-03.webp", badge: "New", rating: 4 },
  { id: 51, name: "Cotton Blend Kurta", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 4990, old: null, img: "images/men/cotton/cotton-04.webp", badge: null, rating: 4 },
  { id: 52, name: "Everyday Cotton Suit", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 4390, old: null, img: "images/men/cotton/cotton-05.webp", badge: null, rating: 5 },
  { id: 53, name: "Fine Cotton Kameez", cat: "Men", sub: "Cotton", subSlug: "cotton", price: 6290, old: null, img: "images/men/cotton/cotton-06.webp", badge: "New", rating: 5 },
  { id: 54, name: "Winter Khaddar Suit", cat: "Men", sub: "Khaddar", subSlug: "khaddar", price: 6790, old: null, img: "images/men/khaddar/khaddar-01.webp", badge: "New", rating: 4 },
  { id: 55, name: "Handloom Khaddar Kameez", cat: "Men", sub: "Khaddar", subSlug: "khaddar", price: 5990, old: null, img: "images/men/khaddar/khaddar-02.webp", badge: null, rating: 4 },
  { id: 56, name: "Premium Khaddar Suit", cat: "Men", sub: "Khaddar", subSlug: "khaddar", price: 8190, old: null, img: "images/men/khaddar/khaddar-03.webp", badge: null, rating: 5 },
  { id: 57, name: "Classic Khaddar Shalwar Kameez", cat: "Men", sub: "Khaddar", subSlug: "khaddar", price: 7490, old: null, img: "images/men/khaddar/khaddar-04.webp", badge: "New", rating: 5 },
  { id: 58, name: "Textured Khaddar Suit", cat: "Men", sub: "Khaddar", subSlug: "khaddar", price: 6890, old: 9290, img: "images/men/khaddar/khaddar-05.webp", badge: "Sale", rating: 4 },
  { id: 59, name: "Wash & Wear Formal Suit", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 6390, old: null, img: "images/men/wash-and-wear/wash-and-wear-01.webp", badge: "New", rating: 4 },
  { id: 60, name: "Crease-Free Wash & Wear Suit", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 8590, old: 11590, img: "images/men/wash-and-wear/wash-and-wear-02.webp", badge: "Sale", rating: 5 },
  { id: 61, name: "Executive Wash & Wear Kameez", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 7790, old: null, img: "images/men/wash-and-wear/wash-and-wear-03.webp", badge: "New", rating: 4 },
  { id: 62, name: "Premium Wash & Wear Suit", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 7090, old: null, img: "images/men/wash-and-wear/wash-and-wear-04.webp", badge: null, rating: 4 },
  { id: 63, name: "Classic Wash & Wear Shalwar Kameez", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 6190, old: null, img: "images/men/wash-and-wear/wash-and-wear-05.webp", badge: null, rating: 5 },
  { id: 64, name: "Office Wash & Wear Suit", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 8490, old: null, img: "images/men/wash-and-wear/wash-and-wear-06.webp", badge: null, rating: 5 },
  { id: 65, name: "Everyday Wash & Wear Suit", cat: "Men", sub: "Wash & Wear", subSlug: "wash-and-wear", price: 7590, old: 10190, img: "images/men/wash-and-wear/wash-and-wear-07.webp", badge: "Sale", rating: 4 },
  { id: 66, name: "Embellished Evening Clutch", cat: "Accessories", sub: "Clutches", subSlug: "clutches", price: 4990, old: null, img: "images/accessories/clutches/clutches-01.webp", badge: null, rating: 5 },
  { id: 67, name: "Velvet Party Clutch", cat: "Accessories", sub: "Clutches", subSlug: "clutches", price: 4390, old: null, img: "images/accessories/clutches/clutches-02.webp", badge: null, rating: 4 },
  { id: 68, name: "Beaded Bridal Clutch", cat: "Accessories", sub: "Clutches", subSlug: "clutches", price: 3790, old: null, img: "images/accessories/clutches/clutches-03.webp", badge: "New", rating: 4 },
  { id: 69, name: "Minimal Leather Clutch", cat: "Accessories", sub: "Clutches", subSlug: "clutches", price: 5690, old: 7690, img: "images/accessories/clutches/clutches-04.webp", badge: "Sale", rating: 5 },
  { id: 70, name: "Sequin Occasion Clutch", cat: "Accessories", sub: "Clutches", subSlug: "clutches", price: 4790, old: 6490, img: "images/accessories/clutches/clutches-05.webp", badge: "Sale", rating: 4 },
  { id: 71, name: "Structured Tote Handbag", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 5890, old: null, img: "images/accessories/handbags/handbags-01.webp", badge: null, rating: 5 },
  { id: 72, name: "Leather Shoulder Bag", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 6990, old: null, img: "images/accessories/handbags/handbags-02.webp", badge: null, rating: 5 },
  { id: 73, name: "Quilted Chain Handbag", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 8190, old: 11090, img: "images/accessories/handbags/handbags-03.webp", badge: "Sale", rating: 4 },
  { id: 74, name: "Everyday Carry Tote", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 9290, old: null, img: "images/accessories/handbags/handbags-04.webp", badge: "New", rating: 5 },
  { id: 75, name: "Mini Top-Handle Bag", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 5690, old: null, img: "images/accessories/handbags/handbags-05.webp", badge: null, rating: 5 },
  { id: 76, name: "Classic Satchel Handbag", cat: "Accessories", sub: "Handbags", subSlug: "handbags", price: 6790, old: null, img: "images/accessories/handbags/handbags-06.webp", badge: "New", rating: 4 },
  { id: 77, name: "Printed Silk Scarf", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 2190, old: null, img: "images/accessories/scarves/scarves-01.webp", badge: null, rating: 5 },
  { id: 78, name: "Embroidered Chiffon Scarf", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 3690, old: null, img: "images/accessories/scarves/scarves-02.webp", badge: null, rating: 4 },
  { id: 79, name: "Woven Wool Stole", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 3290, old: 4390, img: "images/accessories/scarves/scarves-03.webp", badge: "Sale", rating: 4 },
  { id: 80, name: "Lightweight Cotton Scarf", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 2790, old: null, img: "images/accessories/scarves/scarves-04.webp", badge: "New", rating: 5 },
  { id: 81, name: "Pashmina Blend Shawl", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 2090, old: null, img: "images/accessories/scarves/scarves-05.webp", badge: null, rating: 5 },
  { id: 82, name: "Digital Print Stole", cat: "Accessories", sub: "Scarves", subSlug: "scarves", price: 3590, old: 4790, img: "images/accessories/scarves/scarves-06.webp", badge: "Sale", rating: 4 },
  { id: 83, name: "Compact Vanity Bag", cat: "Accessories", sub: "Vanity Bags", subSlug: "vanity-bags", price: 3190, old: null, img: "images/accessories/vanity-bags/vanity-bags-01.webp", badge: null, rating: 5 },
  { id: 84, name: "Travel Vanity Pouch", cat: "Accessories", sub: "Vanity Bags", subSlug: "vanity-bags", price: 4690, old: null, img: "images/accessories/vanity-bags/vanity-bags-02.webp", badge: null, rating: 4 },
  { id: 85, name: "Embroidered Vanity Case", cat: "Accessories", sub: "Vanity Bags", subSlug: "vanity-bags", price: 4190, old: null, img: "images/accessories/vanity-bags/vanity-bags-03.webp", badge: "New", rating: 5 },
  { id: 86, name: "Everyday Vanity Bag", cat: "Accessories", sub: "Vanity Bags", subSlug: "vanity-bags", price: 3690, old: null, img: "images/accessories/vanity-bags/vanity-bags-04.webp", badge: null, rating: 4 },
  { id: 87, name: "Slim Leather Wallet", cat: "Accessories", sub: "Wallets", subSlug: "wallets", price: 2790, old: null, img: "images/accessories/wallets/wallets-01.webp", badge: null, rating: 5 },
  { id: 88, name: "Zip-Around Wallet", cat: "Accessories", sub: "Wallets", subSlug: "wallets", price: 3190, old: null, img: "images/accessories/wallets/wallets-02.webp", badge: null, rating: 5 },
  { id: 89, name: "Card Holder Wallet", cat: "Accessories", sub: "Wallets", subSlug: "wallets", price: 1990, old: null, img: "images/accessories/wallets/wallets-03.webp", badge: null, rating: 4 },
  { id: 90, name: "Classic Bifold Wallet", cat: "Accessories", sub: "Wallets", subSlug: "wallets", price: 2390, old: null, img: "images/accessories/wallets/wallets-04.webp", badge: "New", rating: 4 },
  { id: 91, name: "Textured Long Wallet", cat: "Accessories", sub: "Wallets", subSlug: "wallets", price: 2890, old: 3890, img: "images/accessories/wallets/wallets-05.webp", badge: "Sale", rating: 4 },
];

/* `img` is the portrait studio shot used on the tiles; `banner` is the wide
   16:9 artwork that fills the page-hero band for that edit. */
const CATEGORIES = [
  { cat: "Women", slug: "women", banner: "images/banners/women/embroidered.webp", subs: [
    { name: "Blazers", slug: "blazers", count: 6, img: "images/women/blazers/blazers-01.webp", banner: "images/banners/women/blazers.webp" },
    { name: "Blouses", slug: "blouses", count: 5, img: "images/women/blouses/blouses-01.webp", banner: "images/banners/women/blouses.webp" },
    { name: "Bottoms", slug: "bottoms", count: 5, img: "images/women/bottoms/bottoms-01.webp", banner: "images/banners/women/bottoms.webp" },
    { name: "Embroidered", slug: "embroidered", count: 6, img: "images/women/embroidered/embroidered-01.webp", banner: "images/banners/women/embroidered.webp" },
    { name: "Printed", slug: "printed", count: 7, img: "images/women/printed/printed-01.webp", banner: "images/banners/women/printed.webp" },
    { name: "Skirts", slug: "skirts", count: 6, img: "images/women/skirts/skirts-01.webp", banner: "images/banners/women/skirts.webp" },
    { name: "Solid", slug: "solid", count: 7, img: "images/women/solid/solid-01.webp", banner: "images/banners/women/solid.webp" },
  ]},
  { cat: "Men", slug: "men", banner: "images/banners/men/khaddar.webp", subs: [
    { name: "Bosky", slug: "bosky", count: 5, img: "images/men/bosky/bosky-01.webp", banner: "images/banners/men/bosky.webp" },
    { name: "Cotton", slug: "cotton", count: 6, img: "images/men/cotton/cotton-01.webp", banner: "images/banners/men/cotton.webp" },
    { name: "Khaddar", slug: "khaddar", count: 5, img: "images/men/khaddar/khaddar-01.webp", banner: "images/banners/men/khaddar.webp" },
    { name: "Wash & Wear", slug: "wash-and-wear", count: 7, img: "images/men/wash-and-wear/wash-and-wear-01.webp", banner: "images/banners/men/wash-and-wear.webp" },
  ]},
  { cat: "Accessories", slug: "accessories", banner: "images/banners/accessories/handbags.webp", subs: [
    { name: "Clutches", slug: "clutches", count: 5, img: "images/accessories/clutches/clutches-01.webp", banner: "images/banners/accessories/clutches.webp" },
    { name: "Handbags", slug: "handbags", count: 6, img: "images/accessories/handbags/handbags-01.webp", banner: "images/banners/accessories/handbags.webp" },
    { name: "Scarves", slug: "scarves", count: 6, img: "images/accessories/scarves/scarves-01.webp", banner: "images/banners/accessories/scarves.webp" },
    { name: "Vanity Bags", slug: "vanity-bags", count: 4, img: "images/accessories/vanity-bags/vanity-bags-01.webp", banner: "images/banners/accessories/vanity-bags.webp" },
    { name: "Wallets", slug: "wallets", count: 5, img: "images/accessories/wallets/wallets-01.webp", banner: "images/banners/accessories/wallets.webp" },
  ]},
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
  Blazers:       "Structured tailoring in a soft, breathable weave that holds its shape all day.",
  Blouses:       "Cut from a fluid, lightweight fabric with a beautiful drape.",
  Bottoms:       "A comfortable mid-weight fabric with just enough stretch to move with you.",
  Embroidered:   "Finished with hand-guided embroidery — every motif placed and checked by our artisans.",
  Printed:       "Colour-fast digital prints on a soft, skin-friendly base cloth.",
  Skirts:        "A flowing, easy-care fabric that falls beautifully with every step.",
  Solid:         "A clean, versatile solid in a breathable everyday weave.",
  Bosky:         "Premium bosky with a smooth, lustrous finish — a classic choice for occasions.",
  Cotton:        "Pure, breathable cotton — the easiest thing to wear through a long summer day.",
  Khaddar:       "Handloom-textured khaddar that keeps its warmth through the coldest months.",
  "Wash & Wear": "Crease-resistant wash & wear that stays sharp from morning to evening.",
  Clutches:      "Hand-finished detailing on a compact frame sized for your evening essentials.",
  Handbags:      "Roomy, structured and built with reinforced stitching for daily carry.",
  Scarves:       "A light, luxurious drape that finishes any outfit in seconds.",
  "Vanity Bags": "A neat, wipe-clean interior that keeps your everyday essentials in order.",
  Wallets:       "Slim, durable and organised — with card slots where you actually need them.",
};
const productDesc = p =>
  `The ${p.name} is a standout piece from our ${p.cat} ${p.sub} edit. ${FABRIC[p.sub] || "Crafted from quality materials with careful attention to every detail."} Designed in-house and finished by hand — an easy, versatile addition to your everyday wardrobe.`;
const sizesFor = p =>
  p.cat === "Accessories" ? ["One Size"]
  : p.cat === "Men"       ? ["S", "M", "L", "XL", "XXL"]
  : ["XS", "S", "M", "L", "XL"];

/* ---------- Category helpers ---------- */
const catBySlug   = slug => CATEGORIES.find(c => c.slug === slug);
const catByName   = name => CATEGORIES.find(c => c.cat === name);
const subBySlug   = (catName, slug) => (catByName(catName)?.subs || []).find(x => x.slug === slug);
const inCat       = name => PRODUCTS.filter(p => p.cat === name);
const inSub       = (name, slug) => PRODUCTS.filter(p => p.cat === name && p.subSlug === slug);
/* One hero piece from every subcategory — used for the homepage grids */
const oneFromEachSub = () =>
  CATEGORIES.flatMap(c => c.subs.map(s => inSub(c.cat, s.slug)[0])).filter(Boolean);

/* ---------- Product card markup ---------- */
function productCard(p) {
  const badge = p.badge
    ? `<span class="product__badge ${p.badge === "Sale" ? "product__badge--sale" : ""}">${p.badge}</span>`
    : "";
  return `
  <article class="product reveal" data-cat="${p.cat}" data-sub="${p.subSlug}" data-id="${p.id}">
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
        <p class="product__cat">${p.cat} · ${p.sub}</p>
      </div>
      <p class="product__price">${priceHTML(p)}</p>
    </div>
    <div class="product__stars">${starStr(p.rating)}</div>
  </article>`;
}

/* ---------- Page hero image ----------
   One photo fills the whole band. The band is far wider than the studio shots,
   so a fixed crop either buries the face or misses it — where the model stands
   in the frame varies from shot to shot. Instead the subject is located once
   per image (see frameHero) and the crop is anchored off that. */
function paintHeroImage(src, wide) {
  const hero = document.querySelector(".page-hero");
  if (!hero || !src) return;
  let img = hero.querySelector(".page-hero__img");
  if (!img) {
    img = document.createElement("img");
    img.alt = "";
    img.setAttribute("aria-hidden", "true");
    hero.prepend(img);
  }
  /* Artwork under images/banners/ is drawn to fit the band already — subject
     detection would only shove a deliberate composition off-centre. */
  const banner = src.includes("/banners/");
  img.className = "page-hero__img" + (wide || banner ? " page-hero__img--wide" : "");
  img.dataset.wide = wide ? "1" : "";
  img.dataset.noframe = banner ? "1" : "";
  if (banner) img.dataset.banner = src;

  const use = banner ? bannerCrop(src) : src;
  if (img.getAttribute("src") !== use) { img.style.objectPosition = ""; img.src = use; }
  if (!banner) frameHero(img);
}

/* Below 860px the bands turn portrait (see the CSS breakpoint) and the wide
   artwork no longer fits — every banner ships a `-m` crop for that shape. */
const NARROW = "(max-width: 860px)";
const bannerCrop = src => matchMedia(NARROW).matches ? src.replace(".webp", "-m.webp") : src;

/* Swap the crop when the viewport crosses the breakpoint, not just on load.
   Driven off resize rather than the media query's own change event, which some
   engines skip when the window is resized programmatically. */
function syncBannerCrop() {
  const img = document.querySelector(".page-hero__img");
  if (!img?.dataset.banner) return;
  const want = bannerCrop(img.dataset.banner);
  if (img.getAttribute("src") !== want) img.src = want;
}
window.addEventListener("resize", syncBannerCrop);

/* Where the subject sits inside each photo, as a fraction of its height.
   Measured once per image and reused — resizing only redoes the arithmetic. */
const subjectBoxCache = new Map();

/* Studio shots are a centred subject on a plain (often softly graded) backdrop.
   Comparing each row against that same row's own edge pixels finds the subject
   without a vertical gradient fooling it. */
function subjectBox(img) {
  const src = img.getAttribute("src");
  if (subjectBoxCache.has(src)) return subjectBoxCache.get(src);

  let box = null;
  try {
    const W = 100, H = Math.round(img.naturalHeight / img.naturalWidth * W);
    if (!H) return null;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, W, H);
    const d = ctx.getImageData(0, 0, W, H).data;
    const lum = (x, y) => { const i = (y * W + x) * 4; return .299 * d[i] + .587 * d[i + 1] + .114 * d[i + 2]; };

    const edge = Math.max(2, Math.round(W * .06));
    const x0 = Math.round(W * .18), x1 = Math.round(W * .82);
    let top = -1, bottom = -1;

    for (let y = 0; y < H; y++) {
      const rim = [];
      for (let x = 0; x < edge; x++) { rim.push(lum(x, y)); rim.push(lum(W - 1 - x, y)); }
      rim.sort((a, b) => a - b);
      const bg = rim[rim.length >> 1];

      let hit = 0;
      for (let x = x0; x < x1; x++) if (Math.abs(lum(x, y) - bg) > 26) hit++;
      if (hit / (x1 - x0) > .16) { if (top < 0) top = y; bottom = y; }
    }
    if (top >= 0 && bottom > top) box = { top: top / H, bottom: bottom / H };
  } catch (e) {
    box = null;   // tainted canvas (e.g. opened over file://) — keep the CSS default
  }

  subjectBoxCache.set(src, box);
  return box;
}

/* Headroom above the model, as a share of the band height */
const HERO_HEADROOM = .1;

function frameHero(img) {
  if (!img.complete || !img.naturalWidth) { img.addEventListener("load", () => frameHero(img), { once: true }); return; }

  const box = subjectBox(img);
  const bandW = img.clientWidth, bandH = img.clientHeight;
  if (!box || !bandW || !bandH) return;

  const shownH = img.naturalHeight * Math.max(bandW / img.naturalWidth, bandH / img.naturalHeight);
  const overflow = shownH - bandH;
  if (overflow <= 0) return;                       // nothing to slide

  // Portraits hang off the top of the head; still-lifes just centre the object.
  const offset = img.dataset.wide
    ? (box.top + box.bottom) / 2 * shownH - bandH / 2
    : box.top * shownH - bandH * HERO_HEADROOM;

  const pct = Math.min(100, Math.max(0, offset / overflow * 100));
  img.style.objectPosition = `50% ${pct.toFixed(2)}%`;
}

/* Any image tagged data-autoframe gets the same treatment — the home hero
   slides use it too, so no slide lands on a headless crop. */
const framedImages = () =>
  document.querySelectorAll(".page-hero__img:not([data-noframe='1']), [data-autoframe]");
function frameAll() { framedImages().forEach(frameHero); }

/* Re-run the arithmetic when the band changes width */
window.addEventListener("resize", frameAll);

/* Pages other than the shop get a fixed strip chosen from their own section */
function paintStaticHero() {
  const hero = document.querySelector(".page-hero");
  if (!hero || document.getElementById("shopGrid")) return;   // shop.js drives its own
  if (hero.classList.contains("page-hero--contact")) {
    paintHeroImage(catByName("Accessories").banner);
  } else if (hero.classList.contains("page-hero--account")) {
    paintHeroImage(subBySlug("Women", "solid").banner);
  } else {
    paintHeroImage(catByName("Women").banner);
  }
}

/* ---------- Subcategory tiles (home page) ---------- */
function renderSubcats(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = CATEGORIES.flatMap(c => c.subs.map(sb => `
    <a class="subcat reveal" href="shop.html?cat=${encodeURIComponent(c.cat)}&sub=${sb.slug}">
      <div class="subcat__media">
        <img src="${sb.img}" alt="${sb.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMG}'" />
      </div>
      <h4>${sb.name}</h4>
      <span>${c.cat}</span>
    </a>`)).join("");
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

/* ---------- Top-nav categories + dropdown popups ---------- */
const CARET_SVG =
  `<svg class="nav__caret" viewBox="0 0 24 24" width="10" height="10" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* One <li> per top-level link. Category links carry a subcategory popup. */
function navItemHTML(c) {
  const subs = c.subs.map(sb => `
        <li><a href="shop.html?cat=${encodeURIComponent(c.cat)}&sub=${sb.slug}" data-sub-link="${sb.slug}">
          <span>${sb.name}</span>
        </a></li>`).join("");
  return `
    <li class="nav__item nav__item--drop" data-cat="${c.cat}">
      <a href="shop.html?cat=${encodeURIComponent(c.cat)}" class="nav__link" data-nav="${c.cat}"
         aria-haspopup="true" aria-expanded="false">${c.cat}${CARET_SVG}</a>
      <div class="dropdown" role="menu" aria-label="${c.cat} categories">
        <p class="dropdown__title">Shop ${c.cat}</p>
        <ul class="dropdown__list">${subs}</ul>
        <a class="dropdown__all" href="shop.html?cat=${encodeURIComponent(c.cat)}">View all ${c.cat} &rarr;</a>
      </div>
    </li>`;
}

function buildNav() {
  const menu = document.getElementById("navMenu");
  if (!menu) return;
  menu.innerHTML = `
    <li class="nav__item"><a href="index.html" class="nav__link" data-nav="Home">Home</a></li>
    ${CATEGORIES.map(navItemHTML).join("")}
    <li class="nav__item"><a href="about.html" class="nav__link" data-nav="About">About</a></li>
    <li class="nav__item"><a href="contact.html" class="nav__link" data-nav="Contact">Contact</a></li>`;

  /* Mark the current page / category */
  const page   = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const params = new URLSearchParams(location.search);
  const cat    = params.get("cat");
  let active =
    page.startsWith("index") || page === "" ? "Home"
    : page.startsWith("about")   ? "About"
    : page.startsWith("contact") ? "Contact"
    : page.startsWith("shop")    ? (cat && CATEGORIES.some(c => c.cat === cat) ? cat : "All")
    : null;
  if (active) menu.querySelector(`[data-nav="${active}"]`)?.classList.add("active");

  const sub = params.get("sub");
  if (sub) menu.querySelector(`[data-sub-link="${sub}"]`)?.classList.add("active");
}

/* Open / close the subcategory popups */
function initNavDropdowns() {
  const menu = document.getElementById("navMenu");
  if (!menu) return;
  const items = [...menu.querySelectorAll(".nav__item--drop")];

  const closeAll = except => items.forEach(it => {
    if (it === except) return;
    it.classList.remove("open");
    it.querySelector(".nav__link")?.setAttribute("aria-expanded", "false");
  });

  items.forEach(item => {
    const link = item.querySelector(".nav__link");

    /* Click the category name -> pop the little panel open instead of navigating */
    link.addEventListener("click", e => {
      e.preventDefault();
      const open = !item.classList.contains("open");
      closeAll(item);
      item.classList.toggle("open", open);
      link.setAttribute("aria-expanded", String(open));
    });

    /* Desktop nicety: hovering also reveals it */
    item.addEventListener("mouseenter", () => {
      if (window.matchMedia("(min-width: 861px)").matches) { closeAll(item); item.classList.add("open"); }
    });
    item.addEventListener("mouseleave", () => {
      if (window.matchMedia("(min-width: 861px)").matches) {
        item.classList.remove("open");
        link.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".nav__item--drop")) closeAll(null);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(null); });

  window.closeNavDropdowns = () => closeAll(null);
}

/* ---------- Site-wide slide-in menu (hamburger) ---------- */
const menuDrawerHTML = () => `
  <div class="filters-overlay" id="menuOverlay"></div>
  <aside class="filters menu-drawer" id="menuDrawer" aria-hidden="true">
    <button class="filters__close" id="menuClose" aria-label="Close menu">&times;</button>
    <div class="filters__promo">
      <p class="filters__newin">NEW IN</p>
      <p class="filters__sale">+ SEASON END SALE &mdash; UPTO 50% OFF</p>
    </div>
    <h4>Shop by Categories</h4>
    <div class="filter-list filter-list--cats">
      <a href="shop.html">All Products</a>
    </div>
    <div class="menu-acc">
      ${CATEGORIES.map((c, i) => `
      <section class="menu-acc__item">
        <button class="menu-acc__head" type="button" aria-expanded="false" aria-controls="menuAcc${i}">
          <span>${c.cat}</span>
          <span class="menu-acc__icon" aria-hidden="true"></span>
        </button>
        <div class="menu-acc__panel" id="menuAcc${i}">
          <div class="menu-acc__clip">
            <div class="filter-list filter-list--cats">
              ${c.subs.map(sb => `<a href="shop.html?cat=${encodeURIComponent(c.cat)}&sub=${sb.slug}">${sb.name}</a>`).join("")}
              <a href="shop.html?cat=${encodeURIComponent(c.cat)}"><strong>View all ${c.cat}</strong></a>
            </div>
          </div>
        </div>
      </section>`).join("")}
    </div>
    <h4>Menu</h4>
    <div class="filter-list filter-list--cats">
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </div>
  </aside>`;


/* ---------- Home hero slider ----------
   Slides cross-fade in place. Autoplay pauses on hover, on focus and while the
   tab is in the background, and never starts for reduced-motion visitors. */
const HERO_INTERVAL = 3000;

function initHeroSlider() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const slides = [...hero.querySelectorAll(".hero__slide")];
  const dots   = [...hero.querySelectorAll(".hero__dot")];
  if (slides.length < 2) return;

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = slides.findIndex(s => s.classList.contains("is-active"));
  if (index < 0) index = 0;
  let timer = null;

  function show(next) {
    const to = (next + slides.length) % slides.length;
    if (to === index) return;
    slides[index].classList.remove("is-active");
    slides[index].setAttribute("aria-hidden", "true");
    dots[index]?.classList.remove("is-active");

    index = to;
    slides[index].classList.add("is-active");
    slides[index].removeAttribute("aria-hidden");
    dots[index]?.classList.add("is-active");
    cue();
  }

  /* The arrows are invisible at rest so they never sit on top of the artwork.
     Every slide change blinks them in for a beat, which is enough to advertise
     that the band can be stepped through by hand. */
  const CUE_MS = 1000;
  let cueTimer = null;
  function cue() {
    hero.classList.add("is-cueing");
    clearTimeout(cueTimer);
    cueTimer = setTimeout(() => hero.classList.remove("is-cueing"), CUE_MS);
  }

  const step  = n => { show(index + n); restart(); };
  const stop  = () => { clearInterval(timer); timer = null; };
  const start = () => { if (!calm && !timer) timer = setInterval(() => show(index + 1), HERO_INTERVAL); };
  const restart = () => { stop(); start(); };

  hero.addEventListener("click", e => {
    const arrow = e.target.closest(".hero__arrow");
    if (arrow) return step(Number(arrow.dataset.step));
    const dot = e.target.closest(".hero__dot");
    if (dot) { show(Number(dot.dataset.go)); restart(); }
  });

  // Arrow keys work once the slider has focus somewhere inside it
  hero.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft")  step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // Swipe on touch — the usual way people move a hero on a phone
  let startX = null, startY = null;
  hero.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  hero.addEventListener("touchend", e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    startX = null;
    // A mostly-vertical drag is someone scrolling the page, not paging the hero.
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  });

  /* Two-finger sideways swipe on a laptop trackpad. One flick emits a burst of
     wheel events, so the deltas are summed and the slider is locked until the
     burst dies down — otherwise a single gesture would skip several slides. */
  const WHEEL_TRIGGER = 60;
  let wheelSum = 0, wheelLock = false, wheelIdle = null;
  hero.addEventListener("wheel", e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;   // vertical — let the page scroll
    e.preventDefault();                                     // and don't let it trigger page-back

    clearTimeout(wheelIdle);
    wheelIdle = setTimeout(() => { wheelSum = 0; wheelLock = false; }, 220);
    if (wheelLock) return;

    wheelSum += e.deltaX;
    if (Math.abs(wheelSum) >= WHEEL_TRIGGER) {
      step(wheelSum > 0 ? 1 : -1);
      wheelSum = 0;
      wheelLock = true;
    }
  }, { passive: false });

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

  start();
  cue();          // one flash on arrival, so the controls are discoverable
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {

  // Top navigation + category popups
  buildNav();
  initNavDropdowns();

  // Render homepage grids if present — one piece from each subcategory,
  // then whatever is on sale for the best-sellers row.
  paintStaticHero();
  initHeroSlider();
  frameAll();                 // home hero slides carry data-autoframe
  renderSubcats("subcatGrid");
  renderInto("productGrid", oneFromEachSub().slice(0, 8));
  renderInto("bestGrid", PRODUCTS.filter(p => p.badge === "Sale").slice(0, 8));

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
  document.body.insertAdjacentHTML("beforeend", menuDrawerHTML());
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

  // Category groups start collapsed; the + opens the subcategories underneath.
  // The panel is animated from its measured height so it lands on exactly the
  // space its list needs, then released to auto in case the list ever reflows.
  menuDrawer?.addEventListener("click", e => {
    const head = e.target.closest(".menu-acc__head");
    if (!head) return;

    const item  = head.parentElement;
    const panel = item.querySelector(".menu-acc__panel");
    const open  = !item.classList.contains("open");

    item.classList.toggle("open", open);
    head.setAttribute("aria-expanded", String(open));

    if (open) {
      panel.style.height = panel.scrollHeight + "px";
      panel.addEventListener("transitionend", function done(ev) {
        if (ev.propertyName !== "height") return;
        panel.removeEventListener("transitionend", done);
        if (item.classList.contains("open")) panel.style.height = "auto";
      });
    } else {
      panel.style.height = panel.scrollHeight + "px";
      void panel.offsetHeight;                 // land on a real height before collapsing
      panel.style.height = "0px";
    }
  });

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
    document.getElementById("pmCat").textContent = `${p.cat} · ${p.sub}`;
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
  window.AURIGUL = { PRODUCTS, CATEGORIES, productCard, renderInto, addToCart, openProduct, toast, money,
                     cartTotals, clearCart, catByName, subBySlug, inCat, inSub, paintHeroImage,
                     getCart: () => cart };
});
