import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
import "swiper/css/bundle";

const swiperV = new Swiper(".swiper-container-v", {
  speed: 900,
  direction: "vertical",
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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
