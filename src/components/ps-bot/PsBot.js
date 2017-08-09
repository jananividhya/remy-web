// React imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// Common imports
import 'whatwg-fetch';

// App imports
import './PsBot.css';
import PsBotNavbar from './PsBotNavbar';
import PsBotThinking from './PsBotThinking';
import PsHumanConversation from './PsHumanConversation';
import PsBotCard from './PsBotCard';
import PsBotCardImage from './PsBotCardImage';
import PsBotConversationTime from './PsBotConversationTime';

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
        height: 330,
    },
    conversationInput: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '12px',
        color: '#9B9B9B',
    },
    conversationContainer: {
        marginTop: 80,
        marginBottom: 60,
    },
    paperBotConversation: {
        background: '#FFFFFF',
        color: '#9B9B9B',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'right',
        textAlign: 'right',
        /** Remove after confirmation **/
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        maxWidth: '450px',
    },
    psConversationButton: {
        margin: theme.spacing.unit,
        background: 'rgba(150, 101, 171, 0.87)',
    },
    input: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 515,
        fontFamily: 'Lato, sans-serif',
        fontSize: '15px',
    },
    card: {
        maxWidth: 345,
    },
    psBotThinking: {
        background: '#FFFFFF',
        float: 'right',
        position: 'relative',
        maxWidth: '350px',
        boxShadow: '0px 0px',
    },
    conversationText: {
        marginTop: '-8px',
        marginBottom: '-8px',
    },
    responseSuggestions: {
        marginBottom: 30,
    },
    responseSuggestionButton: {
        borderRadius: '60px',
        height: '10px',
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
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
            conversationInputText: this.props.conversationInputText || 'Begin your conversation here..',
            responseSuggestions: [],
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
        this.setState({
            responseSuggestions: [],
        });

        let conversation = {
            "type": "message",
            "text": this.state.conversationText || conversationText,
            "from": {
                "id": "default-user",
                "name": "User"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
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
                conversationInputText: this.state.conversationInputText,
                responseSuggestions: this.state.responseSuggestions,
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
                "localTimestamp": Date.now(),
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
                conversationInputText: this.state.conversationInputText,
                responseSuggestions: this.state.responseSuggestions
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
                    let conversations = this.state.conversations;

                    if (newConversation.attachments && newConversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero' && newConversation.text) {
                        conversationHistory.push(newConversation.id);

                        const textConversation = Object.assign({}, newConversation);
                        delete textConversation.attachments;
                        conversations.push(textConversation);

                        if (newConversation.attachments[0].content.buttons) {
                            let responseSuggestions = newConversation.attachments[0].content.buttons;
                            this.setState({
                                responseSuggestions: responseSuggestions,
                            });
                        }

                        this.setState({
                            conversationId: this.state.conversationId,
                            conversationText: '',
                            conversations: conversations,
                            conversationHistory: conversationHistory,
                            conversationInputText: this.state.conversationInputText,
                            responseSuggestions: this.state.responseSuggestions,
                        });
                    }

                    conversationHistory = this.state.conversationHistory;
                    conversationHistory.push(newConversation.id);

                    conversations = this.state.conversations;
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
            conversationInputText: 'Say Something..',
            conversationHistory: this.state.conversationHistory,
            responseSuggestions: this.state.responseSuggestions,
        });
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBot#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} buttonValue Button Click Event
     */
    pSBotButtonClick = (buttonValue) => {
        this.sendConversationToBot(null, buttonValue);
    };

    pSBotSuggestionResponseClick = (button) => {
        const buttonValue = button.value;
        this.pSBotButtonClick(buttonValue);
    };

    render() {

        let responseSuggestions = [];

        if (this.state.responseSuggestions) {
            responseSuggestions = this.state.responseSuggestions;
        } else {
            responseSuggestions = [];
        }

        return ( <div>
                <div className={this.classes.root}>
                    <PsBotNavbar />
                    <Grid container gutter={8} className={this.classes.conversationContainer}>
                        {this.state.conversations.map((conversation, id) => {
                            return (conversation.from.name !== 'User' ?
                                    (<Grid item xs={12} sm={12} key={id} ref={(el) => { this.messagesEnd = el; }}>
                                        <Paper className={(conversation.contentType === 'typing') ? this.classes.psBotThinking : ((conversation.attachments && conversation.attachments[0].content && !conversation.attachments[0].content.title && conversation.attachments[0].content.buttons) ? this.classes.psBotThinking :this.classes.paperBotConversation)}>
                                            <div className={this.classes.conversationText}>
                                                {
                                                    !conversation.attachments ? (
                                                    (conversation.contentType === 'typing') ?
                                                        (
                                                            <PsBotThinking thinkingImg={conversation.img} />
                                                        )
                                                        : (
                                                        <p>
                                                            {conversation.text}
                                                        </p> )) :
                                                        ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                            <PsBotCard title={conversation.attachments[0].content.title}
                                                                       text={conversation.attachments[0].content.text}
                                                                       buttons={conversation.attachments[0].content.buttons}
                                                                       action={this.pSBotButtonClick} />) : ((conversation.attachments && conversation.attachments[0].contentType === 'image/png') ? (
                                                            <PsBotCardImage imageUrl={conversation.attachments[0].contentUrl} />
                                                        ) : conversation.text))
                                                }
                                            </div>
                                        </Paper>
                                            {(this.state.conversations.length === id + 1) ?
                                                <PsBotConversationTime time={conversation.localTimestamp} /> : ''}
                                    </Grid>
                                  )
                                    :
                                    (<PsHumanConversation conversationText={conversation.text} key={id} />)
                            )
                        })}
                    </Grid>
                    <Grid container className={this.classes.conversationInput}>
                        {responseSuggestions.map((suggestion, id) => {
                            return (<CardActions key={id} className={this.classes.responseSuggestions}>
                                    <Button key={id} raised className={this.classes.responseSuggestionButton}
                                       onTouchTap={() => this.pSBotSuggestionResponseClick(suggestion)}>
                                       {suggestion.title}
                                    </Button>
                                </CardActions>)
                        })}
                        <Grid item xs={12} sm={12} md={12}>
                            <div className="Ps-Bot-Conversation-Input-Container">
                                <form onSubmit={this.sendConversationToBot} autoComplete="off">
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
