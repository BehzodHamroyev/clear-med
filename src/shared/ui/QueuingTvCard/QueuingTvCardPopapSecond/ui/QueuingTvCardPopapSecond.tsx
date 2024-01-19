import React, { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import { io } from 'socket.io-client';

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
// import PrintQueuePage from './PrintQueuePage';

interface QueuingTvCardPopapSecondProps {
  roomNumber: string | undefined;
  ticketNumber: string;
}

const QueuingTvCardPopapSecond = ({
  roomNumber,
  ticketNumber,
}: QueuingTvCardPopapSecondProps) => {
  const { t } = useTranslation();

  const socket = io('ws://magicsoft.uz:8900');

  const printableDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const lastQueue = useSelector(getLastQueueData);

  const currentQueueData = useSelector(getCurrentQueueData);
  const currentQueueLoading = useSelector(getCurrentQueueIsLoading);
  const currentQueueError = useSelector(getCurrentQueueError);

  const { setIsOpenQueuingTvCardPopapSecond } = useContext(ButtonsContext);

  const printCom = useReactToPrint({
    content: () => printableDivRef.current,
    documentTitle: 'queue-data',
    onAfterPrint: () => setIsOpenQueuingTvCardPopapSecond(false),
  });

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (lastQueue && printableDivRef.current) {
      dispatch(
        fetchCurrentQueue({
          departmentId: lastQueue?.data.department_id,
          roomId: lastQueue?.data.room_id,
        }),
      ).then(() => {
        if (!currentQueueError && !currentQueueLoading) printCom();

        if (currentQueueData) {
          socket.emit(
            'create_queue',
            { queue_data: currentQueueData },
            (responce: { status: string }) => {
              console.log(responce);
            },
          );
        }

        // socket.on('message', (data) => {
        // console.log('Received message:', data);
        // });
      });
    }
  };

  // socket.on('');

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
                {lastQueue?.data.doctor_id.name}
              </p>
            </div>

            <div className={cls2.PrintQueuePage__medicName}>
              <p>{t('Berilgan vaqt')}:</p>
              <p className={cls2.PrintQueuePage__dateGetQueue}>
                {lastQueue?.data.created_time
                  .split('T')[1]
                  .split('.')[0]
                  .split(':')
                  .slice(0, 2)
                  .join(':')}{' '}
                | {lastQueue?.data.created_date}
              </p>
            </div>

            <p className={cls2.PrintQueuePage__message}>{t('Katta rahmat')}</p>
          </div>
        </div>

        <div className={cls.BtnParnet}>
          <button
            onClick={() => setIsOpenQueuingTvCardPopapSecond(false)}
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
