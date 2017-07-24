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
import './PsCard.css';

const psBotStyle = {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
};

/**
 * @class PsCard
 * @extends Component
 * @description pS Card Component which renders the card
 */
class PsCard extends Component {

    constructor(props) {
        super(props);

        // Needed for onTouchTap
        injectTapEventPlugin();

        this.state = {
            content: []
        };
    }

    render() {
        return (
            <div>
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

export default PsCard;
