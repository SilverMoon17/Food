// 'use strict';

document.addEventListener("DOMContentLoaded", () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabcontent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabcontent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabcontent[i].classList.add('show', 'fade');
        tabcontent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', e => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();


    // Timer
    const deadline = new Date('2022-04-22');
    const promoBlock = document.querySelector('.promotion');

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerText = '00';
                hours.innerText = '00';
                minutes.innerText = '00';
                seconds.innerText = '00';
                promoBlock.remove();
            } else {
                days.innerText = getZero(t.days);
                hours.innerText = getZero(t.hours);
                minutes.innerText = getZero(t.minutes);
                seconds.innerText = getZero(t.seconds);
            }

        }
    }

    setClock('.timer', deadline);


    // Modal
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]');
    let opened = false;

    function closeModal(modalSelector) {
        modalSelector.classList.add('hide');
        modalSelector.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(modalSelector) {
        modalSelector.classList.add('show');
        modalSelector.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerID);
        opened = true;
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modal);
        });
    });



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modal);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });

    const modalTimerID = setTimeout(function () {
        openModal(modal);
    }, 60000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight - 1 && !opened
            ) 
        {
            openModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // menuCards
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 18;
            this.changeToMDL();
        }

        changeToMDL() {
            this.price = this.price * this.transfer;
        }

        createCard() {
            const el = document.createElement('div');

            if (this.classes.length === 0) {
                this.el = 'menu__item';
                el.classList.add(this.el);
            } else {
                this.classes.forEach(className => el.classList.add(className));
            }


            el.innerHTML =
                `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> лей/день</div>
                </div>
           `;
            this.parent.append(el);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. 
        Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        '.menu .container'
    ).createCard();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню \"Премиум\"",
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. 
        Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        16,
        '.menu .container',
        'menu__item',
        'big'
    ).createCard();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню \"Постное\"",
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, 
        молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных 
        вегетарианских стейков.`,
        13,
        '.menu .container',
        'menu__item',
        'big'
    ).createCard();

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(form => {
        postData(form);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');

        openModal(modal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML =
            `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modal);
        }, 4000);
    }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            

            const object = {};

            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php', {
                method : 'POST',
                headers : {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }).then(data => data.text())
            .then((data) => {
                showThanksModal(message.success);
                console.log(data);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }
});