import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DepartmentType } from '../types/departmentType';

const baseUrl = 'https://magicsoft.uz/med/api/v1/';

export const fetchDepartmentAdd = createAsyncThunk<
  DepartmentType,
  { name: string; image: string; duration: any },
  ThunkConfig<string>
>('DepartmentAdd', async ({ name, image, duration }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const token = localStorage.getItem('token');
  const allCookiesString = document.cookie;

  console.log(`Department:`, allCookiesString);

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
          'Content-Type': 'application',
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response, 'department');

    if (!response.data) {
      throw new Error();
    }
    // @ts-ignore
    if (response.data.token) {
      // @ts-ignore
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
