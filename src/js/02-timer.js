import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]')
const start = document.querySelector('button[data-start]');
const inputRef = document.querySelector("#datetime-picker");


let selectedDate = 0;
start.setAttribute('disabled', true);
let time = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date) {
            return Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            start.removeAttribute('disabled')
            inputRef.setAttribute('disabled', true)
            selectedDate = selectedDates[0]
        }
    },
};

function addLeadingZero(value) {
    return `${value}`.padStart(2, '0')
}

start.addEventListener('click', () => {
    const timer = setInterval(() => {
        const defaultDate = new Date();
        time = selectedDate - defaultDate;
        const convertTime = convertMs(time);
        if (time < 0) {
            clearInterval(timer);
            return Notiflix.Notify.success('End Time!');;
        }
        console.log(convertTime)
        start.setAttribute('disabled', true);

        days.textContent = addLeadingZero(convertTime.days);
        hours.textContent = addLeadingZero(convertTime.hours);
        minutes.textContent = addLeadingZero(convertTime.minutes);
        seconds.textContent = addLeadingZero(convertTime.seconds);

    }, 1000)
}
)

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);


    return { days, hours, minutes, seconds };
}

flatpickr(inputRef, options);