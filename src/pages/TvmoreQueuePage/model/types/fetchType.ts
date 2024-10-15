interface Department {
  _id: string;
  name: string;
  nameEn: string;
  nameRu: string;
  id: string;
}

interface Proceed {
  _id: string;
  queues_name: string;
  id: string;
}

interface Room {
  _id: string;
  name: number;
  department_id: Department;
  proceed: Proceed[];
  id: string;
}

export interface Monitor {
  _id: string;
  name: string;
  monitor: string;
  rooms: Room[];
  id: string;
}

export interface DataTv {
  status: string;
  monitor: Monitor;
}
