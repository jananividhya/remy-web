// React imports
import React, {Component} from 'react';

// Material UI imports
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import PsMarkdown from './PsMarkdown';

import isURL from 'validator/lib/isURL';

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

        if (this.isURL(buttonValue)) {
            window.open(buttonValue);
        } else {
            this.props.action(buttonValue);
        }
    };

    render() {
        return ( ((this.state.title || this.state.subtitle || this.state.text) ? (
        <CardContent 
                style={{
                    padding: '8px 8px 8px 8px',
                }}>
                <div style={{
                    float: 'left',
                    textAlign: 'left',
                }}>
                    {(this.state.images && this.state.images[0]) ? (
                            <CardMedia style={{
                                paddingBottom: 10,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginLeft: '-8px',
                                marginRight: '-8px',
                                marginTop: '-8px',
                            }}>
                                <img src={this.state.images[0].url} alt={this.state.title}
                                    style={{
                                        height: '150px', 
                                        width: '100%'
                                    }} />
                            </CardMedia>
                        ) : ''}
                    {this.state.title &&<Typography type="headline" component="h2" style={{
                        background: (this.props.theme) ? this.props.theme.background : '',
                        color: (this.props.theme) ? this.props.theme.color : '',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                    }}>
                            <span>{this.state.title}</span>
                    </Typography>}
                    {this.state.subtitle &&<Typography type="subheading" component="h4" style={{
                        background: (this.props.theme) ? this.props.theme.background : '',
                        color: (this.props.theme) ? this.props.theme.color : '',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                    }}>
                        <span>{this.state.subtitle}</span>
                    </Typography>}
                    {(this.state.text && Array.isArray(this.state.text)) ? (
                        this.state.text.map((textVal, key) => (
                            <Typography component="p" key={key} style={{
                                background: (this.props.theme) ? this.props.theme.background : '',
                                color: (this.props.theme) ? this.props.theme.color : '',
                                fontFamily: 'Lato, sans-serif',
                                fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                                marginTop: !this.state.noButtonCard ? 10 : 0,
                                marginBottom: !this.state.noButtonCard ? 10 : 0,
                            }}>
                                {textVal &&<PsMarkdown text={textVal} />}
                            </Typography>
                        ))
                    ) : (
                        this.state.text &&<Typography component="p" style={{
                            background: (this.props.theme) ? this.props.theme.background : '',
                            color: (this.props.theme) ? this.props.theme.color : '',
                            fontFamily: 'Lato, sans-serif',
                            fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                            marginTop: !this.state.noButtonCard ? 10 : 0,
                            marginBottom: !this.state.noButtonCard ? 10 : 0,
                        }}>
                            <PsMarkdown text={this.state.text} />
                        </Typography>
                    )}
                    {(!this.state.noButtonCard && this.state.buttons) ? (
                        <div>
                            {this.state.buttons.map((button, buttonId) => {
                            return (button.type === 'openUrl') ? (<Chip key={buttonId} label={button.title} 
                                onClick={() => this.pSBotButtonClick(button)}
                                style={{
                                    wordWrap: 'break-word',
                                    clear: 'both',
                                    position: 'relative',
                                    overflowY: 'scroll',
                                    display: 'inline-block',
                                    top: '6px',
                                    textAlign: 'center',
                                    marginRight: '5px',
                                    paddingTop: '12px',
                                    paddingLeft: '10px',
                                }} />) : ''
                        })}
                        </div>
                    ) : ''}
                </div>
            </CardContent>): ''));
    }
}
