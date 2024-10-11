import { Reducer } from 'redux';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { AuthUserSliceReducer } from '@/features/Auth';
import { createReducerManager } from './reducerManager';
import { doctorListReducer } from '@/pages/ReportsPage';
import { RoomListSliceReducer } from '@/pages/admin/RoomPage';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { departmentAddSliceSliceReducer } from '@/entities/AddDepartmentFormDialog';
import { controlPanelDoctorReducer } from '@/entities/ControlPanelDocktor';
import { reportControlDoctorReducer } from '@/pages/TableReportsDoctorPage';
import {
  doneQueuesControlDoctorReducer,
  queuesControlDoctorReducer,
} from '@/pages/doctorPage';

import {
  lastQueueReducer,
  currentQueueuReducer,
  departmentListReducer,
} from '@/pages/ReceptionPage';
import {
  sliceAllAdsVideoForOneMonitorReducer,
  sliceAllAdsVideoReducer,
} from '@/entities/AdvertisementAttachmentMonitor';
import { infoProjectSliceReducer } from '@/entities/FileUploader';
import { allFreeDoctorsReducer } from '@/entities/AddRoomFormDialog';
import { allAdsReducer } from '@/pages/admin/AddAdsPage';
import { allDoctorsSliceReducer } from '@/pages/admin/AddDoctorPage';
import { allReceptionsReducer } from '@/pages/admin/AddReceptionPage';
import { allMonitorsReducer } from '@/pages/admin/Monitors';
import { AdvertisementListSliceReducer } from '@/pages/admin/AddAdvertisementPage';
import { allDepartmentsSliceReducer } from '@/pages/admin/AddDepartmentPage';
import { GetAllMonitorPageReducer } from '@/pages/admin/AddMonitorPage';
import { GetAllRoomAtachmentMonitorReducer } from '@/pages/admin/AddRoomForMonitorPage';
import { allRoomsReducer } from '@/pages/admin/AddRoomPage';
import { DepartmentListSliceReducer } from '@/pages/admin/DepartmentPage';
import { DoctorListSliceReducer } from '@/pages/admin/DoctorsListPage';
import { allQueueProccessReducer } from '@/pages/TvPage/model/slice/allQueueProccessSlice';

type CombinedState<S> = {
  [K in keyof S]: S[K];
};

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // login: AuthSliceReducer,
    queuesControlDoctor: queuesControlDoctorReducer,
    allAds: allAdsReducer,
    allRooms: allRoomsReducer,
    lastQueue: lastQueueReducer,
    doctorList: doctorListReducer,
    authUser: AuthUserSliceReducer,
    allMonitors: allMonitorsReducer,
    RoomGetAll: RoomListSliceReducer,
    AllDoctors: allDoctorsSliceReducer,
    allReceptions: allReceptionsReducer,
    currentQueue: currentQueueuReducer,
    deparmentList: departmentListReducer,
    allFreeDoctors: allFreeDoctorsReducer,
    allQueueProccess: allQueueProccessReducer,
    allDepartments: allDepartmentsSliceReducer,
    departmentPage: DepartmentListSliceReducer,
    GetAllMonitorPage: GetAllMonitorPageReducer,
    getDoctorPageReducer: DoctorListSliceReducer,
    departmentAdd: departmentAddSliceSliceReducer,
    reportControlDoctor: reportControlDoctorReducer,
    AddAdvertisementPage: AdvertisementListSliceReducer,
    controlPanelDoctorProccess: controlPanelDoctorReducer,
    doneQueuesControlDoctor: doneQueuesControlDoctorReducer,
    GetAllRoomAtachmentMonitorSlice: GetAllRoomAtachmentMonitorReducer,
    allAdsVideo: sliceAllAdsVideoReducer,
    infoProject: infoProjectSliceReducer,
    allAdsForOneMonitor: sliceAllAdsVideoForOneMonitorReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
