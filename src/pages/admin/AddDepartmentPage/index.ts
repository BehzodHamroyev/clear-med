export {
  getAllDepartmentsData,
  getAllDepartmentsError,
  getAllDepartmentsIsLoading,
} from './model/selector/AllDepartmentSelector';


export { default as AddDepartmentPage } from './ui/AddDepartmentPage';

export type { AllDepartmentTypeSchema } from './model/types/departmentTypesSchema';

export { allDepartmentsSliceReducer } from './model/slice/getDepartmentSlice';

export type { Department } from './model/types/departmentTypes';
