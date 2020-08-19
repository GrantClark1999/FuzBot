import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../../store';
import routes from '../../constants/routes.json';
import App from './App';
import PubSub from './PubSub/PubSub';

type Props = {
  store: Store;
  history: History;
};

// function getView(search: string) {
//   const searchValue = search.startsWith('?') ? search.substr(1) : search;
//   if (searchValue === 'pubsub') {
//     return PubSub;
//   }
//   return App;
// }

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history} noInitialPop>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
