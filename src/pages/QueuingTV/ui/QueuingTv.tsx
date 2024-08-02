import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import cls from './QueuingTv.module.scss';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueuingTvCard from '@/entities/QueuingTvCard/ui/QueuingTvCard';
import { fetchDepartmentList } from '../model/services/fetchDepartmentList';
import { getCurrentQueueError } from '../model/selectors/currentQueueSelector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import QueuingTvCardPopapSecond from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond/ui/QueuingTvCardPopapSecond';

import {
  getDeparmentListData,
  getDeparmentListError,
  getDeparmentListIsLoading,
} from '../model/selectors/departmentListSelector';

import {
  getLastQueueData,
  getLastQueueError,
  getLastQueueIsLoading,
} from '../model/selectors/lastQueueSelector';

export const QueuingTv = () => {
  const dispatch = useAppDispatch();

  const { isOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const lastQueue = useSelector(getLastQueueData);
  const lastQueueError = useSelector(getLastQueueError);
  const deparmentList = useSelector(getDeparmentListData);
  const currentQueueError = useSelector(getCurrentQueueError);
  const deparmentListError = useSelector(getDeparmentListError);
  const lastQueueIsLoading = useSelector(getLastQueueIsLoading);
  const deparmentListIsLoading = useSelector(getDeparmentListIsLoading);

  useEffect(() => {
    dispatch(fetchDepartmentList({ limit: 'all' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cls.QueuingTvWrapper}>
      <div className={cls.RenderSectionCard}>
        {deparmentList &&
          deparmentList
            .filter(
              (item) =>
                item.name &&
                item.department_id &&
                item.department_id._id &&
                item.doctor_id &&
                item.doctor_id._id,
            )
            .map((item) => (
              <QueuingTvCard
                key={item.id}
                DoctorId={item.doctor_id.id}
                CardLeftTitle={item.department_id.name}
                CardLeftRoomNumber={item.name}
                CardLeftDoctorName={item.doctor_id.name}
                // @ts-ignore
                icon={item.department_id.photo}
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
