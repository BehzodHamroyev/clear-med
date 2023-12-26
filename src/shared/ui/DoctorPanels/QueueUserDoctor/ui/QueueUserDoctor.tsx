import React from 'react';

import cls from './QueueUserDoctor.module.scss';
import { Vektor } from '@/shared/assets/Pages/Queues';

const QueueUserDoctor = () => {
  return (
    <div className={cls.QueueUserDoctorWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>Bilet raqami</p>
        <p className={cls.QueuesListTitleChild2}>Xona raqami</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p>AKU-018</p>
        <img src={Vektor} alt="#" />
        <p>35</p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
