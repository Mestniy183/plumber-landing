export function createError(text){
    const textElement = document.createElement('p');
    textElement.classList.add('error');
    textElement.textContent = text;
    return textElement;
}

export function removeError(){
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(error => error.remove())
}