import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAllFreeDoctors } from '../service/fetchAllFreeDoctors';
import { AllFreeDoctorsTypeSchema } from '../types/doctorsTypesSchema';
import { AllFreeDoctorsApiResponse } from '../types/doctorListTypes';

const initialState: AllFreeDoctorsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AllFreeDoctorsListSlice = createSlice({
  name: 'All free doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFreeDoctors.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllFreeDoctors.fulfilled,
        (state, action: PayloadAction<AllFreeDoctorsApiResponse>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchAllFreeDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: allFreeDoctorsActions } = AllFreeDoctorsListSlice;
export const { reducer: allFreeDoctorsReducer } = AllFreeDoctorsListSlice;
