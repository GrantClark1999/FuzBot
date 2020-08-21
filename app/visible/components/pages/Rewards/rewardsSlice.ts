import { createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';
import { RedemptionDoc, RewardDoc } from '../../../../../db/types';

type Payload<T> = {
  payload: T;
};

type StateType = {
  rewardList: RewardDoc[];
  pointsImage: string | undefined;
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    rewardList: [],
    pointsImage: undefined,
  } as StateType,
  reducers: {
    setInitialRewardList: (state, { payload }: Payload<RewardDoc[]>) => {
      const compare = (a: RewardDoc, b: RewardDoc) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
      };
      const sortedRewards = payload.sort(compare);
      state.rewardList = sortedRewards;
    },
    setInitialPointsImage: (state, { payload }: Payload<string>) => {
      state.pointsImage = payload;
    },
    addReward: (state, { payload }: Payload<RedemptionDoc>) => {
      const reward = translate(payload, state.rewardList.length);
      state.rewardList.push(reward);
      ipcRenderer.send('logReward', reward);
    },
    removeReward: (state, { payload }: Payload<number>) => {
      // Payload === index to remove at
      state.rewardList.splice(payload, 1);
      updateRewardList(state.rewardList);
    },
    updateRewardList: (state, { payload }: Payload<RewardDoc[]>) => {
      // Correct position property for each reward before setting state/storing.
      const rewardsWithCorrectPos = [];
      for (let i = 0; i < payload.length; i += 1) {
        const reward = { ...payload[i] };
        reward.position = i;
        rewardsWithCorrectPos.push(reward);
      }
      state.rewardList = rewardsWithCorrectPos;
      ipcRenderer.send('updateRewardList', rewardsWithCorrectPos);
    },
    setPointsImage: (state, { payload }: Payload<string>) => {
      state.pointsImage = payload;
      ipcRenderer.send('setPointsImage', payload);
    },
  },
});

export const {
  setInitialRewardList,
  setInitialPointsImage,
  addReward,
  removeReward,
  updateRewardList,
  setPointsImage,
} = rewardsSlice.actions;

export const initRewardData = (): AppThunk => (dispatch) => {
  ipcRenderer.send('fetchRewardList');
  ipcRenderer.send('fetchPointsImage');
  ipcRenderer.on('fetchedRewardList', (_event, rewardList) => {
    if (rewardList) dispatch(setInitialRewardList(rewardList));
  });
  ipcRenderer.on('fetchedPointsImage', (_event, pointsImage) => {
    if (pointsImage) dispatch(setInitialPointsImage(pointsImage));
  });
};

// Selector

export const selectRewardList = (state: RootState) => {
  return state.rewards.rewardList;
};

export const selectPointsImage = (state: RootState) => {
  return state.rewards.pointsImage;
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
