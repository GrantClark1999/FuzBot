/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from 'app/visible/components/pages/Login/authSlice';
import rewardsReducer from 'app/visible/components/pages/Rewards/rewardsSlice';
import pubsubReducer from 'app/hidden/components/PubSub/pubsubSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    rewards: rewardsReducer,
    pubsub: pubsubReducer,
  });
}
