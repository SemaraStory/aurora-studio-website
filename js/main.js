/* ========================================
   AURORA STUDIO — MAIN JS
   Vanilla JS, no dependencies
   ======================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Preloader
  const preloader = $('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('is-hidden'), 400);
  });

  // Custom Cursor
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');

  if (cursor && follower && !prefersReducedMotion && matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animate = () => {
      followerX = lerp(followerX, mouseX, 0.15);
      followerY = lerp(followerY, mouseY, 0.15);
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    const hoverables = 'a, button, input, textarea, [data-magnetic], .service-card, .work-card, .faq__question';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.add('is-hover');
        follower.classList.add('is-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.remove('is-hover');
        follower.classList.remove('is-hover');
      }
    });
  }

  // Scroll progress + nav + back-to-top
  const scrollProgress = $('#scrollProgress');
  const nav = $('#nav');
  const backToTop = $('#backToTop');

  const updateScroll = () => {
    if (scrollProgress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = ((window.scrollY / h) * 100) + '%';
    }
    if (nav) {
      nav.classList.toggle('is-scrolled', window.scrollY > 30);
    }
    if (backToTop) {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }
  };

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { updateScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  // Mobile nav
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');

  navToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  $$('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('is-open');
      navToggle?.classList.remove('is-active');
    });
  });

  // Active link highlight
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  const observerActive = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => observerActive.observe(s));

  // Reveal on scroll
  if (!prefersReducedMotion) {
    const observerReveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observerReveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $$('.reveal').forEach((el) => observerReveal.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  // Counter
  const counters = $$('[data-counter]');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '+';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observerCounter = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerCounter.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observerCounter.observe(c));

  // Magnetic buttons
  if (!prefersReducedMotion) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // Service card glow
  $$('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  // Tilt
  if (!prefersReducedMotion) {
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  // Slider
  const track = $('#sliderTrack');
  const prev = $('#sliderPrev');
  const next = $('#sliderNext');
  const dotsWrap = $('#sliderDots');

  if (track && prev && next && dotsWrap) {
    const slides = $$('.slide', track);
    let index = 0;
    let autoPlayId;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider__dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = $$('.slider__dot', dotsWrap);

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === index));
    };

    prev.addEventListener('click', () => { goTo(index - 1); resetAuto(); });
    next.addEventListener('click', () => { goTo(index + 1); resetAuto(); });

    const startAuto = () => { autoPlayId = setInterval(() => goTo(index + 1), 6000); };
    const resetAuto = () => { clearInterval(autoPlayId); startAuto(); };
    startAuto();

    const slider = track.closest('.slider');
    slider?.addEventListener('mouseenter', () => clearInterval(autoPlayId));
    slider?.addEventListener('mouseleave', startAuto);

    slider?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goTo(index - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(index + 1); resetAuto(); }
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        goTo(index + (dx < 0 ? 1 : -1));
        resetAuto();
      }
    });
  }

  // FAQ single-open
  const faqItems = $$('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => { if (other !== item) other.open = false; });
      }
    });
  });

  // Form validation
  const form = $('#contactForm');
  const formSuccess = $('#formSuccess');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Nama minimal 2 karakter.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email tidak valid.',
    message: (v) => v.trim().length >= 10 || 'Pesan minimal 10 karakter.'
  };

  const validateField = (input) => {
    const err = input.parentElement.querySelector('.form__error');
    const check = validators[input.name];
    if (!check) return true;
    const result = check(input.value);
    if (result === true) {
      input.classList.remove('is-invalid');
      if (err) err.textContent = '';
      return true;
    } else {
      input.classList.add('is-invalid');
      if (err) err.textContent = result;
      return false;
    }
  };

  form?.addEventListener('blur', (e) => {
    if (e.target.matches('input, textarea')) validateField(e.target);
  }, true);

  form?.addEventListener('input', (e) => {
    if (e.target.classList.contains('is-invalid')) validateField(e.target);
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = $$('input, textarea', form);
    let ok = true;
    inputs.forEach((i) => { if (!validateField(i)) ok = false; });

    if (ok) {
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<span>Mengirim...</span>';
      btn.disabled = true;

      setTimeout(() => {
        formSuccess?.classList.add('is-visible');
        form.reset();
        btn.innerHTML = original;
        btn.disabled = false;
        setTimeout(() => formSuccess?.classList.remove('is-visible'), 5000);
      }, 1200);
    }
  });

  // Newsletter
  const newsletterForm = $('.footer__newsletter');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      const original = newsletterForm.innerHTML;
      newsletterForm.innerHTML = '<span style="padding:10px;color:#22c55e;">✓ Terima kasih!</span>';
      setTimeout(() => { newsletterForm.innerHTML = original; }, 3000);
    }
  });

  updateScroll();

  console.log('%c✨ Aurora Studio loaded.', 'color:#7c3aed;font-weight:bold;font-size:14px;');
})();
