import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { DepartmentType } from '../types/departmentType';

const baseUrl = 'https://magicsoft.uz/med/api/v1/';

export const fetchDepartmentAdd = createAsyncThunk<
  DepartmentType,
  { departmentName: string; departmentTime: string; departmentIcon: any },
  ThunkConfig<string>
>(
  'DepartmentAdd',
  async ({ departmentName, departmentTime, departmentIcon }, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const token = localStorage.getItem('token');
    const allCookiesString = document.cookie;

    console.log(`Department:`, allCookiesString);

    try {
      const response = await axios.post<DepartmentType>(
        `${baseUrl}department/create`,
        {
          departmentName,
          departmentTime,
          departmentIcon,
        },
        {
          headers: { 'Content-Type': 'application', token: `Bearer ${token}` },
        },
      );

      console.log(response, 'department');

      if (!response.data) {
        throw new Error();
      }
      // @ts-ignore
      if (response.data.token) {
        // @ts-ignore
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (e) {
      console.log(e, 'department');
      return rejectWithValue('error');
    }
  },
);
