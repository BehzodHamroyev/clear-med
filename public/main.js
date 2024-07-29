const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 1300,
    height: 1000,
    webPreferences: {
      enableRemoteModules: true, // This is deprecated, use `contextIsolation` and `nodeIntegration` instead
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load your application
  win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Re-create a window if the app is activated and no windows are open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
