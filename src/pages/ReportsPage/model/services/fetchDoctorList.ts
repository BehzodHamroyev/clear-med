/* eslint-disable no-empty-pattern */
import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DoctorListApiRecsponce } from '../types/doctorListTypes';

export const fetchDoctorList = createAsyncThunk<
  DoctorListApiRecsponce,
  {},
  ThunkConfig<string>
>('fetchDoctorList', async ({}, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  try {
    const response = await axios.get(`${baseUrl}/users?role=doctor`, {
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
