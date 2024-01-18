import React from 'react';
import { useTranslation } from 'react-i18next';

import { fetchDoctorAdd } from '../model/service/fetchRoomAdd';
import { RoomAddNumberInput } from '@/entities/RoomAddNumberInput';
import { RoomAddDoctorInput } from '@/entities/RoomAddDoctorInput';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomAddSectionInput } from '@/entities/RoomAddSectionInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './RoomAdd.module.scss';

const RoomAdd = () => {
  /* translation */
  const { t } = useTranslation();

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useContext */
  const { isDataFormAddRoom, setIsDataFormAddRoom, setIsOpenRoomAddCard } =
    React.useContext(ButtonsContext);

  /* console */
  console.log(isDataFormAddRoom, 'isDataFormAddRoom');

  /* fetch data */
  const handleSubmitAllFormData = () => {
    dispatch(
      fetchDoctorAdd({
        doctor_id: isDataFormAddRoom?.DoctorName
          ? isDataFormAddRoom?.DoctorName
          : '',
        name: Number(
          isDataFormAddRoom?.RoomNumber ? isDataFormAddRoom?.RoomNumber : '0',
        ),
        department_id: isDataFormAddRoom?.SectionName
          ? isDataFormAddRoom?.SectionName
          : '',
      }),
    );
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
