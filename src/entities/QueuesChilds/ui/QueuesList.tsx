import React from 'react';

import cls from './QueuesList.module.scss';
import { Vektor } from '@/shared/assets/Pages/Queues';

const QueuesList = () => {
  return (
    <div className={cls.QueuesListWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>Bilet raqami</p>
        <p className={cls.QueuesListTitleChild2}>Xona raqami</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p>AA-005</p>
        <img src={Vektor} alt="#" />
        <p>35</p>
      </div>
    </div>
  );
};

export default QueuesList;
