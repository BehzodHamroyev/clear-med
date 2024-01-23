export { default as DepartmentAdd } from './ui/DepartmentAdd';

export type {
  DepartmentType,
  DepartmentScheme,
} from './model/types/departmentType';

export { fetchDepartmentAdd } from './model/service/departmentAddResponse';

export { departmentAddSliceSliceReducer } from './model/slice/departmentAddSlice';
