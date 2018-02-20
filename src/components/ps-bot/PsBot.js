// React imports
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Material UI imports
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';

import PsMarkdown from './PsMarkdown';

// Common imports
import 'whatwg-fetch';
// React Typist
import Typist from 'react-typist';
import Slider from 'react-slick';

// App imports
import './PsBot.css';
import './styles/remy-style-transitions.css';
import PsBotNavbar from './PsBotNavbar';
import PsBotThinking from './PsBotThinking';
import PsHumanConversation from './PsHumanConversation';
import PsBotCard from './PsBotCard';
import PsBotCardImage from './PsBotCardImage';
import AutoSuggestTheme from './AutoSuggestTheme.css'; // eslint-disable-line no-unused-vars
import TypistTheme from './Typist.css'; // eslint-disable-line no-unused-vars
import PsBotCodeCard from './PsBotCodeCard';
import PsBotQuizCard from './PsBotQuizCard';
import PsBotSignInCard from './PsBotSignInCard';
import PsBotCommandCard from './commands/PsBotCommandCard';
import SlashCommands from '../../config/PsBotSlashCommands';
import PsError from './PsErr';
import PsBotFbSignInCard from './PsBotFbSignInCard';
import PsBotFbLikeCard from './PsBotFbLikeCard';
import PsBotGoogleSignInCard from './PsBotGoogleSignInCard';
import PsBotSliderArrowLeft from './slider/PsBotSliderArrowLeft';
import PsBotSliderArrowRight from './slider/PsBotSliderArrowRight';
import PsBotConversationTime from './PsBotConversationTime';
import PsBotApps from './PsBotApps';

import ConversationSkipKeywords from '../../config/PsBotConversationSkipKeywords';
import HandleErrors from '../../util/HandleErrors';

