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
  id: string;
  login: number | string;
  name: string;
  password: string;
  photo: string;
  role: string;
  __v: number;
  _id: string;
  rooms: Room[];
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
