/* eslint-disable max-len */
// import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

const tokenValue =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWI4YjY1ZTU1YjBmMTZjZGRjM2RjMiIsImlhdCI6MTcwNTMxODI4OCwiZXhwIjoxNzA1Njc4Mjg4fQ.zZVoCvBN8A3LScTNKeqL1H6ceJHhkIBARBNwbLRigR8';

export const fetchAuthLogin = createAsyncThunk<
  AuthLogin,
  { password: string; login: number },
  ThunkConfig<string>
>('Authorization', async ({ password, login }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post(
      `users/signin`,
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
