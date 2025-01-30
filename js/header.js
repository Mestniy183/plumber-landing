document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header')
    const headerNav = document.querySelector('.header__nav')
    const headerContacts = document.querySelector('.header__contacts')
    const headerHeight = header.clientHeight


    const tl = gsap.timeline({ paused: true });

    function headerFixed() {
        tl.clear()
        tl.fromTo('.fixed', { y: "-100%" }, { y: 0, duration: 0.5, ease: "none" })
        tl.play()
    }

    function showHeaderContent() {
        tl.fromTo(headerNav, {x: "-100%", autoAlpha: 0}, {x: 0, duration: 0.8, delay: 0.5, autoAlpha: 1, ease: "power4.out"}, 'contacts')
        tl.fromTo(headerContacts, {x: "100%", autoAlpha: 0}, {x: 0, duration: 0.8, delay: 0.5, autoAlpha: 1, ease: "power4.out"}, 'contacts')
        tl.play()
    }

    showHeaderContent()

    function hiddenHeaderFixed() {
        tl.clear()
        tl.fromTo('.fixed', { y: 0 }, { y: "-100%", duration: 0.5, ease: "none" })
        tl.to('.fixed', {y: 0, duration: 0})
        tl.play()
    }

    document.addEventListener('scroll', () => {
        let scroll = window.scrollY
        if (scroll >= 10) {
            if (!header.classList.contains('fixed')) {
                header.classList.add('fixed')
                headerFixed()
            }
        } else {
           if(header.classList.contains('fixed')){
            hiddenHeaderFixed()
            setTimeout(() => {
                header.classList.remove('fixed')
                showHeaderContent()
            }, 500);
           }
        }
    })
})