import React from 'react';

import cls from './addMonitorPage.module.scss';
import { ButtonNavbar } from '@/entities/ButtonNavbar';

const AddMonitorPage = () => {
  return (
    <div className={cls.AddMonitorPageWrapper}>
      <ButtonNavbar
        CreateCarbonAdd
        TableTitle="Reklama qo’shish"
        ItemsLength={3}
      />
    </div>
  );
};

export default AddMonitorPage;
