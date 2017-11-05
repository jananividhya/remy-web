import React from 'react';
import Grid from 'material-ui/Grid';

const botPaperClass = {
    height: '570px',
    width: '100%'
};

const botPapers = [
    {
        type: "image",
        action: {
            "type": "external",
            "load": "https://google.com"
        },
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
    },
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
    },
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
];

const wallpaperClick = (props, index) => {
    if (botPapers[index].action.type && botPapers[index].action.type === 'external') {
        props.action(botPapers[index].action.load);
    } else {
        props.action();
    }
};

const randomBotPaper = Math.floor(Math.random() * (botPapers.length - 2));

export default (props) => (
    <Grid container gutter={8}>
        <Grid item xs={12} sm={12} onClick={() => wallpaperClick(props, randomBotPaper)}>
            <img src={botPapers[randomBotPaper].src} style={botPaperClass} alt="Bot Wallpaper" />
        </Grid>
    </Grid>
);