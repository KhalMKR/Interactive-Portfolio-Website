// Select elements
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const slider = document.querySelector('.projects-scroll');

// Add event listener for toggling
if (toggleBtn && sidebar) {
  const mobileBreakpoint = window.matchMedia('(max-width: 900px)');

  const syncMobileState = () => {
    if (mobileBreakpoint.matches) {
      sidebar.classList.add('collapsed');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      sidebar.classList.remove('collapsed');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  };

  syncMobileState();
  mobileBreakpoint.addEventListener('change', syncMobileState);

  toggleBtn.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
  });

  sidebar.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileBreakpoint.matches) {
        sidebar.classList.add('collapsed');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Scroll-to-images button
const gotoImagesBtn = document.getElementById('goto-images-btn');
if (gotoImagesBtn) {
  gotoImagesBtn.addEventListener('click', (e) => {
    const imagesSection = document.getElementById('images');
    if (imagesSection) {
      imagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}


let isDown = false;
let startX = 0;
let scrollLeft = 0;
let isDragging = false; // new: track whether a drag actually happened

if (slider) {
  // Use pointer events for mouse + touch + pen support
  slider.addEventListener('pointerdown', (e) => {
    isDown = true;
    isDragging = false;              // reset on new pointerdown
    slider.classList.add('active');
    slider.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = slider.scrollLeft;
    slider.style.userSelect = 'none';
  });

  slider.addEventListener('pointerup', (e) => {
    isDown = false;
    // slight delay to allow click suppression to work reliably
    setTimeout(() => { isDragging = false; }, 0);
    slider.classList.remove('active');
    try { slider.releasePointerCapture(e.pointerId); } catch (err) {}
    slider.style.userSelect = '';
  });

  slider.addEventListener('pointercancel', () => {
    isDown = false;
    isDragging = false;
    slider.classList.remove('active');
    slider.style.userSelect = '';
  });

  slider.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 2; // adjust scroll speed
    // if movement passes a small threshold, mark as dragging
    if (Math.abs(x - startX) > 6) isDragging = true;
    slider.scrollLeft = scrollLeft - walk;
  });

  // convert vertical wheel to horizontal scroll for better UX on touchpads/mice
  slider.addEventListener('wheel', (e) => {
    // if shiftKey or horizontal delta present, let default happen
    if (Math.abs(e.deltaX) > 0 || e.shiftKey) return;
    // otherwise translate vertical wheel into horizontal scroll
    slider.scrollLeft += e.deltaY;
    e.preventDefault();
  }, { passive: false });

  // prevent click activation on cards/links when the user was dragging
  slider.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { capture: true });
}


