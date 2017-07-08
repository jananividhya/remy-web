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
            conversationInputText: 'Begin your conversation here..'
        };

        /**
         * @todo move headers to config file
         * @type {*}
         */
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer 052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4');
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
     * @description Sends the user conversation to pS Bot
     */
    sendConversationToBot = () => {
        let conversation = {
            "type": "message",
            "text": this.state.conversationText,
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
                conversationInputText: this.state.conversationInputText
            });

            setInterval(this.fetchBotConversations, 5000);
        }).catch((ex) => {
            console.log('Parsing failed while sending conversation to bot ', ex);
        });
    };

    fetchBotConversations = () => {
        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'GET', headers: this.headers});

        let conversations = this.state.conversations;

        fetch(request)
            .then((response) => {
                return response.json();
            }).then((json) => {
            //json.filter
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
                                <p>
                                    {conversation.text}
                                </p>
                            }
                            leftAvatar={<Avatar src="images/ok-128.jpg" />}
                            secondaryTextLines={1}
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
