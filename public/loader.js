let remy = {
    theme: {},
};

const remyWidget = document.getElementsByClassName('remy-widget');

const allowedProperties = [
    "hideHeader",
    "hideBotpaper",
    "hideInput",
    "startText"
];

for (const widget of remyWidget) {
    if (widget.nodeName === 'remy'.toUpperCase()) {
        var paddingLeft = widget.attributes.paddingLeft ? widget.attributes.paddingLeft.nodeValue : 0;
        var left = widget.attributes.left ? widget.attributes.left.nodeValue : 0;
        widget.innerHTML = "<div id='widget-wrapping-div' style='height: " + widget.attributes.height.nodeValue + "; width: " + widget.attributes.width.nodeValue + "; padding-left: "+ paddingLeft +";'>"+
                            "<iframe "+
                            "id='testFrame'" +
                            "src='" + widget.dataset.url + "'" +
                            "height='100%'"+
                            "width='100%'"+
                            "frameborder=0></iframe></div>";

        remy.theme = Object.assign({
            hideHeader: widget.dataset.hideHeader,
            hideBotpaper: widget.dataset.hideBotpaper,
            hideInput: widget.dataset.hideInput,
            startText: widget.dataset.startText,
            botDetails: {
                name: widget.dataset.title || "Remy",
                description: widget.dataset.description || "Some things you can ask me..",
            },
            title: "Remy 👨‍🍳 ",
            navbar: {
              appBar: {
                background: "#FFFFFF"
              },
              logo: {
                imageUrl: "psbot-logo.png"
              }
            },
            termsOfService: {
              text: "pS Terms of Service",
              link: "https://purpleslate.io"
            },
            baseColor: "#97B44D",
            baseFontColor: "#0D222F",
            background: "#FFFFFF",
            botConversationTheme: {
              background: "#FAFDFF",
              color: "#091720"
            },
            humanConversationTheme: {
              background: "#0AA4DC",
              color: "#F4F6F8"
            },
            thinkingImg: "ezgif.com-crop.gif"
        }, remy.theme);
    }
}

window.remy = remy;
