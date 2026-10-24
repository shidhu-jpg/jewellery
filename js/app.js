/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const qs = (k) => new URLSearchParams(location.search).get(k);
const fmtDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- Icons ---------- */
const I = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9Z"/>',
  cart: '<path d="M3 4h2l2.4 11h10.2L20 8H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>',
  shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1.2"/>',
  truck: '<path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  returns: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 4v4.5h4.5"/><path d="M12 8v4l2.5 2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4v-9Z"/>',
  bag: '<path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  logout: '<path d="M14 4h5v16h-5M10 8l-4 4 4 4M6 12h11"/>',
  phone: '<path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  rotate: '<path d="M20 12a8 8 0 1 1-3-6.3"/><path d="M20 4v5h-5"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
};
const icon = (n, cls = "") =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

/* Brand mark: gold temple/crown emblem + wordmark */
const logoMark = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9c46a"/><stop offset="1" stop-color="#a8761f"/></linearGradient></defs>
  <path d="M20 4l3 5h-6l3-5Z" fill="url(#lg)"/><path d="M8 18c2-5 7-8 12-8s10 3 12 8" fill="none" stroke="url(#lg)" stroke-width="2"/>
  <path d="M6 18h28l-2 4H8l-2-4Z" fill="url(#lg)"/><path d="M9 23h22v10H9z" fill="none" stroke="url(#lg)" stroke-width="2"/>
  <path d="M13 33v-6a2 2 0 0 1 4 0v6M23 33v-6a2 2 0 0 1 4 0v6" fill="none" stroke="url(#lg)" stroke-width="1.6"/><path d="M5 35h30" stroke="url(#lg)" stroke-width="2"/>
</svg>`;
const logo = () => `<a href="index.html" class="logo" aria-label="${STORE.name} home">${logoMark}<span><b>Sethi</b><small>JEWELLERS</small></span></a>`;

/* ---------- Cart & wishlist ---------- */
/* Price scales with the chosen weight (base price is for the product's default weight) */
const unitPrice = (p, weight) => (!weight || weight === p.weight ? p.price : Math.round((p.price * weight) / p.weight / 100) * 100);
const linePrice = (it) => unitPrice(findProduct(it.id), it.weight) * it.qty;
const Cart = {
  items() { return store.get("rj_cart", []); },
  save(items) { store.set("rj_cart", items); updateBadges(); },
  add(id, qty = 1, opts = {}) {
    const items = this.items();
    const ex = items.find((i) => i.id === id && i.weight === opts.weight && i.purity === opts.purity);
    ex ? (ex.qty += qty) : items.push({ id, qty, weight: opts.weight || null, purity: opts.purity || null, selected: true });
    this.save(items);
    toast("Added to cart");
  },
  update(idx, patch) { const it = this.items(); Object.assign(it[idx], patch); this.save(it); },
  remove(idx) { const it = this.items(); it.splice(idx, 1); this.save(it); },
  clear() { this.save([]); },
  count() { return this.items().reduce((s, i) => s + i.qty, 0); },
  selected() { return this.items().filter((i) => i.selected !== false); },
  totals() {
    const sub = this.selected().reduce((s, i) => s + linePrice(i), 0);
    const gst = Math.round(sub * 0.03);
    return { sub, gst, shipping: 0, total: sub + gst };
  },
};
const Wish = {
  ids() { return store.get("rj_wish", []); },
  has(id) { return this.ids().includes(id); },
  toggle(id) {
    const ids = this.ids(), on = !ids.includes(id);
    store.set("rj_wish", on ? [...ids, id] : ids.filter((x) => x !== id));
    toast(on ? "Added to wishlist" : "Removed from wishlist");
    return on;
  },
};
function updateBadges() { $$(".cart-count").forEach((b) => { const c = Cart.count(); b.textContent = c; b.hidden = !c; }); }

function toast(msg) {
  let t = $(".toast");
  if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.innerHTML = icon("check") + msg;
  t.classList.add("show");
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ---------- Header / footer ---------- */
function renderHeader() {
  const el = $("#site-header");
  if (!el) return;
  el.innerHTML = `<div class="container header-row">
      <button class="icon-btn menu-btn" aria-label="Menu">${icon("menu")}</button>
      ${logo()}
      <nav class="nav">
        <a href="index.html" data-p="index">Home</a>
        <a href="category.html" data-p="category">Collections</a>
        <a href="index.html#gold-rate">Gold Rate</a>
        <a href="index.html#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="searchBtn" aria-label="Search">${icon("search")}</button>
        <a href="account.html#wishlist" class="icon-btn" aria-label="Wishlist">${icon("heart")}</a>
        <a href="cart.html" class="icon-btn" aria-label="Cart">${icon("cart")}<i class="cart-count" hidden>0</i></a>
      </div>
    </div>
    <form class="search-bar container" action="category.html" hidden>
      <input name="q" placeholder="Search necklaces, earrings, bangles..." aria-label="Search products">
      <button class="btn btn-primary btn-sm">Search</button>
    </form>`;
  const page = (location.pathname.split("/").pop() || "index.html").replace(".html", "");
  $$(".nav [data-p]", el).forEach((a) => a.dataset.p === (page === "product" ? "category" : page) && a.classList.add("active"));
  $(".menu-btn", el).onclick = () => $(".nav", el).classList.toggle("open");
  $("#searchBtn", el).onclick = () => { const f = $(".search-bar", el); f.hidden = !f.hidden; if (!f.hidden) f.q.focus(); };
  updateBadges();
}

function renderFooter() {
  const el = $("#site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="service-strip"><div class="container">
      <div>${icon("truck")}<span><b>Free Shipping</b><small>On Orders Above ₹10,000</small></span></div>
      <div>${icon("returns")}<span><b>Easy Returns</b><small>7 Days Return Policy</small></span></div>
      <div>${icon("shield")}<span><b>Certified Jewellery</b><small>100% Hallmarked</small></span></div>
      <div>${icon("lock")}<span><b>Secure Payment</b><small>100% Secure Payment</small></span></div>
    </div></div>
    <footer class="footer" id="contact"><div class="container">
      <div>${logo()}<p>Trusted jewellers since ${STORE.since}. Pure gold, certified diamonds.</p></div>
      <div><p>${icon("pin")}${STORE.address}</p><p>${icon("phone")}${STORE.phone}</p><p>${icon("mail")}${STORE.email}</p></div>
      <small>© ${new Date().getFullYear()} ${STORE.name}. All rights reserved.</small>
    </div></footer>`;
}

