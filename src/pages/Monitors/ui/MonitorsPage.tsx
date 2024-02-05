import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './Monitors.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllMonitors } from '../model/services/fetchAllMonitors';
import {
  getAllMonitorsData,
  getAllMonitorsError,
  getAllMonitorsIsLoading,
} from '../model/selector/allMonitorsSelector';

import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { Loader } from '@/widgets/Loader';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { useAllQueueProccessActions } from '@/pages/QueuesPage/model/slice/allQueueProccessSlice';

const MonitorsPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const allMonitorsData = useSelector(getAllMonitorsData);
  const allMonitorsIsLoading = useSelector(getAllMonitorsIsLoading);
  const allMonitorsError = useSelector(getAllMonitorsError);

  const { clearProccessQueue } = useAllQueueProccessActions();

  useEffect(() => {
    dispatch(fetchAllMonitors({}));

    clearProccessQueue();
  }, [clearProccessQueue, dispatch]);

  return (
    <div className={classNames(cls.Monitors)}>
      <div className={classNames(cls.Monitors__header)}>
        <div className={classNames(cls['Monitors__header--left'])}>
          <p>{t('Monitorlar')}:</p>
          <span>{10}</span>
          <div />
        </div>
      </div>

      {allMonitorsData && allMonitorsData.length > 0 ? (
        <div className={classNames(cls.Monitors__monitorsBox)}>
          {allMonitorsData.map((item) => (
            <Link
              to={`/monitors/${item.id}`}
              key={item._id}
              className={classNames(cls['Monitors__monitorsBox--monitorCard'])}
            >
              <h2>{item?.name}</h2>
              {/* <p>Monitor nomi</p> */}
            </Link>
          ))}
        </div>
      ) : !allMonitorsIsLoading ? (
        <h2>{t('Monitorlar mavjud emas')}</h2>
      ) : (
        ''
      )}

      {allMonitorsIsLoading && <Loader />}

      {allMonitorsError && <ErrorDialog isErrorProps={!false} />}
    </div>
  );
};

export default MonitorsPage;
