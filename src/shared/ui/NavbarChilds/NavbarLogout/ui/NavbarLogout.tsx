import React from 'react';

import { useSelector } from 'react-redux';
import { Language } from '@mui/icons-material';
import { LogoutChild } from '../../LogoutChild';
import { NavbarProfile } from '../../NavbarProfile';
import { ButtonsContext } from '@/shared/lib/context/ButtonsContext';
import { RuIcon, UzIcon, EngIcon } from '@/shared/assets/Pages/Settings';

import cls from './NavbarLogout.module.scss';
import { getAuthUserData } from '@/features/Auth';

const NavbarLogout = () => {
  const {
    isOpenLanugagePopup,
    setisOpenLanugagePopup,
    setIsvisableLanguageModal,
  } = React.useContext(ButtonsContext);

  const loginData = useSelector(getAuthUserData);

  const LangValue = localStorage.getItem('i18nextLng');

  return (
    <div className={cls.NavbarLogoutWrapper}>
      <NavbarProfile />

      {loginData?.role && (
        <div
          className={cls.NavbarLogoutWrapper__language}
          onClick={() => {
            if (loginData?.role !== 'reception') {
              setisOpenLanugagePopup(!isOpenLanugagePopup);
            } else if (loginData?.role === 'reception') {
              setIsvisableLanguageModal(true);
            }
          }}
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
      )}

      {/* <NavbarCalendar /> */}

      {loginData?.role !== 'reception' && <LogoutChild />}
    </div>
  );
};

export default NavbarLogout;
