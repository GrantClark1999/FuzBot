import TwitchClient from 'twitch';
import {
  PubSubListener,
  PubSubRedemptionMessage,
  SingleUserPubSubClient,
} from 'twitch-pubsub-client';
import { IpcMainEvent } from 'electron';
import CustomAuthProvider from './CustomAuthProvider';
import { fetchActiveToken } from '../../../../db/collections/channels';

// Handles PubSub to Twitch
let pubSubClient: SingleUserPubSubClient | undefined;
let listener: PubSubListener<PubSubRedemptionMessage> | undefined;

export async function subscribe(event: IpcMainEvent) {
  const token = await fetchActiveToken();
  const authProvider = new CustomAuthProvider(token);
  const twitchClient = new TwitchClient({ authProvider });
  pubSubClient = new SingleUserPubSubClient({ twitchClient });

  listener = await pubSubClient.onRedemption((message) => {
    const data = getData(message);
    event.reply('redemption', data);
  });
}

export function unsubscribe() {
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
