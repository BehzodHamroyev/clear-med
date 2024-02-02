import React from 'react';
import { useTranslation } from 'react-i18next';

import cls from './AddRoomPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AddRoomPageProps {
  className?: string;
}

const AddRoomPage = ({ className }: AddRoomPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.addRoomPage, {}, [className])}>
      <div className={classNames(cls.addRoomPage__header)}>
        <div className={classNames(cls['addRoomPage__header--left'])}>
          <p>{t('Xonalar')}:</p>
          <span>{10}</span>
        </div>

        <div className={classNames(cls['addRoomPage__header--right'])}>
          <p>+</p>
        </div>
      </div>

      {/* <div className={classNames(cls.addRoomPage__table)}></div> */}
    </div>
  );
};

export default AddRoomPage;
