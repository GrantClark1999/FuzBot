/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import install, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './visible/menu';
import loadDb from '../db';

require('dotenv').config();

loadDb();

app.allowRendererProcessReuse = false;

let visibleWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  try {
    await install(REACT_DEVELOPER_TOOLS, forceDownload);
    console.log(`Added React Developer Tools extension`);
  } catch (err) {
    console.log('Error when adding React Developer Tools extension: ', err);
  }

  try {
    await install(REDUX_DEVTOOLS, forceDownload);
    console.log(`Added Redux DevTools extension`);
  } catch (err) {
    console.log('Error when adding Redux DevTools extension: ', err);
  }
};

const createVisibleWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  visibleWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/visible.renderer.prod.js'),
          },
  });

  visibleWindow.loadURL(`file://${__dirname}/visible/app.html`);

  visibleWindow.once('ready-to-show', () => {
    if (!visibleWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      visibleWindow.minimize();
    } else {
      visibleWindow.show();
      visibleWindow.focus();
    }
  });

  visibleWindow.on('closed', () => {
    visibleWindow = null;
    app.quit();
  });

  const menuBuilder = new MenuBuilder(visibleWindow);
  menuBuilder.buildMenu();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createVisibleWindow);
} else {
  app.on('ready', createVisibleWindow);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (visibleWindow === null) createVisibleWindow();
});

/**
 * PubSub Window
 */

let hiddenWindow: BrowserWindow | null = null;

function createPubSubWindow() {
  // Prevents multiple login windows
  if (hiddenWindow) return;

  console.log('Creating new window');

  hiddenWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  hiddenWindow.loadURL(`file://${__dirname}/hidden/app.html`);

  hiddenWindow.once('ready-to-show', () => {
    if (!hiddenWindow) {
      throw new Error('Unable to load PubSub window');
    }
    // TODO: REMOVE LATER ONCE FUNCTIONAL
    hiddenWindow.show();
  });

  hiddenWindow.on('close', () => {
    hiddenWindow = null;
  });
}

ipcMain.on('subscribe', () => {
  console.log(`Current PubSub Window: ${hiddenWindow}`);
  console.log('Create PubSub Window');
  createPubSubWindow();
});

ipcMain.on('unsubscribe', () => {
  hiddenWindow?.webContents.send('cleanupPubSub');
});

ipcMain.on('newRedemption', (_event, redemption) => {
  visibleWindow?.webContents.send('redemption', redemption);
});
