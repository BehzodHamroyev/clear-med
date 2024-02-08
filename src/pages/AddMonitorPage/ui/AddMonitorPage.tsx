import React, { useContext, useState } from 'react';

import { useSelector } from 'react-redux';
import { Monitors } from '@/entities/Monitors';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchGetAllMonitors } from '../model/service/fetchGetAllMonitors';
import { GetAllMonitorPageReducer } from '../model/slice/GetAllMonitorsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getError,
  getIsLoading,
  GetAllMonitorPageData,
} from '../model/selector/GetAllMonitorSelectorSlice';

import {
  ReducersList,
  DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import cls from './addMonitorPage.module.scss';

import { Loader } from '@/widgets/Loader';
import Toast from '@/shared/ui/Toast/Toast';
import { ErrorReload } from '@/widgets/Error';
import { AddMonitorFormDialog } from '@/entities/MonitorAdd';
import { EditMonitorFormDialog } from '@/entities/EditMonitorFormDialog';
import { DeleteMonitorFormDialog } from '@/entities/DeleteMonitorFormDialog';

const AddMonitorPage = () => {
  const dispatch = useAppDispatch();

  const [monitorEditId, setMonitorEditId] = useState<string>();

  const { getResponseData } = useContext(ButtonsContext);

  const reducers: ReducersList = {
    GetAllMonitorPage: GetAllMonitorPageReducer,
  };

  const getAllMonitorError = useSelector(getError);

  const getAllMonitorIsLoading = useSelector(getIsLoading);

  const getAllMonitorData = useSelector(GetAllMonitorPageData);

  const {
    hasOpenToast,
    isOpenMonitorAddCard,
    isOpenMonitorEditCard,
    isOpenMonitorDeleteCard,
    toastDataForAddRoomForm,
  } = React.useContext(ButtonsContext);

  React.useEffect(() => {
    dispatch(fetchGetAllMonitors({}));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      {getAllMonitorIsLoading && <Loader />}

      {getAllMonitorError && <ErrorReload message={getAllMonitorError} />}

      {getAllMonitorData && (
        <div>
          <div className={cls.AddMonitorPageWrapper}>
            <ButtonNavbar
              CreateCarbonAdd
              TableTitle="Monitor qo’shish"
              ItemsLength={getAllMonitorData?.length}
            />

            <div className={cls.MonitorsList}>
              {getAllMonitorData?.map((item, index) => {
                return (
                  <Monitors
                    key={item.id}
                    name={item.name}
                    number={index + 1}
                    id={item.id}
                  />
                );
              })}
            </div>
          </div>
          {isOpenMonitorAddCard ? <AddMonitorFormDialog /> : ''}
          {isOpenMonitorEditCard ? <EditMonitorFormDialog /> : ''}

          {isOpenMonitorDeleteCard && <DeleteMonitorFormDialog />}
        </div>
      )}

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}
    </DynamicModuleLoader>
  );
};

export default AddMonitorPage;
