import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import { createError, removeError } from "./error";
import commentData from "../../json/comment.json";
import { getValidImagePath } from "./imagePath";

export async function createComment() {
    const commentList = document.querySelector('.comment__list');
    try {
        removeError();

       const comments = commentData;

        if (!comments || comments.length === 0) {
            throw new Error('Нет доступных отзывов');
        }

        commentList.innerHTML = '';

        comments.forEach(element => {
            const slide = document.createElement('li');
            slide.classList.add('comment__item', 'swiper-slide');

            const imgMain = getValidImagePath(element.image);
            const img2x = getValidImagePath(element.image_2x);
            const img3x = getValidImagePath(element.image_3x);

            const imgMobile1 = getValidImagePath(element.image_mobile_1);
            const imgMobile1_2x = getValidImagePath(element.image_mobile_1_2x);

            const imgMobile2 = getValidImagePath(element.image_mobile_2);
            const imgMobile2_2x = getValidImagePath(element.image_mobile_2_2x);


            const source768 = element.image ? `<source media="(max-width: 768px)" srcset="${imgMobile1} 1x, ${imgMobile1_2x} 2x">` : '';
            const source430 = element.image ? `<source media="(max-width: 430px)" srcset="${imgMobile2} 1x, ${imgMobile2_2x} 2x">` : '';
            slide.innerHTML = `
            <picture>
            ${source768}
            ${source430}
  
        <img
            loading="lazy"
            class="comment__item-img"
            srcset="${imgMain} 1x, ${img2x} 2x, ${img3x} 3x"
            alt="Фото отзыва"
            width="336"
            height="336"
            />
            </picture>
        
      <div class="comment__item-content">
        <h3 class="comment__item-title">Отзыв:</h3>
        <p class="comment__item-text">
          ${element.comment}
        </p>
      </div>
      <div class="comment__item-address">
        <span class="comment__item-name">${element.name}, </span>
        <span class="comment__item-city">${element.city}</span>
      </div>
        `;
            commentList.append(slide);
        });


            initSwiper(comments.length);
    } catch (error) {
        commentList.append(createError(error.message));
    }


}

function initSwiper(slidesCount) {
    const swiperOptions = {
        modules: [Navigation],
        speed: 1000,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
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