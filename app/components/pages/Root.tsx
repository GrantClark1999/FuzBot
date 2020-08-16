import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { HashRouter, Route } from 'react-router-dom';
import routes from 'constants/routes.json';
import { Store } from '../../store';
import App from './App';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter>
        <Route exact path={routes.PUBSUB}>
          <></>
        </Route>
        <Route path={routes.DEFAULT}>
          <App />
        </Route>
      </HashRouter>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
