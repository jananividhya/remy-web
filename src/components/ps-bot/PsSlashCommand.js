import React from 'react';

import PsMarkdown from '../markdown/PsMarkdown';

export default (props) => {
    const conversationText = (props.commandText.charAt(0) === '/') ?
        (props.commandText.substring(1, props.commandText.length)) : props.commandText;

    return (
        <PsMarkdown
            text = {conversationText} />
    );
};