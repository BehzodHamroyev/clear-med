// const { app, BrowserWindow } = require('electron');

// function createWindow() {
//   // Create the browser window
//   const win = new BrowserWindow({
//     width: 1300,
//     height: 1000,
//     kiosk: true, // Kiosk modini yoqish
//     webPreferences: {
//       nodeIntegration: true, // Bu Electron ichida Node.js modullarini ishlatishga imkon beradi
//       contextIsolation: false, // Ushbu parametrni `true` qilish tavsiya etiladi, xavfsizlik uchun
//       // enableRemoteModules: true  // Bu eski parametr, ishlatish tavsiya etilmaydi
//     },
//   });

//   // Load your application
//   win.loadURL('http://localhost:3000'); // React ilovangiz `vite` orqali serve qilinmoqda
// }

// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// // Re-create a window if the app is activated and no windows are open.
// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });

const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    kiosk: true, // This makes the app full screen like kiosk mode
  });

  mainWindow.loadURL('http://localhost:5173'); // Or the file path

  // Add a shortcut to quit the application
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// Re-create a window if the app is activated and no windows are open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
