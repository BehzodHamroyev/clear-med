import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllQueueProccessApiResponse } from '../types/allQueueProccessTypes';

export const fetchAllQueueProccess = createAsyncThunk<
  AllQueueProccessApiResponse,
  { monitorId?: string },
  ThunkConfig<string>
>('fetchAllQueueProccess', async ({ monitorId }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  if (monitorId) {
    try {
      const response = await axios.get(
        `${baseUrl}/monitor/proceed/${monitorId}`,
        {
          headers: {
            authorization: `Bearer ${getTokenCookie}`,
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
  } else {
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
  }
});
