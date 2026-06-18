/**
 * Doctor Clinic Website - Shared Vanilla JS Module
 * Handles: Sticky Header, Mobile Hamburger Menu, Active Page Links,
 * Scroll Reveal Animations, Custom Dialogs, and Interactive Gallery Lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initActiveLinks();
  initScrollReveal();
  initContactForms();
  initGalleryLightbox();
});

/**
 * 1. Sticky Header
 * Adds premium blur levels, border styling, and transitions on scroll.
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 15) {
      header.classList.add('bg-white/90', 'backdrop-blur-md-custom', 'shadow-md', 'border-b', 'border-slate-100');
      header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      header.classList.add('bg-transparent', 'border-transparent');
      header.classList.remove('bg-white/90', 'backdrop-blur-md-custom', 'shadow-md', 'border-b', 'border-slate-100');
    }
  };

  // Run immediately and on scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * 2. Mobile Menu Integration
 * Handles toggling mobile fly-out menu with graceful transitions and locking scroll.
 */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  
  if (!btn || !menu || !overlay) return;

  const toggleMenu = () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle active classes
    menu.classList.toggle('translate-x-0');
    menu.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
    overlay.classList.toggle('opacity-100');
    
    // Toggle hamburger icon animation
    const path1 = btn.querySelector('.line-1');
    const path2 = btn.querySelector('.line-2');
    const path3 = btn.querySelector('.line-3');

    if (path1 && path2 && path3) {
      if (isExpanded) {
        // Change to sandwich
        path1.style.transform = 'none';
        path2.style.opacity = '1';
        path3.style.transform = 'none';
      } else {
        // Change to X
        path1.style.transform = 'translateY(6px) rotate(45deg)';
        path2.style.opacity = '0';
        path3.style.transform = 'translateY(-6px) rotate(-45deg)';
      }
    }

    // Toggle scroll lock on body
    document.body.classList.toggle('overflow-hidden');
  };

  btn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Close when clicking empty space or link inside
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (btn.getAttribute('aria-expanded') === 'true') {
        toggleMenu();
      }
    });
  });
}

/**
 * 3. Highlights the active section in navigation based on current filename
 */
function initActiveLinks() {
  const currentPath = window.location.pathname;
  const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === 'index.html' && href === './') || (filename === 'index.html' && href === '/')) {
      link.classList.add('text-sky-600', 'font-semibold');
      link.classList.remove('text-slate-600');
      
      // Underline highlight if it is desktop
      const underline = link.querySelector('.nav-underline');
      if (underline) {
        underline.classList.remove('scale-x-0');
        underline.classList.add('scale-x-100');
      }
    } else {
      link.classList.remove('text-sky-600', 'font-semibold');
      link.classList.add('text-slate-600');
      
      const underline = link.querySelector('.nav-underline');
      if (underline) {
        underline.classList.remove('scale-x-100');
        underline.classList.add('scale-x-0');
      }
    }
  });
}

/**
 * 4. Intersection Observer for Smooth Scroll Reveal Effects
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Option to unobserve once revealed for performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1, // trigger when 10% visible
    rootMargin: '0px 0px -40px 0px' // slightly before arriving
  });

  reveailsToObserve();

  function reveailsToObserve() {
    reveals.forEach(el => observer.observe(el));
  }
}

/**
 * 5. Modern Custom Confirmation Modals for Appointment / Contact Forms
 * Replaces window.alert according to environment guidelines.
 */
function initContactForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Gather data
      const formData = new FormData(form);
      const name = formData.get('name') || formData.get('parentName') || 'Valued Patient';
      const service = formData.get('service') || '';
      
      let message = `Thank you, ${name}. We have received your consultation message and will respond within 2 hours.`;
      if (form.id === 'booking-form') {
        const date = formData.get('date') || 'requested date';
        const time = formData.get('time') || 'requested time';
        message = `Thank you, ${name}. Your appointment for standard ${service || 'consultation'} on ${date} at ${time} has been requested successfully. One of our clinical coordinators will call you shortly to confirm!`;
      }

      showCustomModal('Success', message);
      form.reset();
    });
  });
}

/**
 * Appends a highly stylized modal dialog warning or confirmation to the body
 */
