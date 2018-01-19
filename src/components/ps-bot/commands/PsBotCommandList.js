import React from 'react';
import PsSlashCommand from '../PsSlashCommand';

export default (props) => (
    <div>
        {props.commandList.map((command, key) => (
            <p key={key} style={{
                            background: (props.theme) ? props.theme.background : '',
                            color: (props.theme) ? props.theme.color : '#212121',
                            fontFamily: (props.theme) ? props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                            fontSize: (props.theme) ? props.theme.fontSize + ' !important' : '',
                            marginTop: 10,
                            marginBottom: 10,
                        }}>
                <PsSlashCommand commandText={command.identifier} /> - {command.description}
            </p>
        ))}
    </div>
)