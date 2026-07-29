document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Apparition au scroll, avec effet de cascade ---------- */
  const animatedItems = document.querySelectorAll(
    'main > section, .experience-card, .columns ul li, section ul li'
  );

  animatedItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .6s ease ${(i % 6) * 0.06}s, transform .6s ease ${(i % 6) * 0.06}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedItems.forEach(el => revealObserver.observe(el));

  /* ---------- 2. Nav active + ombre de la navbar au scroll ---------- */
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navbar = document.querySelector('.navbar');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
      ? '0 4px 16px rgba(14, 19, 48, 0.35)'
      : '0 2px 8px rgba(0, 0, 0, 0.25)';
  });

  /* ---------- 3. Défilement fluide compensant la navbar sticky ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- 4. Bouton "remonter en haut" ---------- */
  const backToTop = document.createElement('button');
  backToTop.textContent = '↑';
  backToTop.setAttribute('aria-label', 'Remonter en haut de la page');
  backToTop.style.cssText = `
    position: fixed; bottom: 28px; right: 28px; width: 48px; height: 48px;
    border-radius: 50%; border: none; background-color: #8C5E6D; color: #fff;
    font-size: 1.3em; cursor: pointer; box-shadow: 0 6px 16px rgba(14,19,48,0.35);
    opacity: 0; pointer-events: none; transform: translateY(12px);
    transition: opacity .3s ease, transform .3s ease, background-color .3s ease;
    z-index: 999;
  `;
  document.body.appendChild(backToTop);

  backToTop.addEventListener('mouseenter', () => backToTop.style.backgroundColor = '#B98A99');
  backToTop.addEventListener('mouseleave', () => backToTop.style.backgroundColor = '#8C5E6D');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    backToTop.style.opacity = show ? '1' : '0';
    backToTop.style.pointerEvents = show ? 'auto' : 'none';
    backToTop.style.transform = show ? 'translateY(0)' : 'translateY(12px)';
  });

  /* ---------- 5. Validation et feedback du formulaire de contact ---------- */
  const form = document.querySelector('#contact form');
  if (form) {
    const fields = form.querySelectorAll('input, textarea');

    fields.forEach(field => {
      field.addEventListener('blur', () => {
        field.style.borderColor = field.checkValidity() ? '#D7C9DE' : '#B94A5E';
      });
      field.addEventListener('input', () => {
        if (field.checkValidity()) field.style.borderColor = '#D7C9DE';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Message noté ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2000);
    });
  }

});