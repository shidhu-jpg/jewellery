/* ---------- Store config & catalogue ---------- */
const STORE = {
  name: "Rajlaxmi Jewellers",
  since: 1995,
  phone: "+91 98765 43210",
  email: "care@rajlaxmijewellers.in",
  address: "Main Bazaar Road, Patna, Bihar 800001",
  // Update these daily — shown on the homepage "Today's Gold Rate" banner (₹ per gram)
  goldRate: { k24: 6280, k22: 5760, change24: 0.2, change22: 0.2 },
};

const CATEGORIES = [
  { id: "gold", name: "Gold Jewellery", img: "images/cat-gold.jpg" },
  { id: "diamond", name: "Diamond Jewellery", img: "images/cat-diamond.jpg" },
  { id: "silver", name: "Silver Jewellery", img: "images/cat-silver.jpg" },
  { id: "bridal", name: "Bridal Collection", img: "images/cat-bridal.jpg" },
  { id: "mens", name: "Mens Jewellery", img: "images/cat-mens.jpg" },
  { id: "gifts", name: "Gift Sets", img: "images/cat-gifts.jpg" },
];

/* img = main photo, card = photo used in grids (defaults to img), short = name in grids */
const PRODUCTS = [
  { id: 1, code: "RJG001", name: "Traditional Gold Necklace Set", short: "Traditional Necklace", cat: "gold", occasion: ["wedding", "party"],
    img: "images/pdp-main.jpg", card: "images/p-trad-necklace.jpg",
    gallery: ["images/pdp-main.jpg", "images/pdp-t1.jpg", "images/pdp-t2.jpg", "images/pdp-t3.jpg", "images/pdp-t4.jpg"],
    material: "22K", weight: 30, weights: [20, 25, 30], price: 125000, rating: 4.8, reviews: 120, badge: "Bestseller",
    includes: "Necklace + Matching Earrings" },
  { id: 2, code: "RJG002", name: "Gold Earrings", cat: "gold", occasion: ["daily", "party"], img: "images/p-gold-earrings.jpg", material: "22K", weight: 8, price: 42000, rating: 4.7, reviews: 86 },
  { id: 3, code: "RJG003", name: "Gold Bangles Set", short: "Bangles Set", cat: "gold", occasion: ["wedding", "gift"], img: "images/p-bangles-set.jpg", material: "22K", weight: 20, price: 78000, rating: 4.8, reviews: 64 },
  { id: 4, code: "RJG004", name: "Pendant Set", cat: "gold", occasion: ["daily", "gift"], img: "images/p-pendant-set.jpg", material: "18K", weight: 9, price: 38000, rating: 4.6, reviews: 41 },
  { id: 5, code: "RJG005", name: "Jhumka Earrings", cat: "gold", occasion: ["wedding", "party"], img: "images/p-jhumka.jpg", material: "22K", weight: 11, price: 56000, rating: 4.9, reviews: 132 },
  { id: 6, code: "RJG006", name: "Chain Necklace", cat: "gold", occasion: ["daily", "gift"], img: "images/p-chain.jpg", material: "22K", weight: 6, price: 32000, rating: 4.5, reviews: 58 },
  { id: 7, code: "RJG007", name: "Kada Bracelet", cat: "gold", occasion: ["daily", "party"], img: "images/p-kada.jpg", material: "22K", weight: 14, price: 68000, rating: 4.7, reviews: 37 },
  { id: 8, code: "RJG008", name: "Mangalsutra", cat: "gold", occasion: ["daily", "wedding"], img: "images/p-mangalsutra.jpg", material: "22K", weight: 9, price: 45000, rating: 4.8, reviews: 95 },
  { id: 9, code: "RJG009", name: "Temple Necklace", cat: "gold", occasion: ["wedding"], img: "images/p-temple.jpg", material: "22K", weight: 40, price: 180000, rating: 4.9, reviews: 44 },
  { id: 10, code: "RJD001", name: "Diamond Ring", cat: "diamond", occasion: ["party", "gift"], img: "images/feat-diamond-ring.jpg", material: "Diamond", weight: 4, price: 45000, rating: 4.8, reviews: 73 },
  { id: 11, code: "RJB001", name: "Bridal Necklace Set", cat: "bridal", occasion: ["wedding"], img: "images/feat-bridal-set.jpg", material: "22K", weight: 48, price: 210000, rating: 4.9, reviews: 29, badge: "New" },
  { id: 12, code: "RJB002", name: "Bridal Rani Haar", cat: "bridal", occasion: ["wedding"], img: "images/cat-bridal.jpg", material: "22K", weight: 52, price: 245000, rating: 4.8, reviews: 18 },
  { id: 13, code: "RJS001", name: "Silver Filigree Bangle", cat: "silver", occasion: ["daily", "gift"], img: "images/cat-silver.jpg", material: "Silver", weight: 35, price: 6500, rating: 4.5, reviews: 52 },
  { id: 14, code: "RJM001", name: "Mens Gold Kada", cat: "mens", occasion: ["daily", "party"], img: "images/cat-mens.jpg", material: "22K", weight: 24, price: 92000, rating: 4.7, reviews: 31 },
  { id: 15, code: "RJX001", name: "Festive Gift Set", cat: "gifts", occasion: ["gift"], img: "images/cat-gifts.jpg", material: "18K", weight: 5, price: 24000, rating: 4.6, reviews: 22 },
];

/* Homepage "Featured Collection": product id + the photo shown on the card */
const FEATURED = [
  { id: 1, name: "Traditional Gold Necklace", img: "images/feat-necklace.jpg" },
  { id: 10 },
  { id: 3, name: "Gold Bangles Set", img: "images/feat-bangles.jpg" },
  { id: 11 },
];

const findProduct = (id) => PRODUCTS.find((p) => p.id === Number(id));
const MATERIAL_LABEL = { "18K": "18K Gold", "22K": "22K Gold", "24K": "24K Gold", Diamond: "Diamond", Silver: "Silver" };
