import { Queue } from '@/pages/QueuesControlDoctor';

interface Department {
  photo: string;
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  __v: number;
  id: string;
}

interface Proced {
  _id: string;
  department_id: string;
  room_id: string;
  doctor_id: string;
  queues_name: string;
  step: string;
  status: string;
  created_date: string;
  created_time: string;
  __v: number;
  accepted_date: string;
  id: string;
}
interface Room {
  _id: string;
  name: number;
  department_id: Department;
  doctor_id: string;
  disabled: boolean;
  proceed: Queue[];
  __v: number;
  id: string;
}

interface Monitor {
  videos: any[]; // The type should be adjusted based on the actual data structure
  _id: string;
  name: string;
  monitor: string;
  disabled: boolean;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
  addvertising: boolean;
  __v: number;
  id: string;
}

export interface AllQueueProccessApiResponse {
  status: string;
  monitor: Monitor;
}

interface videoUrl {
  createdAt: string;
  disabled: boolean;
  id: string;
  link: string;
  name: string;
  photo: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface QueueProccessInRedux {
  videoUrl: videoUrl[];
  proccessQueues: Queue[];
  addvertising?: boolean;
}
