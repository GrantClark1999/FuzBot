import { AccessToken } from 'twitch';
import { JWKS, JWT } from 'jose';
import { ipcRenderer } from 'electron';
import api from 'constants/api.json';
import { ChannelDoc } from '../../../../db/types';
import store from '../../../store';
import { loggingIn, loggedIn } from './authSlice';

type CodeResponse = {
  code: string;
  scope: string;
  nonce?: string;
  state?: string;
};

type DecodedIdToken = {
  aud?: string;
  exp?: string;
  iat?: string;
  iss?: string;
  sub?: string;
  azp?: string;
  picture?: string;
  preferred_username: string;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string[];
  id_token?: string;
  profile?: DecodedIdToken;
  token_type: 'bearer';
};

async function getTwitchPublicKeys() {
  const response = await (
    await fetch('https://id.twitch.tv/oauth2/keys')
  ).json();

  return JWKS.asKeyStore(response);
}

function decodeIdToken(token: string) {
  return <DecodedIdToken>JWT.decode(token);
}

function verifyIdToken(token: string) {
  getTwitchPublicKeys()
    .then((keys) => JWT.verify(token, keys))
    .catch(() => {
      throw new Error('Unable to get Twitch Public Keys');
    });
}

function getCodeFromUrl(url: string) {
  const { search } = new URL(url);

  const pieces = search.substr(1).split('&');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};

  pieces.forEach((pair) => {
    const parts = pair.split('=');
    if (parts.length < 2) parts.push('');
    const key = decodeURIComponent(parts[0]);
    const value = decodeURIComponent(parts[1]);
    data[key] = value;
  });

  return (<CodeResponse>data).code;
}

async function exchangeCodeForTokens(code: string) {
  const response = <TokenResponse>await (
    await fetch(api.EXCHANGE_URL, {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
  ).json();

  // JWT id token -> object
  const idToken = response.id_token;
  if (idToken) {
    verifyIdToken(idToken);
    response.profile = decodeIdToken(idToken);
  }

  return response;
}

async function getLoginDoc(url: string) {
  const code = getCodeFromUrl(url);
  const tokens = await exchangeCodeForTokens(code);
  const token = new AccessToken({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_in: tokens.expires_in,
    scope: tokens.scope,
  });
  return {
    channelId: tokens.profile?.sub || '',
    displayName: tokens.profile?.preferred_username || '',
    token,
    picture: tokens.profile?.picture || undefined,
  } as ChannelDoc;
}

export default async function login(url: string) {
  // Update Redux state to indicate we have submitted the login,
  // and we are processing it -> show loading screen
  store.dispatch(loggingIn());

  const channelDoc = await getLoginDoc(url);
  // Tell main process to process the log in request and store to DB
  ipcRenderer.send('login', channelDoc);

  // Update Redux state to indicate we have logged in
  const { displayName, picture } = channelDoc;
  store.dispatch(loggedIn({ displayName, picture }));
}
