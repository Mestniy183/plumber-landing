export function exampleSwiper() {
  const swiperExample = new Swiper(".swiper-example", {
    loop: true,
    allowTouchMove: false,
    spaceBetween: 30,
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-custom-next",
      prevEl: ".swiper-button-custom-prev",
    },
  });
}
