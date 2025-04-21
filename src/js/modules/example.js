export async function createExamples(){
try {
    const response = await fetch("../assets/json/example.js");
    const {examples} = await response.json();
    console.log(examples); 
}catch(error){
    console.log(error);
}
}