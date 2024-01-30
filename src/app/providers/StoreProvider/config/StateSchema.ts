import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtkApi';
import { AuthReduxType } from '@/features/Auth';
import { QueuesControlDoctorSchema } from '@/pages/QueuesControlDoctor';
import { ProccessControlPanelDoctorSchema } from '@/entities/ControlPanelDocktor';
import { ReportDoctorSchema } from '@/pages/TableReportsDoctorPage';
import { DepartmentListSchema } from '@/pages/DepartmentPage';
import { DoctorListSchema } from '@/pages/DoctorsListPage';
import {
  LastQueueDataSchema,
  DepartmentListSchemaForReception,
  CurrentQueueSchemaForReception,
} from '@/pages/QueuingTV';
import { RoomListSchema } from '@/pages/RoomPage';
import { DepartmentScheme } from '@/entities/DepartmentAdd';
import { DoctorListScheam } from '@/pages/ReportsPage';
import { AllQueueProccessSchema } from '@/pages/QueuesPage';

import { AdvertisementListSchema } from '@/pages/AddAdvertisementPage';

export interface StateSchema {
  authUser: AuthReduxType;
  departmentPage: DepartmentListSchema;
  controlPanelDoctorProccess: ProccessControlPanelDoctorSchema;
  doneQueuesControlDoctor: QueuesControlDoctorSchema;
  reportControlDoctor: ReportDoctorSchema;
  getDoctorPageReducer: DoctorListSchema;
  deparmentList: DepartmentListSchemaForReception;
  currentQueue: CurrentQueueSchemaForReception;
  RoomGetAll: RoomListSchema;
  lastQueue: LastQueueDataSchema;
  departmentAdd: DepartmentScheme;
  doctorList: DoctorListScheam;
  allQueueProccess: AllQueueProccessSchema;
  AddAdvertisementPage: AdvertisementListSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  // Asynchronous reducers
  queuesControlDoctor?: QueuesControlDoctorSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  [x: string]: any;
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
