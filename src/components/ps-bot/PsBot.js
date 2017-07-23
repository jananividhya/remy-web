// React imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import {CardActions, CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// Common imports
import 'whatwg-fetch';
import isURL from 'validator/lib/isURL';

// App imports
import './PsBot.css';

const styleSheet = createStyleSheet('PsBot', theme => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Lato, sans-serif',
        fontSize: '14px',
        color: '#9B9B9B',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 100,
    },
    paper: {
        padding: 16,
        textAlign: 'center',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        color: theme.palette.text.secondary,
    },
    paperBotConversation: {
        background: '#FFFFFF',
        color: '#9B9B9B',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '35px',
        fontSize: '14px',
        float: 'right',
        textAlign: 'right',
        lineHeight: '20px',
        /** Remove after confirmation **/
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-40%)',
        maxWidth: '450px',
    },
    paperHumanConversation: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '35px',
        fontSize: '14px',
        float: 'left',
        textAlign: 'left',
        lineHeight: '20px',
        letterSpacing: '0px',
        /** Remove after confirmation **/
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-40%)',
    },
    buttonResponse: {
        background: 'rgba(150, 101, 171, 0.87)',
        boxShadow: '0px 0px',
        color: '#FFFFFF',
        fontFamily: 'Lato, sans-serif !important',
        minWidth: '120px',
    },
    psConversationButton: {
        margin: theme.spacing.unit,
        background: 'rgba(150, 101, 171, 0.87)',
    },
    nextLine: {
        wordWrap: 'break-word',
        clear: 'both',
        position: 'relative',
        overflowY: 'scroll',
    },
    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 515
    },
    card: {
        maxWidth: 345,
    },
    responseImage: {
        height: '240px',
        width: '240px'
    },
    emojis: {
        width: '36px',
        height: '36px'
    },
    leftAlignedText: {
        float: 'left !important',
        textAlign: 'left !important'
    },
    psTextColor: {
        fontFamily: 'Lato, sans-serif',
        color: '#9B9B9B',
    },
    psBotThinking: {
        background: '#FFFFFF',
        float: 'right',
        position: 'relative',
        transform: 'translateY(-40%)',
        boxShadow: '0px 0px',
    },
}));

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
     * @override
     * @method componentDidUpdate
     * @methodOf Component
     */
    componentDidUpdate = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        if (node) {
            node.scrollIntoView({ behavior: "smooth" });
        }
    };

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
     * @param {Object} event Form Submit Event
     * @param {String} conversationText Conversation being sent to bot
     * @description Sends the user conversation to pS Bot
     */
    sendConversationToBot = (event, conversationText) => {
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

            conversations.push({
                "type": "message",
                "text": "Thinking...",
                "from": {
                    "id": "ps-public-bot",
                    "name": "bot"
                },
                "locale": "en-US",
                "textFormat": "plain",
                "contentType": "typing",
                "img": "thinking.gif",
                "timestamp": new Date(),
                "channelData": {
                    "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
                },
                "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
            });

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

        if (event) event.preventDefault();
    };

    /**
     * @method fetchBotConversations
     * @methodOf PsBot#fetchBotConversations
     * @description Fetches the bot conversations based on the provided timer value
     * clears the timer when there are no more conversations to fetch from a batch.
     * @param fetchBotConversationsTimer
     */
    fetchBotConversations = (fetchBotConversationsTimer) => {
        let conversations = this.state.conversations;

        // Remove thinking before pushing the content
        conversations.splice(-1, 1);

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
            conversationInputText: 'Say Something'
        });
    };

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
            this.sendConversationToBot(null, buttonValue);
        }
    };

    render() {
        return ( <div>
                <div className={this.classes.root}>
                    <Grid container gutter={24}>
                        {/*Enable only in development*/}
                        {/*<Grid item xs={12}>
                            <Paper className={this.classes.paper}>Bot initialized for conversation
                                id {this.state.conversationId}</Paper>
                        </Grid>*/}

                        {this.state.conversations.map((conversation, id) => {
                            return (conversation.from.name !== 'User' ? (
                                    <Grid item xs={12} sm={12} key={id} ref={(el) => { this.messagesEnd = el; }}>
                                        <Paper className={(conversation.contentType === 'typing') ? this.classes.psBotThinking : this.classes.paperBotConversation}>
                                            <div>
                                                {
                                                    !conversation.attachments ? (
                                                    (conversation.contentType === 'typing') ?
                                                        (
                                                            <p><img src={conversation.img} alt="thinking aloud.." className={this.classes.emojis} /></p>
                                                        )
                                                        : (
                                                        <p>
                                                            {conversation.text}
                                                        </p> )) :
                                                        ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                            <p>
                                                                <CardContent className={this.classes.leftAlignedText}> {
                                                                    (conversation.attachments[0].content.title) ? (
                                                                        <Typography type="headline" component="h2" className={this.classes.psTextColor}>
                                                                            {conversation.attachments[0].content.title}
                                                                        </Typography>
                                                                    ) : conversation.text }
                                                                    { (conversation.attachments[0].content.text) ? (
                                                                        <Typography className={this.classes.psTextColor}>
                                                                            {conversation.attachments[0].content.text}
                                                                        </Typography> ) : '' }
                                                                </CardContent>
                                                                <CardActions className={this.classes.nextLine}>
                                                                    {conversation.attachments[0].content.buttons.map((button, buttonId) => {
                                                                        return <div key={buttonId}>
                                                                            <Button raised
                                                                                    className={this.classes.buttonResponse}
                                                                                    onTouchTap={() => this.pSBotButtonClick(button)}>{(button.title.length > 10) ?
                                                                                (button.title.substring(0, 8) + '..')
                                                                                : button.title}</Button>
                                                                            </div>

                                                                    })
                                                                    }
                                                                </CardActions>
                                                            </p>) : ((conversation.attachments && conversation.attachments[0].contentType === 'image/png') ? (
                                                            <p>
                                                                <CardMedia>
                                                                    <img src={conversation.attachments && conversation.attachments[0].contentUrl} alt="" className={this.classes.responseImage} />
                                                                </CardMedia>
                                                            </p>
                                                        ) : conversation.text))
                                                }
                                            </div>
                                        </Paper>
                                    </Grid>)
                                    :
                                    <Grid item xs={12} sm={12} key={id}>
                                        <Paper className={this.classes.paperHumanConversation}>
                                            <p>
                                                {conversation.text}
                                            </p>
                                        </Paper>
                                    </Grid>
                            )
                        })}
                    </Grid>
                </div>
                <div>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12}>
                            <div className="Ps-Bot-Conversation-Input-Container">
                                <form onSubmit={this.sendConversationToBot}>
                                    <TextField
                                        id="human-input"
                                        label={this.state.conversationInputText}
                                        className={this.classes.input}
                                        value={this.state.conversationText}
                                        onChange={this.setConversation}
                                    />
                                    <Button fab color="primary" className={this.classes.psConversationButton} type="submit">
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
