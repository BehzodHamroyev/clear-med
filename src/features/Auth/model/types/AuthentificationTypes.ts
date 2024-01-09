export interface DataUser {
  id: string;
  login: number | string;
  name: string;
  password: string;
  photo: string;
  role: string;
  __v: number;
  _id: string;
}

export interface AuthLogin {
  success: boolean;
  user: DataUser;
  token: string;
}

export interface AuthReduxType {
  isLoading: boolean;
  data?: DataUser;
  error?: string;
}
