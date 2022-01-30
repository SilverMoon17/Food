import {getResource} from '../services/services';

function cards() {
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
            this.currency = 'лей';
            this.changeToMDL();
        }

        changeToMDL() {
            this.price = this.price * this.transfer;
            if (this.price % 10 >= 2 && this.price % 10 < 5) {
                this.currency = 'лея';
            }
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
                    <div class="menu__item-total"><span>${this.price}</span> ${this.currency}/день</div>
                </div>
        `;
            this.parent.append(el);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').createCard();
            });
        });
}

export default cards;