import React, { useContext } from 'react';

import { useSelector } from 'react-redux';
import { Monitors } from '@/entities/Monitors';
import { MonitorAdd } from '@/entities/MonitorAdd';
import { MonitorEdit } from '@/entities/MonitorEdit';
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
import { ErrorReload } from '@/widgets/Error';
import { Loader } from '@/widgets/Loader';

const AddMonitorPage = () => {
  const dispatch = useAppDispatch();

  const { getResponseData } = useContext(ButtonsContext);

  const reducers: ReducersList = {
    GetAllMonitorPage: GetAllMonitorPageReducer,
  };

  const getAllMonitorError = useSelector(getError);

  const getAllMonitorIsLoading = useSelector(getIsLoading);

  const getAllMonitorData = useSelector(GetAllMonitorPageData);

  const {
    isOpenMonitorAddCard,
    isOpenMonitorEditCard,
    setIsOpenMonitorAddCard,
    setIsOpenMonitorEditCard,
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
                    id={item.monitors[0].id}
                  />
                );
              })}
            </div>
          </div>

          {isOpenMonitorAddCard ? <MonitorAdd /> : ''}

          {isOpenMonitorEditCard ? <MonitorEdit /> : ''}
        </div>
      )}
    </DynamicModuleLoader>
  );
};

export default AddMonitorPage;
