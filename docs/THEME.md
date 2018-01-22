### REMY THEME

Remy allows one to customize itself by exposing few stylesheet properties.
  
In Remy's words :
> When `humans` can wear different dresses why can't i

```javascript
{
  "title": "Remy 👨‍🍳 ", // Title of the client as it appears on the browser window
  "navbar": {
    "appBar": {
      "background": "#FFFFFF" // Navbar background color
    },
    "logo": {
      "imageUrl": "psbot-logo.png" // Navbar logo image reference (can be external URL as well)
    }
  },
  "botDetails": {
    "name": "Remy 👨‍🍳 ", // Name of the client
    "description": "Some things you can ask me.." // Description of Remy context
  },
  "termsOfService": {
    "text": "pS Terms of Service", // Terms of service text
    "link": "http://purpleslate.in" // Terms of service external URL
  },
  "baseColor": "#EEEDEE", // Background shade of the input bar
  "baseFontColor": "#212121", // Font color in the input bar
  "background": "#FFFFFF", // Background color of conversation panel
  "botConversationTheme": {
    "background": "#9A69B2", // Bot response bubble color
    "color": "#FFFFFF" // Bot response font color
  },
  "humanConversationTheme": {
    "background": "#EEEDEE", // User response bubble color
    "color": "#212121" // User response font color
  }
}
```