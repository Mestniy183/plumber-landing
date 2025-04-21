export async function createExamples(){
try {
    const response = await fetch("../assets/json/example.json");
    const {examples} = await response.json();
    console.log(examples); 

    const swiperWrapper = document.querySelector ('.swiper-wrapper');
    const fragment = document.createDocumentFragment();
    const createSlide = ({title, beforeImage, afterImage, tasks}) =>{
    const slide = document.createElement('div');
    slide.classList.add('example__slider-content', 'swiper-slide');
    slide.setAttribute('lazy', 'true');
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
    <li class="example__slider-item">
      <h4 class="example__slider-item-title">Задача:</h4>
      <p class="example__slider-item-text">
        После перепланировки детской комнаты, и обЪединение её с
        балконом, появилась потребность, в изменении конструкции
        стояка отопления и замене радиатора.
      </p>
    </li>
    <li class="example__slider-item">
      <h4 class="example__slider-item-title">Решение:</h4>
      <p class="example__slider-item-text">
        Переварка стояка отопления и замена радиатора вертикальной
        конструкции, установка запорной арматуры(краны), для удобства
        будущей эксплуатации. Результат-экономия пространства,
        увеличения кпд батареи.
      </p>
    </li>
  </ul>
</div>
<div class="swiper-lazy-preloader"></div>
    `
    }
}catch(error){
    console.log(error);
}
}