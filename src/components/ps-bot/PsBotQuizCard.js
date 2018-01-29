// React imports
import React, {Component} from 'react';

// Material UI imports
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Chip from 'material-ui/Chip';

import isURL from 'validator/lib/isURL';

import PsBotTimer from './PsBotTimer';

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
        display: 'inline-block',
    },
    card: {
        maxWidth: 345,
    },
    leftAlignedText: {
        float: 'left !important',
        textAlign: 'left !important',
        padding: '8px !important',
        marginTop: '8px',
    },
    psTextColor: {
        fontFamily: 'Lato, sans-serif',
        color: '#212121',
    },
    buttonTopQuiz: {
        top: '6px',
        textAlign: 'center',
        marginRight: '5px',
    },
    buttonTop: {
        right: '35px',
        top: '6px',
        textAlign: 'center',
        marginRight: '5px',
        paddingTop: '12px',
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
    cardText: {
        marginTop: 10,
        marginBottom: 10,
    },
    chip: {

    },
    quiz: {
        textAlign: 'center',
        verticalAlign: 'middle',
        paddingRight: '10px',
    },
    quizTimer: {
        marginLeft: '100px',
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

        if (this.refs.psBotTimer) {
            this.refs.psBotTimer.turnOffTimer();
        }

        if (this.isURL(buttonValue)) {
            window.open(buttonValue);
        } else {
            this.props.action(buttonValue);
        }
    };

    quizTimerOff = (timerResponse) => {
        this.disableButtons = true;
        if (timerResponse.timerAutoOff) {
            this.props.action('Chosen Answer <Skip> ', timerResponse);
        }
    };

    render() {

        const quizTimer = (this.state.timer) ? (
            <PsBotTimer ref="psBotTimer"
                        options={{totalTime: this.state.timer}}
                        action={this.quizTimerOff}/>
        ) : '';

        return ( <div>
            {((this.state.title || this.state.subtitle || this.state.text) ?
                <CardContent className={this.classes.leftAlignedText}>
                        {(this.state.images && this.state.images[0]) ? (
                            <CardMedia style={{
                                paddingTop: 10,
                                paddingBottom: 10
                            }}>
                                <img src={this.state.images[0].url} alt={this.state.title}
                                    style={{
                                        height: '150px', 
                                        width: '109%',
                                        marginLeft: '-20px',
                                        marginTop: '-15px',
                                        borderTopLeftRadius: '15px',
                                    }} />
                            </CardMedia>
                        ) : ''}
                        {this.state.title &&<Typography type="headline" component="h2" className={this.classes.psTextColor}
                        style={{
                                            background: (this.props.theme) ? this.props.theme.background : '',
                                            color: (this.props.theme) ? this.props.theme.color : '',
                                            fontFamily: (this.props.theme) ? this.props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                                            fontSize: (this.props.theme) ? this.props.theme.fontSize + ' !important' : '',
                                        }}
                        >
                            {this.state.title}
                            <span style={{
                                marginLeft: 50
                            }}>
                                {quizTimer}
                            </span>
                        </Typography>}
                        {this.state.subTitle &&<Typography type="subheading" component="p" className={this.classes.psTextColor}
                        style={{
                                            background: (this.props.theme) ? this.props.theme.background : '',
                                            color: (this.props.theme) ? this.props.theme.color : '',
                                            fontFamily: (this.props.theme) ? this.props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                                            fontSize: (this.props.theme) ? this.props.theme.fontSize + ' !important' : '',
                                        }}
                        >
                            {this.state.subTitle}
                        </Typography>}
                        {(this.state.text && Array.isArray(this.state.text)) ? (
                            this.state.text.map((textVal, key) => (
                                <Typography component="p" key={key}
                                            className={[this.classes.psTextColor, (this.state.noButtonCard) ? '' : this.classes.cardText].join(' ')}
                                            style={{
                                            background: (this.props.theme) ? this.props.theme.background : '',
                                            color: (this.props.theme) ? this.props.theme.color : '',
                                            fontFamily: (this.props.theme) ? this.props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                                            fontSize: (this.props.theme) ? this.props.theme.fontSize + ' !important' : '',
                                        }}
                                            >
                                    {(textVal.split('\n\n').length > 0) ? (
                                        textVal.split('\n\n').map((text, k) => (
                                            <p key={k}>{text}</p>
                                        ))
                                        ) : {textVal}
                                    }
                                </Typography>
                            ))
                        ) : (
                            this.state.text &&<Typography component="p"
                                        className={[this.classes.psTextColor, (this.state.noButtonCard) ? '' : this.classes.cardText].join(' ')}
                                        style={{
                                            background: (this.props.theme) ? this.props.theme.background : '',
                                            color: (this.props.theme) ? this.props.theme.color : '',
                                            fontFamily: (this.props.theme) ? this.props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                                            fontSize: (this.props.theme) ? this.props.theme.fontSize + ' !important' : '',
                                        }}
                                        >
                                {(this.state.text.split('\n\n').length > 0) ? (
                                    this.state.text.split('\n\n').map((text, k) => (
                                        <p key={k}>{text}</p>
                                    ))
                                ) : this.state.text}
                            </Typography>
                        )}
                        {(this.state.choices) ? (
                            <div className={this.classes.quiz} style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}>
                                {this.state.choices.map((button, buttonId) => {
                                    return ((button.type === 'imBack') ?
                                        ((button.buttonImage) ? (
                                            <img src={button.buttonImage} height="30px" width="100px" alt="" />
                                        ) : (<Chip  key={buttonId}
                                                label={button.title}
                                            // eslint-disable-next-line
                                                onClick={() => {(!this.disableButtons) ? this.pSBotButtonClick(button) : ''}}
                                                className={[this.classes.chip, this.classes.buttonTopQuiz].join(' ')}
                                        />)) : '')
                                })}
                            </div>
                        ) : ''}
                </CardContent> : '')}
        </div> );
    }
}

PsBotCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCard);
