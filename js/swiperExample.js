const swiperExample = new Swiper('.swiper-example', {
    loop: true,
    spaceBetween: 30,
    speed: 1000,
    navigation: {
        nextEl: '.swiper-button-custom-next',
        prevEl: '.swiper-button-custom-prev',
    }
})