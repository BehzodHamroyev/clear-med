import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { RoomEditType } from '../model/types/roomEdit';
import { fetchRoomEdit } from '../model/service/roomEdit';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomEditNumberInput } from '@/entities/RoomEditNumberInput';
import { RoomEditDoctorInput } from '@/entities/RoomEditDoctorInput ';
import { RoomEditSectionInput } from '@/entities/RoomEditSectionInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './RoomEdit.module.scss';
import { fetchRoomDelete } from '../model/service/roomDelete';

const RoomEdit = (prop: RoomEditType) => {
  /* props */
  const { tableBody } = prop;

  /* useAppDispatch */
  const dispatch = useAppDispatch();

  /* useTranslation */
  const { t } = useTranslation();

  /* useContext */
  const {
    departmentGetId,
    isDataFormAddRoom,
    setIsDataFormAddRoom,
    setIsOpenRoomEditCard,
  } = useContext(ButtonsContext);

  /* hapler function */
  const matchingItems = tableBody?.find((item) => item?.id === departmentGetId);

  /* useEffect */
  React.useEffect(() => {
    if (matchingItems) {
      setIsDataFormAddRoom({
        RoomNumber: `${matchingItems?.item1}`,
        SectionName: `${matchingItems.item2}`,
        DoctorName: `${matchingItems.lastChild}`,
      });
    } else {
      console.log('No matching item found');
    }
  }, [matchingItems, setIsDataFormAddRoom]);

  /* fetch data */
  const roomAddCardEditItem = () => {
    dispatch(
      fetchRoomEdit({
        doctor_id: isDataFormAddRoom.DoctorName,
        name: Number(isDataFormAddRoom.RoomNumber),
        department_id: isDataFormAddRoom.SectionName,
        idCard: `${matchingItems?.id}`,
      }),
    );
    setIsOpenRoomEditCard(false);
  };

  /* room Delete Fetch */
  const roomCardDeleteItem = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenRoomEditCard(false);
    dispatch(fetchRoomDelete({ idCard: departmentGetId }));
  };

  /* UI */
  return (
    <div
      className={cls.DepartmentAddWrapper}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenRoomEditCard(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cls.DepartmentAddCard}
      >
        <h3 className={cls.CardTitle}>{t('Xonani tahrirlash')}</h3>

        <div className={cls.CardBody}>
          <p className={cls.roomNumber}>{t('Xona Raqami')}</p>

          <RoomEditNumberInput />

          <RoomEditSectionInput />

          <RoomEditDoctorInput />

          <div className={cls.BtnParnet}>
            <button
              onClick={roomCardDeleteItem}
              type="button"
              className={`${cls.Btn} ${cls.Btn1}`}
            >
              {t('O‘chirib yuborish')}
            </button>
            <button
              type="button"
              onClick={roomAddCardEditItem}
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

export default RoomEdit;
