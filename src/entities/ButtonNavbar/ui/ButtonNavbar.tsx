import React from 'react';
import { useLocation } from 'react-router-dom';

import { CalendarSection } from '@/entities/Calendar';
import { ButtonNavbarProps } from '../model/types/ButtonNavbarTypes';
import { CarbonAdd, Search } from '@/shared/assets/entities/ButtonNavbar';

import cls from './ButtonNavbar.module.scss';

const ButtonNavbar = (props: ButtonNavbarProps) => {
  const { TableTitle, ItemsLength, Calendar } = props;
  const location = useLocation();

  return (
    <div className={cls.ButtonNavbarWrapper}>
      <p>
        {TableTitle} {ItemsLength ? <span>({ItemsLength})</span> : ''}
      </p>

      {Calendar ? <CalendarSection /> : ''}

      {location.pathname !== '/settings' ? (
        <div className={cls.ButtonNavbarIcons}>
          <Search className={cls.ButtonNavbarIconsChild} />
          {Calendar === true ? (
            ''
          ) : (
            <CarbonAdd className={cls.ButtonNavbarIconsChild} />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ButtonNavbar;
