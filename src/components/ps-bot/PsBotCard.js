// React imports
import React, {Component} from 'react';

// Material UI imports
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import {CardActions, CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import isURL from 'validator/lib/isURL';

// Style Imports
import PsBotCardStyle from './styles/PsBotCardStyle';
import './PsBotButton.css';

const styleSheet = createStyleSheet('PsBotCard', theme => (PsBotCardStyle));

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
                <CardActions className={[this.classes.nextLine, this.classes.buttonTop].join(' ')}>
                    {this.props.buttons.map((button, buttonId) => {
                        return <Paper className={this.classes.paperBotConversation} key={buttonId}
                                    onClick={() => this.pSBotButtonClick(button)}>
                                            <div className={this.classes.conversationText}>
                                                <p>
                                                    {button.title}
                                                </p>
                                            </div>
                                        </Paper>
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
