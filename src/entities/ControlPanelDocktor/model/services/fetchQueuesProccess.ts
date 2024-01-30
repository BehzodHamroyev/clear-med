import axios from 'axios';
import Cookies from 'js-cookie';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProccesApiResponseControlPanelDoctorTypes } from '../types/controlPanelDocktorTypes';
import { socket } from '@/shared/lib/utils/socket';

export const fetchQueuesProccess = createAsyncThunk<
  ProccesApiResponseControlPanelDoctorTypes,
  { method: string; path: string; status: string; isReCall?: boolean },
  ThunkConfig<string>
>(
  'fetchQueuesProccess',
  async ({ method, path, status, isReCall = false }, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    const getTokenCookie = Cookies.get('token');

    if (!status) {
      throw new Error('');
    }

    try {
      let response;

      if (method === 'get') {
        response = await axios.get<ProccesApiResponseControlPanelDoctorTypes>(
          `${baseUrl}/doctor/${path}${status}`,

          {
            headers: {
              authorization: `Bearer ${getTokenCookie}`,
            },
          },
        );
      } else if (method === 'post') {
        response = await axios.post<ProccesApiResponseControlPanelDoctorTypes>(
          `${baseUrl}/doctor/${path}${status}`,
          {},
          {
            headers: {
              authorization: `Bearer ${getTokenCookie}`,
            },
          },
        );
      }

      console.log();

      if (
        response?.data &&
        response?.data.data.length > 0 &&
        status === 'proccessed' &&
        !isReCall
      ) {
        socket.emit('proccessQueue', response.data);
      }

      if (
        response?.data &&
        response?.data.data.length > 0 &&
        status === 'proccessed' &&
        isReCall
      ) {
        socket.emit('recallQueue', response.data);
      }

      if (
        response?.data &&
        response?.data.data.length > 0 &&
        status === 'rejected'
      ) {
        socket.emit('rejectQueue', response.data);
      }

      if (
        response?.data &&
        response?.data.data.length > 0 &&
        status === 'completed'
      ) {
        socket.emit('acceptedQueue', response.data);
      }

      if (!response) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
