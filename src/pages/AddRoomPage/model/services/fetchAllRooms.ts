import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AllRoomsApiResponse } from '../types/roomTypes';

export const fetchAllRooms = createAsyncThunk<
  AllRoomsApiResponse,
  {},
  ThunkConfig<string>
  // eslint-disable-next-line no-empty-pattern
>('fetchAllRooms', async ({}, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const token = Cookies.get('token');

  try {
    const response = await axios.get<AllRoomsApiResponse>(
      `${baseUrl}/room/all`,
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
