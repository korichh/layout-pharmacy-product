(function () {
    const header = document.querySelector('.header')
    const scrollTop = document.querySelector('.scroll-top')
    const mobileMenu = document.querySelector('.mobile-menu')
    const selectLang = document.querySelector('.select-lang')

    if (header && scrollTop) {
        window.addEventListener('scroll', checkScroll)
        checkScroll()

        function checkScroll() {
            if (scrollY > 40) {
                header.classList.add('_active')
                scrollTop.classList.add('_active')
            } else {
                header.classList.remove('_active')
                scrollTop.classList.remove('_active')
            }
        }
    }

    if (mobileMenu) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-mobile]')) {
                e.preventDefault()
                mobileMenu.classList.add('_active')
            }
        })

        mobileMenu.addEventListener('click', (e) => {
            if (e.target.closest('.menu-item')) {
                mobileMenu.classList.remove('_active')
            }
            if (e.target.closest('.close') || !e.target.closest('.mobile-menu__inner')) {
                e.preventDefault()
                mobileMenu.classList.remove('_active')
            }
        })
    }

    if (selectLang) {
        selectLang.addEventListener('click', (e) => {
            if (e.target.closest('.select-lang__selected')) selectLang.classList.add('_active');
            selectLang.addEventListener('mouseleave', () => {
                selectLang.classList.remove('_active')
            }, { once: true })
        })
    }

    if ('select') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.select')) {
                e.preventDefault()
                if (e.pointerId < 0) return
                const select = e.target.closest('.select')
                const option = e.target.closest('.select__options > button')
                if (option) {
                    const selected = select.querySelector('.select__selected-value')
                    const options = select.querySelectorAll('.select__options > button')
                    selected.innerHTML = escapeHtml(option.innerHTML)
                    options.forEach(el => el.classList.remove('_active'))
                    option.classList.add('_active')
                    select.classList.remove('_active')
                } else {
                    select.classList.add('_active')
                    select.addEventListener('mouseleave', () => {
                        select.classList.remove('_active')
                    }, { once: true })
                }
            }
        })
    }

    if ('count') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.count')) {
                e.preventDefault()
                const count = e.target.closest('.count')
                const btn = e.target.closest('.count__btn')
                const input = count.querySelector('.count__input')
                const min = +input.getAttribute('min')
                const max = +input.getAttribute('max')
                const value = +input.value
                if (!btn) return
                if (btn.classList.contains('count__decr')) {
                    if (value <= min) return input.value = min
                    input.value = value - 1
                } else {
                    if (value >= max) return input.value = max
                    input.value = value + 1
                }
            }
        })
        document.addEventListener('input', (e) => {
            if (e.target.closest('.count')) {
                e.preventDefault()
                if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') return
                const input = e.target.closest('.count__input')
                const min = +input.getAttribute('min')
                const max = +input.getAttribute('max')
                const value = +input.value
                if (value > max) input.value = max
                if (value < min) input.value = min
            }
        })
    }

    if ('acc') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.acc__head')) {
                const accWrapper = e.target.closest('.accs')
                const accs = accWrapper.querySelectorAll('.acc')
                const acc = e.target.closest('.acc')
                if (acc.classList.contains('_active')) {
                    acc.classList.remove('_active')
                } else {
                    accs.forEach(el => el.classList.remove('_active'))
                    acc.classList.add('_active')
                }
            }
        })
    }

    if ('change price') {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.select__options button') || e.target.closest('.count__btn')) updatePrice(e)
        })
        document.addEventListener('input', (e) => {
            if (e.target.closest('.count__input')) updatePrice(e)
        })

        function updatePrice(e) {
            const form = e.target.closest('.order-form')
            const priceDisplay = form.querySelector('.order-form__price')
            const currency = priceDisplay.getAttribute('data-currency')
            const price = form.querySelector('.select__options button._active') ? form.querySelector('.select__options button._active').getAttribute('data-price') : priceDisplay.getAttribute('data-price')
            const count = form.querySelector('.count__input').value || 1
            priceDisplay.innerHTML = `${(price * count).toFixed(2)} ${currency}`
        }
    }

    function escapeHtml(html) {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})()

// document.addEventListener('click', (e) => {
//     if (e.target.closest('a')) {
//         const href = e.target.closest('a').getAttribute('href')
//         if (href.includes('#')) return

//         e.preventDefault()
//         window.location.href = '/pharma-landing' + href
//     }
// })