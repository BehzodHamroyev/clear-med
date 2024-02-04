import React, { useContext, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { DepartmentType } from '../model/types/departmentType';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';
import { fetchDepartmentGetAll } from '../../../pages/DepartmentPage/model/service/getAllDepartmentRequest';

import cls from './DepartmentAdd.module.scss';

const DepartmentAdd = () => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const {
    setDepartmentListChanged,
    setIsOpenDepartmentAddCard,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentAddCardIcon,
    setResponseAddDoctorStatusCode,
    isOpenDepartmentAddCardIconIndex,
  } = useContext(ButtonsContext);

  const [inputValue, setInputValue] = useState<string>();

  const [departmentName, setDepartmentName] = useState('');

  const ResultIconSrc =
    iconsCardDepartments[isOpenDepartmentAddCardIconIndex].icon;

  /* handle change functions */
  const handleChangeDoctorName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalizedText =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);

    setDepartmentName(capitalizedText);
  };

  const handleChangeDoctorExperience = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 3) {
      setInputValue(newValue);
    }
  };

  const handleButtonSubmit = async () => {
    const token = Cookies.get('token');

    setDepartmentListChanged(departmentName);

    try {
      const response = await axios.post<DepartmentType>(
        `${baseUrl}/department/create`,
        {
          name: departmentName,
          duration: Number(inputValue),
          image: `${isOpenDepartmentAddCardIconIndex}`,
        },
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      setResponseAddDoctorStatusCode(200);
      setIsOpenDepartmentAddCard(false);

      if (response.data) {
        dispatch(fetchDepartmentGetAll({}));
      }

      return response.data;
    } catch (e: any) {
      setResponseAddDoctorStatusCode('404');
      return console.log(e, 'error');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentAddCard(false);
      }}
      className={cls.DepartmentAddWrapper}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <div className={cls.TitleFlex}>
          <h3 className={cls.CardTitle}>{t('Bo‘lim qo‘shish')}</h3>

          <ResultIconSrc />
        </div>

        <form action="#" className={cls.CardBody} onSubmit={handleButtonSubmit}>
          <input
            ref={inputRef}
            type="text"
            maxLength={20}
            minLength={3}
            min={3}
            required
            onChange={handleChangeDoctorName}
            value={departmentName}
            className={cls.InputBulim}
            placeholder={t('Bo‘lim nomi')}
          />

          <input
            id="1"
            max={180}
            required
            type="number"
            maxLength={3}
            value={inputValue}
            className={cls.InputBulim}
            onChange={handleChangeDoctorExperience}
            placeholder={t("Bemorni ko'rishga ketadigan taxminiy vaqt")}
          />

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
            type="button"
          >
            {t("Bo'limga rasm qo'shish")}
          </button>

          {/* <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {}}
            type="button"
          >
            {t("Bo'limga rasm yuklash")}
          </button> */}

          {isOpenDepartmentAddCardIcon ? <GetIconForDepartment /> : ''}

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDepartmentAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>

            <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentAdd;
