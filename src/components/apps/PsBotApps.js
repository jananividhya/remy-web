import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import { TransitionMotion, spring } from 'react-motion';

import PsBotGreeting from '../greeting/PsBotGreeting';

class PsBotApps extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    pSBotAppsButtonClick = (buttonValue) => {
        this.props.action(buttonValue, buttonValue);
    };

    render() {
        return (
            <TransitionMotion defaultStyles={[
                { key: 'greet-time', style: {marginTop: 0}},
                { key: 'greet-welcome', style: {marginTop: 0}},
                { key: 'greet-what', style: {marginTop: 0}},
                { key: 'sign-in', style: {marginTop: 0}},
                { key: 'greeting', style: {marginTop: 0}},
                { key: 'apps', style: {marginTop: 0}},
                { key: 'about-us', style: {marginTop: 0}},
                { key: 'quit', style: {marginTop: 0}}
            ]}
                              styles={[
                                  { key: 'greet-time', style: { marginTop: spring(40) }, data: {
                                      type: 'Greet',
                                      title: "",
                                  }},
                                  { key: 'greet-welcome', style: { marginTop: spring(10) }, data: {
                                      type: 'Greet',
                                      title: "I'm " + this.props.botDetails.botName,
                                  }},
                                  { key: 'greet-what', style: { marginTop: spring(10) }, data: {
                                      type: 'Greet',
                                      title: this.props.botDetails.botDescription,
                                  }},
                                  { key: 'sign-in', style: { marginTop: spring(30) }, data: {
                                      type: 'Command',
                                      title: 'Sign-in to ' + this.props.botDetails.botName,
                                      value: '/signin',
                                      display: !this.props.user.id
                                  }},
                                  { key: 'greeting', style: { marginTop: spring(10) }, data: {
                                    type: 'Command',
                                    title: 'Get Started',
                                    value: 'get started',
                                    display: true
                                  }},
                                  { key: 'apps', style: { marginTop: spring(10) }, data: {
                                      type: 'Command',
                                      title: 'Apps',
                                      value: 'apps',
                                      display: true
                                  }},
                                  { key: 'about-us', style: { marginTop: spring(10) }, data: {
                                      type: 'Command',
                                      title: 'About us',
                                      value: 'About us',
                                      display: true
                                  }},
                                  { key: 'quit', style: { marginTop: spring(10) }, data: {
                                      type: 'Command',
                                      title: 'Talk to you later',
                                      value: 'quit',
                                      display: true
                                  }},
                              ]}
            >
                {(styles) => (
                    <div style={{
                        paddingLeft: '50%',
                        marginLeft: '-120px'
                    }}>
                        { styles.map(({ key, style, data}) => (
                            <div key={key} style={{
                                textAlign: 'center',
                                cursor: 'pointer',
                                ...style
                            }}>
                                { (data.type === 'Greet') ? (
                                    (key === 'greet-time') ? (
                                        <Paper style={{
                                            color: (this.props.theme.baseFontColor ? this.props.theme.baseFontColor : 'purple') || 'purple',
                                            background: 'transparent',
                                            boxShadow: '0px 0px',
                                            fontSize: '16px',
                                            float: 'center',
                                            align: 'center',
                                            letterSpacing: '0px',
                                            paddingRight: '10px',
                                            paddingLeft: '10px',
                                            position: 'relative',
                                            marginLeft: '-95px',
                                            width: '400px',
                                        }}>
                                            <div style={{
                                                marginTop: '-8px',
                                                marginBottom: '-8px',
                                            }}>
                                                <p>
                                                    <PsBotGreeting userName={this.props.user.name} />
                                                </p>
                                            </div>
                                        </Paper>
                                    ) : (
                                        <Paper style={{
                                            color: (this.props.theme.baseFontColor ? this.props.theme.baseFontColor : 'purple') || 'purple',
                                            background: 'transparent',
                                            boxShadow: '0px 0px',
                                            fontSize: '16px',
                                            float: 'center',
                                            align: 'center',
                                            letterSpacing: '0px',
                                            paddingRight: '10px',
                                            paddingLeft: '10px',
                                            position: 'relative',
                                            marginLeft: '-95px',
                                            width: '400px',
                                        }}>
                                            <div style={{
                                                marginTop: '-8px',
                                                marginBottom: '-8px',
                                            }}>
                                                <p>
                                                    {data.title}
                                                </p>
                                            </div>
                                        </Paper>
                                    )
                                ) : (
                                (data.display)? (
                                    <Paper
                                           onClick={() => this.pSBotAppsButtonClick(data.value)} 
                                           style={{
                                               background: this.props.theme.baseColor || 'rgba(150, 101, 171, 0.87)',
                                               color: this.props.theme.botConversationTheme ? this.props.theme.botConversationTheme.background : '#FFFFFF',
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
                                           }}>
                                        <div style={{
                                                marginTop: '-8px',
                                                marginBottom: '-8px',
                                            }}>
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
        );
    }

}

export default PsBotApps;