/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
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
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { fetchDepartmentList } from '../model/services/fetchDepartmentList';
import { Loader } from '@/widgets/Loader';
import ErrorDialog from '@/shared/ui/ErrorDialog/ErrorDialog';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import QueuingTvCard from '@/entities/QueuingTvCard/ui/QueuingTvCard';
import QueuingTvCardPopapSecond from '@/shared/ui/QueuingTvCard/QueuingTvCardPopapSecond/ui/QueuingTvCardPopapSecond';
import QueuingPrintCard from '@/shared/ui/QueuingPrintCard/QueuingPrintCard';

const QueuingTv = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const componentRef = useRef<HTMLDivElement | null>(null);

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

  /* start ////////////////////////// */

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const print = () => {
    handlePrint();
  };

  /* finish ////////////////////////// */

  useEffect(() => {
    dispatch(fetchDepartmentList({ limit: 'all' }));
  }, [dispatch]);

  return (
    <div className={cls.QueuingTvWrapper}>
      <ButtonNavbar
        TableTitle={t('Xonalar')}
        ItemsLength={deparmentList?.length}
      />

      {/* start ////////////////////////// */}

      <button
        onClick={() => {
          print();
        }}
      >
        chiqarish
      </button>

      <QueuingPrintCard ref={componentRef} />

      {/* finish ////////////////////////// */}
      <div className={cls.RenderSectionCard}>
        {deparmentList &&
          deparmentList.map((item: any) => (
            <QueuingTvCard
              key={item.id}
              DoctorId={item.doctor_id[0].id}
              CardLeftTitle={item.department_id.name}
              CardLeftRoomNumber={item.name}
              CardLeftDoctorName={item.doctor_id[0].name}
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

export default QueuingTv;
