// ---------- data ----------
// Prices below come straight from the "Selling price" column of the
// product sheet. Edit a price here and every total on the page
// (including both preset combos) recalculates automatically.

const BAGS = [
  {
    id: 'maternity-bag',
    name: 'Maternity Bag',
    price: 6000,
    img: 'images/black-maternity.jpeg',
    colors: [
      { name: 'Black', img: 'images/black-maternity.jpeg', cls: 'swatch-black' },
      { name: 'Brown', img: 'images/brown-maternity.jpeg', cls: 'swatch-brown' },
      { name: 'Pink',  img: 'images/pink-maternity.jpeg',  cls: 'swatch-pink' },
    ],
  },
  { id: 'everyday-tote',   name: 'Everyday Tote',   price: 6000, img: 'images/tote.jpeg' },
  { id: 'diaper-backpack', name: 'Diaper Backpack', price: 6000, img: 'images/blue-diaper.jpeg' },
];

const CATEGORY_LABELS = {
  mother:    'Mother Essentials',
  feeding:   'Feeding & Bottles',
  diapering: 'Diapering, Bath & Care',
  clothing:  'Clothing & Sleep',
};

const PRODUCTS = [
  // ---- mother essentials ----
  { id:'mothers-panty',              name:"Mother's Panty (1 pcs)",        price:365,  category:'mother',    note:'Free size' },
  { id:'mothers-bra',                name:"Mother's Nursing Bra",          price:300,  category:'mother',    note:'Sizes 42C–52C' },
  { id:'support-belt',               name:'Postpartum Support Belt',       price:1000, category:'mother',    note:'XL, XXL' },
  { id:'breast-pad-disposable',      name:'Disposable Breast Pads',        price:400,  category:'mother' },
  { id:'breast-pad-reusable',        name:'Reusable Breast Pads',          price:275,  category:'mother' },
  { id:'maternity-baby-cloth-set',   name:'Maternity + Baby Cloth Set',    price:2000, category:'mother' },
  { id:'mother-baby-cloth-set-topi', name:'Mother + Baby Cloth Set (with Topi)', price:2500, category:'mother' },

  // ---- feeding & bottles ----
  { id:'leeto-bottle',       name:'Leeto Bottle',            price:350, category:'feeding' },
  { id:'bottle-tall',        name:'Feeding Bottle (Tall)',   price:315, category:'feeding' },
  { id:'bottle-small',       name:'Feeding Bottle (Small)',  price:315, category:'feeding' },
  { id:'plastic-bottle',     name:'Plastic Bottle',          price:210, category:'feeding' },
  { id:'half-cover-bottle',  name:'Half-Cover Bottle',       price:400, category:'feeding' },
  { id:'fruit-feeder-small', name:'Fruit Feeder (Small)',    price:180, category:'feeding' },
  { id:'fruit-feeder-large', name:'Fruit Feeder (Large)',    price:200, category:'feeding' },
  { id:'teether',            name:'Teether',                 price:340, category:'feeding' },
  { id:'thermos-tall',       name:'Thermos Flask (Tall)',    price:500, category:'feeding' },
  { id:'thermos-short',      name:'Thermos Flask (Short)',   price:700, category:'feeding' },

  // ---- diapering, bath & care ----
  { id:'diaper-pad',      name:'Diaper Changing Pad',        price:400,  category:'diapering' },
  { id:'nappy-10',        name:'Nappy Set (10 pcs)',         price:600,  category:'diapering' },
  { id:'chaya-brush',     name:'Chaya Brush',                price:100,  category:'diapering' },
  { id:'ear-pick',        name:'Baby Ear Pick',              price:120,  category:'diapering' },
  { id:'foot-print-kit',  name:'Footprint Keepsake Kit',     price:1800, category:'diapering' },
  { id:'care-kit',        name:'Baby Care Kit',              price:500,  category:'diapering' },
  { id:'care-kit-deluxe', name:'Baby Care Kit (Deluxe Box)', price:750,  category:'diapering' },

  // ---- clothing & sleep ----
  { id:'cap-12',           name:'Baby Caps (12 pcs)',        price:150,  category:'clothing' },
  { id:'socks-12',         name:'Baby Socks (1 pair)',     price:150,  category:'clothing' },
  { id:'towel',            name:'Baby Towel',                price:700,  category:'clothing' },
  { id:'pillow',           name:'Baby Pillow',               price:500,  category:'clothing' },
  { id:'wrapper',          name:'Baby Wrapper (4 pcs)',              price:800,  category:'clothing' },
  { id:'blanket-cap',      name:'Blanket with Cap',          price:1000, category:'clothing' },
  { id:'monthly-blanket',  name:'Milestone Monthly Blanket', price:1200, category:'clothing' },
  { id:'thin-blanket',     name:'Thin Blanket',              price:750,  category:'clothing' },
  { id:'baby-cloth-5pcs',  name:'Baby Clothing Set (5 pcs)', price:700,  category:'clothing' },
  { id:'baby-gloves',      name:'Baby Gloves',               price:100,  category:'clothing' },
  { id:'bib-10',           name:'Baby Bibs (1 pc)',        price:120,  category:'clothing' },
  { id:'baby-sutti-set',   name:'Baby Sutti Set',            price:1000, category:'clothing' },
];

