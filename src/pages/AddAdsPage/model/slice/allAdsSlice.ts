import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AllAdsApiResponse } from '../types/adsTypes';
import { fetchAllAds } from '../services/fetchAllAds';
import { AllAdsTypeSchema } from '../types/adsTypesSchema';

const initialState: AllAdsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allAdsSlice = createSlice({
  name: 'All Ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAds.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllAds.fulfilled,
        (state, action: PayloadAction<AllAdsApiResponse>) => {
          state.isLoading = false;
          state.data = action.payload.data;
        },
      )
      .addCase(fetchAllAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: allAdsActions } = allAdsSlice;
export const { reducer: allAdsReducer } = allAdsSlice;
