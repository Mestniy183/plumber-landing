import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

export function createComment() {
    const commentList = document.querySelector('.comment__list');
    try {
        const response = await fetch('./assets/json/comment.json');
        if (!response.ok) {
            throw new Error(`HTTP ошибка! статус: ${response.status}`);
        }

        const {data} = await response.json();
        console.log(data);

        if (!examples || !Array(examples) || examples.length === 0) {
            throw new Error('Нет доступных отзывов');
        }
        data.forEach(element => {
            const slide = document.createElement('li');
            slide.classList.add('comment__item', 'swiper-slide');
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
        `;
            commentList.append(slide);
        });
        initSwiper(data.length);
    } catch (error) {
        commentList.append(createError(error.message));
    }
    

}

function initSwiper(slidesCount) {
    const swiperOptions = {
        modules: [Navigation],
        spaceBetween: 30,
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

    if (slidesCount >= 4) {
        swiperOptions.loop = true
    } else {
        console.warn('Недастаточно слайдов для режима loop')
    }

    new Swiper(".swiper-comment", swiperOptions);


}