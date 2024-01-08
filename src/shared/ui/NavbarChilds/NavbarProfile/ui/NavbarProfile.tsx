import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getUserData } from '@/features/Auth';

import cls from './NavbarProfile.module.scss';

const NavbarProfile = () => {
  const loginData = useSelector(getUserData);

  const { t } = useTranslation();

  const profile =
    loginData?.role === 'admin'
      ? 'Admin'
      : loginData?.role === 'doktor'
      ? 'Doktor'
      : loginData?.role === 'qabulxona'
      ? 'Qabulxona'
      : '';
  return (
    <div className={cls.NavbarProfileWrapper}>
      <h3>{t(profile)}</h3>
    </div>
  );
};

export default NavbarProfile;
