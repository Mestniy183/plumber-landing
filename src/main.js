import { headerAnimation } from "./js/modules/header.js";
import { burger } from "./js/modules/burger.js";
import { getCurrentYear } from "./js/modules/getCurrentYear.js";
import 'virtual:svg-icons-register'
import './css/index.css'



async function loadCode(){
  const [
    {modal},
    {accordion},
    {servicesList},
    {questionsList}
  ] = await Promise.all([
    import("./js/modules/modal.js"),
    import("./js/modules/accordion.js"),
    import("./js/modules/servicesList.js"),
    import("./js/modules/questionList.js"),
  ])
  
  await Promise.all([servicesList(), questionsList()])

  modal();
  accordion();
  getCurrentYear();
  const [
    {createExamples},
    {createComment},
  ] = await Promise.all([
    import("./js/modules/example.js"),
    import("./js/modules/comment.js"),
  ])
  createExamples();
  createComment();
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

