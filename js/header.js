const header = document.querySelector('.header')
const headerNav = document.querySelector('.header__nav')
const headerAddress = document.querySelector('.header__contacts')
const headerHeight = header.clientHeight
console.log(headerHeight);

document.addEventListener('scroll', () => {
    let scroll = window.scrollY
    console.log(scroll);
    if (scroll >= 50) {
        console.log(1);
        header.classList.add('fixed')
        headerAddress.classList.add('show')
        headerNav.classList.add('show')
    } else {
        header.classList.add('hidden');
        setTimeout(() => {
            header.classList.remove('hidden', 'fixed');
            headerNav.classList.remove('show')
            headerAddress.classList.remove('show')
        }, 300);
    }
})