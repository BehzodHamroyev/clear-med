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
  photo: string;
  __v: number;
  id: string;
}

interface Actives {
  createdAt: string;
  id: string;
  room: string;
  tillTime: string;
  updatedAt: string;
  user: string;
  __v: 0;
  _id: string;
}

export interface Room {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: Doctor[];
  disabled: boolean;
  photo: string;
  __v: number;
  id: string;
  actives?: Actives[];
}

interface navbat {
  created_date?: string;
  created_time?: string;
  department_id?: string;
  doctor_id?: string;
  id?: string;
  queues_name?: string;
  room_id?: string;
  status?: string;
  step?: number;
  __v?: number;
  _id?: string;
}

interface roomCurrentQueue {
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
  disabled: boolean;
  __v: number;
  id: string;
}
export interface DepartmentListApiResponceTypes {
  status: string;
  Allrooms: number;
  room: Room[];
}

export interface CurrentQueueDataType {
  kutish_vaqti?: string;
  message?: boolean;
  navbat?: navbat;
  room: roomCurrentQueue;
  sizdan_oldingi_bemorlar_soni?: number;
}

export interface CurrentQueueDataApiRespoceType {
  kutish_vaqti?: string;
  message?: boolean;
  navbat?: navbat;
  room: roomCurrentQueue;
  sizdan_oldingi_bemorlar_soni?: number;
}

export interface LastQueueData {
  _id: string;
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
  room_id: string;
  doctor_id: {
    exprience: number;
    id: string;
    login: string;
    name: string;
    passwordChangedDate: string;
    photo: string;
    role: string;
    __v: number;
    _id: string;
  };
  queues_name: string;
  step: number;
  status: string;
  created_date: string;
  created_time: string;
  __v: number;
  id: string;
}

export interface LastQueueRoom {
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
  doctor_id: Doctor[];
}

export interface LastQueueDataApiResponce {
  status: string;
  data: LastQueueData;
  room: LastQueueRoom;
  pagination: string;
}
