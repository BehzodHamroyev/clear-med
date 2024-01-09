interface Department {
  name: string;
  id: string | null;
}

interface Room {
  name: number;
  id: string | null;
}

interface Doctor {
  name: string;
}

export interface Queue {
  _id: string;
  department_id: Department;
  room_id: Room;
  doctor_id: Doctor;
  queues_name: string[];
  step: number;
  created_date: string;
  status: string;
  created_time: string;
  accepted_date: string;
  __v: number;
  id: string;
}

export interface QueueApiResponseControlDoctorTypes {
  length: number;
  message: string;
  queues: Queue[];
}
