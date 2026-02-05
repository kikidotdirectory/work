import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";

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
    nextEl: '.swiper-button-down',
    prevEl: '.swiper-button-up',
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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1.08,
  centeredSlides: true,
});
