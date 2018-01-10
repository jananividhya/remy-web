import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MDReactComponent from 'markdown-react-js';
import emoji from 'markdown-it-emoji';

class PsMarkdown extends Component {
    render() {
        const { text } = this.props;
        
        return (
            <MDReactComponent text={text} plugins={[
                emoji
              ]} />
        );
    }
}

PsMarkdown.PropTypes = {
    text: PropTypes.string.isRequired
};

export default PsMarkdown;