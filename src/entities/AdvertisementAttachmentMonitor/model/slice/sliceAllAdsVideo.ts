import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getAllAdsVideo } from '../service/getAllAdsVideo';
import { AddsVideosDataBackend, AddsVideosDataRedux } from '../types/addsTypes';

const initialState: AddsVideosDataRedux = {
  isLoading: true,
  error: undefined,
  data: [],
};

export const sliceAllAdsVideo = createSlice({
  name: 'sliceAllAdsVideo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdsVideo.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        getAllAdsVideo.fulfilled,
        (state, action: PayloadAction<AddsVideosDataBackend>) => {
          state.isLoading = false;
          state.data = [...action.payload.data];
        },
      )
      .addCase(getAllAdsVideo.rejected, (state, action) => {
        // state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: sliceAllAdsVideoActions } = sliceAllAdsVideo;
export const { reducer: sliceAllAdsVideoReducer } = sliceAllAdsVideo;
