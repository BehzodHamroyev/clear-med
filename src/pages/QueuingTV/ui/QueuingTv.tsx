/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';

import cls from './QueuingTv.module.scss';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';

import {
  getDeparmentListData,
  getDeparmentListError,
  getDeparmentListIsLoading,
} from '../model/selectors/departmentListSelector';

import { getCurrentQueueError } from '../model/selectors/currentQueueSelector';

import {
  getLastQueueError,
  getLastQueueIsLoading,
} from '../model/selectors/lastQueueSelector';
import { QueuingTvCard } from '@/entities/QueuingTvCard';

export const QueuingTv = () => {
  const deparmentList = useSelector(getDeparmentListData);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);
  const deparmentListError = useSelector(getDeparmentListError);

  const currentQueueError = useSelector(getCurrentQueueError);

  const lastQueueIsLoading = useSelector(getLastQueueIsLoading);
  const lastQueueError = useSelector(getLastQueueError);

  return (
    <div className={cls.QueuingTvWrapper}>
      <div className={cls.RenderSectionCard}>
        {deparmentList &&
          deparmentList.map((item: any) => (
            <QueuingTvCard
              key={item?.id}
              actives={item.actives}
              CardLeftRoomNumber={item?.name}
              proceedCount={item.proceedCount}
              DoctorId={item?.doctor_id[0].id}
              icon={item?.department_id.photo}
              CardLeftTitle={item?.department_id.name}
              CardLeftDoctorName={item?.doctor_id[0].name}
            />
          ))}
      </div>

      {(deparmentListIsLoading || lastQueueIsLoading) && <Loader />}
      {(deparmentListError || currentQueueError || lastQueueError) && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};
