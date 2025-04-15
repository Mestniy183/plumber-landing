import Swiper from "swiper/bundle";

export function commentSwiper() {
  const swiper = new Swiper(".swiper-comment", {
    loop: true,
    spaceBetween: 30,
    lazy: true,
    lazyPreloadPrevNext: 2,
    speed: 1000,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: ".swiper-button-custom-next",
      prevEl: ".swiper-button-custom-prev",
    },
  });
}
