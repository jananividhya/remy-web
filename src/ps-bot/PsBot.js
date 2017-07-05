import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import './PsBot.css';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

class PsBot extends Component {
    injectTapEventPlugin();

    render() {
        return (
            <div>
                <Paper style={style} zDepth={1}>
                    This will be the paper content
                </Paper>
            </div>
        );
    }
}

export default PsBot;
