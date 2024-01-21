import './style.css'
import { getComedians } from './scripts/api.js';
import { initForm } from './scripts/form.js';
import { createComedianBlock } from './scripts/comedians.js';
import { initChangeSection } from './scripts/initChangeSection.js';
import { initQrPage } from './scripts/qrPage.js';

const init = async () => {
    if(window.location.pathname.endsWith('qr.html')) {
        initQrPage();
        return;
    }
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingForm = document.querySelector('.booking__form');
    const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingInputFullName = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    const event = document.querySelector('.event');
    const booking = document.querySelector('.booking');
    const eventButtionReserve = document.querySelector('.event__button_reserve');
    const eventButtonEdit = document.querySelector('.event__button_edit');
    const bookingTitle = document.querySelector('.booking__title');

    const comedians = await getComedians();

    if(comedians) {
        countComedians.textContent = comedians.length;

        const changeSection = initChangeSection(bookingForm, event, booking, eventButtionReserve, eventButtonEdit, bookingTitle, comedians, bookingComediansList);
        initForm(bookingForm, bookingInputFullName, bookingInputPhone, bookingInputTicket, changeSection, bookingComediansList);
    }
};

init();






