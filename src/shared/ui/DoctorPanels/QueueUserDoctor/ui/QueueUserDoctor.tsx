import React from 'react';

import { useTranslation } from 'react-i18next';
import cls from './QueueUserDoctor.module.scss';

interface QueueUserDoctorProps {
  ticketNumber: string | undefined;
  roomNumber: string | number | undefined;
}

const QueueUserDoctor = ({
  ticketNumber,
  roomNumber,
}: QueueUserDoctorProps) => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueueUserDoctorWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1}>{t('Bilet raqami')}</p>
        <p className={cls.QueuesListTitleChild2}>{t('Xona raqami')}</p>
      </div>
      <div className={cls.QueuesNumber}>
        <p className={cls.ticketNumber}>{ticketNumber}</p>

        <p className={cls.roomNumber}>{roomNumber}</p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
