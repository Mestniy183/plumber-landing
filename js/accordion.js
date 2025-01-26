const accordionItems = document.querySelectorAll('.accordion__item');
accordionItems.forEach((item, index) =>{
accordionItems[index].addEventListener('click',() =>{
    item.classList.toggle('active');
})
})