import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { fetchDepartmentGetAll } from '../service/getAllDepartmentRequest';
import {
  DepartmentListSchema,
  GetAllDepartment,
} from '../types/departmentTypes';

const initialState: DepartmentListSchema = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const DepartmentListSlice = createSlice({
  name: 'SurahListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentGetAll.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchDepartmentGetAll.fulfilled,
        (state, action: PayloadAction<GetAllDepartment>) => {
          state.isLoading = false;

          state.data = action.payload.department;
        },
      )
      .addCase(fetchDepartmentGetAll.rejected, (state, action) => {
        state.error = undefined;
        state.isLoading = false;
      });
  },
});

export const { actions: DepartmentListSliceActions } = DepartmentListSlice;
export const { reducer: DepartmentListSliceReducer } = DepartmentListSlice;
