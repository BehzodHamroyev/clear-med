export interface EditDepartmentFormDiologTypes {
  editDepartmentId: string;
}

interface Department {
  photo: string;
  _id: string;
  name: string;
  duration: number;
  image: string;
  disabled: boolean;
  __v: number;
  id: string;
}

export interface DepartmentEditFormData {
  roomNumber?: string;
  departmentId?: string;
  doctorId?: string;
}
