const pageLeft = document.querySelector(".page-left");
const pageRight = document.querySelector(".page-right");

let currentSpread = 0;

function renderPages() {
	if (currentSpread === 0) {
		pageLeft.innerHTML = "";
		pageRight.innerHTML = spreads[currentSpread];
	} else if (currentSpread === spreads.length - 1) {
		pageLeft.innerHTML = spreads[currentSpread];
		pageRight.innerHTML = "";
	} else {
		pageLeft.innerHTML = spreads[currentSpread];
		pageRight.innerHTML = spreads[currentSpread];
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
