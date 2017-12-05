const uuid = require('uuid');

const slashCommands = {
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
        "text": "I am purpleBot, your anytime learning companion.",
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
        "text": "Help me know you better.",
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
                "contentType": "application/vnd.ps.card.signin",
                "content": {
                    "title": "Sign-in to purpleSlate",
                    "text": [
                        "You have few options.",
                    ],
                    "subtitle": "How do you want to authenticate yourself?",
                    "choices": [
                        {
                            "type": "fbSignIn",
                            "title": "Facebook",
                            "value": "/signin-with-fb"
                        }
                    ]
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
    }],
    "/signinwithps": [
        {
            "type": "message",
            "text": "Let's sign in with purpleSlate",
            "from": {
                "id": "localbot",
                "name": "localbot"
            },
            "locale": "en-US",
            'localTimestamp': Date.now(),
            "textFormat": "plain",
            "timestamp": new Date(),
            "id": uuid.v4(),
            "nextConversation": [{
                "type": "message",
                "text": "Please enter your user name",
                "from": {
                    "id": "localbot",
                    "name": "localbot"
                },
                "locale": "en-US",
                'localTimestamp': Date.now(),
                "textFormat": "plain",
                "timestamp": new Date(),
                "id": uuid.v4(),
                "doesExpectInput": true,
                "inputType": "text",
                "action": {
                    "type": "saveLocal",
                    "value": "_userId", 
                },
                "nextConversation": [{
                    "type": "message",
                    "text": "Please enter your password",
                    "from": {
                        "id": "localbot",
                        "name": "localbot"
                    },
                    "locale": "en-US",
                    'localTimestamp': Date.now(),
                    "textFormat": "plain",
                    "timestamp": new Date(),
                    "id": uuid.v4(),
                    "doesExpectInput": true,
                    "inputType": "password",
                    "action": {
                        "type": "saveLocal",
                        "value": "_password", 
                        "submitToServer": true,
                        "submitParams": ["_user", "_password"],
                        "serviceAPI": "http://foo.bar/sign-in",
                    }
                }]
            }] 
        }
    ],
    "/quiz-card": [{
        "type": "message",
        "id": "DRbdBQEFmKRDsaFOxRFPL0|0000015",
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
                "contentType": "application/vnd.microsoft.card.quiz",
                "content": {
                    "title": "Multiple Choice Question",
                    "allowedTime": 20000,
                    "text": [
                        "What is the answer to this question?\n\nThis is the second line to the quiz card..",
                        "This is the actual second line",
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
                        }
                    ]
                }
            }
        ],
    }],
    "/signin-with-fb": [{
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
                "contentType": "application/vnd.ps.card.signin.fb",
            }
        ],
    }],
    "/signin-with-google": [{
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
                "contentType": "application/vnd.ps.card.signin.google",
            }
        ],
    }],
    "/local-test": [{
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
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Your total score 1",
                    "subtitle": "Scroll through for individual questions details"
                }
            },
            {
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 1",
                    "subtitle": "Who was the first Nobel winner from India?",
                    "text": "\nYour Answer : Kailash Satyarthi\n\nCorrect Answer : Rabindranath Tagore\n\nObtained Score : -1\n\n",
                    "images": [
                        {
                            "url": "https://fierce-badlands-72686.herokuapp.com/images/wrong.png"
                        }
                    ]
                }
            },
            {
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 2",
                    "subtitle": "Who wrote the constitution of India?",
                    "text": "\nYour Answer : Gandhi\n\nCorrect Answer : Ambedkar\n\nObtained Score : -1\n\n",
                    "images": [
                        {
                            "url": "https://fierce-badlands-72686.herokuapp.com/images/wrong.png"
                        }
                    ]
                }
            },
            {
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 3",
                    "subtitle": "Which President of India served the longest?",
                    "text": "\nCorrect Answer : Rajendra Prasad\n\nObtained Score : 2\n\n",
                    "images": [
                        {
                            "url": "https://fierce-badlands-72686.herokuapp.com/images/right.png"
                        }
                    ]
                }
            },
            {
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 4",
                    "subtitle": "Where was the first Railroad of India constructed?",
                    "text": "\nYour Answer : Hyderabad to Secunderabad\n\nCorrect Answer : Bombay to Thane\n\nObtained Score : -1\n\n",
                    "images": [
                        {
                            "url": "https://fierce-badlands-72686.herokuapp.com/images/wrong.png"
                        }
                    ]
                }
            },
            {
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 5",
                    "subtitle": "What is the capital of India?",
                    "text": "\nCorrect Answer : Delhi\n\nObtained Score : 2\n\n",
                    "images": [
                        {
                            "url": "https://fierce-badlands-72686.herokuapp.com/images/right.png"
                        }
                    ]
                }
            }
        ],
    }],
};

export default () => {
    return slashCommands
};