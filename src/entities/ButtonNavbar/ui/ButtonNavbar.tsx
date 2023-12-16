import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CalendarSection } from '@/entities/Calendar';
import { ButtonNavbarProps } from '../model/types/ButtonNavbarTypes';
import { CarbonAdd, Search } from '@/shared/assets/entities/ButtonNavbar';

import cls from './ButtonNavbar.module.scss';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';

const ButtonNavbar = (props: ButtonNavbarProps) => {
  const { TableTitle, ItemsLength, Calendar } = props;
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const { isOpenDepartmentAddCard, setIsOpenDepartmentAddCard } =
    useContext(ButtonsContext);

  const handleCardAddCard = () => {
    if (location.pathname === '/department') {
      setIsOpenDepartmentAddCard(true);
    }
  };

  return (
    <div className={cls.ButtonNavbarWrapper}>
      <p>
        {TableTitle} {ItemsLength ? <span>({ItemsLength})</span> : ''}
      </p>

      {Calendar ? <CalendarSection /> : ''}

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

          {Calendar === true ? (
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
