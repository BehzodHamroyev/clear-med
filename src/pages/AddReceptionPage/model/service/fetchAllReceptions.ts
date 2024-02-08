import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { AllReceptionsApiResponse } from '../types/receptoinsListTypes';
import { ThunkConfig } from '@/app/providers/StoreProvider';

const token = Cookies.get('token');

export const fetchAllReceptions = createAsyncThunk<
  AllReceptionsApiResponse,
  {},
  ThunkConfig<string>
>('fetch All Receptions', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await axios.get<AllReceptionsApiResponse>(
      `${baseUrl}/users?role=reception`,
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
