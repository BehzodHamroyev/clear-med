interface Queue {
  _id: string;
  department_id: string;
  room_id: string;
  doctor_id: string;
  queues_name: string;
  step: number;
  status: string;
  created_date: string;
  created_time: string;
  accepted_date: string;
  id: string;
}

interface Room {
  _id: string;
  name: number;
  department_id: string;
  doctor_id: string;
  disabled: boolean;
  proceed: any[]; // The type should be adjusted based on the actual data structure
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
  __v: number;
  id: string;
}

export interface AllQueueProccessApiResponse {
  status: string;
  monitor: Monitor;
}
