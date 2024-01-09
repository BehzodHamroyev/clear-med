import React from 'react';

import cls from './QueueUserDoctor.module.scss';
import { Vektor } from '@/shared/assets/Pages/Queues';

interface QueueUserDoctorProps {
  ticketNumber: string;
  roomNumber: number;
}

const QueueUserDoctor = ({
  ticketNumber,
  roomNumber,
}: QueueUserDoctorProps) => {
  return (
    <div className={cls.QueueUserDoctorWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>Bilet raqami</p>
        <p className={cls.QueuesListTitleChild2}>Xona raqami</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p>{ticketNumber}</p>
        <img src={Vektor} alt="#" />
        <p>{roomNumber}</p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
