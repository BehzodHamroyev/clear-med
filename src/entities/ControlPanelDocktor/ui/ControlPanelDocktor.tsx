import React from 'react';

import cls from './ControlPanelDocktor.module.scss';
import { QueueUserDoctor } from '@/shared/ui/DoctorPanels/QueueUserDoctor';
import { QueueUserControl } from '@/shared/ui/DoctorPanels/QueueUserControl';
import { QueueUserNext } from '@/shared/ui/DoctorPanels/QueueUserNext';

const ControlPanelDocktor = () => {
  return (
    <div className={cls.ControlPanelDocktorWrapper}>
      <QueueUserDoctor />
      <QueueUserControl />
      <QueueUserNext />
    </div>
  );
};

export default ControlPanelDocktor;
