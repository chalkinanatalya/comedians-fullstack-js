export const displayClientInfo = (parent, data) => {
    parent.innerHTML += `
        <p class="booking__client-item">Name: ${data.fullName}</p>
        <p class="booking__client-item">Phone: ${data.phone}</p>
        <p class="booking__client-item">TicketNumber: ${data.ticketNumber}</p>
    `
}

export const displayBooking = (parent, clientData, comediansData) => {
    const bookingList = document.createElement('ul');
    bookingList.classList.add('booking__list');

    const bookingComedians = clientData.booking.map(bookingComedian => {
        const comedian = comediansData.find(item => item.id === bookingComedian.comedian);
        //trim
        const performance = comedian.performances.find(item => bookingComedian.time.trim() === item.time.trim())
        return {
            comedian,
            performance,
        }
    });

    bookingComedians.sort((a, b) => a.performance.time.localeCompare(b.performance.time));

    const comedianElements = bookingComedians.map(
        ({comedian, performance}) => {
            const comedianElement = document.createElement('li');
            comedianElement.classList.add('booking__item');
            comedianElement.innerHTML = `
                <h3>${comedian.comedian}</h3>
                <p>Time: ${performance.time} </p>
                <button class="booking__hall" type="button" data-booking="${clientData.fullName} ${clientData.ticketNumber} ${comedian.comedian} ${performance.time} ${performance.hall}">${[performance.hall]}</button>
            `
            return comedianElement;
        },
    );

    bookingList.append(...comedianElements);
    parent.append(bookingList);

}