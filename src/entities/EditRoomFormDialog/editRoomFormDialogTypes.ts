interface Department {
  _id?: string;
  name?: string;
  duration?: number;
  image?: string;
  disabled?: boolean;
  photo?: string;
  __v?: number;
  id?: string;
}

interface Doctor {
  _id?: string;
  name?: string;
  login?: number;
  role?: string;
  passwordChangedDate?: null | string;
  exprience?: number;
  photo?: string;
  __v?: number;
  id?: string;
}

interface Message {
  _id?: string;
  name?: number;
  department_id?: Department;
  doctor_id?: Doctor;
  disabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  id?: string;
}

interface roomCurrentDataType {
  _id?: string;
  name?: number;
  department_id?: Department;
  doctor_id?: Doctor;
  disabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  id?: string;
}

export interface ApiResponse {
  message?: Message;
}

export interface EditRoomFormDialogProps {
  roomId: string;
}

export interface RoomEditFormData {
  roomNumber?: string;
  departmentId?: string;
  doctorId?: string;
}

export interface RoomEditDataSchema {
  isLoading?: boolean;
  isError?: boolean;
  data?: RoomEditFormData;
}
