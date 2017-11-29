import React from 'react';

const commandHighlight = {
    fontFamily: 'monospace',
    color: '#DA3D4F',
    backgroundColor: '#F7F7F9',
};

export default (props) => (
    <span style={commandHighlight}>
        {(props.commandText.charAt(0) === '/') ? 
            (props.commandText.substring(1, props.commandText.length)) : props.commandText}
    </span>
);