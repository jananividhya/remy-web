// React imports
import React, {Component} from 'react';

// Material UI imports
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import PropTypes from 'prop-types';
import AccountIcon from 'material-ui-icons/AccountCircle';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import '../ps-bot/styles/remy-style-transitions.css';

// App imports
import PsMarkdown from '../markdown/PsMarkdown';
import SlashCommand from '../ps-bot/PsSlashCommand';

const styleSheet = createStyleSheet('PsHumanConversation', theme => ({
    paperHumanConversation: {
        color: '#FFFFFF',
        border: '0px',
        borderRadius: '15px 0px 15px 15px',
        fontSize: '14px',
        float: 'right',
        textAlign: 'right',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        marginBottom: '12px',
    },
    paperHumanCommand: {
        boxShadow: '0px 0px',
        border: '0px',
        borderRadius: '0px 15px 15px 15px',
        fontSize: '14px',
        float: 'right',
        textAlign: 'right',
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
        const userAvatar = (this.props.user) ? (this.props.user.name ? this.props.user.name.charAt(0) : <AccountIcon/>) : <AccountIcon/>;
        
        return (
            <div>
                <div style={{
                    float:  'right',
                    paddingLeft: '7px'
                }}>
                    {this.props.user.imageUrl &&<Avatar src={this.props.user.imageUrl} className={this.classes.avatar}></Avatar>}
                    {!this.props.user.imageUrl &&<Avatar className={this.classes.avatar}>{userAvatar}</Avatar>}
                </div>
                <Paper className={[this.classes.paperHumanConversation, "slideInFromRight"].join(" ")}
                        style={{
                            backgroundColor: (theme) ? theme.background : 'rgba(150, 101, 171, 0.87)',
                            color: (theme) ? theme.color : '#FFFFFF',
                            fontSize: (theme) ? theme.fontSize : '14px',
                            fontFamily: (theme) ? theme.fontFamily + ' !important' : 'Lato, sans-serif',
                            transition: 'all 0.75s ease-in',
                        }}
                >
                    <div className={this.classes.conversationText}>
                        {(isSlashCommand) ? (<SlashCommand commandText={conversationText} />)
                            : (<PsMarkdown text={conversationText} />)}
                    </div>
                </Paper>
            </div>
        );
    }
}

PsHumanConversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsHumanConversation);
