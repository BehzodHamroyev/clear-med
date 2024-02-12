interface Room {
  name: number;
  department_id: string;
  doctor_id: string;
  disabled: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface RoomAddTypes {
  status: string;
  room: Room;
}
