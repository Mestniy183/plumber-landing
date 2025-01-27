const header = document.querySelector('.header')
const headerHeight = header.clientHeight


document.addEventListener('scroll', () => {
    let scroll = window.scrollY
    if (scroll >= headerHeight) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
})