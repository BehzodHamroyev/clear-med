import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchAllDoctors } from '../service/fetchAllDoctors';
import { AllDoctorsTypeSchema } from '../types/doctorsTypesSchema';
import { AllDoctorsApiResponse } from '../types/doctorListTypes';

const initialState: AllDoctorsTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const AllDoctorListSlice = createSlice({
  name: 'All doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllDoctors.fulfilled,
        (state, action: PayloadAction<AllDoctorsApiResponse>) => {
          state.isLoading = false;

          state.data = action.payload.data;
        },
      )
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: allDoctorsSliceActions } = AllDoctorListSlice;
export const { reducer: allDoctorsSliceReducer } = AllDoctorListSlice;
