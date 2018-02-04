// React imports
import React, { Component } from 'react';
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
import PsBotWallpapers from './components/ps-bot/PsBotWallpapers';
import PsBotPoweredBy from './components/ps-bot/PsBotPoweredBy';
import PsBotTermsOfService from './components/ps-bot/PsBotTermsOfService';

// Service Worker import for offline app
import registerServiceWorker from './registerServiceWorker';

const cuiTheme = window.parent.remy ? window.parent.remy.theme : remyDress;

const paperStyle = {
    height: '100%',
    width: '99.6%',
    marginTop: (window.parent.remy) ? ((cuiTheme.hideHeader) ? -50 : 0) : 0,
    marginLeft: 0,
    display: 'inline-block',
    overflow: 'scroll',
    boxShadow: '0px 0px',
    border: '0px solid #D2D1D2',
    background: remyDress.background || '#FFFFFF',
    backgroundImage: remyDress.backgroundImage || "url('background.png')",
    position: 'absolute',
};

const theme = createMuiTheme();

class PsBotAdWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showWallpaper: true
        }
    }

    wallpaperClick = (loadUrl) => {
        if (loadUrl) {
            window.open(loadUrl);
        }

        this.setState({
            showWallpaper: false
        });
    };

    render() {
        return (
            (this.state.showWallpaper) ? (<PsBotWallpapers action={(loadUrl) => this.wallpaperClick(loadUrl)} />) :
                (
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
                                       thinkingImg={cuiTheme.thinkingImg || 'thinking.gif'}
                                />
                            </Paper>
                        </DocumentTitle>
                        {cuiTheme.termsOfService &&<div style={{
                            paddingLeft: 9,
                            float: 'left',
                            position: 'fixed',
                            bottom: '1px',
                            marginTop: (window.parent.remy) ? (cuiTheme.hideHeader) ? ((cuiTheme.hideInput) ? 0 : 53) : (cuiTheme.hideInput) ? 0 : 53 : 0
                        }}>
                            <PsBotTermsOfService text={cuiTheme.termsOfService.text}
                                                 link={cuiTheme.termsOfService.link} />
                        </div>
                        }
                        <div style={{
                            float: 'right',
                            position: 'relative',
                            left: '91%',
                            bottom: '1px',
                            marginTop: (window.parent.remy) ? (cuiTheme.hideHeader) ? ((cuiTheme.hideInput) ? 0 : 53) : (cuiTheme.hideInput) ? 0 : 53 : 0
                        }}>
                            <PsBotPoweredBy />
                        </div>
                    </div>
                )
        );
    }
}

ReactDOM.render(
    <IntlProvider locale="en">
        <MuiThemeProvider theme={theme}>
            <div>
                <PsBotAdWrapper />
            </div>
        </MuiThemeProvider>
    </IntlProvider>,
    document.getElementById('root'));

//registerServiceWorker();
