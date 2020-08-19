import { createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';
import { RedemptionDoc, RewardDoc } from '../../../../db/types';

type Payload<T> = {
  payload: T;
};

type StateType = {
  rewardList: RewardDoc[];
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    rewardList: [],
  } as StateType,
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
    addReward: (state, { payload }: Payload<RedemptionDoc>) => {
      const reward = translate(payload, state.rewardList.length);
      state.rewardList.push(reward);
      ipcRenderer.send('logReward', payload);
    },
    removeReward: (state, { payload }: Payload<RewardDoc>) => {
      const index = state.rewardList.indexOf(payload);
      state.rewardList.splice(index, 1);
      updateRewardOrder(state.rewardList);
    },
    updateRewardOrder: (state, { payload }: Payload<RewardDoc[]>) => {
      // Correct position property for each reward before setting state/storing.
      const rewardsWithCorrectPos = [];
      for (let i = 0; i < payload.length; i += 1) {
        const reward = { ...payload[i] };
        reward.position = i;
        rewardsWithCorrectPos.push(reward);
      }
      state.rewardList = rewardsWithCorrectPos;
      ipcRenderer.send('updateRewardOrder', rewardsWithCorrectPos);
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

// Selector

export const selectRewardList = (state: RootState) => {
  return state.rewards.rewardList;
};

// Helper Function
function translate(doc: RedemptionDoc, position: number): RewardDoc {
  const { reward } = doc.data.redemption;
  return {
    position,
    rewardId: reward.id,
    rewardName: reward.title,
    rewardCost: reward.cost,
    rewardBgColor: reward.background_color,
    rewardImage: reward.image?.url_4x ?? reward.default_image.url_4x,
    isQueued: !reward.should_redemptions_skip_request_queue,
  };
}

export default rewardsSlice.reducer;
