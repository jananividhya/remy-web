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
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Autosuggest from 'react-autosuggest';
import Emoji from 'react-emoji-render';

// Common imports
import 'whatwg-fetch';
// React Typist
import Typist from 'react-typist';
import Slider from 'react-slick';

// App imports
import './PsBot.css';
import PsBotNavbar from './PsBotNavbar';
import PsBotThinking from './PsBotThinking';
import PsHumanConversation from './PsHumanConversation';
import PsBotCard from './PsBotCard';
import PsBotCardImage from './PsBotCardImage';
import PsBotConversationTime from './PsBotConversationTime';
import AutoSuggestTheme from './AutoSuggestTheme.css'; // eslint-disable-line no-unused-vars
import TypistTheme from './Typist.css'; // eslint-disable-line no-unused-vars
import PsBotCodeCard from './PsBotCodeCard';
import PsBotQuizCard from './PsBotQuizCard';
import PsBotSignInCard from './PsBotSignInCard';
import PsBotCommandCard from './commands/PsBotCommandCard';
import SlashCommands from '../../config/PsBotSlashCommands';
import PsError from './PsErr';
import PsBotWallpapers from './PsBotWallpapers';
import PsBotGreeting from './PsBotGreeting';
import PsBotFbSignInCard from './PsBotFbSignInCard';
import PsBotFbLikeCard from './PsBotFbLikeCard';
import PsBotGoogleSignInCard from './PsBotGoogleSignInCard';
import PsBotSliderArrowLeft from './slider/PsBotSliderArrowLeft';
import PsBotSliderArrowRight from './slider/PsBotSliderArrowRight';

import ConversationSkipKeywords from '../../config/PsBotConversationSkipKeywords';
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
        width: '97%',
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
        marginBottom: '55px',
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

