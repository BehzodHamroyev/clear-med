interface Department {
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  photo: string;
  updatedAt?: string; // This field is optional, as it appears in some cases
  __v: number;
  id: string;
}

interface Doctor {
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: string | null;
  exprience: number;
  photo: string;
  __v: number;
  id: string;
}

export interface Room {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: Doctor[] | null;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface AllRoomsApiResponse {
  status: string;
  Allrooms: number;
  room: Room[];
}
