/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';

import cls from './QueuingPrintCard.module.scss';
import { getAllDataProject } from '@/entities/FileUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface QueuingPrintCardProp {
  roomNumber: number | string;
  ticketNumber: string;
  // eslint-disable-next-line react/no-unused-prop-types
  doctor_name: string;
  deparment_name?: string;
}

const QueuingPrintCard = React.forwardRef<HTMLDivElement, QueuingPrintCardProp>(
  ({ roomNumber, ticketNumber, doctor_name, deparment_name }, ref) => {
    const dispatch = useAppDispatch();

    const [queun, setQueu] = useState('');

    useEffect(() => {
      dispatch(getAllDataProject({}));
    }, [dispatch]);

    return (
      <div
        ref={ref}
        className={cls['QueuingPrintCardWrp__queuingPopap--queuingTvPrintCard']}
      >
        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--ticketNumber']}>
            Билет:
          </p>

          <p>{ticketNumber}</p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--ticketNumber']}>
            Хона:
          </p>

          <p>{roomNumber}</p>
        </div>

        <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
          <p className={cls['QueuingPrintCardWrp__queuingPopap--titleTicket']}>
            Бўлим:
          </p>

          <p>{deparment_name}</p>
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
            {doctor_name}
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
