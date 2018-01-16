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
                            background: (this.props.theme) ? this.props.theme.background : '',
                            color: (this.props.theme) ? this.props.theme.color : '',
                            fontFamily: (this.props.theme) ? this.props.theme.fontFamily + ' !important' : 'Lato, sans-serif',
                            fontSize: (this.props.theme) ? this.props.theme.fontSize + ' !important' : '',
                        }}>
                <PsSlashCommand commandText={command.identifier} /> - {command.description}
            </p>
        ))}
    </div>
)