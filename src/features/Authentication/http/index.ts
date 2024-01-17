import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { baseUrl } from '../../../../baseurl';
import { AuthResponse } from '../models/responce/AuthResponse';

const $api = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

$api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  if (Cookies.get('token')) {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${Cookies.get('token')}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
          withCredentials: true,
        });

        Cookies.set('token', response.data.token, {
          // secure: true,
          // httpOnly: true,
          // sameSite: 'Lax',
        });

        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export default $api;
