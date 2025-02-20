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
    if (e._isClickWithinModal) return;
    closeModal()
    clearForm()
})

window.addEventListener('keydown', (btn) => {
    if (btn.key === 'Escape') {
        closeModal()
        clearForm()
    }
})

function getIsValid(input, fieldName) {

    const errorText = input.parentElement.querySelector('.error-message')
    function createError(message) {
        const newErrorElement = document.createElement('div');
        newErrorElement.textContent = message;
        newErrorElement.classList.add('error-message')
        input.parentElement.append(newErrorElement)
        input.classList.add('input-invalid')
    }

    if (errorText) {
        errorText.remove()
    }

    if (input.value.trim() === '') {
        createError(`${fieldName} обязательно для заполнения`)
        return false
    }

    input.classList.remove('input-invalid')
    return true
}

function validateForm(inputs) {
    inputs.forEach((input) => {
        input.addEventListener('input', (e) => {
            const target = e.target;
            if (target) {
                if (target.name === 'name') {
                    getIsValid(target, 'Имя');
                } else if (target.name === 'tel') {
                    getIsValid(target, 'Телефон')
                } else if (target.name === 'message') {
                    getIsValid(target, 'Сообщение')
                }
            }
        })
    })
}

const inputs = document.querySelectorAll('.form-data')
validateForm(inputs)


const tel = modal.querySelector('input[name="tel"]')
const maskOptions = {
    mask: '+7(000)000-00-00',
    laze: false
}

const mask = new IMask(tel, maskOptions)

function checkForm() {
    const inputs = document.querySelectorAll('.form-data')
    inputs.forEach(input => {
        if(!getIsValid(input, input.placeholder)) return;
    })
    // const name = modal.querySelector('input[name="name"]')
    // const tel = modal.querySelector('input[name="tel"]')
    // const message = modal.querySelector('textarea[name="message"]')
    // if (!getIsValid(name, name.placeholder) || !getIsValid(tel, tel.placeholder) || !getIsValid(message, message.placeholder)) return;
}

modal.querySelector('.modal__btn').addEventListener('click', (e) => {
    e.preventDefault()
    
    checkForm()


    // closeModal()
    // clearForm()
})