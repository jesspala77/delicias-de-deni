// Smooth scroll anchor behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Lazy load any future image tags that use data-src.
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Add subtle entrance state to the main visual groups.
if ('IntersectionObserver' in window) {
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.favorites, .photo-section, .contact-band').forEach(el => {
    animationObserver.observe(el);
  });
}

function trackWhatsAppClick(text) {
  if (window.gtag) {
    gtag('event', 'whatsapp_order', {
      event_category: 'engagement',
      event_label: text
    });
  }
}

function trackPhoneClick() {
  if (window.gtag) {
    gtag('event', 'phone_call', {
      event_category: 'engagement',
      event_label: 'Direct Call'
    });
  }
}

const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', scrollTop > 80);
  });
}

console.log('Delicias de Deni website ready.');
