import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './AddAdvertisement.module.scss';
import { fetchAdvertisementAdd } from '../model/service/fetchAdvertisementAdd';

const AddAdvertisement = () => {
  /* translate */
  const { t } = useTranslation();

  /* dispatch */
  const dispatch = useAppDispatch();

  /* context */
  const { setResponseData, setIsOpenAdvertisementAddCard } =
    React.useContext(ButtonsContext);

  /* useState */
  const [selectedFile, setSelectedFile] = React.useState<any>(null);

  const [urlSuccess, setUrlSuccess] = React.useState<any>();

  const [isAllFormData, setIsAllFormData] = React.useState({
    name: '',
    file: undefined,
    link: '',
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = new FormData();

    data.append('file', selectedFile);
    data.append('name', `${isAllFormData!.name}`);
    data.append('link', `${isAllFormData!.link}`);

    dispatch(fetchAdvertisementAdd({ data }));

    setResponseData(`${Math.random() * 100 + 1}`);
    setIsOpenAdvertisementAddCard(false);
  };

  /* UI */
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenAdvertisementAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Reklama qo’shish')}</h3>

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
              accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className={cls.CardBody}>
            <input
              type="text"
              maxLength={30}
              className={cls.InputBulim}
              placeholder={t('Reklama nomi')}
              onChange={(e) => {
                setIsAllFormData({ ...isAllFormData, name: e.target.value });
              }}
            />

            <input
              type="text"
              className={cls.InputBulim}
              placeholder={t('Reklama manzili (Url)')}
              onChange={(e) => {
                setIsAllFormData({ ...isAllFormData, link: e.target.value });
              }}
            />

            <div className={cls.BtnParnet}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenAdvertisementAddCard(false);
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

export default AddAdvertisement;
