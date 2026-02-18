const swiperV = new Swiper(".swiper-container-v", {
  speed: 900,
  direction: "vertical",
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  navigation: {
    addIcons: false,
    nextEl: ".swiper-button-down",
    prevEl: ".swiper-button-up",
  },
  on: {
    slideChangeTransitionStart: function (e) {
      setChapter(swiperV.activeIndex);
    },
    init: function (e) {
      setChapter(this.activeIndex);
    },
  },
});

const swiperH = new Swiper(".swiper-container-h", {
  speed: 600,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  loop: true,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  navigation: {
    addIcons: false,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1.1,
  centeredSlides: true,
});

function setChapter(indx) {
  indx++;

  const nav = document.querySelector(".section-navigation");

  // Remove 'current' from all items
  nav.querySelectorAll("li.current").forEach((item) => {
    item.classList.remove("current");
  });

  // Add 'current' to specific item
  nav.querySelector("li:nth-child(" + indx + ")").classList.add("current");
}

document.querySelectorAll(".section-navigation > li").forEach(function (item) {
  item.addEventListener("click", function () {
    const allItems = Array.from(
      document.querySelectorAll(".section-navigation > li"),
    );
    const index = allItems.indexOf(this);

    swiperV.slideTo(index);
  });
});
