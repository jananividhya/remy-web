const uuid = require('uuid');

const PsErr = {
    "unableToConnect": [{
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
                "contentType": "image/png",
                "contentUrl": "https://m.popkey.co/93fb88/Z0e5O.gif",
                "fetchImg": false
            }
        ]
    }, {
        "type": "message",
        "text": "Am so sorry :disappointed:",
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
        "text": "I did not anticipate this to happen.",
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
        "text": "Please try again later.",
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
    "serverError": [{
        "type": "message",
        "text": "Am unable to connect to the server right now.",
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
        "text": " I have notified the support about this incident and they will try their best to analyze and resolve this issue.",
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
        "text": "Please start a new conversation.",
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
};

export default PsErr;