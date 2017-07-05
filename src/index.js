// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Material UI imports
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// App imports
import PsBot from './ps-bot/PsBot';

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
                <PsBot />
            </Paper>
        </div>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
