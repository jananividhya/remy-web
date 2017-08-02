// React imports
import React, {Component} from 'react';

// Material UI imports
import Button from 'material-ui/Button';
import {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import isURL from 'validator/lib/isURL';

const styleSheet = createStyleSheet('PsBotCard', theme => ({
    buttonResponse: {
        background: 'rgba(150, 101, 171, 0.87)',
        boxShadow: '0px 0px',
        color: '#FFFFFF',
        fontFamily: 'Lato, sans-serif !important',
        minWidth: '120px',
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
    buttonTop: {},
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
     * @methodOf PsBot#isURL
     * @description Checks if a given string is an url or not
     * @param str
     * @returns {boolean}
     */
    isURL = (str) => {
        return isURL(str);
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBot#pSBotButtonClick
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
            {(this.props.buttons) ? (
                <CardActions className={[this.classes.nextLine, this.classes.buttonTop].join(' ')}>
                    {this.props.buttons.map((button, buttonId) => {
                        return <Button key={buttonId} raised
                                       className={this.classes.buttonResponse}
                                       onTouchTap={() => this.pSBotButtonClick(button)}>{(button.title.length > 10) ?
                            (button.title.substring(0, 8) + '..')
                            : button.title}</Button>
                    })
                    }
                </CardActions>
            ) : ''}
        </div> );
    }
}

PsBotCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotCard);
