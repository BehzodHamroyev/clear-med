interface Room {
  _id: string;
  name: number;
  // eslint-disable-next-line no-use-before-define
  department_id: Department;
  doctor_id: string;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface Doctor {
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: null | string;
  exprience: number;
  photo: string;
  rooms: Room[];
  id: string;
}

interface Department {
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  photo: string;
  updatedAt?: string;
  rooms: Room[];
  id: string;
}

export interface AllDoctorsApiResponse {
  status: string;
  result: number;
  data: Doctor[];
}
