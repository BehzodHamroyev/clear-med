interface Doctor {
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: string | null;
  exprience: number;
  photo: string;
  id: string;
}

interface Department {
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface Room {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: Doctor;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface DepartmentListApiResponceTypes {
  status: string;
  Allrooms: number;
  room: Room[];
}
