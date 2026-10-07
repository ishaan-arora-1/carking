/* =========================================================
   CARKING — configuration
   Edit these values to customise the site for a client.
   ========================================================= */
const CONFIG = {
  whatsapp: '910000000000',          // international format, digits only
  email: 'hello@carking.cars',
};

// Add `video: 'assets/car-1.mp4'` to any car to play a video over its photo.
const CARS = [
  { brand: 'Land Rover',    model: 'Range Rover',      cat: 'luxury', tag: 'Belgravia Green · 2024', img: 'rangerover', specs: [['3.0L', 'Engine'], ['394', 'HP'], ['5', 'Seats']] },
  { brand: 'BMW',           model: 'X5 xDrive40i',     cat: 'luxury', tag: 'Phytonic Blue · 2023',   img: 'x5',         specs: [['3.0L', 'Engine'], ['381', 'HP'], ['5', 'Seats']] },
  { brand: 'Land Rover',    model: 'Defender 110',     cat: 'luxury', tag: 'Fuji White · 2023',      img: 'defender',   specs: [['3.0L', 'Engine'], ['296', 'HP'], ['5', 'Seats']] },
  { brand: 'Audi',          model: 'Q7',               cat: 'luxury', tag: 'Navarra Blue · 2023',    img: 'q7',         specs: [['3.0L', 'Engine'], ['340', 'HP'], ['7', 'Seats']] },
  { brand: 'BMW',           model: '330Li M Sport',    cat: 'luxury', tag: 'Carbon Black · 2023',    img: 'bmw3',       specs: [['2.0L', 'Engine'], ['258', 'HP'], ['5', 'Seats']] },
  { brand: 'Mercedes-Benz', model: 'GLE 300d',         cat: 'luxury', tag: 'Cavansite Blue · 2022',  img: 'gle',        specs: [['2.0L', 'Engine'], ['269', 'HP'], ['5', 'Seats']] },
  { brand: 'Mahindra',      model: 'Thar LX',          cat: 'suv',    tag: 'Red Rage · 2023',        img: 'thar',       specs: [['2.2L', 'Engine'], ['130', 'HP'], ['4', 'Seats']] },
  { brand: 'Mahindra',      model: 'XUV700 AX7',       cat: 'suv',    tag: 'Midnight Black · 2023',  img: 'xuv700',     specs: [['2.2L', 'Engine'], ['185', 'HP'], ['7', 'Seats']] },
  { brand: 'Toyota',        model: 'Fortuner Legender', cat: 'suv',   tag: 'Attitude Black · 2023',  img: 'fortuner',   specs: [['2.8L', 'Engine'], ['201', 'HP'], ['7', 'Seats']] },
  { brand: 'Mahindra',      model: 'Scorpio-N Z8L',    cat: 'suv',    tag: 'Napoli Black · 2023',    img: 'scorpio',    specs: [['2.2L', 'Engine'], ['175', 'HP'], ['7', 'Seats']] },
  { brand: 'Tata',          model: 'Safari Dark',      cat: 'suv',    tag: 'Oberon Black · 2023',    img: 'safari',     specs: [['2.0L', 'Engine'], ['168', 'HP'], ['7', 'Seats']] },
  { brand: 'Hyundai',       model: 'Creta SX(O)',      cat: 'family', tag: 'Titan Grey · 2022',      img: 'creta',      specs: [['1.5L', 'Engine'], ['158', 'HP'], ['5', 'Seats']] },
  { brand: 'Toyota',        model: 'Innova Hycross',   cat: 'family', tag: 'Platinum White · 2024',  img: 'hycross',    specs: [['2.0L', 'Hybrid'], ['184', 'HP'], ['7', 'Seats']] },
  { brand: 'Kia',           model: 'Seltos GTX+',      cat: 'family', tag: 'Glacier White · 2024',   img: 'seltos',     specs: [['1.5L', 'Engine'], ['158', 'HP'], ['5', 'Seats']] },
];

/* ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const isTouch = matchMedia('(hover: none)').matches;
const imgUrl = (name) => `assets/cars/${name}.jpg`;
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

$('#year').textContent = new Date().getFullYear();

/* ---------- Loader ---------- */
let ready = false;
function finishLoading() {
  if (ready) return;
  ready = true;
  $('.loader').classList.add('is-done');
  document.body.classList.remove('is-loading');
  setTimeout(() => document.body.classList.add('is-ready'), 350);
}
window.addEventListener('load', () => setTimeout(finishLoading, 1500));
setTimeout(finishLoading, 3500);

/* ---------- WhatsApp links ---------- */
$$('[data-wa]').forEach(a => {
  a.href = waLink("Hello, I'd like to arrange a private viewing.");
  a.target = '_blank';
  a.rel = 'noopener';
});

