import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs'
import 'swiper/css/bundle'

const swiperV = new Swiper(".swiper-container-v", {
  direction: "vertical",
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiperH = new Swiper(".swiper-container-h", {
  spaceBetween: 50,
  pagination: {
    el: ".swiper-pagination-h",
    clickable: true,
  },
});
