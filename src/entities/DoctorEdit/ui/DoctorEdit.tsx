import React from 'react';
import { useTranslation } from 'react-i18next';

import { DoctorEditType } from '../model/types/doctorEdit';
import { fetchDoctorEdit } from '../model/service/doctorEdit';
import { Doctor, GetImage } from '@/shared/assets/Pages/Doctor';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './DoctorEdit.module.scss';

/* Parent Functions */
const DoctorEdit = (prop: DoctorEditType) => {
  const { tableBody } = prop;

  /* useTranslation */
  const { t } = useTranslation();

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useContext */
  const { setIsOpenDoctorEditCard, departmentGetId } =
    React.useContext(ButtonsContext);

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

  /* useEffect */
  React.useEffect(() => {
    if (matchingItems) {
      setAllFormData({
        idCard: departmentGetId,
        fileUrl: `${matchingItems.img}`,
        fullName: `${matchingItems.item1}`,
        experiance: `${matchingItems.item4}`,
        passwordValue: `${matchingItems.lastChild}`,
        phoneNumber: `+998 ${matchingItems.lastChild}`,
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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const selectedFile = event.target.files[0];
  //     setAllFormData({ ...getAllFormData, fileUrl: selectedFile });
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImg(file);
    setAllFormData({ ...getAllFormData, fileUrl: file });
  };

  /* handle submit functions */
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = new FormData();

    data.append('idCard', getAllFormData.idCard);
    data.append('fileUrl', getAllFormData.fileUrl);
    data.append('fullName', getAllFormData.fullName);
    data.append('experiance', getAllFormData.experiance);
    data.append('phoneNumber', getAllFormData.phoneNumber);
    data.append('passwordValeu', getAllFormData.passwordValue);

    dispatch(
      fetchDoctorEdit({
        data,
      }),
    );
    console.log(1);
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
              src={img ? URL.createObjectURL(img) : Doctor}
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
              accept=".jpg, .jpeg, .png, .svg"
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

            <label className={cls.LabelInput} htmlFor="parol" id="parol">
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
