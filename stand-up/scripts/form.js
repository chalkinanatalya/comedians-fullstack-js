import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import { Notification } from './notification.js';

export const initForm = (bookingForm, bookingInputFullName, bookingInputPhone, bookingInputTicket) => {
    const validate = new JustValidate(bookingForm, {
        errorFieldCssClass: 'booking__input_invalid',
        successFieldCssClass:'booking__input_valid',
    });

    new Inputmask('99999999').mask(bookingInputTicket);
    new Inputmask('+1(999)-999-9999').mask(bookingInputPhone);

    validate
    .addField(bookingInputFullName, [{
        rule: 'required',
        errorMessage: 'Fill name section'
    }])
    .addField(bookingInputPhone, [{
        rule: 'required',
        errorMessage: 'Fill phone section'
    },     
    {
        validator() {
            const phone = bookingInputPhone.inputmask.unmaskedvalue();
            return phone.length === 10 && !!Number(phone)
        },
        errorMessage: 'Incorrect phone number'
    }
])
    .addField(bookingInputTicket, [{
        rule: 'required',
        errorMessage: 'Input ticket number'
    }, 
    {
        validator() {
            const ticket = bookingInputTicket.inputmask.unmaskedvalue()
            return ticket.length === 8 && !!Number(ticket);
        },
        errorMessage: 'Wrong ticket number'
    }
]).onFail((fields) => {
    let errorMessage = '';
    for (const key in fields) {
        if (!Object.hasOwnProperty.call(fields, key)) {
            continue;
        }

        const element = fields[key];
        if(!element.isValid) {
            errorMessage += `${element.errorMessage}, `
        }
    }

    Notification.getInstance().show(errorMessage.slice(0, -2), false)
});

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {booking: []};
        const times = new Set();

        new FormData(bookingForm).forEach((value, field) => {
            if(field === 'booking') {
                const [comedian, time] = value.split(',');

                if(comedian && time) {
                    data.booking.push({comedian, time});
                    times.add(time);
                } 

            } else {
                    data[field] = value;
                }
            
            if(times.size !== data.booking.length) {
                Notification.getInstance().show(`you can't attend two preformances at once`, false)
            }
        });
    });
}