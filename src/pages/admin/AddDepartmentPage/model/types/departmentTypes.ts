interface Room {
  _id: string;
  name: number;
  department_id: string;
  doctor_id: {
    _id: string;
    name: string;
    login: number;
    role: string;
    passwordChangedDate: null | string;
    __v: number;
    photo: string;
    exprience: number;
    id: string;
  } | null;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface Department {
  _id?: string;
  name?: string;
  duration?: number;
  image?: string;
  disabled?: boolean;
  photo?: string;
  updatedAt?: string;
  rooms_id?: Room[];
  id: string;
  __v?: number;
}

export interface AllDepartmentsApiResponse {
  status: string;
  AllDepartment: number;
  department: Department[];
}
