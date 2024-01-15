// import { useCookies } from 'react-cookie';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../../../../baseurl';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthLogin } from '../types/AuthentificationTypes';

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

    // if (response.data.token) {
    //   const { token } = response.data;

    //   Cookies.set('token', token, {
    //     // secure: true,
    //     // httpOnly: true,
    //     // sameSite: 'Lax',
    //   });

    //   const getTokenCookie = Cookies.get('token');

    //   // consoleda token ko'rinsa demak token cookiega saqlangan
    //   // console.log(getTokenCookie);

    //   localStorage.setItem('token', response.data.token);
    // }
    // if (response.data.user.role) {
    //   localStorage.setItem('profile', response.data.user.role);
    // }
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue('error');
  }
});
