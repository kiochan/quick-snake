const { app, BrowserWindow } = require('electron')
s
function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html')
}

app.on('ready', createWindow)
