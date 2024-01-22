interface rooms {
  _id: string;
  name: number;
  department_id: {
    photo: string;
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

export interface Doctor {
  _id: string;
  name: string;
  login: number;
  photo: string;
  role: string;
  passwordChangedDate: null;
  exprience: number;
  rooms: rooms[];
  id: string;
}

export interface DoctorListApiRecsponce {
  status: string;
  result: number;
  data: Doctor[];
}
