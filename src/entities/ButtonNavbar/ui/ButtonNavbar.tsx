import React from 'react';

import { CarbonAdd, Search } from '@/shared/assets/entities/ButtonNavbar';
import { ButtonNavbarProps } from '../model/types/ButtonNavbarTypes';
import { CalendarSection } from '@/entities/Calendar';

import cls from './ButtonNavbar.module.scss';

const ButtonNavbar = (props: ButtonNavbarProps) => {
  const { TableTitle, ItemsLength, Calendar } = props;
  return (
    <div className={cls.ButtonNavbarWrapper}>
      <p>
        {TableTitle} <span>({ItemsLength})</span>
      </p>

      {Calendar ? <CalendarSection /> : ''}

      <div className={cls.ButtonNavbarIcons}>
        <Search className={cls.ButtonNavbarIconsChild} />
        {Calendar === true ? (
          ''
        ) : (
          <CarbonAdd className={cls.ButtonNavbarIconsChild} />
        )}
      </div>
    </div>
  );
};

export default ButtonNavbar;
