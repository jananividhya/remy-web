// React imports
import React, { Component } from 'react';

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

class PsBot extends Component {
    constructor(props) {
        super(props);

        const directLineBaseUrl = "https://directline.botframework.com/v3/directline";
        this.state = {
            conversationId: ''
        };

        this.initConversation(directLineBaseUrl);
    }

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
                console.log('Conversation Id ', json.conversationId);
                let stateObj = {
                    conversationId: json.conversationId
                };

                this.setState(stateObj);
            }).catch((ex) => {
                console.log('Exception Occurred while parsing json ', ex);
            });
    };

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
            <div style={psBotStyle}> Bot initialized for conversation id {this.state.conversationId}</div>
        );
    }
}

export default PsBot;
