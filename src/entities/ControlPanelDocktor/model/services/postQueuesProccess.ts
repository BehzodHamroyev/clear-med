import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProccesApiResponseControlPanelDoctorTypes } from '../types/controlPanelDocktorTypes';

export const postQueuesProccess = createAsyncThunk<
  ProccesApiResponseControlPanelDoctorTypes,
  { status?: string },
  ThunkConfig<string>
>('postQueuesProccess', async ({ status }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  const token = localStorage.getItem('token');
  const getTokenCookie = Cookies.get('token');

  try {
    const response =
      await axios.post<ProccesApiResponseControlPanelDoctorTypes>(
        `https://magicsoft.uz/med/api/v1/doctor/proccessed`,

        {},
        {
          headers: {
            authorization: `Bearer ${getTokenCookie}`,
          },
        },
      );

    if (!response.data) {
      throw new Error();
    }

    console.log(response);
    return response.data;
  } catch (e) {
    return rejectWithValue('error');
  }
});
