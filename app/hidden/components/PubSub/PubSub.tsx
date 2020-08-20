import React from 'react';
import { ipcRenderer } from 'electron';
import TwitchClient from 'twitch';
import {
  PubSubListener,
  PubSubRedemptionMessage,
  SingleUserPubSubClient,
} from 'twitch-pubsub-client';
import CustomAuthProvider from './CustomAuthProvider';

let twitchClient: TwitchClient | undefined;
let pubSubClient: SingleUserPubSubClient | undefined;
let listener: Promise<PubSubListener<PubSubRedemptionMessage>> | undefined;

export default function PubSub() {
  const token = ipcRenderer.sendSync('fetchActiveToken');
  const authProvider = new CustomAuthProvider(token);
  twitchClient = new TwitchClient({ authProvider });
  pubSubClient = new SingleUserPubSubClient({ twitchClient, logLevel: 5 });

  listener = pubSubClient.onRedemption((message) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    const data = message._data;
    ipcRenderer.send('newRedemption', data);
  });

  ipcRenderer.on('cleanupPubSub', async () => {
    (await listener)?.remove();
    // Reset variables
    twitchClient = undefined;
    pubSubClient = undefined;
    listener = undefined;
    window.close();
  });

  return <></>;
}
