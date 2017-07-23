// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Material UI imports
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// App imports
import PsBot from './components/ps-bot/PsBot';

// Service Worker import for offline app
import registerServiceWorker from './registerServiceWorker';

const paperStyle = {
    height: 500,
    width: 600,
    margin: 20,
    display: 'inline-block',
    overflow: 'scroll',
    boxShadow: '0px 0px',
    border: '1px solid #D2D1D2',
};

ReactDOM.render(
    <MuiThemeProvider>
        <div>
            <Paper style={paperStyle}>
                <PsBot conversationInputText="Begin by typing a conversation.."
                       accessSecret="052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4"
                       />
            </Paper>
        </div>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
