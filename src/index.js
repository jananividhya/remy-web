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

const cuiTheme = {
    title: 'Remy',
    navbar: {
        appBar: {
            background: '#FFFFFF'
        },
        logo: {
            imageUrl: 'psbot-logo.png'
        }
    },
    botDetails: {
        name: 'Remy',
        description: 'Some things you can ask me..',
    },
    termsOfService: {
        text: 'pS Terms of Service',
        link: 'http://purpleslate.in'
    }
};

const paperStyle = {
    height: window.innerHeight - 30,
    width: '99.6%',
    marginTop: 0,
    marginLeft: 0,
    display: 'inline-block',
    overflow: 'scroll',
    boxShadow: '0px 0px',
    border: '1px solid #D2D1D2',
};

const theme = createMuiTheme();

ReactDOM.render(
    <IntlProvider locale="en">
        <MuiThemeProvider theme={theme}>
            <div>
                <DocumentTitle title={cuiTheme.title || 'purpleBot'}>
                    <Paper style={paperStyle}>
                        <PsBot conversationInputText="Say Something.."
                               //accessSecret="052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4"
                               accessSecret="lSj0yyrnrq4.cwA.ANY.yD-Brn5lp4ocATIJgqw85bjTdyqGI8rbe6XhOPzEHDY"
                               navbarTheme={cuiTheme.navbar}
                               navbarEnabled={true}
                               showGreeting={true}
                               containerHeight={window.innerHeight - 80}
                               botDetailsTheme={cuiTheme.botDetails}
                               typing={false}
                        />
                    </Paper>
                </DocumentTitle>
                <div style={{
                    marginLeft: 9,
                    marginTop: '-5px',
                    float: 'left'
                }}>
                    <PsBotTermsOfService text={cuiTheme.termsOfService.text}
                                         link={cuiTheme.termsOfService.link} />
                </div>
                <div style={{
                    marginRight: 9,
                    float: 'right'
                }}>
                    <PsBotPoweredBy imgPath="Group1@10x.png"/>
                </div>
            </div>
        </MuiThemeProvider>
    </IntlProvider>,
    document.getElementById('root'));

registerServiceWorker();
