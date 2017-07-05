// React imports
import React, { Component } from 'react';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

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

/**
 * @class PsBot
 * @extends Component
 * @description pS Bot Component which renders the bot as a web client
 */
class PsBot extends Component {
    constructor(props) {
        super(props);

        // Needed for onTouchTap
        injectTapEventPlugin();

        const directLineBaseUrl = "https://directline.botframework.com/v3/directline";
        this.state = {
            conversationId: ''
        };

        this.initConversation(directLineBaseUrl);
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

        let headers = new Headers();
        headers.append('Authorization', 'Bearer 052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4');

        let request = new Request(directLineBaseUrl + '/conversations',
            {method: 'POST', headers: headers, body: JSON.stringify(conversationObj)});

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
     * @method getBotConversations()
     * @methodOf PsBot#getBotConversations
     * @description Gets the bot responses for a conversation from user
     */
    getBotConversations() {
        fetch('./PsBot.json')
            .then(function(response) {
                return response.json();
            }).then(function(json) {
            console.log('Parsed JSON ', json);
        }).catch(function(ex) {
            console.log('Parsing failed ', ex);
        });
    }

    render() {
        return (
            <div style={psBotStyle}>
                Bot initialized for conversation id {this.state.conversationId}
                <List>
                    <ListItem
                        leftAvatar={<Avatar src="images/ok-128.jpg" />}
                        primaryText="Message"
                        secondaryText={
                            <p>
                                Test User Message
                            </p>
                        }
                        secondaryTextLines={2}
                    />
                    <Divider inset={true} />
                </List>
            </div>
        );
    }
}

export default PsBot;
