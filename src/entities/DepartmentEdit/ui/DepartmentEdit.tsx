import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { GetIconForDepartment } from '@/shared/ui/GetIconForDepartment';
import { iconsCardDepartments } from '@/shared/ui/GetIconForDepartment/model/helper/source';

import {
  UseStateType,
  DepartmentEditOrDelete,
} from '../model/types/departmentDelete';

import cls from './DepartmentEdit.module.scss';

const DepartmentEdit = (prop: DepartmentEditOrDelete) => {
  /* Cookies */
  const token = Cookies.get('token');

  /* props */
  const { tableBody } = prop;

  /* useTranslation */
  const { t } = useTranslation();

  /* useState */
  const [inputValue, setInputValue] = React.useState<UseStateType>({
    id: '',
    iconName: null,
    durationTime: '',
    departmentName: '',
  });

  /* useContext */
  const {
    departmentGetId,
    setDepartmentListChanged,
    isOpenDepartmentAddCardIcon,
    setIsOpenDepartmentEditCard,
    setIsOpenDepartmentAddCardIcon,
    setResponseAddDoctorStatusCode,
    isOpenDepartmentAddCardIconIndex,
  } = React.useContext(ButtonsContext);

  /* handle change */
  const handleInputChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value.replace(/\D/g, '');

    if (newValue.length <= 2) {
      setInputValue({ ...inputValue, durationTime: newValue });
    }
  };

  /* fetch delete  */
  const departmentCardDeleteItem = async (e: {
    stopPropagation: () => void;
  }) => {
    e.stopPropagation();
    setDepartmentListChanged(' ');
    setIsOpenDepartmentEditCard(false);

    try {
      const response = await axios.delete<any>(
        `${baseUrl}/department/${departmentGetId}`,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setResponseAddDoctorStatusCode(200);
      setIsOpenDepartmentEditCard(false);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* fetch edit */
  // const DepartmentAddCardEditItem = async () => {
  //   setDepartmentListChanged(`${Math.random() * 10 + 1}`);

  //   try {
  //     const response = await axios.patch<DepartmentEditType>(
  //       `${baseUrl}/department/${inputValue.id}`,
  //       {
  //         name: inputValue.departmentName,
  //         image: `${isOpenDepartmentAddCardIconIndex || 1}`,
  //         duration: Number(inputValue.durationTime),
  //       },
  //       {
  //         maxBodyLength: Infinity,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     setResponseAddDoctorStatusCode(200);
  //     setIsOpenDepartmentEditCard(false);

  //     return response.data;
  //   } catch (e) {
  //     return setResponseAddDoctorStatusCode('404');
  //   }
  // };

  /* filter array data */
  const matchingItem = tableBody?.find((item) => item?.id === departmentGetId);

  /* get img url */
  const ResultIcon = iconsCardDepartments[Number(matchingItem?.imgName)]?.icon;

  /* useEffect */
  React.useEffect(() => {
    if (matchingItem) {
      setInputValue({
        id: `${matchingItem?.id || 1}`,
        departmentName: `${matchingItem?.item1 || 'Bulim yuq'}`,
        durationTime: `${matchingItem?.duration}`,
        iconName: ResultIcon ? <ResultIcon /> : '',
      });
    } else {
      console.log('No matching item found');
    }
  }, [ResultIcon, matchingItem]);

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenDepartmentEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <div className={cls.TitleFlex}>
          <h3 className={cls.CardTitle}>{t('Bo‘limni tahrirlash')}</h3>

          {inputValue.iconName ? inputValue.iconName : <div />}
        </div>

        <div className={cls.CardBody}>
          <input
            type="text"
            maxLength={20}
            name="editSection"
            className={cls.InputBulim}
            value={inputValue.departmentName}
            onChange={(e) =>
              setInputValue({ ...inputValue, departmentName: e.target.value })
            }
            placeholder={t('Bo‘limni o‘zgartirish')}
          />

          <label className={cls.labelInput} htmlFor="1">
            {t('Bemorni qabul qilishga ketadigan taxminiy vaqt!')}
            <input
              id="1"
              min={1}
              max={60}
              maxLength={2}
              type="number"
              name="minutes"
              placeholder={t('minut')}
              className={cls.InputBulim}
              onChange={handleInputChange}
              value={inputValue.durationTime}
            />
          </label>

          <button
            className={`${cls.Btn} ${cls.BtnHover} ${cls.Btn3}`}
            onClick={() => {
              setIsOpenDepartmentAddCardIcon(true);
            }}
            type="button"
          >
            {t("Bo'limga rasm qo'shish")}
          </button>

          {isOpenDepartmentAddCardIcon ? <GetIconForDepartment /> : ''}

          <div className={cls.BtnParnet}>
            <button
              onClick={departmentCardDeleteItem}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('O‘chirib yuborish')}
            </button>

            <button
              type="button"
              // onClick={DepartmentAddCardEditItem}
              className={`${cls.Btn} ${cls.Btn2}`}
            >
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEdit;
