import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MarkdownPreview } from 'react-marked-markdown';

class PsMarkdown extends Component {
    render() {
        const { text } = this.props;
        
        return (
            <MarkdownPreview
                    className="markdownStrong"
                    value={text}
                    markedOptions={{
                    gfm: false,
                    tables: true,
                    breaks: false,
                    pedantic: false,
                    sanitize: true,
                    smartLists: true,
                    smartypants: true
                    }} />
        );
    }
}

PsMarkdown.PropTypes = {
    text: PropTypes.string.isRequired
};

export default PsMarkdown;