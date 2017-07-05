// React imports
import React, { Component } from 'react';

// App imports
import './PsBot.css';

const psBotStyle = {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
};

class PsBot extends Component {
    render() {
        return (
            <div style={psBotStyle}> This will be the bot content</div>
        );
    }
}

export default PsBot;
