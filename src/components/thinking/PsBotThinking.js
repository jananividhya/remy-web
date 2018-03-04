// React imports
import React, {Component} from 'react';

// Material UI imports
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotThinking', theme => ({
    emojis: {
        width: '55px',
        height: '36px',
        marginTop: '-8px',
        marginLeft: '30px',
    },
}));

/**
 * @class PsBotThinking
 * @extends Component
 * @description pS Bot Thinking Component which renders the thinking emoji in the bot client
 */
class PsBotThinking extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return ( <p><img src={this.props.thinkingImg} alt="thinking aloud.." className={this.classes.emojis} /></p> );
    }
}

PsBotThinking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotThinking);
