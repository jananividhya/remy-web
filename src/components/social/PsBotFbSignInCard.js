// React imports
import React, {Component} from 'react';

// Material UI imports
import PropTypes from 'prop-types';
import {withStyles, createStyleSheet} from 'material-ui/styles';
import FacebookProvider, { Login } from 'react-facebook';

// Style Imports
import '../ps-bot/PsBotButton.css';

const styleSheet = createStyleSheet('PsBotFbSignInCard', theme => ({
    buttonResponse: {
        boxShadow: '0px 0px',
        color: '#FFFFFF',
        fontFamily: 'Lato, sans-serif !important',
        minWidth: '120px',
        borderRadius: '60px',
        height: '10px',
        background: 'rgba(150, 101, 171, 0.87)',
    },
    nextLine: {
        wordWrap: 'break-word',
        clear: 'both',
        position: 'relative',
        overflowY: 'scroll',
        display: 'inline-block',
    },
    card: {
        maxWidth: 345,
    },
    leftAlignedText: {
        float: 'left !important',
        textAlign: 'left !important',
    },
    psTextColor: {
        fontFamily: 'Lato, sans-serif',
        color: '#212121',
    },
    buttonTopQuiz: {
        top: '6px',
        textAlign: 'center',
        marginRight: '5px',
    },
    buttonTop: {
        right: '35px',
        top: '6px',
        textAlign: 'center',
        marginRight: '5px',
        paddingTop: '12px',
    },
    paperBotConversation: {
        background: 'rgba(150, 101, 171, 0.87)',
        color: '#FFFFFF',
        boxShadow: '0px 0px',
        border: '1px solid #D2D1D2',
        borderRadius: '15px',
        fontSize: '14px',
        float: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative',
    },
    avatar: {
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    cardText: {
        marginTop: 10,
        marginBottom: 10,
    },
    chip: {

    },
    quiz: {
        textAlign: 'center',
        verticalAlign: 'middle',
        paddingRight: '10px',
    },
    quizTimer: {
        marginLeft: '100px',
    },
}));

/**
 * @class PsBotFbSignInCard
 * @extends Component
 * @description pS Bot Card Response
 */
class PsBotFbSignInCard extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = this.props.data;
    }

    /**
     * @method pSBotButtonClick
     * @methodOf PsBotCard#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} event Button Click Event
     * @param {Object} button Button object passed from onClick
     */
    signInResponse = (data) => {
        this.props.action({
            status: 'success',
            provider: 'facebook',
            ...data
        });
    };

    signInError = (err) => {
        this.props.action({
            status: 'error',
            provider: 'facebook',
            ...err
        });
    };

    render() {
        return ( <div>
            <FacebookProvider appId="1896270490692668">
                <Login
                    onResponse={this.signInResponse}
                    onError={this.signInError}
                    render={({ isLoading, isWorking, onClick }) => (
                        <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.2365-6/16344632_403881753293914_7761668832074137600_n.png?_nc_cat=0&oh=c79ae5228b15310754591a8424ef2da9&oe=5BC049ED"
                         alt="Login with Facebook"
                             height="30px"
                             width="200px"
                             onClick={onClick}/>
                    )}/>
            </FacebookProvider>
        </div> );
    }
}

PsBotFbSignInCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(PsBotFbSignInCard);
