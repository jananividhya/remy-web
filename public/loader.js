let remy = {
    theme: {},
};

const remyWidget = document.getElementsByClassName('remy-widget');

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
            title: widget.dataset.title || "Remy 👨‍🍳 ",
            navbar: {
              appBar: {
                background: widget.dataset.navbarBackground || "#459BE3"
              },
              logo: {
                imageUrl: widget.dataset.navbarLogo || "psCUI.png"
              }
            },
            termsOfService: {
              text: widget.dataset.termsText || "pS Terms of Service",
              link: widget.dataset.termsUrl ||"https://purpleslate.io"
            },
            baseColor: widget.dataset.basecolor || "#97B44D",
            baseFontColor: widget.dataset.fontBasecolor || "#0D222F",
            background: widget.dataset.background || "#FFFFFF",
            botConversationTheme: {
              background: widget.dataset.botbubbleBackground || "#FAFDFF",
              color: widget.dataset.botbubbleColor || "#091720",
              card: {
                title: {
                    fontSize: widget.dataset.cardtitleFontsize || "20px"
                }
              }
            },
            "poweredBy": {
              "fontSize": widget.dataset.poweredbyFont || "13px",
              "text": widget.dataset.poweredbyText || "purpleSlate",
              "url": widget.dataset.poweredbyUrl || "https://purpleslate.io"
            },
            humanConversationTheme: {
              background: widget.dataset.userbubbleBackground || "#41A6DB",
              color: widget.dataset.userbubbleColor || "#F4F6F8"
            },
            thinkingImg: widget.dataset.thinking || "ezgif.com-crop.gif"
        }, remy.theme);
    }
}

window.remy = remy;
