import portfinder from 'portfinder';
import auth from 'app/visible/constants/auth.json';

let redirect = auth.REDIRECT_URI_DEFAULT;

portfinder
  .getPortPromise({
    port: auth.LOWEST_PORT,
    stopPort: auth.HIGHEST_PORT,
  })
  .then((port) => {
    if (port !== auth.LOWEST_PORT) {
      redirect = `${auth.REDIRECT_URI_BASE}:${port}${auth.REDIRECT_URI_PATH}`;
    }
    return redirect;
  })
  .catch((error) => {
    throw new Error(
      `Ports in range [${auth.LOWEST_PORT}, ${auth.HIGHEST_PORT}] unavailable. Error: ${error}`
    );
  });

export function getRedirectUri() {
  return redirect;
}

export function getLoginUrl() {
  const baseUrl = auth.LOGIN.BASE_URL;
  const clientId = `client_id=${auth.CLIENT_ID}`;
  const redirectUri = `redirect_uri=${redirect}`;
  const responseType = `response_type=${auth.LOGIN.RESPONSE_TYPE}`;
  const scopes = `scope=${auth.LOGIN.SCOPES.join('+')}`;
  const claims = `claims=${JSON.stringify(auth.LOGIN.CLAIMS)}`;

  const queryParams = [
    clientId,
    redirectUri,
    responseType,
    scopes,
    claims,
  ].join('&');
  return [baseUrl, queryParams].join('?');
}

export default {
  getLoginUrl,
};
