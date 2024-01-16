import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import { DoctorAddTypes } from '../types/doctorAddTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

const baseUrl = 'http://magicsoft.uz/med/api/v1/';

export const fetchDoctorAdd = createAsyncThunk<
  DoctorAddTypes,
  {
    name: string;
    login: string | number;
    password: string;
    exprience: number | string;
    file: HTMLImageElement | string;
  },
  ThunkConfig<string>
>('DoctorAdd', async ({ name, login, password, exprience, file }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.post<DoctorAddTypes>(
      `${baseUrl}users`,
      {
        name,
        file,
        login,
        password,
        exprience,
      },
      {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log(response, 'doctor response add');

    return response.data;
  } catch (e) {
    console.log(e, 'department');
    return rejectWithValue('error');
  }
});