/* ---------- Shared bits ---------- */
const starRow = (r) => `<span class="star-row">${[1, 2, 3, 4, 5].map((i) => icon("star", i <= Math.round(r) ? "on" : "")).join("")}</span>`;

function productCard(p, o = {}) {
  return `<article class="pcard">
    <a href="product.html?id=${p.id}" class="pcard-img"><img src="${o.img || p.card || p.img}" alt="${o.name || p.short || p.name}" loading="lazy"></a>
    <button class="wish ${Wish.has(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="Add to wishlist">${icon("heart")}</button>
    <div class="pcard-body">
      <a href="product.html?id=${p.id}" class="pcard-name">${o.name || p.short || p.name}</a>
      <b class="pcard-price">${inr(p.price)}</b>
    </div>
  </article>`;
}

/* Checkout stepper: 1 Address, 2 Payment, 3 Confirm */
function stepper(active) {
  return `<ol class="stepper">${["Address", "Payment", "Confirm"].map((s, i) =>
    `<li class="${i + 1 === active ? "active" : i + 1 < active ? "done" : ""}"><span>${i + 1}</span><em>${s}</em></li>`).join("")}</ol>`;
}

function priceLines() {
  const t = Cart.totals();
  return `<div class="sum-row"><span>Subtotal</span><span>${inr(t.sub)}</span></div>
    <div class="sum-row"><span>GST (3%)</span><span>${inr(t.gst)}</span></div>
    <div class="sum-row"><span>Shipping</span><b>Free</b></div>
    <div class="sum-row total"><span>Total</span><span>${inr(t.total)}</span></div>`;
}

function itemSpec(it, p) {
  const purity = it.purity || p.material;
  const metal = purity === "Diamond" || purity === "Silver" ? purity : `${purity} Gold`;
  return `${metal} • ${it.weight || p.weight} grams`;
}

document.addEventListener("click", (e) => {
  const w = e.target.closest("[data-wish]");
  if (w) { e.preventDefault(); w.classList.toggle("on", Wish.toggle(Number(w.dataset.wish))); }
});

document.addEventListener("DOMContentLoaded", () => { renderHeader(); renderFooter(); });
