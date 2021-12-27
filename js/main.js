'use strict';

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
    const deadline = new Date('2022-01-01');

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

            days.innerText = getZero(t.days);
            hours.innerText = getZero(t.hours);
            minutes.innerText = getZero(t.minutes);
            seconds.innerText = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('[data-close]');
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


    modalClose.addEventListener('click', () => {
        closeModal(modal);

    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code.toLowerCase() === 'escape' && modal.classList.contains('show')) {
            closeModal(modal);
        }
    });

    // const modalTimerID = setTimeout(function() {openModal(modal);}, 5000);

    function showModalByScroll() {
        if(window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight-1 && !opened) {
            openModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

});