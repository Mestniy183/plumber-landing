import gsap from "gsap";

export function burger() {
  const burgerElement = document.querySelector(".burger");
  const listElement = document.querySelector(".header__list");
  if (!burger || !listElement) return;
  const itemsElement = listElement.querySelectorAll(".header__list-item");
  const anchorLinks = listElement.querySelectorAll(".header__list-link");

  const toggleBurgerState = (isActive) => {
    burgerElement.classList.toggle("active", isActive);
    document.body.style.overflow = isActive ? "hidden" : "visible";
  };

  let mm = gsap.matchMedia();

  mm.add("(max-width: 1024px)", () => {
    const tl = gsap.timeline({
      paused: true,
      onStart: () => toggleBurgerState(true),
      onReverseComplete: () => toggleBurgerState(false),
    });

    tl.to(listElement, {
      x: "0",
      duration: 0.5,
      ease: "expo",
    }).fromTo(
      itemsElement,
      { x: "-100%" },
      { x: 0, duration: 0.5, ease: "expo", stagger: 0.3 }
    );

    const handleBurgerClick = () => {
      burgerElement.classList.contains("active") ? tl.reverse() : tl.play();
    };

    const handleLinkClick = (e) => {
      e.preventDefault();
      let targetLink = e.target.href;
      tl.reverse();
      setTimeout(() => {
        window.location.href = targetLink;
      }, 1000);
    };

    burgerElement.addEventListener("click", handleBurgerClick);
    anchorLinks.forEach((link) =>
      link.addEventListener("click", handleLinkClick)
    );

    return () => {
      burgerElement.removeEventListener("click", handleBurgerClick);
      anchorLinks.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
    };
  });
}
