import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProccesApiResponseControlPanelDoctorTypes } from '../types/controlPanelDocktorTypes';

export const fetchQueuesProccess = createAsyncThunk<
  ProccesApiResponseControlPanelDoctorTypes,
  { method: string; path: string; status: string },
  ThunkConfig<string>
>('fetchQueuesProccess', async ({ method, path, status }, thunkApi) => {
  const { rejectWithValue } = thunkApi;

  const getTokenCookie = Cookies.get('token');

  if (!status) {
    throw new Error('');
  }

  try {
    let response;

    if (method === 'get') {
      response = await axios.get<ProccesApiResponseControlPanelDoctorTypes>(
        `https://magicsoft.uz/med/api/v1/doctor/${path}${status}`,

        {
          headers: {
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );
    } else if (method === 'post') {
      response = await axios.post<ProccesApiResponseControlPanelDoctorTypes>(
        `https://magicsoft.uz/med/api/v1/doctor/${path}${status}`,

        {},
        {
          headers: {
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );
    }

    if (!response) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
