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
import { DepartmentScheme } from '@/entities/AddDepartmentFormDialog';
import { AllQueueProccessSchema } from '@/pages/QueuesPage';
import { DepartmentListSchema } from '@/pages/DepartmentPage';
import { AllMonitorListSchema } from '@/pages/AddMonitorPage';
import { ReportDoctorSchema } from '@/pages/TableReportsDoctorPage';
import { AdvertisementListSchema } from '@/pages/AddAdvertisementPage';
import { QueuesControlDoctorSchema } from '@/pages/QueuesControlDoctor';
import { ProccessControlPanelDoctorSchema } from '@/entities/ControlPanelDocktor';

import { AllAdsTypeSchema } from '@/pages/AddAdsPage';
import { AllMonitorsTypeSchema } from '@/pages/Monitors';
import { AllRoomsTypeSchema } from '@/pages/AddRoomPage';
import { AllDoctorsTypeSchema } from '@/pages/AddDoctorPage';
import { AllDepartmentTypeSchema } from '@/pages/AddDepartmentPage';
import { MonitorRoomListSchema } from '@/pages/AddRoomForMonitorPage';
import { AllFreeDoctorsTypeSchema } from '@/entities/AddRoomFormDialog';
import { AllReceptionsTypeSchema } from '@/pages/AddReceptionPage';

import {
  LastQueueDataSchema,
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from '@/pages/Reception';
import {
  AddsVideosDataRedux,
  MonitorAdsInRedux,
} from '@/entities/AdvertisementAttachmentMonitor';
import { InfoProjectRedux } from '@/entities/FileUploader';

type CombinedState<S> = {
  [K in keyof S]: S[K];
};

export interface StateSchema {
  authUser: AuthReduxType;
  allAds: AllAdsTypeSchema;
  RoomGetAll: RoomListSchema;
  allRooms: AllRoomsTypeSchema;
  doctorList: DoctorListScheam;
  lastQueue: LastQueueDataSchema;
  departmentAdd: DepartmentScheme;
  AllDoctors: AllDoctorsTypeSchema;
  allMonitors: AllMonitorsTypeSchema;
  departmentPage: DepartmentListSchema;
  getDoctorPageReducer: DoctorListSchema;
  allReceptions: AllReceptionsTypeSchema;
  GetAllMonitorPage: AllMonitorListSchema;
  allDepartments: AllDepartmentTypeSchema;
  reportControlDoctor: ReportDoctorSchema;
  allQueueProccess: AllQueueProccessSchema;
  allFreeDoctors: AllFreeDoctorsTypeSchema;
  currentQueue: CurrentQueueSchemaForReception;
  AddAdvertisementPage: AdvertisementListSchema;
  deparmentList: DepartmentListSchemaForReception;
  doneQueuesControlDoctor: QueuesControlDoctorSchema;
  GetAllRoomAtachmentMonitorSlice: MonitorRoomListSchema;
  controlPanelDoctorProccess: ProccessControlPanelDoctorSchema;
  allAdsVideo: AddsVideosDataRedux;
  allAdsForOneMonitor: MonitorAdsInRedux;
  infoProject: InfoProjectRedux;
  queuesControlDoctor: QueuesControlDoctorSchema;

  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
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
