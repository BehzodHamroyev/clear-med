import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Monitor } from '../types/allMonitorTypes';

export const fetchGetAllMonitors = createAsyncThunk<
  Monitor,
  {},
  ThunkConfig<string>
>('getAllMonitor', async (prop, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get(`${baseUrl}/users/monitor`, {
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
