import React from 'react';

import { Language } from '@mui/icons-material';
import cls from './NavbarLogout.module.scss';
import { NavbarProfile } from '../../NavbarProfile';
import { NavbarCalendar } from '../../NavbarCalendar';
import { LogoutChild } from '../../LogoutChild';

const NavbarLogout = () => {
  return (
    <div className={cls.NavbarLogoutWrapper}>
      <NavbarProfile />

      <NavbarCalendar />

      <Language className={cls.language} />

      <LogoutChild />
    </div>
  );
};

export default NavbarLogout;
