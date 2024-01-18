export { default as QueuingTv } from './ui/QueuingTv';

export { departmentListReducer } from './model/slice/departmentListSlice';
export { currentQueueuReducer } from './model/slice/currentQueueListSlice';

export type {
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from './model/types/departmentListSchema';
export type { CurrentQueueDataType } from './model/types/departmentListTypes';
