const thumbnails = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
let current = 0;

// Preload next image
function preloadNext() {
  const next = new Image();
  next.src = thumbnails[(current + 1) % thumbnails.length];
}

setInterval(() => {
  current = (current + 1) % thumbnails.length;
  document.getElementById('chair-thumbnail').src = 'assets/thumbnails/the-chair/'+thumbnails[current];
  preloadNext();
}, 3000);
