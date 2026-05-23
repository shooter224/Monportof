const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

const cards = document.querySelectorAll('.card');
if (cards.length > 0) {
  cards.forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 18;
      const py = (y / rect.height - 0.5) * 18;

      card.style.transform = `perspective(900px) rotateY(${px}deg) rotateX(${-py}deg) scale(1.02)`;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 224, 0.18), rgba(255, 255, 255, 0.05) 40%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.background = '';
    });
  });
}

const animatedElements = document.querySelectorAll('.hero-content, .card, .glass-card, .page h1, footer');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));

