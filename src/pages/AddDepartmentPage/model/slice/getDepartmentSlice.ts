import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllDepartments } from '../service/fetchAllDepartments';
import { AllDepartmentsApiResponse } from '../types/departmentTypes';
import { AllDepartmentTypeSchema } from '../types/departmentTypesSchema';

const initialState: AllDepartmentTypeSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const allDepartmentsSlice = createSlice({
  name: 'All Department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDepartments.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchAllDepartments.fulfilled,
        (state, action: PayloadAction<AllDepartmentsApiResponse>) => {
          state.isLoading = false;

          state.data = action.payload.department;
        },
      )
      .addCase(fetchAllDepartments.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: allDepartmentsSliceActions } = allDepartmentsSlice;
export const { reducer: allDepartmentsSliceReducer } = allDepartmentsSlice;
