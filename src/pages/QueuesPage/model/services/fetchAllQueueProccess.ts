import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllQueueProccessApiResponse } from '../types/allQueueProccessTypes';

export const fetchAllQueueProccess = createAsyncThunk<
  AllQueueProccessApiResponse,
  {},
  ThunkConfig<string>
  // eslint-disable-next-line no-empty-pattern
>('fetchAllQueueProccess', async ({}, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get(`${baseUrl}/monitor/proceed`, {
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
