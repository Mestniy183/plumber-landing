export function accordion() {
  const accordionItems = document.querySelectorAll(".accordion__item");
  const toggleAccordion = (item, forceClose = false) => {
    const isActive = item.classList.contains('active');
    const btn = item.querySelector('.accordion__btn');
    const box = btn.nextElementSibling;
    const isMobile = window.innerWidth < 576;

    if (isActive || forceClose) {
      item.classList.remove('active');
      box.style.maxHeight = null;
      box.style.marginBottom = "0";
      return;
    }

    item.classList.add('active');
    box.style.maxHeight = box.scrollHeight + "px";
    box.style.paddingLeft = isMobile ? '11px' : "27px";
    box.style.marginBottom = isMobile ? '20px' : "28px";
  }

  const handleResize = () =>{
    document.querySelectorAll('.accordion__item.active').forEach(item =>{
      const btn = item.querySelector('.accordion__btn');
      const box = btn.nextElementSibling;
      const isMobile = window.innerWidth < 576;
      if(box.style.maxHeight){
        box.style.paddingLeft = isMobile ? '11px' : "27px";
    box.style.marginBottom = isMobile ? '20px' : "28px";
      }
    })
  }

 document.addEventListener('click', (e) => {
  const btn = e.target.closest('.accordion__btn');
  if(!btn) return;
  const currentItem = btn.closest('.accordion__item');

  accordionItems.forEach(item =>{
    if(item !== currentItem) toggleAccordion(item, true);
  })
  toggleAccordion(currentItem);
 });

 let resizeTimeout;
 window.addEventListener('resize', () =>{
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 1000);
 })
}