function showCustomModal(title, text) {
  // Remove existing
  const existing = document.getElementById('custom-alert-modal');
  if (existing) existing.remove();

  const modalMarkup = `
    <div id="custom-alert-modal" class="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center transform scale-95 transition-transform duration-300 border border-slate-100">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-display font-bold text-slate-900 mb-2">${title}</h3>
        <p class="text-slate-600 mb-6 text-sm leading-relaxed">${text}</p>
        <button id="close-modal-btn" class="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-semibold transition-all shadow-md shadow-sky-200 cursor-pointer">
          Perfect, Thank you
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalMarkup);
  const modal = document.getElementById('custom-alert-modal');
  const innerCard = modal.querySelector('div');
  const closeBtn = document.getElementById('close-modal-btn');

  // Trigger animations
  setTimeout(() => {
    modal.classList.add('opacity-100');
    innerCard.classList.remove('scale-95');
    innerCard.classList.add('scale-100');
  }, 10);

  const closeModal = () => {
    modal.classList.remove('opacity-100');
    innerCard.classList.remove('scale-100');
    innerCard.classList.add('scale-95');
    setTimeout(() => {
      modal.remove();
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * 6. Interactive Professional Gallery Lightbox
 * Provides sliding left/right, loading states, and elegant closing.
 */
function initGalleryLightbox() {
  const items = document.querySelectorAll('[data-gallery-src]');
  if (items.length === 0) return;

  // Compile items array
  const galleryList = Array.from(items).map(item => ({
    src: item.getAttribute('data-gallery-src'),
    title: item.getAttribute('data-gallery-title') || 'Clinic Feature',
    desc: item.getAttribute('data-gallery-description') || 'In our pristine facilities.'
  }));

  let currentIndex = 0;

  // Insert Lightbox HTML structure once
  if (!document.getElementById('gallery-lightbox')) {
    const lightboxMarkup = `
      <div id="gallery-lightbox" class="fixed inset-0 z-200 hidden bg-slate-950/95 backdrop-blur-md transition-opacity duration-300 opacity-0 select-none flex-col justify-between">
        <!-- Lightbox Header -->
        <div class="w-full flex items-center justify-between p-4 md:p-6 text-white bg-gradient-to-b from-slate-950/80 to-transparent">
          <div>
            <h4 id="lightbox-caption-title" class="font-display font-bold text-lg md:text-xl tracking-tight text-white leading-none"></h4>
            <span id="lightbox-counter" class="text-xs text-slate-400 font-mono mt-1 block"></span>
          </div>
          <button id="lightbox-close" class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white cursor-pointer" aria-label="Close Lightbox">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Lightbox Content Base -->
        <div class="relative flex-1 flex items-center justify-center p-4">
          <!-- Navigation Arrow Left -->
          <button id="lightbox-prev" class="absolute left-4 md:left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10" aria-label="Previous Image">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <!-- Main Image Shell -->
          <div class="w-full max-w-4xl max-h-[70vh] flex flex-col items-center justify-center">
            <img id="lightbox-img" src="" alt="Clinic Presentation" class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl scale-95 opacity-0 transition-all duration-300 border border-white/10" referrerPolicy="no-referrer">
          </div>

          <!-- Navigation Arrow Right -->
          <button id="lightbox-next" class="absolute right-4 md:right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10" aria-label="Next Image">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Lightbox Footer -->
        <div class="w-full p-4 md:p-6 text-center text-slate-300 bg-gradient-to-t from-slate-950/80 to-transparent">
          <p id="lightbox-caption-desc" class="text-sm text-balance max-w-xl mx-auto"></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxMarkup);
  }

  const lightbox = document.getElementById('gallery-lightbox');
  const lImg = document.getElementById('lightbox-img');
  const lTitle = document.getElementById('lightbox-caption-title');
  const lDesc = document.getElementById('lightbox-caption-desc');
  const lCounter = document.getElementById('lightbox-counter');
  const lClose = document.getElementById('lightbox-close');
  const lPrev = document.getElementById('lightbox-prev');
  const lNext = document.getElementById('lightbox-next');

  const updateLightbox = (idx) => {
    currentIndex = idx;
    const currentItem = galleryList[currentIndex];
    
    // Animate out previous image
    lImg.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
      lImg.src = currentItem.src;
      lTitle.textContent = currentItem.title;
      lDesc.textContent = currentItem.desc;
      lCounter.textContent = `${currentIndex + 1} of ${galleryList.length}`;
      
      // Animate in loaded image
      lImg.onload = () => {
        lImg.classList.remove('scale-95', 'opacity-0');
        lImg.classList.add('scale-100', 'opacity-100');
      };
    }, 150);
  };

  const openLightbox = (idx) => {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    setTimeout(() => {
      lightbox.classList.add('opacity-100');
    }, 10);
    updateLightbox(idx);
    document.body.classList.add('overflow-hidden');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('opacity-100');
    lImg.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }, 300);
    document.body.classList.remove('overflow-hidden');
  };

  const nextImage = () => {
    let nextIdx = currentIndex + 1;
    if (nextIdx >= galleryList.length) nextIdx = 0;
    updateLightbox(nextIdx);
  };

  const prevImage = () => {
    let prevIdx = currentIndex - 1;
    if (prevIdx < 0) prevIdx = galleryList.length - 1;
    updateLightbox(prevIdx);
  };

  // Bind click listeners on gallery cards
  items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Controls listeners
  lClose.addEventListener('click', closeLightbox);
  lPrev.addEventListener('click', prevImage);
  lNext.addEventListener('click', nextImage);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lightbox-img-shell' || e.target.tagName === 'DIV' && e.target.classList.contains('relative')) {
      closeLightbox();
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });
}
