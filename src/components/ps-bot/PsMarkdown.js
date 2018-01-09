import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { emojify } from 'react-emojione';
import Emoji from 'react-emoji-render';

class PsMarkdown extends Component {
    render() {
        const { text } = this.props;
        const html = marked(text || '');
        
        return (
            <div dangerouslySetInnerHTML={{__html: html}} />
        );
    }
}

PsMarkdown.PropTypes = {
    text: PropTypes.string.isRequired
};

export default PsMarkdown;