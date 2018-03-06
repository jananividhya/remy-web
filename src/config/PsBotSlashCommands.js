const uuid = require('uuid');

const slashCommands = {
    "/help": [{
        "type": "message",
        "text": "**We** are here to help you :package:",
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
        "text": "This is a non-formatted message.",
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
                "contentType": "application/vnd.ps.card.anonymousLogin",
                "content": {
                    "title": "Hey, there!",
                    "subtitle": "My name is Remy. And you are..."
                }
            }
        ]
    }],
    "/hello": [{
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
                "contentType": "application/vnd.ps.card.anonymousLogin",
                "content": {
                    "title": "Hey, there!",
                    "subtitle": "My name is Remy. And you are...",
                    "images": [
                        {
                            "url": "https://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg"
                        }
                    ]
                }
            }
        ]
    }],
    "/ga": [{
        "type": "message",
        "id": "CjVKDZid96YJs54JWXCowG|0000003",
        "timestamp": "2018-01-10T03:03:44.3566538Z",
        "localTimestamp": "2018-01-10T03:03:43.965+00:00",
        "channelId": "directline",
        "from": {
          "id": "psbot-demo",
          "name": "psbot-demo"
        },
        "conversation": {
          "id": "CjVKDZid96YJs54JWXCowG"
        },
        "locale": "en-US",
        "text": "You are in Google Analytics App",
        "inputHint": "ignoringInput",
        "replyToId": "CjVKDZid96YJs54JWXCowG|0000002"
      },
      {
        "type": "message",
        "id": "CjVKDZid96YJs54JWXCowG|0000004",
        "timestamp": "2018-01-10T03:03:45.0182875Z",
        "localTimestamp": "2018-01-10T03:03:44.803+00:00",
        "channelId": "directline",
        "from": {
          "id": "psbot-demo",
          "name": "psbot-demo"
        },
        "conversation": {
          "id": "CjVKDZid96YJs54JWXCowG"
        },
        "locale": "en-US",
        "text": "You can get to know the usage details, user details and exception details of your website",
        "inputHint": "ignoringInput",
        "replyToId": "CjVKDZid96YJs54JWXCowG|0000002"
      },
      {
        "type": "message",
        "id": "CjVKDZid96YJs54JWXCowG|0000005",
        "timestamp": "2018-01-10T03:03:45.6611235Z",
        "localTimestamp": "2018-01-10T03:03:45.452+00:00",
        "channelId": "directline",
        "from": {
          "id": "psbot-demo",
          "name": "psbot-demo"
        },
        "conversation": {
          "id": "CjVKDZid96YJs54JWXCowG"
        },
        "locale": "en-US",
        "text": "You can ask questions like ```what is the usage today?```",
        "inputHint": "ignoringInput",
        "replyToId": "CjVKDZid96YJs54JWXCowG|0000002"
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
        "text": "I am Remy 👨‍🍳 , your anytime learning companion.",
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
        "text": "Help me know you better. :smile:",
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
                        },
                        {
                            "type": "googleSignIn",
                            "title": "Google",
                            "value": "/signin-with-google"
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
    "/quiz-response": [{
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
    "/image-card": [{
        "type": "message",
        "text": "This will **show** you all the components that are available :smile:",
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
            "id": "psbot-demo",
            "name": "psbot-demo"
        },
        "locale": "en-US",
        "inputHint": "ignoringInput",
        "attachments": [
            {
                "contentType": "image/png",
                "contentUrl": "https://avatars3.githubusercontent.com/u/6422482?s%3D400%26v%3D4",
            }
        ],
    }],
    "/components": [{
        "type": "message",
        "text": "This will *show* you all the components that are available :smile:",
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
        "text": "hi",
        "from": {
            "id": "default-user",
            "name": "User",
            "channelId": "webchat"
        },
        "address": {
            channelId: 'PSClient',
            user: { id: 'default-user', name: 'User' },
        },
        "channelId": "webchat",
        "locale": "en-US",
        'localTimestamp': Date.now(),
        "textFormat": "plain",
        "timestamp": new Date(),
        "id": "1253e4ba-90d7-435b-95bf-8f2ad30441c9"
    }, {
        "type": "message",
        "id": "1234",
        "timestamp": Date.now(),
        "localTimestamp": Date.now(),
        "from": {
            "id": "fiercebadlands",
            "name": "fiercebadlands"
        },
        "locale": "en-US",
        "inputHint": "ignoringInput",
        "text": "abc",
        "attachments": [
            {
            "contentType": "application/vnd.microsoft.card.hero",
            "content": {
                "title": "Question No : 4",
                "subtitle": "Where was the first Railroad of India constructed?",
                "text": "\nYour Answer : Hyderabad to Secunderabad\n\nCorrect Answer : Bombay to Thane\n\nObtained Score : -1\n\n",
                "images": [
                    {
                        "url": "https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg"
                    }
                ],
                "buttons": [
                    {
                        "type": "openUrl",
                        "title": "Answer A",
                        "value": "Answer A"
                    },
                    {
                        "type": "openUrl",
                        "title": "Answer B",
                        "value": "Answer B"
                    },
                    {
                        "type": "openUrl",
                        "title": "Answer C",
                        "value": "Answer C"
                    },
                    {
                        "type": "openUrl",
                        "title": "Answer D",
                        "value": "Answer D"
                    }
                ]
            }
        }]
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
                "contentType": "application/vnd.microsoft.card.hero",
                "content": {
                    "title": "Question No : 1",
                    "subtitle": "Who was the first _*Nobel winner*_ from India?",
                    "text": "\nYour Answer : _Kailash Satyarthi_\n\nCorrect Answer : Rabindranath Tagore\n\n_*Obtained Score*_ : -1\n\n",
                }
            }
        ],
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
    }]
};

export default () => {
    return slashCommands
};