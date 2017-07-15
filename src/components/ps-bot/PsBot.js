// React imports
import React, { Component } from 'react';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// Common imports
import 'whatwg-fetch';

// App imports
import './PsBot.css';

const styleSheet = createStyleSheet('PsBot', theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperHumanConversation: {
        background: '#FFFFFF',
        border: '1px solid #D2D1D2',
        borderRadius: '3px',
        float: 'right',
        textAlign: 'right',
        lineHeight: '20px',
        width: '240px',
        /** Remove after confirmation **/
        paddingRight: '10px',
        paddingLeft: '10px'
    },
    paperBotConversation: {
        background: '#FFFFFF',
        border: '1px solid #D2D1D2',
        borderRadius: '3px',
        float: 'left',
        textAlign: 'left',
        lineHeight: '20px',
        width: '240px',
        /** Remove after confirmation **/
        paddingRight: '10px',
        paddingLeft: '10px'
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card: {
        maxWidth: 345,
    },
}));

const psBotStyle = {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
};

/**
 * @todo make the class modular
 * @class PsBot
 * @extends Component
 * @description pS Bot Component which renders the bot as a web client
 */
class PsBot extends Component {
    /**
     * @todo move directLineBaseUrl to config file
     * @type {string}
     */
    directLineBaseUrl = "https://directline.botframework.com/v3/directline";
    headers;

    constructor(props) {
        super(props);

        this.classes = props.classes;

        // Needed for onTouchTap
        injectTapEventPlugin();

        /**
         * @type {{conversationId: string, conversationText: string, conversations: Array, conversationHistory: Array, conversationInputText: string}}
         */
        this.state = {
            conversationId: '',
            conversationText: '',
            conversations: [],
            conversationHistory: [],
            conversationInputText: this.props.conversationInputText || 'Begin your conversation here..'
        };

        /**
         * @todo move headers to config file
         * @type {*}
         */
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.props.accessSecret);
        this.headers.append('Content-Type', 'application/json');

