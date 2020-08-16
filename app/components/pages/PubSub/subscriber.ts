import TwitchClient, { AccessToken } from 'twitch';
import {
  PubSubListener,
  PubSubRedemptionMessage,
  SingleUserPubSubClient,
} from 'twitch-pubsub-client';
import EventEmitter from 'events';
import { ipcRenderer, remote } from 'electron';
import CustomAuthProvider from './CustomAuthProvider';

let pubSubClient: SingleUserPubSubClient | undefined;
let listener: PubSubListener<PubSubRedemptionMessage> | undefined;
let totalRedemptions = 0;

export async function subscribe(logAsReward?: boolean) {
  // Emitter for counting number of redemptions
  const emitter = new EventEmitter();

  emitter.on('redeemed', () => {
    totalRedemptions += 1;
    // Log only one redemption when redeeming to log rewards
    if (logAsReward) {
      unsubscribe();
      // Close the hidden window when not subscribing
      remote.getCurrentWindow().close();
    }
  });

  const tokens = <AccessToken>ipcRenderer.sendSync('fetchActiveTokens');
  const authProvider = new CustomAuthProvider(tokens);
  const twitchClient = new TwitchClient({ authProvider });
  pubSubClient = new SingleUserPubSubClient({ twitchClient });

  listener = await pubSubClient.onRedemption((message) => {
    // Call function to handle each channel reward
    const data = getData(message);
    if (logAsReward) {
      ipcRenderer.send('logReward', data);
    } else {
      ipcRenderer.send('logRedemption', data);
    }
    emitter.emit('redeemed');
  });
}

export function unsubscribe() {
  if (listener) pubSubClient?.removeListener(listener);
  // Reset variables
  pubSubClient = undefined;
  listener = undefined;
  const sessionTotal = totalRedemptions;
  totalRedemptions = 0;
  return sessionTotal;
}

/*
 * Note: eslint and ts-ignore are used here to extract the raw Twitch response
 * from the formatted PubSub message, which doesn't contain all relevant
 * data from the original Twitch response.
 */
function getData(message: PubSubRedemptionMessage) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return message._data;
}

export default {
  subscribe,
  unsubscribe,
};
