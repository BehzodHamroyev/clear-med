import { CombinedState, Reducer } from 'redux';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';

import { allRoomsReducer } from '@/pages/AddRoomPage';
import { AuthUserSliceReducer } from '@/features/Auth';
import { createReducerManager } from './reducerManager';
import { doctorListReducer } from '@/pages/ReportsPage';
import { RoomListSliceReducer } from '@/pages/RoomPage';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { allQueueProccessReducer } from '@/pages/QueuesPage';
import { DoctorListSliceReducer } from '@/pages/DoctorsListPage';
import { GetAllMonitorPageReducer } from '@/pages/AddMonitorPage';
import { DepartmentListSliceReducer } from '@/pages/DepartmentPage';
import { allDepartmentsSliceReducer } from '@/pages/AddDepartmentPage';
import { departmentAddSliceSliceReducer } from '@/entities/AddDepartmentFormDialog';
import { controlPanelDoctorReducer } from '@/entities/ControlPanelDocktor';
import { reportControlDoctorReducer } from '@/pages/TableReportsDoctorPage';
import { doneQueuesControlDoctorReducer } from '@/pages/QueuesControlDoctor';
import { AdvertisementListSliceReducer } from '@/pages/AddAdvertisementPage';
import { GetAllRoomAtachmentMonitorReducer } from '@/entities/RoomAttachmentMonitor';

import {
  lastQueueReducer,
  currentQueueuReducer,
  departmentListReducer,
} from '@/pages/QueuingTV';
import { allDoctorsSliceReducer } from '@/pages/AddDoctorPage';
import { allFreeDoctorsReducer } from '@/entities/AddRoomFormDialog';
import { allMonitorsReducer } from '@/pages/Monitors';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // login: AuthSliceReducer,

    allMonitors: allMonitorsReducer,
    allRooms: allRoomsReducer,
    lastQueue: lastQueueReducer,
    doctorList: doctorListReducer,
    authUser: AuthUserSliceReducer,
    RoomGetAll: RoomListSliceReducer,
    AllDoctors: allDoctorsSliceReducer,
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
