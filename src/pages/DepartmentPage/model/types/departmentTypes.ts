export interface GetAllDepartment {
  config: {};
  data: {};
  headers: {};
  request: {};
  status: {};
  statusText: string;
}
export interface DepartmentListSchema {
  isLoading: boolean;
  error?: string;
  data?: GetAllDepartment[];
}

export interface ResponseOfBacend {
  data?: GetAllDepartment[];
}
