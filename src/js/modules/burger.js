import gsap from "gsap";

export function burger() {
  const burgerElement = document.querySelector(".burger");
  const listElement = document.querySelector(".header__list");
  const itemsElement = listElement.querySelectorAll(".header__list-item");
  const anchorLinks = listElement.querySelectorAll(".header__list-link");
  function activeBurger() {
    burgerElement.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function removeActiveBurger() {
    burgerElement.classList.remove("active");
    document.body.style.overflow = "visible";
  }

  let mm = gsap.matchMedia();

  mm.add("(max-width: 1024px", () => {
    const tl = gsap.timeline({ paused: true, onStart: activeBurger });

    tl.to(listElement, {
      x: "0",
      duration: 0.5,
      ease: "expo",
      onReverseComplete: removeActiveBurger,
    }).fromTo(
      itemsElement,
      { x: "-100%" },
      { x: 0, duration: 0.5, ease: "expo", stagger: 0.3 }
    );

    burgerElement.addEventListener("click", () => {
      if (burgerElement.classList.contains("active")) {
        tl.reverse();
      } else {
        tl.play();
      }
    });

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        let targetLink = e.target.href;
        setTimeout(() => {
          window.location.href = targetLink;
        }, 1000);
        tl.reverse();
      });
    });
  });
}
