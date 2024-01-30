import React from 'react';

import { Monitors } from '@/entities/Monitors';
import { MonitorAdd } from '@/entities/MonitorAdd';
import { ButtonNavbar } from '@/entities/ButtonNavbar';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './addMonitorPage.module.scss';
import { MonitorEdit } from '@/entities/MonitorEdit';

const AddMonitorPage = () => {
  const {
    isOpenMonitorAddCard,
    setIsOpenMonitorAddCard,
    isOpenMonitorEditCard,
    setIsOpenMonitorEditCard,
  } = React.useContext(ButtonsContext);

  return (
    <div>
      <div className={cls.AddMonitorPageWrapper}>
        <ButtonNavbar
          CreateCarbonAdd
          TableTitle="Monitor qo’shish"
          ItemsLength={3}
        />
        <div className={cls.MonitorsList}>
          <Monitors number={1} />
          <Monitors number={2} />
          <Monitors number={3} />
          <Monitors number={4} />
          <Monitors number={5} />
          <Monitors number={6} />
        </div>
      </div>
      {isOpenMonitorAddCard ? <MonitorAdd /> : ''}

      {isOpenMonitorEditCard ? <MonitorEdit /> : ''}
    </div>
  );
};

export default AddMonitorPage;
