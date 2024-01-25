import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'react-phone-number-input/input';

import { FormDataInState } from '../model/types/doctorAddTypes';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { fetchDoctorAdd } from '../model/service/fetchDoctorAdd';
import { EyeIcon, HideIcon } from '@/shared/assets/Pages/LoginPage';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './DoctorAdd.module.scss';

const DoctorAdd = () => {
  /* translate */
  const { t } = useTranslation();

  /* dispatch */
  const dispatch = useAppDispatch();

  /* context */
  const { setIsOpenDoctorAddCard } = React.useContext(ButtonsContext);

  /* useState */
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const [isYearDoctor, setIsYearDoctor] = React.useState({
    years: '',
  });

  const [value, setValue] = React.useState('');

  const [value2, setValue2] = React.useState('');

  const [hideEye, setHideEye] = React.useState(false);

  const [isAllFormData, setIsAllFormData] = React.useState<FormDataInState>({
    name: '',
    login: null,
    password: '',
    file: undefined,
    exprience: null,
  });

  /* useRef */
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  /* halper functions */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  function handleInputChange(event: any, name: string) {
    setValue(event);

    setIsAllFormData({ ...isAllFormData, login: event });
  }

  function handleInputChangePassword(event: any, name: string) {
    setValue2(event);

    setIsAllFormData({ ...isAllFormData, password: event });
  }

  /* fetch data */
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = new FormData();

    data.append('role', `doctor`);
    data.append('file', selectedFile);
    data.append('name', `${isAllFormData!.name}`);
    data.append('login', `${isAllFormData!.login}`);
    data.append('password', `${isAllFormData!.password}`);
    data.append('exprience', `${isAllFormData!.exprience}`);

    dispatch(fetchDoctorAdd({ data }));
  };

  /* UI */
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDoctorAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
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
              src={selectedFile ? URL.createObjectURL(selectedFile) : Doctor}
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
              id="input"
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png, .svg"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className={cls.CardBody}>
            <input
              type="text"
              maxLength={30}
              className={cls.InputBulim}
              placeholder={t('F.I.Sh')}
              onChange={(e) =>
                setIsAllFormData({ ...isAllFormData, name: e.target.value })
              }
            />

            <input
              type="number"
              maxLength={2}
              required
              onChange={(e) => {
                setIsAllFormData({
                  ...isAllFormData,
                  exprience: e.target.value,
                });
                setIsYearDoctor({ ...isYearDoctor, years: e.target.value });
              }}
              value={isYearDoctor.years}
              className={cls.InputBulim}
              placeholder={t('tajribasi')}
            />

            <Input
              value={value}
              maxLength={20}
              id="PhoneNumber"
              autoComplete="off"
              name="PhoneNumber"
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
                value={value2}
                id="UserPassword"
                autoComplete="off"
                name="UserPassword"
                className={cls.InputBulim}
                placeholder="Parolni kiriting..."
                type={hideEye ? 'text' : 'password'}
                onChange={(e) =>
                  handleInputChangePassword(e.target.value, 'UserPassword')
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

              <button
                type="button"
                className={`${cls.Btn} ${cls.Btn2}`}
                onClick={handleSubmit}
              >
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
