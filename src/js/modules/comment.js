export function createComment(){
    fetch('./assets/json/comment.json')
    .then(res => res.json())
    .then(data =>{
        const commentList = document.querySelector('.comment__list');
        data.forEach(element => {
            const slide = document.createElement('li');
            slide.classList.add('comment__item','comment__list');
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
        
    }).catch(error => console.error('Ошибка загрузки отзывов', error));

}