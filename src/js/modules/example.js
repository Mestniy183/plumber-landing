import Swiper from "swiper";
import { Navigation } from 'swiper/modules';
import { beforeAfter } from "./beforeAfter";
import { createError, removeError } from "./error";
import { escapeHTML } from "./escapeHTML";
import exampleData from "../../json/exemple.json";
import { getValidImagePath } from "./imagePath";

export async function createExamples() {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  try {
    removeError();

    const examples = exampleData;

    if (!examples || examples.length === 0) {
      throw new Error('Нет данных примеров');
    }

    swiperWrapper.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const createSlide = ({ imageBefore, imageAfter, imageBefore_2x, imageBefore_3x, imageAfter_2x, imageAfter_3x, imageBefore_mobile, imageBefore_mobile_2x, imageAfter_mobile, imageAfter_mobile_2x, title, task, solution }) => {
      const slide = document.createElement('div');
      slide.classList.add('example__slider-content', 'swiper-slide');

      const srcBefore = getValidImagePath(imageBefore);
      const srcBefore2x = getValidImagePath(imageBefore_2x);
      const srcBefore3x = getValidImagePath(imageBefore_3x);
      const srcBeforeMobile = getValidImagePath(imageBefore_mobile);
      const srcBeforeMobile2x = getValidImagePath(imageBefore_mobile_2x);

      const srcAfter = getValidImagePath(imageAfter);
      const srcAfter2x = getValidImagePath(imageAfter_2x);
      const srcAfter3x = getValidImagePath(imageAfter_3x);
      const srcAfterMobile = getValidImagePath(imageAfter_mobile);
      const srcAfterMobile2x = getValidImagePath(imageAfter_mobile_2x);




      const sourceBefore576 = imageBefore ? `<source media="(max-width: 576px)" srcset="${escapeHTML(srcBeforeMobile)} 1x, ${escapeHTML(srcBeforeMobile2x)} 2x">` : '';
      const sourceAfter576 = imageAfter ? `<source media="(max-width: 576px)" srcset="${escapeHTML(srcAfterMobile)} 1x, ${escapeHTML(srcAfterMobile2x)} 2x">` : '';
      slide.innerHTML = `
    <div class="example__photo swiper-no-swiping">
    <div class="example__before">
    <picture>
    ${sourceBefore576}
    <img
        class="example__img"
        draggable="false"
        src="${escapeHTML(srcBefore)}"
        srcset="${escapeHTML(srcBefore)} 1x, ${escapeHTML(srcBefore2x)} 2x, ${escapeHTML(srcBefore3x)} 3x"
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
    src="${escapeHTML(srcAfter)}"
        srcset="${escapeHTML(srcAfter)} 1x, ${escapeHTML(srcAfter2x)} 2x, ${escapeHTML(srcAfter3x)} 3x"
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
            <use xlink:href="#example/left-arrow"></use>
          </svg>
        </button>
        <button class="example__btn btn-reset">
          <svg class="example__slider-arrow slider-arrow">
            <use xlink:href="#example/right-arrow"></use>
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
    allowTouchMove: true,
    spaceBetween: 30,
    speed: 1000,
    navigation: {
      nextEl: ".swiper-button-custom-next",
      prevEl: ".swiper-button-custom-prev",
    },
  });
}