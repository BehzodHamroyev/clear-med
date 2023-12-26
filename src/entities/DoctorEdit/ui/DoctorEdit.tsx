import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './DoctorEdit.module.scss';

const DoctorEdit = () => {
  const { t } = useTranslation();
  const { setIsOpenDoctorEditCard } = useContext(ButtonsContext);
  const [isImageUser, setIsImageUser] = useState<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setIsImageUser(selectedFile);
    }
  };

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDoctorEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Tahrirlash')}</h3>
        <div className={cls.AddDoctorCard}>
          <div className={cls.AddCardImg}>
            <img
              className={cls.AddCardImgValue}
              src={isImageUser ? URL.createObjectURL(isImageUser) : Doctor}
              alt="#"
            />
            <button
              type="submit"
              onClick={handleClick}
              className={cls.AddCardImgValuebtn}
            >
              <GetImage />
              {}
            </button>
            <input
              type="file"
              id="input"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className={cls.CardBody}>
            <label className={cls.LabelInput} htmlFor="username" id="name">
              {t('F.I.Sh')}
              <input
                id="username"
                name="username"
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                placeholder={t('Alisher Qodirov Qudratovich')}
                value={t('Alisher Qodirov Qudratovich')}
              />
            </label>

            <label
              className={cls.LabelInput}
              htmlFor="TajribaYili"
              id="TajribaYili"
            >
              {t('TajribaYili')}
              <input
                id="TajribaYili"
                name="TajribaYili"
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                placeholder={t('8 yil')}
                value={t('8 yil')}
              />
            </label>
            <label
              className={cls.LabelInput}
              htmlFor="Telefon raqami"
              id="Telefon raqami"
            >
              {t('Telefon raqami')}
              <input
                id="Telefon raqami"
                name="Telefon raqami"
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                placeholder={t('+998 97 777 65 54')}
                value={t('+998 97 777 65 54')}
              />
            </label>

            <label
              className={cls.LabelInput}
              htmlFor="Bo‘lim turi"
              id="Bo‘lim turi"
            >
              {t('Bo‘lim turi')}
              <input
                id="Bo‘lim turi"
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                placeholder={t('Kardiolog')}
                value={t('Kardiolog')}
              />
            </label>

            <label className={cls.LabelInput} htmlFor="Xona" id="Xona">
              {t('Xona')}
              <input
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                placeholder={t('17')}
                value={t('17')}
              />
            </label>

            <div className={cls.BtnParnet}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenDoctorEditCard(false);
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
    </div>
  );
};

export default DoctorEdit;
