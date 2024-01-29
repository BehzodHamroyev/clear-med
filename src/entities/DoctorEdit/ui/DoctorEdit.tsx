import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { DoctorEditType } from '../model/types/doctorEdit';
import { GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

import cls from './DoctorEdit.module.scss';

/* Parent Function */
const DoctorEdit = (prop: DoctorEditType) => {
  const { tableBody } = prop;

  /* Cookies */
  const token = Cookies.get('token');

  /* useTranslation */
  const { t } = useTranslation();

  /* useContext */
  const {
    departmentGetId,
    setResponseData,
    setIsOpenDoctorEditCard,
    setResponseAddDoctorStatusCode,
  } = React.useContext(ButtonsContext);

  /* useState */

  const [img, setImg] = React.useState<any>();

  const [getAllFormData, setAllFormData] = React.useState<any>({
    fileUrl: '',
    fullName: '',
    experiance: '',
    phoneNumber: '',
    passwordValue: '',
  });

  /* useRef */
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  /* hapler function */
  const matchingItems = tableBody?.find((item) => item?.id === departmentGetId);

  const getPhoneSliceValue =
    getAllFormData.phoneNumber.length > 9
      ? getAllFormData.phoneNumber.slice(-9)
      : getAllFormData.phoneNumber;

  /* useEffect */
  React.useEffect(() => {
    if (matchingItems) {
      setAllFormData({
        idCard: departmentGetId,
        fileUrl: `${matchingItems.img}`,
        fullName: `${matchingItems.item1}`,
        experiance: `${matchingItems.item4}`,
        passwordValue: `${matchingItems.lastChild}`,
        phoneNumber: `${matchingItems.lastChild}`,
      });
    } else {
      console.log('No matching item found');
    }
  }, [departmentGetId, matchingItems]);

  /* handle change functions */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImg(file);
    setAllFormData({ ...getAllFormData, fileUrl: file });
  };

  /* handle submit functions */
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = new FormData();

    data.append('file', getAllFormData.fileUrl);
    data.append('name', getAllFormData.fullName);
    data.append('login', getPhoneSliceValue);
    data.append('exprience', getAllFormData.experiance);

    try {
      const response = await axios.patch<DoctorEditType>(
        `${baseUrl}/users/${getAllFormData.idCard}`,
        data,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setIsOpenDoctorEditCard(false);
      setResponseAddDoctorStatusCode(200);
      setResponseData(`${Math.random() * 100 + 1}`);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  const handleDeleteItem = async (e: any) => {
    e.stopPropagation();

    try {
      const response = await axios.delete<any>(
        `${baseUrl}/users/${getAllFormData.idCard}`,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setIsOpenDoctorEditCard(false);
      setResponseAddDoctorStatusCode(200);
      setResponseData(`${Math.random() * 100 + 1}`);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* UI */
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
              src={img ? URL.createObjectURL(img) : getAllFormData.fileUrl}
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
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .svg, .heic, .webp"
            />
          </div>

          <div className={cls.CardBody}>
            <label className={cls.LabelInput} htmlFor="username" id="name">
              {t('F.I.Sh')}
              <input
                type="text"
                id="username"
                maxLength={20}
                name="username"
                className={cls.InputBulim}
                value={getAllFormData.fullName}
                placeholder={t('')}
                onChange={(e) => {
                  setAllFormData({
                    ...getAllFormData,
                    fullName: e.target.value,
                  });
                }}
              />
            </label>

            <label
              className={cls.LabelInput}
              htmlFor="TajribaYili"
              id="TajribaYili"
            >
              {t('TajribaYili')}
              <input
                type="text"
                maxLength={20}
                id="TajribaYili"
                name="TajribaYili"
                className={cls.InputBulim}
                value={`${getAllFormData.experiance}`}
                onChange={(e) =>
                  setAllFormData({
                    ...getAllFormData,
                    experiance: e.target.value,
                  })
                }
              />
            </label>

            <label
              className={cls.LabelInput}
              htmlFor="Telefon raqami"
              id="Telefon raqami"
            >
              {t('Telefon raqami')}
              <input
                type="text"
                maxLength={20}
                id="Telefon raqami"
                name="Telefon raqami"
                onChange={(e) =>
                  setAllFormData({
                    ...getAllFormData,
                    phoneNumber: e.target.value,
                  })
                }
                className={cls.InputBulim}
                value={`${getAllFormData.phoneNumber}`}
              />
            </label>

            {/* <label className={cls.LabelInput} htmlFor="parol" id="parol">
              {t('Parol')}
              <input
                id="parol"
                type="text"
                maxLength={20}
                className={cls.InputBulim}
                onChange={(e) =>
                  setAllFormData({
                    ...getAllFormData,
                    passwordValue: e.target.value,
                  })
                }
                value={getAllFormData.passwordValue}
              />
            </label> */}

            <div className={cls.BtnParnet}>
              <button
                onClick={handleDeleteItem}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('O‘chirib yuborish')}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`${cls.Btn} ${cls.Btn2}`}
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

export default DoctorEdit;
