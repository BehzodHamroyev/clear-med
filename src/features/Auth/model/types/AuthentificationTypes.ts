import { Dayjs } from 'dayjs';

export interface DoctorId {
  exprience: number;
  id: string;
  login: number;
  name: string;
  passwordChangedDate: null;
  photo: string;
  role: string;
  __v: number;
  _id: string;
}
interface Room {
  createdAt: string;
  department_id: string;
  disabled: false;
  doctor_id: DoctorId[];
  id: string;
  name: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface DataUser {
  logo?: string;
  id: string;
  login: number | string;
  name: string;
  password: string;
  photo: string;
  role: string;
  __v: number;
  _id: string;
  rooms: Room[];
  time: {
    _id: string;
    user: string;
    room: string;
    tillTime: Dayjs;
    createdAt: string;
    updatedAt: string;
    __v: 0;
    id: string;
  };
}

export interface AuthLogin {
  about: {
    logo: string;
  };
  success: boolean;
  user: DataUser;
  token: string;
}

export interface AuthReduxType {
  isLoading: boolean;
  data?: DataUser;
  error?: string;
}
