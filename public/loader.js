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
        widget.innerHTML = "<div id='widget-wrapping-div' style='height: " + widget.attributes.height.nodeValue + "; width: " + widget.attributes.width.nodeValue + "'>"+
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
                name: widget.dataset.title,
                description: widget.dataset.description,
            }
        }, remy.theme);
    }
}

window.remy = remy;