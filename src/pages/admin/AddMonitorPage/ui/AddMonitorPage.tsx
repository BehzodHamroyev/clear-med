import React, { useContext, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './addMonitorPage.module.scss';

import { Loader } from '@/widgets/Loader';
import Toast from '@/shared/ui/Toast/Toast';
import { ErrorReload } from '@/widgets/Error';
import { Monitors } from '@/entities/Monitors';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchGetAllMonitors } from '../model/service/fetchGetAllMonitors';
import { GetAllMonitorPageReducer } from '../model/slice/GetAllMonitorsSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
  getError,
  getIsLoading,
  GetAllMonitorPageData,
} from '../model/selector/GetAllMonitorSelectorSlice';

import { AddMonitorFormDialog } from '@/entities/AddMonitorFormDialog';
import { EditMonitorFormDialog } from '@/entities/EditMonitorFormDialog';
import { DeleteMonitorFormDialog } from '@/entities/DeleteMonitorFormDialog';

const AddMonitorPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const getAllMonitorError = useSelector(getError);
  const getAllMonitorIsLoading = useSelector(getIsLoading);

  const getAllMonitorData = useSelector(GetAllMonitorPageData);

  const {
    hasOpenToast,
    isOpenMonitorAddCard,
    isOpenMonitorEditCard,
    setIsOpenMonitorAddCard,
    isOpenMonitorDeleteCard,
    toastDataForAddRoomForm,
  } = useContext(ButtonsContext);

  const handleCardAddCard = () => {
    setIsOpenMonitorAddCard(true);
  };

  useEffect(() => {
    dispatch(fetchGetAllMonitors({}));
  }, [dispatch]);

  return (
    <>
      {getAllMonitorIsLoading && <Loader />}

      {getAllMonitorError && <ErrorReload message={getAllMonitorError} />}

      {getAllMonitorData && (
        <div>
          <div className={cls.AddMonitorPageWrapper}>
            <div className={cls.AddMonitorPageWrapper__Title}>
              <p className={cls['AddMonitorPageWrapper__Title--text']}>
                {t("Monitor qo'shish")}{' '}
                <span className={cls['AddMonitorPageWrapper__Title--span']}>
                  ({getAllMonitorData?.length || 0})
                </span>{' '}
              </p>

              <div className={cls['AddMonitorPageWrapper__Title--IconDiv']}>
                <CarbonAdd
                  onClick={handleCardAddCard}
                  className={cls['AddMonitorPageWrapper__Title--Icon']}
                />
              </div>
            </div>

            <div className={cls.MonitorsList}>
              {getAllMonitorData?.map((item:any, index:number) => {
                return (
                  <Monitors
                    id={item.id}
                    key={item.id}
                    name={item.name}
                    number={index + 1}
                  />
                );
              })}
            </div>
          </div>

          {isOpenMonitorAddCard ? <AddMonitorFormDialog /> : ''}

          {isOpenMonitorEditCard ? <EditMonitorFormDialog /> : ''}

          {isOpenMonitorDeleteCard ? <DeleteMonitorFormDialog /> : ''}
        </div>
      )}

      {hasOpenToast && (
        <Toast
          message={toastDataForAddRoomForm?.toastMessageForAddRoomForm}
          severity={toastDataForAddRoomForm?.toastSeverityForAddRoomForm}
        />
      )}
    </>
  );
};

export default AddMonitorPage;
