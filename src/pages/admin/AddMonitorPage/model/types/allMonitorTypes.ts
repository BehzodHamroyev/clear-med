export interface MonitorData {
  addvertising: boolean;
  _id: string;
  name: string;
  monitor: string;
  disabled: boolean;
  rooms: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  videos: string[];
  id: string;
}

export interface AllMonitorData {
  _id: string;
  name: string;
  login: number;
  photo: string;
  role: string;
  passwordChangedDate: null;
  exprience: number;
  __v: number;
  monitors: MonitorData[];
  id: string;
}

export interface Monitor {
  status: string;
  message: number;
  data: AllMonitorData[];
}

export interface AllMonitorListSchema {
  isLoading: boolean;
  error?: string;
  data?: AllMonitorData[];
}
