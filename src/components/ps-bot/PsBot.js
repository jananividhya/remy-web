// React imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { TransitionMotion, spring } from 'react-motion';
import {Emoji} from 'emoji-mart';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Autosuggest from 'react-autosuggest';

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
import AutoSuggestTheme from './AutoSuggestTheme.css'; // eslint-disable-line no-unused-vars
import PsBotCodeCard from './PsBotCodeCard';
import PsBotQuizCard from './PsBotQuizCard';
import PsBotCommandCard from './commands/PsBotCommandCard';
import SlashCommands from '../../config/PsBotSlashCommands';
import PsError from './PsErr';
import PsBotWallpapers from './PsBotWallpapers';

import HandleErrors from '../../util/HandleErrors';

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
        width: '98%',
    },
    conversationInput: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '12px',
        color: '#9B9B9B',
    },
    conversationContainer: {
        marginTop: 60,
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
        width: '100%',
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
        marginBottom: '20px',
        marginLeft: '4px',
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        fontFamily: 'Lato, sans-serif !important',
        cursor: 'pointer',
    },
    conversationOptions: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'center',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        width: '200px',
    },
    conversationGreeting: {
        color: 'purple',
        boxShadow: '0px 0px',
        fontSize: '20px',
        float: 'center',
        align: 'center',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        marginLeft: '-95px',
        width: '400px',
    },
}));

