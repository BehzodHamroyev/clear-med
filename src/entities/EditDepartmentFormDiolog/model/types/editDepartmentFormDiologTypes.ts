// interface Department {
//   photo: string;
//   _id: string;
//   name: string;
//   duration: number;
//   image: string;
//   disabled: boolean;
//   __v: number;
//   id: string;
// }

export interface DepartmentEditFormData {
  roomNumber?: string;
  departmentId?: string;
  doctorId?: string;
}

export interface Department {
  name?: string;
  duration?: number;
  image?: string | number;
  photo?: string;
  renderPhoto?: any;
}
export interface EditDepartmentTypeSchema {
  isLoading?: boolean;
  error?: boolean;
  data?: Department;
}

export interface EditDepartmentFormDiologTypes {
  editDepartmentId: string;
}
