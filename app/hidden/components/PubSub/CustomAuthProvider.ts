import { ipcRenderer } from 'electron';
/* eslint-disable @typescript-eslint/lines-between-class-members */
import AuthProvider from 'twitch/lib/Auth/AuthProvider';
import AccessToken, { AccessTokenData } from 'twitch/lib/API/AccessToken';
import api from 'app/constants/api.json';
import auth from 'app/constants/auth.json';

export default class CustomAuthProvider implements AuthProvider {
  public readonly clientId = auth.CLIENT_ID;
  public readonly currentScopes = auth.LOGIN.SCOPES;
  private token: AccessToken;
  private tokenData: AccessTokenData;

  constructor(tokenData: AccessTokenData) {
    this.tokenData = tokenData;
    this.token = new AccessToken(tokenData);
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
    const newTokenData = await (
      await fetch(api.REFRESH_URL, {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: this.tokenData.refresh_token,
        }),
      })
    ).json();
    this.setAccessToken(newTokenData);
    this.tokenData = newTokenData;
    // Update database whenever new token is stored locally
    ipcRenderer.send('updateActive', newTokenData);
    return this.token;
  }

  /** @private */
  setAccessToken(token: AccessToken) {
    // Update locally stored token to minimize database accessing
    this.token = token;
  }
}
