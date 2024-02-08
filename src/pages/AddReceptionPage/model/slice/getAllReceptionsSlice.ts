import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAllReceptions } from '../service/fetchAllReceptions';
import { AllReceptionsTypeSchema } from '../types/receptionsTypesSchema';
import { AllReceptionsApiResponse } from '../types/receptoinsListTypes';

const initialState: AllReceptionsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AllReceptionsListSlice = createSlice({
  name: 'All reception',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReceptions.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllReceptions.fulfilled,
        (state, action: PayloadAction<AllReceptionsApiResponse>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchAllReceptions.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: allReceptionsActions } = AllReceptionsListSlice;
export const { reducer: allReceptionsReducer } = AllReceptionsListSlice;
