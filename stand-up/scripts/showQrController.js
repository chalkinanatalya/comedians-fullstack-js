import QRCode from 'qrcode';
import { Notification } from './notification.js';

const displayQRCode = (data) => {
    let error = false
    const modal = document.querySelector('.modal');
    const canvas = document.getElementById('qrCanvas');
    const closeButton = document.querySelector('.modal__close');

    QRCode.toCanvas(canvas, data, (err) => {
        if(err) {
            error = true;
            console.err('error: ', error);
            return
        }
        console.log('QR code has been created');
    });

    if(error) {
        Notification.getInstance().show('Something went wrong, try later');
        return;
    }

    modal.classList.add('modal_show');

    window.addEventListener('click', ({target}) => {
        if(target === closeButton && target === modal) {
            modal.classList.remove('modal_show');
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
        }
    })
}

export const showQrController = (bookingPerformance) => {
    bookingPerformance.addEventListener('click', ({target}) => {
        if(target.closest('.booking__hall')) {
            const bookingData = target.dataset.booking;
            displayQRCode(bookingData);
        }
    });

}

