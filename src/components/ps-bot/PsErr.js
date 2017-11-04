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
                "contentUrl": "server-error.png",
                "fetchImg": false
            }
        ]
    }, {
        "type": "message",
        "text": "Am so sorry.",
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
};

export default PsErr;