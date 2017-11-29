import React from 'react';
import PsSlashCommand from '../PsSlashCommand';

const commandListClass = {
    fontFamily: 'Lato, sans-serif',
    color: '#9B9B9B',
    marginTop: 10,
    marginBottom: 10,
};

export default (props) => (
    <div>
        {props.commandList.map((command, key) => (
            <p key={key} style={commandListClass}>
                <PsSlashCommand commandText={command.identifier} /> - {command.description}
            </p>
        ))}
    </div>
)