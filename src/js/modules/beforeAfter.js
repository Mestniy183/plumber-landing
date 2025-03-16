function beforeAfter() {
  const photos = document.querySelectorAll(".example__photo");

  photos.forEach((photo) => {
    const before = photo.querySelector(".example__before");
    const img = before.querySelector(".example__img");
    const change = photo.querySelector(".example__change");
    const body = document.body;
    let isActive = false;

    document.addEventListener("DOMContentLoaded", () => {
      let widthPhoto = photo.offsetWidth;
      img.style.width = `${widthPhoto}px`;
    });

    function pauseEvents(e) {
      e.stopPropagation();
      return false;
    }

    photo.addEventListener("mouseup", () => {
      isActive = false;
    });

    photo.addEventListener("mousedown", () => {
      isActive = true;
    });

    photo.addEventListener("mouseleave", () => {
      isActive = false;
    });

    function beforeAfterSlider(x) {
      let shift = Math.max(0, Math.min(x, photo.offsetWidth));
      before.style.width = `${shift}px`;
      change.style.left = `${shift}px`;
    }

    body.addEventListener("mousemove", (e) => {
      if (!isActive) return;
      let x = e.pageX;
      x -= photo.getBoundingClientRect().left;
      beforeAfterSlider(x);
      pauseEvents(e);
    });

    photo.addEventListener(
      "touchstart",
      () => {
        isActive = true;
      },
      { passive: true }
    );

    body.addEventListener("touchend", () => {
      isActive = false;
    });

    body.addEventListener("touchcancel", () => {
      isActive = false;
    });

    body.addEventListener("touchmove", (event) => {
      if (!isActive) return;
      let x;
      let i;
      for (i = 0; i < event.changedTouches.length; i++) {
        x = event.changedTouches[0].pageX;
      }
      x -= photo.getBoundingClientRect().left;
      beforeAfterSlider(x);
      pauseEvents(event);
    });
  });
}
