import { headerAnimation } from "./modules/header.js";
import { burger } from "./modules/burger.js";
import { modal } from "./modules/modal.js";
import { accordion } from "./modules/accordion.js";
import { beforeAfter } from "./modules/beforeAfter.js";
import { commentSwiper } from "./modules/swiperComment.js";
import { exampleSwiper } from "./modules/swiperExample.js";
import {getCurrentYear} from "./modules/getCurrentYear.js";

document.addEventListener("DOMContentLoaded", () => {
  headerAnimation();
  burger();
  modal();
  accordion();
  beforeAfter();
  commentSwiper();
  exampleSwiper();
  getCurrentYear();
});
