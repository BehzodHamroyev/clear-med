import React, { useContext } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './QueuingTvCardPopapSecond.module.scss';
import { QueueUserDoctor } from '../../../DoctorPanels/QueueUserDoctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const QueuingTvCardPopapSecond = () => {
  const { t } = useTranslation();
  const { isOpenQueuingTvCardPopapSecond, setIsOpenQueuingTvCardPopapSecond } =
    useContext(ButtonsContext);

  return (
    <div className={cls.QueuingTvCardPopapSecondWrapper}>
      <div className={cls.QueuingTvCardPopapSecond}>
        <h3 className={cls.QueuingTvCardPopapSecondTitle}>
          Navbatni tasdiqlang
        </h3>

        <QueueUserDoctor />

        <div className={cls.BtnParnet}>
          <button
            onClick={() => setIsOpenQueuingTvCardPopapSecond(false)}
            type="button"
            className={`${cls.Btn} ${cls.Btn1}`}
          >
            {t('Bekor qilish')}
          </button>
          <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
            {t('Chiqarish')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueuingTvCardPopapSecond;
