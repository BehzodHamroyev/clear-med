import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { MonitorRoomData } from '../types/allMonitorTypes';

export const fetchGetAllRoomAtachmentMonitorOne = createAsyncThunk<
  MonitorRoomData,
  { id: string | number },
  ThunkConfig<string>
>('fetchGetAllRoomAtachmentMonitorOne', async ({ id }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get(`${baseUrl}/monitor/${id}`, {
      headers: {
        authorization: `Bearer ${getTokenCookie}`,
      },
    });

    console.log(response.data);
    // if (!response.data) {
    //   throw new Error();
    // }
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
