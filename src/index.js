// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Material UI imports
import Paper from 'material-ui/Paper';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

// Common Imports
import {IntlProvider} from 'react-intl';

// App imports
import PsBot from './components/ps-bot/PsBot';
import PsBotPoweredBy from './components/ps-bot/PsBotPoweredBy';

// Service Worker import for offline app
import registerServiceWorker from './registerServiceWorker';

const darkTheme = {
    navbar: {
        appBar: {
            background: '#FFFFFF'
        },
        logo: {
            imageUrl: 'psbot-logo.png'
        }
    },
    humanConversation: {
        background: 'rgba(150, 101, 171, 0.87)',
    },
};

const paperStyle = {
    height: '630px',
    width: '98%',
    marginTop: 20,
    marginLeft: 10,
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
                <Paper style={paperStyle}>
                    <PsBot conversationInputText="Say Something.."
                           accessSecret="052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4"
                           navbarTheme={darkTheme.navbar}
                           humanConversationTheme={darkTheme.humanConversation}
                           />
                </Paper>
                <div style={{
                    marginRight: 9,
                    float: 'right'
                }}>
                    <PsBotPoweredBy/>
                </div>
            </div>
        </MuiThemeProvider>
    </IntlProvider>,
    document.getElementById('root'));

registerServiceWorker();
