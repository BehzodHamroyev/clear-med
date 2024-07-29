import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

export const fetchAuthUser = createAsyncThunk<
  AuthLogin,
  { password?: string; login?: number; refresh: boolean; buttonsContext?: any },
  ThunkConfig<string>
>(
  'Authorization',
  async ({ password, login, refresh, buttonsContext }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    const { setHasOpenToast, setIsLoginForHasToast } = buttonsContext;

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
          // console.log(response.data, 'for token');
        }

        return response.data;
      } catch (error) {
        return rejectWithValue('error');
      }
    } else {
      try {
        const response = await axios.post<AuthLogin>(
          `${baseUrl}/users/signin`,
          {
            login,
            password,
          },
        );

        if (response) {
          Cookies.set('token', response.data.token);

          setHasOpenToast(true);

          setIsLoginForHasToast(true);
        }

        return response.data;
      } catch (error) {
        return rejectWithValue('error');
      }
    }
  },
);
