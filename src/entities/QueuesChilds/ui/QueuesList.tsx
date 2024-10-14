import React from 'react';

import { useTranslation } from 'react-i18next';
import cls from './QueuesList.module.scss';
import { Vektor } from '@/shared/assets/Pages/Queues';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const QueuesList = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueuesListWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>{t('Bilet raqami')}</p>
        <p className={cls.QueuesListTitleChild2}>{t('Xona raqami')}</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p>AA-005</p>
        <LazyLoadImage src={Vektor} alt="#" />
        <p>35</p>
      </div>
    </div>
  );
};

export default QueuesList;
