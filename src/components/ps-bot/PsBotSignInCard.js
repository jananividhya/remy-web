// React imports
import React, {Component} from 'react';

// Material UI imports
import {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import PsBotTimer from './PsBotTimer';

import PsBotFbSignInCard from './PsBotFbSignInCard';
import PsBotGoogleSignInCard from './PsBotGoogleSignInCard';

// Style Imports
import './PsBotButton.css';

const styleSheet = createStyleSheet('PsBotSignInCard', theme => ({
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
 * @class PsBotSignInCard
 * @extends Component
 * @description pS Bot Card Response
 */
class PsBotSignInCard extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = this.props.data;
    }

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

    onSignIn = (props) => {
        this.props.action(props);
    };

    render() {

        const quizTimer = (this.state.timer) ? (
            <PsBotTimer ref="psBotTimer"
                        options={{totalTime: this.state.timer}}
                        action={this.quizTimerOff}/>
        ) : '';

        const signInButtonHandler = (buttonType, key) => {
            let button = '';

            switch (buttonType) {
                case 'fbSignIn':
                    button = (<p key={key}><PsBotFbSignInCard action={this.onSignIn} /></p>);
                    break;
                case 'googleSignIn':
                    button = (<p key={key}><PsBotGoogleSignInCard action={this.onSignIn} /></p>);
                    break;
                default:
                    break;
            }

            return button;
        };

        return ( <div>
            {((this.state.title || this.state.subtitle || this.state.text) ?
                <CardContent className={this.classes.leftAlignedText}> {
                    <div>
                        {(this.state.images && this.state.images[0]) ? (
                            <img src={this.state.images[0].url}
                                 alt={this.state.title}
                                 height={50}
                                 width={50}
                                 style={{marginLeft: -10}}/>
                        ) : ''}
                        <Typography type="headline" component="h2" className={this.classes.psTextColor}>
                            {this.state.title}
                            <span style={{
                                marginLeft: 50
                            }}>
                                {quizTimer}
                            </span>
                        </Typography>
                        <Typography type="subheading" component="p" className={this.classes.psTextColor}>
                            {this.state.subTitle}
                        </Typography>
                        {(this.state.text && Array.isArray(this.state.text)) ? (
                            this.state.text.map((textVal, key) => (
                                <Typography component="p" key={key}
                                            className={[this.classes.psTextColor, (this.state.noButtonCard) ? '' : this.classes.cardText].join(' ')}>
                                    {(textVal.split('\n\n').length > 0) ? (
                                        textVal.split('\n\n').map((text, k) => (
                                            <p key={k}>{text}</p>
                                        ))
                                        ) : {textVal}
                                    }
                                </Typography>
                            ))
                        ) : (
                            <Typography component="p"
                                        className={[this.classes.psTextColor, (this.state.noButtonCard) ? '' : this.classes.cardText].join(' ')}>
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
                                    return signInButtonHandler(button.type, buttonId);
                                })}
                            </div>
                        ) : ''}
                    </div>
                }
                </CardContent> : '')}
        </div> );
    }
}

PsBotSignInCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotSignInCard);
