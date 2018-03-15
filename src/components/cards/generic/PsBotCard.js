// React imports
import React, {Component} from 'react';

// Material UI imports
import PsMarkdown from '../../markdown/PsMarkdown';

import isURL from 'validator/lib/isURL';

import { Card, Button, Icon, Image, Modal, Embed } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

/**
 * @class PsBotCard
 * @extends Component
 * @description pS Bot Card Response
 */
export default class PsBotCard extends Component {

    state = {
        zoom: false,
        size: 'small'
    };

    constructor(props) {
        super(props);
        this.classes = props.classes;
    }

    zoom = dimmer => () =>
        this.setState({
            dimmer,
            zoom: true,
        });

    closeZoom = () => {
        this.setState({
            zoom: false,
        });
    };

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

        if (buttonValue && this.isURL(buttonValue.trim())) {
            window.open(buttonValue);
        } else {
            this.props.action(button.title, button.title);
        }
    };

    isVideo = (src) => {
        return src.includes("youtube.com");
    };

    getVideoId = (src) => {
        return src.split("?v=")[1];
    };

    render() {

        const cardData = this.props.data;
        const { dimmer, zoom, size } = this.state;
        const isVideo = (cardData.images && cardData.images[0]) ? this.isVideo(cardData.images[0].url) : false;

        return ( ((cardData.title || cardData.subtitle || cardData.text) ? (
            <div>
                <Card style={{
                    marginBottom: '13px',
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
                }}>
                    {(!isVideo && cardData.images && cardData.images[0])
                        &&<Image style={{
                            background: 'transparent',
                            cursor: 'pointer'
                    }} src={cardData.images[0].url} onClick={this.zoom('blurring')} />}
                    {(isVideo && cardData.images && cardData.images[0])
                        &&<Embed
                            autoplay={true}
                            brandedUI
                            color='white'
                            hd={true}
                            icon='video play'
                            id={this.getVideoId(cardData.images[0].url)}
                            source="youtube"
                        />}
                    <Card.Content style={{
                        marginTop: '-13px',
                        marginBottom: '-13px',
                    }}>
                        {cardData.title &&<Card.Header>
                            <PsMarkdown text={cardData.title} />
                        </Card.Header>}
                        {cardData.subtitle &&<Card.Meta style={{
                            marginTop: '-10px'
                        }}>
                              <PsMarkdown text={cardData.subtitle} />
                        </Card.Meta>}
                        {cardData.text &&<Card.Description>
                            <PsMarkdown text={cardData.text} />
                        </Card.Description>}
                    </Card.Content>
                    {(cardData.buttons && cardData.buttons.length > 0)
                        ? (cardData.buttons[0].type === 'openUrl' &&<Card.Content extra>
                            <div className='ui buttons'>
                                {cardData.buttons.map((button, buttonId) => {
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

                {(cardData.images && cardData.images[0])
                    &&<Modal size={size} dimmer={dimmer} open={zoom} style={{
                        marginTop: 0,
                        width: '100%',
                    }}
                           closeOnEscape={true}
                           closeOnRootNodeClick={true}
                           closeOnDimmerClick={true}
                           onClose={() => this.closeZoom()}
                           closeIcon
                    >
                        <Modal.Content>
                            <Image src={cardData.images[0].url} style={{
                                width: '100%',
                                height: '100%'
                            }} />
                        </Modal.Content>
                    </Modal>}
            </div>
            ): ''));
    }
}
