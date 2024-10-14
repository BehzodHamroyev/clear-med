export { getLastQueueData } from './model/selectors/lastQueueSelector';

export { fetchDepartmentList } from './model/services/fetchDepartmentList';

export {
  lastQueueReducer,
  useLasQueueActions,
} from './model/slice/lastQueueSlice';

export { fetchLastQueue } from './model/services/fetchLastQueue';
export { departmentListReducer } from './model/slice/departmentListSlice';
export { currentQueueuReducer } from './model/slice/currentQueueListSlice';
export type {
  LastQueueDataSchema,
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from './model/types/departmentListSchema';

export type { CurrentQueueDataType } from './model/types/departmentListTypes';
