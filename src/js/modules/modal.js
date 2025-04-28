import IMask from "imask";
import gsap from "gsap";

export function modal() {
  const modal = document.querySelector(".modal");
  if (!modal) return;

  const openBtns = document.querySelectorAll(".open-modal");
  const modalBox = document.querySelectorAll(".modal__box");
  const modalForm = document.querySelectorAll(".modal__form");
  const modalBtn = document.querySelectorAll(".modal__btn");
  const formInputs = document.querySelectorAll(".form-data");

  const telInput = document.getElementById('tel');
  const phoneMask = telInput ? IMask(telInput, {
    mask: "+7(000)000-00-00",
    lazy: false,
  }) : null;

  const toggleModal = (isOpen) => {
    modal.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    if (isOpen && phoneMask) {
      phoneMask.updateValue();
    }
  }

  const clearForm = () => {
    modalForm?.reset();
    formInputs.forEach(input => {
      input.classList.remove("input-invalid");
      const error = input.parentElement.querySelector("error-message");
      if (error) error.remove();
    })
  }

  const closeModal = () => {
    toggleModal(false);
    clearForm();
  }

  const openModal = () => {
    toggleModal(true);
  }

  const handleOutsideClick = (e) => {
    if (!e._isClickWithinModal) {
      closeModal();
    }
  }

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  const showError = (input, message) => {
    const existingError = input.parentElement.querySelector("error-message");
    if (existingError) existingError.remove();

    if (message) {
      const errorElement = document.createElement("div");
      errorElement.textContent = message;
      errorElement.classList.add("error-message");
      input.parentElement.append(errorElement);
      input.classList.add("input-invalid");
    } else {
      input.classList.remove("input-invalid");
    }
  }

const validateInput = (input) => {
    if (input.type !== "checkbox"){
       input.value = input.value.replace(/<[^>]*>/g, "")
       .replace(/javascript:/gi, "")
       .replace(/(https?:\/\/|www\.)\S+/gi, "");
    }

    if (input.type === "checkbox") {
      if (!input.checked) {
        showError(input, "Необходимо согласие на обработку персональных данных");
        return false;
      }
    } else if (input.name === "tel" && phoneMask) {
      phoneMask.updateValue();
      if (phoneMask.unmaskedValue.length < 10) {
        showError(input, 'Телефон должен быть заполнен');
        return false;
      }
    } else if (input.value.trim() === "") {
      const fieldName = input.placeholder || 'Поле'
      showError(`${fieldName} обязательно для заполнения`);
      return false;
    }

    showError(input, '')
    return true;
  }

  const validateForm = () =>  {
    let isValid = true;
    formInputs.forEach((input) => {
    if(!validateInput(input)){
      isValid = false;
    } 
    });
    return isValid;
  }

  const showNotification = (text, bgColor) => {
    const notification = document.createElement("div");
    notification.classList.add("notify");
    notification.style.backgroundColor = bgColor;
    notification.textContent = text;

    document.body.append(notification);

    gsap.from(notification, { y: "-50", duration: 1, ease: "power1.in" });

    setTimeout(() => {
      gsap.to(notification, {
        y: -50,
        duration: 0.8,
        ease: "power1.out",
        onComplete: () => notification.remove(),
      });
    }, 3000);
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const format = (value) => String(value).padStart(2, "0");

    return `${format(now.getDate())}.${format(now.getMonth() + 1)}.${now.getFullYear()} ${format(now.getHours())}:${format(now.getMinutes())}`
  }


  const submotForm = async (e) => {
    e.preventDefault()
    
    if(!validateForm()) return;

    try {
      const [name, tel, mes] = formInputs;
      const response = await fetch("https://dc3c997554c1d330.mokky.dev/items", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          phone: tel.value,
          message: mes.value,
          date: getCurrentDateTime(),
        }),
      });
      if (!response.ok) {
        const errorMessage = window.innerWidth <= 576
         ? `Произошла ошибка ${response.status}\nперезвоните по номеру +7(905)287-77-22`
           : `Произошла ошибка ${response.status}`;
           showNotification(errorMessage, 'red')
          return;
        }
      showNotification("Данные отправлены", "green");
      closeModal()
    } catch (e) {
      showNotification('Ошибка соединения', "red");
    }
  }

  const init = () => {

  }

  init()
}
