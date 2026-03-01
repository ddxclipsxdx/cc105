(function() {

  const timelineHeader = document.getElementById('timelineHeader');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const slidesContainer = document.getElementById('slidesContainer');
  const slides = document.querySelectorAll('.slide');
  const slideCounter = document.getElementById('slideCounter');

  // Evolution slides:
  // 0 = cover
  // 1 = whatIsER
  // 2 = evol1976
  // 3 = evol1980
  // 4 = evol1990
  // 5 = evol2000
  // 6 = evolToday
  const EVOL_START_INDEX = 2;
  const EVOL_END_INDEX = 6;

  // -----------------------------
  // Detect Active Slide
  // -----------------------------
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

  // -----------------------------
  // Update Timeline + Counter UI
  // -----------------------------
  function updateUI() {

    const activeIndex = getActiveSlideIndex();

    // Remove timeline padding from all slides first
    slides.forEach(slide => {
      slide.classList.remove('with-timeline');
    });

    // Show timeline only on evolution slides (2 to 6)
    if (activeIndex >= EVOL_START_INDEX && activeIndex <= EVOL_END_INDEX) {
      timelineHeader.classList.add('visible');
      slides[activeIndex].classList.add('with-timeline');
    } else {
      timelineHeader.classList.remove('visible');
    }

    // Update timeline dots
    timelineItems.forEach((item, i) => {

      const correspondingSlideIndex = EVOL_START_INDEX + i;

      if (activeIndex === correspondingSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }

    });

    // Update floating slide counter (1-indexed)
    slideCounter.textContent = (activeIndex + 1) + " / " + slides.length;
  }

  // -----------------------------
  // Timeline Dot Click Navigation
  // -----------------------------
  timelineItems.forEach((item, index) => {

    item.addEventListener('click', function(e) {

      e.stopPropagation();

      const targetSlideIndex = EVOL_START_INDEX + index;

      if (targetSlideIndex < slides.length) {
        slides[targetSlideIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start'
        });
      }

    });

  });

  // -----------------------------
  // Scroll Listener
  // -----------------------------
  slidesContainer.addEventListener('scroll', function() {
    requestAnimationFrame(updateUI);
  });

  // -----------------------------
  // Load & Resize Handling
  // -----------------------------
  window.addEventListener('load', function() {
    setTimeout(updateUI, 100);
  });

  window.addEventListener('resize', function() {
    requestAnimationFrame(updateUI);
  });

})();
