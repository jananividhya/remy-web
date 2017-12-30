const skipConversationKeywords = [
    "args received",
    "Intent Received",
    "Entities Received",
    "Entities Filled up with",
    "Chosen Subject",
    "start quiz ",
];

export default () => {
    return skipConversationKeywords;
};