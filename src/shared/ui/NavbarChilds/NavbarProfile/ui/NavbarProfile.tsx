import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getAuthUserData } from '@/features/Auth';

import cls from './NavbarProfile.module.scss';

const NavbarProfile = () => {
  const loginData = useSelector(getAuthUserData);

  const { t } = useTranslation();

  console.log(loginData?.role);

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
      <h3>{t(`${loginData?.role}`)}</h3>
      {loginData?.role === 'doctor' && <h3> : {loginData?.name}</h3>}
    </div>
  );
};

export default NavbarProfile;
