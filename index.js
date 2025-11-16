// --------------------------------------------------
// Accessibility: detect first Tab press
// --------------------------------------------------
const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

// --------------------------------------------------
// Back to top button
// --------------------------------------------------
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

const alterStyles = (isVisible) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = isVisible ? "visible" : "hidden";
  backToTopButton.style.opacity = isVisible ? 1 : 0;
  backToTopButton.style.transform = isVisible ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(true);
  } else {
    isBackToTopRendered = false;
    alterStyles(false);
  }
});

// --------------------------------------------------
// Generic helper for PDF viewers (Travaux, Notes…)
// --------------------------------------------------
function initPdfViewer(buttonSelector, viewerId) {
  const buttons = document.querySelectorAll(buttonSelector);
  const viewer = document.getElementById(viewerId);

  if (!buttons.length || !viewer) return; // nothing to do

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const file = this.getAttribute("data-file");
      if (file) {
        viewer.src = file; // change PDF in iframe
      }

      // update active button style
      buttons.forEach((b) => b.classList.remove("viewer-btn--active"));
      this.classList.add("viewer-btn--active");
    });
  });
}

// --------------------------------------------------
// Initialize viewers when DOM is ready
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Travaux demandés buttons (class="viewer-btn travaux-btn")
  initPdfViewer(".travaux-btn", "travauxViewer");

  // Notes de cours buttons (class="viewer-btn notes-btn")
  initPdfViewer(".notes-btn", "notesViewer");
});
