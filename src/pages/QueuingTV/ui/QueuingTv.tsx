import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import cls from './QueuingTv.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

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

import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { QueuingTvCard } from '@/entities/QueuingTvCard';
import { QueuingTvCardPopapSecond } from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond';

import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchDepartmentList } from '../model/services/fetchDepartmentList';

import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

const QueuingTv = () => {
  const dispatch = useAppDispatch();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (lastQueue) {
    console.log();
  }

  return (
    <div className={cls.QueuingTvWrapper}>
      <ButtonNavbar TableTitle="Xonalar" ItemsLength={deparmentList?.length} />

      <div className={cls.RenderSectionCard}>
        {deparmentList?.map((item) => (
          <QueuingTvCard
            key={item.id}
            DoctorId={item.doctor_id._id}
            CardLeftTitle={item.department_id.name}
            CardLeftRoomNumber={item.name}
            CardLeftDoctorName={item.doctor_id.name}
            // @ts-ignore
            Icon={iconsCardDepartments[item.department_id.image].icon}
          />
        ))}
      </div>

      {isOpenQueuingTvCardPopapSecond &&
        !lastQueueIsLoading &&
        lastQueue?.pagination && (
          <QueuingTvCardPopapSecond
            roomNumber={lastQueue?.pagination?.split('-')?.slice()[0]?.at(-1)}
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
