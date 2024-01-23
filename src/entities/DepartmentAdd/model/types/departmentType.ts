export interface DepartmentType {
  // token(arg0: string, token: any): unknown;
  // name: string;
  // image: string;
  // duration: string;

  status: string;
  department: {
    name: string;
    duration: number;
    image: string;
    disabled: boolean;
    photo: string;
    _id: string;
    __v: number;
    id: string;
  };
}

export interface DepartmentScheme {
  isLoading: boolean;
  error: string;
  data?: DepartmentType;
}
