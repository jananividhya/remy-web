import React from 'react';
import Slider from 'react-slick';

const botPaperClass = {
    height: window.innerHeight,
    width: window.innerWidth,
};

const botPapers = {
    'MORNING': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 1@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 2@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 3@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 4@10x.jpg"
        }
    ],
    'NOON': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 1@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 2@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 3@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 4@10x.jpg"
        }
    ],
    'EVENING': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 1@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 2@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 3@10x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Screen 4@10x.jpg"
        }
    ]
};

const wallpaperClick = (props, type, index) => {
    if (botPapers[type][index].action.type && botPapers[type][index].action.type === 'external') {
        props.action(botPapers[type][index].action.load);
    } else {
        props.action();
    }
};

const cardSliderOptions = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    speed: 1000,
    fade: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
};

const greeting = (props) => {
    const currentHour = new Date().getHours();
    let greetingText = 'Good Morning';

    switch (true) {
        case (currentHour >= 0 && currentHour < 12):
            greetingText = (
                <Slider {...cardSliderOptions}>
                {botPapers['MORNING'].map((botpaper, key) => {
                    return (
                        <div key={key}>
                            <img src={botpaper.src} style={botPaperClass} alt="Bot Wallpaper" onClick={() => wallpaperClick(props, 'EVENING', key)} />
                        </div>
                    );
                })}
                </Slider>
            );
            break;
        case (currentHour >= 12 && currentHour <= 15):
            greetingText = (
                <Slider {...cardSliderOptions}>
                {botPapers['NOON'].map((botpaper, key) => {
                    return (
                        <div key={key}>
                            <img src={botpaper.src} style={botPaperClass} alt="Bot Wallpaper" onClick={() => wallpaperClick(props, 'EVENING', key)} />
                        </div>
                    );
                })}
                </Slider>
            );
            break;
        case (currentHour > 15 && currentHour <= 24):
            greetingText = (
                <Slider {...cardSliderOptions}>
                {botPapers['EVENING'].map((botpaper, key) => {
                    return (
                        <div key={key}>
                            <img src={botpaper.src} style={botPaperClass} alt="Bot Wallpaper" onClick={() => wallpaperClick(props, 'EVENING', key)} />
                        </div>
                    );
                })}
                </Slider>
                
            );
            break;
        default:
            break;
    }

    return greetingText;
};

export default (props) => (
    <div>
        {greeting(props)}
    </div>
);