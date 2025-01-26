const burgerElement = document.querySelector('.burger');
const listElement = document.querySelector('.header__list');
burgerElement.addEventListener('click', () => {
    burgerElement.classList.toggle('active')
    listElement.classList.toggle('active')
})

