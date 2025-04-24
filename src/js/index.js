import { headerAnimation } from "./modules/header.js";
import { burger } from "./modules/burger.js";
import { modal } from "./modules/modal.js";
import { accordion } from "./modules/accordion.js";
// import { beforeAfter } from "./modules/beforeAfter.js";
import { getCurrentYear } from "./modules/getCurrentYear.js";
import {createExamples} from "./modules/example.js";
import {createComment} from "./modules/comment.js";

document.addEventListener("DOMContentLoaded", () => {
  headerAnimation();
  burger();
  modal();
  accordion();
  createExamples();
  createComment();
  getCurrentYear();
  // beforeAfter();
});
