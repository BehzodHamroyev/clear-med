interface DoctorAddDataTypes {
  name?: string;
  login?: number | string;
  photo?: string;
  role?: string;
  password?: string;
  passwordChangedDate?: null;
  exprience?: number;
  active?: boolean;
  _id?: string;
  __v?: number;
  id?: string;
}

export interface DoctorAddTypes {
  status?: string;
  data?: DoctorAddDataTypes[];
}

export interface FormDataInState {
  name: string;
  file: File | null;
  login: null | string | number;
  password: string | number;
  exprience: null | string | number;
}
