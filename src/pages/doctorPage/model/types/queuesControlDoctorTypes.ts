interface Department {
  disabled: boolean;
  duration: number;
  id: string;
  image: string;
  name: string;
  photo: string;
  __v: number;
  _id: string;
}

interface Room {
  department_id: string;
  disabled: boolean;
  doctor_id: string;
  id: string;
  name: number;
  __v: number;
  _id: string;
}

interface Doctor {
  exprience: 3;
  id: string;
  login: number;
  name: string;
  passwordChangedDate: null;
  photo: string;
  role: string;
  __v: number;
  _id: string;
}

export interface Queue {
  _id: string;
  department_id: Department;
  room_id: Room;
  doctor_id: Doctor;
  queues_name: string[] | string;
  step: number;
  created_date: string;
  status: string;
  created_time: string;
  accepted_date?: string;
  completed_date?: string;
  __v: number;
  id: string;
  view: boolean;
  mp3Arr: string[];
}

export interface QueueApiResponseControlDoctorTypes {
  status: string;
  result: number;
  data: Queue[];
}
