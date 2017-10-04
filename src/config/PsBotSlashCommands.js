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
            "channelData": {
                "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
            },
            "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
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
            "channelData": {
                "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
            },
            "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
        }],
        "/menu": [{
            "type": "message",
            "id": "DRbdBQEFmKRDsaFOxRFPL0|0000015",
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "conversation": {
                "id": "DRbdBQEFmKRDsaFOxRFPL0"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.quiz",
                    "content": {
                        "title": "Available Commands",
                        "text": [
                            "/help - Helps you in the middle of a conversation",
                            "/menu - Lists the menu options",
                            "/signin - Sign-in and make more context sensitive conversations..",
                        ],
                        "subtitle": "Commands let you question me and blah blah blah",
                    }
                }
            ],
            "replyToId": "DRbdBQEFmKRDsaFOxRFPL0|0000011"
        }],
        "/signin": [{
            "type": "message",
            "id": "DRbdBQEFmKRDsaFOxRFPL0|0000015",
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "conversation": {
                "id": "DRbdBQEFmKRDsaFOxRFPL0"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.quiz",
                    "content": {
                        "title": "Available Commands",
                        "text": [
                            "/help - Helps you in the middle of a conversation",
                            "/menu - Lists the menu options",
                            "/signin - Sign-in and make more context sensitive conversations..",
                        ],
                        "subtitle": "Commands let you question me and blah blah blah",
                    }
                }
            ],
            "replyToId": "DRbdBQEFmKRDsaFOxRFPL0|0000011"
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
            "channelData": {
                "clientActivityId": "31a9cca1-0245-47f1-9889-5aebd49ccbbf"
            },
            "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
        }, {
            "type": "message",
            "id": "DRbdBQEFmKRDsaFOxRFPL0|0000015",
            "timestamp": Date.now(),
            "localTimestamp": Date.now(),
            "from": {
                "id": "fiercebadlands",
                "name": "fiercebadlands"
            },
            "conversation": {
                "id": "DRbdBQEFmKRDsaFOxRFPL0"
            },
            "locale": "en-US",
            "inputHint": "ignoringInput",
            "attachments": [
                {
                    "contentType": "application/vnd.microsoft.card.quiz",
                    "content": {
                        "title": "Available Commands",
                        "text": [
                            "/help - Helps you in the middle of a conversation",
                            "/menu - Lists the menu options",
                            "/signin - Sign-in and make more context sensitive conversations..",
                        ],
                        "subtitle": "Commands let you question me and blah blah blah",
                    }
                }
            ],
            "replyToId": "DRbdBQEFmKRDsaFOxRFPL0|0000011"
        }]
    };
};