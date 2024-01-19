import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

export const fetchAuthUser = createAsyncThunk<
  AuthLogin,
  { password?: string; login?: number; refresh: boolean },
  ThunkConfig<string>
>('Authorization', async ({ password, login, refresh }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  if (refresh) {
    const getTokenCookie = Cookies.get('token');

    try {
      const response = await axios.get<AuthLogin>(`${baseUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${getTokenCookie}`,
        },
      });

      if (response) {
        // console.log(response.data, 'for token1');
      }

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  } else {
    try {
      const response = await axios.post<AuthLogin>(`${baseUrl}/users/signin`, {
        login,
        password,
      });

      if (response) {
        Cookies.set('token', response.data.token);
      }

      // console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
});
