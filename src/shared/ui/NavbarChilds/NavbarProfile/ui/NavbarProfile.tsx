import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getAuthUserData } from '@/features/Auth';

import cls from './NavbarProfile.module.scss';

const NavbarProfile = () => {
  const loginData = useSelector(getAuthUserData);

  const { t } = useTranslation();

  return (
    <div className={cls.NavbarProfileWrapper}>

      {loginData?.role === 'doctor' && <p>{loginData?.name}</p>}

    </div>
  );
};

export default NavbarProfile;
