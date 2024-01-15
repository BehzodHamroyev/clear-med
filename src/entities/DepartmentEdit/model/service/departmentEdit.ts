import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DepartmentEditType } from '../types/departmentEdit';

export const fetchDepartmentEdit = createAsyncThunk<
  DepartmentEditType,
  { idCard: string | number; name: string; image: string; duration: number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ idCard, name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.patch<DepartmentEditType>(
      `${baseUrl}/department/${idCard}`,
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
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
