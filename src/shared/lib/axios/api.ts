// api.js
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from '../../../../baseurl';

const getToken = () => {
  return Cookies.get('token');
};

const instance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
