export { default as DoctorsListPage } from './ui/DoctorListPage';

export type { DoctorListSchema } from './model/types/doctorListTypes';

export { DoctorListSlice } from './model/slice/getDoctorSlice';

export { DoctorListSliceReducer } from './model/slice/getDoctorSlice';

export { fetchDoctorGetAll } from './model/service/fetchDoctorGetAll';

export { getListOfDoctor } from './model/selector/doctorListSelector';
