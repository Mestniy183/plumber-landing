import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import { supabaseDB } from "../api";
import { beforeAfter } from "./beforeAfter";
import { createError, removeError } from "./error";
import { escapeHTML } from "./escapeHTML";

export async function createExamples() {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  try {
    removeError();

    const { data: examples, error } = await supabaseDB
      .from('example')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error;

    if (!examples || examples.length === 0) {
      throw new Error('Нет данных примеров');
    }



    swiperWrapper.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const createSlide = ({ imageBefore, imageAfter, title, task, solution }) => {
      const slide = document.createElement('div');
      slide.classList.add('example__slider-content', 'swiper-slide');
      const sourceBefore576 = imageBefore ? `<source media="(max-width: 576px)" srcset="${escapeHTML(imageBefore)}">` : '';
      const sourceAfter576 = imageAfter ? `<source media="(max-width: 576px)" srcset="${escapeHTML(imageAfter)}">` : '';
      slide.innerHTML = `
    <div class="example__photo">
    <div class="example__before">
    <picture>
    ${sourceBefore576}
    <img
        class="example__img"
        draggable="false"
        src="${escapeHTML(imageBefore)}"
        srcset="${escapeHTML(imageBefore)} 1x, ${escapeHTML(imageBefore_2x)} 2x, ${escapeHTML(imageBefore_3x)} 3x"
        alt="Фото до"
        loading="lazy"
        width="533"
        height="531"
      />
    </picture>
      
      <div class="example__before-text">До</div>
    </div>
    <div class="example__after">
    <picture>
    ${sourceAfter576}
    <img
    <img
    class="example__img"
    draggable="false"
    src="${escapeHTML(imageAfter)}"
        srcset="${escapeHTML(imageAfter)} 1x, ${escapeHTML(imageAfter_2x)} 2x, ${escapeHTML(imageAfter_3x)} 3x"
    alt="Фото после"
    loading="lazy"
    width="533"
    height="531"
  />
    </picture>
     
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

  <li class="example__slider-item">
      <h4 class="example__slider-item-title">Задача:</h4>
      <p class="example__slider-item-text">
        ${escapeHTML(task)}
      </p>
    </li>
    <li class="example__slider-item">
    <h4 class="example__slider-item-title">Решение:</h4>
    <p class="example__slider-item-text">
      ${escapeHTML(solution)}
    </p>
  </li>
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