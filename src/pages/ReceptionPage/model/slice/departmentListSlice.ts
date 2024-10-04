import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DepartmentListSchemaForReception } from '../types/departmentListSchema';
import { DepartmentListApiResponceTypes } from '../types/departmentListTypes';
import { fetchDepartmentList } from '../services/fetchDepartmentList';

const initialState: DepartmentListSchemaForReception = {
  isLoading: false,
  error: undefined,
  data: undefined,
};

export const departmentList = createSlice({
  name: 'Done Queues Control Doctor ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentList.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchDepartmentList.fulfilled,
        (state, action: PayloadAction<DepartmentListApiResponceTypes>) => {
          state.isLoading = false;

          state.data = action.payload.room;
        },
      )
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: departmentListActions } = departmentList;
export const { reducer: departmentListReducer } = departmentList;
