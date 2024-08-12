import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './QueueUserDoctor.module.scss';

interface QueueUserDoctorProps {
  ticketNumber: string | undefined;
  roomNumber: string | number | undefined;
}

const QueueUserDoctor = ({
  roomNumber,
  ticketNumber,
}: QueueUserDoctorProps) => {
  const { t } = useTranslation();

  return (
    <div className={cls.QueueUserDoctorWrp}>
      <div className={cls.QueueUserDoctorWrp__queuesListTitle}>
        <p className={cls['QueueUserDoctorWrp__queuesListTitle--paragraph']}>
          {t('Bilet raqami')}
        </p>

        <p className={cls['QueueUserDoctorWrp__queuesListTitle--ticket']}>
          {ticketNumber}
        </p>
      </div>

      <div className={cls.QueueUserDoctorWrp__queuesListTitle}>
        <p className={cls['QueueUserDoctorWrp__queuesListTitle--paragraph']}>
          {t('Xona raqami')}
        </p>

        <p className={cls['QueueUserDoctorWrp__queuesListTitle--ticket']}>
          {roomNumber}
        </p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
