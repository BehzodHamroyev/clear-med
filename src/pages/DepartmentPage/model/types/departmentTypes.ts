export interface GetAllDepartmentData {
  disabled: boolean;
  duration: number;
  id: string;
  image: string;
  name: string;
  __v: number;
  _id: string;
}

export interface GetAllDepartment {
  department: any;
  config: {};
  data: GetAllDepartmentData;
  headers: {};
  request: {};
  status: {};
  statusText: string;
}
export interface DepartmentListSchema {
  isLoading: boolean;
  error?: string;
  data?: GetAllDepartmentData[];
}

export interface ResponseOfBacend {
  data?: GetAllDepartment[];
}
