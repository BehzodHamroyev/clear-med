import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { DepartmentType } from '../types/departmentType';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchDepartmentAdd = createAsyncThunk<
  DepartmentType,
  { name: string; image: string; duration: number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<DepartmentType>(
      `${baseUrl}/department/create`,
      {
        name,
        image,
        duration,
      },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (e: any) {
    // console.log(e, 'department');
    return rejectWithValue('error');
  }
});
