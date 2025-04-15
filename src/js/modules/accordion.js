export function accordion() {
  const accordionBtns = document.querySelectorAll(".accordion__btn");
  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      accordionBtns.forEach((otherBtn) => {
        if (otherBtn !== this) {
          const otherParent = otherBtn.parentElement;
          const otherBox = otherBtn.nextElementSibling;
          otherParent.classList.remove("active");
          otherBox.style.maxHeight = null;
          otherBox.style.marginBottom = "0";
        }
      });

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
