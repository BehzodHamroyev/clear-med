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

  const styleP = {
    borderRight: '1px solid #000',
  };

  return (
    <div className={cls.QueueUserDoctorWrapper}>
      <div className={cls.QueuesListTitle}>
        <p className={cls.QueuesListTitleChild1} style={styleP}>
          {t('Bilet raqami')}
        </p>

        <p className={cls.QueuesListTitleChild1}>{t('Xona raqami')}</p>
      </div>

      <div className={cls.QueuesNumber}>
        <p className={cls.ticketNumber}>{ticketNumber}</p>

        <p className={cls.roomNumber}>{roomNumber}</p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
