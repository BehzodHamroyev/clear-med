import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { QueueApiResponseControlDoctorTypes } from '../..';

export const fetchDoneQueuesControlDoctor = createAsyncThunk<
  QueueApiResponseControlDoctorTypes,
  { limit: number },
  ThunkConfig<string>
>('fetchDoneQueuesControlDoctor', async ({ limit }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  if (!limit) {
    throw new Error('');
  }

  try {
    const response = await axios.get<QueueApiResponseControlDoctorTypes>(
      `${baseUrl}/doctor/report?limit=${limit}`,

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
