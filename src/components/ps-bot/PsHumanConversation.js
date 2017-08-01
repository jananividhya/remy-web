// React imports
import React, {Component} from 'react';

// Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

const styleSheet = createStyleSheet('PsHumanConversation', theme => ({
    paperHumanConversation: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'left',
        textAlign: 'left',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
    },
    conversationText: {
        marginTop: '-8px',
        marginBottom: '-8px',
    },
}));

/**
 * @class PsHumanConversation
 * @extends Component
 * @description pS Human Conversation Component which renders the human conversation to the client
 */
class PsHumanConversation extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    render() {
        return ( <Grid item xs={12} sm={12}>
            <Paper className={this.classes.paperHumanConversation}>
                <div className={this.classes.conversationText}>
                    <p>
                        {this.props.conversationText}
                    </p>
                </div>
            </Paper>
        </Grid> );
    }
}

PsHumanConversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsHumanConversation);
