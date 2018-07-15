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
            loginAnonymously: widget.dataset.loginAnonymously,
            botDetails: {
                name: widget.dataset.title || "Remy",
                description: widget.dataset.description || "Some things you can ask me..",
            },
            title: widget.dataset.title || "Remy 👨‍🍳 ",
            navbar: {
              background: widget.dataset.navbarBackground || "#16738A",
              logo: {
                imageUrl: widget.dataset.navbarLogo || "Arrow Color Bg@5x.png"
              }
            },
            termsOfService: {
              text: widget.dataset.termsText || "pS Terms of Service",
              link: widget.dataset.termsUrl ||"https://purpleslate.io"
            },
            baseColor: widget.dataset.basecolor || "#13A948",
            baseFontColor: widget.dataset.fontBasecolor || "#093332",
            background: widget.dataset.background || "#FFFFFF",
            botConversationTheme: {
              background: widget.dataset.botbubbleBackground || "#F2F4F3",
              color: widget.dataset.botbubbleColor || "#093332",
              card: {
                title: {
                    fontSize: widget.dataset.cardtitleFontsize || "18px"
                }
              }
            },
            poweredBy: {
              fontSize: widget.dataset.poweredbyFont || "11px",
              text: widget.dataset.poweredbyText || "purpleSlate",
              url: widget.dataset.poweredbyUrl || "https://purpleslate.io"
            },
            humanConversationTheme: {
              background: widget.dataset.userbubbleBackground || "#2B9F8E",
              color: widget.dataset.userbubbleColor || "#FFFFFF"
            },
            thinkingImg: widget.dataset.thinking || "ezgif.com-crop.gif",
            messageBar: {
              background: widget.dataset.messagebarColor || "#FFFFFF"
            }
        }, remy.theme);
    }
}

window.remy = remy;
