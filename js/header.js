const header = document.querySelector('.header')
const headerHeight = header.clientHeight

const headerAnimation = [
    { transfrom: "translateY(0)" },
    { transfrom: "translateY(-100%)" }
]

const headerTiming = {
    duration: 300,
    iterations: 1
}

document.addEventListener('scroll', () => {
    let scroll = window.scrollY
    if (scroll >= headerHeight) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
        header.animate(headerAnimation, headerTiming)
    }
})