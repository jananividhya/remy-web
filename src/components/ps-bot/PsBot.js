// React imports
import React, { Component } from 'react';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import FlatButton from 'material-ui/FlatButton';

// Common imports
import 'whatwg-fetch';

// App imports
import './PsBot.css';

const psBotStyle = {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
};

const psBotConversationInputStyle = {
    errorStyle: {
        color: orange500,
    },
    underlineStyle: {
        borderColor: orange500,
    },
    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    }
};

/**
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

        // Needed for onTouchTap
        injectTapEventPlugin();

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
        this.headers.append('Authorization', 'Bearer ' + this.props.accessKey);
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
     * @method pSBotButtonClick
     * @methodOf PsBot#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param event Event triggered onClick of pS Bot button
     */
    pSBotButtonClick = (event) => {
        // Using event.target.innerHTML is a pure hack.
        // Need to figure out an alternative for getting the value of FlatButton/RaisedButton
        this.sendConversationToBot(event.target.innerHTML);
    };

    render() {
        return (
            <div style={psBotStyle}>
                Bot initialized for conversation id {this.state.conversationId}
                <List>
                    {this.state.conversations.map((conversation, id) => {
                        return <ListItem key={id}
                            className={conversation.from.name === 'User' ? 'Ps-Bot-Conversation-Human' : 'Ps-Bot-Conversation-Bot'}
                            primaryText={conversation.from.name}
                            secondaryText={
                                !conversation.attachments ? (
                                    <p>
                                        {conversation.text}
                                    </p> ) :
                                    ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                    // Handle card response from bot
                                        <p>
                                            {conversation.text}
                                            {conversation.attachments[0].content.buttons.map((button, buttonId) => {
                                                    return <FlatButton key={buttonId}
                                                                       label={button.title}
                                                                       onTouchTap={this.pSBotButtonClick} />

                                               })
                                            }
                                        </p>) : '')
                            }
                            leftAvatar={<Avatar src="images/ok-128.jpg" />}
                            secondaryTextLines={conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero' ? 2 : 1}
                        />
                    })}
                </List>
                <div className="Ps-Bot-Conversation-Input-Container">
                    <form>
                        <TextField
                            floatingLabelText={this.state.conversationInputText}
                            floatingLabelStyle={psBotConversationInputStyle.floatingLabelStyle}
                            floatingLabelFocusStyle={psBotConversationInputStyle.floatingLabelFocusStyle}
                            value={this.state.conversationText}
                            onChange={this.setConversation}
                        />
                        <FloatingActionButton mini={true} onClick={this.sendConversationToBot}>
                            <ContentSend />
                        </FloatingActionButton>
                    </form>
                </div>
            </div>
        );
    }
}

export default PsBot;
