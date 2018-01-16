import React from 'react';
import Grid from 'material-ui/Grid';

const botPaperClass = {
    height: window.innerHeight - 30,
    width: window.outerWidth,
    marginTop: '-30px',
    marginLeft: '-15px',
    marginBottom: '-30px',
};

const botPapers = {
    'MORNING': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 1@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 2@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 3@3x.jpg"
        }
    ],
    'NOON': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 4@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 5@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 6@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 7@3x.jpg"
        }
    ],
    'EVENING': [
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 8@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 9@3x.jpg"
        },
        {
            type: "image",
            actionType: "",
            action: {},
            src: "botpapers/Wallpaper 10@3x.jpg"
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

const greeting = (props) => {
    const currentHour = new Date().getHours();
    let greetingText = 'Good Morning';

    switch (true) {
        case (currentHour >= 0 && currentHour < 12):
            greetingText = <img src={botPapers['MORNING'][Math.floor(Math.random() * (botPapers['MORNING'].length - 1))].src} style={botPaperClass} alt="Bot Wallpaper" onClick={() => wallpaperClick(props, 'MORNING', Math.floor(Math.random() * (botPapers['MORNING'].length - 1)))} />;
            break;
        case (currentHour >= 12 && currentHour <= 15):
            greetingText = <img src={botPapers['NOON'][Math.floor(Math.random() * (botPapers['NOON'].length - 1))].src} style={botPaperClass} alt="Bot Wallpaper"
            onClick={() => wallpaperClick(props, 'NOON', Math.floor(Math.random() * (botPapers['NOON'].length - 1)))} />;
            break;
        case (currentHour > 15 && currentHour <= 24):
            greetingText = <img src={botPapers['EVENING'][Math.floor(Math.random() * (botPapers['EVENING'].length - 1))].src} style={botPaperClass} alt="Bot Wallpaper" onClick={() => wallpaperClick(props, 'EVENING', Math.floor(Math.random() * (botPapers['EVENING'].length - 1)))} />;
            break;
        default:
            break;
    }

    return greetingText;
};

export default (props) => (
    <Grid container gutter={8}>
        <Grid item xs={12} sm={12}>
            {greeting(props)}
        </Grid>
    </Grid>
);