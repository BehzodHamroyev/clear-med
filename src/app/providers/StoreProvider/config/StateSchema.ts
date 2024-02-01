import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';

import {
  Reducer,
  AnyAction,
  EnhancedStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { rtkApi } from '@/shared/api/rtkApi';
import { AuthReduxType } from '@/features/Auth';
import { RoomListSchema } from '@/pages/RoomPage';
import { DoctorListScheam } from '@/pages/ReportsPage';
import { DoctorListSchema } from '@/pages/DoctorsListPage';
import { DepartmentScheme } from '@/entities/DepartmentAdd';
import { AllQueueProccessSchema } from '@/pages/QueuesPage';
import { DepartmentListSchema } from '@/pages/DepartmentPage';
import { AllMonitorListSchema } from '@/pages/AddMonitorPage';
import { ReportDoctorSchema } from '@/pages/TableReportsDoctorPage';
import { AdvertisementListSchema } from '@/pages/AddAdvertisementPage';
import { QueuesControlDoctorSchema } from '@/pages/QueuesControlDoctor';
import { ProccessControlPanelDoctorSchema } from '@/entities/ControlPanelDocktor';

import {
  LastQueueDataSchema,
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from '@/pages/QueuingTV';
import { MonitorRoomListSchema } from '@/entities/RoomAttachmentMonitor';

export interface StateSchema {
  authUser: AuthReduxType;
  RoomGetAll: RoomListSchema;
  doctorList: DoctorListScheam;
  lastQueue: LastQueueDataSchema;
  departmentAdd: DepartmentScheme;
  departmentPage: DepartmentListSchema;
  getDoctorPageReducer: DoctorListSchema;
  GetAllMonitorPage: AllMonitorListSchema;
  reportControlDoctor: ReportDoctorSchema;
  allQueueProccess: AllQueueProccessSchema;
  currentQueue: CurrentQueueSchemaForReception;
  AddAdvertisementPage: AdvertisementListSchema;
  deparmentList: DepartmentListSchemaForReception;
  doneQueuesControlDoctor: QueuesControlDoctorSchema;
  GetAllRoomAtachmentMonitorSlice: MonitorRoomListSchema;
  controlPanelDoctorProccess: ProccessControlPanelDoctorSchema;

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
