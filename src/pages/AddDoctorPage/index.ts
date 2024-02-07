export { default as AddDoctorPage } from './ui/AddDoctorPage';

export type { AllDoctorsTypeSchema } from './model/types/doctorsTypesSchema';

export { allDoctorsSliceReducer } from './model/slice/getAllDoctorSlice';

export { fetchAllDoctors } from './model/service/fetchAllDoctors';