// Two ready-made combos. Each still uses the same bag + item prices
// above, so their totals stay accurate if you edit a price.
const COMBOS = [
  {
    id: 'signature',
    name: 'The Signature Newborn Combo',
    tagline: 'A maternity bag packed with our most-requested nursing and newborn essentials.',
    bagId: 'maternity-bag',
    image: 'images/cover-all.jpeg',
    itemIds: ['mothers-bra', 'support-belt', 'breast-pad-disposable', 'nappy-10', 'baby-cloth-5pcs', 'thin-blanket', 'bottle-tall', 'care-kit'],
  },
  {
    id: 'starter',
    name: 'The Essentials Starter Combo',
    tagline: 'A lighter, budget-friendly set covering the everyday basics.',
    bagId: 'maternity-bag',
    image: 'images/brown-maternity.jpeg',
    itemIds: ['mothers-panty', 'diaper-pad', 'cap-12', 'socks-12', 'baby-gloves', 'bib-10', 'thermos-tall'],
  },
];

// ---------- helpers ----------
const productById = id => PRODUCTS.find(p => p.id === id);
const bagById = id => BAGS.find(b => b.id === id);
const fmt = n => 'Rs ' + n.toLocaleString('en-IN');

// Maps each product id to the actual photo in /images. Add or correct a
// filename here to change the image shown in the combo builder.
const PRODUCT_IMAGES = {
  'mothers-panty':         'images/25.cotton-maternity-panty.jpeg',
  'support-belt':          'images/27.maternity-belt.jpeg',
  'breast-pad-disposable': 'images/13.disposable-breast-pad.jpeg',
  'breast-pad-reusable':   'images/14.reusable-breast-pad.jpeg',
  'leeto-bottle':          'images/8.litto-bottle.jpeg',
  'bottle-tall':           'images/3.babybottlewithhandle-tall.jpeg',
  'bottle-small':          'images/2.babybottlewithhandle.jpeg',
  'plastic-bottle':        'images/5.plasticbottle.jpeg',
  'half-cover-bottle':     'images/1.babybottlewithcover.jpeg',
  'fruit-feeder-small':    'images/26.fruit-feeder.jpeg',
  'fruit-feeder-large':    'images/26.fruit-feeder-expensive.jpeg',
  'teether':               'images/11.teether.jpeg',
  'thermos-tall':          'images/30.tall-thermos.jpeg',
  'thermos-short':         'images/3-.mini-thermos.jpeg',
  'diaper-pad':            'images/24.reusable-diaper.jpeg',
  'nappy-10':              'images/17.nappies.jpeg',
  'chaya-brush':           'images/29.chaya-brush.jpeg',
  'ear-pick':              'images/12.earpick.jpeg',
  'care-kit':              'images/10.carekit-set.jpeg',
  'care-kit-deluxe':       'images/9.carekit-box.jpeg',
  'cap-12':                'images/23.baby-cap.jpeg',
  'towel':                 'images/21.towel-with-cap.jpeg',
  'pillow':                'images/20.pillow-pink.jpeg',
  'wrapper':               'images/19.wrapper.jpeg',
  'blanket-cap':           'images/15.thick-blanket-with-cap.jpeg',
  'monthly-blanket':       'images/16.calendar-blanket.jpeg',
  'thin-blanket':          'images/18.thin-blanket-with-cap.jpeg',
  'baby-cloth-5pcs':       'images/28.5pcbaby-set.jpeg',
  'baby-gloves':           'images/22.babygloves.jpeg',
  'bib-10':                'images/31.bip.jpeg',
  'socks-12':              'images/32.baby-socks.jpeg',
};

