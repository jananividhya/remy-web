// React imports
import React, {Component} from 'react';

// Material UI imports
import PsMarkdown from '../../markdown/PsMarkdown';

import isURL from 'validator/lib/isURL';

import { Card, Button, Icon, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

/**
 * @class PsBotCard
 * @extends Component
 * @description pS Bot Card Response
 */
export default class PsBotCard extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = this.props.data;
    }

    /**
     * @method isURL
     * @methodOf PsBotCard#isURL
     * @description Checks if a given string is an url or not
     * @param str
     * @returns {boolean}
     */
    isURL = (str) => {
        return isURL(str);
    };

    /**
     * @method pSBotButtonClick
     * @methodOf PsBotCard#pSBotButtonClick
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} event Button Click Event
     * @param {Object} button Button object passed from onClick
     */
    pSBotButtonClick = (button) => {
        const buttonValue = button.value;

        if (this.isURL(buttonValue.trim())) {
            window.open(buttonValue);
        } else {
            this.props.action(button.title, button.title);
        }
    };

    render() {
        return ( ((this.state.title || this.state.subtitle || this.state.text) ? (
                <Card style={{
                    marginBottom: '13px',
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
                }}>
                    {(this.state.images && this.state.images[0])
                        &&<Image style={{
                            background: 'transparent',
                    }} src={this.state.images[0].url} />}
                    <Card.Content style={{
                        marginTop: '-13px',
                        marginBottom: '-13px',
                    }}>
                        {this.state.title &&<Card.Header>
                            <PsMarkdown text={this.state.title} />
                        </Card.Header>}
                        {this.state.subtitle &&<Card.Meta style={{
                            marginTop: '-10px'
                        }}>
                              <PsMarkdown text={this.state.subtitle} />
                        </Card.Meta>}
                        {this.state.text &&<Card.Description>
                            <PsMarkdown text={this.state.text} />
                        </Card.Description>}
                    </Card.Content>
                    {(this.props.data.buttons && this.props.data.buttons.length > 0)
                        ? ((this.props.data.buttons[0].type === 'openUrl' || this.props.data.buttons[0].type === 'openURL') &&<Card.Content extra>
                            <div className='ui buttons'>
                                {this.state.buttons.map((button, buttonId) => {
                                    return (
                                    <Button animated='fade' key={buttonId} onClick={() => this.pSBotButtonClick(button)} style={{
                                        background: this.props.baseColor ? this.props.baseColor : ((this.props.botConversationTheme) ? this.props.botConversationTheme.background : '#FFFFFF'),
                                        color: this.props.theme ? this.props.theme.background : '#000000',
                                    }}>
                                        <Button.Content visible>
                                            <PsMarkdown text={button.title} />
                                        </Button.Content>
                                        <Button.Content hidden>
                                            <Icon name="external share"/>
                                        </Button.Content>
                                    </Button>)
                                })}
                            </div>
                    </Card.Content>) : ''}
                </Card>
            ): ''));
    }
}
