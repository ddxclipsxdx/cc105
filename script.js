(function() {

  const timelineHeader = document.getElementById('timelineHeader');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const slidesContainer = document.getElementById('slidesContainer');
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');
  const cards = document.querySelectorAll('.card');

  const EVOL_START_INDEX = 2;
  const EVOL_END_INDEX = 6;

  const DESIGN_WIDTH = 1300; // your desktop card width

  /* ============================= */
  /* MOBILE SCALE FUNCTION */
  /* ============================= */

  function applyMobileScale() {

    const screenWidth = window.innerWidth;

    if (screenWidth < DESIGN_WIDTH) {

      const scale = screenWidth / DESIGN_WIDTH;

      cards.forEach(card => {
        card.style.transform = `scale(${scale})`;
        card.style.transformOrigin = "top center";
      });

      slides.forEach(slide => {
        slide.style.justifyContent = "flex-start";
      });

    } else {

      cards.forEach(card => {
        card.style.transform = "scale(1)";
      });

      slides.forEach(slide => {
        slide.style.justifyContent = "center";
      });

    }
  }

  /* ============================= */
  /* ACTIVE SLIDE DETECTION */
  /* ============================= */

  function getActiveSlideIndex() {

    const containerRect = slidesContainer.getBoundingClientRect();
    const containerLeft = containerRect.left;

    let activeIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {

      const slideRect = slide.getBoundingClientRect();
      const distance = Math.abs(slideRect.left - containerLeft);

      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }

    });

    return activeIndex;
  }

  /* ============================= */
  /* UPDATE UI */
  /* ============================= */

  function updateUI() {

    const activeIndex = getActiveSlideIndex();

    slides.forEach(slide => slide.classList.remove('with-timeline'));

    if (activeIndex >= EVOL_START_INDEX && activeIndex <= EVOL_END_INDEX) {
      timelineHeader.classList.add('visible');
      slides[activeIndex].classList.add('with-timeline');
    } else {
      timelineHeader.classList.remove('visible');
    }

    timelineItems.forEach((item, i) => {

      const targetIndex = EVOL_START_INDEX + i;

      if (activeIndex === targetIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }

    });

    slideCounter.textContent = (activeIndex + 1) + " / " + slides.length;
  }

  /* ============================= */
  /* TIMELINE CLICK */
  /* ============================= */

  timelineItems.forEach((item, index) => {

    item.addEventListener('click', function(e) {

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

  /* ============================= */
  /* EVENT LISTENERS */
  /* ============================= */

  slidesContainer.addEventListener('scroll', () => {
    requestAnimationFrame(updateUI);
  });

  window.addEventListener('load', () => {
    applyMobileScale();
    setTimeout(updateUI, 100);
  });

  window.addEventListener('resize', () => {
    applyMobileScale();
    requestAnimationFrame(updateUI);
  });

})();
