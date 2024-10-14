import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { LastQueueDataApiResponce } from '../types/departmentListTypes';

export const fetchLastQueue = createAsyncThunk<
  LastQueueDataApiResponce,
  { doctorId: string },
  ThunkConfig<string>
>('fetchLastQueue', async ({ doctorId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get(`${baseUrl}/doctor/last/${doctorId}`, {
      headers: {
        authorization: `Bearer ${getTokenCookie}`,
      },
    });

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
