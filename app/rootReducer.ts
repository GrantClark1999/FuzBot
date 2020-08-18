/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer from 'components/pages/Login/authSlice';
import rewardsReducer from 'components/pages/Rewards/rewardsSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    rewards: rewardsReducer,
  });
}
