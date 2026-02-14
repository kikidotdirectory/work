const thumbnails = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
let current = 0;
let slideshowInterval = null;

// Preload next image
function preloadNext() {
  const next = new Image();
  next.src =
    "assets/thumbnails/the-chair/" +
    thumbnails[(current + 1) % thumbnails.length];
}

function startSlideshow() {
  if (slideshowInterval) return; // Already running

  slideshowInterval = setInterval(() => {
    current = (current + 1) % thumbnails.length;
    document.getElementById("chair-thumbnail").src =
      "assets/thumbnails/the-chair/" + thumbnails[current];
    preloadNext();
  }, 1500);
}

function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    current = 0; // Reset to first image
    document.getElementById("chair-thumbnail").src =
      "assets/thumbnails/the-chair/" + thumbnails[0];
  }
}

const projectLinks = document.querySelectorAll("a[href]");

projectLinks.forEach((link) => {
  const preview = link.nextElementSibling;

  // Only add hover behavior if there's a preview div after the link
  if (preview && preview.classList.contains("preview")) {
    link.addEventListener("mouseenter", () => {
      preview.style.display = "block";
      preview.style.position = "fixed";
      preview.style.opacity = "0";
      // Trigger reflow to ensure transition works
      preview.offsetHeight;
      preview.style.opacity = "1";

      startSlideshow(); // Start slideshow when preview appears
    });

    link.addEventListener("mousemove", (e) => {
      const rect = preview.getBoundingClientRect();
      const x = Math.min(e.clientX + 10, window.innerWidth - rect.width - 16);
      const y = Math.min(e.clientY + 10, window.innerHeight - rect.height - 16);

      preview.style.left = `${x}px`;
      preview.style.top = `${y}px`;
    });

    link.addEventListener("mouseleave", () => {
      preview.style.opacity = "0";
      stopSlideshow(); // Stop slideshow when preview hides

      // Wait for fade out before hiding
      setTimeout(() => {
        preview.style.display = "none";
      }, 200);
    });
  }
});
