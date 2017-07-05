import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PsBot from './ps-bot/PsBot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PsBot />, document.getElementById('root'));
registerServiceWorker();
