import { AxiosInstance } from 'axios';

import {
  Reducer,
  AnyAction,
  EnhancedStore,
  ReducersMapObject,
} from '@reduxjs/toolkit';

import { rtkApi } from '@/shared/api/rtkApi';
import { AuthReduxType } from '@/features/Auth';
// import { RoomListSchema } from '@/pages/admin/RoomPage';
import { DoctorListScheam } from '@/pages/ReportsPage';
import { DoctorListSchema } from '@/pages/admin/DoctorsListPage';
import { DepartmentScheme } from '@/entities/AddDepartmentFormDialog';
import { DepartmentListSchema } from '@/pages/admin/DepartmentPage';
import { AllMonitorListSchema } from '@/pages/admin/AddMonitorPage';
import { ReportDoctorSchema } from '@/pages/TableReportsDoctorPage';
import { AdvertisementListSchema } from '@/pages/admin/AddAdvertisementPage';
import { QueuesControlDoctorSchema } from '@/pages/doctorPage';
import { ProccessControlPanelDoctorSchema } from '@/entities/ControlPanelDocktor';

import { AllAdsTypeSchema } from '@/pages/admin/AddAdsPage';
import { AllMonitorsTypeSchema } from '@/pages/admin/Monitors';
import { AllRoomsTypeSchema } from '@/pages/admin/AddRoomPage';
import { AllDoctorsTypeSchema } from '@/pages/admin/AddDoctorPage';
import { AllDepartmentTypeSchema } from '@/pages/admin/AddDepartmentPage';
import { MonitorRoomListSchema } from '@/pages/admin/AddRoomForMonitorPage';
import { AllFreeDoctorsTypeSchema } from '@/entities/AddRoomFormDialog';
import { AllReceptionsTypeSchema } from '@/pages/admin/AddReceptionPage';

import {
  LastQueueDataSchema,
  CurrentQueueSchemaForReception,
  DepartmentListSchemaForReception,
} from '@/pages/ReceptionPage';
import {
  AddsVideosDataRedux,
  MonitorAdsInRedux,
} from '@/entities/AdvertisementAttachmentMonitor';
import { InfoProjectRedux } from '@/entities/FileUploader';
import { RoomListSchema } from '@/pages/admin/RoomPage/model/types/RoomTypes';
import { TvDataSchema } from '@/pages/TvmoreQueuePage/model/types/fetchTypeSchema';
import { AllQueueProccessSchema } from '@/pages/TvPage/model/types/allQueueProccessSchema';

type CombinedState<S> = {
  [K in keyof S]: S[K];
};

export interface StateSchema {
  authUser: AuthReduxType;
  TvData: TvDataSchema;
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
