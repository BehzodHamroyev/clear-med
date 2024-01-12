export interface RoomData {
  _id: string;
  name: number;
  department_id: {
    _id: string;
    name: string;
    duration: number;
    image: string;
    disabled: boolean;
    __v: number;
    id: string;
  };
  doctor_id: string;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface DoctorListData {
  photo: string;
  _id: string;
  name: string;
  login: number;
  role: string;
  exprience: number;
  password?: string | number;
  passwordChangedDate: null;
  rooms: RoomData[];
}

export interface DoctorListPage {
  status: string;
  result: number;
  data: DoctorListData[];
}

export interface DoctorListSchema {
  isLoading: boolean;
  error?: string;
  data?: DoctorListData[];
}
