// React imports
import React, {Component} from 'react';

// Material UI imports
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';

import {Motion, spring} from 'react-motion';

// App imports
import SlashCommand from './PsSlashCommand';
import isURL from 'validator/lib/isURL';

const styleSheet = createStyleSheet('PsHumanConversation', theme => ({
    paperHumanConversation: {
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
    paperHumanCommand: {
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
    commandHighlight: {
        fontFamily: 'monospace',
        color: '#550000',
        backgroundColor: '#FFAAAA',
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
        this.state = {
            hover: false,
            theme: props.theme,
        };
    }

    fetchUrLMetadata = async (url) => {
        const urlDetails = await fetch(url, {
            mode: 'no-cors'
        });
        return await urlDetails.text();
    };

    getUrlDetails = async (url) => {
        return await this.fetchUrLMetadata(url);
    };

    componentDidMount = () => {
        if(isURL(this.props.conversationText)) {
            this.getUrlDetails(this.props.conversationText).then(function (response) {
                console.log(response);
            });
        }
    };

    render() {

        let conversationText = this.props.conversationText;
        let isSlashCommand = false;

        if (conversationText && conversationText.charAt(0) === '/') {
            isSlashCommand = true;
        }

        const theme = (this.state.theme) ? this.state.theme : null;

        return (
            <Motion style={{x: spring(400)}}> 
            {
                (x) => {
                    return (
                        <Grid item xs={12} sm={12} style={{
                            transform: "scale(" + x + ")"
                        }}>
                            <Paper className={(!isSlashCommand) ? this.classes.paperHumanConversation
                                : this.classes.paperHumanCommand}
                                style={{
                                    backgroundColor: (theme) ? theme.background : 'rgba(150, 101, 171, 0.87)'
                                }}>
                                <div className={this.classes.conversationText}>            
                                    <p>
                                        {(isSlashCommand) ? (<SlashCommand commandText={conversationText} />)
                                            : conversationText}
                                    </p>
                                </div>
                            </Paper>
                        </Grid>
                    );
                }
            }
            </Motion>);
    }
}

PsHumanConversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsHumanConversation);
