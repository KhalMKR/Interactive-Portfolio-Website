// Select elements
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');


// Add event listener for toggling
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

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
