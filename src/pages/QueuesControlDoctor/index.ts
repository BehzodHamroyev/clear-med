export { queuesControlDoctorReducer } from './model/slice/queuesControlDoctorSlice';

export { fetchQueuesControlDoctor } from './model/services/fetchQueuesControlDoctor';

export { getQueuesControlDoctorData } from './model/selectors/queuesControlDoctorSelector';

export { doneQueuesControlDoctorReducer } from './model/slice/doneQueuesControlDoctorSlice';

export { default as QueuesControlDoctor } from './ui/QueuesControlDoctor';

export type { QueuesControlDoctorSchema } from './model/types/queuesControlDoctorSchema';
export type {
  Queue,
  QueueApiResponseControlDoctorTypes,
} from './model/types/queuesControlDoctorTypes';
