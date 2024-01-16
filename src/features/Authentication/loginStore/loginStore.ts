import axios from 'axios';
import Cookies from 'js-cookie';
import { makeAutoObservable } from 'mobx';

import { IUser } from '../models/IUser';
import AuthService from '../services/AuthService';

import { baseUrl } from '../../../../baseurl';
import { AuthResponse } from '../models/responce/AuthResponse';

export default class LoginStore {
  user = {} as IUser;

  isAuth = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(login: string, password: string) {
    try {
      const response = await AuthService.login(login, password);

      Cookies.set('token', response.data.token);

      this.setAuth(true);

      this.setUser(response.data.user);

      console.log(this.user.role);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      Cookies.remove('token');

      this.setAuth(false);

      this.setUser({} as IUser);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${baseUrl}/refresh`, {
        withCredentials: true,
      });
      console.log(response);

      Cookies.set('token', response.data.token);

      this.setAuth(true);

      this.setUser(response.data.user);
    } catch (e) {
      // @ts-ignore
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
