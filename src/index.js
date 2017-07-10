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
    overflow: 'scroll'
};

ReactDOM.render(
    <MuiThemeProvider>
        <div>
            <Paper style={paperStyle} zDepth={1}>
                <PsBot conversationInputText="Begin by typing a conversation.."
                       accessKey="052B98YOnWs.cwA.VvI.cQBah7daXBPxhRRJwxMwGVc06fh0-G4rB3hwLFtS7S4"
                       />
            </Paper>
        </div>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
