import React, { memo, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
// import { CalendarSection } from '@/entities/Calendar';
import { ButtonNavbarProps } from '../model/types/ButtonNavbarTypes';
import { CarbonAdd } from '@/shared/assets/entities/ButtonNavbar';

import cls from './ButtonNavbar.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const ButtonNavbar = memo((props: ButtonNavbarProps) => {
  const {
    TableTitle,
    ItemsLength,
    Calendar,
    dontCreate,
    CreateCarbonAdd,
    roomNumber,
    departmentName,
    doctorName,
  } = props;
  
  const location = useLocation();
  const { t } = useTranslation();

  const {
    setIsOpenRoomAddCard,
    setIsOpenDoctorAddCard,
    setIsOpenMonitorAddCard,
    setIsOpenDepartmentAddCard,
    setIsOpenAdvertisementAddCard,
  } = useContext(ButtonsContext);

  const handleCardAddCard = () => {
    /* agar ushbu setIsOpenDepartmentAddCard admin page dan boshqa location.pathname === '/' ishlab ketsa ushbu qatorni o'zgartiriladi Murojat uchun: Ja'far */
    if (location.pathname === '/') {
      setIsOpenDepartmentAddCard(true);
    } else if (location.pathname === '/add-room') {
      setIsOpenRoomAddCard(true);
    } else if (location.pathname === '/add_doctor') {
      setIsOpenDoctorAddCard(true);
    } else if (location.pathname === '/add_advertisement') {
      setIsOpenAdvertisementAddCard(true);
    } else if (location.pathname === '/add_monitor') {
      setIsOpenMonitorAddCard(true);
    }
  };

  return (
    <div className={cls.ButtonNavbarWrapper}>
      <p>
        {doctorName} {doctorName && ' | '} {TableTitle}{' '}
        {ItemsLength ? <span>({ItemsLength})</span> : ''}{' '}
      </p>

      {/* {Calendar ? <CalendarSection /> : ''} */}
      {Calendar ? (
        <div style={{ marginTop: '-23px' }}>{/* <BestCalendar /> */}</div>
      ) : (
        ''
      )}

      {dontCreate && roomNumber && departmentName ? (
        <p className={cls.BulimTuri}>
          {roomNumber}-{t('Xona')}, {departmentName}
        </p>
      ) : (
        ''
      )}

      {location.pathname !== '/settings' ? (
        <div className={cls.ButtonNavbarIcons}>
         

          {CreateCarbonAdd === true ? (
            <CarbonAdd
              onClick={handleCardAddCard}
              className={cls.ButtonNavbarIconsChild2}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default ButtonNavbar;
