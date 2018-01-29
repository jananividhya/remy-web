// React imports
import React, {Component} from 'react';

// Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import './styles/remy-style-transitions.css';

// App imports
import SlashCommand from './PsSlashCommand';

const styleSheet = createStyleSheet('PsHumanConversation', theme => ({
    paperHumanConversation: {
        color: '#FFFFFF',
        border: '0px',
        borderRadius: '0px 15px 15px 15px',
        fontSize: '14px',
        float: 'left',
        textAlign: 'left',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
    },
    paperHumanCommand: {
        boxShadow: '0px 0px',
        border: '0px',
        borderRadius: '0px 15px 15px 15px',
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
    commandHighlight: {
        fontFamily: 'monospace',
        color: '#550000',
        backgroundColor: '#FFAAAA',
    },
    avatar: {
        height: '24px',
        width: '24px',
    }
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
        this.state = {
            hover: false,
            theme: props.theme,
        };
    }

    render() {

        let conversationText = this.props.conversationText;
        let isSlashCommand = false;

        if (conversationText && conversationText.charAt(0) === '/') {
            isSlashCommand = true;
        }

        const theme = (this.state.theme) ? this.state.theme : null;

        return (
            <div>
                <Grid item xs={6} sm={6}>
                    {this.props.user.imageUrl &&<Avatar src={this.props.user.imageUrl} className={this.classes.avatar}></Avatar>}
                    {!this.props.user.imageUrl &&<Avatar className={this.classes.avatar}>{this.props.user.name.charAt(0)}</Avatar>}
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={[this.classes.paperHumanConversation, "slideInFromLeft"].join(" ")}
                            style={{
                                backgroundColor: (theme) ? theme.background : 'rgba(150, 101, 171, 0.87)',
                                color: (theme) ? theme.color : '#FFFFFF',
                                fontSize: (theme) ? theme.fontSize : '14px',
                                fontFamily: (theme) ? theme.fontFamily + ' !important' : 'Lato, sans-serif',
                                transition: 'all 0.75s ease-in',
                                marginTop: '-22px',
                                marginLeft: '30px'
                            }}
                    >
                        <div className={this.classes.conversationText}>
                            <p>
                                {(isSlashCommand) ? (<SlashCommand commandText={conversationText} />)
                                    : conversationText}
                            </p>
                        </div>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

PsHumanConversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsHumanConversation);
