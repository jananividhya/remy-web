import React from 'react';
import PsSlashCommand from '../PsSlashCommand';

const commandListClass = {
    fontFamily: 'Lato, sans-serif',
    color: '#212121',
    marginTop: 10,
    marginBottom: 10,
};

export default (props) => (
    <div>
        {props.commandList.map((command, key) => (
            <p key={key} style={commandListClass} style={{
                            background: (props.theme) ? props.theme.background : '',
                            color: (props.theme) ? props.theme.color : '',
                            fontFamily: (props.theme) ? props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                            fontSize: (props.theme) ? props.theme.fontSize + ' !important' : '',
                        }}>
                <PsSlashCommand commandText={command.identifier} /> - {command.description}
            </p>
        ))}
    </div>
)