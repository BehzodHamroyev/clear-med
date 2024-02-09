import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReportDoctorTypes } from '../..';

export const fetchReportControlDoctor = createAsyncThunk<
  ReportDoctorTypes,
  { startDate: string; endDate: string; limit?: number; page?: number },
  ThunkConfig<string>
>(
  'fetchReportControlDoctor',
  async ({ startDate, endDate, limit, page }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.get<ReportDoctorTypes>(
        startDate && endDate
          ? // eslint-disable-next-line max-len
            `${baseUrl}/doctor/report?startDate=${startDate}&endDate=${endDate}&limit=25&page=${page}`
          : `${baseUrl}/doctor/report`,
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
  },
);
