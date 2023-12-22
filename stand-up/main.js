import './style.css'
import TomSelect from 'tom-select';

const bookingComediansList = document.querySelector('.booking__comedians-list');

const createComedianBlock = () => {
    const bookingComedian = document.createElement('li');
    bookingComedian.classList.add('booking__comedian');

    const bookingSelectComedian = document.createElement('select');
    bookingSelectComedian.classList.add(
        'booking__select', 
        'booking__select_comedian'
    );
    
    const bookingSelectTime = document.createElement('select');
    bookingSelectTime.classList.add(
        'booking__select', 
        'booking__select_time'
    );

    const inputHidden = document.createElement('input');
    inputHidden.type = 'hidden';
    inputHidden.name = 'booking';

    const bookingHall = document.createElement('button');
    bookingHall.classList.add('booking__hall');

    bookingComedian.append(bookingSelectComedian, bookingSelectTime, inputHidden);

    const bookingTomSelectComedian = new TomSelect(bookingSelectComedian, {
        hideSelected: true,
        placeholder: 'Choose Comedian',
        options: [{
            value: 1,
            text: 'Ruslan Belyi'
        },
        {
            value: 2,
            text: 'Ruslan Serij'
        },
        ]
    });
    const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
        hideSelected: true,
        placeholder: 'Choose Time',
    });

    bookingTomSelectTime.disable();

    bookingTomSelectComedian.on('change', () => {
        bookingTomSelectTime.enable();
        bookingTomSelectComedian.blur();
        bookingTomSelectTime.addOptions([
            {
                value: 1,
                text: 'Ruslan Belyi'
            },
            {
                value: 2,
                text: 'Ruslan Serij'
            },
        ]);
    });

    bookingTomSelectTime.on('change', () => {
        bookingTomSelectTime.blur();
        bookingHall.textContent = 'Hall 1';
        bookingComedian.append(bookingHall);
    });

    return bookingComedian;
}

const init = () => {
    const comedianBlock = createComedianBlock();

    bookingComediansList.append(comedianBlock);
}

init();




