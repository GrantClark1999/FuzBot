import { BrowserWindow as Window } from 'electron';
import routes from 'constants/routes.json';
import { subscribe, unsubscribe } from './subscriber';

const { BrowserWindow } = require('electron').remote;

let pubSubWindow: Window | undefined;

export function createPubSubWindow(logAsReward?: boolean): void {
  // Prevents multiple pubsubs from being launched.
  if (pubSubWindow) return;

  pubSubWindow = new BrowserWindow({ show: false });

  // loads empty html
  pubSubWindow.loadFile(`../../../index.html#${routes.PUBSUB}`);

  pubSubWindow.once('ready-to-show', () => {
    if (!pubSubWindow) {
      throw new Error('Unable to load PubSub window');
    }
    subscribe(logAsReward);
  });

  pubSubWindow.on('close', () => {
    pubSubWindow = undefined;
  });
}

export function closePubSubWindow() {
  unsubscribe();
  pubSubWindow?.close();
}

export default {
  createPubSubWindow,
  closePubSubWindow,
};
