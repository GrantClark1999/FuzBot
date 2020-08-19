import TwitchClient from 'twitch';
import {
  PubSubListener,
  PubSubRedemptionMessage,
  SingleUserPubSubClient,
} from 'twitch-pubsub-client';
import { ipcRenderer } from 'electron';
import CustomAuthProvider from './CustomAuthProvider';
import store from '../../../store';
import { setRedemption, clearRedemption } from './pubsubSlice';

// Handles PubSub to Twitch
let pubSubClient: SingleUserPubSubClient | undefined;
let listener: PubSubListener<PubSubRedemptionMessage> | undefined;

export async function subscribe() {
  console.log('SUBSCRIBING');
  const token = ipcRenderer.sendSync('fetchActiveToken');
  const authProvider = new CustomAuthProvider(token);
  const twitchClient = new TwitchClient({ authProvider });
  pubSubClient = new SingleUserPubSubClient({ twitchClient, logLevel: 5 });

  listener = await pubSubClient.onRedemption((message) => {
    const data = getData(message);
    store.dispatch(setRedemption(data));
  });
}

export function unsubscribe() {
  store.dispatch(clearRedemption());
  if (listener) pubSubClient?.removeListener(listener);
  // Reset variables
  pubSubClient = undefined;
  listener = undefined;
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