const styleSheet = createStyleSheet('PsBot', theme => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Lato, sans-serif',
        fontSize: '14px',
        color: '#212121',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        overflowX: 'hidden',
    },
    conversationInput: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '12px',
        color: '#212121',
    },
    conversationContainer: {
        marginTop: 60,
        marginBottom: 20,
        paddingTop: 15,
    },
    paperBotConversation: {
        background: '#FFFFFF',
        color: '#212121',
        border: '0px',
        borderRadius: '0px 15px 15px 15px',
        fontSize: '14px',
        float: 'left',
        textAlign: 'left',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
        maxWidth: '450px',
        marginBottom: '12px',
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
        background: 'transparent',
        float: 'left',
        position: 'relative',
        maxWidth: '350px',
        boxShadow: '0px 0px',
        marginTop: '-30px',
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
        marginBottom: '10px',
        marginLeft: '4px',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        fontFamily: 'Lato, sans-serif !important',
        cursor: 'pointer',
    },
    conversationOptions: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '0px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'center',
        letterSpacing: '0px',
        paddingRight: '10px',
        paddingLeft: '10px',
        paddingTop: '3px',
        paddingBottom: '3px',
        position: 'relative',
        width: '200px',
    },
    conversationGreeting: {
        background: 'transparent',
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
    avatar: {
        height: '24px',
        width: '24px',
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
    remyActivitySocket;

    constructor(props) {
        super(props);

        this.classes = props.classes;

        // Needed for onTouchTap
        injectTapEventPlugin();

        /**
         * @type {{conversationId: string, conversationText: string, conversations: Array, conversationHistory: Array, conversationInputText: string}}
         */
        this.state = {
            activityStreamUrl: '',
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
            noButtonCard: false,
            loadWallpaper: !!this.props.botpaperEnabled,
            sendInputToServer: true,
            user: {},
            hideOptions: false,
            emulateTyping: !!this.props.emulateTyping,
            showTyping: false
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
        this.setState({
            user: {},
            hideOptions: false,
        });
        localStorage.clear();
        this.sendConversationToBot(null, "/signin", true);
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

                  this.setState((prevState) => ({
                      conversations: [...prevState.conversations, ...signInError]
                  }));
                  console.error('Error occurred while signing in ', JSON.stringify(data));
                  break;
              default:
                  break;
          }
    };

    setNavbarIcon = (userIcon) => {
        this.refs.psBotNavbar.setUserIcon(userIcon);
    };

    allowedImageTypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
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

        // Focus on Conversation input every time the component updates.
        this.conversationInput.focus();
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

            this.setState({
                conversationId: json.conversationId,
                activityStreamUrl: json.streamUrl,
            });

            this.remyActivitySocket = new WebSocket(this.state.activityStreamUrl);

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

                if (this.props.conversationStarter) {
                    this.sendConversationToBot(null, this.props.conversationStarter, true);    
                }
            }

        }).catch((ex) => {
            console.error('Exception Occurred while parsing json ', ex);
        });
    };

    watermark = 0;


    /**
     * @method sendConversationToBot()
     * @methodOf PsBot#sendConversationToBot
     * @param {Object} event Form Submit Event
     * @param {String} conversationText Conversation being sent to bot
     * @description Sends the user conversation to pS Bot
     */
    sendConversationToBot = (event, conversationText, isAutoResponse) => {
        if (conversationText instanceof Event || !conversationText) {
            conversationText = this.state.conversationText;
        }


        if (event) event.preventDefault();

        if (this.psBotQuiz) {
            this.psBotQuiz.turnTimerOff();
        }

        this.setState({
            responseSuggestions: [],
            hideOptions: false,
        });

        const loggedDetails = this.getSessionDetails();

        let conversation = {
            "type": "message",
            "text": this.state.conversationText || conversationText,
            "from": {
                "id": loggedDetails.id,
                "name": loggedDetails.name,
                "channelId": "webchat"
            },
            "address": {
                channelId: 'PSClient',
                user: { id: loggedDetails.id, name: loggedDetails.name},
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

        if(!this.skipConversation(conversation) && conversationText.charAt(0) !== '/') {
            this.setState((prevState) => ({
                conversations: [...prevState.conversations, conversation],
                responseSuggestions: [],
                listMenu: [],
                showTyping: true,
            }));
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
                this.setState((prevState) => ({
                    conversationText: '',
                    conversations: [...prevState.conversations, slashConversation],
                }));

                const convSetState = (conv, i) => {
                    const thinkingObj = {
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
                    };

                    this.setState((prevState) => ({
                        conversations: [...prevState.conversations, conv, thinkingObj],
                    }));
                };

                const removeThinkingState = () => {
                    let conversations = this.state.conversations.slice();
                    conversations.splice(-1, 1);

                    this.setState({
                        conversations: conversations,
                    });
                };

                let i = 0, l = commandResponses.length, setTimeoutTimerId;
                (function iterator() {
                    convSetState(commandResponses[i], i);
                    if(++i < l) {
                        setTimeoutTimerId = setTimeout(() => {
                            removeThinkingState();
                            iterator();
                        }, 100);
                    } else {
                        clearTimeout(setTimeoutTimerId);
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
            this.setState({
                conversationText: '',
            });

            fetch(request)
                .then(HandleErrors).then((json) => {

            this.remyActivitySocket.addEventListener('message', (event) => {
                if (event.data && JSON.parse(event.data).activities && JSON.parse(event.data).watermark) {
                    if (this.watermark !== JSON.parse(event.data).watermark) {
                        this.watermark = JSON.parse(event.data).watermark;
                        this.setConversationToView(JSON.parse(event.data).activities);
                    }
                }
            });
        }).catch((ex) => {
            console.error('Unable to connect to Remy Server ', JSON.stringify(ex));
            this.setState({
                conversationId: this.state.conversationId,
                conversationText: '',
                conversations: this.state.conversations.concat([...PsError['unableToConnect']]),
                conversationInputText: this.state.conversationInputText,
                responseSuggestions: this.state.responseSuggestions,
                listMenu: this.state.listMenu,
                showTyping: false,
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

    setConversationToView = (activities) => {
        for (const activity of activities) {
            if (!this.skipConversation(activity) &&
                (activity.from.name === 'fiercebadlands' || activity.from.name === 'psbot-demo' || activity.contentType === 'typing') && activity.code !== 'completedSuccessfully') {

                if (activity.attachments && activity.attachments[0].contentType === 'application/vnd.microsoft.card.hero' && activity.text) {
                    const textConversation = Object.assign({}, activity);
                    delete textConversation.attachments;

                    if (activity.attachments[0].content.buttons) {
                        const responseSuggestions = activity.attachments[0].content.buttons;
                        this.setState((prevState) => ({
                            conversations: [...prevState.conversations, textConversation],
                            responseSuggestions: responseSuggestions,
                            showTyping: false,
                        }));
                    }

                } else if (activity.attachments && activity.attachments[0].contentType === 'application/vnd.microsoft.card.hero' && !activity.text) {
                    if (activity.attachments[0].content.buttons) {
                        const responseSuggestions = activity.attachments[0].content.buttons;
                        this.setState((prevState) => ({
                            conversations: [...prevState.conversations, activity],
                            responseSuggestions: responseSuggestions,
                            showTyping: false,
                        }));
                    } else {
                        this.setState((prevState) => ({
                            conversations: [...prevState.conversations, activity],
                            showTyping: false,
                        }));
                    }
                } else {
                    this.setState((prevState) => ({
                        conversations: [...prevState.conversations, activity],
                        showTyping: false,
                    }));
                }
            }
        }
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

    updateInputState = (e) => {
        this.setState({
            conversationText: e.target.value
        });
    };

    render() {

        let responseSuggestions = [];

        if (this.state.responseSuggestions) {
            responseSuggestions = this.state.responseSuggestions;
        } else {
            responseSuggestions = [];
        }

        const botName = (this.props.botDetailsTheme) ? (this.props.botDetailsTheme.name || "Remy") : "Remy";
        const botDescription = (this.props.botDetailsTheme) ? (this.props.botDetailsTheme.description || "Some things you can ask me..") : "Some things you can ask me..";
        const botConversationClass = this.classes.paperBotConversation;

        return (
            <div>
                { this.props.navbarEnabled &&<PsBotNavbar
                    user={this.state.user}
                    action={this.pSBotButtonClick}
                    theme={this.props.navbarTheme}
                    logout={this.clearSession}
                />}
                <div className={this.classes.root} style={{
                    marginTop: (window.parent.remy) ? (this.props.navbarEnabled ? 0 : 55) : 80,
                }}>
                    <div style={{
                        marginTop: '30px',
                    }}>
                    <Grid container gutter={0} className={this.classes.conversationContainer}>
                        {
                            this.state.hideOptions ? (
                                <PsBotApps  theme={{
                                                botConversationTheme: this.props.botConversationTheme,
                                                baseColor: this.props.baseColor,
                                                baseFontColor: this.props.baseFontColor,
                                            }}
                                            botDetails={{
                                                botName: botName,
                                                botDescription: botDescription,
                                            }}
                                            user={{
                                                id: this.state.user.id,
                                                name: this.state.user.name
                                            }}
                                            action={this.pSBotButtonClick} />
                            ) : ('')
                        }
                        {this.state.conversations.map((conversation, id) => {

                            const multipleCards = (conversation.attachments) ? conversation.attachments.length > 1 : false;

                            return ((conversation.from.name === 'fiercebadlands' || conversation.from.name === 'psbot-demo') ?
                                    (<Grid item xs={12} sm={12} key={id} ref={(el) => { this.messagesEnd = el; }}>
                                            {(this.state.conversations[id - 1] && this.state.conversations[id - 1].from.name !== 'fiercebadlands' && this.state.conversations[id - 1].from.name !== 'psbot-demo') ? (<div style={{
                                                float:  'left',
                                                paddingRight: '7px'
                                            }}>
                                                <Avatar className={this.classes.avatar}>B</Avatar>
                                            </div>) : (
                                                <div style={{
                                                    float:  'left',
                                                    paddingRight: '7px'
                                                }}>
                                                    <Avatar className={this.classes.avatar}></Avatar>
                                                </div>
                                            )}
                                            <Paper className={(conversation.contentType === 'typing') ? this.classes.psBotThinking : [botConversationClass, "slideInFromLeft"].join(" ")}
                                                   style={{
                                                       background: (conversation.attachments && this.allowedImageTypes.indexOf(conversation.attachments[0].contentType) >= 0) ? 'transparent' : 
                                                        ((this.props.botConversationTheme && conversation.contentType !== 'typing') ? this.props.botConversationTheme.background : botConversationClass.background),
                                                       color: (this.props.botConversationTheme) ? this.props.botConversationTheme.color : botConversationClass.color,
                                                       fontFamily: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontFamily + ' !important' : 'Lato, sans-serif',
                                                       fontSize: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontSize + ' !important' : botConversationClass.fontSize,
                                                       maxWidth: (window.parent.remy) ? '250px' : '450px',
                                                   }}>
                                                <div className={this.classes.conversationText}>
                                                    {
                                                        !conversation.attachments ? (
                                                            (conversation.channelData && conversation.channelData.attachment.payload.template_type === 'QuizCard') ? (
                                                                <PsBotQuizCard data={conversation.channelData.attachment.payload.quiz_card}
                                                                               ref={(ref) => {this.psBotQuiz = ref;} }
                                                                               action={this.pSBotButtonClick} />
                                                            ) : ((this.props.typing) ? (
                                                                    <Typist cursor={{
                                                                        element: '',
                                                                        hideWhenDone: true,
                                                                        hideWhenDoneDelay: 0,
                                                                    }}>
                                                                        {conversation.text}
                                                                    </Typist>
                                                                ) : (
                                                                    <PsMarkdown text={conversation.text} />
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
                                                                                                   action={this.pSBotButtonClick}
                                                                                                   theme={this.props.botConversationTheme} />
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </Slider>
                                                                    )
                                                                    : (
                                                                    <PsBotCard data={conversation.attachments[0].content}
                                                                                   action={this.pSBotButtonClick} theme={this.props.botConversationTheme} baseColor={this.props.baseColor} />
                                                                )

                                                            ) :
                                                                ((conversation.attachments  && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.quiz') ?
                                                                    <p>
                                                                        <PsBotQuizCard data={conversation.attachments[0].content}
                                                                                       action={this.pSBotButtonClick}
                                                                                       theme={this.props.botConversationTheme} /></p>
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
                                                                                    <PsBotCardImage imageUrl={conversation.attachments[0].contentUrl} theme={this.props.botConversationTheme} />
                                                                                ) : ((conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.microsoft.card.code')) ?
                                                                                    <PsBotCodeCard data={conversation.attachments[0].content} /> : (conversation.attachments && conversation.attachments[0].contentType === 'application/vnd.ps.card.command') ?
                                                                                        <PsBotCommandCard data={conversation.attachments[0].content} theme={this.props.botConversationTheme} />
                                                                                        : <PsMarkdown text={conversation.text} />)))))))
                                                    }
                                                </div>
                                            </Paper>
                                            {(this.state.conversations[id + 1] && this.state.conversations[id + 1].from.name !== 'fiercebadlands' && this.state.conversations[id + 1].from.name !== 'psbot-demo') &&(
                                                <PsBotConversationTime time={conversation.timestamp} />
                                            )}
                                            {(this.state.conversations.length === id + 1) ?
                                                (<PsBotConversationTime time={conversation.timestamp} />) : ''}
                                        </Grid>
                                    )
                                    :
                                    (
                                        <Grid item xs={12} sm={12} key={id}>
                                            <PsHumanConversation
                                                                 conversationText={conversation.text}
                                                                 user={this.state.user}
                                                                 theme={this.props.humanConversationTheme} />
                                        </Grid>
                                        )

                            )
                        })}
                    </Grid>
                    {this.state.showTyping &&<Grid item xs={12} sm={12} className={this.classes.psBotThinking}>
                                            <PsBotThinking thinkingImg={this.props.thinkingImg} style={{
                                                            border: 'none',
                                                            background: 'transparent !important',
                                                        }} /> 
                                            <div style={{   
                                                float:  'left',
                                                paddingRight: '7px',
                                                marginTop: '-47px'
                                            }}>
                                                <Avatar className={this.classes.avatar}>B</Avatar>
                                            </div>
                                                        </Grid>
                    }
                            {
                                this.getSessionDetails().id ? (
                                    <Grid container gutter={0} className={this.classes.conversationInput}>
                                        {responseSuggestions.map((suggestion, id) => {
                                            return (
                                                <Paper className={[this.classes.paperBotConversation, this.classes.responseSuggestionButton].join(' ')} key={id}
                                                            onTouchTap={() => this.pSBotSuggestionResponseClick(suggestion)}
                                                            style={{
                                                                background: this.props.baseColor ? this.props.baseColor : ((this.props.botConversationTheme) ? this.props.botConversationTheme.background : botConversationClass.background),
                                                                color: this.props.botConversationTheme ? this.props.botConversationTheme.background : '#FFFFFF',
                                                                fontFamily: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontFamily + ' !important' : 'Lato, sans-serif',
                                                                fontSize: (this.props.botConversationTheme) ? this.props.botConversationTheme.fontSize + ' !important' : botConversationClass.fontSize,
                                                            }}>
                                                    <div className={this.classes.conversationText}>
                                                        <PsMarkdown text={suggestion.title} />
                                                    </div>
                                                </Paper>
                                            )
                                        })}
                                    </Grid>
                                ) : ''
                            }
                        </div>
                </div>
                {!this.props.inputEnabled &&<div style={{
                    color: (this.props.humanConversationTheme) ? this.props.humanConversationTheme.color : botConversationClass.color,
                    position: 'fixed',
                    bottom: '20px',
                    width: '100%',
                    paddingTop: '25px',
                }}>
                    <div className="remy-input-grid">
                        <div className="remy-input-grid-one">
                            <div className="Ps-Bot-Conversation-Input-Container">
                                <div style={{
                                    float:  'left',
                                    paddingLeft: '7px',
                                    marginTop: '-30px',
                                }}>
                                    {this.state.user.imageUrl &&<Avatar src={this.state.user.imageUrl} className={this.classes.avatar}></Avatar>}
                                </div>
                                <form onSubmit={this.sendConversationToBot} autoComplete="off" style={{
                                    display: 'grid'
                                }}>
                                    <input type="text" placeholder="Say Something..." className="remy-input"
                                           ref={(conversationInput) => {this.conversationInput = conversationInput;}}
                                           onChange={this.updateInputState}
                                           value={this.state.conversationText} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}

PsBot.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBot);
