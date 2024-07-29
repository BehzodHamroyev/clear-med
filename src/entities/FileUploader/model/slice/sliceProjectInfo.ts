import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InfoProjectFromBackend,
  InfoProjectRedux,
} from '../types/typeInfoProject';
import { getAllDataProject } from '../service/getAllDataProject';

const initialState: InfoProjectRedux = {
  data: undefined,
  isLoading: false,
  error: '',
};

export const infoProjectSlice = createSlice({
  name: 'infoProjectSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDataProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllDataProject.fulfilled,
        (state, action: PayloadAction<InfoProjectFromBackend>) => {
          state.data = action.payload.data;
          state.isLoading = false;
        },
      )
      .addCase(getAllDataProject.rejected, (state) => {
        state.error = 'error';
      });
  },
});

export const { reducer: infoProjectSliceReducer } = infoProjectSlice;
export const { actions: infoProjectSliceAction } = infoProjectSlice;
