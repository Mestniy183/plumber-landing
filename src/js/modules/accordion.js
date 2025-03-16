export function accordion() {
  const accordionBtns = document.querySelectorAll(".accordion__btn");
  accordionBtns.forEach((item, index) => {
    accordionBtns[index].addEventListener("click", function () {
      const parent = this.parentElement;
      parent.classList.toggle("active");

      const box = this.nextElementSibling;

      if (box.style.maxHeight) {
        box.style.maxHeight = null;
        box.style.marginBottom = "0";
      } else {
        box.style.maxHeight = box.scrollHeight + "px";
        box.style.paddingLeft = "27px";
        box.style.marginBottom = "28px";
      }
    });
  });
}
