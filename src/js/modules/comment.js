import Swiper from "swiper/bundle";
export function createComment(){
    fetch('./assets/json/comment.json')
    .then(res => res.json())
    .then(data =>{
        const commentList = document.querySelector('.comment__list');
        data.forEach(element => {
            const slide = document.createElement('li');
            slide.classList.add('comment__item','swiper-slide');
            slide.setAttribute('lazy', 'true');
            slide.innerHTML = `
            <img
            loading="lazy"
            class="comment__item-img"
            src="${element.img}"
            alt="Фото отзыва"
            width="336"
            height="336"
          />
          <div class="comment__item-content">
            <h3 class="comment__item-title">Отзыв:</h3>
            <p class="comment__item-text">
              ${element.text}
            </p>
          </div>
          <div class="comment__item-address">
            <span class="comment__item-name">${element.name}</span>
            <span class="comment__item-city">${element.city}</span>
          </div>
          <div class="swiper-lazy-preloader"></div>
            `;
           commentList.append(slide);
        });
        initSwiper(data.length);
    }).catch(error => console.error('Ошибка загрузки отзывов', error));

}

function initSwiper(slidesCount){
    const swiperOptions = {
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
    }

    if(slidesCount >= 4) {
        swiperOptions.loop = true
    } else {
        console.warn('Недастаточно слайдов для режима loop')
    }

     new Swiper(".swiper-comment", swiperOptions);


}