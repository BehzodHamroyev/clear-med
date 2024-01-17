/* eslint-disable max-len */

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

const tokenValue =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWI4YjY1ZTU1YjBmMTZjZGRjM2RjMiIsImlhdCI6MTcwNTM3OTY5NiwiZXhwIjoxNzA1NzM5Njk2fQ.Zv_xgjnJnYMWmhrUIwzVYb4wKjCHIdxdeLs4RPHHoOU';

export const fetchAuthLogin = createAsyncThunk<
  AuthLogin,
  { password: string; login: number },
  ThunkConfig<string>
>('Authorization', async ({ password, login }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await axios.post(
      `${baseUrl}users/signin`,
      {
        password,
        login,
      },
      {
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.token) {
      const { token } = response.data;

      Cookies.set('token', tokenValue, {
        // secure: true,
        // httpOnly: true,
        // sameSite: 'Lax',
      });

      // Cookies.set('token', token, {
      //   secure: true,
      //   // httpOnly: true,
      //   // sameSite: 'Lax',
      // });

      const getTokenCookie = Cookies.get('token');

      // consoleda token ko'rinsa demak token cookiega saqlangan
      // console.log(getTokenCookie);

      // localStorage.setItem('token', response.data.token);
      localStorage.setItem('token', tokenValue);
    }
    if (response.data.user.role) {
      localStorage.setItem('profile', response.data.user.role);
    }

    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
