import { CombinedState, Reducer } from 'redux';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { AuthUserSliceReducer } from '@/features/Auth';
import { createReducerManager } from './reducerManager';
import { doctorListReducer } from '@/pages/ReportsPage';
import { RoomListSliceReducer } from '@/pages/RoomPage';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { allQueueProccessReducer } from '@/pages/QueuesPage';
import { DoctorListSliceReducer } from '@/pages/DoctorsListPage';
import { GetAllMonitorPageReducer } from '@/pages/AddMonitorPage';
import { DepartmentListSliceReducer } from '@/pages/DepartmentPage';
import { departmentAddSliceSliceReducer } from '@/entities/DepartmentAdd';
import { controlPanelDoctorReducer } from '@/entities/ControlPanelDocktor';
import { reportControlDoctorReducer } from '@/pages/TableReportsDoctorPage';
import { doneQueuesControlDoctorReducer } from '@/pages/QueuesControlDoctor';
import { AdvertisementListSliceReducer } from '@/pages/AddAdvertisementPage';

import {
  lastQueueReducer,
  currentQueueuReducer,
  departmentListReducer,
} from '@/pages/QueuingTV';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // login: AuthSliceReducer,

    lastQueue: lastQueueReducer,
    doctorList: doctorListReducer,
    authUser: AuthUserSliceReducer,
    RoomGetAll: RoomListSliceReducer,
    currentQueue: currentQueueuReducer,
    deparmentList: departmentListReducer,
    allQueueProccess: allQueueProccessReducer,
    departmentPage: DepartmentListSliceReducer,
    GetAllMonitorPage: GetAllMonitorPageReducer,
    getDoctorPageReducer: DoctorListSliceReducer,
    departmentAdd: departmentAddSliceSliceReducer,
    reportControlDoctor: reportControlDoctorReducer,
    AddAdvertisementPage: AdvertisementListSliceReducer,
    controlPanelDoctorProccess: controlPanelDoctorReducer,
    doneQueuesControlDoctor: doneQueuesControlDoctorReducer,

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
