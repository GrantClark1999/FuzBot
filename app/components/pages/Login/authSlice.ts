import { createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';

type Payload<T> = {
  payload: T;
};

export type AuthData = {
  displayName: string | undefined;
  picture: string | undefined;
};

export type AuthState = AuthData & {
  isLoading: boolean;
  isAuth: boolean;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    displayName: undefined,
    picture: undefined,
    isLoading: false,
    isAuth: false,
  } as AuthState,
  reducers: {
    setInitialState: (state, { payload }: Payload<AuthData>) => {
      state.displayName = payload.displayName;
      state.picture = payload.picture;
      state.isLoading = false;
      state.isAuth = !!payload.displayName;
    },
    loggingIn: (state) => {
      state.isLoading = true;
    },
    loggedIn: (state, { payload }: Payload<AuthData>) => {
      state.displayName = payload.displayName;
      state.picture = payload.picture;
      state.isLoading = false;
      state.isAuth = true;
    },
    logout: (state) => {
      state.displayName = undefined;
      state.picture = undefined;
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const {
  setInitialState,
  loggingIn,
  loggedIn,
  logout,
} = authSlice.actions;

export const initAuthData = (): AppThunk => async (dispatch) => {
  const authData = <AuthData>ipcRenderer.sendSync('fetchAuthData');
  if (authData) {
    dispatch(setInitialState(authData));
  }
};

// Selectors

export const selectAuthInfo = (state: RootState) => {
  return {
    displayName: state.auth.displayName,
    picture: state.auth.picture,
  };
};
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export default authSlice.reducer;
