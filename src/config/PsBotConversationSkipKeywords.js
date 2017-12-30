const skipConversationKeywords = [
    /args received$/i,
    /Intent Received$/i,
    /Entities Received$/i,
    /Entities Filled up with$/i,
    /Chosen Subject$/i,
    /start quiz$/i,
];

export default () => {
    return skipConversationKeywords;
};