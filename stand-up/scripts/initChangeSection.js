export const initChangeSection = (bookingForm, event, booking, eventButtionReserve, eventButtonEdit, bookingTitle) => {
    eventButtonEdit.style.transition =  'opacity 0.5s, visibility 0.5s';
    eventButtionReserve.style.transition =  'opacity 0.5s, visibility 0.5s';
    
    eventButtionReserve.classList.remove('event__button_hidden');
    eventButtonEdit.classList.remove('event__button_hidden');

    const changeSection = () => {
        event.classList.add('event__hidden');
        booking.classList.remove('booking__hidden');
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
    })

}


