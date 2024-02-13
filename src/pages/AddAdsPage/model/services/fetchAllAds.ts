import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllAdsApiResponse } from '../types/adsTypes';

export const fetchAllAds = createAsyncThunk<
  AllAdsApiResponse,
  {},
  ThunkConfig<string>
>('fetch all ads', async (prop, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.get<AllAdsApiResponse>(
      `${baseUrl}/videos/all?limit=1000`,
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
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
