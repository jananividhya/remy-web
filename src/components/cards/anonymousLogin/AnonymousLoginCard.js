// React imports
import React, {Component} from 'react';

// Material UI imports
import PsMarkdown from '../../markdown/PsMarkdown';

import isURL from 'validator/lib/isURL';
import uuid from 'uuid/v4';

import { Card, Feed, Icon, Form, Image } from 'semantic-ui-react';

/**
 * @class AnonymousLoginCard
 * @extends Component
 * @description Card which allows to set user email,
 * name in session without login
 */
export default class AnonymousLoginCard extends Component {

    state = {
        userName: ''
    };

    constructor(props) {
        super(props);
        this.classes = props.classes;
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
     * @method saveUserDetails
     * @methodOf PsBotCard#saveUserDetails
     * @description Sends the conversation to the bot based on the value of the button being clicked
     * @param {Object} event Button Click Event
     * @param {Object} button Button object passed from onClick
     */
    saveUserDetails = () => {
        this.props.action({
            userName: this.state.userName,
            userId: uuid()
        });
    };

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        return (((this.props.data.title || this.props.data.subtitle || this.props.data.text) ? (
                <Card style={{
                    marginBottom: '13px',
                    marginTop: '10px',
                    marginLeft: '30px',
                    fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif"
                }}>
                    {(this.props.data.images && this.props.data.images[0])
                    &&<Image style={{
                        height: '250px',
                        background: 'transparent',
                    }} src={this.props.data.images[0].url} />}
                    <Card.Content style={{
                        marginTop: '-13px',
                        marginBottom: '-13px',
                    }}>
                        {this.props.data.title &&<Card.Header>
                            <PsMarkdown text={this.props.data.title} />
                        </Card.Header>}
                        {this.props.data.subtitle &&<Card.Meta style={{
                            marginTop: '-10px'
                        }}>
                            <PsMarkdown text={this.props.data.subtitle} />
                        </Card.Meta>}
                        {this.props.data.text &&<Card.Description>
                            <PsMarkdown text={this.props.data.text} />
                        </Card.Description>}
                    </Card.Content>
                    <Card.Content extra>
                        {(this.props.user && this.props.user.name) &&<div>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label>
                                        <Icon name="comments" circular={true} />
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            Hello {this.props.user.name}!
                                        </Feed.Summary>
                                        <Feed.Date content='Lets start the conversation' style={{
                                            paddingTop: 5
                                        }} />
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                        </div>}
                        {(this.props.user && !this.props.user.name) &&<div className='ps-ui input'>
                            <Form onSubmit={() => this.saveUserDetails()}>
                                <Form.Input size='mini' placeholder='Enter your name'
                                            name="userName"
                                            value={this.state.userName}
                                            onChange={this.handleChange} />
                            </Form>
                        </div>}
                    </Card.Content>
                </Card>
            ): ''));
    }
}
