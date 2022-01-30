'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal, closeModal} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {
    const modalTimerID = setTimeout(function () {
        openModal('.modal', modalTimerID);
    }, 60000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerID);
    timer('.timer', new Date('2022-06-15'));
    cards();
    calc();
    forms('.form', modalTimerID);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextBtn: '.offer__slider-next',
        prevBtn: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
});