// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import remyDress from './theme/remy-dress.json';

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

const cuiTheme = window.parent.remy ? window.parent.remy.theme : remyDress;

const paperStyle = {
    height: window.innerHeight - 30,
    width: '99.6%',
    marginTop: (window.parent.remy) ? ((cuiTheme.hideHeader) ? -50 : 0) : 0,
    marginLeft: 0,
    display: 'inline-block',
    overflow: 'hidden',
    boxShadow: '0px 0px',
    border: '0px solid #D2D1D2',
    background: remyDress.background || '#FFFFFF',
};

const theme = createMuiTheme();

ReactDOM.render(
    <IntlProvider locale="en">
        <MuiThemeProvider theme={theme}>
            <div>
                <DocumentTitle title={cuiTheme.title || 'Remy'}>
                    <Paper style={paperStyle}>
                        <PsBot conversationInputText="Say Something.."
                               accessSecret="eSuQ3mxu61Q.cwA.fxU.ShH6-q_lglxbBiXo6CniDfj-CBbBIEOEG-MkKgJzVWw"
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
                               baseFontColor={cuiTheme.baseFontColor}
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