        this.initConversation(this.directLineBaseUrl);
    }

    /**
     * @method initConversation
     * @methodOf PsBot#initConversation
     * @description Gets and sets the conversation id to be used across the bot component
     * @param directLineBaseUrl Base URL of the DirectLine API of MSFT Bot
     */
    initConversation = (directLineBaseUrl) => {
        const conversationObj = {
            "conversationId": "ba3e635e-e990-4594-b4c7-5b0e1dd3329e",
            "eTag": ""
        };

        let request = new Request(directLineBaseUrl + '/conversations',
            {method: 'POST', headers: this.headers, body: JSON.stringify(conversationObj)});

        fetch(request)
            .then((response) => {
                return response.json();
            }).then((json) => {
                let stateObj = {
                    conversationId: json.conversationId
                };

                this.setState(stateObj);
            }).catch((ex) => {
                console.log('Exception Occurred while parsing json ', ex);
            });
    };


    /**
     * @method sendConversationToBot()
     * @methodOf PsBot#sendConversationToBot
     * @param {String} conversationText Conversation being sent to bot
     * @description Sends the user conversation to pS Bot
     */
    sendConversationToBot = (conversationText) => {
        let conversation = {
            "type": "message",
            "text": this.state.conversationText || conversationText,
            "from": {
                "id": "default-user",
                "name": "User"
            },
            "locale": "en-US",
            "textFormat": "plain",
            "timestamp": new Date(),
            "channelData": {
                "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
            },
            "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
        };

        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'POST', headers: this.headers, body: JSON.stringify(conversation)});

        let conversations = this.state.conversations;
        conversations.push(conversation);

        fetch(request)
            .then((response) => {
                return response.json();
            }).then((json) => {
            this.setState({
                conversationId: this.state.conversationId,
                conversationText: '',
                conversations: conversations,
                conversationHistory: this.state.conversationHistory,
                conversationInputText: this.state.conversationInputText
            });

            let fetchBotConversationsTimer = setInterval(() => this.fetchBotConversations(fetchBotConversationsTimer), 5000);
        }).catch((ex) => {
            console.log('Parsing failed while sending conversation to bot ', ex);
        });
    };

    /**
     * @method fetchBotConversations
     * @methodOf PsBot#fetchBotConversations
     * @description Fetches the bot conversations based on the provided timer value
     * clears the timer when there are no more conversations to fetch from a batch.
     * @param fetchBotConversationsTimer
     */
    fetchBotConversations = (fetchBotConversationsTimer) => {
        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'GET', headers: this.headers});

        fetch(request)
            .then((response) => {
                return response.json();
            }).then((json) => {
            for (let newConversation of json.activities) {
                if (newConversation.from.name !== 'User' && this.state.conversationHistory.indexOf(newConversation.id) < 0) {
                    let conversationHistory = this.state.conversationHistory;
                    conversationHistory.push(newConversation.id);

                    let conversations = this.state.conversations;
                    conversations.push(newConversation);

                    this.setState({
                        conversationId: this.state.conversationId,
                        conversationText: '',
                        conversations: conversations,
                        conversationHistory: conversationHistory,
                        conversationInputText: this.state.conversationInputText
                    });
                } else {
                    clearInterval(fetchBotConversationsTimer);
                }
            }
        }).catch((ex) => {

        });
    };

    /**
     * @method setConversation
     * @methodOf PsBot#setConversation
     * @description Sets the conversation state
     * @param event
     */
    setConversation = (event) => {
        this.setState({
            conversationId: this.state.conversationId,
            conversationText: event.target.value,
            conversations: this.state.conversations,
            conversationInputText: 'Conversation here..'
        });
    };

    /**
     * @method isURL
     * @methodOf PsBot#isURL
     * @description Checks if a given string is an url or not
     * Need to replace this with `validator` npm module to validate url's and email's
     * @param str
     * @returns {boolean}
     */
    isURL = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBot#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param button Button object passed from onClick
     */
    pSBotButtonClick = (button) => {
        const buttonValue = button.value;

        if (this.isURL(buttonValue)) {
            window.open(buttonValue);
        } else {
            this.sendConversationToBot(buttonValue);
        }
    };

    render() {
        return ( <div>
            <div className={this.classes.root} style={psBotStyle}>
                <Grid container gutter={24}>
                    <Grid item xs={12}>
                        <Paper className={this.classes.paper}>Bot initialized for conversation id {this.state.conversationId}</Paper>
                    </Grid>

                        {this.state.conversations.map((conversation, id) => {
                            return (conversation.from.name !== 'User' ? (
                                    <Grid item xs={12} sm={12} key={id}>
                                        <Paper className={this.classes.paperBotConversation}>
                                            <div>
                                                {
                                                    !conversation.attachments ? (
                                                        <p>
                                                            {conversation.text}
                                                        </p> ) :
                                                        ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                            <div>
                                                                {conversation.text}
                                                                <Card className={this.classes.card}>
                                                                    <CardContent> {
                                                                        (conversation.attachments[0].content.title) ? (
                                                                            <Typography type="headline" component="h2">
                                                                                {conversation.attachments[0].content.title}
                                                                            </Typography>
                                                                        ) : '' }
                                                                        { (conversation.attachments[0].content.text) ? (
                                                                            <Typography component="p">
                                                                                {conversation.attachments[0].content.text}
                                                                            </Typography> ) : '' }
                                                                    </CardContent>
                                                                    <CardActions>
                                                                        {conversation.attachments[0].content.buttons.map((button, buttonId) => {
                                                                            return <Button raised className={this.classes.button} key={buttonId}
                                                                                           onTouchTap={() => this.pSBotButtonClick(button)} >{button.title}</Button>

                                                                        })
                                                                        }
                                                                    </CardActions>
                                                                </Card>
                                                            </div>) : '')
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>)
                                    :
                                    <Grid item xs={12} sm={12} key={id}>
                                        <Paper className={this.classes.paperHumanConversation}>
                                            <div>
                                                {
                                                    !conversation.attachments ? (
                                                        <p>
                                                            {conversation.text}
                                                        </p> ) :
                                                        ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                            // Handle card response from bot
                                                            <div>
                                                                {conversation.text}
                                                                <Card className={this.classes.card}>
                                                                    <CardContent> {
                                                                        (conversation.attachments[0].content.title) ? (
                                                                            <Typography type="headline" component="h2">
                                                                                {conversation.attachments[0].content.title}
                                                                            </Typography>
                                                                        ) : '' }
                                                                        { (conversation.attachments[0].content.text) ? (
                                                                            <Typography component="p">
                                                                                {conversation.attachments[0].content.text}
                                                                            </Typography> ) : '' }
                                                                    </CardContent>
                                                                    <CardActions>
                                                                        {conversation.attachments[0].content.buttons.map((button, buttonId) => {
                                                                            return <Button raised className={this.classes.button} key={buttonId}
                                                                                           onTouchTap={() => this.pSBotButtonClick(button)} >{button.title}</Button>

                                                                        })
                                                                        }
                                                                    </CardActions>
                                                                </Card>
                                                            </div>) : '')
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>
                                    )
                        })}
                    <Grid item xs={12} sm={12} md={12}>
                        <div className="Ps-Bot-Conversation-Input-Container">
                            <form>
                                <TextField
                                    id="human-input"
                                    label={this.state.conversationInputText}
                                    className={this.classes.input}
                                    value={this.state.conversationText}
                                    onChange={this.setConversation}
                                />
                                <Button fab color="primary" className={this.classes.button} onClick={this.sendConversationToBot}>
                                    <SendIcon />
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        );
    }
}

PsBot.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBot);
