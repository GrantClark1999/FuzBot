import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../../store';
import { RedemptionDoc } from '../../../../db/types';

type Payload<T> = {
  payload: T;
};

type StateType = {
  redemption: RedemptionDoc | undefined;
};

const pubsubSlice = createSlice({
  name: 'pubsub',
  initialState: {
    redemption: undefined,
  } as StateType,
  reducers: {
    setRedemption: (state, { payload }: Payload<RedemptionDoc>) => {
      state.redemption = payload;
    },
    clearRedemption: (state) => {
      state.redemption = undefined;
    },
  },
});

export const { setRedemption, clearRedemption } = pubsubSlice.actions;

// Selector

export const selectRedemption = (state: RootState) => {
  return state.pubsub.redemption;
};

export default pubsubSlice.reducer;
