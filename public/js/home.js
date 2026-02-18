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
      "/assets/thumbnails/the-chair/" + thumbnails[current];
    preloadNext();
  }, 1500);
}

// Get current time in EST
function checkTime() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Update the time display
function updateTime() {
  document.getElementById("time").textContent = checkTime();
}

// Update every 30 seconds
setInterval(updateTime, 30000);

// Initial display
updateTime();