const productImg = id => PRODUCT_IMAGES[id] || `images/products/${id}.jpeg`;
const reduceMotionSafe = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const INSTAGRAM_URL = 'https://www.instagram.com/avyra_maternitybagnepal/';

function comboTotal(combo){
  const bag = bagById(combo.bagId);
  return combo.itemIds.reduce((sum, id) => sum + productById(id).price, bag.price);
}

// ---------- state ----------
let selectedBagId = BAGS[0].id;
const bagColorByBag = {};
const quantities = {};
PRODUCTS.forEach(p => { quantities[p.id] = 0; });

// ---------- render: preset combo cards ----------
function renderComboCards(){
  const wrap = document.getElementById('comboPresets');
  wrap.innerHTML = COMBOS.map(combo => {
    const bag = bagById(combo.bagId);
    const total = comboTotal(combo);
    const rows = [`<li><span>${bag.name}</span><span>${fmt(bag.price)}</span></li>`]
      .concat(combo.itemIds.map(id => {
        const item = productById(id);
        return `<li><span>${item.name}</span><span>${fmt(item.price)}</span></li>`;
      }));
    return `
      <div class="combo-preset-card">
        <div class="combo-preset-image"><img src="${combo.image}" alt="${combo.name}"></div>
        <div class="combo-preset-body">
          <h3>${combo.name}</h3>
          <p class="signature-tagline">${combo.tagline}</p>
          <ul class="signature-list">${rows.join('')}</ul>
          <div class="signature-total"><span>Combo total</span><span>${fmt(total)}</span></div>
          <button type="button" class="btn btn-primary use-combo-btn" data-combo-id="${combo.id}">Use this combo</button>
        </div>
      </div>
    `;
  }).join('');

  wrap.querySelectorAll('.use-combo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyCombo(btn.dataset.comboId);
      window.open(INSTAGRAM_URL, '_blank', 'noopener');
    });
  });
}

function applyCombo(comboId){
  const combo = COMBOS.find(c => c.id === comboId);
  if (!combo) return;

  selectedBagId = combo.bagId;
  PRODUCTS.forEach(p => { quantities[p.id] = 0; });
  combo.itemIds.forEach(id => { quantities[id] = 1; });

  renderBagOptions();
  PRODUCTS.forEach(p => syncItemUI(p.id));
  updateSummary();
  openBarDetails();

  document.getElementById('bag-select').scrollIntoView({ behavior: reduceMotionSafe() ? 'auto' : 'smooth', block: 'start' });
}

