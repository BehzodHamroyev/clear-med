import React, { ChangeEvent, useContext, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import cls from './DoctorAdd.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';

const DoctorAdd = () => {
  const { t } = useTranslation();
  const { setIsOpenDoctorAddCard } = useContext(ButtonsContext);
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
      console.log(selectedFile);
      setIsImageUser(selectedFile);
    }
  };

  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDoctorAddCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Shifokor qo‘shish')}</h3>
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
            <input
              type="text"
              maxLength={20}
              className={cls.InputBulim}
              placeholder={t('F.I.Sh')}
            />

            <input
              type="text"
              maxLength={20}
              className={cls.InputBulim}
              placeholder={t('tajribasi')}
            />

            <input
              type="text"
              maxLength={20}
              className={cls.InputBulim}
              placeholder={t('Telefon raqami')}
            />

            <input
              type="text"
              maxLength={20}
              className={cls.InputBulim}
              placeholder={t('Bo‘lim turi')}
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
                  setIsOpenDoctorAddCard(false);
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
    </div>
  );
};

export default DoctorAdd;
