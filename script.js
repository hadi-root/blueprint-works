// Marks the page as JS-enabled so reveal animations can start hidden
document.documentElement.classList.add('js');

// Fades the whole page in once it's ready, instead of popping in unstyled
window.addEventListener('DOMContentLoaded', function () {
  document.body.classList.add('ready');
});

// Scroll reveal: fades and lifts elements in as they enter the screen
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); }
      else { e.target.classList.remove('in'); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
})();

// Home page blueprint sketch: subtle tilt that follows the pointer
(function () {
  var plan = document.querySelector('.plan');
  if (!plan || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var wrap = plan.closest('.hero-main');
  if (!wrap) return;
  wrap.addEventListener('mousemove', function (e) {
    var r = wrap.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    plan.style.transform = 'rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 6) + 'deg)';
  });
  wrap.addEventListener('mouseleave', function () { plan.style.transform = ''; });
})();

// Contact form: checks the fields, then submits to FormSubmit so the message lands in the inbox directly
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('status');
  form.addEventListener('submit', function (e) {
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var msg = form.message.value.trim();
    if (!name || !email || !msg) { e.preventDefault(); status.textContent = 'Fill in your name, email and message.'; return; }
    if (!/^\S+@\S+\.\S+$/.test(email)) { e.preventDefault(); status.textContent = 'Enter a valid email address.'; return; }
    var phone = form.phone.value.trim();
    var digits = phone.replace(/\D/g, '');
    if (phone && (digits.length < 7 || digits.length > 15)) { e.preventDefault(); status.textContent = 'Enter a valid mobile number, or leave it empty.'; return; }
    status.textContent = 'Sending...';
  });
})();

// Thin red progress bar across the top that fills as the page scrolls
(function () {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// Soft red glow in the header that follows the pointer
(function () {
  var hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
})();

// Gentle 3D tilt on project cards and service rows as the pointer moves over them
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.project, .row').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });
})();

// Small ripple from the click point on every button
(function () {
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect();
      var s = document.createElement('span');
      var size = Math.max(r.width, r.height);
      s.className = 'ripple';
      s.style.width = s.style.height = size + 'px';
      s.style.left = (e.clientX - r.left - size / 2) + 'px';
      s.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(s);
      setTimeout(function () { s.remove(); }, 650);
    });
  });
})();

// Stagger the nav links in on load
(function () {
  document.querySelectorAll('nav a').forEach(function (a, i) {
    a.style.animationDelay = (i * 80) + 'ms';
  });
})();

// A handful of embers drifting up through the header
(function () {
  var hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (var i = 0; i < 14; i++) {
    var p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    hero.appendChild(p);
  }
})();

// A small dot that follows the cursor and grows over clickable things
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  window.addEventListener('mousemove', function (e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () { dot.classList.add('big'); });
    el.addEventListener('mouseleave', function () { dot.classList.remove('big'); });
  });
})();

// Buttons ease slightly toward the cursor while hovered
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.25;
      var y = (e.clientY - r.top - r.height / 2) * 0.25;
      btn.style.transform = 'translate(' + x + 'px,' + y + 'px) translateY(-4px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });
})();

// A quick fade-out before leaving the page, so link clicks feel smoother
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('a[href]').forEach(function (a) {
    var url = a.getAttribute('href');
    if (!url || url.charAt(0) === '#' || a.target === '_blank' || url.indexOf('mailto:') === 0 || url.indexOf('tel:') === 0 || url.indexOf('http') === 0) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(function () { window.location.href = url; }, 320);
    });
  });
})();

// Light/dark mode toggle: remembers the visitor's choice between visits
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var stored = null;
  try { stored = localStorage.getItem('bw-theme'); } catch (e) {}
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.setAttribute('data-theme', stored);
  }
  btn.addEventListener('click', function () {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = document.documentElement.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('bw-theme', next); } catch (e) {}
  });
})();

// Counts each stat number up from 0 once it scrolls into view
(function () {
  var nums = document.querySelectorAll('.stat .num');
  if (!nums.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce) { el.textContent = target; return; }
    var start = null;
    var duration = 1400;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
  var seen = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !seen.has(e.target)) { seen.add(e.target); run(e.target); }
    });
  }, { threshold: 0.4 });
  nums.forEach(function (el) { io.observe(el); });
})();