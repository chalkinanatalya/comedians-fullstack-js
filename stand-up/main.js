import './style.css'
import { getComedians } from './scripts/api.js';
import { initForm } from './scripts/form.js';
import { createComedianBlock } from './scripts/comedians.js';

const init = async () => {
    const bookingComediansList = document.querySelector('.booking__comedians-list');
    const bookingForm = document.querySelector('.booking__form');
    const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
    const bookingInputFullName = document.querySelector('.booking__input_fullname');
    const bookingInputPhone = document.querySelector('.booking__input_phone');
    const bookingInputTicket = document.querySelector('.booking__input_ticket');

    const comedians = await getComedians();

    initForm(bookingForm, bookingInputFullName, bookingInputPhone, bookingInputTicket)
    if(comedians) {
        countComedians.textContent = comedians.length;
        const comedianBlock = createComedianBlock(comedians, bookingComediansList);
        bookingComediansList.append(comedianBlock);
    }
};

init();




