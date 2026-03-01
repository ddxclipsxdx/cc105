(function() {

  const timelineHeader = document.getElementById('timelineHeader');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const slidesContainer = document.getElementById('slidesContainer');
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');

  const EVOL_START_INDEX = 2;
  const EVOL_END_INDEX = 6;

  /* ========================================= */
  /* CHECK IF MOBILE LAYOUT IS ACTIVE */
  /* ========================================= */

  function isMobileLayout() {
    return window.innerWidth <= 768;
  }

  /* ========================================= */
  /* GET ACTIVE SLIDE INDEX */
  /* ========================================= */

  function getActiveSlideIndex() {

    let activeIndex = 0;

    if (isMobileLayout()) {

      // Vertical detection (mobile)
      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      slides.forEach((slide, index) => {

        const rect = slide.getBoundingClientRect();
        const slideTop = rect.top + window.scrollY;
        const slideHeight = slide.offsetHeight;

        if (
          viewportTop + viewportHeight / 2 >= slideTop &&
          viewportTop + viewportHeight / 2 < slideTop + slideHeight
        ) {
          activeIndex = index;
        }

      });

    } else {

      // Horizontal detection (desktop)
      const containerRect = slidesContainer.getBoundingClientRect();
      const containerLeft = containerRect.left;

      let minDistance = Infinity;

      slides.forEach((slide, index) => {

        const slideRect = slide.getBoundingClientRect();
        const distance = Math.abs(slideRect.left - containerLeft);

        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }

      });

    }

    return activeIndex;
  }

  /* ========================================= */
  /* UPDATE UI (Timeline + Counter) */
  /* ========================================= */

  function updateUI() {

    const activeIndex = getActiveSlideIndex();

    // Remove timeline padding from all slides
    slides.forEach(slide => {
      slide.classList.remove('with-timeline');
    });

    if (!isMobileLayout()) {

      // Timeline only works on desktop
      if (activeIndex >= EVOL_START_INDEX && activeIndex <= EVOL_END_INDEX) {
        timelineHeader.classList.add('visible');
        slides[activeIndex].classList.add('with-timeline');
      } else {
        timelineHeader.classList.remove('visible');
      }

      // Update timeline dots
      timelineItems.forEach((item, i) => {

        const targetIndex = EVOL_START_INDEX + i;

        if (activeIndex === targetIndex) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }

      });

    } else {

      // On mobile, always hide timeline
      timelineHeader.classList.remove('visible');

      timelineItems.forEach(item => {
        item.classList.remove('active');
      });

    }

    // Update floating slide counter
    slideCounter.textContent = (activeIndex + 1) + " / " + slides.length;
  }

  /* ========================================= */
  /* TIMELINE CLICK NAVIGATION (DESKTOP ONLY) */
  /* ========================================= */

  timelineItems.forEach((item, index) => {

    item.addEventListener('click', function(e) {

      if (isMobileLayout()) return;

      e.stopPropagation();

      const targetIndex = EVOL_START_INDEX + index;

      if (targetIndex < slides.length) {

        slides[targetIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start'
        });

      }

    });

  });

  /* ========================================= */
  /* EVENT LISTENERS */
  /* ========================================= */

  // Desktop horizontal scroll
  slidesContainer.addEventListener('scroll', function() {
    if (!isMobileLayout()) {
      requestAnimationFrame(updateUI);
    }
  });

  // Mobile vertical scroll
  window.addEventListener('scroll', function() {
    if (isMobileLayout()) {
      requestAnimationFrame(updateUI);
    }
  });

  window.addEventListener('load', function() {
    setTimeout(updateUI, 100);
  });

  window.addEventListener('resize', function() {
    requestAnimationFrame(updateUI);
  });

})();
