import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

import { Button, Welcome } from '@storybook/react/demo';
import PsBotGreeting from '../src/components/ps-bot/PsBotGreeting';

storiesOf('Remy Greeting', module)
  .add('with user name', withInfo(`
    Greets user based on time of the day. Appends the name of the provided user with the greeting.

    Available Greetings :
    - Good Morning
    - Good Noon
    - Good Evening

    ~~~js
    <PsBotGreeting userName={name of the user} />
    ~~~

  `)(() => <PsBotGreeting userName='Foo Bar' />))
  .add('without user name', withInfo(`
    Greets user based on time of the day. 

    Available Greetings :
    - Good Morning
    - Good Noon
    - Good Evening

    ~~~js
    <PsBotGreeting/>
    ~~~

    `)(() => <PsBotGreeting/>));
