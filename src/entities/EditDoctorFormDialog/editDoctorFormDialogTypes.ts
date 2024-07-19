export interface ApiResponseDoctorDataType {
  status: string;
  data: {
    name: string;
    login: string;
    exprience: number;
    photo: string;
  };
}

export interface DoctorEditFormData {
  roomNumber?: string;
  departmentId?: string;
  doctorId?: string;
}

export interface DoctorEditDataSchema {
  isLoading?: boolean;
  isError?: boolean;
  data?: {
    name?: string;
    login?: string;
    exprience?: string;
    photo?: string;
    password?: string;
  };
}
