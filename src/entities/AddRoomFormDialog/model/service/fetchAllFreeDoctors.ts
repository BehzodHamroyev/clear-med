import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { AllFreeDoctorsApiResponse } from '../types/doctorListTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchAllFreeDoctors = createAsyncThunk<
  AllFreeDoctorsApiResponse,
  {},
  ThunkConfig<string>
>('fetch All Doctor', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.get<AllFreeDoctorsApiResponse>(
      `${baseUrl}/users?role=doctor`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});
