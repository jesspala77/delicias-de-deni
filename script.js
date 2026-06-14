// Smooth scroll anchor behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Lazy load images for performance
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

// Add scroll animation for elements
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .package, .section').forEach(el => {
  animationObserver.observe(el);
});

// Track WhatsApp clicks with Google Analytics
function trackWhatsAppClick(text) {
  if (window.gtag) {
    gtag('event', 'whatsapp_order', {
      'event_category': 'engagement',
      'event_label': text
    });
  }
}

// Phone number tracking
function trackPhoneClick() {
  if (window.gtag) {
    gtag('event', 'phone_call', {
      'event_category': 'engagement',
      'event_label': 'Direct Call'
    });
  }
}

// Add smooth header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    header.style.boxShadow = 'var(--shadow)';
  } else {
    header.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Mobile menu toggle (if needed for future expansion)
function setupMobileMenu() {
  const nav = document.querySelector('nav');
  if (window.innerWidth < 768) {
    nav.classList.add('mobile');
  }
}

setupMobileMenu();
window.addEventListener('resize', setupMobileMenu);

// Performance: Prefetch WhatsApp links
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
  link.rel = 'prefetch';
});

console.log('🎉 Delicias de Deni - Ready to serve!');
