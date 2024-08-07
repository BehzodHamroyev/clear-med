import React from 'react';
import { QueueUserDoctor } from '../DoctorPanels/QueueUserDoctor';
import cls from './QueuingPrintCard.module.scss';

const QueuingPrintCard = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className={cls['QueuingPrintCardWrp__queuingPopap--queuingTvPrintCard']}
    >
      <img
        src="https://static.tildacdn.one/tild6634-3737-4039-a662-633534316465/Group_187.svg"
        alt="imgLink"
        className={cls['QueuingPrintCardWrp__queuingPopap--printQueuePageImg']}
      />
      <div className={cls['QueuingPrintCardWrp__queuingPopap--queueBox']}>
        <QueueUserDoctor roomNumber="4" ticketNumber="C4-403" />
      </div>
      <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
        <p>Бўлим:</p>
        <p>salom</p>
      </div>
      <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
        <p>Шифокор:</p>
        <p
          className={
            cls['QueuingPrintCardWrp__queuingPopap--medicNameFullName']
          }
        >
          salom
        </p>
      </div>
      <div className={cls['QueuingPrintCardWrp__queuingPopap--medicName']}>
        <p>Берилган вақт:</p>
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
      <p className={cls['QueuingPrintCardWrp__queuingPopap--message']}>
        Ташрифингиз учун раҳмат!
      </p>
    </div>
  );
});

export default QueuingPrintCard;
