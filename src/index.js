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
import PsBotWallpapers from './components/wallpaper/PsBotWallpapers';
import PsBotPoweredBy from './components/poweredBy/PsBotPoweredBy';

// Service Worker import for offline app
// import registerServiceWorker from './registerServiceWorker';

const cuiTheme = window.parent.remy ? window.parent.remy.theme : remyDress;

const paperStyle = {
    height: '100%',
    width: '100%',
    bottom: '53px',
    marginTop: (window.parent.remy) ? ((cuiTheme.hideHeader) ? -50 : 0) : 0,
    marginLeft: 0,
    display: 'inline-block',
    overflowY: 'scroll',
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
            showWallpaper: cuiTheme.hideBotpaper !== 'true' ? true : false
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
                                       accessSecret="Cj__Z7KtT_g.cwA.7eg.wTN79vOHVITs9HFFAwoHNoXPivuXuDeBxKfL-Djvw7I"
                                       navbarTheme={cuiTheme.navbar}
                                       navbarEnabled={cuiTheme.hideHeader !== 'true'}
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
                                       messageBar={cuiTheme.messageBar}
                                       anonymousLogin={cuiTheme.loginAnonymously === 'true'}
                                />
                            </Paper>
                        </DocumentTitle>
                        <div className="powered-by-grid">
                            <div className="powered-by-grid-one"></div>
                            <div className="powered-by-grid-two">
                                <PsBotPoweredBy {...cuiTheme.poweredBy} />
                            </div>
                            <div className="powered-by-grid-three"></div>                            
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
