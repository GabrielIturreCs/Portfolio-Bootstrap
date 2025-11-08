// Custom carousel for #carouselDestacado
// Features: autoplay, prev/next buttons, hover pause, keyboard navigation (when hovered), wrap-around
(function () {
  const AUTOPLAY_MS = 3500;
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carouselDestacado');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = Array.from(inner.querySelectorAll('.carousel-item'));
    if (!items.length) return;

    // ensure one active
    let activeIndex = items.findIndex(it => it.classList.contains('active'));
    if (activeIndex === -1) {
      activeIndex = 0;
      items[0].classList.add('active');
    }

    // make sure all items have role and aria-hidden for accessibility
    items.forEach((it, i) => {
      it.setAttribute('role', 'group');
      it.setAttribute('aria-roledescription', 'slide');
      it.setAttribute('aria-label', `${i+1} of ${items.length}`);
      if (i !== activeIndex) it.classList.remove('active');
      else it.classList.add('active');
    });

    const prevBtn = carousel.querySelector('.carousel-destacado-prev');
    const nextBtn = carousel.querySelector('.carousel-destacado-next');

    function showSlide(index) {
      const newIndex = ((index % items.length) + items.length) % items.length;
      if (newIndex === activeIndex) return;
      items[activeIndex].classList.remove('active');
      items[newIndex].classList.add('active');
      activeIndex = newIndex;
      // if there's a synced mini carousel, update it
      if (typeof syncMini === 'function') syncMini();
    }

    function prev() { showSlide(activeIndex - 1); }
    function next() { showSlide(activeIndex + 1); }

    // Bind buttons
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prev(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); next(); resetAutoplay(); });

    // Autoplay
    let autoplayId = null;
    function startAutoplay() {
      stopAutoplay();
      autoplayId = setInterval(() => { next(); }, AUTOPLAY_MS);
    }
    function stopAutoplay() { if (autoplayId) { clearInterval(autoplayId); autoplayId = null; } }
    function resetAutoplay() { stopAutoplay(); startAutoplay(); }

    // Pause on hover / focus within carousel
    let hovered = false;
    carousel.addEventListener('mouseenter', () => { hovered = true; stopAutoplay(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; startAutoplay(); });

    // Keyboard navigation when mouse is over carousel or when controls focused
    function handleKey(e) {
      if (!hovered) return;
      if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
      else if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
    }
    document.addEventListener('keydown', handleKey);

    // Make images clickable to open in new tab (full size) as a simple preview
    // If you have a custom lightbox in the page, you can adapt this to open it instead.
    items.forEach(it => {
      const img = it.querySelector('img');
      if (!img) return;
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        // open the image in a new tab for full view
        const src = img.getAttribute('src');
        if (src) window.open(src, '_blank');
        // user clicked manually -> reset autoplay
        resetAutoplay();
      });
    });

    // Start autoplay by default
    startAutoplay();

    // Expose small api for debugging from console if needed
    carousel._destacado = { startAutoplay, stopAutoplay, next, prev, showSlide };

    // --- Mirror / sync with a smaller bootstrap-styled carousel (if present) ---
    (function setupMiniSync(){
      const mini = document.getElementById('carouselSistemaMini');
      if (!mini) return;
      const miniInner = mini.querySelector('.carousel-inner');
      const indicators = mini.querySelector('.carousel-indicators');
      if (!miniInner || !indicators) return;

      // rebuild mini carousel content to match featured images
      miniInner.innerHTML = '';
      indicators.innerHTML = '';

      items.forEach((it, i) => {
        const newItem = document.createElement('div');
        newItem.className = 'carousel-item' + (i === activeIndex ? ' active' : '');
        const img = it.querySelector('img');
        if (img) {
          const clone = img.cloneNode(true);
          // ensure classes expected by bootstrap carousels
          clone.classList.remove('w-100');
          clone.classList.add('d-block', 'w-100', 'project-img');
          newItem.appendChild(clone);
        }
        miniInner.appendChild(newItem);

        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-bs-target', '#carouselSistemaMini');
        button.setAttribute('data-bs-slide-to', String(i));
        button.setAttribute('aria-label', `Slide ${i+1}`);
        if (i === activeIndex) { button.className = 'active'; button.setAttribute('aria-current','true'); }
        // clicking indicator will show that slide in featured
        button.addEventListener('click', (e) => { e.preventDefault(); showSlide(i); resetAutoplay(); });
        indicators.appendChild(button);
      });

      // wire mini controls (bootstrap markup) to control featured
      const miniPrev = mini.querySelector('.carousel-control-prev');
      const miniNext = mini.querySelector('.carousel-control-next');
      if (miniPrev) miniPrev.addEventListener('click', (e) => { e.preventDefault(); prev(); resetAutoplay(); });
      if (miniNext) miniNext.addEventListener('click', (e) => { e.preventDefault(); next(); resetAutoplay(); });

      // sync function used by featured when slide changes
      window.syncMini = function syncMini(){
        const miniItems = miniInner.querySelectorAll('.carousel-item');
        miniItems.forEach((mi, idx) => mi.classList.toggle('active', idx === activeIndex));
        const miniButtons = indicators.querySelectorAll('button');
        miniButtons.forEach((b, idx) => {
          b.classList.toggle('active', idx === activeIndex);
          if (idx === activeIndex) b.setAttribute('aria-current','true'); else b.removeAttribute('aria-current');
        });
      };

      // initial sync
      if (typeof syncMini === 'function') syncMini();
    })();
  });
})();
