const modal = document.querySelector('.modal');
const openBtns = document.querySelectorAll('.open-modal');

function closeModal() {
    modal.classList.remove('open')
    document.body.style.overflow = 'visible';
}

function clearForm() {
    modal.querySelector('.modal__form').reset()
}

function openModal() {
    modal.classList.add('open')
    document.body.style.overflow = 'hidden';
}

openBtns.forEach((btn) => {
    btn.addEventListener('click', openModal)
})

modal.querySelector('.modal__box').addEventListener('click', (e) => {
    e._isClickWithinModal = true
})

modal.addEventListener('click', (e) => {
    if(e._isClickWithinModal) return;
    closeModal()
    clearForm()
})

window.addEventListener('keydown', (btn) => {
    if(btn.key === 'Escape') {
        closeModal()
        clearForm()
    }
})

function checkForm() {
    
    
}


function sendForm() {

}

modal.querySelector('.modal__btn').addEventListener('click', (e) => {
    e.preventDefault()
    sendForm()
    closeModal()
    clearForm()
})