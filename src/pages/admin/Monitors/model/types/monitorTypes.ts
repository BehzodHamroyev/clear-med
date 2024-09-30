interface MonitorDetail {
  _id: string;
  name: string;
  monitor: string;
  disabled: boolean;
  addvertising: boolean;
  rooms: string[];
  videos: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Monitor {
  _id: string;
  name: string;
  login: number;
  photo: string;
  role: string;
  passwordChangedDate: null | string;
  exprience: number;
  __v: number;
  monitors: MonitorDetail[];
  id: string;
}

export interface MonitorApiResponse {
  status: string;
  message: string;
  data: Monitor[];
}