const cardSliderOptions = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <PsBotSliderArrowRight/>,
    prevArrow: <PsBotSliderArrowLeft/>
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
    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.commandSuggestions.filter(command =>
                command.key.toLowerCase().slice(0, inputLength) === inputValue
            );
    };

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = suggestion => suggestion.value;

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div>
            {suggestion.title}
        </div>
    );
    /**
     * @description Command suggestions
     * @type {[*]}
     */
    commandSuggestions = [
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
            listMenuTitle: '',
            anchorEl: undefined,
            menuOpen: false,
            commandSuggestionValue: '',
            commandSuggestions: [],
            noButtonCard: false,
            loadWallpaper: true,
            sendInputToServer: true,
            user: {},
            hideOptions: false,
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

    getSessionDetails = () => {
        return {
            id: localStorage.getItem("user.id"),
            name: localStorage.getItem("user.name"),
            gender: localStorage.getItem("user.gender"),
            authProvider: localStorage.getItem("user.authProvider"),
            imageUrl: localStorage.getItem("user.imageUrl")
        };
    };

    setSessionDetails = (objToStore) => {
        const keys = Object.keys(objToStore);
        for (let i=0; i<keys.length; i++) {
            localStorage.setItem(keys[i], objToStore[keys[i]]);
        }
    };

    clearSession = () => {
        localStorage.clear();
    };

    onSignIn = (data) => {
          switch (data.status) {
              case 'success':
                  let id, name, gender, imageUrl, authProvider;

                  if (data.provider === 'google') {
                      name = data.profileObj.name;
                      id = data.profileObj.googleId;
                      imageUrl = data.profileObj.imageUrl;
                      authProvider = "Google";
                      gender = 'Male';
                  } else {
                      id = data.profile.id;
                      name = data.profile.name;
                      gender = data.profile.gender;
                      imageUrl = 'https://graph.facebook.com/' + data.profile.id + '/picture';
                      authProvider = "Facebook";
                  }

                  this.setState({
                      conversations: [],
                      user: {
                          name: name,
                          id: id,
                          imageUrl: imageUrl,
                      },
                      hideOptions: true,
                  });

                  // Set in session
                  this.setSessionDetails({
                      "user.name": name,
                      "user.id": id,
                      "user.gender": gender,
                      "user.authProvider": authProvider,
                      "user.imageUrl": imageUrl,
                  });

                  let signInWelcome = [{
                      "type": "message",
                      "text": "Hello, " + name,
                      "from": {
                          "id": "fiercebadlands",
                          "name": "fiercebadlands"
                      },
                      "locale": "en-US",
                      'localTimestamp': Date.now(),
                      "textFormat": "plain",
                      "timestamp": new Date(),
                  }, {
                      "type": "message",
                      "text": "Welcome to pS",
                      "from": {
                          "id": "fiercebadlands",
                          "name": "fiercebadlands"
                      },
                      "locale": "en-US",
                      'localTimestamp': Date.now(),
                      "textFormat": "plain",
                      "timestamp": new Date(),
                  }, ];

                  if (data.provider === 'facebook') {
                      signInWelcome.push({
                          "type": "message",
                          "text": "Like and share us on Facebook",
                          "from": {
                              "id": "fiercebadlands",
                              "name": "fiercebadlands"
                          },
                          "locale": "en-US",
                          'localTimestamp': Date.now(),
                          "textFormat": "plain",
                          "timestamp": new Date(),
                      }, {
                          "type": "message",
                          "timestamp": Date.now(),
                          "localTimestamp": Date.now(),
                          "from": {
                              "id": "fiercebadlands",
                              "name": "fiercebadlands"
                          },
                          "locale": "en-US",
                          "inputHint": "ignoringInput",
                          "attachments": [
                              {
                                  "contentType": "application/vnd.ps.card.like.fb",
                              }
                          ],
                      },)
                  }

                  break;
              case 'error':
                  const signInError = [{
                      "type": "message",
                      "text": "We are unable to sign you in",
                      "from": {
                          "id": "fiercebadlands",
                          "name": "fiercebadlands"
                      },
                      "locale": "en-US",
                      'localTimestamp': Date.now(),
                      "textFormat": "plain",
                      "timestamp": new Date(),
                  }];

                  this.setState({
                      conversations: this.state.conversations.concat([...signInError])
                  });
                  console.error('Error occurred while signing in ', JSON.stringify(data));
                  break;
              default:
                  break;
          }
    };

    setNavbarIcon = (userIcon) => {
        this.refs.psBotNavbar.setUserIcon(userIcon);
    };

    onSuggestionChange = (event, { newValue }) => {
        this.setState({
            commandSuggestionValue: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            commandSuggestions: this.getSuggestions(value)
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

    componentWillMount = () => {
        window.resizeTo(600, 900);
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

            if (!this.getSessionDetails().id) {
                this.sendConversationToBot(null, "/signin", true);
            } else {
                this.setState({
                    user: {
                        name: this.getSessionDetails().name,
                        id: this.getSessionDetails().id,
                        imageUrl: this.getSessionDetails().imageUrl,
                    },
                    hideOptions: true
                });
            }

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

        const loggedDetails = this.getSessionDetails();

        let conversation = {
            "type": "message",
            "text": this.state.conversationText || conversationText,
            "from": {
                "id": loggedDetails.id || "default-user",
                "name": loggedDetails.name || "User",
                "channelId": "webchat"
            },
            "address": {
                channelId: 'PSClient',
                user: { id: loggedDetails.id || 'default-user', name: loggedDetails.name || 'User' },
            },
            "channelId": "webchat",
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
        };

        if (isAutoResponse) {
            conversation.value = conversationText;
        }

        let request = new Request(this.directLineBaseUrl + '/conversations/' + this.state.conversationId + '/activities',
            {method: 'POST', headers: this.headers, body: JSON.stringify(conversation)});

        let conversations = this.state.conversations.slice();

        if(!this.skipConversation(conversation) && conversationText.charAt(0) !== '/') {
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
        }

        if (conversationText.charAt(0) === '/') {
            const allowedSlashCommands = SlashCommands();

            const slashConversation = {
                "type": "command",
                "text": conversationText,
                "from": {
                    "id": "default-user",
                    "name": "User",
                    "channelId": "webchat"
                },
                "channelId": "webchat",
                "locale": "en-US",
                "textFormat": "plain",
                "timestamp": new Date(),
                "localTimestamp": Date.now(),
                "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
            };

            if (allowedSlashCommands.hasOwnProperty(conversationText)) {
                const commandResponses = allowedSlashCommands[conversationText];
                this.state.conversations.push(slashConversation);
                this.setState({
                    conversationId: this.state.conversationId,
                    conversationText: '',
                    conversations: this.state.conversations,
                    conversationHistory: this.state.conversationHistory,
                    conversationInputText: this.state.conversationInputText,
                    responseSuggestions: this.state.responseSuggestions,
                    listMenu: this.state.listMenu,
                });

                const convSetState = (conv) => {
                    this.state.conversations.push(conv);
                    thinkingSetState();
                    this.setState({
                        conversationId: this.state.conversationId,
                        conversationText: '',
                        conversations: this.state.conversations,
                        conversationHistory: this.state.conversationHistory,
                        conversationInputText: this.state.conversationInputText,
                        responseSuggestions: this.state.responseSuggestions,
                        listMenu: this.state.listMenu,
                    });
                };

                const thinkingSetState = () => {
                    this.state.conversations.push({
                        "type": "message",
                        "text": "Thinking...",
                        "from": {
                            "id": "ps-public-bot",
                            "name": "bot",
                            "channelId": "webchat"
                        },
                        "channelId": "webchat",
                        "locale": "en-US",
                        "textFormat": "plain",
                        "contentType": "typing",
                        "img": "thinking.gif",
                        "timestamp": new Date(),
                        "localTimestamp": Date.now(),
                        "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
                    });

                    this.setState({
                        conversationId: this.state.conversationId,
                        conversationText: '',
                        conversations: this.state.conversations,
                        conversationHistory: this.state.conversationHistory,
                        conversationInputText: this.state.conversationInputText,
                        responseSuggestions: this.state.responseSuggestions,
                        listMenu: this.state.listMenu,
                    });
                };

                const removeThinkingState = () => {
                    let conversations = this.state.conversations;
                    conversations.splice(-1, 1);

                    this.setState({
                        conversations: conversations,
                    });
                };

                let i = 0, l = commandResponses.length;
                (function iterator() {
                    convSetState(commandResponses[i]);
                    if(++i<l) {
                        setTimeout(() => {
                            removeThinkingState();
                            iterator();
                        }, (commandResponses[i].text) ? commandResponses[i].text.length * 200 : 3000);
                    } else {
                        removeThinkingState();
                    }
                })();



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

            conversations.push({
                "type": "message",
                "text": "Thinking...",
                "from": {
                    "id": "ps-public-bot",
                    "name": "bot",
                    "channelId": "webchat"
                },
                "channelId": "webchat",
                "locale": "en-US",
                "textFormat": "plain",
                "contentType": "typing",
                "img": "thinking.gif",
                "timestamp": new Date(),
                "localTimestamp": Date.now(),
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

            let fetchBotConversationsTimer = setInterval(() => this.fetchBotConversations(fetchBotConversationsTimer), 1000);
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

    skipConversation = (conversation) => {
        const skipKeywords = ConversationSkipKeywords().filter(function (keyword) { // eslint-disable-line array-callback-return
            if (conversation.text && conversation.text.toUpperCase().startsWith(keyword.toUpperCase())) {
                return keyword.toUpperCase();
            }
        });

        if (skipKeywords.length > 0) {
            return true;
        }

        return false;
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

            const convSetState = (newConversation) => {
                    if (!this.skipConversation(newConversation) &&
                        (newConversation.from.name === 'fiercebadlands' || newConversation.from.name === 'psbot-demo' || newConversation.contentType === 'typing') && this.state.conversationHistory.indexOf(newConversation.id) < 0 && newConversation.code !== 'completedSuccessfully') {

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
                                listMenu: newConversation.attachments[0].content.buttons,
                                listMenuTitle: newConversation.attachments[0].content.subtitle || newConversation.attachments[0].content.title
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

                        //thinkingSetState();

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
                        /*clearInterval(fetchBotConversationsTimer);
                        this.setState({
                            conversations: this.state.conversations.concat([...PsError['serverError']])
                        });*/
                    }
            };

            let i = 0, l = json.activities.length;
            (function iterator() {
                convSetState(json.activities[i]);
                if(++i<l) {
                    setTimeout(() => {
                        iterator()
                    }, (json.activities[i].text) ? ((json.activities[i].text.length > 10) ? json.activities[i].text.length : json.activities[i].text.length * 50) : 100);
                }
            })();

            if (lastItem.inputHint === 'expectingInput' || lastItem.code === 'completedSuccessfully') {
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
            conversationInputText: (this.props.promptTheme) ? this.props.promptTheme.text : 'Say Something..',
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
            placeholder: (this.props.promptTheme) ? this.props.promptTheme.text : 'Say something..',
            value,
            onChange: this.onSuggestionChange
        };

        let responseSuggestions = [];

        if (this.state.responseSuggestions) {
            responseSuggestions = this.state.responseSuggestions;
        } else {
            responseSuggestions = [];
        }

        const botName = (this.props.botDetailsTheme) ? (this.props.botDetailsTheme.name || "purpleBot") : "purpleBot";
        const botDescription = (this.props.botDetailsTheme) ? (this.props.botDetailsTheme.description || "Some things you can ask me..") : "Some things you can ask me..";
        const botConversationClass = this.classes.paperBotConversation;

        return (
            <div>
                <div className={this.classes.root}>
                    {
                    (this.state.loadWallpaper) ? (
                        <PsBotWallpapers action={(loadUrl) => this.wallpaperClick(loadUrl)}/>
                    ) : (
                        <div>
                    { this.props.navbarEnabled &&<PsBotNavbar marginTop={-30}
                                marginLeft={-10}
                                user={this.state.user}
                                action={this.pSBotButtonClick}
                                theme={this.props.navbarTheme}
                         />}
                    <Grid container gutter={8} className={this.classes.conversationContainer}>
                        {
                            this.state.hideOptions ? (
                                <TransitionMotion defaultStyles={[
                                    { key: 'greet-time', style: {marginTop: 0}},
                                    { key: 'greet-welcome', style: {marginTop: 0}},
                                    { key: 'greet-what', style: {marginTop: 0}},
                                    { key: 'sign-in', style: {marginTop: 0}},
                                    { key: 'hello', style: {marginTop: 0}},
                                    { key: 'learn', style: {marginTop: 0}},
                                    { key: 'about-us', style: {marginTop: 0}},
                                    { key: 'our-philosophy', style: {marginTop: 0}},
                                    { key: 'careers', style: {marginTop: 0}},
                                    { key: 'quit', style: {marginTop: 0}}
                                ]}
                                                  styles={[
                                                      { key: 'greet-time', style: { marginTop: spring(40) }, data: {
                                                          type: 'Greet',
                                                          title: "",
                                                      }},
                                                      { key: 'greet-welcome', style: { marginTop: spring(10) }, data: {
                                                          type: 'Greet',
                                                          title: "I'm " + botName,
                                                      }},
                                                      { key: 'greet-what', style: { marginTop: spring(10) }, data: {
                                                          type: 'Greet',
                                                          title: botDescription,
                                                      }},
                                                      { key: 'sign-in', style: { marginTop: spring(30) }, data: {
                                                          type: 'Command',
                                                          title: 'Sign-in to ' + botName,
                                                          value: '/signin',
                                                          display: !this.state.user.id
                                                      }},
                                                      { key: 'hello', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Say Hello to ' + botName,
                                                          value: 'Hello',
                                                          display: true
                                                      }},
                                                      { key: 'learn', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Learn with ' + botName,
                                                          value: 'learn',
                                                          display: true
                                                      }},
                                                      { key: 'about-us', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'About us',
                                                          value: 'About us',
                                                          display: true
                                                      }},
                                                      { key: 'our-philosophy', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Our Philosophy',
                                                          value: 'Our Philosophy',
                                                          display: true
                                                      }},
                                                      { key: 'careers', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Careers @ ' + botName,
                                                          value: 'Careers',
                                                          display: true
                                                      }},
                                                      { key: 'quit', style: { marginTop: spring(10) }, data: {
                                                          type: 'Command',
                                                          title: 'Talk to you later',
                                                          value: 'quit',
                                                          display: true
                                                      }}
                                                  ]}
                                >
                                    {(styles) => (
                                        <div>
                                            { styles.map(({ key, style, data}) => (
                                                <div key={key} style={{
                                                    textAlign: 'center',
                                                    marginLeft: '180px',
                                                    cursor: 'pointer',
                                                    ...style
                                                }}>
                                                    { (data.type === 'Greet') ? (
                                                        (key === 'greet-time') ? (
                                                            <Paper className={this.classes.conversationGreeting}>
                                                                <div className={this.classes.conversationText}>
                                                                    <p>
                                                                        <PsBotGreeting userName={this.state.user.name} />
                                                                    </p>
                                                                </div>
                                                            </Paper>
                                                        ) : (
                                                            <Paper className={this.classes.conversationGreeting}>
                                                                <div className={this.classes.conversationText}>
                                                                    <p>
                                                                        {data.title}
                                                                    </p>
                                                                </div>
                                                            </Paper>
                                                        )
                                                    ) : (
                                                    (data.display) ? (
                                                        <Paper className={this.classes.conversationOptions}
                                                               onClick={() => this.pSBotButtonClick(data.value)}>
                                                            <div className={this.classes.conversationText}>
                                                                <p>
                                                                    {data.title}
                                                                </p>
                                                            </div>
                                                        </Paper>
                                                    ) : ''
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

                            const multipleCards = (conversation.attachments) ? conversation.attachments.length > 1 : false;

                            return ((conversation.from.name === 'fiercebadlands' || conversation.from.name === 'psbot-demo' || conversation.contentType === 'typing') ?
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
                                                                <Paper className={(conversation.contentType === 'typing') ? this.classes.psBotThinking : botConversationClass}
                                                                    style={{
                                                                        background: (this.props.botConversationTheme && conversation.contentType !== 'typing') ? this.props.botConversationTheme.background : botConversationClass.background,
                                                                        color: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontColor : botConversationClass.color,
                                                                        fontFamily: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontFamily + ' !important' : 'Lato, sans-serif',
                                                                        fontSize: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontSize + ' !important' : botConversationClass.fontSize,
                                                                    }}>
                                                                    <div className={this.classes.conversationText}>
                                                                        {
                                                                            !conversation.attachments ? (
                                                                                (conversation.contentType === 'typing') ?
                                                                                    (

                                                                                        <PsBotThinking thinkingImg={data.img} style={{
                                                                                            border: 'none',
                                                                                            background: botConversationClass.background,
                                                                                        }} />
                                                                                    )
                                                                                    : (conversation.channelData && conversation.channelData.attachment.payload.template_type === 'QuizCard') ? (
                                                                                    <p>
                                                                                        <PsBotQuizCard data={conversation.channelData.attachment.payload.quiz_card}
                                                                                                       action={this.pSBotButtonClick} /></p>
                                                                                ) : ((this.props.typing) ? (
                                                                                        <p>
                                                                                            <Typist cursor={{
                                                                                                element: '',
                                                                                                hideWhenDone: true,
                                                                                                hideWhenDoneDelay: 0,
                                                                                            }}>
                                                                                                <Emoji text={data.text} />
                                                                                            </Typist>
                                                                                        </p>
                                                                                    ) : (
                                                                                        <p>
                                                                                            <Emoji text={data.text} />
                                                                                        </p>
                                                                                    )
                                                                                )) :
                                                                                ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.hero') ? (
                                                                                (multipleCards) ?
                                                                                    (
                                                                                        <Slider {...cardSliderOptions}>
                                                                                            {conversation.attachments.map((attachment, key) => {
                                                                                                return (
                                                                                                    <div key={key}>
                                                                                                            <PsBotCard data={attachment.content}
                                                                                                                       action={this.pSBotButtonClick} />
                                                                                                    </div>
                                                                                                );
                                                                                            })}
                                                                                        </Slider>
                                                                                    )
                                                                                    : (
                                                                                    <p>
                                                                                        <PsBotCard data={conversation.attachments[0].content}
                                                                                                   action={this.pSBotButtonClick} theme={this.props.botConversationTheme} /></p>
                                                                                    )

                                                                                    ) :
                                                                                    ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.quiz') ?
                                                                                    <p>
                                                                                        <PsBotQuizCard data={conversation.attachments[0].content}
                                                                                                       action={this.pSBotButtonClick} /></p>
                                                                                    : ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.ps.card.signin.fb')) ?
                                                                                        (<p><PsBotFbSignInCard action={this.onSignIn} /></p>)
                                                                                        : ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.ps.card.signin.google')) ?
                                                                                            (<p><PsBotGoogleSignInCard action={this.onSignIn} /></p>)
                                                                                            : (((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.ps.card.like.fb')) ?
                                                                                            (<p><PsBotFbLikeCard /></p>)
                                                                                            : ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.ps.card.signin') ? (
                                                                                                <p>
                                                                                                    <PsBotSignInCard data={conversation.attachments[0].content}
                                                                                                                   action={this.onSignIn}
                                                                                                    theme={this.props.botConversationTheme} /></p>
                                                                                                    ) : ((((conversation.attachments && this.allowedImageTypes.indexOf(conversation.attachments[0].contentType) >= 0) ? (
                                                                                                <PsBotCardImage imageUrl={conversation.attachments[0].contentUrl} fetchImg={conversation.attachments[0].fetchImg} />
                                                                                            ) : ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.code')) ?
                                                                                                <PsBotCodeCard data={conversation.attachments[0].content} /> : (conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.ps.card.command') ?
                                                                                                    <PsBotCommandCard data={conversation.attachments[0].content} theme={this.props.botConversationTheme} />
                                                                                                    : <Emoji text={data.text} />)))))))
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
                                                              { key: id.toString(), style: { marginLeft: spring(0) }, data: {
                                                                  text: conversation.text,
                                                                  theme: this.props.humanConversationTheme,
                                                              }},
                                                          ]}
                                        >
                                            {(styles) => (
                                                <div>
                                                    { styles.map(({ key, style, data}) => (
                                                        <div key={key} style={{
                                                            ...style
                                                        }}>
                                                            <PsHumanConversation conversationText={data.text}
                                                                                    theme={data.theme} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </TransitionMotion>
                                    )

                            )
                        })}
                    </Grid>
                            {
                                this.getSessionDetails().id ? (
                                    <Grid container className={this.classes.conversationInput}>
                                        {responseSuggestions.map((suggestion, id) => {
                                            return (
                                                <Paper className={[this.classes.paperBotConversation, this.classes.responseSuggestionButton].join(' ')} key={id}
                                                            onTouchTap={() => this.pSBotSuggestionResponseClick(suggestion)}
                                                            style={{
                                                                background: (this.props.botConversationTheme) ? this.props.botConversationTheme.background : botConversationClass.background,
                                                                color: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontColor : botConversationClass.color,
                                                                fontFamily: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontFamily + ' !important' : 'Lato, sans-serif',
                                                                fontSize: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontSize + ' !important' : botConversationClass.fontSize,
                                                            }}>
                                                    <div className={this.classes.conversationText}>
                                                        <p>
                                                            {suggestion.title}
                                                        </p>
                                                    </div>
                                                </Paper>
                                            )
                                        })}
                                        <Grid item xs={12} sm={12} md={12} style={{
                                            backgroundColor: (this.props.promptTheme) ? this.props.promptTheme.background : 'lightgrey',
                                            position: 'absolute',
                                            marginLeft: '-3px',
                                            top: this.props.containerHeight || '802px',
                                            width: '100%'
                                        }}>
                                            <div className="Ps-Bot-Conversation-Input-Container">
                                                {(this.state.listMenu && this.state.listMenu.length === 0) ?
                                                    (<form onSubmit={this.sendConversationToBot} autoComplete="off">
                                                        <Autosuggest
                                                            autoFocus="on"
                                                            suggestions={commandSuggestions}
                                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                            onSuggestionSelected={this.onSuggestionSelected}
                                                            getSuggestionValue={this.getSuggestionValue}
                                                            renderSuggestion={this.renderSuggestion}
                                                            inputProps={inputProps}
                                                        />
                                                    </form>) : (
                                                        <div className={this.classes.input}>
                                                            <Button
                                                                aria-owns={this.state.menuOpen ? 'simple-menu' : null}
                                                                aria-haspopup="true"
                                                                onClick={this.handleMenuClick}
                                                            >
                                                                {this.state.listMenuTitle || 'What would you like to know about?'}
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
                                ) : ''
                            }
                        </div>
                    )
                    }

                </div>
            </div>
        );
    }
}

PsBot.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBot);
