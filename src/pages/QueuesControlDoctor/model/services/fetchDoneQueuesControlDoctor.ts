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

  try {
    const response = await axios.get<QueueApiResponseControlDoctorTypes>(
      `${baseUrl}/doctor/report
    `,

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
