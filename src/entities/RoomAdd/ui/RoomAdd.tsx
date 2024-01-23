import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { RoomAddTypes } from '../model/types/roomAddTypes';
import { RoomAddNumberInput } from '@/entities/RoomAddNumberInput';
import { RoomAddDoctorInput } from '@/entities/RoomAddDoctorInput';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomAddSectionInput } from '@/entities/RoomAddSectionInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './RoomAdd.module.scss';

const RoomAdd = () => {
  /* translation */
  const { t } = useTranslation();

  /* Cookies */
  const token = Cookies.get('token');

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useContext */
  const {
    setHasOpenToast,
    isDataFormAddRoom,
    setIsOpenRoomAddCard,
    setDepartmentListChanged,
    responseAddRoomStatusCode,
    setResponseAddDoctorStatusCode,
  } = React.useContext(ButtonsContext);

  /* fetch data */
  const handleSubmitAllFormData = async () => {
    setDepartmentListChanged(`${Math.random() * 100 + 1}`);
    try {
      const response = await axios.post<RoomAddTypes>(
        `${baseUrl}/room/create`,
        {
          department_id: isDataFormAddRoom?.SectionName
            ? isDataFormAddRoom?.SectionName
            : '',
          doctor_id: isDataFormAddRoom?.DoctorName
            ? isDataFormAddRoom?.DoctorName
            : '',
          name: Number(
            isDataFormAddRoom?.RoomNumber ? isDataFormAddRoom?.RoomNumber : '0',
          ),
        },
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );

      setIsOpenRoomAddCard(false);
      setResponseAddDoctorStatusCode(200);

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
        setIsOpenRoomAddCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xona qo‘shish')}</h3>

        <div className={cls.CardBody}>
          <p className={cls.roomNumber}>{t('Xona Raqami')}</p>

          <RoomAddNumberInput />

          <RoomAddSectionInput />

          <RoomAddDoctorInput />

          <div className={cls.BtnParnet}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenRoomAddCard(false);
              }}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('Bekor qilish')}
            </button>

            <button
              onClick={handleSubmitAllFormData}
              type="button"
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

export default RoomAdd;
