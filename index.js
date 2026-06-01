// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth active reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Testimonials carousel
const track = document.querySelector('.car-track');
const slides = Array.from(document.querySelectorAll('.tcard'));
const prevBtn = document.querySelector('.car-btn.prev');
const nextBtn = document.querySelector('.car-btn.next');
const dotsWrap = document.querySelector('.car-dots');
let idx = 0;

function buildDots() {
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });
}
function update() {
  track.style.transform = `translateX(-${idx * 100}%)`;
  const dots = dotsWrap.querySelectorAll('button');
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}
function goTo(i) {
  idx = (i + slides.length) % slides.length;
  update();
}
function next() { goTo(idx + 1); }
function prev() { goTo(idx - 1); }

if (track && slides.length) {
  buildDots();
  update();
  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  // Auto-rotate
  let timer = setInterval(next, 5000);
  [track, nextBtn, prevBtn, dotsWrap].forEach(el => {
    el?.addEventListener('mouseenter', () => clearInterval(timer));
    el?.addEventListener('mouseleave', () => timer = setInterval(next, 5000));
  });
}

// Simple form validation (front-end)
function validateForm(e) {
  const form = e.target;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  let ok = true;
  if (name.length < 2) ok = false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = false;
  if (message.length < 5) ok = false;

  if (!ok) {
    e.preventDefault();
    alert('Please complete all fields correctly before submitting.');
    return false;
  }
  return true;
}
window.validateForm = validateForm;
