export interface DepartmentID {
  _id: string;
  name: string;
  duration: number;
  image: number | string;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface DoctorID {
  photo: string;
  exprience: number;
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: null;
  __v: number;
  id: string;
}

export interface Room {
  map: any;
  _id: string;
  name: number;
  department_id: DepartmentID;
  doctor_id: DoctorID;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface GetAllRoom {
  status: string;
  Allrooms: number;
  room: Room;
}

export interface RoomListSchema {
  isLoading: boolean;
  error?: string;
  data?: GetAllRoom;
}

export interface GetAllDataRoom {
  config: any;
  headers: any;
  request: any;
  status: number;
  data: GetAllRoom;
  statusText: string;
}

export interface ResponseOfBacend {
  data?: GetAllDataRoom;
}
