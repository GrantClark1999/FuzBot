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
import routes from './constants/routes.json';
import MenuBuilder from './menu';
import loadDb from '../db';

require('dotenv').config();

loadDb();

app.allowRendererProcessReuse = false;

let mainWindow: BrowserWindow | null = null;

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

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
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
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
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
  app.whenReady().then(createWindow);
} else {
  app.on('ready', createWindow);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

/**
 * PubSub Window
 */

let pubSubWindow: BrowserWindow | null = null;

ipcMain.on('subscribe', () => {
  // Prevents multiple pubsubs from being launched.
  if (pubSubWindow) return;

  pubSubWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  pubSubWindow.loadFile(`index.html`);

  pubSubWindow.once('ready-to-show', () => {
    if (!pubSubWindow) {
      throw new Error('Unable to load PubSub window');
    }
    // pubSubWindow.show();
  });

  pubSubWindow.on('closed', () => {
    pubSubWindow = null;
  });
});

ipcMain.on('unsubscribe', () => {
  pubSubWindow?.close();
});
