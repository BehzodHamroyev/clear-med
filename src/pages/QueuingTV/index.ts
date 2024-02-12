export { getLastQueueData } from './model/selectors/lastQueueSelector';

export { default as QueuingTv } from './ui/QueuingTv';

export {
  lastQueueReducer,
  useLasQueueActions,
} from './model/slice/lastQueueSlice';
export { departmentListReducer } from './model/slice/departmentListSlice';
export { currentQueueuReducer } from './model/slice/currentQueueListSlice';

export type {
  LastQueueDataSchema,
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from './model/types/departmentListSchema';
export type { CurrentQueueDataType } from './model/types/departmentListTypes';
