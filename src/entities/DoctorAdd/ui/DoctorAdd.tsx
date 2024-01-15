import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './DoctorAdd.module.scss';

const DoctorAdd = () => {
  const { t } = useTranslation();

  const { setIsOpenDoctorAddCard } = React.useContext(ButtonsContext);

  const [isImageUser, setIsImageUser] = React.useState<any>();

  const [isYearDoctor, setIsYearDoctor] = React.useState({
    years: '',
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      setIsImageUser(selectedFile);
    }
  };

  const [value, setValue] = React.useState('');

  const [hideEye, setHideEye] = React.useState(false);

  function handleInputChange(event: any, name: string) {
    setValue(event);
  }

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
              maxLength={30}
              className={cls.InputBulim}
              placeholder={t('F.I.Sh')}
            />

            <input
              type="number"
              maxLength={2}
              required
              onChange={(e) =>
                setIsYearDoctor({ ...isYearDoctor, years: e.target.value })
              }
              value={isYearDoctor.years}
              className={cls.InputBulim}
              placeholder={t('tajribasi')}
            />

            <Input
              value={value}
              autoComplete="off"
              name="PhoneNumber"
              maxLength={20}
              rules={{ required: true }}
              className={cls.InputBulim}
              placeholder={t('Telefon raqami')}
              onChange={(e) => handleInputChange(e, 'PhoneNumber')}
            />

            <div className={cls.PhoneNumberInputWrapper}>
              <input
                required
                minLength={8}
                maxLength={14}
                autoComplete="off"
                name="UserPassword"
                className={cls.InputBulim}
                placeholder="Parolni kiriting..."
                type={hideEye ? 'text' : 'password'}
                onChange={(e) =>
                  handleInputChange(e.target.value, 'UserPassword')
                }
              />

              {hideEye ? (
                <EyeIcon
                  className={cls.FixValueBnt}
                  onClick={() => setHideEye(false)}
                />
              ) : (
                <HideIcon
                  className={cls.FixValueBnt}
                  onClick={() => setHideEye(true)}
                />
              )}
            </div>

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
