import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReportDoctorTypes } from '../..';

export const fetchReportControlDoctor = createAsyncThunk<
  ReportDoctorTypes,
  { limit: number },
  ThunkConfig<string>
>('fetchReportControlDoctor', async ({ limit }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  if (!limit) {
    throw new Error('');
  }

  try {
    const response = await axios.get<ReportDoctorTypes>(
      `https://magicsoft.uz/med/api/v1/doctor/report?limit=${limit}`,

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
