/* eslint-disable @typescript-eslint/lines-between-class-members */
import AuthProvider from 'twitch/lib/Auth/AuthProvider';
import api from 'constants/api.json';
import auth from 'constants/auth.json';
import AccessToken, { AccessTokenData } from 'twitch/lib/API/AccessToken';
import { ipcRenderer } from 'electron';

function formatResponse(tokenData: AccessTokenData) {
  return new AccessToken(tokenData);
}

export default class CustomAuthProvider implements AuthProvider {
  public readonly clientId = auth.CLIENT_ID;
  public readonly currentScopes = auth.LOGIN.SCOPES;
  private token: AccessToken;

  constructor(token: AccessToken) {
    this.token = token;
  }

  public async getAccessToken() {
    // If token has not expired, don't refresh
    if (!this.token.isExpired) {
      return this.token;
    }
    // Otherwise, refresh the token
    return this.refresh();
  }

  /** @private */
  async refresh() {
    const response = await (
      await fetch(api.PUBSUB_URL, {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: this.token.refreshToken,
        }),
      })
    ).json();
    const tokenData = formatResponse(response);
    this.setAccessToken(tokenData);
    return tokenData;
  }

  /** @private */
  setAccessToken(token: AccessToken) {
    // Update locally stored token to minimize database accessing
    this.token = token;
    // Update database whenever new token is stored locally
    ipcRenderer.send('updateActive', token);
  }
}
