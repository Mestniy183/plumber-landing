import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import { createError, removeError } from "./error";
export async function createComment() {
    const commentList = document.querySelector('.comment__list');
    try {
        removeError();
        const response = await fetch('./assets/json/comment.json');
        if (!response.ok) {
            throw new Error(`HTTP ошибка! статус: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !Array(data) || data.length === 0) {
            throw new Error('Нет доступных отзывов');
        }
        data.forEach(element => {
            const slide = document.createElement('li');
            slide.classList.add('comment__item', 'swiper-slide');
            const source768 = element.img768 ? `<source media="(max-width: 768px)" srcset="${element.img768}">`  : '';
            const source430 = element.img430 ?  `<source media="(max-width: 430px)" srcset="${element.img430}">` : '';
            slide.innerHTML = `
            <picture>
            ${source768}
            ${source430}
  
<img
        loading="lazy"
        class="comment__item-img"
        src="${element.img}"
        alt="Фото отзыва"
        width="336"
        height="336"
      />
            </picture>
        
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