const commandSuggestions = [
    {
        key: '/hello',
        title: 'Say Hello to purpleBot - /hello',
        value: 'hello',
    },
    {
        key: '/learn',
        title: 'Learn with purpleBot - /learn',
        value: 'learn',
    },
    {
        key: '/aboutus',
        title: 'About Us - /aboutus',
        value: 'About us',
    },
    {
        key: '/quit',
        title: 'Talk to you later - /quit',
        value: 'quit',
    }
];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : commandSuggestions.filter(command =>
        command.key.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.value;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.title}
    </div>
);

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
            listMenu: [],
            anchorEl: undefined,
            menuOpen: false,
            commandSuggestionValue: '',
            commandSuggestions: [],
            noButtonCard: false,
            loadWallpaper: true,
            sendInputToServer: true,
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

    onSuggestionChange = (event, { newValue }) => {
        this.setState({
            commandSuggestionValue: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            commandSuggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            commandSuggestions: []
        });
    };

    onSuggestionSelected = (event, {suggestion}) => {
        event.preventDefault();
        this.setState({
            commandSuggestionValue: ''
        });
        this.pSBotSuggestionResponseClick(suggestion);
    };

    allowedImageTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
    ];

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
            console.error('Exception Occurred while parsing json ', ex);
        });
    };


    /**
     * @method sendConversationToBot()
     * @methodOf PsBot#sendConversationToBot
     * @param {Object} event Form Submit Event
     * @param {String} conversationText Conversation being sent to bot
     * @description Sends the user conversation to pS Bot
     */
    sendConversationToBot = (event, conversationText, isAutoResponse) => {
        if (conversationText instanceof Event) {
            conversationText = this.state.commandSuggestionValue;
            this.setState({
                commandSuggestionValue: ''
            });
        }


        if (event) event.preventDefault();

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

        if (isAutoResponse) {
            conversation.value = conversationText;
        }

        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'POST', headers: this.headers, body: JSON.stringify(conversation)});

        let conversations = this.state.conversations.slice();
        conversations.push(conversation);

        this.setState({
            conversationId: this.state.conversationId,
            conversationText: '',
            conversations: conversations,
            conversationHistory: this.state.conversationHistory,
            conversationInputText: this.state.conversationInputText,
            responseSuggestions: [],
            listMenu: [],
        });

        if (conversationText.charAt(0) === '/') {
            const allowedSlashCommands = SlashCommands();

            const slashConversation = {
                "type": "command",
                "text": conversationText,
                "from": {
                    "id": "default-user",
                    "name": "User"
                },
                "locale": "en-US",
                "textFormat": "plain",
                "timestamp": new Date(),
                "localTimestamp": Date.now(),
                "channelData": {
                    "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
                },
                "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
            };

            if (allowedSlashCommands.hasOwnProperty(conversationText)) {
                const commandResponses = allowedSlashCommands[conversationText];

                for (const response of commandResponses) {
                    if (response.nextConversation) {
                        console.log('Spreading the next conversation to conversations.', response.nextConversation[0]);
                        this.setState({
                            conversationId: this.state.conversationId,
                            conversationText: '',
                            conversations: this.state.conversations.concat([slashConversation, ...response.nextConversation]),
                            conversationHistory: this.state.conversationHistory,
                            conversationInputText: this.state.conversationInputText,
                            responseSuggestions: this.state.responseSuggestions,
                            listMenu: this.state.listMenu,
                        });

                        for (const nextConv of response.nextConversation) {
                            if (nextConv.doesExpectInput) {
                                this.setState({
                                    sendInputToServer: false
                                });
                            }
                        }
                    } else {
                        this.setState({
                            conversationId: this.state.conversationId,
                            conversationText: '',
                            conversations: this.state.conversations.concat([slashConversation, ...allowedSlashCommands[conversationText]]),
                            conversationHistory: this.state.conversationHistory,
                            conversationInputText: this.state.conversationInputText,
                            responseSuggestions: this.state.responseSuggestions,
                            listMenu: this.state.listMenu,
                        });
                    }
                }

            } else {
                this.setState({
                    conversationId: this.state.conversationId,
                    conversationText: '',
                    conversations: this.state.conversations.concat([slashConversation, ...allowedSlashCommands['/unknown']]),
                    conversationHistory: this.state.conversationHistory,
                    conversationInputText: this.state.conversationInputText,
                    responseSuggestions: this.state.responseSuggestions,
                    listMenu: this.state.listMenu,
                });
            }
            return;
        }

        if (this.state.sendInputToServer) {
            fetch(request)
                .then(HandleErrors).then((json) => {
            this.setState({
                conversationId: this.state.conversationId,
                conversationText: '',
                conversations: conversations,
                conversationHistory: this.state.conversationHistory,
                conversationInputText: this.state.conversationInputText,
                responseSuggestions: this.state.responseSuggestions,
                listMenu: this.state.listMenu,
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
                responseSuggestions: this.state.responseSuggestions,
                listMenu: this.state.listMenu,
            });

            // Remove thinking before pushing the content
            conversations.splice(-1, 1);

            let fetchBotConversationsTimer = setInterval(() => this.fetchBotConversations(fetchBotConversationsTimer), 200);
        }).catch((ex) => {
            console.error('Parsing failed while sending conversation to bot ', JSON.stringify(ex));
            this.setState({
                conversationId: this.state.conversationId,
                conversationText: '',
                conversations: this.state.conversations.concat([...PsError['unableToConnect']]),
                conversationHistory: this.state.conversationHistory,
                conversationInputText: this.state.conversationInputText,
                responseSuggestions: this.state.responseSuggestions,
                listMenu: this.state.listMenu,
            });
        });
        }
    };

    conversationCounter = 0;

    /**
     * @method fetchBotConversations
     * @methodOf PsBot#fetchBotConversations
     * @description Fetches the bot conversations based on the provided timer value
     * clears the timer when there are no more conversations to fetch from a batch.
     * @param fetchBotConversationsTimer
     */
    fetchBotConversations = (fetchBotConversationsTimer) => {
        this.conversationCounter = this.conversationCounter + 1;

        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'GET', headers: this.headers});

        fetch(request)
            .then((response) => {
                return response.json();
            }).then((json) => {
            const lastItem = json.activities[json.activities.length - 1];

            for (let newConversation of json.activities) {
                if (newConversation.from.name !== 'User' && this.state.conversationHistory.indexOf(newConversation.id) < 0 && newConversation.code !== 'completedSuccessfully') {

                    let conversationHistory = this.state.conversationHistory.slice();
                    let conversations = this.state.conversations.slice();

                    if (newConversation.attachments && newConversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero' && newConversation.text) {
                        const textConversation = Object.assign({}, newConversation);
                        delete textConversation.attachments;
                        conversations.push(textConversation);

                        if (newConversation.attachments[0].content.buttons) {
                            let responseSuggestions = newConversation.attachments[0].content.buttons;
                            this.setState({
                                responseSuggestions: responseSuggestions,
                            });
                        }

                    } else if (newConversation.attachments && newConversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero' && newConversation.attachments[0].content.buttons && newConversation.attachments[0].content.buttons[0].type === 'imBack') {
                        this.setState({
                            listMenu: newConversation.attachments[0].content.buttons
                        });
                    } else {
                        this.setState({
                            noButtonCard: true,
                        });
                    }

                    conversationHistory.push(newConversation.id);
                    if (this.state.responseSuggestions.length === 0) {
                        conversations.push(newConversation);
                    }


                    this.setState({
                        conversationId: this.state.conversationId,
                        conversationText: '',
                        conversations: conversations,
                        conversationHistory: conversationHistory,
                        conversationInputText: this.state.conversationInputText,
                        responseSuggestions: this.state.responseSuggestions,
                    });
                } else if (this.conversationCounter === 200) {
                    this.conversationCounter = 0;
                    clearInterval(fetchBotConversationsTimer);
                    this.setState({
                        conversations: this.state.conversations.concat([...PsError['serverError']])
                    });
                }
            }

            if (lastItem.inputHint === 'expectingInput' || lastItem.inputHint === 'acceptingInput' || lastItem.code === 'completedSuccessfully') {
                clearInterval(fetchBotConversationsTimer);
            }
        }).catch((ex) => {
            console.log("Error Occurred while getting conversation from bot", ex);
            clearInterval(fetchBotConversationsTimer);
            this.setState({
                conversations: this.state.conversations.concat([...PsError['serverError']])
            });
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
            listMenu: this.state.listMenu,
        });
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBot#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} buttonValue Button Click Event
     */
    pSBotButtonClick = (buttonValue) => {
        this.sendConversationToBot(null, buttonValue, true);
    };

    wallpaperClick = (toLoad) => {
        if (toLoad) {
            window.open(toLoad);
        }

        this.setState({
            loadWallpaper: false,
        });
    };

    pSBotSuggestionResponseClick = (button) => {
        const buttonValue = button.value;
        this.pSBotButtonClick(buttonValue);
    };

    handleMenuClick = (event) => {
        this.setState({ menuOpen: true, anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ menuOpen: false });
    };

    render() {

        const value = this.state.commandSuggestionValue;
        const commandSuggestions = this.state.commandSuggestions;

        const inputProps = {
            placeholder: 'Say something..',
            value,
            onChange: this.onSuggestionChange
        };

        let responseSuggestions = [],
        hideOptions = true;

        if (this.state.responseSuggestions) {
            responseSuggestions = this.state.responseSuggestions;
        } else {
            responseSuggestions = [];
        }

        if (this.state.conversations.length > 0) {
            hideOptions = false;
        }

        return (
                <div className={this.classes.root}>
                    {
                    (this.state.loadWallpaper) ? (
                        <PsBotWallpapers action={(loadUrl) => this.wallpaperClick(loadUrl)}/>
                    ) : (
                        <div>
                    <PsBotNavbar marginTop={-30}
                                marginLeft={-10}
                                action={this.pSBotButtonClick}
                                theme={this.props.navbarTheme}
                         />
                    <Grid container gutter={8} className={this.classes.conversationContainer}>
                        {
                            hideOptions ? (
                                <TransitionMotion defaultStyles={[
                                    { key: 'greet-welcome', style: {marginTop: 0}},
                                    { key: 'greet-what', style: {marginTop: 0}},
                                    { key: 'hello', style: {marginTop: 0}},
                                    { key: 'learn', style: {marginTop: 0}},
                                    { key: 'about-us', style: {marginTop: 0}},
                                    { key: 'our-philosophy', style: {marginTop: 0}},
                                    { key: 'careers', style: {marginTop: 0}},
                                    { key: 'quit', style: {marginTop: 0}}
                                ]}
                                                  styles={[
                                                      { key: 'greet-welcome', style: { marginTop: spring(60) }, data: {
                                                          type: 'Greet',
                                                          title: "Hello, I'm purpleBot",
                                                      }},
                                                      { key: 'greet-what', style: { marginTop: spring(10) }, data: {
                                                          type: 'Greet',
                                                          title: 'Some things you can ask me..',
                                                      }},
                                                      { key: 'hello', style: { marginTop: spring(30) }, data: {
                                                          type: 'Command',
                                                          title: 'Say Hello to purpleBot',
                                                          value: 'Hello',
                                                      }},
                                                      { key: 'learn', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Learn with purpleBot',
                                                          value: 'learn',
                                                      }},
                                                      { key: 'about-us', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'About us',
                                                          value: 'About us',
                                                      }},
                                                      { key: 'our-philosophy', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Our Philosophy',
                                                          value: 'Our Philosophy',
                                                      }},
                                                      { key: 'careers', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Careers @ Purpleslate',
                                                          value: 'Careers',
                                                      }},
                                                      { key: 'quit', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Talk to you later',
                                                          value: 'quit',
                                                      }}
                                                  ]}
                                >
                                    {(styles) => (
                                        <div>
                                            { styles.map(({ key, style, data}) => (
                                                <div key={key} style={{
                                                    textAlign: 'center',
                                                    marginLeft: '190px',
                                                    cursor: 'pointer',
                                                    ...style
                                                }}>
                                                    { (data.type === 'Greet') ? (
                                                    <Paper className={this.classes.conversationGreeting}>
                                                        <div className={this.classes.conversationText}>
                                                            <p>
                                                                {data.title}
                                                            </p>
                                                        </div>
                                                    </Paper>
                                                    ) : (
                                                    <Paper className={this.classes.conversationOptions}
                                                           onClick={() => this.pSBotButtonClick(data.value)}>
                                                        <div className={this.classes.conversationText}>
                                                            <p>
                                                                {data.title}
                                                            </p>
                                                        </div>
                                                    </Paper>
                                                    )
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TransitionMotion>
                            ) : ('')
                        }
                        {this.state.conversations.map((conversation, id) => {
                            return (conversation.from.name !== 'User' ?
                                    (<Grid item xs={12} sm={12} key={id} ref={(el) => { this.messagesEnd = el; }}>
                                    <TransitionMotion defaultStyles={[
                                                                {key: id.toString(), style: {marginRight: -50}},
                                                            ]} styles={[
                                                                { key: id.toString(), style: { marginRight: spring(0) }, data: conversation},
                                                            ]}>
                                                                {(styles) => (
                                                                    <div>
                                                                        { styles.map(({ key, style, data}) => (
                                                                            <div key={key} style={{
                                                                                ...style
                                                                            }}>
                                        <Paper className={(conversation.contentType === 'typing') ? this.classes.psBotThinking : this.classes.paperBotConversation}>
                                            <div className={this.classes.conversationText}>
                                                {
                                                    !conversation.attachments ? (
                                                    (conversation.contentType === 'typing') ?
                                                        (
                                                            
                                                                                <PsBotThinking thinkingImg={data.img} />
                                                        )
                                                        : (
                                                                        <p>
                                                                            {data.text}
                                                                        </p>
                                                         )) :
                                                        ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                            <p>
                                                            <PsBotCard data={conversation.attachments[0].content}
                                                                       action={this.pSBotButtonClick} /></p>) : ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.quiz') ?
                                                            <p>
                                                                <PsBotQuizCard data={conversation.attachments[0].content}
                                                                           action={this.pSBotButtonClick} /></p>
                                                            : ((conversation.attachments && this.allowedImageTypes.indexOf(conversation.attachments[0].contentType) >= 0) ? (
                                                            <PsBotCardImage imageUrl={conversation.attachments[0].contentUrl} fetchImg={conversation.attachments[0].fetchImg} />
                                                        ) : ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.code')) ?
                                                           <PsBotCodeCard data={conversation.attachments[0].content} /> : (conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.ps.card.command') ?
                                                                    <PsBotCommandCard data={conversation.attachments[0].content} />
                                                                    : data.text)))
                                                }
                                            </div>
                                        </Paper>
                                        </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </TransitionMotion>
                                            {(this.state.conversations.length === id + 1) ?
                                                (<TransitionMotion defaultStyles={[
                                                    { key: id.toString(), style: {marginLeft: -50}},
                                                ]} styles={[
                                                    { key: id.toString(), style: { marginLeft: spring(0) }, data: conversation.localTimestamp},
                                                ]}>
                                                    {(styles) => (
                                                        <div>
                                                            {styles.map(({key, style, data}) => (
                                                                <div key={key} style={{...style}}>
                                                                    <PsBotConversationTime time={data} />
                                                                </div>
                                                            ))}
                                                        </div>

                                                    )}

                                                </TransitionMotion>) : ''}
                                    </Grid>
                                  )
                                    :
                                    (
                                    <TransitionMotion key={id} defaultStyles={[
                                        { key: id.toString(), style: {marginLeft: -50}},
                                    ]}
                                                      styles={[
                                                          { key: id.toString(), style: { marginLeft: spring(0) }, data: conversation.text},
                                                      ]}
                                    >
                                        {(styles) => (
                                            <div>
                                                { styles.map(({ key, style, data}) => (
                                                    <div key={key} style={{
                                                        ...style
                                                    }}>
                                                        <PsHumanConversation conversationText={data} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </TransitionMotion>
                                    )
                            )
                        })}
                    </Grid>
                    <Grid container className={this.classes.conversationInput}>
                        {responseSuggestions.map((suggestion, id) => {
                            return (
                            (suggestion.type === 'emoji') ? (
                                <Emoji size={30} emoji={suggestion.title} className={[this.classes.paperBotConversation, this.classes.responseSuggestionButton].join(' ')} key={id} />
                            ) : (<Paper className={[this.classes.paperBotConversation, this.classes.responseSuggestionButton].join(' ')} key={id}
                                           onTouchTap={() => this.pSBotSuggestionResponseClick(suggestion)}>
                                <div className={this.classes.conversationText}>
                                    <p>
                                        {suggestion.title}
                                    </p>
                                </div>
                            </Paper>)
                            )
                        })}
                        <Grid item xs={12} sm={12} md={12}>
                            <div className="Ps-Bot-Conversation-Input-Container">
                                {(this.state.listMenu && this.state.listMenu.length === 0) ?
                                (<form onSubmit={this.sendConversationToBot} autoComplete="off">
                                    <Autosuggest
                                        autoFocus="on"
                                        suggestions={commandSuggestions}
                                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                        onSuggestionSelected={this.onSuggestionSelected}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                    />
                                </form>) : (
                                    <div className={this.classes.input}>
                                    <Button
                                        aria-owns={this.state.menuOpen ? 'simple-menu' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenuClick}
                                    >
                                        What would you like to know about?
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={this.state.anchorEl}
                                        open={this.state.menuOpen}
                                        onRequestClose={this.handleMenuClose}
                                    >   
                                        {
                                            this.state.listMenu.map((menu, id) => {
                                                return (
                                                    <MenuItem onClick={() => this.pSBotSuggestionResponseClick(menu)} key={id}>{menu.title}</MenuItem>
                                                )
                                            })
                                        }
                                    </Menu>
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                        </div>
                    )
                    }
                </div>
        );
    }
}

PsBot.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBot);
