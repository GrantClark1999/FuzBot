import { createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';
import { RewardDoc } from '../../../../db/types';

type Payload<T> = {
  payload: T;
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    rewardList: [] as RewardDoc[],
  },
  reducers: {
    setInitialState: (state, { payload }: Payload<RewardDoc[]>) => {
      const compare = (a: RewardDoc, b: RewardDoc) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        throw new Error('Stored Reward Docs have identical positions!');
      };
      payload.sort(compare);
      state.rewardList = payload;
    },
    addReward: (state, { payload }: Payload<RewardDoc>) => {
      payload.position = state.rewardList.length;
      state.rewardList.push(payload);
      ipcRenderer.send('logReward', payload);
    },
    removeReward: (state, { payload }: Payload<RewardDoc>) => {
      const index = state.rewardList.indexOf(payload);
      state.rewardList.splice(index, 1);
      ipcRenderer.send('updateRewardOrder', state.rewardList);
    },
    updateRewardOrder: (state, { payload }: Payload<RewardDoc[]>) => {
      // Correct position property for each reward before setting state/storing.
      const rewardsWithCorrectPos = [...payload];
      for (let i = 0; i < rewardsWithCorrectPos.length; i += 1) {
        rewardsWithCorrectPos[i].position = i;
      }
      state.rewardList = rewardsWithCorrectPos;
      ipcRenderer.send('updateRewardOrder');
    },
  },
});

export const {
  setInitialState,
  addReward,
  removeReward,
  updateRewardOrder,
} = rewardsSlice.actions;

export const initRewardData = (): AppThunk => async (dispatch) => {
  const rewardData = <RewardDoc[]>ipcRenderer.sendSync('fetchAllRewards');
  if (rewardData) {
    dispatch(setInitialState(rewardData));
  }
};

// Selectors

export const selectRewardList = (state: RootState) => {
  return state.rewards.rewardList;
};

export default rewardsSlice.reducer;
