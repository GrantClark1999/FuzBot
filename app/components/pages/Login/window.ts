import { BrowserWindow as Window } from 'electron';
import login from './auth';
import { getLoginUrl, getRedirectUri } from './url';

const { remote } = require('electron');

let loginWindow: Window | null = null;

const loginUrl = getLoginUrl();

export default function createLoginWindow(): void {
  // Prevents multiple login windows
  if (loginWindow) {
    if (loginWindow.isMinimized()) loginWindow.restore();
    loginWindow.focus();
    return;
  }

  const mainWindow = remote.getCurrentWindow();

  loginWindow = new remote.BrowserWindow({
    width: 432,
    height: 372 + 40,
    minWidth: 432,
    minHeight: 372,
    // frame: false,
    titleBarStyle: 'hidden',
    show: false,
    webPreferences: {
      devTools: false,
    },
    parent: mainWindow,
  });

  loginWindow.removeMenu();
  loginWindow.loadURL(loginUrl);

  loginWindow.once('ready-to-show', () => {
    if (!loginWindow) {
      throw new Error('Unable to show "loginWindow"');
    }
    loginWindow.show();
    loginWindow.focus();
  });

  loginWindow.on('close', () => {
    loginWindow = null;
  });

  loginWindow.webContents.on('will-redirect', (event, url) => {
    // If we are redirected from Twitch's login page and need to get tokens.
    if (url.startsWith(getRedirectUri())) {
      event.preventDefault();
      login(url);
      loginWindow?.close();
    }
  });
}
