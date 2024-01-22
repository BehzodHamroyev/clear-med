import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { AuthUserSliceReducer } from '@/features/Auth';
import { DepartmentListSliceReducer } from '@/pages/DepartmentPage';
import { controlPanelDoctorReducer } from '@/entities/ControlPanelDocktor';
import { doneQueuesControlDoctorReducer } from '@/pages/QueuesControlDoctor';
import { reportControlDoctorReducer } from '@/pages/TableReportsDoctorPage';
import { DoctorListSliceReducer } from '@/pages/DoctorsListPage';
import { RoomListSliceReducer } from '@/pages/RoomPage';
import {
  lastQueueReducer,
  currentQueueuReducer,
  departmentListReducer,
} from '@/pages/QueuingTV';
import { departmentAddSliceSliceReducer } from '@/entities/DepartmentAdd';
import { doctorListReducer } from '@/pages/ReportsPage';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    // login: AuthSliceReducer,

    getDoctorPageReducer: DoctorListSliceReducer,
    authUser: AuthUserSliceReducer,
    departmentPage: DepartmentListSliceReducer,
    controlPanelDoctorProccess: controlPanelDoctorReducer,
    doneQueuesControlDoctor: doneQueuesControlDoctorReducer,
    reportControlDoctor: reportControlDoctorReducer,
    deparmentList: departmentListReducer,
    currentQueue: currentQueueuReducer,
    RoomGetAll: RoomListSliceReducer,
    lastQueue: lastQueueReducer,
    departmentAdd:departmentAddSliceSliceReducer,
    doctorList: doctorListReducer,

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
