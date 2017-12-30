import React from 'react';

export default (props) => (
    <span style={{
        fontFamily: 'monospace',
        color: props.color || '#DA3D4F',
        backgroundColor: props.background || '#F7F7F9'
    }}>
        {(props.commandText.charAt(0) === '/') ? 
            (props.commandText.substring(1, props.commandText.length)) : props.commandText}
    </span>
);