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

// Get current date in EST (Wednesday, Feb 18)
function getESTDate() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
		year: "numeric",
  });
}

// Initial display
document.getElementById("date").textContent = getESTDate();
