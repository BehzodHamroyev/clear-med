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
  // eslint-disable-next-line no-var
  var outputString = '';

  if (ticketNumber !== undefined) {
    // @ts-ignore
    const prefix = ticketNumber?.charAt(0);
    const lastTwoDigits = ticketNumber!?.split('-')[1].slice(-2);
    outputString = `${prefix}-${lastTwoDigits}`;
  }

  return (
    <div className={cls.QueueUserDoctorWrp}>
      <div className={cls.QueueUserDoctorWrp__queuesListTitle}>
        <p className={cls['QueueUserDoctorWrp__queuesListTitle--paragraph']}>
          {t('Bilet raqami')}
        </p>

        <p className={cls['QueueUserDoctorWrp__queuesListTitle--paragraph']}>
          {t('Xona raqami')}
        </p>
      </div>

      <div className={cls.QueueUserDoctorWrp__queuesListTitle}>
        <p className={cls['QueueUserDoctorWrp__queuesListTitle--ticket']}>
          {outputString}
        </p>

        <p className={cls['QueueUserDoctorWrp__queuesListTitle--ticket']}>
          {roomNumber}
        </p>
      </div>
    </div>
  );
};

export default QueueUserDoctor;
