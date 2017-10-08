export default () => {
    return {
        "quiz": {
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
                        "title": "Multiple Choice Question",
                        "text": [
                            "What is the answer to this question?",
                            "This is the second line to the quiz card..",
                        ],
                        "subtitle": "Choose from below list of answers",
                        "buttons": [
                            {
                                "type": "quizAnswers",
                                "title": "Answer A",
                                "value": "Answer A"
                            },
                            {
                                "type": "quizAnswers",
                                "title": "Answer B",
                                "value": "Answer B"
                            },
                            {
                                "type": "quizAnswers",
                                "title": "Answer C",
                                "value": "Answer C"
                            },
                            {
                                "type": "quizAnswers",
                                "title": "Answer D",
                                "value": "Answer D"
                            }
                        ]
                    }
                }
            ],
            "replyToId": "DRbdBQEFmKRDsaFOxRFPL0|0000011"
        },
        "code": {
            "type": "message",
            "id": "DRbdBQEFmKRDsaFOxRFPL0|0000015",
            "timestamp": "2017-09-27T10:13:25.5564836Z",
            "localTimestamp": "2017-09-27T10:13:25.756+00:00",
            "channelId": "webchat",
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
                    "contentType": "application/vnd.microsoft.card.code",
                    "content": {
                        "language": "javascript",
                        "code": [
                            "(function () {",
                            "   console.log('Hello, World!')",
                            "})();",
                        ]
                    }
                }
            ],
            "replyToId": "DRbdBQEFmKRDsaFOxRFPL0|0000011"
        }
    }
}