import Swiper from "swiper";
import{ Navigation} from 'swiper/modules';
import { beforeAfter } from "./beforeAfter";

export async function createExamples(){
try {
    const response = await fetch("./assets/json/example.json");
    const {examples} = await response.json();

    const swiperWrapper = document.querySelector ('.swiper-wrapper');
    const fragment = document.createDocumentFragment();
    const createSlide = ({title, beforeImage, afterImage, tasks}) =>{
    const slide = document.createElement('div');
    slide.classList.add('example__slider-content', 'swiper-slide');
    slide.innerHTML = `
    <div class="example__photo">
    <div class="example__before">
      <img
        class="example__img"
        draggable="false"
        src="${beforeImage}"
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
        src="${afterImage}"
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
  <h3 class="example__slider-title">${title}</h3>
  <ul class="example__slider-list list-reset">
  ${tasks.map(({title: taskTitle, text}) => `
  <li class="example__slider-item">
      <h4 class="example__slider-item-title">${taskTitle}</h4>
      <p class="example__slider-item-text">
        ${text}
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
}catch(error){
    console.log(error);
}
}

function initExampleSwiper(){
    const swiperExample = new Swiper(".swiper-example", {
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