/* ---------- Hero video (portrait / landscape) ---------- */
const heroVideo = $('.hero__video');
const portraitMq = matchMedia('(orientation: portrait) and (max-width: 900px)');
function loadHeroVideo() {
  const src = portraitMq.matches ? heroVideo.dataset.portrait : heroVideo.dataset.landscape;
  if (!src || heroVideo.getAttribute('src') === src) return;
  heroVideo.classList.remove('is-playing');
  heroVideo.src = src;
  heroVideo.play().catch(() => {});
}
heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
heroVideo.addEventListener('error', () => heroVideo.classList.remove('is-playing'));
portraitMq.addEventListener('change', loadHeroVideo);
loadHeroVideo();

/* ---------- Render collection ---------- */
const grid = $('#grid');
const select = $('#carSelect');
grid.innerHTML = CARS.map((c, i) => `
  <article class="car" data-cat="${c.cat}" data-index="${i}">
    <div class="car__media" data-cursor="view" data-open="${i}">
      <img src="${imgUrl(c.img)}" alt="${c.brand} ${c.model}" loading="lazy" />
      ${c.video ? `<video muted playsinline loop preload="none" data-src="${c.video}"></video>` : ''}
      <span class="car__tag">${c.tag}</span>
      <span class="car__num">${String(i + 1).padStart(2, '0')}</span>
    </div>
    <div class="car__info">
      <div>
        <p class="car__brand">${c.brand}</p>
        <h3 class="car__name">${c.model}</h3>
      </div>
      <div class="car__actions">
        <button class="btn btn--ghost" data-open="${i}"><span>Enquire</span></button>
        <a class="icon-btn" href="${waLink(`Hello, I'm interested in the ${c.brand} ${c.model}. Is it available for a private viewing?`)}" target="_blank" rel="noopener" aria-label="WhatsApp about ${c.brand} ${c.model}">
          <svg viewBox="0 0 24 24"><use href="#i-wa"/></svg>
        </a>
      </div>
      <div class="car__specs">
        ${c.specs.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}
      </div>
    </div>
  </article>`).join('');

CARS.forEach(c => select.add(new Option(`${c.brand} ${c.model}`, `${c.brand} ${c.model}`)));
select.add(new Option('Something not listed', 'A car not listed'));

// Layout rhythm: two half-width cards, then one wide — recomputed after filtering.
function layoutGrid() {
  const visible = $$('.car', grid).filter(c => !c.classList.contains('is-out'));
  visible.forEach((el, i) => {
    const last = i === visible.length - 1;
    const wide = (i % 3 === 2) || (last && i % 3 === 0);
    el.style.gridColumn = window.innerWidth > 860 ? (wide ? 'span 12' : 'span 6') : '';
    el.querySelector('.car__media').style.aspectRatio = window.innerWidth > 860 ? (wide ? '21 / 9' : '4 / 3') : '';
  });
}
layoutGrid();
window.addEventListener('resize', layoutGrid);

/* ---------- Filters ---------- */
$$('.filters button').forEach(btn => btn.addEventListener('click', () => {
  $$('.filters button').forEach(b => b.classList.toggle('is-active', b === btn));
  const f = btn.dataset.filter;
  const cards = $$('.car', grid);
  grid.style.opacity = 0;
  grid.style.transform = 'translateY(20px)';
  setTimeout(() => {
    cards.forEach(c => c.classList.toggle('is-out', f !== 'all' && c.dataset.cat !== f));
    layoutGrid();
    grid.style.opacity = 1;
    grid.style.transform = 'none';
  }, 380);
}));
grid.style.transition = 'opacity .4s ease, transform .6s cubic-bezier(.16,1,.3,1)';

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
$$('.reveal, .car').forEach(el => io.observe(el));

/* ---------- Card videos ---------- */
function prepVideo(v) {
  if (!v || v.src) return;
  v.src = v.dataset.src;
  v.addEventListener('playing', () => v.classList.add('is-playing'), { once: true });
}
const vio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = e.target.querySelector('video');
    if (!v) return;
    if (e.isIntersecting) {
      prepVideo(v);
      if (isTouch) v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}, { threshold: 0.4 });
$$('.car__media').forEach(m => {
  vio.observe(m);
  if (isTouch) return;
  const v = m.querySelector('video');
  if (!v) return;
  m.addEventListener('mouseenter', () => { prepVideo(v); v.play().catch(() => {}); });
  m.addEventListener('mouseleave', () => v.pause());
});

/* ---------- Intro word lighting ---------- */
const words = $('[data-words]');
words.innerHTML = words.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span> `).join('');
const wordEls = $$('.w', words);

/* ---------- Counters ---------- */
const cio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / 2000, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
$$('[data-count]').forEach(el => cio.observe(el));

/* ---------- Scroll-driven effects ---------- */
const nav = $('.nav');
const heroMedia = $('.hero__media');
const heroContent = $('.hero__content');
const sig = $('.signature');
const sigFrame = $('.signature__frame');
const sigVideo = $('.signature__frame video');
const quoteImg = $('.quote__bg img');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
let lastY = 0;

