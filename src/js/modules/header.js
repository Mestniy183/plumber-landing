import gsap from "gsap";

export function headerAnimation() {
  const header = document.querySelector(".header");
  const headerNav = document.querySelector(".header__nav");
  const headerContacts = document.querySelector(".header__contacts");
  const fixedClass = "fixed";
  const scrollThreshold = 10;

  const fixedTl = gsap.timeline({ paused: true });
  const contentTl = gsap.timeline({ paused: true });
  const animations = {
    showFixed: () =>
      fixedTl.fromTo(
        header,
        { y: "-100%" },
        { y: 0, duration: 0.5, ease: "none" }
      ),
    hideFixed: () =>
      fixedTl.fromTo(
        header,
        { y: 0 },
        {
          y: "-100%",
          duration: 0.5,
          ease: "none",
          onComplete: () => {
            gsap.set(header, { y: 0 });
          },
        }
      ),
    showContent: () => {
      contentTl
        .fromTo(
          headerNav,
          { x: "-10px", autoAlpha: 0 },
          { x: 0, duration: 0.8, delay: 0.5, autoAlpha: 1, ease: "power4.out" },
          "content"
        )
        .fromTo(
          headerContacts,
          { x: "10px", autoAlpha: 0 },
          { x: 0, duration: 0.8, delay: 0.5, autoAlpha: 1, ease: "power4.out" },
          "content"
        );
    },
  };

  let lastScrollY = window.scrollY;
  let ticking = false;
  let isHeaderFixed = false;

  const handleScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const isScrolled = lastScrollY >= scrollThreshold;

        if (isScrolled && !isHeaderFixed) {
          isHeaderFixed = true;
          header.classList.add(fixedClass);
          fixedTl.clear().add(animations.showFixed()).play();
        } else if (!isScrolled && isHeaderFixed) {
          isHeaderFixed = false;
          fixedTl
            .clear()
            .add(animations.hideFixed())
            .play()
            .then(() => {
              header.classList.remove(fixedClass);
              contentTl.clear().add(animations.showContent()).play();
            });
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  const init = () => {
    isHeaderFixed = window.scrollY >= scrollThreshold;
    if (isHeaderFixed) {
      header.classList.add(fixedClass);
      fixedTl.add(animations.showFixed()).play();
    } else {
      contentTl.add(animations.showContent()).play();
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
  };
  init();
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
