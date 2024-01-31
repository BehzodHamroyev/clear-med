import React from 'react';

import cls from './QueueUserDoctor.module.scss';

interface QueueUserDoctorProps {
  ticketNumber: string | undefined;
  roomNumber: string | number | undefined;
}

const QueueUserDoctor = ({
  ticketNumber,
  roomNumber,
}: QueueUserDoctorProps) => {
  return (
    <div className={cls.QueueUserDoctorWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>Билет рақами</p>
        <p className={cls.QueuesListTitleChild2}>Хона рақами</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p className={cls.ticketNumber}>{ticketNumber}</p>

        <p className={cls.roomNumber}>{roomNumber}</p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
