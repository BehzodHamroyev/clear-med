/* eslint-disable react/button-has-type */
import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import cls from './QueuingTv.module.scss';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueuingTvCard from '@/entities/QueuingTvCard/ui/QueuingTvCard';
import { fetchDepartmentList } from '../model/services/fetchDepartmentList';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import QueuingTvCardPopapSecond from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond/ui/QueuingTvCardPopapSecond';

import {
  getDeparmentListData,
  getDeparmentListError,
  getDeparmentListIsLoading,
} from '../model/selectors/departmentListSelector';

import {
  getCurrentQueueData,
  getCurrentQueueError,
  getCurrentQueueIsLoading,
} from '../model/selectors/currentQueueSelector';

import {
  getLastQueueData,
  getLastQueueError,
  getLastQueueIsLoading,
} from '../model/selectors/lastQueueSelector';

const QueuingTv = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { isOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const deparmentList = useSelector(getDeparmentListData);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);
  const deparmentListError = useSelector(getDeparmentListError);

  const currentQueue = useSelector(getCurrentQueueData);
  const currentQueueIsLoading = useSelector(getCurrentQueueIsLoading);
  const currentQueueError = useSelector(getCurrentQueueError);

  const lastQueue = useSelector(getLastQueueData);
  const lastQueueIsLoading = useSelector(getLastQueueIsLoading);
  const lastQueueError = useSelector(getLastQueueError);

  useEffect(() => {
    dispatch(fetchDepartmentList({ limit: 'all' }));
  }, [dispatch]);

  return (
    <div className={cls.QueuingTvWrapper}>
      <div className={cls.RenderSectionCard}>
        {deparmentList &&
          deparmentList.map((item: any) => (
            <QueuingTvCard
              key={item.id}
              CardLeftRoomNumber={item.name}
              DoctorId={item.doctor_id[0].id}
              icon={item.department_id.photo}
              CardLeftTitle={item.department_id.name}
              CardLeftDoctorName={item.doctor_id[0].name}
            />
          ))}
      </div>

      {isOpenQueuingTvCardPopapSecond &&
        !lastQueueIsLoading &&
        !lastQueueError &&
        lastQueue?.pagination && (
          <QueuingTvCardPopapSecond
            roomNumber={String(lastQueue?.room?.name)}
            ticketNumber={lastQueue?.pagination}
          />
        )}

      {(deparmentListIsLoading || lastQueueIsLoading) && <Loader />}
      {(deparmentListError || currentQueueError || lastQueueError) && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};

export default QueuingTv;
