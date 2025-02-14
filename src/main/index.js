import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { Notification } from 'electron'

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 350,
    show: false,
    icon: __dirname + '/resources/Icons/favicon.ico',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createNoteWindow(color) {
  const noteWindow = new BrowserWindow({
    width: 400,
    height: 350,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false,
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    noteWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    noteWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  noteWindow.webContents.on('did-finish-load', () => {
    noteWindow.webContents.send('color-update', color);
  });
}

ipcMain.on('add-note', (event, color) => {
  
  if (!color || !color.colorBody) {
    return;
  } else {
    createNoteWindow(color)
  }
})

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron.sticky-note')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })

  if(Notification.isSupported()) {
    new Notification({title: 'Sticky Note', body: 'Notifications are enabled!'}).show();
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


