import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './RoomEdit.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const RoomEdit = () => {
  const { t } = useTranslation();
  const { setIsOpenRoomEditCard } = useContext(ButtonsContext);

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenRoomEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xonani tahrirlash')}</h3>
        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('15')}
          />

          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Dermotolog')}
          />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenRoomEditCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('O‘chirib yuborish')}
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

export default RoomEdit;