function onScroll() {
  const y = window.scrollY;
  const vh = window.innerHeight;

  // Nav
  nav.classList.toggle('is-scrolled', y > 40);
  if (!document.body.classList.contains('menu-open')) {
    nav.classList.toggle('is-hidden', y > vh && y > lastY + 2);
    if (y < lastY - 2) nav.classList.remove('is-hidden');
  }
  lastY = y;

  // Hero parallax
  if (y < vh * 1.2) {
    heroMedia.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
    heroContent.style.opacity = 1 - clamp(y / (vh * 0.6));
    heroContent.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
  }

  // Intro words
  const r = words.getBoundingClientRect();
  const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
  const lit = Math.floor(p * wordEls.length);
  wordEls.forEach((w, i) => w.classList.toggle('is-lit', i < lit));

  // Signature expand
  const sr = sig.getBoundingClientRect();
  const sp = clamp(-sr.top / (sr.height - vh));
  const grow = clamp(sp / 0.5);
  const ease = 1 - Math.pow(1 - grow, 3);
  const startInset = window.innerWidth < 860 ? 10 : 18;
  sigFrame.style.setProperty('--inset', `${(1 - ease) * startInset}%`);
  sigFrame.style.setProperty('--radius', `${(1 - ease) * 10}px`);
  sigFrame.style.setProperty('--scale', 1.25 - ease * 0.25);
  sigFrame.style.setProperty('--shade', clamp((sp - 0.35) / 0.3));
  sig.querySelector('.signature__copy').style.setProperty('--copy', clamp((sp - 0.45) / 0.3));
  if (sigVideo) {
    if (sr.top < vh && sr.bottom > 0) { prepVideo(sigVideo); sigVideo.play().catch(() => {}); }
    else sigVideo.pause();
  }

  // Quote parallax
  const qr = quoteImg.parentElement.parentElement.getBoundingClientRect();
  if (qr.top < vh && qr.bottom > 0) {
    quoteImg.style.setProperty('--py', `${(qr.top + qr.height / 2 - vh / 2) * -0.12}px`);
  }
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { onScroll(); ticking = false; });
}, { passive: true });
onScroll();

/* ---------- Mobile menu ---------- */
const burger = $('.nav__burger');
burger.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open);
  $('.menu').setAttribute('aria-hidden', !open);
  nav.classList.remove('is-hidden');
});
$$('.menu a').forEach(a => a.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', false);
}));

/* ---------- Custom cursor ---------- */
if (!isTouch) {
  const cursor = $('.cursor');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
  (function loop() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => {
    const view = e.target.closest('[data-cursor="view"]');
    const link = e.target.closest('a, button, select, input, textarea');
    cursor.classList.toggle('is-view', !!view);
    cursor.classList.toggle('is-link', !view && !!link);
  });

  // Magnetic buttons
  $$('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ---------- Enquiry modal ---------- */
const modal = $('#modal');
const modalForm = $('#modalForm');
let currentCar = '';
function openModal(name, brand, img) {
  currentCar = name;
  $('#modalTitle').textContent = name;
  $('#modalImg').src = img;
  $('#modalImg').alt = name;
  $('#modalMail').href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Enquiry — ' + name)}`;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => modalForm.elements.name.focus({ preventScroll: true }), 400);
}
function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
grid.addEventListener('click', e => {
  const t = e.target.closest('[data-open]');
  if (!t) return;
  const c = CARS[+t.dataset.open];
  openModal(`${c.brand} ${c.model}`, c.brand, imgUrl(c.img));
});
$$('[data-enquire]').forEach(b => b.addEventListener('click', () => {
  openModal(b.dataset.enquire, 'Land Rover', $('.signature__frame img').src);
}));
$$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- Forms → WhatsApp ---------- */
function validate(form) {
  let ok = true;
  $$('[required]', form).forEach(i => {
    const bad = !i.value.trim();
    i.closest('.field').classList.toggle('is-error', bad);
    if (bad) ok = false;
  });
  return ok;
}
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(modalForm)) return;
  const f = modalForm;
  window.open(waLink(`Hello, I'm ${f.elements.name.value.trim()} (${f.phone.value.trim()}). I'd like to enquire about the ${currentCar}.`), '_blank', 'noopener');
  closeModal();
  f.reset();
});
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (!validate(f)) return;
  const car = f.car.value ? ` I'm interested in the ${f.car.value}.` : '';
  const msg = f.message.value.trim() ? `\n\n${f.message.value.trim()}` : '';
  window.open(waLink(`Hello, I'm ${f.elements.name.value.trim()} (${f.phone.value.trim()}).${car}${msg}`), '_blank', 'noopener');
  f.reset();
});
