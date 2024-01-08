import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAuthLogin } from '../service/AuthenticatorResponse';
import { AuthLogin, AuthReduxType } from '../types/AuthentificationTypes';

const initialState: AuthReduxType = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthLogin.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAuthLogin.fulfilled,
        (state, action: PayloadAction<AuthLogin>) => {
          state.isLoading = false;

          if (action.payload.user) {
            state.data = action.payload.user;
          }
        },
      )
      .addCase(fetchAuthLogin.rejected, (state, action) => {
        state.error = 'Reduxda ma';
        state.isLoading = false;
      });
  },
});

export const { actions: AuthSliceActions } = AuthSlice;
export const { reducer: AuthSliceReducer } = AuthSlice;
