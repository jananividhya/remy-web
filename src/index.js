// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Material UI imports
import Paper from 'material-ui/Paper';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

// Common Imports
import {IntlProvider} from 'react-intl';
import DocumentTitle from 'react-document-title';

// App imports
import PsBot from './components/ps-bot/PsBot';
import PsBotPoweredBy from './components/ps-bot/PsBotPoweredBy';
import PsBotTermsOfService from './components/ps-bot/PsBotTermsOfService';

// Service Worker import for offline app
import registerServiceWorker from './registerServiceWorker';

const remyTheme = window.parent.remy ? window.parent.remy.theme : {
    title: 'Remy 👨‍🍳 ',
    navbar: {
        appBar: {
            background: '#FFFFFF'
        },
        logo: {
            imageUrl: 'psbot-logo.png'
        }
    },
    botDetails: {
        name: 'Remy 👨‍🍳 ',
        description: 'Some things you can ask me..',
    },
    termsOfService: {
        text: 'pS Terms of Service',
        link: 'http://purpleslate.in'
    },
    baseColor: '#6476FF',
    botConversationTheme: {
        color: '#FCFCFC'
    },
    humanConversationTheme: {
        background: '#6476FF',
        color: '#FCFCFC'
    },
};
const cuiTheme = remyTheme;

const paperStyle = {
    height: window.innerHeight - 30,
    width: '99.6%',
    marginTop: (window.parent.remy) ? ((cuiTheme.hideHeader) ? -50 : 0) : 0,
    marginLeft: 0,
    display: 'inline-block',
    overflow: 'scroll',
    boxShadow: '0px 0px',
    border: '0px solid #D2D1D2',
    background: '#F3F4FB',
};

const theme = createMuiTheme();

ReactDOM.render(
    <IntlProvider locale="en">
        <MuiThemeProvider theme={theme}>
            <div>
                <DocumentTitle title={cuiTheme.title || 'Remy'}>
                    <Paper style={paperStyle}>
                        <PsBot conversationInputText="Say Something.."
                               accessSecret="lSj0yyrnrq4.cwA.ANY.yD-Brn5lp4ocATIJgqw85bjTdyqGI8rbe6XhOPzEHDY"
                               navbarTheme={cuiTheme.navbar}
                               navbarEnabled={cuiTheme.hideHeader !== 'true'}
                               botpaperEnabled={cuiTheme.hideBotpaper !== 'true'}
                               showGreeting={true}
                               containerHeight={window.innerHeight - 80}
                               botDetailsTheme={cuiTheme.botDetails}
                               typing={false}
                               botConversationTheme={cuiTheme.botConversationTheme}
                               humanConversationTheme={cuiTheme.humanConversationTheme}
                               baseColor={cuiTheme.baseColor}
                               conversationStarter={cuiTheme.startText}
                               inputEnabled={cuiTheme.hideInput === 'true'}
                        />
                    </Paper>
                </DocumentTitle>
                {cuiTheme.termsOfService &&<div style={{
                    paddingLeft: 9,
                    float: 'left',
                    marginTop: (window.parent.remy) ? (cuiTheme.hideHeader) ? ((cuiTheme.hideInput) ? 0 : 53) : (cuiTheme.hideInput) ? 0 : 53 : 0
                }}>
                    <PsBotTermsOfService text={cuiTheme.termsOfService.text}
                                         link={cuiTheme.termsOfService.link} />
                </div>
                }
                <div style={{
                    marginRight: 9,
                    float: 'right',
                    marginTop: (window.parent.remy) ? (cuiTheme.hideHeader) ? ((cuiTheme.hideInput) ? 0 : 53) : (cuiTheme.hideInput) ? 0 : 53 : 0
                }}>
                    <PsBotPoweredBy />
                </div>
            </div>
        </MuiThemeProvider>
    </IntlProvider>,
    document.getElementById('root'));

    registerServiceWorker();
