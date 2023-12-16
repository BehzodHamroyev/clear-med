import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './RoomAdd.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const RoomAdd = () => {
  const { t } = useTranslation();
  const { setIsOpenRoomAddCard } = useContext(ButtonsContext);

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenRoomAddCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xona qo‘shish')}</h3>
        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Xona raqami')}
          />

          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Bo‘lim')}
          />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenRoomAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>
            <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAdd;
