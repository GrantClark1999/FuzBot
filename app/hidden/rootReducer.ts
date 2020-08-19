/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import pubsubReducer from 'app/hidden/components/PubSub/pubsubSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    pubsub: pubsubReducer,
  });
}
