import React from 'react';

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
import { LoaderAdmin } from '@/widgets/LoaderAdmin';
import { ErrorReload } from '@/widgets/Error';

const AddMonitorPage = () => {
  const dispatch = useAppDispatch();

  const reducers: ReducersList = {
    GetAllMonitorPage: GetAllMonitorPageReducer,
  };

  const getAdvertisementError = useSelector(getError);

  const getAdvertisementLoading = useSelector(getIsLoading);

  const getListOfAdvertisements = useSelector(GetAllMonitorPageData);

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
      {getAdvertisementLoading === true ? (
        <LoaderAdmin />
      ) : getAdvertisementError ? (
        <ErrorReload message={getAdvertisementError} />
      ) : (
        <div>
          <div className={cls.AddMonitorPageWrapper}>
            <ButtonNavbar
              CreateCarbonAdd
              TableTitle="Monitor qo’shish"
              ItemsLength={3}
            />

            <div className={cls.MonitorsList}>
              {getListOfAdvertisements?.map((item, index) => (
                <Monitors
                  key={item.id}
                  number={index + 1}
                  name={item.name}
                  id={item.id}
                />
              ))}
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
