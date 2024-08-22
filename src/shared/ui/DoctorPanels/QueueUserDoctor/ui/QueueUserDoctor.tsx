import React, { useState } from 'react';
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
  const [queus, setQueus] = useState('');

  if (ticketNumber) {
    // @ts-ignore
    const prefix = ticketNumber?.charAt(0);

    // Extract the last two digits after the hyphen
    const lastTwoDigits = ticketNumber!.split('-')[1].slice(-2);

    // Combine them
    const outputString = `${prefix}-${lastTwoDigits}`;
    setQueus(outputString);
  }

  return (
    <div className={cls.QueueUserDoctorWrp}>
      <div className={cls.QueueUserDoctorWrp__queuesListTitle}>
        <p className={cls['QueueUserDoctorWrp__queuesListTitle--paragraph']}>
          {t('Bilet raqami')}
        </p>

        <p className={cls['QueueUserDoctorWrp__queuesListTitle--ticket']}>
          {queus}
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
