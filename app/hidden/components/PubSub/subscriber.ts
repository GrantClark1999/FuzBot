import TwitchClient from 'twitch';
import {
  PubSubListener,
  PubSubRedemptionMessage,
  SingleUserPubSubClient,
} from 'twitch-pubsub-client';
import { ipcRenderer } from 'electron';
import CustomAuthProvider from './CustomAuthProvider';

// Handles PubSub to Twitch
let twitchClient: TwitchClient | undefined;
let pubSubClient: SingleUserPubSubClient | undefined;
let listener: Promise<PubSubListener<PubSubRedemptionMessage>> | undefined;

export function subscribe() {
  const token = ipcRenderer.sendSync('fetchActiveToken');
  const authProvider = new CustomAuthProvider(token);
  twitchClient = new TwitchClient({ authProvider });
  pubSubClient = new SingleUserPubSubClient({ twitchClient, logLevel: 5 });

  listener = pubSubClient.onRedemption((message) => {
    const data = getData(message);
    ipcRenderer.send('redemption', data);
  });
}

export async function unsubscribe() {
  (await listener)?.remove();
  // Reset variables
  twitchClient = undefined;
  pubSubClient = undefined;
  ipcRenderer.send('unsubscribed');
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
