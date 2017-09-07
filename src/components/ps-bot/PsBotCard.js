// React imports
import React, {Component} from 'react';

// Material UI imports
import Paper from 'material-ui/Paper';
import {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import isURL from 'validator/lib/isURL';
import PsBotCardImage from './PsBotCardImage';

// Style Imports
import './PsBotButton.css';

const styleSheet = createStyleSheet('PsBotCard', theme => ({
    buttonResponse: {
        boxShadow: '0px 0px',
        color: '#FFFFFF',
        fontFamily: 'Lato, sans-serif !important',
        minWidth: '120px',
        borderRadius: '60px',
        height: '10px',
        background: 'rgba(150, 101, 171, 0.87)',
    },
    nextLine: {
        wordWrap: 'break-word',
        clear: 'both',
        position: 'relative',
        overflowY: 'scroll',
    },
    card: {
        maxWidth: 345,
    },
    leftAlignedText: {
        float: 'left !important',
        textAlign: 'left !important',
        marginBottom: '10px',
    },
    psTextColor: {
        fontFamily: 'Lato, sans-serif',
        color: '#9B9B9B',
    },
    buttonTop: {
        bottom: '18px',
        left: '12px',
    },
    paperBotConversation: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
    },
    avatar: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
}));

/**
 * @class PsBotCard
 * @extends Component
 * @description pS Bot Card Response
 */
class PsBotCard extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = this.props.data;
    }

    /* {
          "contentType": "application/vnd.microsoft.card.hero",
          "content": {
            "title": "purpleSlate",
            "subtitle": "Purple : Associated with all the Good things in life - nobility, royalty, power, ambition, creativity, wisdom, dignity, grandeur and magic",
            "text": "Slate : For many of us, the Slate is the earliest piece of  instrument we are exposed to in our pursuit of Learning. For us, Slate is representative of the high levels of Curiosity and Passion we carried in those early days of our life. Our objective is to get back to those core values, as we did in our very early days of learning - before taking the giant leap to the Future. ",
            "images": [
              {
                "url": "http://www.purpleslate.in/img/ps/arrow.png"
              }
            ],
            "buttons": [
              {
                "type": "openUrl",
                "title": "Read more",
                "value": "http://www.purpleslate.in"
              }
            ]
          }
        } */

    /**
     * @method isURL
     * @methodOf PsBotCard#isURL
     * @description Checks if a given string is an url or not
     * @param str
     * @returns {boolean}
     */
    isURL = (str) => {
        return isURL(str);
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBotCard#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} event Button Click Event
     * @param {Object} button Button object passed from onClick
     */
    pSBotButtonClick = (button) => {
        const buttonValue = button.value;

        if (this.isURL(buttonValue)) {
            window.open(buttonValue);
        } else {
            this.props.action(buttonValue);
        }
    };

    render() {
        return ( <div>
            {((this.state.title) ? <CardContent className={this.classes.leftAlignedText}> {
                (this.state.title) ? (<div>
                    {(this.state.images && this.state.images[0]) ? (
                            <img src={this.state.images[0].url}
                                height={50}
                                width={50}
                                style={{marginLeft: -10}} />
                        ) : ''}
                    <Typography type="headline" component="h2" className={this.classes.psTextColor}>
                            {this.state.title}
                    </Typography>
                    <Typography type="subheading" component="p" className={this.classes.psTextColor}>
                        {this.state.subtitle}
                    </Typography>
                    </div>
                ) : '' }
                { (this.state.text) ? (
                    <Typography className={this.classes.psTextColor}>
                        {this.state.text}
                    </Typography> ) : '' }
            </CardContent> : '') }
            {((this.state.title || this.state.text) && this.state.buttons) ? (
                    this.state.buttons.map((button, buttonId) => {
                        return (button.type === 'openUrl') ? (<Chip label={button.title} className={[this.classes.chip, this.classes.nextLine, this.classes.buttonTop].join(' ')}
                                    onClick={() => this.pSBotButtonClick(button)} />) : ''
                    })
            ) : ''}
        </div> );
    }
}

PsBotCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCard);
