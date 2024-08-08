import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import cls from './QueuingPrintCard.module.scss';
import { getLastQueueData } from '@/pages/QueuingTV';
import { getAllDataProject } from '@/entities/FileUploader';
import { QueueUserDoctor } from '../DoctorPanels/QueueUserDoctor';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface QueuingPrintCardProp {
  roomNumber: number | string;
  ticketNumber: number | string;
}

const QueuingPrintCard = React.forwardRef<HTMLDivElement, QueuingPrintCardProp>(
  ({ roomNumber, ticketNumber }, ref) => {
    const dispatch = useAppDispatch();

    const lastQueue = useSelector(getLastQueueData);

    useEffect(() => {
      dispatch(getAllDataProject({}));
    }, [dispatch]);

    return (
      <div
        ref={ref}
        className={cls['QueuingPrintCardWrp__queuingPopap--queuingTvPrintCard']}
      >
        <div className={cls['QueuingPrintCardWrp__queuingPopap--queueBox']}>
          <QueueUserDoctor
            roomNumber={roomNumber}
            ticketNumber={`${ticketNumber}`}
          />
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            Бўлим:
          </p>

          <p>
            {/* {lastQueue?.data?.department_id
              ? lastQueue?.data?.department_id?.name
              : lastQueue?.room?.department_id?.name} */}
            Процедурный
          </p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            Шифокор:
          </p>

          <p
            className={
              cls['QueuingPrintCardWrp__queuingPopap--medicNameFullName']
            }
          >
            {/* {lastQueue?.data?.doctor_id
              ? lastQueue?.data?.doctor_id?.name
              : lastQueue?.room?.doctor_id?.name} */}
            Ёқубова А
          </p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            Вақт:
          </p>

          <p className={cls['QueuingPrintCardWrp__queuingPopap--dateGetQueue']}>
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

        <img
          src="https://static.tildacdn.one/tild6634-3737-4039-a662-633534316465/Group_187.svg"
          alt="imgLink"
          className={
            cls['QueuingPrintCardWrp__queuingPopap--printQueuePageImg']
          }
        />
      </div>
    );
  },
);

export default QueuingPrintCard;
