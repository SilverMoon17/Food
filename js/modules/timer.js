function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function timer(id, deadline) {
    // Timer
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

    setClock(id, deadline);
}

export default timer;
export {getZero};