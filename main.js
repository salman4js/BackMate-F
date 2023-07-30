const {app, BrowserWindow, ipcMain, Notification, dialog} = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow(){
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "white",
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
            //nodeIntegrationInWorker: true,
            //nodeIntegrationInSubFrames: true
        }
    })

    win.loadFile('index.html');
}

if(isDev){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })    
}

// Send desktop notification by this event!
ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

// Open the file explorer by this event!
ipcMain.on('select-folder', (event) => {
  const window = BrowserWindow.getFocusedWindow();
  
  dialog.showOpenDialog(window, {
    properties: ['openDirectory'],
  })
  .then(result => {
      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        // Send the folderPath back to the renderer process
        event.reply('selected-folder', folderPath);
      }
  })
  .catch(err => {
    // Error handling!
  })
})


app.whenReady().then(createWindow)