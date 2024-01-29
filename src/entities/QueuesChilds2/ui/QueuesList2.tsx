import React from 'react';

import { useTranslation } from 'react-i18next';
import cls from './QueuesList2.module.scss';
import { Vektor } from '@/shared/assets/Pages/Queues';

const QueuesList2 = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueuesListWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>{t('Men Uchaman')}</p>
        <p className={cls.QueuesListTitleChild2}>{t('Jafar King')}</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p>AA-005</p>
        <img src={Vektor} alt="#" />
        <p>35</p>
      </div>
    </div>
  );
};

export default QueuesList2;
