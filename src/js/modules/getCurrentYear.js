export function getCurrentYear(){
    const yearText = document.querySelector('.footer-copyright__year');
    yearText.textContent = new Date().getFullYear()
}