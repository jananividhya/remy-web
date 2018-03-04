// React imports
import React, {Component} from 'react';

// Material UI imports
import {FormattedTime} from 'react-intl';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsBotConversationTime', theme => ({
    psBotResponseTime: {
        float: 'left',
        textAlign: 'left',
        overflow: 'hidden',
        clear: 'both',
        fontSize: '10px',
        fontWeight: 'lighter',
        paddingTop: '5px',
    },
}));

/**
 * @class PsBotConversationTime
 * @extends Component
 * @description pS Bot Conversation Time
 */
class PsBotConversationTime extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return ( <Grid item xs={12} sm={12} className={this.classes.psBotResponseTime}><FormattedTime value={this.props.time} format="" /></Grid> );
    }
}

PsBotConversationTime.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotConversationTime);
