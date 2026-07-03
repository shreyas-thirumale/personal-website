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

// Theme switcher
const savedTheme = localStorage.getItem('portfolio-theme') || 'gold';
applyTheme(savedTheme);

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
  });
});

function applyTheme(theme) {
  document.body.classList.remove('theme-purple', 'theme-gold');
  if (theme === 'purple') {
    document.body.classList.add('theme-purple');
  }
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}
