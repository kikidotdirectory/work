import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";
import "swiper/css/bundle";

const swiperV = new Swiper(".swiper-container-v", {
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
});

const swiperH = new Swiper(".swiper-container-h", {
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  loop: true,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
});
