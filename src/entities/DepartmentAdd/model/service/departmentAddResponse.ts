import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DepartmentType } from '../types/departmentType';
import { ThunkConfig } from '@/app/providers/StoreProvider';

const baseUrl = 'https://magicsoft.uz/med/api/v1/';

export const fetchDepartmentAdd = createAsyncThunk<
  DepartmentType,
  { name: string; image: string; duration: number },
  ThunkConfig<string>
>('DepartmentAdd', async ({ name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post<DepartmentType>(
      `${baseUrl}department/create`,
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
