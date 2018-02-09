import React, { Component } from 'react';
import PropTypes from 'prop-types';

import emoji from 'node-emoji';
import { MarkdownPreview } from 'react-marked-markdown';

class PsMarkdown extends Component {
    render() {
        let { text } = this.props;
        text = emoji.emojify(text);
        
        return (
            <MarkdownPreview
                    className="markdownStrong"
                    value={text}
                    markedOptions={{
                    gfm: true,
                    tables: true,
                    breaks: false,
                    smartLists: true,
                    smartypants: true,
                    highlight: function (code) {
                        return require('highlight.js').highlightAuto(code).value;
                      }
                    }} />
        );
    }
}

PsMarkdown.PropTypes = {
    text: PropTypes.string.isRequired
};

export default PsMarkdown;