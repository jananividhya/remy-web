const uuid = require('uuid');

export default () => {
    return {
        "/help": [{
            "type": "message",
            "text": "We are here to help you",
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }, {
            "type": "message",
            "text": "This is a sample help",
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }],
        "/menu": [{
            "type": "message",
            "id": uuid.v4(),
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.ps.card.command",
                    "content": {
                        "title": "Available Commands",
                        "commands": [{
                            "identifier": "/help",
                            "description": "Helps you in the middle of a conversation"
                        }, {
                            "identifier": "/menu",
                            "description": "Lists the menu options"
                        }, {
                            "identifier": "/signin",
                            "description": "Sign-in and make more context sensitive conversations.."
                        }],
                        "subtitle": "Commands let you question me and blah blah blah",
                    }
                }
            ]
        }],
        "/signin": [{
            "type": "message",
            "text": "Hey, there!",
            "from": {
                "id": "localbot",
                "name": "localbot"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }, {
            "type": "message",
            "text": "I am purpleBot, your anytime learning companion.",
            "from": {
                "id": "localbot",
                "name": "localbot"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }, {
            "type": "message",
            "text": "Help me know you better.",
            "from": {
                "id": "localbot",
                "name": "localbot"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }, {
            "type": "message",
            "id": uuid.v4(),
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.ps.card.command",
                    "content": {
                        "title": "Sign-in to purpleSlate",
                        "commands": [{
                            "identifier": "/signin-with-fb",
                            "description": "sign in with fb"
                        }, {
                            "identifier": "/help",
                            "description": "Lists the menu options"
                        }, {
                            "identifier": "/help",
                            "description": "Sign-in and make more context sensitive conversations.."
                        }],
                        "subtitle": "How do you want to authenticate yourself? You have few options.",
                    }
                }
            ]
        }],
        "/unknown": [{
            "type": "message",
            "text": "Am not sure what you said. Pick from one of the valid Commands",
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4()
        }, {
            "type": "message",
            "id": uuid.v4(),
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.ps.card.command",
                    "content": {
                        "title": "Available Commands",
                        "commands": [{
                            "identifier": "/help",
                            "description": "Helps you in the middle of a conversation"
                        }, {
                            "identifier": "/menu",
                            "description": "Lists the menu options"
                        }, {
                            "identifier": "/signin",
                            "description": "Sign-in and make more context sensitive conversations.."
                        }],
                        "subtitle": "Commands let you question me and blah blah blah",
                    }
                }
            ]
        }]
    };
};