import { AxiosResponse } from 'axios';
import $api from '../http';

export default class AuthService {
  static async login(login: string, password: string): Promise<AxiosResponse> {
    return $api.post('/users/signin', { login, password });
  }
}
