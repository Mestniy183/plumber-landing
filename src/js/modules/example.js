import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import { beforeAfter } from "./beforeAfter";
import { createError, removeError } from "./error";
import { escapeHTML } from "./escapeHTML";

export async function createExamples() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    try {
        removeError();
        const response = await fetch("./assets/json/example.json");

        if (!response.ok) {
            throw new Error(`HTTP ошибка! статус: ${response.status}`);
        }

        const { examples } = await response.json();

        if (!examples || !Array(examples) || examples.length === 0) {
            throw new Error('Нет данных примеров');
        }

        

        swiperWrapper.innerHTML = '';

        const fragment = document.createDocumentFragment();

        const createSlide = ({ title, beforeImage, afterImage, tasks = []}) => {
            const slide = document.createElement('div');
            slide.classList.add('example__slider-content', 'swiper-slide');
            slide.innerHTML = `
    <div class="example__photo">
    <div class="example__before">
      <img
        class="example__img"
        draggable="false"
        src="${escapeHTML(beforeImage)}"
        alt="Фото до"
        loading="lazy"
        width="533"
        height="531"
      />
      <div class="example__before-text">До</div>
    </div>
    <div class="example__after">
      <img
        class="example__img"
        draggable="false"
        src="${escapeHTML(afterImage)}"
        alt="Фото после"
        loading="lazy"
        width="533"
        height="531"
      />
      <div class="example__after-text">После</div>
    </div>
    <div class="example__change">
      <div class="example__btns">
        <button class="example__btn btn-reset">
          <svg class="example__slider-arrow slider-arrow">
            <use xlink:href="img/sprite.svg#example--left-arrow"></use>
          </svg>
        </button>
        <button class="example__btn btn-reset">
          <svg class="example__slider-arrow slider-arrow">
            <use xlink:href="img/sprite.svg#example--right-arrow"></use>
          </svg>
        </button>   
      </div>
    </div>
  </div>
  <div class="example__slider-inner">
  <h3 class="example__slider-title">${escapeHTML(title)}</h3>
  <ul class="example__slider-list list-reset">
  ${tasks.map(({ title: taskTitle, text }) => `
  <li class="example__slider-item">
      <h4 class="example__slider-item-title">${escapeHTML(taskTitle)}</h4>
      <p class="example__slider-item-text">
        ${escapeHTML(text)}
      </p>
    </li>
  `).join('')}
  </ul>
</div>
    `;
            return slide;
        }
        examples.forEach((example) => {
            fragment.append(createSlide(example));
        })
        swiperWrapper.append(fragment);
        initExampleSwiper()
        beforeAfter()
    } catch (error) {
        swiperWrapper.append(createError(error.message));
    }
}

function initExampleSwiper() {
    new Swiper(".swiper-example", {
        modules: [Navigation],
        loop: true,
        lazyPreloadPrevNext: 1,
        allowTouchMove: false,
        spaceBetween: 30,
        speed: 1000,
        navigation: {
            nextEl: ".swiper-button-custom-next",
            prevEl: ".swiper-button-custom-prev",
        },
    });
}