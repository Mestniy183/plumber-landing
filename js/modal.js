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
  
  const tel = document.getElementById('tel')
  const mask = IMask(tel, {
    mask: '+7(000)000-00-00',
    lazy: false, 
  })

  console.log(mask);
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

    if(input.name === 'tel') {
      mask.updateValue()

    if (mask.unmaskedValue.length < 10) {
      createError(`Телефон должен быть заполнен`)
      return false
    }
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


function checkForm() {
    let result = true
    const inputs = document.querySelectorAll('.form-data')
    inputs.forEach(input => {
        if (!getIsValid(input, input.placeholder)) {
            result = false
        }
    })
    return result
}

function notify(text, bgColor) {
    const divElement = document.createElement('div');
    divElement.classList.add('notify')
    divElement.style.backgroundColor = bgColor
    divElement.textContent = text;
    document.body.append(divElement)
    gsap.from('.notify', {y: '-50', duration: 1, ease: "power1.in"})
    setTimeout(() => {
        gsap.to('.notify', {y: -50, duration: 0.8, ease: "power1.out", onComplete: function() {divElement.remove()}})
        
    }, 3000);
}

async function fetchData() {
    const [name, tel, mes] = inputs
    try {
        const response = await fetch('https://dc3c997554c1d330.mokky.dev/items', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value,
                phone: tel.value,
                message: mes.value
            })
        })
        if(!response.ok) {
            notify('Произошла ошибка', 'red')
            return;
        }
        notify('Данные отправлены', 'green')
    } catch (e) {
        throw Error(e)
    }
}
modal.querySelector('.modal__btn').addEventListener('click', (e) => {
    e.preventDefault()
    if (checkForm()) {
        fetchData()
        closeModal()
        clearForm()
    }
})