/* eslint-disable react/button-has-type */
import React from 'react';
import { useSelector } from 'react-redux';

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
import cls from './QueuingTv.module.scss';


export const QueuingTv = () => {
  const deparmentList = useSelector(getDeparmentListData);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);
  const deparmentListError = useSelector(getDeparmentListError);

  const currentQueueError = useSelector(getCurrentQueueError);

  const lastQueueIsLoading = useSelector(getLastQueueIsLoading);
  const lastQueueError = useSelector(getLastQueueError);

  const language = localStorage.getItem('i18nextLng');

  return (
    <div className={cls.QueuingTvWrapper}>
      <div className={cls.RenderSectionCard}>
        {deparmentList &&
          deparmentList.map((item: any) => {

            return (
              <QueuingTvCard
                key={item?.id}
                actives={item.actives}
                CardLeftRoomNumber={item?.name}
                proceedCount={item.proceedCount}
                DoctorId={item?.doctor_id[0].id}
                icon={item?.department_id.photo}
                CardLeftTitle={
                  language === 'kr' || language === 'ru'
                    ? item?.department_id.nameRu
                    : item?.department_id.nameEn
                }
                CardLeftDoctorName={item?.doctor_id[0].name}
                department_id={item.department_id._id}
                room_id={item._id}
              />
            );
          })}
      </div>

      {(deparmentListIsLoading || lastQueueIsLoading) && <Loader />}
      {(deparmentListError || currentQueueError || lastQueueError) && (
        <ErrorDialog isErrorProps={!false} />
      )}
    </div>
  );
};