// ---------- render: bag choice ----------
function renderBagOptions(){
  const wrap = document.getElementById('bagOptions');
  wrap.innerHTML = BAGS.map(bag => {
    const colors = bag.colors || [];
    const activeIdx = colors.length ? Math.max(0, colors.findIndex(c => c.name === bagColorByBag[bag.id])) : 0;
    const activeColor = colors[activeIdx];
    const imgSrc = activeColor ? activeColor.img : bag.img;
    const colorRow = colors.length ? `
      <span class="color-options" role="group" aria-label="${bag.name} colors">
        <span class="color-label">Color: <span class="bag-color-name">${activeColor.name}</span></span>
        ${colors.map(c => `
          <button class="color-swatch ${c.cls}" type="button" data-color="${c.name}" data-image="${c.img}" aria-label="${c.name}" aria-pressed="${c.name === activeColor.name}" title="${c.name}"></button>
        `).join('')}
      </span>
    ` : '';

    return `
      <label class="bag-option">
        <input type="radio" name="bag" value="${bag.id}" ${bag.id === selectedBagId ? 'checked' : ''}>
        <span class="bag-option-card">
          <span class="bag-option-image"><img src="${imgSrc}" alt="${activeColor ? activeColor.name + ' ' + bag.name : bag.name}"></span>
          <span class="bag-option-body">
            <h3>${bag.name}</h3>
            <span class="product-price">${fmt(bag.price)}</span>
            ${colorRow}
          </span>
        </span>
        <span class="bag-option-check" aria-hidden="true">✓</span>
      </label>
    `;
  }).join('');

  wrap.querySelectorAll('input[name="bag"]').forEach(input => {
    input.addEventListener('change', () => {
      selectedBagId = input.value;
      updateSummary();
    });
  });

  wrap.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', event => {
      event.preventDefault();
      const option = swatch.closest('.bag-option');
      const bagId = option.querySelector('input').value;
      bagColorByBag[bagId] = swatch.dataset.color;

      const img = option.querySelector('.bag-option-image img');
      const nameEl = option.querySelector('.bag-color-name');
      img.src = swatch.dataset.image;
      img.alt = `${swatch.dataset.color} ${option.querySelector('h3').textContent}`;
      if (nameEl) nameEl.textContent = swatch.dataset.color;
      option.querySelectorAll('.color-swatch').forEach(o => o.setAttribute('aria-pressed', String(o === swatch)));
    });
  });
}

// ---------- render: product categories ----------
function renderCategories(){
  const wrap = document.getElementById('comboCategories');
  const order = ['mother', 'feeding', 'diapering', 'clothing'];

  wrap.innerHTML = order.map(cat => {
    const items = PRODUCTS.filter(p => p.category === cat);
    return `
      <div class="combo-category" data-category="${cat}">
        <h3>${CATEGORY_LABELS[cat]}</h3>
        <div class="combo-item-grid">
          ${items.map(item => `
            <div class="combo-item" data-item-row="${item.id}">
              <div class="combo-item-image"><img src="${productImg(item.id)}" alt="${item.name}" loading="lazy"></div>
              <div class="combo-item-info">
                <h4>${item.name}</h4>
                ${item.note ? `<div class="combo-item-note">${item.note}</div>` : ''}
                <div class="combo-item-price">${fmt(item.price)}</div>
              </div>
              <div class="qty-stepper">
                <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Remove one ${item.name}">−</button>
                <span class="qty-value" data-qty-for="${item.id}">0</span>
                <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Add one ${item.name}">+</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  wrap.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const delta = btn.dataset.action === 'inc' ? 1 : -1;
      quantities[id] = Math.max(0, Math.min(20, (quantities[id] || 0) + delta));
      syncItemUI(id);
      updateSummary();
    });
  });
}

function syncItemUI(id){
  const valueEl = document.querySelector(`[data-qty-for="${id}"]`);
  const rowEl = document.querySelector(`[data-item-row="${id}"]`);
  if (valueEl) valueEl.textContent = quantities[id];
  if (rowEl) rowEl.classList.toggle('is-active', quantities[id] > 0);
}

// ---------- summary bar ----------
const bar = document.getElementById('comboBar');
const barTotal = document.getElementById('comboBarTotal');
const barCount = document.getElementById('comboBarCount');
const barToggle = document.getElementById('comboBarToggle');
const barLines = document.getElementById('comboBarLines');

