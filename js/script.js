document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// Header solid background after scrolling past the hero
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Scroll-reveal for elements marked [data-reveal].
// Content is visible by default in CSS; only arm the hidden pre-state here,
// right before observing, so a slow/broken/absent script never leaves content stuck invisible.
const revealEls = document.querySelectorAll('[data-reveal]');
if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  revealEls.forEach((el) => el.classList.add('reveal-armed'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblings = Array.from(el.parentElement.querySelectorAll('[data-reveal]'));
          const staggerIndex = siblings.indexOf(el);
          el.style.transitionDelay = `${Math.min(staggerIndex, 6) * 70}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Safety net: if an armed element still hasn't revealed after 2.5s
  // (observer edge case, layout thrash, etc.), force it visible rather than lost.
  window.setTimeout(() => {
    document.querySelectorAll('.reveal-armed[data-reveal]:not(.is-visible)').forEach((el) => {
      el.classList.add('is-visible');
    });
  }, 2500);
}

// Countdown to opening day
const OPENING_DATE = new Date('2026-08-18T00:00:00+02:00');

function updateCountdown() {
  const now = new Date();
  const diff = OPENING_DATE - now;

  const countdownEl = document.getElementById('countdown');
  const dateEl = document.querySelector('.opening-date');

  if (diff <= 0) {
    if (countdownEl) countdownEl.style.display = 'none';
    if (dateEl) dateEl.textContent = 'Jesteśmy otwarci — zapraszamy!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, '0');
  };

  set('cd-days', days);
  set('cd-hours', hours);
  set('cd-mins', mins);
  set('cd-secs', secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);
