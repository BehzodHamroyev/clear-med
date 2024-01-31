import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';

import cls from './QueuingTvCardPopapSecond.module.scss';
import cls2 from './PrintQueuePage.module.scss';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { fetchCurrentQueue } from '@/pages/QueuingTV/model/services/fetchCurrentQueue';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { getLastQueueData } from '@/pages/QueuingTV/model/selectors/lastQueueSelector';

// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import {
  getCurrentQueueData,
  getCurrentQueueError,
  getCurrentQueueIsLoading,
} from '@/pages/QueuingTV/model/selectors/currentQueueSelector';
import { Loader } from '@/widgets/Loader';
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { useCurrentQueueuActions } from '@/pages/QueuingTV/model/slice/currentQueueListSlice';

interface QueuingTvCardPopapSecondProps {
  roomNumber: string | undefined;
  ticketNumber: string;
}

const QueuingTvCardPopapSecond = ({
  roomNumber,
  ticketNumber,
}: QueuingTvCardPopapSecondProps) => {
  const { t } = useTranslation();

  const printableDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const lastQueue = useSelector(getLastQueueData);

  const currentQueueData = useSelector(getCurrentQueueData);
  const currentQueueLoading = useSelector(getCurrentQueueIsLoading);
  const currentQueueError = useSelector(getCurrentQueueError);

  const { clearCurrentQueue } = useCurrentQueueuActions();

  const { setIsOpenQueuingTvCardPopapSecond, clickedDoctorId } =
    useContext(ButtonsContext);

  const printCom = useReactToPrint({
    content: () => printableDivRef?.current,
    documentTitle: 'queue-data',
    onAfterPrint: () => setIsOpenQueuingTvCardPopapSecond(false),
  });

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    clearCurrentQueue();

    if (lastQueue && lastQueue.data.department_id && printableDivRef?.current) {
      dispatch(
        fetchCurrentQueue({
          departmentId: lastQueue?.data?.department_id,
          roomId: lastQueue?.data?.room_id,
        }),
      ).then(() => {
        if (!currentQueueError && !currentQueueLoading) printCom();
      });
    } else if (
      lastQueue &&
      lastQueue.room.department_id &&
      printableDivRef?.current
    ) {
      dispatch(
        fetchCurrentQueue({
          departmentId: lastQueue?.room?.department_id._id,
          roomId: lastQueue?.room?._id,
        }),
      ).then(() => {
        if (!currentQueueError && !currentQueueLoading) printCom();
      });
    }
  };

  return (
    <div className={cls.QueuingTvCardPopapSecondWrapper}>
      <div className={cls.QueuingTvCardPopapSecond}>
        <h3 className={cls.QueuingTvCardPopapSecondTitle}>
          {t('Navbatni tasdiqlang')}
        </h3>

        <div ref={printableDivRef} className={cls.QueuingTvPrintCard}>
          <div className={cls2.PrintQueuePage}>
            <p className={cls2.PrintQueuePage__medName}>Medical Center</p>

            <div className={cls2.PrintQueuePage__queueBox}>
              <QueueUserDoctor
                ticketNumber={ticketNumber}
                roomNumber={roomNumber}
              />
            </div>

            <div className={cls2.PrintQueuePage__medicName}>
              <p>{t('Shifokor')}:</p>
              <p className={cls2.medicNameFullName}>
                {lastQueue?.data?.doctor_id
                  ? lastQueue?.data?.doctor_id?.name
                  : lastQueue?.room?.doctor_id?.name}
              </p>
            </div>

            <div className={cls2.PrintQueuePage__medicName}>
              <p>{t('Berilgan vaqt')}:</p>
              <p className={cls2.PrintQueuePage__dateGetQueue}>
                {new Date().getDate()}/
                {new Date().getMonth() < 10
                  ? `0${new Date().getMonth() + 1}`
                  : new Date().getMonth() + 1}
                /{new Date().getFullYear()} |{' '}
                {new Date().getHours() < 10
                  ? `0${new Date().getHours()}`
                  : new Date().getHours()}
                :
                {new Date().getMinutes() < 10
                  ? `0${new Date().getMinutes()}`
                  : new Date().getMinutes()}
              </p>
            </div>

            <p className={cls2.PrintQueuePage__message}>{t('Katta rahmat')}</p>
          </div>
        </div>

        <div className={cls.BtnParnet}>
          <button
            onClick={() => {
              setIsOpenQueuingTvCardPopapSecond(false);
              clearCurrentQueue();
            }}
            type="button"
            className={`${cls.Btn} ${cls.Btn1}`}
          >
            {t('Bekor qilish')}
          </button>
          <button
            onClick={(e) => handlePrint(e)}
            type="button"
            className={`${cls.Btn} ${cls.Btn2}`}
          >
            {t('Chiqarish')}
          </button>
        </div>
      </div>
      {currentQueueLoading && <Loader />}
    </div>
  );
};

export default QueuingTvCardPopapSecond;
