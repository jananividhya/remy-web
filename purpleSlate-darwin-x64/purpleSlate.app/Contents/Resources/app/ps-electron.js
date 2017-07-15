// ./main.js
const {app, BrowserWindow} = require('electron')

let win = null;

function createWindow() {
    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 642, height: 630});

    // Specify entry point
    win.loadURL('https://public-ps-bot.herokuapp.com/');

    // Show dev tools
    // Remove this line before distributing
    //win.webContents.openDevTools();

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