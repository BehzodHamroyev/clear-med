import React from 'react';

import cls from './NavbarLogout.module.scss';
import { NavbarProfile } from '../../NavbarProfile';
import { NavbarCalendar } from '../../NavbarCalendar';
import { LogoutChild } from '../../LogoutChild';

const NavbarLogout = () => {
  return (
    <div className={cls.NavbarLogoutWrapper}>
      <NavbarProfile />

      <NavbarCalendar />

      <LogoutChild />
    </div>
  );
};

export default NavbarLogout;
