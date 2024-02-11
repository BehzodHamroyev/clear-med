interface DoctorAddDataTypes {
  name?: string;
  login?: number | string;
  photo?: string;
  role?: string;
  password?: string;
  passwordChangedDate?: null;
  exprience?: number | boolean;
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
  password: string | number;
  login: string | number;
  exprience: Boolean;
}
