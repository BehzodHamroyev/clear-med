import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DepartmentListApiResponceTypes } from '../types/departmentListTypes';

export const fetchDepartmentList = createAsyncThunk<
  DepartmentListApiResponceTypes,
  { limit?: string },
  ThunkConfig<string>
>('fetchDepartmentList', async ({ limit }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<DepartmentListApiResponceTypes>(
      `${baseUrl}/room/all`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
