import axios from 'axios';
import Cookies from 'js-cookie';

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

  const token = Cookies.get('token');

  try {
    const response = await axios.get<DepartmentListApiResponceTypes>(
      `${baseUrl}/room/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
