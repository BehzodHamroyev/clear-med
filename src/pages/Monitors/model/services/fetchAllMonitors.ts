import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MonitorApiResponse } from '../types/monitorTypes';

export const fetchAllMonitors = createAsyncThunk<
  MonitorApiResponse,
  {},
  ThunkConfig<string>
  // eslint-disable-next-line no-empty-pattern
>('fetchAllMonitors', async ({}, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get<MonitorApiResponse>(
      `${baseUrl}/users/monitor`,
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
});
