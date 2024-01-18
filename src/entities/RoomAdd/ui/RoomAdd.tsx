import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectChangeEvent } from '@mui/material/Select';

import { RoomAddNumberInput } from '@/entities/RoomAddNumberInput';
import { RoomAddDoctorInput } from '@/entities/RoomAddDoctorInput';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomAddSectionInput } from '@/entities/RoomAddSectionInput';

import cls from './RoomAdd.module.scss';

const RoomAdd = () => {
  const { t } = useTranslation();
  const { setIsOpenRoomAddCard } = useContext(ButtonsContext);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
        <h3 className={cls.CardTitle}>{t('Xona qo‘shish')}</h3>
        <div className={cls.CardBody}>
          <p className={cls.roomNumber}>Xona Raqami</p>

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
            <button type="button" className={`${cls.Btn} ${cls.Btn2}`}>
              {t('Saqlash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAdd;

//
