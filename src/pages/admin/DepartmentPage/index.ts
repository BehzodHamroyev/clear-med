export { default as DepartmentPage } from './ui/DepartmentPage';
export { DepartmentListSliceReducer } from './model/slice/getDepartmentSlice';

export type { DepartmentListSchema } from './model/types/departmentTypes';

export { fetchDepartmentGetAll } from './model/service/getAllDepartmentRequest';

export { getListOfDepartmens } from './model/selectors/departmentList';
