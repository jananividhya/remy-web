import React from 'react';

const greeting = () => {
    const currentHour = new Date().getHours();
    let greetingText = 'Good Morning';

    switch (true) {
        case (currentHour >= 0 && currentHour < 12):
            greetingText = 'Good Morning';
            break;
        case (currentHour >= 12 && currentHour <= 15):
            greetingText = 'Good Noon';
            break;
        case (currentHour > 15 && currentHour <= 19):
            greetingText = 'Good Evening';
            break;
        default:
            break;
    }

    return greetingText;
};

export default () => (
    <span>
        {greeting()}
    </span>
)