/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './QueueUserControl.module.scss';
import { CheckedIcon, ErrorIcon, Refresh } from '@/shared/assets/Pages/Doctor';

const QueueUserControl = () => {
  const { t } = useTranslation();

  const [countClinet, setCountClient] = useState<number>(0);
  const [DoctorClinet, setDoctorClient] = useState<boolean>(false);
  const [DoctorClinet2, setDoctorClient2] = useState<boolean>(false);

  const increment = () => {
    if (countClinet < 3) {
      setCountClient(countClinet + 1);
    } else if (countClinet === 3) {
      alert('Qayta chaqirish imkoniyati tugadi!');
    }
    return countClinet;
  };

  const handleClickBtn = () => {
    setDoctorClient(true);
    setDoctorClient2(false);
  };
  const handleClickBtn2 = () => {
    setDoctorClient(false);
    setDoctorClient2(true);
  };

  return (
    <div className={cls.QueueUserControlWrapper}>
      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Qayta chaqirish')}</p>
        <button
          onClick={increment}
          className={`${cls.BtnClient} ${countClinet > 0 ? cls.colorRed : ''}`}
          type="button"
        >
          <img className={cls.BtnClientIcon} src={Refresh} alt="#" />
          {countClinet}
        </button>
      </div>

      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Bekor qilish')}</p>
        <button
          onClick={handleClickBtn}
          className={cls.BtnClient}
          type="button"
        >
          <img
            className={`${cls.BtnClientIcon2} ${
              DoctorClinet === true ? cls.BtnClientIconActive : ''
            }`}
            src={ErrorIcon}
            alt="#"
          />
        </button>
      </div>

      <div className={cls.Buttons}>
        <p className={cls.ButtonsTitle}>{t('Tasdiqlash')}</p>
        <button
          onClick={handleClickBtn2}
          className={cls.BtnClient}
          type="button"
        >
          <img
            className={`${cls.BtnClientIcon2} ${
              DoctorClinet2 === true ? cls.BtnClientIconActive : ''
            }`}
            src={CheckedIcon}
            alt="#"
          />
        </button>
      </div>
    </div>
  );
};

export default QueueUserControl;
