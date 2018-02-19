// React imports
import React, {Component} from 'react';

// Material UI imports
import {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
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
                    maxWidth: '250px',
                }}>
                    {(this.state.images && this.state.images[0]) ? (
                            <CardMedia style={{
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginLeft: '-18px',
                                marginRight: '-18px',
                            }}>
                                <img src={this.state.images[0].url} alt={this.state.title}
                                    style={{
                                        height: '180px', 
                                        width: '100%',
                                        borderTopRightRadius: '15px',
                                    }} />
                            </CardMedia>
                        ) : ''}
                    {this.state.title &&<Typography type="headline" component="h2" style={{
                        background: (this.props.theme) ? this.props.theme.background : '',
                        color: (this.props.theme) ? this.props.theme.color : '',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                        paddingTop: 10,
                    }}>
                            <span>{this.state.title}</span>
                    </Typography>}
                    {this.state.subtitle &&<Typography type="subheading" component="h4" style={{
                        background: (this.props.theme) ? this.props.theme.background : '',
                        color: (this.props.theme) ? this.props.theme.color : '',
                        fontFamily: 'Lato, sans-serif',
                        fontSize: (this.props.theme) ? this.props.theme.fontSize : '',
                        marginTop: '-10px',
                    }}>
                        <span>
                            <PsMarkdown text={this.state.subtitle} />
                        </span>
                    </Typography>}
                    {(this.state.text && Array.isArray(this.state.text)) ? (
                        this.state.text.map((textVal, key) => (
                            <Typography component="div" key={key} style={{
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
                        <div style={{
                            marginBottom: '10px',
                        }}>
                            {this.state.buttons.map((button, buttonId) => {
                            return (button.type === 'openUrl') ? (
                                <Button size="small" 
                                        key={buttonId}
                                        onTouchTap={() => this.pSBotButtonClick(button)}
                                        style={{
                                            background: (this.props.baseColor) ? this.props.baseColor  : ((this.props.theme) ? this.props.theme.background : '#FFFFFF'),
                                            color: this.props.theme ? this.props.theme.color : '#FFFFFF',
                                            marginRight: '10px',
                                            marginBottom: '10px',
                                            boxShadow: '0px 0px',
                                            fontFamily: 'Lato sans-serif',
                                            borderRadius: '15px',
                                        }}>
                                    <PsMarkdown text={button.title} />
                                </Button>) : ''
                        })}
                        </div>
                    ) : ''}
                </div>
            </CardContent>): ''));
    }
}
