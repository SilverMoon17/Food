import {getZero} from './timer';

function slider({container, slide, nextBtn, prevBtn, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const totalSlides = document.querySelector(totalCounter),
          slider = document.querySelector(container),
          currentSlide = document.querySelector(currentCounter),
          slides = document.querySelectorAll(slide),
          prevButton = document.querySelector(prevBtn),
          nextButton = document.querySelector(nextBtn),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let current = 1,
        offset = 0;

    totalSlides.textContent = getZero(slides.length);
    currentSlide.textContent = getZero(current);

    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    nextButton.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1) ){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (current == slides.length) {
            current = 1;
        } else {
            current++;
        }
        currentSlide.textContent = getZero(current);

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[current-1].style.opacity = '1';
    });

    prevButton.addEventListener('click', () => {
        if (offset == 0){
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if (current == 1 ) {
            current = slides.length;
        } else {
            current--;
        }
        currentSlide.textContent = getZero(current);

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[current-1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            current = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlide.textContent = getZero(current);

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[current-1].style.opacity = '1';

        });
    });
}

export default slider;