export { default as AddDepartmentFormDialog } from './ui/AddDepartmentFormDialog';

export type {
  DepartmentType,
  DepartmentScheme,
} from './model/types/departmentType';

export { fetchDepartmentAdd } from './model/service/departmentAddResponse';

export { departmentAddSliceSliceReducer } from './model/slice/departmentAddSlice';
