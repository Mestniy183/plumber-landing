import { headerAnimation } from "./modules/header.js";
import { burger } from "./modules/burger.js";
import { getCurrentYear } from "./modules/getCurrentYear.js";



async function loadCode(){
  const [
    {modal},
    {accordion},
    {servicesList},
    {questionsList}
  ] = await Promise.all([
    import("./modules/modal.js"),
    import("./modules/accordion.js"),
    import("./modules/servicesList.js"),
    import("./modules/questionList.js"),
  ])
  
  await Promise.all([servicesList(), questionsList()])

  modal();
  accordion();
  getCurrentYear();
  const [
    {createExamples},
    {createComment},
  ] = await Promise.all([
    import("./modules/example.js"),
    import("./modules/comment.js"),
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

