interface Department {
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  photo: string;
  __v: number;
  updatedAt: string;
  id: string;
}

interface Doctor {
  _id: string;
  name: string;
  login: number;
  role: string;
  passwordChangedDate: string | null;
  __v: number;
  experience: number;
  photo: string;
  id: string;
}

interface RoomData {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: Doctor;
}

export interface TypesOfRoomsAttachedToTheMonitor {
  length: number;
  monitor: {
    addvertising: boolean;
    createdAt: string;
    disabled: false;
    id: string;
    monitor: string;
    name: string;
    rooms: RoomData[];
    updatedAt: string;
    videos: [];
    __v: number;
    _id: string;
  };
}

export interface MonitorRoomData {
  config: any;
  headers: any;
  request: any;
  status: number;
  statusText: string;
  data: TypesOfRoomsAttachedToTheMonitor;
}

export interface MonitorRoomListSchema {
  isLoading: boolean;
  error?: string;
  data?: TypesOfRoomsAttachedToTheMonitor;
}
