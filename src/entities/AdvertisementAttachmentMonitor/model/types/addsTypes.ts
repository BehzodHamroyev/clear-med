export interface OneAdds {
  _id: string;
  name: string;
  link: string;
  photo: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AddsVideosDataBackend {
  status: string;
  result: number;
  data: OneAdds[];
}

export interface AddsVideosDataRedux {
  isLoading?: boolean;
  error?: string;
  data?: OneAdds[];
}

export interface Videos {
  _id: string;
  name: string;
  link: string;
  photo: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface Rooms {
  _id: string;
  name: number;
  department_id: {
    _id: string;
    name: string;
    duration: number;
    image: string;
    disabled: boolean;
    photo: string;
    __v: 0;
    updatedAt: string;
    id: string;
  };
  doctor_id: {
    _id: string;
    name: string;
    login: number;
    role: string;
    passwordChangedDate: null;
    __v: 0;
    exprience: 3;
    photo: string;
    id: string;
  };
  disabled: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
  id: string;
}

export interface MonitorAdsBackend {
  monitor: {
    _id: string;
    name: string;
    disabled: false;
    addvertising: true;
    rooms: Rooms[];
    videos: Videos[];
    createdAt: string;
    updatedAt: string;
    __v: 2;
    id: string;
  };
}

export interface MonitorAdsInRedux {
  isLoading: boolean;
  data?: Videos[];
  id?:string
  error?: string;
}
