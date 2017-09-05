// React imports
import React, {Component} from 'react';

// Material UI imports
import Paper from 'material-ui/Paper';
import {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import isURL from 'validator/lib/isURL';

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
    },
    psTextColor: {
        fontFamily: 'Lato, sans-serif',
        color: '#9B9B9B',
    },
    buttonTop: {
        bottom: '8px',
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

        if (this.isURL(buttonValue)) {
            window.open(buttonValue);
        } else {
            this.props.action(buttonValue);
        }
    };

    render() {
        return ( <div>
            {((this.props.title) ? <CardContent className={this.classes.leftAlignedText}> {
                (this.props.title) ? (
                    <Typography type="headline" component="h2" className={this.classes.psTextColor}>
                        {this.props.title}
                    </Typography>
                ) : '' }
                { (this.props.text) ? (
                    <Typography className={this.classes.psTextColor}>
                        {this.props.text}
                    </Typography> ) : '' }
            </CardContent> : '') }
            {((this.props.title || this.props.text) && this.props.buttons) ? (
                    this.props.buttons.map((button, buttonId) => {
                        return <Paper className={[this.classes.nextLine, this.classes.buttonTop, this.classes.paperBotConversation].join(' ')} key={buttonId}
                                    onClick={() => this.pSBotButtonClick(button)}>
                                            <div className={this.classes.conversationText}>
                                                <p>
                                                    {button.title}
                                                </p>
                                            </div>
                                        </Paper>
                    })
            ) : ''}
        </div> );
    }
}

PsBotCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCard);
