import { createComedianBlock } from "./comedians.js";

export const initChangeSection = (bookingForm, event, booking, eventButtionReserve, eventButtonEdit, bookingTitle, comedians, bookingComediansList) => {
    eventButtonEdit.style.transition =  'opacity 0.5s, visibility 0.5s';
    eventButtionReserve.style.transition =  'opacity 0.5s, visibility 0.5s';
    
    eventButtionReserve.classList.remove('event__button_hidden');
    eventButtonEdit.classList.remove('event__button_hidden');

    const changeSection = () => {
        event.classList.toggle('event__hidden');
        booking.classList.toggle('booking__hidden');
        if(!booking.classList.contains('booking__hidden')) {
            const comedianBlock = createComedianBlock(comedians, bookingComediansList);
            bookingComediansList.append(comedianBlock);
        }

    }

    eventButtionReserve.addEventListener('click', () => {
        changeSection();
        bookingTitle.textContent = 'Book a seat in the hall'
        bookingForm.method = 'POST';
    })

    eventButtonEdit.addEventListener('click', () => {
        changeSection();
        bookingTitle.textContent = 'Edit booking'
        bookingForm.method = 'PATCH';
    });

    return changeSection;

}



