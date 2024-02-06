import axios from 'axios';
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

  try {
    const response = await axios.get<AllAdsApiResponse>(
      `${baseUrl}/videos/all`,
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