let footerVisible = false;
function applyBarVisibility(){
  bar.classList.toggle('is-visible', !footerVisible);
}

function updateSummary(){
  const bag = bagById(selectedBagId);
  let itemCount = 0;
  let itemsTotal = 0;
  const lines = [];

  PRODUCTS.forEach(p => {
    const qty = quantities[p.id] || 0;
    if (qty > 0){
      itemCount += qty;
      const lineTotal = qty * p.price;
      itemsTotal += lineTotal;
      lines.push({ name:p.name, qty, lineTotal });
    }
  });

  const grandTotal = bag.price + itemsTotal;

  barTotal.textContent = fmt(grandTotal);
  barCount.textContent = `${bag.name} + ${itemCount} item${itemCount === 1 ? '' : 's'}`;

  if (lines.length === 0){
    barLines.innerHTML = `
      <div class="combo-bar-line"><span>${bag.name}</span><span>${fmt(bag.price)}</span></div>
      <div class="combo-bar-empty">No extra items selected yet — use the + buttons below to add some.</div>
    `;
  } else {
    barLines.innerHTML = `
      <div class="combo-bar-line"><span>${bag.name}</span><span>${fmt(bag.price)}</span></div>
      ${lines.map(l => `<div class="combo-bar-line"><span>${l.name} × ${l.qty}</span><span>${fmt(l.lineTotal)}</span></div>`).join('')}
    `;
  }

  applyBarVisibility();
}

function openBarDetails(){ bar.classList.add('details-open'); barToggle.setAttribute('aria-expanded', 'true'); barToggle.textContent = 'Hide details'; }
function closeBarDetails(){ bar.classList.remove('details-open'); barToggle.setAttribute('aria-expanded', 'false'); barToggle.textContent = 'View details'; }

barToggle.addEventListener('click', () => {
  if (bar.classList.contains('details-open')) closeBarDetails();
  else openBarDetails();
});

const barCollapse = document.getElementById('comboBarCollapse');
barCollapse.addEventListener('click', () => {
  const minimized = bar.classList.toggle('is-minimized');
  barCollapse.setAttribute('aria-expanded', String(!minimized));
  barCollapse.setAttribute('aria-label', minimized ? 'Expand combo bar' : 'Minimize combo bar');
});

document.getElementById('clearComboBtn').addEventListener('click', () => {
  PRODUCTS.forEach(p => { quantities[p.id] = 0; syncItemUI(p.id); });
  updateSummary();
});

// copy a plain-text summary to the clipboard
document.getElementById('copyComboBtn').addEventListener('click', async () => {
  const bag = bagById(selectedBagId);
  const lines = [`Avyra combo pack request`, `${bag.name} — ${fmt(bag.price)}`];
  let total = bag.price;

  PRODUCTS.forEach(p => {
    const qty = quantities[p.id] || 0;
    if (qty > 0){
      const lineTotal = qty * p.price;
      total += lineTotal;
      lines.push(`${p.name} × ${qty} — ${fmt(lineTotal)}`);
    }
  });
  lines.push(`Total: ${fmt(total)}`);

  const text = lines.join('\n');
  try {
    await navigator.clipboard.writeText(text);
    showToast('Combo list copied — paste it in your message.');
  } catch (err) {
    showToast('Could not copy automatically — please select and copy the list manually.');
  }
});

function showToast(message){
  const toast = document.getElementById('copyToast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

// hide the sticky bar once the real page footer scrolls into view,
// so it never sits on top of the contact/footer content
const footerEl = document.querySelector('footer');
if (footerEl){
  const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      footerVisible = entry.isIntersecting;
      applyBarVisibility();
    });
  }, { threshold: 0 });
  footerObserver.observe(footerEl);
}

// ---------- init ----------
renderComboCards();
renderBagOptions();
renderCategories();
updateSummary();
