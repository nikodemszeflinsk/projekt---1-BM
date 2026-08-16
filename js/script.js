document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Countdown to opening day
const OPENING_DATE = new Date('2026-08-18T00:00:00+02:00');

function updateCountdown() {
  const now = new Date();
  const diff = OPENING_DATE - now;

  const banner = document.getElementById('opening-banner');
  const countdownEl = document.getElementById('countdown');
  const dateEl = document.querySelector('.opening-date');

  if (diff <= 0) {
    if (countdownEl) countdownEl.style.display = 'none';
    if (dateEl) dateEl.textContent = 'Jesteśmy otwarci! Zapraszamy 🎉';
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
