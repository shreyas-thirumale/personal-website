document.addEventListener('DOMContentLoaded', () => {

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // Experience cards — click to open link
  document.querySelectorAll('.experience[data-github]').forEach(card => {
    card.addEventListener('click', () => {
      window.open(card.dataset.github, '_blank');
    });
  });

  // Project carousel — 3D coverflow
  const track = document.querySelector('.carousel-track');
  if (track) {
    const cards = Array.from(track.querySelectorAll('.project-card'));
    const dots  = Array.from(document.querySelectorAll('.carousel-dot'));
    const total = cards.length;
    let current = 0;
    let autoTimer = null;

    function positionCards() {
      cards.forEach((card, i) => {
        let pos = i - current;
        if (pos > Math.floor(total / 2))  pos -= total;
        if (pos < -Math.floor(total / 2)) pos += total;
        card.dataset.pos = Math.max(-3, Math.min(3, pos));
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(index) {
      current = ((index % total) + total) % total;
      positionCards();
      resetAuto();
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 3500);
    }

    positionCards();
    resetAuto();

    document.querySelector('.carousel-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.carousel-next')?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    track.addEventListener('click', e => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const pos = parseInt(card.dataset.pos);
      if (pos !== 0) {
        e.preventDefault();
        goTo(current + pos);
      }
    });

    let startX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
    track.addEventListener('touchend',   e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    });

    track.addEventListener('mouseenter', () => clearInterval(autoTimer));
    track.addEventListener('mouseleave', () => resetAuto());
  }

  // Theme switcher
  const savedTheme = localStorage.getItem('portfolio-theme') || 'pokemon';
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('portfolio-theme', theme);
    });
  });

  function applyTheme(theme) {
    document.body.classList.remove('theme-purple', 'theme-gold', 'theme-pokemon');
    if (theme === 'purple') {
      document.body.classList.add('theme-purple');
    } else if (theme === 'pokemon') {
      document.body.classList.add('theme-pokemon');
    }
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

});
