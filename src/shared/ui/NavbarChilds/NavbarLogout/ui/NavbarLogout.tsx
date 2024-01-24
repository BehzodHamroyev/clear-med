import React from 'react';

import { Language } from '@mui/icons-material';
import { LogoutChild } from '../../LogoutChild';
import { NavbarProfile } from '../../NavbarProfile';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RuIcon, UzIcon, EngIcon } from '@/shared/assets/Pages/Settings';

import cls from './NavbarLogout.module.scss';

const NavbarLogout = () => {
  /* ButtonsContext */
  const { isOpenLanugagePopup, setisOpenLanugagePopup } =
    React.useContext(ButtonsContext);

  /* localStorage */
  const LangValue = localStorage.getItem('i18nextLng');

  /* UI */
  return (
    <div className={cls.NavbarLogoutWrapper}>
      <NavbarProfile />

      <div
        className={cls.NavbarLogoutWrapper__language}
        onClick={() => setisOpenLanugagePopup(!isOpenLanugagePopup)}
      >
        {!LangValue ? (
          <Language className={cls['NavbarLogoutWrapper__language--icon']} />
        ) : LangValue === 'eng' ? (
          <img
            src={EngIcon}
            alt="#"
            className={cls['NavbarLogoutWrapper__language--img']}
          />
        ) : LangValue === 'ru' ? (
          <img
            src={RuIcon}
            alt="#"
            className={cls['NavbarLogoutWrapper__language--img']}
          />
        ) : LangValue === 'kr' || LangValue === 'uz' ? (
          <img
            src={UzIcon}
            alt="#"
            className={cls['NavbarLogoutWrapper__language--img']}
          />
        ) : (
          <Language className={cls['NavbarLogoutWrapper__language--icon']} />
        )}
      </div>

      {/* <NavbarCalendar /> */}

      <LogoutChild />
    </div>
  );
};

export default NavbarLogout;
