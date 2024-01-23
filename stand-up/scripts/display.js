export const displayClientInfo = (parent, data) => {
    parent.innerHTML += `
        <p class="booking__client-item">Name: ${data.fullName}</p>
        <p class="booking__client-item">Phone: ${data.phone}</p>
        <p class="booking__client-item">TicketNumber: ${data.ticketNumber}</p>
    `
}

export const displayBooking = () => {

}