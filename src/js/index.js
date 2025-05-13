import { headerAnimation } from "./modules/header.js";
import { burger } from "./modules/burger.js";
import { modal } from "./modules/modal.js";
import { accordion } from "./modules/accordion.js";
import { getCurrentYear } from "./modules/getCurrentYear.js";
import {createExamples} from "./modules/example.js";
import {createComment} from "./modules/comment.js";

function loadCode(){
 modal();
  accordion();
  createExamples();
  createComment();
  getCurrentYear();
}

document.addEventListener("DOMContentLoaded", () => {
  headerAnimation();
  burger();

  if(window.requestIdleCallback){
    window.requestIdleCallback(() =>{
      loadCode();
    }, {timeout: 2000})
  }else{
    setTimeout(loadCode, 500);
  }
 
});

