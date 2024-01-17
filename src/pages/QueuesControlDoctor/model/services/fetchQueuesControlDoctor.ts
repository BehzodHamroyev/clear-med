import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { QueueApiResponseControlDoctorTypes } from '../..';

export const fetchQueuesControlDoctor = createAsyncThunk<
  QueueApiResponseControlDoctorTypes,
  { status: string },
  ThunkConfig<string>
>('fetchQueuesControlDoctor', async ({ status }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  if (!status) {
    throw new Error('');
  }

  try {
    const response = await axios.get<QueueApiResponseControlDoctorTypes>(
      `${baseUrl}/doctor/type?status=${status}`,

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
