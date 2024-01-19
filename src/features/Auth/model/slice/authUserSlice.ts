import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthLogin, AuthReduxType } from '../types/AuthentificationTypes';
import { fetchAuthUser } from '../service/fetchAuthUser';

const initialState: AuthReduxType = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AuthUserSlice = createSlice({
  name: 'AuthUserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthUser.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAuthUser.fulfilled,
        (state, action: PayloadAction<AuthLogin>) => {
          state.isLoading = false;
          state.data = action.payload?.user;

          // console.log(action.payload);
        },
      )
      .addCase(fetchAuthUser.rejected, (state, action) => {
        state.isLoading = false;

        // console.log(action.error);

        state.error = action.payload;
      });
  },
});

export const { actions: AuthUserSliceActions } = AuthUserSlice;
export const { reducer: AuthUserSliceReducer } = AuthUserSlice;
