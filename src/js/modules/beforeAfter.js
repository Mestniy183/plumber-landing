export function beforeAfter() {
  const photos = document.querySelectorAll(".example__photo");

  photos.forEach((photo) => {
    const before = photo.querySelector(".example__before");
    const img = before.querySelector(".example__img");
    const change = photo.querySelector(".example__change");
    let isActive = false;

    const updateWidth = () => {
      img.style.width = `${photo.offsetWidth}px`;
    }

    updateWidth();

    window.addEventListener('resize', updateWidth);

    function beforeAfterSlider(x) {
      const rect = photo.getBoundingClientRect();
      let shift = Math.max(0, Math.min(x - rect.left, photo.offsetWidth));
      before.style.width = `${shift}px`;
      change.style.left = `${shift}px`;
    }

    function handlePointerDown(e) {
      isActive = true;
      beforeAfterSlider(e.clientX)
      e.preventDefault()
    }

    function handlePointerMove(e) {
      if (!isActive) return;
      beforeAfterSlider(e.clientX)
      e.preventDefault()
    }

    const handlePointerUp = () => {
      isActive = false;
    };

    photo.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);


    return () => {
      window.removeEventListener('resize', updateWidth);
      photo.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    }

  });
}
