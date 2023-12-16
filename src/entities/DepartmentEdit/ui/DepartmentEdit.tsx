import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './DepartmentEdit.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const DepartmentEdit = () => {
  const { t } = useTranslation();
  const { setIsOpenDepartmentEditCard } = useContext(ButtonsContext);

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Bo‘limni tahrirlash')}</h3>
        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Bo‘lim qo‘shish')}
          />

          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Biriktirilgan shifokor')}
          />

          <input
            type="text"
            maxLength={20}
            className={cls.InputBulim}
            placeholder={t('Xona')}
          />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDepartmentEditCard(false);
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

export default DepartmentEdit;
