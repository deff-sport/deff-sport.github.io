// Fonction pour le menu mobile
function toggleMenu() {
  const nav = document.getElementById('navlinks');
  nav.classList.toggle('open');
}

// Observer pour les animations au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Mise à jour de l'année dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Compteurs animés pour les stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
        counter.classList.add('animated');
      }
    };
    
    // Observer pour déclencher l'animation quand l'élément est visible
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counterObserver.observe(counter.parentElement);
  });
}

// FAQ Accordéon
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Fermer les autres items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle l'item actuel
      item.classList.toggle('active');
    });
  });
}

// Animation des cartes de pricing au hover
function initPricingHover() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('featured')) {
        card.style.transform = 'scale(1.05)';
      } else {
        card.style.transform = 'translateY(0)';
      }
      card.style.boxShadow = 'none';
    });
  });
}

// Smooth scroll pour les liens d'ancrage
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fermer le menu mobile si ouvert
        const nav = document.getElementById('navlinks');
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
        }
      }
    });
  });
}

// Animation des icônes de features
function animateFeatureIcons() {
  const featureIcons = document.querySelectorAll('.feature-icon');
  
  featureIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.1) rotate(5deg)';
      icon.style.background = 'rgba(224, 146, 0, 0.2)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.background = 'rgba(224, 146, 0, 0.1)';
    });
  });
}

// Effet parallaxe pour la hero section
function initParallax() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }
}

// Gestionnaire de formulaire de contact
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const objective = document.getElementById('objective').value;
      const message = document.getElementById('message').value.trim();

      const status = document.getElementById('formStatus');

      // Validation email
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = "Merci d'indiquer un email valide.";
        status.style.color = '#ffb4b4';
        return;
      }
      
      // Validation objectif
      if (!objective) {
        status.textContent = "Choisis un objectif.";
        status.style.color = '#ffb4b4';
        return;
      }

      // Simulation d'envoi (remplacer par appel API réel)
      const payload = {
        name, 
        email, 
        phone, 
        objective, 
        message, 
        submittedAt: new Date().toISOString()
      };
      
      // Stockage local (à remplacer par un vrai envoi)
      localStorage.setItem('deffsport_last_form', JSON.stringify(payload));
      
      // Message de succès
      status.textContent = "Merci ! Ton inscription a été prise en compte. Nous revenons vers toi très vite.";
      status.style.color = '#e09200';
      status.style.fontWeight = '600';

      // Réinitialisation du formulaire
      form.reset();
      
      // Redirection après succès (optionnel)
      setTimeout(() => {
        window.location.href = 'merci.html';
      }, 3000);
    });
  }
}

// Animation de typing pour le titre hero (optionnel)
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero h1');
  
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Démarrer l'effet typing quand la section est visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriter();
          heroObserver.unobserve(entry.target);
        }
      });
    });
    
    heroObserver.observe(heroTitle);
  }
}

// Gestionnaire de lazy loading pour les images
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Animation au scroll améliorée avec délais
function enhanceScrollAnimations() {
  const enhancedIO = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Délai progressif basé sur l'index
        const delay = (index % 6) * 100;
        entry.target.style.animationDelay = `${delay}ms`;
        entry.target.classList.add('enhanced-visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.setAttribute('data-delay', (index % 6) * 100);
    enhancedIO.observe(el);
  });
}

// Gestionnaire de résize pour optimiser les performances
function initResizeHandler() {
  let resizeTimeout;
  
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Réinitialiser les animations si nécessaire
      const nav = document.getElementById('navlinks');
      if (window.innerWidth > 820 && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    }, 250);
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Deff Sport - Initialisation des fonctionnalités...');
  
  // Initialisation des fonctionnalités
  animateCounters();
  initFAQ();
  initPricingHover();
  initSmoothScroll();
  animateFeatureIcons();
  initParallax();
  initContactForm();
  initLazyLoading();
  enhanceScrollAnimations();
  initResizeHandler();
  
  // Effet typing optionnel (décommenter si souhaité)
  // initTypingEffect();
  
  // Gestionnaire pour le bouton "show" existant
  const showButton = document.querySelector('.show');
  if (showButton) {
    showButton.addEventListener('click', () => {
      const reponse = document.querySelector('.r');
      if (reponse) {
        reponse.style.visibility = 'visible';
        reponse.style.opacity = '1';
        reponse.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Préchargement des images importantes
  function preloadImages() {
    const imageUrls = [
      'img/main.webp',
      'img/muscu.jpg',
      'img/box.webp',
      'img/gym.avif',
      'img/prod.webp',
      'img/loc.jpg',
      'img/fit.webp',
      'img/lava.jpg'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
  
  preloadImages();
});

// Gestionnaire d'erreurs global
window.addEventListener('error', function(e) {
  console.error('Erreur JavaScript:', e.error);
});

// Service Worker pour le cache (optionnel pour PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker enregistré avec succès: ', registration.scope);
      })
      .catch(function(error) {
        console.log("Échec de l'enregistrement du ServiceWorker: ", error);
      });
  });
}

// Gestion du bouton back to top (à ajouter si besoin)
function initBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.className = 'back-to-top';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--dark);
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Démarrer back to top si besoin (décommenter)
// initBackToTop();

// Export des fonctions principales pour une utilisation externe si nécessaire
window.DeffSport = {
  toggleMenu,
  animateCounters,
  initFAQ,
  initContactForm
};