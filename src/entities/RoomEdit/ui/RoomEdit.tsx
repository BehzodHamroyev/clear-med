/* eslint-disable ulbi-tv-plugin/public-api-imports */
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { baseUrl } from '../../../../baseurl';
import { RoomEditType } from '../model/types/roomEdit';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RoomEditNumberInput } from '@/entities/RoomEditNumberInput';

import { RoomEditSectionInput } from '@/entities/RoomEditSectionInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './RoomEdit.module.scss';
import { RoomEditDoctorInput } from '@/entities/RoomEditDoctorInput/ui/RoomEditDoctorInput';

const RoomEdit = (prop: RoomEditType) => {
  /* props */
  const { tableBody } = prop;

  /* Cookies */
  const token = Cookies.get('token');

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
    setDepartmentListChanged,
    setResponseAddDoctorStatusCode,
  } = React.useContext(ButtonsContext);

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
  const roomAddCardEditItem = async () => {
    setIsOpenRoomEditCard(false);
    setDepartmentListChanged(`${Math.random() * 100 + 1}`);

    try {
      const response = await axios.patch<RoomEditType>(
        `${baseUrl}/room/${matchingItems?.id}`,
        {
          doctor_id: isDataFormAddRoom.DoctorName,
          name: Number(isDataFormAddRoom.RoomNumber),
          department_id: isDataFormAddRoom.SectionName,
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
      setDepartmentListChanged(`${Math.random() * 100 + 1}`);

      return response.data;
    } catch (e) {
      return setResponseAddDoctorStatusCode('404');
    }
  };

  /* room Delete Fetch */
  const roomCardDeleteItem = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpenRoomEditCard(false);

    try {
      const response = await axios.delete<any>(
        `${baseUrl}/room/${departmentGetId}`,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },
      );
      setResponseAddDoctorStatusCode(200);

      setDepartmentListChanged(`${Math.random() * 100 + 1}`);

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

        <form
          action="#"
          onSubmit={(e) => {
            e.stopPropagation();
          }}
        >
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
        </form>
      </div>
    </div>
  );
};

export default RoomEdit;
