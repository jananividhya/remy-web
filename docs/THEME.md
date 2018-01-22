### REMY THEME

Remy allows one to customize itself by exposing few stylesheet properties.
  
In Remy's words :
> When `humans` can wear different dresses why can't i

[Path to config](https://gitlab.com/purpleslate/ps-public/blob/master/src/theme/remy-dress.json)

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
  "baseColor": "#4D4344", // Background shade of the input bar
  "baseFontColor": "#212121", // Font color in the input bar
  "background": "#FFFFFF", // Background color of conversation panel
  "botConversationTheme": {
    "background": "#F6F1E5", // Bot response bubble color
    "color": "#212121" // Bot response font color
  },
  "humanConversationTheme": {
    "background": "#AA9374", // User response bubble color
    "color": "#F6F1E5" // User response font color
  }
}
```

#### How to update the config through Gitlab

1. Login to Gitlab using your PurpleSlate Google account.
2. Edit [Remy's Dress](https://gitlab.com/purpleslate/ps-public/edit/master/src/theme/remy-dress.json)
3. Change the desired properties, provide appropriate `commit message` and commit the changes.

After the end of Step 3 a CD job will be triggered which will deploy the latest changes to Demo.
 