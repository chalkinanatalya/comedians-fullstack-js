import { getClient, getComedians } from "./api.js";
import { displayBooking, displayClientInfo } from "./display.js";
import { Notification } from "./notification.js";
import { showQrController } from "./showQrController.js";

const getTicketNumber = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('t')
}

export const initQrPage = async () => {
    const clientInfo = document.querySelector('.booking__client-info');
    const bookingPerformance = document.querySelector('.booking__performance');

    const ticketNumber = getTicketNumber();
    console.log('ticketNumber: ', ticketNumber);
    
    if(ticketNumber) {
        const clientData = await getClient(ticketNumber);
        displayClientInfo(clientInfo, clientData);
        const comediansData = await getComedians(ticketNumber);
        displayBooking(bookingPerformance, clientData, comediansData);

        showQrController(bookingPerformance);
        
    } else {
        Notification.getInstance().show('Some error has occured, check your link');
    }
}