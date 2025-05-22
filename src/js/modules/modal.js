import IMask from "imask";
import gsap from "gsap";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBR9uFLlMQoMgvPcL6HuZGKzPTz3yhV-Fg",
  authDomain: "plumber-bot.firebaseapp.com",
  databaseURL:
    "https://plumber-bot-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plumber-bot",
  storageBucket: "plumber-bot.firebasestorage.app",
  messagingSenderId: "48772325776",
  appId: "1:48772325776:web:74d68484e5a392fe535315",
  measurementId: "G-SLLKJQL09V",
};

const app = initializeApp(firebaseConfig);
const datebase = getDatabase(app);

export function modal() {
  const modal = document.querySelector(".modal");
  if (!modal) return;

  const openBtns = document.querySelectorAll(".open-modal");
  const modalBox = document.querySelector(".modal__box");
  const modalForm = document.querySelector(".modal__form");
  const modalBtn = document.querySelector(".modal__btn");
  const formInputs = document.querySelectorAll(".form-data");

  const telInput = document.getElementById("tel");
  const phoneMask = telInput
    ? IMask(telInput, {
        mask: "+7(000)000-00-00",
        lazy: false,
      })
    : null;

  const toggleModal = (isOpen) => {
    modal.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "visible";
    if (isOpen && phoneMask) {
      phoneMask.updateValue();
    }
  };

  const clearForm = () => {
    modalForm?.reset();
    formInputs.forEach((input) => {
      input.classList.remove("input-invalid");
      const error = input.parentElement.querySelector("error-message");
      if (error) error.remove();
    });
  };

  const closeModal = () => {
    toggleModal(false);
    clearForm();
  };

  const openModal = () => {
    toggleModal(true);
  };

  const handleOutsideClick = (e) => {
    if (!e._isClickWithinModal) {
      closeModal();
    }
  };

  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const showError = (input, message) => {
    const existingError = input.parentElement.querySelector(".error-message");
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
  };

  const validateInput = (input) => {
    if (input.type !== "checkbox") {
      input.value = input.value
        .replace(/<[^>]*>/g, "")
        .replace(/javascript:/gi, "")
        .replace(/(https?:\/\/|www\.)\S+/gi, "");
    }

    if (input.type === "checkbox") {
      if (!input.checked) {
        showError(
          input,
          "Необходимо согласие на обработку персональных данных"
        );
        return false;
      }
    } else if (input.name === "tel" && phoneMask) {
      phoneMask.updateValue();
      if (phoneMask.unmaskedValue.length < 10) {
        showError(input, "Телефон должен быть заполнен");
        return false;
      }
    } else if (input.value.trim() === "") {
      const fieldName = input.placeholder || "Поле";
      showError(input, `${fieldName} обязательно для заполнения`);
      return false;
    }

    showError(input, "");
    return true;
  };

  const validateForm = () => {
    let isValid = true;
    formInputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    return isValid;
  };

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
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const format = (value) => String(value).padStart(2, "0");

    return `${format(now.getDate())}.${format(
      now.getMonth() + 1
    )}.${now.getFullYear()} ${format(now.getHours())}:${format(
      now.getMinutes()
    )}`;
  };

  const generateOrderId = (orderData) => {
    const now = new Date();
    const datePart = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("");

    const timePart = [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
    ].join("");

    const phoneLast4 = orderData.phone.replace(/\D/g, "").slice(-4);
    const nameInitial = orderData.name.charAt(0).toUpperCase();

    return `${datePart}-${timePart}-${nameInitial}${phoneLast4}`;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const [name, tel, mes] = formInputs;

      const orderData = {
        name: name.value,
        phone: tel.value,
        message: mes.value,
        date: getCurrentDateTime(),
        timestamp: Date.now(),
      };

      const customOrderId = generateOrderId(orderData);
      const orderRef = ref(datebase, `orders/${customOrderId}`);

      if ((await get(orderRef)).exists()) {
        orderData._originalId = customOrderId;
        const fallback = push(ref(database, "orders"));
        await set(fallback, orderData);
      } else {
        await set(orderRef, orderData);
      }

      // const ordersRef = ref(datebase, "orders");
      // const newOrder = await push(ordersRef, orderData);

      if (!newOrder.key) {
        throw new Error("Не удалось создать запись в базе данных");
      }

      showNotification("Данные отправлены", "green");
      closeModal();
    } catch (e) {
      console.error("Order submit error", e);
      const errorMessage =
        window.innerWidth <= 576
          ? `Произошла ошибка\nперезвоните по номеру +7(905)287-77-22`
          : `Произошла ошибка`;
      showNotification(errorMessage, "red");
    }
  };

  const init = () => {
    openBtns.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

    if (modalBox) {
      modalBox.addEventListener("click", (e) => {
        e._isClickWithinModal = true;
      });
    }

    modal.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleEscapeKey);
    formInputs.forEach((input) => {
      input.addEventListener("input", () => validateInput(input));
      if (input.type === "checkbox") {
        input.addEventListener("change", () => validateInput(input));
      }
    });

    if (modalBtn) {
      modalBtn.addEventListener("click", submitForm);
    }
  };

  init();
}
