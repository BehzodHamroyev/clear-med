import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { CalendarSection } from '@/entities/Calendar';
import { ButtonNavbarProps } from '../model/types/ButtonNavbarTypes';
import { CarbonAdd, Search } from '@/shared/assets/entities/ButtonNavbar';

import cls from './ButtonNavbar.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const ButtonNavbar = (props: ButtonNavbarProps) => {
  const { TableTitle, ItemsLength, Calendar, dontCreate } = props;
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useTranslation();

  const {
    setIsOpenDepartmentAddCard,
    setIsOpenRoomAddCard,
    setIsOpenDoctorAddCard,
  } = useContext(ButtonsContext);

  const handleCardAddCard = () => {
    if (location.pathname === '/department') {
      setIsOpenDepartmentAddCard(true);
    } else if (location.pathname === '/add_room_age') {
      setIsOpenRoomAddCard(true);
    } else if (location.pathname === '/add_doctor') {
      setIsOpenDoctorAddCard(true);
    }
  };

  return (
    <div className={cls.ButtonNavbarWrapper}>
      <p>
        {TableTitle} {ItemsLength ? <span>({ItemsLength})</span> : ''}
      </p>

      {Calendar ? <CalendarSection /> : ''}
      {dontCreate ? (
        <h3 className={cls.BulimTuri}>{t('12-Xona, Dermatolog')}</h3>
      ) : (
        ''
      )}

      {location.pathname !== '/settings' ? (
        <div className={cls.ButtonNavbarIcons}>
          <div className={cls.ButtonNavParent}>
            {searchOpen ? (
              <input
                maxLength={30}
                type="text"
                className={cls.ButtonNavbarInputSearch}
              />
            ) : (
              ''
            )}

            <Search
              onClick={() => setSearchOpen(!searchOpen)}
              className={cls.ButtonNavbarIconsChild}
            />
          </div>

          {Calendar === true || dontCreate === true ? (
            ''
          ) : (
            <CarbonAdd
              onClick={handleCardAddCard}
              className={cls.ButtonNavbarIconsChild2}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ButtonNavbar;
