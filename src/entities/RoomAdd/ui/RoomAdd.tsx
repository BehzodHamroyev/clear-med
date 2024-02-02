import React, { useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { RoomAddTypes } from '../model/types/roomAddTypes';
import { RoomAddNumberInput } from '@/entities/RoomAddNumberInput';
import { RoomAddDoctorInput } from '@/entities/RoomAddDoctorInput';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomAddSectionInput } from '@/entities/RoomAddSectionInput';

import cls from './RoomAdd.module.scss';

const RoomAdd = () => {
  const { t } = useTranslation();

  const token = Cookies.get('token');

  const {
    setHasOpenToast,
    isDataFormAddRoom,
    setIsOpenRoomAddCard,
    setIsDataFormAddRoom,
    setDepartmentListChanged,
    responseAddRoomStatusCode,
    setResponseAddDoctorStatusCode,
  } = useContext(ButtonsContext);

  const handleSubmitAllFormData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

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

      if (response.data) {
        setIsOpenRoomAddCard(false);

        setHasOpenToast(true);

        setIsDataFormAddRoom({
          RoomNumber: '',
          SectionName: '',
          DoctorName: '',
        });

        setResponseAddDoctorStatusCode(200);
      }

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  const handleClickCancelForm = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    setIsOpenRoomAddCard(false);

    setIsDataFormAddRoom({
      RoomNumber: '',
      SectionName: '',
      DoctorName: '',
    });
  };

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
        <form onSubmit={handleSubmitAllFormData}>
          <h3 className={cls.CardTitle}>{t('Xona qo‘shish')}</h3>

          <div className={cls.CardBody}>
            <p className={cls.roomNumber}>{t('Xona Raqami')}</p>

            <RoomAddNumberInput />

            <RoomAddSectionInput />

            <RoomAddDoctorInput />

            <div className={cls.BtnParnet}>
              <button
                onClick={handleClickCancelForm}
                type="button"
                className={`${cls.Btn} ${cls.Btn1}`}
              >
                {t('Bekor qilish')}
              </button>

              <button type="submit" className={`${cls.Btn} ${cls.Btn2}`}>
                {t('Saqlash')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomAdd;
