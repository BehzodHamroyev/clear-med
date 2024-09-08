export interface Actives {
  _id: string;
  user: {
    _id: string;
    name: string;
    login: number;
    photo: string;
    role: string;
    passwordChangedDate: null;
    exprience: number;
    __v: number;
    id: string;
  };
  room: string;
  tillTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface QueuingTvCardProps {
  DoctorId?: string;
  CardLeftTitle?: string;
  CardLeftRoomNumber?: number | string;
  CardLeftDoctorName?: string;
  icon?: any;
  time?: string;
  proceedCount?: number;
  actives: Actives[];
}
