document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 0. Palettes de style — auto-design ---------- */
  const palettes = [
    { name: "Bleu vif", night: "#071A33", nightMed: "#0E3A66", plum: "#2E7CF6", plumLight: "#5B9DFF", text: "#2B3A4A", bg: "#F5F8FC", heroEnd: "#123458", panel: "#EDF3FA", panelBorder: "#D3E1EF", inputBorder: "#C3D4E5" },
    { name: "Bleu institutionnel & Or", night: "#0A2647", nightMed: "#144272", plum: "#B8860B", plumLight: "#D9A94D", text: "#33414F", bg: "#F7F9FB", heroEnd: "#1B3358", panel: "#EEF2F6", panelBorder: "#D7E0E8", inputBorder: "#C7D3DE" },
    { name: "Bleu nuit & Violet brun", night: "#0E1330", nightMed: "#2B2F63", plum: "#8C5E6D", plumLight: "#B98A99", text: "#4B4458", bg: "#F7F5FA", heroEnd: "#4A3450", panel: "#F4F1F8", panelBorder: "#DDD1E3", inputBorder: "#D7C9DE" },
    { name: "Bleu profond & Or", night: "#0B1B33", nightMed: "#173357", plum: "#B98A3D", plumLight: "#D9AF6B", text: "#3E4652", bg: "#F6F7F9", heroEnd: "#2E4A3F", panel: "#F1F3EE", panelBorder: "#DCE1D4", inputBorder: "#CFD8C6" },
    { name: "Forêt & Terracotta", night: "#122419", nightMed: "#1F3C2A", plum: "#B4623F", plumLight: "#D3906E", text: "#3F4A40", bg: "#F6F7F2", heroEnd: "#4A3324", panel: "#F0EEE6", panelBorder: "#DED6C4", inputBorder: "#D2C8B0" },
    { name: "Prune & Rose poudré", night: "#221228", nightMed: "#402145", plum: "#A85C7C", plumLight: "#CE93AC", text: "#4A3E4E", bg: "#FAF6F8", heroEnd: "#5A2C46", panel: "#F5EEF2", panelBorder: "#E3D3DD", inputBorder: "#D8C2CF" },
    { name: "Bleu ardoise & Cuivre", night: "#151E2E", nightMed: "#2A3C54", plum: "#B4744B", plumLight: "#D6A176", text: "#42474F", bg: "#F5F6F8", heroEnd: "#3A2B22", panel: "#F0F1F3", panelBorder: "#DADEE3", inputBorder: "#CCD1D8" },
    { name: "Charbon & Émeraude", night: "#141613", nightMed: "#26382C", plum: "#3F8F6B", plumLight: "#72B996", text: "#3C443E", bg: "#F5F7F5", heroEnd: "#1E3327", panel: "#EFF3EF", panelBorder: "#D6E0D8", inputBorder: "#C6D3C9" },
    { name: "Marine & Sable doré", night: "#0C1E3D", nightMed: "#1B3865", plum: "#C79A56", plumLight: "#E1BE86", text: "#3B4250", bg: "#F8F7F3", heroEnd: "#2E3F2A", panel: "#F2F0E8", panelBorder: "#E1DBC7", inputBorder: "#D4CBB0" },
    { name: "Aubergine & Vert sauge", night: "#241726", nightMed: "#3E2740", plum: "#6E8B6A", plumLight: "#9BB897", text: "#463C48", bg: "#F7F5F4", heroEnd: "#33472F", panel: "#F1EFEA", panelBorder: "#DCDDD2", inputBorder: "#CBD0C1" },
    { name: "Bleu pétrole & Corail", night: "#0D2B2E", nightMed: "#164A4E", plum: "#C6684F", plumLight: "#E09A82", text: "#37484A", bg: "#F5F8F8", heroEnd: "#4A2B23", panel: "#EEF3F2", panelBorder: "#D5E2E0", inputBorder: "#C4D5D2" },
    { name: "Gris anthracite & Bordeaux", night: "#1B1B22", nightMed: "#32323E", plum: "#8E3A4C", plumLight: "#B76E7C", text: "#403F47", bg: "#F7F6F8", heroEnd: "#3D1E28", panel: "#F0EEF1", panelBorder: "#DCD9DE", inputBorder: "#CFC8CE" }
  ];

  const STORAGE_KEY = "portfolio-palette-index-v3";
  const root = document.documentElement;

  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
  };

  function applyPalette(index) {
    const p = palettes[index];
    root.style.setProperty('--night-dark', p.night);
    root.style.setProperty('--night-medium', p.nightMed);
    root.style.setProperty('--plum', p.plum);
    root.style.setProperty('--plum-light', p.plumLight);
    root.style.setProperty('--text-color', p.text);
    root.style.setProperty('--bg-page', p.bg);
    root.style.setProperty('--hero-accent-end', p.heroEnd);
    root.style.setProperty('--panel-bg', p.panel);
    root.style.setProperty('--panel-border', p.panelBorder);
    root.style.setProperty('--input-border', p.inputBorder);
    root.style.setProperty('--night-dark-rgb', hexToRgb(p.night));
    root.style.setProperty('--plum-rgb', hexToRgb(p.plum));
    root.style.setProperty('--plum-tint', `rgba(${hexToRgb(p.plum)}, 0.16)`);
    localStorage.setItem(STORAGE_KEY, index);
  }

  let currentIndex = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= palettes.length) {
    currentIndex = 0;
  }
  applyPalette(currentIndex);

  const switcherBtn = document.createElement('button');
  switcherBtn.className = 'style-switcher-btn';
  const updateBtnLabel = () => {
    switcherBtn.innerHTML = `<span class="swatch"></span> ${palettes[currentIndex].name}`;
  };
  switcherBtn.setAttribute('aria-label', 'Changer les couleurs du portfolio');
  document.body.appendChild(switcherBtn);
  updateBtnLabel();

  switcherBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % palettes.length;
    applyPalette(currentIndex);
    updateBtnLabel();
  });

  /* ---------- 1. Apparition au scroll, avec effet de cascade ---------- */
  /* Les photos de la galerie (.media-card) sont exclues pour qu'elles restent toujours visibles */
  const animatedItems = document.querySelectorAll(
    'main > section:not(#realisations), #realisations > h2, #realisations > ul, .experience-card, .columns ul li, section ul li'
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
    border-radius: 50%; border: none; background-color: var(--plum); color: #fff;
    font-size: 1.3em; cursor: pointer; box-shadow: 0 6px 16px rgba(var(--night-dark-rgb),0.35);
    opacity: 0; pointer-events: none; transform: translateY(12px);
    transition: opacity .3s ease, transform .3s ease, background-color .5s ease;
    z-index: 999;
  `;
  document.body.appendChild(backToTop);

  backToTop.addEventListener('mouseenter', () => backToTop.style.backgroundColor = 'var(--plum-light)');
  backToTop.addEventListener('mouseleave', () => backToTop.style.backgroundColor = 'var(--plum)');
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
