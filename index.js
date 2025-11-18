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

const alterStyles = (isVisible) => {
  if (!backToTopButton) return;
  backToTopButton.style.visibility = isVisible ? "visible" : "hidden";
  backToTopButton.style.opacity = isVisible ? 1 : 0;
  backToTopButton.style.transform = isVisible ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    alterStyles(true);
  } else {
    alterStyles(false);
  }
});

// --------------------------------------------------
// Generic helper for PDF viewers (Travaux, Notes…)
// --------------------------------------------------
function initPdfViewer(buttonSelector, viewerId) {
  const buttons = document.querySelectorAll(buttonSelector);
  const viewer = document.getElementById(viewerId);

  if (!buttons.length || !viewer) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const file = btn.getAttribute("data-file");
      if (file) {
        viewer.src = file;
      }

      buttons.forEach((b) => b.classList.remove("viewer-btn--active"));
      btn.classList.add("viewer-btn--active");
    });
  });
}

// --------------------------------------------------
// Initialize viewers when DOM is ready
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Travaux demandés
  initPdfViewer(".travaux-btn", "travauxViewer");

  // Notes de cours
  initPdfViewer(".notes-btn", "notesViewer");

  // Documents SI
  initPdfViewer(".docsi-btn", "docsiViewer");

  // Certifications
  initPdfViewer(".certif-btn", "certifViewer");

  // Projet final
  initPdfViewer(".projet-btn", "projetViewer");
});
