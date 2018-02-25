import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

import { Button, Welcome } from '@storybook/react/demo';
import {MuiThemeProvider} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import PsBotCard from '../src/components/cards/generic/PsBotCard';

const cardAttachment = {
    "contentType": "application/vnd.microsoft.card.hero",
    "content": {
        "title": "Question No : 4",
        "subtitle": "Where was the first Railroad of India constructed?",
        "text": "\nYour Answer : Hyderabad to Secunderabad\n\nCorrect Answer : Bombay to Thane\n\nObtained Score : -1\n\n",
        "images": [
            {
                "url": "https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg"
            }
        ]
    }
};

const botConversationTheme = {
    "background": "#FAFDFF",
    "color": "#091720"
  };

storiesOf('Remy Card', module)
  .add('with theme', withInfo(`
    Remy Card is a card layout for Remy web client. 
    It accepts the content (text, title, subtitle and images) in the data prop. Theme can be sent in the theme prop.

    ~~~js
    <PsBotCard data={cardAttachment.content} theme={botConversationTheme} />
    ~~~

  `)(() => <MuiThemeProvider><Paper style={{maxWidth: '380px'}}><PsBotCard data={cardAttachment.content} theme={botConversationTheme} style={{padding: '0px !important'}} /></Paper></MuiThemeProvider>));
