import React from 'react';

const greeting = ({ userName }) => {
    const currentHour = new Date().getHours();
    let greetingText = 'Good Morning';

    switch (true) {
        case (currentHour >= 0 && currentHour < 12):
            greetingText = 'Good Morning';
            break;
        case (currentHour >= 12 && currentHour <= 15):
            greetingText = 'Good Noon';
            break;
        case (currentHour > 15 && currentHour <= 24):
            greetingText = 'Good Evening';
            break;
        default:
            break;
    }

    if (userName) {
        return greetingText + ' ' + userName;
    } else {
        return greetingText;
    }
    
};

const PsBotGreeting = (props) => (
    <span>
        {greeting(props)}
    </span>
);

export default PsBotGreeting;