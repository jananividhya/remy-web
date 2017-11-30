// ./main.js
const {app, BrowserWindow} = require('electron');

let win = null;

function createWindow() {
    // Initialize the window to our specified dimensions
    win = new BrowserWindow({
        width: 600,
        height: 900,
        resizable: false,
        scrollable: false
    });

    // Specify entry point
    win.loadURL('http://localhost:3000');
    //win.loadURL('https://public-ps-bot.herokuapp.com');

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });
}


app.on('ready', function () {

    createWindow();

});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});