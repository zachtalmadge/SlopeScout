import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    const formattedDate = `${month} ${day}, ${year}`;
    const formattedTime = `${hours}:${minutes}`;
    
    return { formattedDate, formattedTime };
}

const DateTimeDisplay = ({ dateTimeString }) => {
    const { formattedDate, formattedTime } = formatDateTime(dateTimeString);

    return (
        <div>
            <FontAwesomeIcon icon={faCalendar} /> {formattedDate}
            <br />
            <FontAwesomeIcon icon={faClock} /> {formattedTime}
        </div>
    );
};

export default DateTimeDisplay;
