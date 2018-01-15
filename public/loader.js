let remy = {
    theme: {},
};

const remyWidget = document.getElementsByClassName('remy-widget');

for (const widget of remyWidget) {
    if (widget.nodeName === 'remy'.toUpperCase()) {
        widget.innerHTML = "<div id='widget-wrapping-div' style='height: " + widget.attributes.height.nodeValue + "; width: " + widget.attributes.width.nodeValue + "'>"+
                            "<iframe "+
                            "id='testFrame'" +
                            "src='" + widget.dataset.url + "'" +
                            "height='100%'"+
                            "width='100%'"+
                            "frameborder=0></iframe></div>";
    }
}

window.remy = remy;