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

// Service Worker import for offline app
import registerServiceWorker from './registerServiceWorker';

const cuiTheme = {
    title: 'Nice Name',
    navbar: {
        appBar: {
            background: '#FFFFFF'
        },
        logo: {
            imageUrl: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-11/3/5/asset/buzzfeed-prod-web03/sub-buzz-12185-1478166849-1.png?downsize=715:*&output-format=auto&output-quality=auto'
        }
    },
    humanConversation: {
        background: '#FFFFFF',
        fontColor: '#000000',
        fontSize: '12px',
        fontFamily: 'Lato-Regular',
    },
    botConversation: {
        background: '#0D47A1',
        fontColor: '#FFFFFF',
        fontSize: '12px',
        fontFamily: 'Lato-Regular',
    },
    prompt: {
        background: '#F0EFF2',
        text: "Don't say anything"
    },
    botDetails: {
        name: 'Nice Name',
        description: 'Reason for existence',
    }
};

const paperStyle = {
    height: '850px',
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
                           accessSecret="052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4"
                           navbarTheme={cuiTheme.navbar}
                           humanConversationTheme={cuiTheme.humanConversation}
                           botConversationTheme={cuiTheme.botConversation}
                           botDetailsTheme={cuiTheme.botDetails}
                           promptTheme={cuiTheme.prompt}
                           />
                </Paper>
                </DocumentTitle>
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
