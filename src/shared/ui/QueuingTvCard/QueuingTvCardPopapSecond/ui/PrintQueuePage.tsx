import React from 'react';

import cls from './PrintQueuePage.module.scss';
// eslint-disable-next-line ulbi-tv-plugin/path-checker
import { QueueUserDoctor } from '@/shared/ui/DoctorPanels/QueueUserDoctor';

const PrintQueuePage = () => {
  return (
    <div className={cls.PrintQueuePage}>
      <p className={cls.PrintQueuePage__medName}>Medical Center</p>

      <div className={cls.PrintQueuePage__queueBox}>
        <QueueUserDoctor ticketNumber="Mor2" roomNumber={12} />
      </div>

      <div className={cls.PrintQueuePage__medicName}>
        <p>Shifokor:</p>
        <p className={cls.medicNameFullName}>Akaxonov Akaxon Akaxonovich</p>
      </div>

      <p className={cls.PrintQueuePage__dateGetQueue}>02.10.2002 | 10:23</p>

      <p className={cls.PrintQueuePage__message}>Katta rahmat</p>
    </div>
  );
};

export default PrintQueuePage;
