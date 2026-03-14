const pageLeft = document.querySelector(".page-left");
const pageRight = document.querySelector(".page-right");

let currentSpread = 0;

const imageCache = spreads.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

function renderPages() {
  pageLeft.innerHTML = "";
  pageRight.innerHTML = "";

  if (currentSpread > 0) {
    pageLeft.appendChild(imageCache[currentSpread].cloneNode());
  }
  if (currentSpread < spreads.length - 1) {
    pageRight.appendChild(imageCache[currentSpread].cloneNode());
  }
}

function nextPage() {
	if (currentSpread === spreads.length - 1) {
		currentSpread = 0;
	} else {
		currentSpread++;
	}
	renderPages();
}

function prevPage() {
	currentSpread--;
	renderPages();
}

pageRight.addEventListener("click", nextPage);
pageLeft.addEventListener("click", prevPage);
