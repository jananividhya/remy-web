import React from 'react';
import ReactDOM from 'react-dom';
import PsBot from './PsBot';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PsBot />, div);
});
